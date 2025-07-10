// app/api/traits/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { bio, currentTraits = [] } = await req.json();

  const prompt = `Based on this bio: "${bio}" and existing traits: ${currentTraits.join(
    ", "
  )}, suggest 5 unique personality traits that would fit this person. Return only single words, separated by commas.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
      temperature: 0.7,
    });

    const traits = response.choices[0].message.content
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !currentTraits.includes(t))
      .slice(0, 5);

    return NextResponse.json({ traits });
  } catch (err) {
    console.error("OpenAI error:", err);
    return NextResponse.json(
      { traits: ["creative", "empathetic", "witty", "loyal", "curious"] },
      { status: 200 }
    );
  }
}
