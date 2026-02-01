/**
 * UserProfile model - target sounds for pronunciation practice
 * Schema: { userId, targetSounds: string[], updatedAt }
 */
export interface UserProfile {
  _id?: string;
  userId: string;
  targetSounds: string[];
  updatedAt: Date;
}

export const PHONETIC_SOUNDS = [
  '/r/',
  '/s/',
  '/th/',
  '/sh/',
  '/ch/',
  '/l/',
  '/f/',
  '/v/',
  'Short vowels (a, e, i, o, u)',
  'Long vowels',
  'R-controlled vowels',
];
