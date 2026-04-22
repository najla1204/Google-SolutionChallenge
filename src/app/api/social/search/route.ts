import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const platform = searchParams.get('platform');

  const youtubeKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const twitterToken = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;

  try {
    // 1. YouTube Implementation
    if (platform === 'youtube') {
      if (!youtubeKey) return NextResponse.json({ error: 'YouTube API key is missing' }, { status: 400 });
      
      const searchQuery = encodeURIComponent(`${query} ${location}`);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const ytResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=10&key=${youtubeKey}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        const data = await ytResponse.json();
        if (!ytResponse.ok) {
          return NextResponse.json({ 
            error: data.error?.message || `YouTube API returned ${ytResponse.status}`,
            details: data.error 
          }, { status: ytResponse.status });
        }
        
        return NextResponse.json(data);
      } catch (fetchError: any) {
        if (fetchError.name === 'AbortError') {
          return NextResponse.json({ error: 'YouTube API request timed out' }, { status: 504 });
        }
        return NextResponse.json({ 
          error: `Failed to connect to YouTube API: ${fetchError.message}`,
          hint: 'Check your internet connection and API key configuration.'
        }, { status: 502 });
      }
    }

    return NextResponse.json({ error: 'Invalid platform. Only YouTube is supported.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
