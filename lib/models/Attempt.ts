/**
 * Attempt model - single pronunciation attempt
 * Schema: userId, sessionId, word, sound, transcript, accuracy, needsCorrection, createdAt
 */
import mongoose from 'mongoose';

const AttemptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    word: { type: String, required: true },
    phonetics: { type: String, default: null },
    sound: { type: String, default: null },
    syllables: [{ type: String }],
    transcript: { type: String, default: '' },
    accuracy: { type: Number, required: true },
    needsCorrection: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Attempt || mongoose.model('Attempt', AttemptSchema);
