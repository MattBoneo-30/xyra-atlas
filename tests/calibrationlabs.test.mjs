import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,LANGUAGES,totalLessons} from '../data.js';
import {PHRASEBOOK,getPhrasePack} from '../phrasebook.js';
import {CLINICS} from '../clinics.js';
import {CALIBRATION_LABS,attachCalibrationLabs,calibrationFeedback,calibrationLabPanel} from '../calibrationlabs.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {buildLanguageReviewPacket,languagePhraseHash,renderLanguageReviewMarkdown} from '../scripts/language-review-packet.mjs';

test('all fourteen subjects have two distinct evidence decisions and contextual feedback for every option',()=>{
 assert.equal(totalLessons,139);
 assert.equal(Object.keys(CALIBRATION_LABS).length,14);
 const titles=new Set(),situations=new Set(),prompts=new Set(),explanations=new Set();
 for(const course of COURSES){
  const lab=CALIBRATION_LABS[course.id],lesson=course.lessons.find(l=>l.id===lab.lessonId);
  assert.ok(lesson&&lesson.stage==='Intermediate'&&lesson.calibrationLab===lab,course.id);
  assert.ok(Object.isFrozen(lab)&&Object.isFrozen(lab.rubric));
  assert.equal(lab.reviewStatus,'pending-independent-review');
  assert.ok(lab.title.length>=25&&lab.situation.length>=130);
  assert.ok(!titles.has(lab.title)&&!situations.has(lab.situation));
  titles.add(lab.title);situations.add(lab.situation);
  assert.ok(lab.reveal.length>=110&&lab.transfer.length>=100);
  assert.equal(lab.rubric.length,3);
  for(const [r,round] of [lab.first,lab.second].entries()){
   assert.ok(Object.isFrozen(round)&&Object.isFrozen(round.options));
   assert.ok(!prompts.has(round.prompt));prompts.add(round.prompt);
   assert.equal(round.options.length,3);
   assert.ok(round.prompt.length>=35);
   for(let choice=0;choice<3;choice++){
    const option=round.options[choice];
    assert.ok(option[0].length>=24&&option[1].length>=75,course.id+' round '+r+' option '+choice);
    assert.ok(!explanations.has(option[1]),'duplicated explanation');
    explanations.add(option[1]);
    const response=calibrationFeedback(course.id,r,choice);
    assert.deepEqual(response,{preferred:choice===round.preferred,explanation:option[1],
     revision:r===0?lab.reveal:lab.transfer});
   }
  }
  const html=calibrationLabPanel(lab,course.id);
  assert.equal((html.match(/data-action="calibration-answer"/g)||[]).length,6);
  assert.match(html,/data-calibration-round="1" hidden/);
  assert.match(html,/data-calibration-reveal hidden/);
  assert.match(html,/data-calibration-finish hidden/);
  assert.match(html,/pending/);
 }
 assert.equal(titles.size,14);
 // Answer keys must not make the best-supported choice trivially predictable.
 assert.deepEqual(new Set(Object.values(CALIBRATION_LABS).map(l=>l.first.preferred)),new Set([0,1,2]));
 assert.deepEqual(new Set(Object.values(CALIBRATION_LABS).map(l=>l.second.preferred)),new Set([0,1,2]));
 assert.ok(Object.values(CALIBRATION_LABS).some(l=>l.first.preferred!==l.second.preferred));
 assert.equal(prompts.size,28);
 assert.equal(explanations.size,84);
 assert.equal(attachCalibrationLabs(COURSES),0,'re-attaching to stable lessons changes nothing');
 assert.equal(calibrationFeedback('invalid',0,0),null);
 assert.equal(calibrationFeedback('business',2,0),null);
 assert.equal(calibrationFeedback('business',0,NaN),null);
 assert.equal(calibrationFeedback('business',0,6),null);
 assert.equal(calibrationLabPanel(null,'business'),'');
});
test('every new claim enters the independent reviewer hash; no false qualification',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.decisions,42);
 assert.equal(packet.totals.expertApprovedLessons,0);
 for(const course of COURSES){
  const lab=CALIBRATION_LABS[course.id];
  const record=packet.lessons.find(l=>l.id===course.id+':'+lab.lessonId);
  assert.ok(record?.content?.evidenceCalibration);
  assert.equal(record.content.evidenceCalibration.rounds.length,2);
  assert.equal(record.content.evidenceCalibration.rounds[0].choices.length,3);
  assert.equal(record.content.evidenceCalibration.reviewStatus,'pending-independent-review');
  assert.ok(record.content.frontierFieldwork,'the earlier fieldwork must also be reviewed');
  assert.notEqual(reviewHash({...record.content,evidenceCalibration:{...record.content.evidenceCalibration,
   newEvidence:'Reviewer corrected evidence'}}),record.contentHash);
 }
 const language=buildLanguageReviewPacket(PHRASEBOOK,LANGUAGES);
 assert.equal(language.fieldwork.length,20);
 for(const {code} of LANGUAGES){
  const item=language.fieldwork.find(x=>x.content.code===code);
  assert.ok(item&&item.content.linkedPhrases.length===3);
  assert.equal(item.reviewStatus,'awaiting-qualified-language-review');
  assert.equal(item.reviewerAttestation,null);
  assert.equal(item.contentHash,languagePhraseHash(item.content));
  assert.deepEqual(item.content.linkedPhrases.map(x=>x.target),
    [3,4,6].map(i=>getPhrasePack(code).phrases[i].target));
 }
 const markdown=renderLanguageReviewMarkdown(language);
 assert.match(markdown,/Multi-turn language fieldwork — review pending/);
 assert.match(markdown,/native\/regional review required/i);
});
test('offline static release and independent UI do not add progress or tracking paths',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const inter=fs.readFileSync('calibration-interactions.js','utf8');
 const styles=fs.readFileSync('calibration-labs.css','utf8');
 const pwa=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const html=fs.readFileSync('index.html','utf8');
 assert.match(app,/calibrationLabPanel\(l\.calibrationLab,c\.id\)/);
 assert.match(app,/calibration-interactions\.js/);
 assert.match(inter,/data-calibration-finish/);
 assert.match(inter,/data-calibration-round/);
 assert.doesNotMatch(inter,/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 for(const name of ['calibrationlabs.js','calibration-interactions.js','calibration-labs.css']){
  assert.ok(pwa.includes('/'+name),'offline precache missing '+name);
  assert.ok(build.includes("'"+name+"'"),'production bundle missing '+name);
 }
 assert.match(html,/calibration-labs\.css/);
 assert.match(styles,/focus-visible/);
 assert.doesNotMatch(html,/http[^"']*calibration/);
 assert.equal(JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates[0].complete,false);
});
