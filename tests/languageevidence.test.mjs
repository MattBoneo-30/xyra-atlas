import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {LANGUAGES,totalLessons} from '../data.js';
import {PHRASEBOOK,getPhrasePack} from '../phrasebook.js';
import {LANGUAGE_EVIDENCE_MISSIONS,validateLanguageEvidence,languageEvidencePanel} from '../languageevidence.js';
import {buildLanguageReviewPacket,languagePhraseHash,renderLanguageReviewMarkdown} from '../scripts/language-review-packet.mjs';

test('twenty language transfer missions teach a unique locale-specific context without inventing translations',()=>{
 assert.equal(totalLessons,139);
 assert.equal(validateLanguageEvidence(LANGUAGES.map(l=>l.code)),20);
 assert.equal(Object.keys(LANGUAGE_EVIDENCE_MISSIONS).length,20);
 const titles=new Set(),situations=new Set();
 for(const {code} of LANGUAGES){
  const item=LANGUAGE_EVIDENCE_MISSIONS[code];
  assert.ok(item&&item.reviewStatus==='awaiting-qualified-language-review');
  assert.ok(!titles.has(item.title)&&!situations.has(item.problem),code+' duplicates');
  titles.add(item.title);situations.add(item.problem);
  assert.ok(item.problem.length>=85&&item.task.length>=90&&item.verification.length>=85,code);
  const phrase=getPhrasePack(code),html=languageEvidencePanel(code,phrase);
  assert.match(html,/Independent language transfer verification/);
  assert.match(html,/review/);
  assert.equal((html.match(/<li>/g)||[]).length,4);
  for(const i of [3,4,5,6])assert.ok(html.includes(phrase.phrases[i].target.replace(/&/g,'&amp;').replace(/</g,'&lt;')),code+':'+i);
 }
 assert.equal(titles.size,20);
 assert.equal(languageEvidencePanel('xx',getPhrasePack('en')),'');
 const locked=languageEvidencePanel('ja',getPhrasePack('ja'),{unlocked:false});
 assert.match(locked,/Finish the Japanese kana/);
 assert.doesNotMatch(locked,/lang="ja-JP"/);
});
test('independent qualified-language workbook hashes all twenty new transfer cases',()=>{
 const packet=buildLanguageReviewPacket(PHRASEBOOK,LANGUAGES);
 assert.equal(packet.summary.phrases,160);
 assert.equal(packet.transferMissions.length,20);
 for(const row of packet.transferMissions){
  assert.equal(row.reviewStatus,'awaiting-qualified-language-review');
  assert.equal(row.reviewerAttestation,null);
  assert.equal(row.contentHash,languagePhraseHash(row.content));
  assert.equal(row.content.reviewedPhraseModels.length,4);
  const pack=getPhrasePack(row.content.code);
  assert.deepEqual(row.content.reviewedPhraseModels.map(p=>p.translation),[3,4,5,6].map(i=>pack.phrases[i].target));
  assert.notEqual(languagePhraseHash({...row.content,independentTask:'Qualified editorial correction'}),row.contentHash);
 }
 assert.match(renderLanguageReviewMarkdown(packet),/Real-world language transfer — unreviewed/);
 const partial=buildLanguageReviewPacket({ko:PHRASEBOOK.ko},[{code:'ko',name:'Korean'}]);
 assert.equal(partial.transferMissions.length,1);
});
test('all language transfer content is precached, responsive and ungraded',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/languageEvidencePanel\(saved\.language/);
 const source=fs.readFileSync('languageevidence.js','utf8');
 assert.doesNotMatch(source,/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 const css=fs.readFileSync('language-evidence.css','utf8');
 assert.match(css,/focus-visible/);
 for(const path of ['languageevidence.js','language-evidence.css']){
  assert.ok(fs.readFileSync('sw.js','utf8').includes('/'+path));
  assert.ok(fs.readFileSync('scripts/build.mjs','utf8').includes("'"+path+"'"));
 }
 assert.match(fs.readFileSync('index.html','utf8'),/language-evidence\.css/);
 assert.equal(JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates[2].complete,false);
});
