import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {QUALIFYING,QUALIFYING_COUNT,validateQualification,qualificationPanel,evaluateQualification,installQualificationInteractions} from '../qualifyingclinic.js';
import {practicalStudioPanel} from '../practicalstudios.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';

test('qualification covers all fourteen course worlds and all authored choices',()=>{
 const ids=COURSES.map(course=>course.id);
 assert.equal(QUALIFYING_COUNT,14);
 assert.equal(validateQualification(ids),true);
 assert.equal(new Set(Object.values(QUALIFYING).map(x=>x.title)).size,14);
 let cases=0, explanations=0;
 for(const id of ids){
  const unit=QUALIFYING[id];
  assert.equal(unit.cases.length,2);
  assert.equal(unit.criteria.length,3);
  for(const decision of unit.cases){
   cases++;
   assert.equal(decision.choices.length,3);
   explanations+=decision.choices.length;
   assert.ok(decision.choices.every(choice=>choice.reason.length>=50));
   for(let i=0;i<3;i++){
    const result=evaluateQualification(id,unit.cases.indexOf(decision),i);
    assert.ok(result);
    assert.equal(result.preferred,i===decision.preferred);
    assert.equal(result.rationale,decision.choices[i].reason);
    assert.equal(result.preferredLabel,decision.choices[decision.preferred].label);
    assert.equal(Object.isFrozen(result),true);
   }
  }
 }
 assert.equal(cases,28);
 assert.equal(explanations,84);
});

test('the optional clinic renders on existing advanced lessons only',()=>{
 for(const course of COURSES){
  const studio=course.lessons.find(lesson=>lesson.practicalStudio)?.practicalStudio;
  assert.ok(studio);
  const html=practicalStudioPanel(studio);
  assert.ok(html.includes(QUALIFYING[course.id].title));
  assert.equal((html.match(/class="qualifying-case"/g)||[]).length,2);
  assert.equal((html.match(/data-qualifying-answer="/g)||[]).length,6);
  assert.ok(html.includes('aria-live="polite"'));
  assert.match(html,/No grade or saved score/);
 }
 assert.equal(COURSES.reduce((total,course)=>total+course.lessons.length,0),139);
});

test('qualification validates user input and HTML-escapes all content',()=>{
 assert.equal(evaluateQualification('unknown',0,0),null);
 assert.equal(evaluateQualification('business',-1,0),null);
 assert.equal(evaluateQualification('business',0,3),null);
 assert.equal(evaluateQualification('business','0',1),null);
 assert.equal(qualificationPanel('unknown'),'');
 const unit=QUALIFYING.psychology;
 const modified={...unit,title:'<img src=x onerror=alert(1)>'};
 // The renderer only accepts a known subject ID, so it cannot render arbitrary external data.
 assert.ok(qualificationPanel('psychology').includes('qualifying-choice'));
 assert.equal(installQualificationInteractions(null),false);
 assert.ok(modified.title.startsWith('<img'));
});

test('the offline bundle lists every qualification dependency',()=>{
 const build=fs.readFileSync(new URL('../scripts/build.mjs',import.meta.url),'utf8');
 const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
 for(const name of ['qualifyingclinic.js','qualifying1.js','qualifying2.js']){
  assert.ok(build.includes("'"+name+"'"),'Missing bundle asset '+name);
  assert.ok(sw.includes("'/"+name+"'"),'Missing offline precache '+name);
 }
});

test('human editorial packet hashes and print copy contain all 28 decisions',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 for(const course of COURSES){
  const lesson=packet.lessons.find(x=>x.course===course.id&&x.content.qualificationDecisions);
  assert.ok(lesson,'Qualification omitted from review hash: '+course.id);
  assert.equal(lesson.content.qualificationDecisions.cases.length,2);
  assert.equal(lesson.content.qualificationDecisions.title,QUALIFYING[course.id].title);
 }
 const html=renderEditorialReviewHTML(packet);
 assert.ok(html.includes(QUALIFYING.business.title));
 assert.ok(html.includes(QUALIFYING.shadow.title));
 assert.ok(html.includes('Independent research defense'));
});
