/**
 * POST /api/practice/score
 * Scores transcript vs target word, saves Attempt, increments Session.attemptCount
 * Returns accuracy, needsCorrection, syllables, attemptCount
 */
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectDb } from '../../../../lib/mongoose';
import { getDb } from '../../../../lib/mongodb';
import Attempt from '../../../../lib/models/Attempt';
import { splitSyllables } from '../../../../lib/utils/syllables';

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return 0;
  if (na === nb) return 1;
  const maxLen = Math.max(na.length, nb.length);
  const dist = editDistance(na, nb);
  return Math.max(0, 1 - dist / maxLen);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { word, transcript, sessionId, userId, sound, phonetics } = body;
    if (!word || typeof word !== 'string') {
      return NextResponse.json({ error: 'Missing word' }, { status: 400 });
    }
    const trans = typeof transcript === 'string' ? transcript : '';
    const uid = userId || 'default';

    const sim = similarity(trans, word);
    const accuracy = Math.round(Math.min(100, Math.max(0, sim * 100)));
    const needsCorrection = accuracy < 90;
    const syllables = splitSyllables(word);

    // Heuristic: very long transcript + very low accuracy may indicate noisy environment (garbled speech)
    const na = normalize(word);
    const nt = normalize(trans);
    const tooNoisy = nt.length > na.length * 2 && accuracy < 35;

    let attemptCount: number | undefined;
    if (sessionId && uid) {
      try {
        await connectDb();
        await Attempt.create({
          userId: uid,
          sessionId: new ObjectId(sessionId),
          word,
          phonetics: phonetics || null,
          sound: sound || null,
          syllables,
          transcript: trans,
          accuracy,
          needsCorrection,
        });
        const db = await getDb();
        const updated = await db.collection('sessions').findOneAndUpdate(
          { _id: new ObjectId(sessionId) },
          { $inc: { attemptCount: 1 } },
          { returnDocument: 'after' }
        );
        attemptCount = updated?.attemptCount ?? 1;
      } catch (e) {
        console.error('Attempt save error:', e);
      }
    }

    return NextResponse.json({ accuracy, needsCorrection, syllables, attemptCount, tooNoisy: tooNoisy || undefined });
  } catch (e) {
    console.error('Score API error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
