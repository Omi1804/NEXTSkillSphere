import {
  estimateTokens,
  getClientIp,
  getSessionId,
  isSpamMessage,
  jsonWithRateHeaders,
  sleep,
} from "@/config/chat";
import {
  MAX_MESSAGE_LENGTH,
  MAX_OUTPUT_TOKENS,
  STREAM_CHUNK_DELAY_MS,
  TOKEN_BUDGET_PER_HOUR,
  TOKEN_WINDOW_SECONDS,
} from "@/constants/chat.constants";
import { USER_SESSION_COOKIE } from "@/constants/userAuth.constants";
import { rateLimit, redis } from "@/lib/rateLimiter";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { createChatMessage } from "@/repositories/chat.repository";
import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

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
      await createChatMessage(userId, trimmedMessage, "USER");
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
            await createChatMessage(userId, fullResponse, "ASSISTANT");
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
