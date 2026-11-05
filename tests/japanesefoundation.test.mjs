import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
 JAPANESE_UNITS,JAPANESE_BASIC_HIRAGANA,JAPANESE_BASIC_KATAKANA,
 JAPANESE_SPEAKABLE,normalizeJapaneseFoundationDone,evaluateJapaneseAnswer,japaneseFoundationPanel
} from '../japanesefoundation.js';

test('Japanese teaches five vowels and all 46 basic characters in each kana system',()=>{
 assert.equal(JAPANESE_UNITS.length,9);
 assert.deepEqual(JAPANESE_BASIC_HIRAGANA.slice(0,5),['あ','い','う','え','お']);
 assert.deepEqual(JAPANESE_BASIC_KATAKANA.slice(0,5),['ア','イ','ウ','エ','オ']);
 for(const alphabet of [JAPANESE_BASIC_HIRAGANA,JAPANESE_BASIC_KATAKANA]){
  assert.equal(alphabet.length,46);
  assert.equal(new Set(alphabet).size,46);
 }
 assert.equal(JAPANESE_BASIC_HIRAGANA.includes('し'),true);
 assert.equal(JAPANESE_BASIC_HIRAGANA.includes('つ'),true);
 assert.equal(JAPANESE_BASIC_HIRAGANA.includes('ん'),true);
 assert.equal(JAPANESE_BASIC_KATAKANA.includes('シ'),true);
 assert.equal(JAPANESE_BASIC_KATAKANA.includes('ン'),true);
 assert.ok(JAPANESE_SPEAKABLE.has('あ'));
 assert.ok(JAPANESE_SPEAKABLE.has('カメラ'));
});
test('each foundation unit provides explanation, practical decoding and assessable recall',()=>{
 const ids=new Set();
 for(const unit of JAPANESE_UNITS){
  assert.ok(!ids.has(unit.id),'no duplicate unit ids');
  ids.add(unit.id);
  assert.ok(unit.teaching.length>=3,unit.id+' needs multiple instructional explanations');
  assert.ok(unit.teaching.every(([heading,body])=>heading.length>6&&body.length>50));
  assert.ok(unit.examples.length>=3&&unit.examples.every(e=>e.breakdown.length>10));
  assert.equal(unit.practice.length,3,unit.id+' has a post-instruction recall checkpoint');
  for(let i=0;i<unit.practice.length;i++){
   assert.equal(evaluateJapaneseAnswer(unit.id,i,unit.practice[i].answer.toUpperCase()).correct,true);
   assert.equal(evaluateJapaneseAnswer(unit.id,i,'🦄 not an answer').correct,false);
  }
 }
 assert.equal(evaluateJapaneseAnswer('invalid',0,'a').valid,false);
 assert.equal(evaluateJapaneseAnswer('vowels',99,'a').valid,false);
 assert.equal(evaluateJapaneseAnswer('vowels',0,'a<script>').correct,false);
 assert.equal(evaluateJapaneseAnswer('hiragana-ks',1,'si').correct,true,'common romanization variant accepted');
 assert.equal(evaluateJapaneseAnswer('katakana-rest',2,'long vowels').correct,true);
});
test('completion normalization accepts only the continuous foundation prerequisite sequence',()=>{
 const ids=JAPANESE_UNITS.map(unit=>unit.id);
 assert.deepEqual(normalizeJapaneseFoundationDone(null),[]);
 assert.deepEqual(normalizeJapaneseFoundationDone(['bogus',ids[0]]),[]);
 assert.deepEqual(normalizeJapaneseFoundationDone([ids[1]]),[]);
 assert.deepEqual(normalizeJapaneseFoundationDone([ids[0],ids[2]]),[ids[0]]);
 assert.deepEqual(normalizeJapaneseFoundationDone([ids[1],ids[0],ids[0]]),[ids[0],ids[1]]);
 assert.deepEqual(normalizeJapaneseFoundationDone(ids),ids);
});
test('new learners see instruction before questions, locked later stages and safe markup',()=>{
 const initial=japaneseFoundationPanel();
 assert.match(initial,/japanese-teaching/);
 assert.match(initial,/japanese-kana-grid/);
 assert.match(initial,/あ/);
 assert.match(initial,/Try a short recall check|Now try a short recall check/);
 assert.doesNotMatch(initial,/id="japanese-answer"/,'question stays hidden until requested');
 assert.match(initial,/japanese-unit-select[^>]*disabled/);
 assert.match(initial,/data-action="japanese-speak"/);
 assert.match(initial,/typed questions/);
 const working=japaneseFoundationPanel({practiceIndex:1,feedback:'Hint: try again'});
 assert.match(working,/id="japanese-answer"/);
 assert.match(working,/Hint: try again/);
 const finished=japaneseFoundationPanel({done:['vowels'],activeId:'vowels'});
 assert.match(finished,/Continue to the next foundation/);
 const malicious=japaneseFoundationPanel({feedback:'<script>alert(1)</script>',practiceIndex:0});
 assert.doesNotMatch(malicious,/<script>/);
 assert.match(malicious,/&lt;script&gt;/);
});
test('the app, backups, privacy reset and offline bundle include kana instruction',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const worker=fs.readFileSync('sw.js','utf8');
 const privacy=fs.readFileSync('datacontrols.js','utf8');
 assert.match(app,/japaneseFoundationPanel\(/);
 assert.match(app,/japaneseFoundationDone:normalizeJapaneseFoundationDone\(clean\.japaneseFoundationDone\)/);
 assert.match(app,/saved\.japaneseFoundationDone=normalizeJapaneseFoundationDone/);
 assert.match(app,/JAPANESE_SPEAKABLE\.has\(spoken\)/);
 assert.match(privacy,/japaneseFoundationDone/);
 assert.match(build,/'japanesefoundation\.js'/);
 assert.match(worker,/\/japanesefoundation\.js/);
});
