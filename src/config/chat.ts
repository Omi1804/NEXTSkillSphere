import { NextRequest, NextResponse } from "next/server";

export const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return req.headers.get("x-real-ip")?.trim() || "anonymous";
};

export const getSessionId = (req: NextRequest, ip: string) => {
  const headerSessionId = req.headers.get("x-chat-session-id")?.trim();
  if (headerSessionId && /^[a-zA-Z0-9_-]{8,80}$/.test(headerSessionId)) {
    return headerSessionId;
  }

  return `ip:${ip}`;
};

export const isSpamMessage = (text: string) => {
  if (/(.)\1{19,}/i.test(text)) return true;
  if (/\b(\w+)(?:\s+\1){7,}\b/i.test(text)) return true;

  const noiseOnly = text.replace(/[a-zA-Z0-9\s]/g, "").length;
  if (text.length >= 20 && noiseOnly / text.length > 0.65) return true;

  return false;
};

export const estimateTokens = (text: string) => Math.ceil(text.length / 4);

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const jsonWithRateHeaders = (
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
