/**
 * API route for Phona text-to-speech
 * Keeps ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID server-side (not exposed to client)
 *
 * Env vars: Add to .env.local:
 *   ELEVENLABS_API_KEY=your_api_key
 *   ELEVENLABS_VOICE_ID=your_phona_voice_id (e.g. EXAVITQu4vr4xnSDxMaL)
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid text' },
        { status: 400 }
      );
    }

    // INSERT YOUR API KEY via env: ELEVENLABS_API_KEY
    const apiKey = process.env.ELEVENLABS_API_KEY;
    // INSERT YOUR PHONA VOICE ID via env: ELEVENLABS_VOICE_ID
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ELEVENLABS_API_KEY not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: 'eleven_monolingual_v1',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: 'ElevenLabs API error', details: err },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (e) {
    console.error('Speak API error:', e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
