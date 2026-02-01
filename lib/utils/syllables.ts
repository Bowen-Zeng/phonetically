/**
 * Basic syllable splitter - placeholder for future replacement
 * Splits before vowel groups, returns 2-5 chunks
 */
export function splitSyllables(word: string): string[] {
  const normalized = word.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return [word];

  const parts: string[] = [];
  let i = 0;
  while (i < normalized.length) {
    const rest = normalized.slice(i);
    const m = rest.match(/^[^aeiouy]*[aeiouy]+/);
    const chunk = m ? m[0] : rest[0];
    if (chunk) {
      parts.push(chunk);
      i += chunk.length;
    } else break;
  }
  const result = parts.length > 0 ? parts : [normalized];
  return result.length <= 5 ? result : result.slice(0, 5);
}
