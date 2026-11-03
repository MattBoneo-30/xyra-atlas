import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PHRASEBOOK} from '../phrasebook.js';
import {LANGUAGE_CHALLENGE_MODES,createLanguageChallenge,normalizeLanguageChallenge,
 currentLanguageQuestion,answerLanguageChallenge,advanceLanguageChallenge,languageChallengeResults,
 normalizeLanguageChallengeHistory,recordLanguageChallengeHistory} from '../languagechallenge.js';

test('nine authored packs generate seeded, varied four-option challenges in either direction',()=>{
 assert.deepEqual(LANGUAGE_CHALLENGE_MODES,['recognition','meaning']);
 for(const [code,pack] of Object.entries(PHRASEBOOK)){
  for(const mode of LANGUAGE_CHALLENGE_MODES){
   const a=createLanguageChallenge(PHRASEBOOK,code,{mode,seed:231,now:1730000000000});
   const b=createLanguageChallenge(PHRASEBOOK,code,{mode,seed:231,now:1730000000000});
   assert.deepEqual(a,b);
   assert.equal(a.ids.length,pack.phrases.length);
   assert.equal(new Set(a.ids).size,a.ids.length);
   const q=currentLanguageQuestion(a,PHRASEBOOK);
   assert.equal(q.options.length,4);
   assert.equal(new Set(q.options.map(x=>x.id)).size,4);
   assert.ok(q.options.some(x=>x.id===q.correctId));
   const entry=pack.phrases.find(p=>p.id===q.correctId);
   assert.equal(q.prompt,mode==='recognition'?entry.english:entry.target);
   assert.equal(q.correctText,mode==='recognition'?entry.target:entry.english);
  }
 }
 assert.equal(createLanguageChallenge(PHRASEBOOK,'xx'),null);
 assert.equal(createLanguageChallenge(PHRASEBOOK,'ja',{mode:'fake'}),null);
});
test('answers are immutable, cannot be skipped, and do not change other app progress',()=>{
 let s=createLanguageChallenge(PHRASEBOOK,'ja',{seed:99,now:1730000000000});
 assert.equal(advanceLanguageChallenge(s,PHRASEBOOK).position,0);
 const q=currentLanguageQuestion(s,PHRASEBOOK);
 assert.equal(answerLanguageChallenge(s,'invalid',PHRASEBOOK).position,0);
 const wrong=q.options.find(o=>o.id!==q.correctId);
 s=answerLanguageChallenge(s,wrong.id,PHRASEBOOK);
 assert.equal(languageChallengeResults(s,PHRASEBOOK).correct,0);
 assert.equal(answerLanguageChallenge(s,q.correctId,PHRASEBOOK).answers[q.id],wrong.id);
 s=advanceLanguageChallenge(s,PHRASEBOOK);
 assert.equal(s.position,1);
 while(s.position<s.ids.length){
  const current=currentLanguageQuestion(s,PHRASEBOOK);
  s=advanceLanguageChallenge(answerLanguageChallenge(s,current.correctId,PHRASEBOOK),PHRASEBOOK);
 }
 const score=languageChallengeResults(s,PHRASEBOOK);
 assert.equal(score.done,true);
 assert.equal(score.correct,score.total-1);
 assert.equal(score.answered,score.total);
 assert.equal(currentLanguageQuestion(s,PHRASEBOOK),null);
 assert.equal(advanceLanguageChallenge(s,PHRASEBOOK).position,s.ids.length);
});
test('session validation rejects forged answers, hidden choices and malformed positions',()=>{
 const s=createLanguageChallenge(PHRASEBOOK,'fil',{seed:42,now:1730000000000});
 assert.deepEqual(normalizeLanguageChallenge(JSON.parse(JSON.stringify(s)),PHRASEBOOK),s);
 assert.equal(normalizeLanguageChallenge({...s,code:'unknown'},PHRASEBOOK),null);
 assert.equal(normalizeLanguageChallenge({...s,ids:[...s.ids.slice(1),s.ids[1]]},PHRASEBOOK),null);
 assert.equal(normalizeLanguageChallenge({...s,position:5},PHRASEBOOK),null);
 assert.equal(normalizeLanguageChallenge({...s,answers:{'99':'1'}},PHRASEBOOK),null);
 assert.equal(normalizeLanguageChallenge({...s,answers:{[s.ids[1]]:s.ids[2]}},PHRASEBOOK),null);
 const correct=currentLanguageQuestion(s,PHRASEBOOK);
 const answered=answerLanguageChallenge(s,correct.correctId,PHRASEBOOK);
 assert.equal(normalizeLanguageChallenge(answered,PHRASEBOOK).answers[correct.id],correct.id);
 assert.equal(normalizeLanguageChallenge({...s,answers:{[correct.id]:'99'}},PHRASEBOOK),null);
});
test('score history validates imported values and stores repeat attempts per language',()=>{
 let s=createLanguageChallenge(PHRASEBOOK,'ko',{mode:'meaning',seed:11,now:1730000000000});
 while(s.position<s.ids.length){
  const q=currentLanguageQuestion(s,PHRASEBOOK);
  s=advanceLanguageChallenge(answerLanguageChallenge(s,q.correctId,PHRASEBOOK),PHRASEBOOK);
 }
 const first=recordLanguageChallengeHistory({},s,PHRASEBOOK,1730000000100);
 assert.equal(first.ko.attempts,1);assert.equal(first.ko.best,8);assert.equal(first.ko.last,8);
 const second=recordLanguageChallengeHistory(first,s,PHRASEBOOK,1730000000200);
 assert.equal(second.ko.attempts,2);
 const clean=normalizeLanguageChallengeHistory({...second,evil:{attempts:3,best:8,last:8,lastAt:new Date().toISOString()},
  ja:{attempts:1,best:9,last:3,lastAt:new Date().toISOString()}},PHRASEBOOK);
 assert.deepEqual(Object.keys(clean),['ko']);
 const incomplete=createLanguageChallenge(PHRASEBOOK,'en');
 assert.deepEqual(recordLanguageChallengeHistory(clean,incomplete,PHRASEBOOK),clean);
});
test('Language Challenge is connected to backup restore and offline build',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/languagechallenge\.js'/);
 assert.match(app,/languageChallenge:normalizeLanguageChallenge\(clean\.languageChallenge,PHRASEBOOK\)/);
 assert.match(app,/languageChallengeHistory:normalizeLanguageChallengeHistory\(clean\.languageChallengeHistory,PHRASEBOOK\)/);
 assert.match(sw,/\/languagechallenge\.js/);
 assert.match(build,/'languagechallenge\.js'/);
});
