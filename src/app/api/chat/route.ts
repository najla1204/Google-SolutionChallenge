import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { mockNeeds, mockVolunteers, mockNGOs } from '@/lib/data/mockData';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'MISSING_API_KEY',
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set in environment variables." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    const systemPrompt = `You are the ImpactFlow AI Assistant. You help users understand community needs, match volunteers, and answer questions about the platform.

Here is the current mock database you have access to:
Needs: ${JSON.stringify(mockNeeds.map(n => ({ id: n.id, title: n.title, location: n.location, urgency: n.urgency_level, description: n.description })))}
Volunteers: ${JSON.stringify(mockVolunteers.map(v => ({ id: v.id, name: v.name, skills: v.skills, location: v.location })))}
NGOs: ${JSON.stringify(mockNGOs.map(n => ({ id: n.id, name: n.name, location: n.location })))}

Be concise, helpful, and professional. 
You can answer questions about the active needs, suggest which volunteer could help with which need based on skills and location, and explain how ImpactFlow works.
Always speak as if you are the integrated AI for ImpactFlow. Keep responses brief. Use markdown for formatting if needed.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: any) => ({ role: m.role, content: m.content })),
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    return NextResponse.json({
      role: 'assistant',
      content: chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
    });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to communicate with AI service. Please ensure GROQ_API_KEY is set correctly." },
      { status: 500 }
    );
  }
}
