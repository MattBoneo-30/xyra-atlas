import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {LANGUAGES} from '../data.js';
import {PHRASEBOOK,getPhrasePack} from '../phrasebook.js';
import {SENTENCE_BRIDGES,SENTENCE_BRIDGE_COUNT,validateSentenceBridges,sentenceBridgeFeedback,sentenceBridgePanel} from '../sentencebridges.js';
import {buildLanguageReviewPacket,renderLanguageReviewMarkdown,languagePhraseHash} from '../scripts/language-review-packet.mjs';

test('all twenty locales teach two original, sequential grammar observations',()=>{
 assert.equal(SENTENCE_BRIDGE_COUNT,20);
 assert.deepEqual(new Set(Object.keys(SENTENCE_BRIDGES)),new Set(LANGUAGES.map(l=>l.code)));
 assert.deepEqual(validateSentenceBridges(LANGUAGES.map(l=>l.code)),{languages:20,units:40});
 const titles=new Set();
 for(const {code} of LANGUAGES){
  for(const [i,kind] of ['question','negative'].entries()){
   const unit=SENTENCE_BRIDGES[code][kind];
   assert.ok(unit.title.length>=24);
   assert.ok(!titles.has(unit.title));
   titles.add(unit.title);
   for(const name of ['principle','notice','contrast','task'])assert.ok(unit[name].length>=110,code+':'+name);
   assert.equal(unit.check.length,3);
   assert.equal(new Set(unit.check).size,3);
   for(const option of [0,1,2]){
    const outcome=sentenceBridgeFeedback(code,i,option);
    assert.equal(outcome.correct,option===unit.answer);
    assert.equal(outcome.reason,unit.notice);
    assert.equal(outcome.exercise,unit.task);
   }
  }
 }
 assert.equal(titles.size,40);
 assert.equal(sentenceBridgeFeedback('invalid',0,0),null);
 assert.equal(sentenceBridgeFeedback('ja',2,0),null);
 assert.equal(sentenceBridgeFeedback('en',0,NaN),null);
 assert.equal(sentenceBridgeFeedback('en',0,6),null);
});
test('source-authored phrases, Japanese prerequisites, RTL and a locked second stage',()=>{
 for(const {code} of LANGUAGES){
  const pack=getPhrasePack(code),html=sentenceBridgePanel(code,pack);
  assert.equal((html.match(/class="sentence-bridge-unit"/g)||[]).length,2);
  assert.equal((html.match(/class="sentence-bridge-question"/g)||[]).length,2);
  assert.equal((html.match(/data-action="sentence-bridge-answer"/g)||[]).length,6);
  assert.match(html,/data-sentence-step="0"/);
  assert.match(html,/data-sentence-step="1" hidden/);
  assert.ok(html.includes(pack.phrases[4].target.replace(/&/g,'&amp;').replace(/</g,'&lt;')),code+' source question');
  assert.ok(html.includes(pack.phrases[5].target.replace(/&/g,'&amp;').replace(/</g,'&lt;')),code+' source negation');
 }
 const japanese=sentenceBridgePanel('ja',getPhrasePack('ja'),{unlocked:false});
 assert.match(japanese,/Complete the Japanese kana/);
 assert.doesNotMatch(japanese,/data-sentence-step=/);
 assert.doesNotMatch(japanese,/駅はどこですか/);
 assert.match(sentenceBridgePanel('ar',getPhrasePack('ar')),/lang="ar" dir="rtl"/);
 assert.equal(sentenceBridgePanel('wrong',getPhrasePack('en')),'');
});

test('grammar annotations and answers are included in qualified language review with exact hashes',()=>{
 const packet=buildLanguageReviewPacket(PHRASEBOOK,LANGUAGES);
 assert.equal(packet.records.length,160);
 assert.equal(packet.foundations.length,20);
 assert.equal(packet.literacyChecks.length,40);
 assert.equal(packet.sentenceBridges.length,40);
 for(const item of packet.sentenceBridges){
  assert.equal(item.reviewStatus,'awaiting-qualified-language-review');
  assert.equal(item.reviewerAttestation,null);
  assert.equal(item.contentHash,languagePhraseHash(item.content));
  assert.ok(item.content.sourcePhraseId==='5'||item.content.sourcePhraseId==='6');
 }
 const markdown=renderLanguageReviewMarkdown(packet);
 assert.match(markdown,/Sequential sentence structure — qualified review pending/);
 assert.match(markdown,/Worked grammar annotation:/);
 const subset=buildLanguageReviewPacket({ko:PHRASEBOOK.ko},[{code:'ko',name:'Korean'}]);
 assert.equal(subset.sentenceBridges.length,2);
 assert.equal(subset.records.length,8);
});
test('language grammar remains ephemeral and all source assets work offline',()=>{
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const file of ['sentencebridges.js','sentencebridges1.js','sentencebridges2.js','sentence-bridges.css']){
  assert.ok(sw.includes('/'+file),'offline missing '+file);
  assert.ok(build.includes("'"+file+"'"),'build missing '+file);
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/sentence-bridges.css"'));
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/sentenceBridgePanel\(saved\.language,getPhrasePack\(saved\.language\),\{unlocked:showPhrasePractice\}\)/);
 assert.match(app,/action==='sentence-bridge-answer'/);
 assert.match(app,/if\(step===0&&outcome\.correct\)/);
 const from=app.indexOf("else if(action==='sentence-bridge-answer')");
 const to=app.indexOf("else if(action==='language-literacy-answer')",from);
 assert.ok(from>=0&&to>from);
 assert.doesNotMatch(app.slice(from,to),/persist\(|saved\.answers|saved\.completed/);
 assert.doesNotMatch(fs.readFileSync('sentencebridges.js','utf8'),/localStorage|sessionStorage|\bfetch\(|speechSynthesis/);
});
