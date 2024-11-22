import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content with a strict prompt
    const prompt = `Write a brief, professional task description for: "${title}". 
    Important: Provide ONLY the description text - no labels, titles, or prefixes. 
    Keep it under 50 words and focus on actionable details only.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Clean up the response text
    let description = response
      .text()
      .replace(/^(Task Description:|Description:|Task:)/i, "")
      .replace(/^\s*[-•:]\s*/, "")
      .trim();

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}
