import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content with direct JSON output prompt
    const prompt = `Generate a JSON output for task: "${title}"
    {
      "description": "brief task description under 50 words",
      "priority": "LOW|MEDIUM|HIGH",
      "estimatedDays": number,
      "dueDate": "YYYY-MM-DD"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonOutput = response.text().trim();

    return new NextResponse(jsonOutput, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({
      description: "",
      priority: "MEDIUM",
      estimatedDays: 1,
      dueDate: new Date().toISOString().split("T")[0],
    });
  }
}
