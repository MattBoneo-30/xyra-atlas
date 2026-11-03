import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {CRITICAL_FOUNDATION,CRITICAL_FOUNDATION_COUNT} from '../criticalfoundation.js';
import {auditCurriculum} from '../curriculumaudit.js';
test('eighteen high-stakes original lessons deepen instruction and casework without altering IDs',()=>{
 assert.equal(CRITICAL_FOUNDATION_COUNT,18);
 assert.equal(totalLessons,134);
 for(const [courseId,entries] of Object.entries(CRITICAL_FOUNDATION))for(const [id,addition] of Object.entries(entries)){
  const lesson=findLesson(courseId,id);
  assert.ok(lesson,courseId+':'+id);
  assert.ok(lesson.sections.length>=3);
  assert.ok(lesson.sections.every(section=>section.body.length>=160),courseId+':'+id+' needs substantive sections');
  assert.ok(lesson.task.length>=160,courseId+':'+id+' requires a genuine practice task');
  for(let i=0;i<2;i++)assert.ok(lesson.sections[i].body.includes(addition.explain[i]));
  assert.ok(lesson.task.includes(addition.assignment));
  assert.ok(lesson.quiz.options.length>=3);
  assert.ok(lesson.sources.some(ref=>ref.url.startsWith('https://')));
 }
});
test('safety teaching remains protective, offline, and gated',()=>{
 assert.equal(COURSES.find(c=>c.id==='shadow').dark,true);
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/deepenCriticalFoundation\(COURSES\)/);
 assert.match(sw,/\/criticalfoundation\.js/);
 assert.match(build,/'criticalfoundation\.js'/);
 const audit=auditCurriculum(COURSES);
 assert.equal(audit.valid,true);
 assert.equal(audit.totals.subjects,14);
 assert.ok(audit.totals.lessonsWithEditorialFlags<63);
});
