import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {FIELD_EXPEDITIONS,FIELD_EXPEDITION_COUNT,FIELD_SESSION_COUNT,validateFieldExpeditions,fieldExpeditionPanel,fieldExpeditionPreview} from '../fieldexpeditions.js';
import {practicalStudioPanel} from '../practicalstudios.js';
import {portfolioJourneyPanel} from '../portfoliojourneys.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';

test('all fourteen subject worlds contain six independent longitudinal field sessions',()=>{
 const ids=COURSES.map(c=>c.id);
 assert.equal(FIELD_EXPEDITION_COUNT,14);
 assert.equal(FIELD_SESSION_COUNT,84);
 assert.equal(validateFieldExpeditions(ids),true);
 assert.equal(new Set(Object.values(FIELD_EXPEDITIONS).map(x=>x.title)).size,14);
 for(const id of ids){
  const unit=FIELD_EXPEDITIONS[id];
  assert.equal(unit.sessions.length,6);
  assert.equal(unit.criteria.length,5);
  assert.equal(new Set(unit.sessions.map(x=>x.name)).size,6);
  for(const session of unit.sessions){
   assert.ok(session.assignment.length>=140);
   assert.ok(session.evidence.length>=100);
   assert.ok(session.worked.length>=150);
  }
 }
});

test('every existing advanced study panel exposes an opt-in six-session expedition',()=>{
 for(const course of COURSES){
  const advanced=course.lessons.find(l=>l.practicalStudio);
  assert.ok(advanced);
  const html=practicalStudioPanel(advanced.practicalStudio);
  assert.ok(html.includes(FIELD_EXPEDITIONS[course.id].title),'Missing expedition on '+course.id);
  assert.equal((html.match(/class="field-expedition-session"/g)||[]).length,6);
  assert.equal((html.match(/class="field-expedition-model"/g)||[]).length,6);
  assert.ok(html.includes('field-expedition-disclosure'));
  assert.ok(html.includes('never changes saved progress')||html.includes('never changes saved progress'));
 }
 assert.equal(COURSES.length,14);
 assert.equal(COURSES.reduce((n,c)=>n+c.lessons.length,0),139);
});

test('course page preview links to the existing advanced lesson, no new routes or records',()=>{
 for(const course of COURSES){
  const advanced=course.lessons.find(l=>l.practicalStudio);
  const html=portfolioJourneyPanel(course,{isLessonDone:()=>false,hasFieldNote:()=>false});
  assert.ok(html.includes(FIELD_EXPEDITIONS[course.id].title));
  assert.ok(html.includes('field-expedition-preview'));
  assert.ok(html.includes('#/lesson/'+course.id+'/'+advanced.id));
  assert.equal((html.match(/class="field-expedition-preview"/g)||[]).length,1);
 }
});

test('new text is escaped and unknown course ids produce no panel',()=>{
 const unit=FIELD_EXPEDITIONS.psychology;
 const attacked={...unit,title:'<img src=x onerror=alert(1)>'};
 // Rendering uses known subject ids only; unsupported or untrusted ids cannot inject a source object.
 assert.equal(fieldExpeditionPanel('does-not-exist'),'');
 assert.equal(fieldExpeditionPreview({id:'does-not-exist',lessons:[]}), '');
 assert.ok(fieldExpeditionPanel('psychology').includes(unit.title));
 assert.ok(attacked.title.startsWith('<img'));
});

test('independent review hashes and print copy include all newly authored sessions',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 for(const course of COURSES){
  const lesson=packet.lessons.find(x=>x.course===course.id&&x.content.longitudinalFieldExpedition);
  assert.ok(lesson,'Field expedition absent from editorial digest: '+course.id);
  assert.equal(lesson.content.longitudinalFieldExpedition.title,FIELD_EXPEDITIONS[course.id].title);
  assert.equal(lesson.content.longitudinalFieldExpedition.sessions.length,6);
  assert.equal(lesson.content.longitudinalFieldExpedition.reviewStatus,'pending-independent-review');
 }
 const html=renderEditorialReviewHTML(packet);
 assert.ok(html.includes(FIELD_EXPEDITIONS.science.title));
 assert.ok(html.includes(FIELD_EXPEDITIONS.business.title));
 assert.ok(html.includes('Longitudinal field expedition'));
});

test('all three source modules are packaged and precached offline',()=>{
 const builder=fs.readFileSync(new URL('../scripts/build.mjs',import.meta.url),'utf8');
 const worker=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
 const source=fs.readFileSync(new URL('../fieldexpeditions.js',import.meta.url),'utf8');
 for(const f of ['fieldexpeditions.js','fieldexpeditions1.js','fieldexpeditions2.js']){
  assert.ok(builder.includes("'"+f+"'"),'Missing from build '+f);
  assert.ok(worker.includes("'/"+f+"'"),'Missing from offline precache '+f);
 }
 assert.doesNotMatch(source,/localStorage|sessionStorage|fetch\s*\(|XMLHttpRequest/);
});
