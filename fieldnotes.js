/** Offline, local-only Atlas Field Notebook. Never sync notes or send them to a server. */
export const MAX_FIELD_NOTE_LENGTH = 2000;
const validKey = key => typeof key === 'string' && /^[a-z][a-z0-9-]{0,50}:[a-z][a-z0-9-]{0,80}$/.test(key);
export function normalizeFieldNotes(input) {
  const result = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
  for (const [key, value] of Object.entries(input).slice(0, 300)) {
    if (!validKey(key) || typeof value !== 'string') continue;
    const safe = value.slice(0, MAX_FIELD_NOTE_LENGTH);
    if (safe.trim()) result[key] = safe;
  }
  return result;
}
export function setFieldNote(input, key, value) {
  const current = normalizeFieldNotes(input);
  if (!validKey(key) || typeof value !== 'string') return current;
  const safe = value.slice(0, MAX_FIELD_NOTE_LENGTH);
  if (safe.trim()) current[key] = safe;
  else delete current[key];
  return current;
}
