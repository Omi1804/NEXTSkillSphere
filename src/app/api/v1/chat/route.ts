import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

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
          content: message,
        },
      ],
      temperature: 0.4,
    });

    return NextResponse.json({
      result: completion.choices[0].message?.content || "I'm sorry, I didn't understand that.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
