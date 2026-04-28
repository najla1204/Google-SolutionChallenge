import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'MISSING_API_KEY',
});

export async function GET(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || 'urgent needs';
    const location = searchParams.get('location') || 'local area';

    const prompt = `You are a social media data scraper and classifier API. Your job is to return a JSON array of simulated real-time community problems or urgent needs as if you just scraped them from the internet (e.g. Twitter, YouTube).

Generate exactly 3 realistic social media posts reporting community problems related to:
Query: ${query}
Location: ${location}

Output the JSON array in the following format (and NOTHING ELSE, NO MARKDOWN, just the raw JSON array):
[
  {
    "id": "random-unique-id",
    "platform": "youtube",
    "content": "A detailed description of the urgent need or problem being reported.",
    "author": "Username",
    "location": "${location}",
    "timestamp": "ISO-8601-date-string-for-today",
    "url": "https://youtube.com/watch?v=random",
    "metrics": {
      "likes": 120,
      "shares": 15,
      "comments": 30
    }
  }
]`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 1024,
    });

    const content = chatCompletion.choices[0]?.message?.content || '[]';
    
    // Clean up potential markdown wrapper
    const cleanJson = content.replace(/^```json/g, '').replace(/```$/g, '').trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json({ items: data });
  } catch (error: any) {
    console.error("Groq AI Error in social generator:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate social posts" },
      { status: 500 }
    );
  }
}
