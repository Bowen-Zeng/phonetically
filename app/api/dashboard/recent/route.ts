/**
 * GET /api/dashboard/recent?userId=...
 * Returns last 10 attempts sorted by createdAt desc
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('userId') || 'default';

    const db = await getDb();
    const attempts = await db
      .collection('attempts')
      .find({ userId: uid })
      .sort({ createdAt: -1 })
      .limit(10)
      .project({ word: 1, sound: 1, accuracy: 1, createdAt: 1 })
      .toArray();

    return NextResponse.json(
      attempts.map((a) => ({
        word: a.word,
        sound: a.sound,
        accuracy: a.accuracy,
        createdAt: a.createdAt,
      }))
    );
  } catch (e) {
    if (String(e).includes('MONGODB_URI')) {
      return NextResponse.json([]);
    }
    console.error('Dashboard recent error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
