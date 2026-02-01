/**
 * GET /api/dashboard/recommended?userId=...
 * Returns recommended sound: { sound, reason, avgAccuracy }
 * Logic: prefer lowest avgAccuracy sound (min 3 attempts if possible), else lowest recent
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/mongodb';

const DEFAULT_STARTER_SOUNDS = ['Short A', 'TH', 'R'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('userId') || 'default';

    const db = await getDb();
    const attempts = await db
      .collection('attempts')
      .find({ userId: uid })
      .sort({ createdAt: -1 })
      .project({ word: 1, sound: 1, accuracy: 1 })
      .toArray();

    if (attempts.length === 0) {
      return NextResponse.json({
        sound: DEFAULT_STARTER_SOUNDS[0],
        reason: 'Get started with a common sound.',
        avgAccuracy: null,
      });
    }

    const bySound: Record<string, { sum: number; count: number }> = {};
    for (const a of attempts) {
      const s = (a.sound as string) || 'Other';
      if (!bySound[s]) bySound[s] = { sum: 0, count: 0 };
      bySound[s].sum += a.accuracy;
      bySound[s].count += 1;
    }

    const withSound = Object.entries(bySound)
      .filter(([s]) => s !== 'Other')
      .map(([sound, { sum, count }]) => ({
        sound,
        avgAccuracy: sum / count,
        count,
      }));

    const withEnough = withSound.filter((b) => b.count >= 3);
    const pool = withEnough.length > 0 ? withEnough : withSound;

    if (pool.length > 0) {
      const worst = pool.reduce((a, b) => (a.avgAccuracy <= b.avgAccuracy ? a : b));
      return NextResponse.json({
        sound: worst.sound,
        reason: `Based on your attempts, ${worst.sound} could use more practice.`,
        avgAccuracy: Math.round(worst.avgAccuracy * 10) / 10,
      });
    }

    const byWord: Record<string, { sum: number; count: number; sound?: string }> = {};
    for (const a of attempts.slice(0, 20)) {
      const w = a.word || 'unknown';
      if (!byWord[w]) byWord[w] = { sum: 0, count: 0 };
      byWord[w].sum += a.accuracy;
      byWord[w].count += 1;
      if ((a.sound as string) && !byWord[w].sound) byWord[w].sound = a.sound as string;
    }
    const wordList = Object.entries(byWord).map(([word, { sum, count, sound }]) => ({
      word,
      sound,
      avgAccuracy: sum / count,
    }));
    const worst = wordList.reduce((a, b) => (a.avgAccuracy <= b.avgAccuracy ? a : b));
    const fallbackSound = worst.sound || DEFAULT_STARTER_SOUNDS[0];
    return NextResponse.json({
      sound: fallbackSound,
      reason: 'Based on your recent attempts.',
      avgAccuracy: Math.round(worst.avgAccuracy * 10) / 10,
    });
  } catch (e) {
    if (String(e).includes('MONGODB_URI')) {
      return NextResponse.json({
        sound: 'Short A',
        reason: 'Get started with a common sound.',
        avgAccuracy: null,
      });
    }
    console.error('Dashboard recommended error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
