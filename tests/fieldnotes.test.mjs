import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { normalizeFieldNotes, setFieldNote, MAX_FIELD_NOTE_LENGTH } from '../fieldnotes.js';
test('field notes keep valid text and reject malformed or oversized records',()=>{
  assert.deepEqual(normalizeFieldNotes(null), {});
  assert.deepEqual(normalizeFieldNotes([]), {});
  const safe = normalizeFieldNotes({'psychology:thoughts':'<script>safe as text</script>', '__proto__':'unsafe', 'bad:code':22,'bad/key':'no'});
  assert.deepEqual(safe,{'psychology:thoughts':'<script>safe as text</script>'});
  assert.equal(normalizeFieldNotes({'laws:ph-privacy':'a'.repeat(9000)})['laws:ph-privacy'].length,MAX_FIELD_NOTE_LENGTH);
});
test('field notes can be written and cleared safely, retaining unrelated answers',()=>{
  const first = setFieldNote({}, 'business:unit-economics', 'Price=250; cost=150');
  const second = setFieldNote(first, 'savings:cashflow-map','Monthly reserve: 500');
  assert.equal(first['business:unit-economics'], 'Price=250; cost=150');
  assert.equal(second['savings:cashflow-map'], 'Monthly reserve: 500');
  const cleared = setFieldNote(second,'business:unit-economics',' ');
  assert.equal(cleared['business:unit-economics'], undefined);
  assert.equal(cleared['savings:cashflow-map'], 'Monthly reserve: 500');
});
test('notebook is present in lesson reader, offline cache and production build',()=>{
  const app=fs.readFileSync('app.js','utf8');
  const build=fs.readFileSync('scripts/build.mjs','utf8');
  const sw=fs.readFileSync('sw.js','utf8');
  assert.ok(app.includes('data-field-note='));
  assert.ok(app.includes('normalizeFieldNotes(clean.fieldNotes)'));
  assert.ok(app.includes('setFieldNote(saved.fieldNotes'));
  assert.ok(build.includes("'fieldnotes.js'"));
  assert.ok(sw.includes('/fieldnotes.js'));
});
