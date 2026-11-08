import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {ADVANCED_CONCEPT_STUDIES,attachAdvancedConceptStudies} from '../advancedconcepts.js';
import {buildLessonNarration} from '../narration.js';
import {auditCurriculum} from '../curriculumaudit.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('fourteen specialist full-study chapters deepen previously existing advanced lesson IDs',()=>{
 assert.equal(totalLessons,139);
 assert.equal(COURSES.length,14);
 assert.equal(Object.keys(ADVANCED_CONCEPT_STUDIES).length,14);
 const ids=new Set(),heads=new Set(),cases=new Set(),worked=new Set();
 for(const course of COURSES){
  const entry=ADVANCED_CONCEPT_STUDIES[course.id];
  const l=findLesson(course.id,entry.id);
  assert.ok(l&&l.stage==='Advanced',course.id+' must target an existing advanced lesson');
  assert.strictEqual(l.specialistConceptStudy,entry);
  assert.equal(l.deepTitle,entry.title);
  assert.equal(l.deepMinutes,entry.minutes);
  assert.equal(l.sections.length,3,'original core lesson must stay untouched: '+course.id);
  assert.equal(l.minutes,21,'legacy learning-path duration cannot change: '+course.id);
  assert.equal(l.deepSections.length,3);
  assert.equal(l.deepRubric.length,4);
  assert.deepEqual(l.deepSections,entry.sections);
  assert.deepEqual(l.deepRubric,entry.rubric);
  assert.equal(l.deepExample,entry.case);
  assert.equal(l.deepTask,entry.task);
  assert.equal(l.deepModelAnswer,entry.model);
  assert.ok(l.sources.length>=1,'keep original source inventory '+course.id);
  assert.equal(l.quiz.options.length,3);
  assert.equal(entry.reviewStatus,'pending-independent-review');
  assert.ok(Object.isFrozen(entry)&&Object.isFrozen(entry.sections)&&Object.isFrozen(entry.rubric));
  for(const section of l.deepSections){
   assert.ok(section.heading.length>=15&&section.body.length>=300,course.id+' chapter must actually teach');
   assert.ok(!heads.has(section.heading),course.id+' duplicated heading');
   heads.add(section.heading);
  }
  assert.ok(entry.case.length>=350&&entry.task.length>=250&&entry.model.length>=350);
  assert.ok(entry.rubric.every(x=>x.length>=50));
  assert.ok(!cases.has(entry.case)&&!worked.has(entry.model),'no generic duplicated case');
  cases.add(entry.case);worked.add(entry.model);ids.add(course.id+':'+l.id);
 }
 assert.equal(ids.size,14);
 assert.equal(heads.size,42);
 assert.equal(cases.size,14);
 assert.equal(attachAdvancedConceptStudies(COURSES),0,'same lesson cannot get duplicate deep sections');
 assert.throws(()=>attachAdvancedConceptStudies([]),/fourteen subjects/);
});
test('new reading appears in existing lesson reader and spoken lesson, with no UI duplication',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/foundationalDeepStudy\(l\)/);
 assert.match(app,/l\.deepModelAnswer/);
 assert.match(app,/deep-study-section/);
 for(const c of COURSES){
  const l=findLesson(c.id,ADVANCED_CONCEPT_STUDIES[c.id].id);
  const segments=buildLessonNarration(c,l);
  const narration=segments.join(' ');
  assert.ok(narration.includes(l.deepTitle)||narration.includes(l.deepSections[0].heading),
   c.id+' needs a spoken reference to the study');
  assert.ok(narration.includes(l.deepSections[0].heading),c.id+' missing first audio section');
 }
});
test('all full-study chapters and worked solutions join independently reviewable content hashes',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 for(const c of COURSES){
  const data=ADVANCED_CONCEPT_STUDIES[c.id];
  const record=packet.lessons.find(row=>row.id===c.id+':'+data.id);
  assert.ok(record?.content?.conceptFirstStudy,c.id+' missing specialist reviewer content');
  const study=record.content.conceptFirstStudy;
  assert.equal(study.sections.length,3);
  assert.equal(study.workedCase,data.case);
  assert.equal(study.independentExercise,data.task);
  assert.equal(study.modelResponse,data.model);
  assert.deepEqual(study.selfReviewRubric,[...data.rubric]);
  assert.equal(record.reviewerAttestation,null);
  assert.equal(record.contentHash,reviewHash(record.content));
  const changed=structuredClone(record.content);
  changed.conceptFirstStudy.sections[1].body+=' Independent expert correction.';
  assert.notEqual(reviewHash(changed),record.contentHash);
 }
 assert.match(findLesson('laws',ADVANCED_CONCEPT_STUDIES.laws.id).sources[0].url,/privacy\.gov\.ph/);
 assert.match(findLesson('digital',ADVANCED_CONCEPT_STUDIES.digital.id).sources[0].url,/nist/);
 assert.ok(auditCurriculum(COURSES).valid);
});
test('static bundle includes all chapter assets and maintains original release gates',()=>{
 const read=name=>fs.readFileSync(name,'utf8');
 for(const path of ['advancedconcepts.js','advancedconcepts1.js','advancedconcepts2.js']){
  assert.ok(read('sw.js').includes('/'+path),'service worker missing '+path);
  assert.ok(read('scripts/build.mjs').includes("'"+path+"'"),'release build missing '+path);
 }
 assert.doesNotMatch(read('advancedconcepts.js'),/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 assert.ok(Buffer.byteLength(read('app.js'))<240000,'main reader budget should not expand');
 assert.ok(JSON.parse(read('docs/stage-gates.json')).gates.every(g=>g.complete===false),
  'authored material is not external signoff');
});
