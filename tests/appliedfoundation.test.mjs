import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {APPLIED_FOUNDATION,APPLIED_FOUNDATION_COUNT} from '../appliedfoundation.js';
import {auditCurriculum} from '../curriculumaudit.js';
test('eighteen original ethical reasoning and science lessons now have substantive teaching and work',()=>{
 assert.equal(APPLIED_FOUNDATION_COUNT,18);assert.equal(totalLessons,139);
 for(const [courseId,entries] of Object.entries(APPLIED_FOUNDATION))for(const [id,material] of Object.entries(entries)){
  const lesson=findLesson(courseId,id);
  assert.ok(lesson,courseId+':'+id);
  assert.ok(lesson.sections.length>=3);
  assert.ok(lesson.sections.every(section=>section.body.length>=160),courseId+':'+id+' lacks sufficient explanation');
  assert.ok(lesson.task.length>=160,courseId+':'+id+' lacks a usable task');
  assert.ok(lesson.sections[0].body.includes(material.explain[0]));
  assert.ok(lesson.sections[1].body.includes(material.explain[1]));
  assert.ok(lesson.task.includes(material.task));
 }
});
test('all 52 original beginner/intermediate/advanced foundation subjects are expanded without changing identity',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/deepenAppliedFoundation\(COURSES\)/);
 assert.match(sw,/\/appliedfoundation\.js/);
 assert.match(build,/'appliedfoundation\.js'/);
 const r=auditCurriculum(COURSES);
 assert.equal(r.valid,true);
 assert.equal(r.totals.subjects,14);
 assert.ok(r.totals.lessonsWithEditorialFlags<=17);
});
