/**
 * POST /api/sessions/start
 * Creates a new practice session, returns sessionId
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '../../../../lib/mongoose';
import Session from '../../../../lib/models/Session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const userId = body.userId || 'default';
    const mode = body.mode || 'practice_words';

    await connectDb();
    const session = await Session.create({ userId, mode, attemptCount: 0 });
    return NextResponse.json({ sessionId: session._id.toString() });
  } catch (e) {
    console.error('Session start error:', e);
    return NextResponse.json({ error: 'Failed to start session' }, { status: 500 });
  }
}
