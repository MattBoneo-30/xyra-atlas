import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {TRANSFER_LABS,TRANSFER_LAB_COUNT,attachTransferLabs} from '../transferlabs.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('all fourteen subjects have a distinctive intermediate transfer lab with genuine worked reasoning',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139,'new applications must preserve published IDs and saved progress');
 assert.equal(TRANSFER_LAB_COUNT,14);
 assert.deepEqual(new Set(Object.keys(TRANSFER_LABS)),new Set(COURSES.map(course=>course.id)));
 const titles=new Set(),cases=new Set(),answers=new Set();
 for(const course of COURSES){
  const spec=TRANSFER_LABS[course.id],lesson=findLesson(course.id,spec.lessonId);
  assert.ok(lesson,course.id+' must attach to an existing lesson');
  assert.equal(lesson.stage,'Intermediate',course.id+' uses its intermediate tier');
  assert.equal(lesson.transferLab.key,course.id+':'+lesson.id);
  assert.equal(lesson.transferLab.reviewStatus,'pending-independent-review');
  assert.ok(Object.isFrozen(lesson.transferLab)&&Object.isFrozen(lesson.transferLab.rubric));
  assert.equal(lesson.transferLab.rubric.length,4);
  for(const [key,min] of Object.entries({scenario:180,worked:480,counterexample:120,task:170,caveat:60})){
   assert.ok(lesson.transferLab[key].length>=min,course.id+': '+key+' needs depth');
  }
  assert.ok(lesson.transferLab.rubric.every(line=>line.length>45));
  assert.ok(lesson.sections.length>=3,'published teaching remains present');
  assert.ok(lesson.quiz.options.length>=3,'published quiz remains present');
  titles.add(spec.title);cases.add(spec.scenario);answers.add(spec.worked);
 }
 assert.equal(titles.size,14);assert.equal(cases.size,14);assert.equal(answers.size,14);
 assert.equal(attachTransferLabs(COURSES),0,'integration is idempotent');
 assert.throws(()=>attachTransferLabs([{id:'science',lessons:[]}]),/subject coverage incomplete/);
});

test('all fourteen transfer labs are discoverable in the chapter map and listen-aloud content',()=>{
 for(const course of COURSES){
  const lesson=findLesson(course.id,TRANSFER_LABS[course.id].lessonId);
  const map=createChapterMap(course,lesson);
  assert.deepEqual(map.transfer,{
   id:'transfer-lab',heading:lesson.transferLab.title,
   preview:map.transfer.preview
  });
  assert.ok(map.transfer.preview.length>40&&map.transfer.preview.length<=140);
  const narration=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(narration.includes('Transfer lab:'),course.id+' must be included in narration');
  assert.ok(narration.includes(lesson.transferLab.title),course.id+' must speak the actual lab title');
  assert.ok(narration.includes('Independent challenge.'),course.id+' must speak the exercise');
 }
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/function transferLabView\(lab\)/);
 assert.match(app,/\$\{transferLabView\(l\.transferLab\)\}/);
 assert.match(app,/id="transfer-lab"/);
 assert.match(app,/data-index="transfer"/);
 assert.match(app,/index==='transfer'\?'transfer-lab'/);
 assert.match(app,/class="transfer-lab-solution"/);
 assert.match(app,/lab\.rubric\.map/);
});

test('worked explanations are in source-hashed reviewer packets without granting human approval',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.decisions,42);
 assert.equal(packet.totals.uniqueSourceURLs,52,'new labs must not invent a new approved source register');
 const withLabs=packet.lessons.filter(x=>x.content.intermediateTransferLab);
 assert.equal(withLabs.length,14);
 for(const record of withLabs){
  const lab=record.content.intermediateTransferLab;
  assert.equal(lab.reviewStatus,'pending-independent-review');
  assert.equal(lab.selfReviewCriteria.length,4);
  assert.equal(record.contentHash,reviewHash(record.content));
  assert.notEqual(record.contentHash,reviewHash({...record.content,
   intermediateTransferLab:{...lab,workedReasoning:lab.workedReasoning+' changed'}}));
  assert.equal(record.reviewerAttestation,null);
 }
 assert.equal(packet.totals.expertApprovedLessons,0);
});

test('transfer labs ship as offline modules with no new local-storage schema',()=>{
 const data=fs.readFileSync('data.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(data,/attachTransferLabs\(COURSES\)/);
 for(const name of ['transferlabs.js','transferlabs1.js','transferlabs2.js']){
  assert.ok(sw.includes('/'+name),name+' missing in offline precache');
  assert.ok(build.includes("'"+name+"'"),name+' missing from static bundle');
 }
 assert.match(fs.readFileSync('narration.js','utf8'),/lesson\.transferLab/);
 assert.match(fs.readFileSync('scripts/editorial-review-packet.mjs','utf8'),/intermediateTransferLab/);
 assert.match(fs.readFileSync('styles.css','utf8'),/\.transfer-lab-solution/);
});
