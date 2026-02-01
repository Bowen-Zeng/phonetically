/**
 * GET /api/dashboard/progress?userId=...
 * Returns: attemptCount, avgAccuracy, soundsPracticedCount, bySound, bestSound, worstSound
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('userId') || 'default';

    const db = await getDb();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyAttempts = await db
      .collection('attempts')
      .find({ userId: uid, createdAt: { $gte: today } })
      .count();
    const dailyAttemptCount = dailyAttempts;

    const attempts = await db
      .collection('attempts')
      .find({ userId: uid })
      .project({ sound: 1, accuracy: 1 })
      .toArray();

    const attemptCount = attempts.length;

    let avgAccuracy = 0;
    if (attemptCount > 0) {
      const sum = attempts.reduce((s, a) => s + a.accuracy, 0);
      avgAccuracy = Math.round((sum / attemptCount) * 10) / 10;
    }

    const bySoundMap: Record<string, { sum: number; count: number }> = {};
    for (const a of attempts) {
      const s = (a.sound as string) || 'Other';
      if (!bySoundMap[s]) bySoundMap[s] = { sum: 0, count: 0 };
      bySoundMap[s].sum += a.accuracy;
      bySoundMap[s].count += 1;
    }

    const bySound = Object.entries(bySoundMap).map(([sound, { sum, count }]) => ({
      sound,
      avgAccuracy: Math.round((sum / count) * 10) / 10,
      attemptCount: count,
    }));

    const soundsPracticedCount = Object.keys(bySoundMap).length;

    let bestSound: string | null = null;
    let worstSound: string | null = null;

    const withEnough = bySound.filter((b) => b.attemptCount >= 3);
    const candidates = withEnough.length >= 2 ? withEnough : bySound;

    if (candidates.length > 0) {
      bestSound = candidates.reduce((a, b) => (a.avgAccuracy >= b.avgAccuracy ? a : b)).sound;
      worstSound = candidates.reduce((a, b) => (a.avgAccuracy <= b.avgAccuracy ? a : b)).sound;
    }

    return NextResponse.json({
      attemptCount,
      avgAccuracy,
      soundsPracticedCount,
      bySound,
      bestSound,
      worstSound,
    });
  } catch (e) {
    if (String(e).includes('MONGODB_URI')) {
      return NextResponse.json({
        attemptCount: 0,
        dailyAttemptCount: 0,
        avgAccuracy: 0,
        soundsPracticedCount: 0,
        bySound: [],
        bestSound: null,
        worstSound: null,
      });
    }
    console.error('Dashboard progress error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
