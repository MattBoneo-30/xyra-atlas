import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {ATLAS_EXPEDITIONS} from '../atlas-expedition.js';
import {reviewHash,buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';
import {buildSourceEvidenceMatrix} from '../scripts/source-evidence-matrix.mjs';

test('all 14 expedition scenarios and 42 ungraded missions enter exact-content editorial signatures',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.decisions,42);
 assert.equal(packet.totals.expertApprovedLessons,0);
 for(const course of COURSES){
  const first=course.lessons.find(l=>l.stage==='Beginner');
  const matches=packet.lessons.filter(l=>l.course===course.id&&l.content.subjectAppliedExpedition);
  assert.equal(matches.length,1,course.id+' has exactly one editorial expedition record');
  const entry=matches[0],unit=entry.content.subjectAppliedExpedition;
  assert.equal(entry.id,course.id+':'+first.id);
  assert.deepEqual(unit.choices,ATLAS_EXPEDITIONS[course.id].choices);
  assert.deepEqual(unit.missions,ATLAS_EXPEDITIONS[course.id].missions);
  assert.equal(unit.reviewStatus,'pending-independent-review');
  const changed={...entry.content,subjectAppliedExpedition:{...unit,choices:[
    {...unit.choices[0],consequence:unit.choices[0].consequence+' Correction'},
    ...unit.choices.slice(1)
  ]}};
  assert.notEqual(reviewHash(changed),entry.contentHash,'decision wording must invalidate prior hash');
 }
});

const htmlEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
test('printable editorial packet renders all expedition choices, teaching tasks and boundaries',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const html=renderEditorialReviewHTML(packet);
 assert.equal((html.match(/Expedition Studio — independently review/g)||[]).length,14);
 for(const [id,unit] of Object.entries(ATLAS_EXPEDITIONS)){
  assert.ok(html.includes(htmlEscape(unit.title)),id+' title omitted');
  for(const m of unit.missions)assert.ok(html.includes(htmlEscape(m.task)),id+' task omitted');
  for(const choice of unit.choices)assert.ok(html.includes(htmlEscape(choice.consequence)),id+' decision rationale omitted');
 }
 const sourceMatrix=buildSourceEvidenceMatrix(packet);
 const teachingSites=sourceMatrix.sources.flatMap(source=>source.usages)
  .filter(use=>use.kind==='lesson'&&use.authoredContext.authoredLearningSupplements?.subjectAppliedExpedition);
 assert.equal(new Set(teachingSites.map(use=>use.itemId)).size,14);
 assert.equal(sourceMatrix.summary.independentlyApprovedURLs,0);
});

test('printable expedition material escapes markup, never inserts authored raw HTML',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const entry=packet.lessons.find(x=>x.content.subjectAppliedExpedition);
 const injected='<img src=x onerror=alert(1)>';
 const altered={...packet,lessons:packet.lessons.map(x=>x===entry?{...x,content:{...x.content,
  subjectAppliedExpedition:{...x.content.subjectAppliedExpedition,title:injected}
 }}:x)};
 const html=renderEditorialReviewHTML(altered);
 assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
 assert.ok(!html.includes(injected));
});
