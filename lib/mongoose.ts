/**
 * Mongoose connection for Phona practice (Sessions, Attempts)
 * Uses MONGODB_URI env variable. Hot-reload safe: cache in global to avoid
 * multiple connections in Next.js dev.
 */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set - Phona practice persistence disabled');
}

declare global {
  var _mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

export async function connectDb(): Promise<typeof mongoose> {
  if (!MONGODB_URI) throw new Error('MONGODB_URI not configured');
  if (!global._mongooseConn) global._mongooseConn = { conn: null, promise: null };
  const cached = global._mongooseConn;
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}
