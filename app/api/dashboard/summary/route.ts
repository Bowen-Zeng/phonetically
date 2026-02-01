/**
 * GET /api/dashboard/summary?userId=...
 * Returns lastSession, recentAttempts, recommendedSound for dashboard
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('userId') || 'default';

    const db = await getDb();

    const lastSession = await db.collection('sessions').findOne(
      { userId: uid },
      { sort: { startedAt: -1 } }
    );

    const recentAttempts = await db
      .collection('attempts')
      .find({ userId: uid })
      .sort({ createdAt: -1 })
      .limit(20)
      .project({ word: 1, sound: 1, transcript: 1, accuracy: 1, needsCorrection: 1, createdAt: 1 })
      .toArray();

    let recommendedSound: string | null = null;
    const attemptsWithSound = recentAttempts.filter((a) => a.sound);
    if (attemptsWithSound.length > 0) {
      const bySound: Record<string, { sum: number; count: number }> = {};
      for (const a of attemptsWithSound) {
        const s = a.sound || 'Other';
        if (!bySound[s]) bySound[s] = { sum: 0, count: 0 };
        bySound[s].sum += a.accuracy;
        bySound[s].count += 1;
      }
      let lowestAvg = 100;
      for (const [sound, { sum, count }] of Object.entries(bySound)) {
        const avg = sum / count;
        if (avg < lowestAvg) {
          lowestAvg = avg;
          recommendedSound = sound;
        }
      }
    } else if (recentAttempts.length > 0) {
      const byWord: Record<string, { sum: number; count: number }> = {};
      for (const a of recentAttempts) {
        const w = a.word || 'unknown';
        if (!byWord[w]) byWord[w] = { sum: 0, count: 0 };
        byWord[w].sum += a.accuracy;
        byWord[w].count += 1;
      }
      let lowestAvg = 100;
      let worstWord = '';
      for (const [word, { sum, count }] of Object.entries(byWord)) {
        const avg = sum / count;
        if (avg < lowestAvg) {
          lowestAvg = avg;
          worstWord = word;
        }
      }
      if (worstWord) recommendedSound = worstWord;
    }

    return NextResponse.json({
      lastSession: lastSession
        ? {
            sessionId: lastSession._id?.toString(),
            attemptCount: lastSession.attemptCount ?? 0,
            startedAt: lastSession.startedAt,
            endedAt: lastSession.endedAt,
          }
        : null,
      recentAttempts: recentAttempts.map((a) => ({
        word: a.word,
        sound: a.sound,
        transcript: a.transcript,
        accuracy: a.accuracy,
        needsCorrection: a.needsCorrection,
        createdAt: a.createdAt,
      })),
      recommendedSound,
    });
  } catch (e) {
    if (String(e).includes('MONGODB_URI')) {
      return NextResponse.json({ lastSession: null, recentAttempts: [], recommendedSound: null });
    }
    console.error('Dashboard summary error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
