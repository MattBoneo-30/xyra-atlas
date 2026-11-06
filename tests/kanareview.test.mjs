import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JAPANESE_UNITS} from '../japanesefoundation.js';
import {learnedKana,normalizeKanaReviews,kanaReviewStatus,evaluateKanaReview,
 scheduleKanaReview,kanaContrastNote,kanaReviewPanel,KANA_RETRY_MS,KANA_REVIEW_DAYS} from '../kanareview.js';

const now=1783500000000;
const vowelDone=['vowels'];
const kDone=['vowels','hiragana-k'];

test('kana review stays locked until the learner completes the actual lesson',()=>{
 assert.equal(learnedKana([]).length,0);
 assert.deepEqual(learnedKana(vowelDone).map(x=>x.kana),['あ','い','う','え','お']);
 assert.deepEqual(learnedKana(kDone).map(x=>x.kana),['あ','い','う','え','お','か','き','く','け','こ']);
 assert.equal(learnedKana(['hiragana-k']).length,0,'out-of-order completion cannot unlock kana');
 assert.equal(learnedKana(['vowels','hiragana-ks']).length,15,'legacy K/S completion unlocks both previously completed rows');
 const all=learnedKana(JAPANESE_UNITS.map(x=>x.id));
 assert.equal(all.length,92,'only 46 basic hiragana and 46 basic katakana');
 assert.equal(new Set(all.map(x=>x.kana)).size,92);
});
test('review validates persisted data and rejects malicious, malformed or unknown entries',()=>{
 const reviews=normalizeKanaReviews({
  'あ':{step:2,dueAt:now,attempts:3,misses:1},
  'か':{step:99,dueAt:now,attempts:1},
  '':{step:1,dueAt:now},
  'evil':{step:2,dueAt:now},
  'シ':{step:1,dueAt:NaN},
  '__proto__':{step:1,dueAt:now},
  'め':{step:1,dueAt:now,attempts:2,misses:99}
 });
 assert.deepEqual(Object.keys(reviews),['あ','め']);
 assert.deepEqual(reviews['あ'],{step:2,dueAt:now,attempts:3,misses:1});
 assert.equal(reviews['め'].misses,0);
 assert.deepEqual(Object.keys(normalizeKanaReviews([])),[]);
 assert.deepEqual(Object.keys(normalizeKanaReviews(null)),[]);
});
test('newly learned symbols are due, then a remembered sound is scheduled',()=>{
 const first=kanaReviewStatus(vowelDone,{},now);
 assert.equal(first.available.length,5);
 assert.equal(first.due.length,5);
 assert.equal(first.practiced,0);
 assert.equal(first.scheduled.length,0);
 const item=first.due[0];
 assert.deepEqual(evaluateKanaReview(item,' A '),{valid:true,correct:true,expected:'a'});
 assert.equal(evaluateKanaReview(item,'i').correct,false);
 assert.equal(evaluateKanaReview(item,'').valid,false);
 assert.equal(evaluateKanaReview(null,'a').valid,false);
 let progress=scheduleKanaReview(null,true,now);
 assert.equal(progress.step,1);
 assert.equal(progress.dueAt,now+86400000);
 for(let i=1;i<KANA_REVIEW_DAYS.length;i++){
  progress=scheduleKanaReview(progress,true,now);
  assert.equal(progress.step,i+1);
  assert.equal(progress.dueAt,now+KANA_REVIEW_DAYS[i]*86400000);
 }
 assert.equal(scheduleKanaReview(progress,true,now).step,6,'last interval is capped');
 const state=kanaReviewStatus(vowelDone,{'あ':progress},now);
 assert.equal(state.due.length,4);
 assert.equal(state.practiced,1);
});
test('review queue prioritizes unseen kana, then difficult and oldest due readings without changing saved state',()=>{
 const previous={
  'あ':{step:0,dueAt:now-10000,attempts:5,misses:1},
  'い':{step:1,dueAt:now-50000,attempts:3,misses:2},
  'え':{step:3,dueAt:now-60000,attempts:3,misses:0}
 };
 const before=structuredClone(previous);
 const state=kanaReviewStatus(vowelDone,previous,now);
 assert.deepEqual(state.due.map(item=>item.kana),['う','お','い','あ','え']);
 assert.equal(state.newCount,2);
 assert.equal(state.weakCount,2);
 assert.deepEqual(previous,before,'queue selection never rewrites saved review progress');
 assert.equal(kanaReviewStatus(vowelDone,previous,now).due[0].kana,'う','stable offline order');
 const html=kanaReviewPanel({done:vowelDone,reviews:previous,now});
 assert.match(html,/New readings come first/);
 assert.match(html,/<b>2<\/b> new/);
});
test('misses show correction, return later and never erase the completed foundation',()=>{
 const remembered=scheduleKanaReview(null,true,now);
 const missed=scheduleKanaReview(remembered,false,now);
 assert.equal(missed.step,0);
 assert.equal(missed.dueAt,now+KANA_RETRY_MS);
 assert.equal(missed.attempts,2);
 assert.equal(missed.misses,1);
 const st=kanaReviewStatus(vowelDone,{'あ':missed},now);
 assert.equal(st.available.length,5);
 assert.equal(st.due.length,4,'missed item rests ten minutes');
 assert.equal(kanaReviewStatus(vowelDone,{'あ':missed},now+KANA_RETRY_MS).due.length,5);
 assert.equal(kanaReviewPanel().includes('kana-review-answer'),false,'untrained beginners see no quizzes');
 assert.ok(kanaReviewPanel({done:vowelDone,reviews:{},now}).includes('kana-review-answer'));
 const escaped=kanaReviewPanel({done:vowelDone,reviews:{},feedback:{kana:'あ',expected:'<script>x</script>',correct:false},now});
 assert.equal(escaped.includes('<script>'),false);
 assert.ok(escaped.includes('&lt;script&gt;'));
});
test('similar-character help appears only after both characters were actually taught',()=>{
 assert.equal(kanaContrastNote('シ',learnedKana(vowelDone)),'');
 const completed=JAPANESE_UNITS.map(x=>x.id);
 assert.ok(kanaContrastNote('シ',learnedKana(completed)).includes('シ and ツ'));
 assert.ok(kanaContrastNote('ぬ',learnedKana(completed)).includes('ぬ'));
});
test('kana review is included in app state, offline assets, backups and selective privacy erasure',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const privacy=fs.readFileSync('datacontrols.js','utf8');
 assert.match(app,/japaneseKanaReviews: normalizeKanaReviews\(data\.japaneseKanaReviews\)/);
 assert.match(app,/japaneseKanaReviews:normalizeKanaReviews\(clean\.japaneseKanaReviews\)/);
 assert.match(app,/kanaReviewPanel\(/);
 assert.match(app,/action==='kana-review-check'/);
 assert.match(sw,/\/kanareview\.js/);
 assert.match(build,/'kanareview\.js'/);
 assert.match(privacy,/japaneseKanaReviews/);
});
