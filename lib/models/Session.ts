/**
 * Session model - practice session
 * Schema: userId, mode, attemptCount, startedAt, endedAt
 */
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    mode: { type: String, default: 'practice_words' },
    attemptCount: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);
