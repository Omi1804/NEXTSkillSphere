import { USER_SESSION_COOKIE } from "@/constants/userAuth.constants";
import { prisma } from "@/lib/prisma";
import { rateLimit, redis } from "@/lib/rateLimiter";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const MAX_MESSAGE_LENGTH = 200;
const MAX_OUTPUT_TOKENS = 350;
const TOKEN_BUDGET_PER_HOUR = 5000;
const TOKEN_WINDOW_SECONDS = 60 * 60;
const STREAM_CHUNK_DELAY_MS = Number(process.env.CHAT_STREAM_DELAY_MS || 25);

const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return req.headers.get("x-real-ip")?.trim() || "anonymous";
};

const getSessionId = (req: NextRequest, ip: string) => {
  const headerSessionId = req.headers.get("x-chat-session-id")?.trim();
  if (headerSessionId && /^[a-zA-Z0-9_-]{8,80}$/.test(headerSessionId)) {
    return headerSessionId;
  }

  return `ip:${ip}`;
};

const estimateTokens = (text: string) => Math.ceil(text.length / 4);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isSpamMessage = (text: string) => {
  if (/(.)\1{19,}/i.test(text)) return true;
  if (/\b(\w+)(?:\s+\1){7,}\b/i.test(text)) return true;

  const noiseOnly = text.replace(/[a-zA-Z0-9\s]/g, "").length;
  if (text.length >= 20 && noiseOnly / text.length > 0.65) return true;

  return false;
};

const jsonWithRateHeaders = (
  body: Record<string, unknown>,
  status: number,
  rateMeta: { limit: number; remaining: number },
) => {
  return NextResponse.json(body, {
    status,
    headers: {
      "X-RateLimit-Limit": String(rateMeta.limit),
      "X-RateLimit-Remaining": String(rateMeta.remaining),
    },
  });
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { success, limit, remaining } = await rateLimit.limit(ip);

  if (!success) {
    return jsonWithRateHeaders(
      {
        error: "Too many requests. Slow down.",
        code: "RATE_LIMITED",
      },
      429,
      { limit, remaining },
    );
  }

  try {
    let user = null;
    const token = req.cookies.get(USER_SESSION_COOKIE)?.value;
    if (token) {
      try {
        user = await authenticateUser(req);
      } catch (error) {
        user = null;
      }
    }

    const { message } = await req.json();
    if (typeof message !== "string") {
      return jsonWithRateHeaders(
        {
          error: "Message must be a text string.",
          code: "INVALID_MESSAGE",
        },
        400,
        { limit, remaining },
      );
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return jsonWithRateHeaders(
        {
          error: "Empty messages are not allowed.",
          code: "EMPTY_MESSAGE",
        },
        400,
        { limit, remaining },
      );
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return jsonWithRateHeaders(
        {
          error: `Message too long. Keep it under ${MAX_MESSAGE_LENGTH} characters.`,
          code: "MESSAGE_TOO_LONG",
          maxLength: MAX_MESSAGE_LENGTH,
        },
        400,
        { limit, remaining },
      );
    }

    if (isSpamMessage(trimmedMessage)) {
      return jsonWithRateHeaders(
        {
          error: "Your message looks like spam. Please rephrase it clearly.",
          code: "SPAM_DETECTED",
        },
        400,
        { limit, remaining },
      );
    }

    const userId = user ? user.id : null;
    const sessionId = getSessionId(req, ip);
    const tokenKey = `chat:tokens:${sessionId}`;

    const estimatedInputTokens = estimateTokens(trimmedMessage);
    const reservedTotal = estimatedInputTokens + MAX_OUTPUT_TOKENS;
    const tokenUsedRaw = await redis.get<number>(tokenKey);
    const tokenUsed = Number(tokenUsedRaw || 0);

    if (tokenUsed + reservedTotal > TOKEN_BUDGET_PER_HOUR) {
      return jsonWithRateHeaders(
        {
          error: "Session token limit reached. Please wait before sending more messages.",
          code: "SESSION_TOKEN_LIMIT",
          tokenLimit: TOKEN_BUDGET_PER_HOUR,
          tokenUsed,
        },
        429,
        { limit, remaining },
      );
    }

    if (userId) {
      await prisma.chatMessage.create({
        data: {
          userId,
          content: trimmedMessage,
          role: "USER",
        },
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a helpful course selling assistant.
            You help users find courses, explain course benefits, pricing, duration, level, and guide them toward enrollment.
            Do not answer unrelated questions.`,
        },
        {
          role: "user",
          content: trimmedMessage,
        },
      ],
      temperature: 0.4,
      max_tokens: MAX_OUTPUT_TOKENS,
      stream: true,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = "";

          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";

            if (content) {
              fullResponse += content;
              controller.enqueue(encoder.encode(content));
              if (STREAM_CHUNK_DELAY_MS > 0) {
                await sleep(STREAM_CHUNK_DELAY_MS);
              }
            }
          }

          if (userId && fullResponse.trim()) {
            await prisma.chatMessage.create({
              data: {
                userId,
                content: fullResponse,
                role: "ASSISTANT",
              },
            });
          }

          const outputTokens = estimateTokens(fullResponse);
          const totalTokensUsed = estimatedInputTokens + outputTokens;

          const updatedTokenUsage = Number(
            (await redis.incrby(tokenKey, totalTokensUsed)) || tokenUsed + totalTokensUsed,
          );

          if (updatedTokenUsage === totalTokensUsed) {
            await redis.expire(tokenKey, TOKEN_WINDOW_SECONDS);
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error) {
    console.log(error);
    return jsonWithRateHeaders(
      {
        error: "Something went wrong",
        code: "SERVER_ERROR",
      },
      500,
      { limit, remaining },
    );
  }
}
