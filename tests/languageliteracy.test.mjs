import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {LANGUAGES} from '../data.js';
import {PHRASEBOOK} from '../phrasebook.js';
import {LANGUAGE_LITERACY_CHECKS,getLanguageLiteracyChecks,validateLanguageLiteracyChecks,languageLiteracyFeedback,languageLiteracyPanel} from '../languageliteracy.js';
import {buildLanguageReviewPacket,renderLanguageReviewMarkdown,languagePhraseHash} from '../scripts/language-review-packet.mjs';

test('40 distinct language-specific script, sound and use checks extend every language',()=>{
 const result=validateLanguageLiteracyChecks(LANGUAGES.map(l=>l.code));
 assert.deepEqual(result,{languages:20,checks:40});
 assert.equal(Object.keys(LANGUAGE_LITERACY_CHECKS).length,20);
 const seen=new Set();
 for(const {code} of LANGUAGES){
  const questions=getLanguageLiteracyChecks(code);
  assert.equal(questions.length,2);
  for(const [i,q] of questions.entries()){
   assert.ok(q.why.length>=120&&q.try.length>=80);
   assert.equal(new Set(q.choices).size,3);
   assert.ok(!seen.has(q.question),q.question);
   seen.add(q.question);
   assert.deepEqual(languageLiteracyFeedback(code,i,q.correct),{
    correct:true,explanation:q.why,transfer:q.try
   });
   for(const choice of [0,1,2]){
    const feedback=languageLiteracyFeedback(code,i,choice);
    assert.equal(feedback.correct,choice===q.correct);
   }
  }
 }
 assert.equal(getLanguageLiteracyChecks('__proto__'),null);
 assert.equal(languageLiteracyFeedback('invalid',0,0),null);
 assert.equal(languageLiteracyFeedback('ja',20,0),null);
 assert.equal(languageLiteracyFeedback('ja',0,88),null);
 assert.equal(languageLiteracyFeedback('ja',NaN,0),null);
});

test('Japanese kana gating, ungraded feedback and safe HTML are preserved',()=>{
 const gated=languageLiteracyPanel('ja',{unlocked:false});
 assert.match(gated,/Complete the existing Japanese kana/);
 assert.doesNotMatch(gated,/data-action="language-literacy-answer"/);
 const unlocked=languageLiteracyPanel('ja',{unlocked:true});
 assert.equal((unlocked.match(/data-action="language-literacy-answer"/g)||[]).length,6);
 assert.match(unlocked,/aria-live="polite"/);
 assert.match(unlocked,/aria-pressed="false"/);
 assert.match(languageLiteracyPanel('ko'),/Hangul/);
 assert.match(languageLiteracyPanel('ar'),/Arabic/);
 assert.equal(languageLiteracyPanel('invalid'),'');
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/languageLiteracyPanel\(saved\.language,\{unlocked:showPhrasePractice\}\)/);
 assert.match(app,/action==='language-literacy-answer'/);
 assert.match(app,/languageLiteracyFeedback\(saved\.language,index,choice\)/);
 const start=app.indexOf("else if(action==='language-literacy-answer')");
 const end=app.indexOf("else if(action==='foundation-diagnostic-answer')",start);
 assert.ok(start>=0&&end>start);
 assert.doesNotMatch(app.slice(start,end),/persist\(|saved\.completed|saved\.answers/);
});

test('all 40 examples and their explanations enter the qualified-review workbook with hashes',()=>{
 const packet=buildLanguageReviewPacket(PHRASEBOOK,LANGUAGES);
 assert.equal(packet.records.length,160);
 assert.equal(packet.foundations.length,20);
 assert.equal(packet.literacyChecks.length,40);
 for(const item of packet.literacyChecks){
  assert.equal(item.reviewStatus,'awaiting-qualified-language-review');
  assert.equal(item.reviewerAttestation,null);
  assert.equal(item.contentHash,languagePhraseHash(item.content));
  assert.equal(item.content.choices.length,3);
  assert.ok(item.content.explanation.length>=120);
 }
 const markdown=renderLanguageReviewMarkdown(packet);
 assert.match(markdown,/Literacy pattern checks — qualified review pending/);
 assert.match(markdown,/Exact item hash:/);
 const subset=buildLanguageReviewPacket({fil:PHRASEBOOK.fil},[{code:'fil',name:'Filipino'}]);
 assert.equal(subset.records.length,8);
 assert.equal(subset.literacyChecks.length,2);
 assert.equal(subset.foundations.length,1);
});

test('new literacy modules and styles are included in offline production and never add progress keys',()=>{
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const file of ['languageliteracy.js','literacychecks1.js','literacychecks2.js','literacy-studio.css']){
  assert.ok(sw.includes('/'+file),file+' is absent from PWA precache');
  assert.ok(build.includes("'"+file+"'"),file+' is absent from production assets');
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/literacy-studio.css"'));
 const source=fs.readFileSync('languageliteracy.js','utf8');
 assert.doesNotMatch(source,/localStorage|sessionStorage|\bfetch\(|speechSynthesis/);
});
