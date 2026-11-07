import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {BEGINNER_WORKSHOPS,BEGINNER_WORKSHOP_COUNT,attachBeginnerWorkshops,beginnerWorkshopPanel} from '../beginnerworkshops.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('fourteen distinct two-step beginner workshops deepen original lessons',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139);
 assert.equal(BEGINNER_WORKSHOP_COUNT,14);
 assert.deepEqual(new Set(Object.keys(BEGINNER_WORKSHOPS)),new Set(COURSES.map(c=>c.id)));
 let distinctTitles=new Set(),distinctCases=new Set(),distinctTasks=new Set();
 for(const course of COURSES){
  const spec=BEGINNER_WORKSHOPS[course.id];
  const lesson=findLesson(course.id,spec.lessonId);
  assert.ok(lesson,course.id+' missing original lesson');
  assert.equal(lesson.stage,'Beginner');
  assert.equal(lesson.beginnerWorkshop.key,course.id+':'+lesson.id);
  assert.equal(lesson.beginnerWorkshop.reviewStatus,'pending-independent-review');
  assert.ok(Object.isFrozen(lesson.beginnerWorkshop));
  assert.ok(Object.isFrozen(lesson.beginnerWorkshop.steps));
  assert.ok(lesson.sections.length>=2,'original teaching preserved');
  assert.ok(lesson.quiz?.options?.length===3,'original graded quiz preserved');
  const workshop=lesson.beginnerWorkshop;
  assert.equal(workshop.steps.length,2);
  assert.equal(workshop.rubric.length,4);
  assert.ok(workshop.case.length>=140);
  assert.ok(workshop.goal.length>=80);
  distinctTitles.add(workshop.title);
  distinctCases.add(workshop.case);
  for(const step of workshop.steps){
   assert.ok(Object.isFrozen(step));
   assert.ok(step.instruction.length>=150&&step.model.length>=150&&step.diagnostic.length>=75);
   assert.ok(!distinctTasks.has(step.instruction),'duplicated independent task in '+course.id);
   distinctTasks.add(step.instruction);
  }
  const html=beginnerWorkshopPanel(workshop);
  assert.equal((html.match(/class="beginner-workshop-step"/g)||[]).length,2);
  assert.equal((html.match(/class="beginner-workshop-model"/g)||[]).length,2);
  assert.match(html,/Reveal a worked comparison after attempting the task/);
  assert.match(html,/Independent quality checklist/);
  assert.doesNotMatch(html,/data-action="complete-lesson"/);
  const map=createChapterMap(course,lesson);
  assert.equal(map.workshop.id,'beginner-workshop');
  assert.equal(map.workshop.heading,workshop.title);
  const audio=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(audio.includes('Guided beginner workshop: '+workshop.title),course.id+' workshop missing from narration');
 }
 assert.equal(distinctTitles.size,14);
 assert.equal(distinctCases.size,14);
 assert.equal(distinctTasks.size,28);
 assert.equal(attachBeginnerWorkshops(COURSES),0,'reattaching must not mutate completed curriculum');
 assert.throws(()=>attachBeginnerWorkshops([]),/subject coverage/);
});

test('all beginner workshop exercises enter independently reviewable hashes',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const entries=packet.lessons.filter(record=>record.content.guidedBeginnerWorkshop);
 assert.equal(entries.length,14);
 for(const record of entries){
  const x=record.content.guidedBeginnerWorkshop;
  assert.equal(x.reviewStatus,'pending-independent-review');
  assert.equal(x.steps.length,2);
  assert.equal(x.rubric.length,4);
  assert.equal(record.reviewerAttestation,null);
  assert.equal(record.contentHash,reviewHash(record.content));
  const revised={...record.content,guidedBeginnerWorkshop:{...x,steps:[
    {...x.steps[0],modelResponse:x.steps[0].modelResponse+' independently corrected'},
    x.steps[1]
  ]}};
  assert.notEqual(record.contentHash,reviewHash(revised));
 }
});

test('new work is discoverable, offline and never modifies stored grades',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/\$\{beginnerWorkshopPanel\(l\.beginnerWorkshop\)\}/);
 assert.match(app,/data-index="workshop"/);
 assert.match(app,/index==='workshop'\?'beginner-workshop'/);
 assert.match(app,/\+\(chapterMap\.workshop\?1:0\)/);
 const renderer=fs.readFileSync('beginnerworkshops.js','utf8');
 assert.match(renderer,/class="beginner-workshop-model"/);
 assert.doesNotMatch(renderer,/localStorage|sessionStorage|\bpersist\(|\bfetch\(/);
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const name of ['beginnerworkshops.js','beginnerworkshops1.js','beginnerworkshops2.js','beginner-workshops.css']){
  assert.ok(sw.includes('/'+name),'offline asset missing '+name);
  assert.ok(build.includes("'"+name+"'"),'static build asset missing '+name);
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/beginner-workshops.css"'));
 assert.ok(app.length<240000,'main application file remains within maintained budget');
});
