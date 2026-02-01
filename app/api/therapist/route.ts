/**
 * Therapist API - CRUD for user target sounds
 * GET: view target sounds for user
 * PATCH: add/remove target sounds, save to MongoDB
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../lib/mongodb';

const COLLECTION = 'user_profiles';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId') || 'default';
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ userId });
    return NextResponse.json({
      targetSounds: doc?.targetSounds ?? [],
    });
  } catch (e) {
    if (String(e).includes('MONGODB_URI')) {
      return NextResponse.json({ targetSounds: [] });
    }
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to load' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId || 'default';
    const targetSounds = Array.isArray(body.targetSounds)
      ? body.targetSounds
      : [];

    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      { userId },
      {
        $set: {
          userId,
          targetSounds,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    return NextResponse.json({ success: true, targetSounds });
  } catch (e) {
    if (String(e).includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'MONGODB_URI not configured' },
        { status: 503 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to save' },
      { status: 500 }
    );
  }
}
