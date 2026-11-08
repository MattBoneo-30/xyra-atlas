import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {EVIDENCE_PROTOCOLS} from '../evidenceprotocols.js';
import {validateEvidenceProtocols,evidencePathStatus,evidencePathPanel} from '../evidencepath.js';
import {portfolioJourneyPanel} from '../portfoliojourneys.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';

test('fourteen courses have 42 distinct evidence protocols tied to their original stage lessons',()=>{
 assert.equal(totalLessons,139);
 assert.equal(validateEvidenceProtocols(COURSES),42);
 assert.equal(Object.keys(EVIDENCE_PROTOCOLS).length,14);
 const titles=new Set(),protocols=new Set();
 for(const course of COURSES){
  const items=EVIDENCE_PROTOCOLS[course.id];
  assert.equal(items.length,3);
  for(const [index,[title,protocol,trap]] of items.entries()){
   assert.ok(title.length>=12&&protocol.length>=150&&trap.length>=45);
   assert.ok(!titles.has(title)&&!protocols.has(protocol),'duplicate evidence protocol');
   titles.add(title);protocols.add(protocol);
   const target=course.portfolioJourney.artifacts[index];
   assert.ok(course.lessons.some(l=>l.id===target.lessonId&&l.stage===['Beginner','Intermediate','Advanced'][index]));
  }
  const markup=portfolioJourneyPanel(course);
  assert.equal((markup.match(/class="evidence-path-stage"/g)||[]).length,3);
  assert.equal((markup.match(/class="evidence-path-criteria"/g)||[]).length,3);
  assert.match(markup,/does not prove mastery|not an approved result/i);
 }
 assert.equal(titles.size,42);assert.equal(protocols.size,42);
 assert.throws(()=>validateEvidenceProtocols([]),/fourteen/);
});
test('study, local writing and independent review remain four distinct evidence states',()=>{
 const statuses=[
  evidencePathStatus(false,false),evidencePathStatus(true,false),
  evidencePathStatus(false,true),evidencePathStatus(true,true)
 ];
 assert.deepEqual(statuses.map(s=>s.code),['not-started','needs-draft','draft-in-progress','awaiting-review']);
 const course=COURSES.find(c=>c.id==='business');
 const ids=course.portfolioJourney.artifacts.map(a=>a.lessonId);
 const panel=evidencePathPanel(course,{isLessonDone:id=>id===ids[0]||id===ids[1],hasFieldNote:id=>id===ids[1]||id===ids[2]});
 assert.deepEqual([...panel.matchAll(/data-evidence-status="([^"]+)"/g)].map(m=>m[1]),['needs-draft','awaiting-review','draft-in-progress']);
 assert.match(panel,/no notes are uploaded/i);
 assert.doesNotMatch(panel,/data-action="complete"|data-action="answer"/);
 assert.equal(evidencePathPanel(null),'');
});
test('exact reviewer export hashes protect evidence standards as authored teaching',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const records=packet.lessons.filter(l=>l.content.independentEvidenceStandards);
 assert.equal(records.length,14);
 for(const record of records){
  const field=record.content.independentEvidenceStandards;
  assert.equal(field.reviewStatus,'pending-independent-review');
  assert.equal(field.stages.length,3);
  assert.deepEqual(field.stages.map(s=>s.stage),['Beginner','Intermediate','Advanced']);
  assert.equal(record.contentHash,reviewHash(record.content));
  const changed=structuredClone(record.content);
  changed.independentEvidenceStandards.stages[0].reviewProtocol+=' Qualified reviewer edit.';
  assert.notEqual(reviewHash(changed),record.contentHash);
 }
});
test('evidence roadmap is private, offline, and does not expand the main application beyond budget',()=>{
 const read=x=>fs.readFileSync(x,'utf8');
 for(const file of ['evidenceprotocols.js','evidencepath.js','evidence-path.css']){
  assert.ok(read('sw.js').includes('/'+file),'not precached: '+file);
  assert.ok(read('scripts/build.mjs').includes("'"+file+"'"),'not built: '+file);
 }
 const app=read('app.js');
 assert.match(app,/hasFieldNote:id=>Boolean\(saved\.fieldNotes\[/);
 assert.ok(Buffer.byteLength(app)<240000);
 assert.match(read('portfoliojourneys.js'),/evidencePathPanel\(course,\{isLessonDone,hasFieldNote\}\)/);
 assert.match(read('evidence-path.css'),/focus-visible/);
 assert.match(read('index.html'),/evidence-path\.css/);
 assert.doesNotMatch(read('evidencepath.js'),/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 assert.ok(JSON.parse(read('docs/stage-gates.json')).gates.every(g=>g.complete===false));
});
