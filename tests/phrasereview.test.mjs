import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PHRASEBOOK} from '../phrasebook.js';
import {normalizePhraseReviews,duePhraseReviews,phraseReviewStats,ratePhraseReview,clearPhraseReviews} from '../phrasereview.js';

const when=1730000000000;
test('new phrases are due and a recalled phrase schedules review one day later',()=>{
 assert.equal(duePhraseReviews({},'ja',PHRASEBOOK,when).length,8);
 assert.deepEqual(phraseReviewStats({},'ja',PHRASEBOOK,when),{
  total:8,due:8,reviewed:0,scheduled:0,nextAt:null});
 const saved=ratePhraseReview({},'ja','1','remembered',PHRASEBOOK,when);
 assert.equal(saved['ja:1'].step,0);
 assert.equal(saved['ja:1'].attempts,1);
 assert.equal(saved['ja:1'].successes,1);
 assert.equal(duePhraseReviews(saved,'ja',PHRASEBOOK,when+1000).length,7);
 assert.equal(duePhraseReviews(saved,'ja',PHRASEBOOK,when+86400000).length,8);
 assert.equal(phraseReviewStats(saved,'ja',PHRASEBOOK,when).scheduled,1);
 assert.deepEqual(normalizePhraseReviews(JSON.parse(JSON.stringify(saved)),PHRASEBOOK),saved);
});
test('again schedules a ten-minute repeat and does not mark phrase learned',()=>{
 let saved=ratePhraseReview({},'fil','2','again',PHRASEBOOK,when);
 assert.equal(saved['fil:2'].step,-1);
 assert.equal(saved['fil:2'].successes,0);
 assert.equal(duePhraseReviews(saved,'fil',PHRASEBOOK,when+599999).length,7);
 assert.equal(duePhraseReviews(saved,'fil',PHRASEBOOK,when+600000).length,8);
 saved=ratePhraseReview(saved,'fil','2','remembered',PHRASEBOOK,when+600000);
 assert.equal(saved['fil:2'].step,0);
 assert.equal(saved['fil:2'].attempts,2);
 assert.equal(saved['fil:2'].successes,1);
});
test('different language packs keep isolated records and one-language clearing',()=>{
 let records=ratePhraseReview({},'ja','1','remembered',PHRASEBOOK,when);
 records=ratePhraseReview(records,'ko','1','remembered',PHRASEBOOK,when);
 const after=clearPhraseReviews(records,'ja',PHRASEBOOK);
 assert.equal(after['ja:1'],undefined);
 assert.ok(after['ko:1']);
 assert.equal(duePhraseReviews(after,'ja',PHRASEBOOK,when).length,8);
 assert.equal(duePhraseReviews(after,'ko',PHRASEBOOK,when).length,7);
});
test('malformed imported records and invalid actions cannot escape known phrases',()=>{
 const good=ratePhraseReview({},'ja','1','remembered',PHRASEBOOK,when);
 const corrupt={...good,'ja:100':good['ja:1'],'fake:1':good['ja:1'],
  'shadow:case-pressure-defenses':good['ja:1'],'ko:2':{...good['ja:1'],step:99},
  'en:3':{...good['ja:1'],dueAt:'not-date'},
  'es:1':'not-a-record'};
 assert.deepEqual(normalizePhraseReviews(corrupt,PHRASEBOOK),good);
 for(const [code,id,outcome,time] of [
  ['xx','1','again',when],['ja','99','again',when],['ja','1','wrong',when],
  ['ja','1','remembered',Infinity],['ja','1','remembered',when+2000]
 ])assert.deepEqual(ratePhraseReview(good,code,id,outcome,PHRASEBOOK,time),good);
 assert.deepEqual(clearPhraseReviews(good,'unknown',PHRASEBOOK),good);
 assert.deepEqual(duePhraseReviews(good,'unknown',PHRASEBOOK),[]);
 assert.equal(phraseReviewStats(good,'unknown',PHRASEBOOK),null);
});
test('review engine is included in local backup normalization and PWA build',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),
  build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/phrasereview\.js'/);
 assert.match(app,/phraseReviews:normalizePhraseReviews\(data\.phraseReviews,PHRASEBOOK\)/);
 assert.match(app,/phraseReviews:normalizePhraseReviews\(clean\.phraseReviews,PHRASEBOOK\)/);
 assert.match(sw,/\/phrasereview\.js/);
 assert.match(build,/'phrasereview\.js'/);
});
