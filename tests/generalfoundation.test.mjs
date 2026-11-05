import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {GENERAL_FOUNDATION,GENERAL_FOUNDATION_COUNT} from '../generalfoundation.js';
import {auditCurriculum} from '../curriculumaudit.js';
test('16 early foundation lessons have complete example-led sections and actionable exercises',()=>{
 assert.equal(GENERAL_FOUNDATION_COUNT,16);
 assert.equal(totalLessons,139);
 for(const [courseId,lessons] of Object.entries(GENERAL_FOUNDATION))for(const [id,c] of Object.entries(lessons)){
  const lesson=findLesson(courseId,id);
  assert.ok(lesson,courseId+':'+id);
  assert.ok(lesson.sections.length>=3);
  assert.ok(lesson.sections.every(s=>s.body.length>=160),courseId+':'+id);
  assert.ok(lesson.task.length>=170,courseId+':'+id);
  assert.ok(lesson.sections[0].body.includes(c.explain[0]));
  assert.ok(lesson.sections[1].body.includes(c.explain[1]));
  assert.ok(lesson.task.includes(c.task));
 }
});
test('extended lessons retain existing progress IDs and offline assets',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/deepenGeneralFoundation\(COURSES\)/);
 assert.match(sw,/\/generalfoundation\.js/);
 assert.match(build,/'generalfoundation\.js'/);
 const r=auditCurriculum(COURSES);
 assert.equal(r.valid,true);
 assert.ok(r.totals.lessonsWithEditorialFlags<=38);
});
