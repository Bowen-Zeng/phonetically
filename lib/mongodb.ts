/**
 * MongoDB connection - uses MONGODB_URI env variable
 * Add to .env.local: MONGODB_URI=mongodb+srv://...
 */
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.warn('MONGODB_URI not set - therapist dashboard will not persist');
}

let client: MongoClient | null = null;

export async function getDb() {
  if (!uri) throw new Error('MONGODB_URI not configured');
  if (!client) client = new MongoClient(uri);
  await client.connect();
  return client.db();
}
