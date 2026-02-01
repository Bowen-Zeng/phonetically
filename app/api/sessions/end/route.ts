/**
 * POST /api/sessions/end
 * Ends a practice session by setting endedAt
 */
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDb } from '../../../../lib/mongoose';
import Session from '../../../../lib/models/Session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId;
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    await connectDb();
    await Session.updateOne(
      { _id: new mongoose.Types.ObjectId(sessionId) },
      { endedAt: new Date() }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Session end error:', e);
    return NextResponse.json({ error: 'Failed to end session' }, { status: 500 });
  }
}
