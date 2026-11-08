import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {ADVANCED_DEPTH} from '../advanceddepth.js';
import {ADVANCED_CONCEPT_STUDIES,attachAdvancedConceptStudies,specialistConceptPanel} from '../advancedconcepts.js';
import {buildLessonNarration} from '../narration.js';
import {auditCurriculum} from '../curriculumaudit.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('fourteen distinct specialist continuations enrich published advanced lessons without overwriting them',()=>{
 assert.equal(totalLessons,139);
 assert.equal(COURSES.length,14);
 assert.equal(Object.keys(ADVANCED_CONCEPT_STUDIES).length,14);
 const ids=new Set(),heads=new Set(),cases=new Set(),worked=new Set();
 for(const course of COURSES){
  const entry=ADVANCED_CONCEPT_STUDIES[course.id];
  const original=ADVANCED_DEPTH[course.id];
  const l=findLesson(course.id,entry.id);
  assert.ok(l&&l.stage==='Advanced',course.id+' must target an existing advanced lesson');
  assert.strictEqual(l.specialistConceptStudy,entry);
  const flagship=findLesson(course.id,original.id);
  assert.ok(flagship,'existing advanced flagship still exists');
  assert.equal(flagship.deepTitle,original.title,'flagship title must be untouched');
  assert.equal(flagship.deepMinutes,original.minutes,'flagship time must be untouched');
  assert.equal(flagship.deepModelAnswer,original.answer,'original model response must be untouched');
  assert.equal(flagship.deepTask,original.task,'original exercise must be untouched');
  assert.equal(flagship.deepSections.length,4,'all four original explanations remain');
  if(l.id!==flagship.id)assert.ok(!l.deepSections?.length,'separate specialist lesson does not overwrite flagship');
  assert.equal(l.sections.length,3,'original core lesson is unchanged');
  assert.equal(l.minutes,21,'legacy study plan minutes remain');
  assert.equal(l.quiz.options.length,3);
  assert.ok(l.sources.length>=1);
  assert.equal(entry.sections.length,3);
  assert.equal(entry.rubric.length,4);
  assert.equal(entry.reviewStatus,'pending-independent-review');
  assert.ok(Object.isFrozen(entry)&&Object.isFrozen(entry.sections)&&Object.isFrozen(entry.rubric));
  for(const section of entry.sections){
   assert.ok(section.heading.length>=15&&section.body.length>=300,course.id+' must contain real teaching');
   assert.ok(!heads.has(section.heading),course.id+' duplicate concept heading');
   heads.add(section.heading);
  }
  assert.ok(entry.case.length>=350&&entry.task.length>=250&&entry.model.length>=350);
  assert.ok(entry.rubric.every(x=>x.length>=50));
  assert.ok(!cases.has(entry.case)&&!worked.has(entry.model),'reused generic case');
  cases.add(entry.case);worked.add(entry.model);ids.add(course.id+':'+l.id);
  const rendered=specialistConceptPanel(entry);
  assert.equal((rendered.match(/class="deep-study-section"/g)||[]).length,3);
  assert.equal((rendered.match(/class="specialist-concept-answer"/g)||[]).length,1);
  assert.equal((rendered.match(/<li>/g)||[]).length,4);
  assert.match(rendered,/independent specialist review/i);
  assert.doesNotMatch(rendered,/data-action="complete-lesson"/);
 }
 assert.equal(ids.size,14);
 assert.equal(heads.size,42);
 assert.equal(cases.size,14);
 assert.equal(attachAdvancedConceptStudies(COURSES),0,'attachment must be idempotent');
 assert.throws(()=>attachAdvancedConceptStudies([]),/fourteen subjects/);
 assert.equal(specialistConceptPanel(null),'');
});
test('new teaching appears inside existing lesson reader and supported narrated lesson content',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/specialistConceptPanel\(l\.specialistConceptStudy\)/);
 assert.match(app,/foundationalDeepStudy\(l\)/);
 assert.match(app,/l\.deepModelAnswer/);
 for(const c of COURSES){
  const lesson=findLesson(c.id,ADVANCED_CONCEPT_STUDIES[c.id].id);
  const text=buildLessonNarration(c,lesson).join(' ');
  if(lesson.deepSections?.length)assert.ok(text.includes(lesson.deepSections[0].heading),c.id+' missing original audio study');
  assert.ok(text.includes(lesson.specialistConceptStudy.sections[0].heading),
   c.id+' missing specialist audio study');
 }
});
test('every new authored concept and model answer joins independent reviewer content hashes',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 for(const c of COURSES){
  const study=ADVANCED_CONCEPT_STUDIES[c.id];
  const record=packet.lessons.find(row=>row.id===c.id+':'+study.id);
  const flagshipRecord=packet.lessons.find(row=>row.id===c.id+':'+ADVANCED_DEPTH[c.id].id);
  assert.ok(flagshipRecord?.content?.conceptFirstStudy,'existing flagship study remains in review');
  assert.ok(record?.content?.specialistConceptContinuation,'new study is in review '+c.id);
  const newStudy=record.content.specialistConceptContinuation;
  assert.equal(flagshipRecord.content.conceptFirstStudy.sections.length,4);
  assert.equal(newStudy.sections.length,3);
  assert.equal(newStudy.reviewStatus,'pending-independent-review');
  assert.equal(newStudy.workedCase,study.case);
  assert.equal(newStudy.independentTask,study.task);
  assert.equal(newStudy.modelAnswer,study.model);
  assert.deepEqual(newStudy.selfReviewRubric,[...study.rubric]);
  assert.equal(record.reviewerAttestation,null);
  assert.equal(record.contentHash,reviewHash(record.content));
  const changed=structuredClone(record.content);
  changed.specialistConceptContinuation.sections[1].body+=' Editorial correction.';
  assert.notEqual(reviewHash(changed),record.contentHash);
 }
 assert.match(findLesson('laws',ADVANCED_CONCEPT_STUDIES.laws.id).sources[0].url,/privacy\.gov\.ph/);
 assert.match(findLesson('digital',ADVANCED_CONCEPT_STUDIES.digital.id).sources[0].url,/nist/);
 assert.ok(auditCurriculum(COURSES).valid);
});
test('offline assets and strict release gates remain intact',()=>{
 const read=name=>fs.readFileSync(name,'utf8');
 for(const name of ['advancedconcepts.js','advancedconcepts1.js','advancedconcepts2.js','specialist-concepts.css']){
  assert.ok(read('sw.js').includes('/'+name),'worker missing '+name);
  assert.ok(read('scripts/build.mjs').includes("'"+name+"'"),'build missing '+name);
 }
 assert.match(read('index.html'),/specialist-concepts\.css/);
 assert.match(read('specialist-concepts.css'),/focus-visible/);
 assert.doesNotMatch(read('advancedconcepts.js'),/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 assert.ok(Buffer.byteLength(read('app.js'))<240000,'main app must remain under 240 kB');
 assert.ok(JSON.parse(read('docs/stage-gates.json')).gates.every(g=>g.complete===false));
});
