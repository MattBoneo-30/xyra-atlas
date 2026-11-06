import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {ADVANCED_DEPTH} from '../advanceddepth.js';
import {EVIDENCE_INQUIRIES,EVIDENCE_INQUIRY_COUNT,attachEvidenceInquiries} from '../evidenceinquiries.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('one original investigation is integrated into every advanced subject without new lesson IDs',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139);
 assert.equal(EVIDENCE_INQUIRY_COUNT,14);
 assert.deepEqual(new Set(Object.keys(EVIDENCE_INQUIRIES)),new Set(COURSES.map(c=>c.id)));
 const titles=new Set(),scenarios=new Set(),models=new Set();
 for(const course of COURSES){
  const spec=EVIDENCE_INQUIRIES[course.id];
  const lesson=findLesson(course.id,ADVANCED_DEPTH[course.id].id);
  assert.ok(lesson,course.id);
  assert.equal(lesson.stage,'Advanced',course.id);
  assert.equal(lesson.evidenceInquiry.key,course.id+':'+lesson.id);
  assert.equal(lesson.evidenceInquiry.reviewStatus,'pending-independent-review');
  assert.equal(lesson.deepSections.length,4,'original advanced teaching remains intact');
  assert.equal(lesson.quiz.options.length,3,'original graded quiz remains intact');
  assert.ok(Object.isFrozen(lesson.evidenceInquiry));
  assert.ok(Object.isFrozen(lesson.evidenceInquiry.rubric));
  assert.equal(lesson.evidenceInquiry.exhibits.length,3);
  assert.equal(lesson.evidenceInquiry.rubric.length,4);
  for(const item of lesson.evidenceInquiry.exhibits){
   assert.ok(item.label.length>=10&&item.detail.length>=65);
   assert.ok(Object.isFrozen(item));
  }
  for(const [field,floor] of Object.entries({scenario:150,reasoning:390,countercase:120,challenge:160,model:220,limits:55}))
   assert.ok(lesson.evidenceInquiry[field].length>=floor,course.id+' needs substantive '+field);
  titles.add(spec.title);scenarios.add(spec.scenario);models.add(spec.model);
 }
 assert.equal(titles.size,14);
 assert.equal(scenarios.size,14);
 assert.equal(models.size,14);
 assert.equal(attachEvidenceInquiries(COURSES),0,'repeat integration cannot mutate completed course objects');
 assert.throws(()=>attachEvidenceInquiries(null),/Expected Atlas course list/);
 assert.throws(()=>attachEvidenceInquiries([{id:'science',lessons:[]}]),/subject coverage incomplete/);
});

test('all inquiry exhibits and models appear in navigation and oral reading',()=>{
 for(const course of COURSES){
  const lesson=findLesson(course.id,ADVANCED_DEPTH[course.id].id);
  const inquiry=lesson.evidenceInquiry;
  const map=createChapterMap(course,lesson);
  assert.equal(map.inquiry.id,'evidence-inquiry');
  assert.equal(map.inquiry.heading,inquiry.title);
  assert.ok(map.inquiry.preview.length>40&&map.inquiry.preview.length<=140);
  const spoken=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(spoken.includes('Advanced evidence inquiry:'),course.id+' lacks spoken introduction');
  assert.ok(spoken.includes(inquiry.title),course.id+' title missing in narration');
  assert.ok(spoken.includes('Evidence exhibits.'),course.id+' exhibits missing in narration');
  assert.ok(spoken.includes('Model response.'),course.id+' explanation missing in narration');
 }
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/function evidenceInquiryView\(item\)/);
 assert.match(app,/\$\{evidenceInquiryView\(l\.evidenceInquiry\)\}/);
 assert.match(app,/data-index="inquiry"/);
 assert.match(app,/id="evidence-inquiry"/);
 assert.match(app,/index==='inquiry'\?'evidence-inquiry'/);
 assert.match(app,/class="evidence-inquiry-solution"/);
 assert.match(app,/item\.exhibits\.map/);
 assert.match(app,/item\.rubric\.map/);
});

test('editorial handoff includes every inquiry claim without manufacturing signoff',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.deepEqual(packet.totals,{subjects:14,lessons:139,decisions:42,uniqueSourceURLs:52,
  expertApprovedLessons:0,expertApprovedDecisions:0});
 const matching=packet.lessons.filter(x=>x.content.advancedEvidenceInquiry);
 assert.equal(matching.length,14);
 for(const record of matching){
  const inquiry=record.content.advancedEvidenceInquiry;
  assert.equal(inquiry.reviewStatus,'pending-independent-review');
  assert.equal(inquiry.exhibits.length,3);
  assert.equal(inquiry.rubric.length,4);
  assert.equal(record.reviewStatus,'pending-independent-review');
  assert.equal(record.reviewerAttestation,null);
  assert.equal(record.contentHash,reviewHash(record.content));
  assert.notEqual(record.contentHash,reviewHash({...record.content,
   advancedEvidenceInquiry:{...inquiry,modelResponse:inquiry.modelResponse+' editorial correction'}}));
 }
});

test('new advanced teaching stays available offline and leaves learner storage schema unchanged',()=>{
 const data=fs.readFileSync('data.js','utf8');
 assert.match(data,/attachEvidenceInquiries\(COURSES\)/);
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 for(const file of ['evidenceinquiries.js','evidenceinquiries1.js','evidenceinquiries2.js']){
  assert.ok(build.includes("'"+file+"'"),file+' not included in output');
  assert.ok(sw.includes('/'+file),file+' not precached');
 }
 assert.match(fs.readFileSync('styles.css','utf8'),/\.evidence-inquiry-solution/);
 assert.match(fs.readFileSync('narration.js','utf8'),/lesson\.evidenceInquiry/);
 assert.match(fs.readFileSync('scripts/editorial-review-packet.mjs','utf8'),/advancedEvidenceInquiry/);
});
