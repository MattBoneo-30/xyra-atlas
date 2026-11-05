import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons,findLesson} from '../data.js';
import {INTERMEDIATE_DEPTH,deepenIntermediateLessons} from '../intermediatedepth.js';
import {auditCurriculum} from '../curriculumaudit.js';

test('fourteen substantive applied lessons preserve original three-section cases and checks',()=>{
 assert.equal(Object.keys(INTERMEDIATE_DEPTH).length,14);
 assert.equal(totalLessons,139);
 for(const course of COURSES){
  const authored=INTERMEDIATE_DEPTH[course.id],l=findLesson(course.id,authored.id);
  assert.equal(l.intermediateDepth,'applied-2026',course.id);
  assert.equal(l.deepSections.length,3);
  assert.ok(l.deepSections.every(s=>s.body.length>=190),course.id+' needs clear methods');
  assert.ok(l.deepExample.length>=275);
  assert.ok(l.deepTask.length>=195);
  assert.equal(l.deepRubric.length,4);
  assert.equal(l.flow.steps.length,4);
  assert.ok(l.sections.length>=3,'original lesson remains');
  assert.equal(l.quiz.options.length,3,'old answer keys remain');
  assert.ok(l.sources?.length>=1,'earlier source records remain');
 }
});
test('key explanations teach actual calculations, law, grammar and causes',()=>{
 const body=id=>findLesson(id,INTERMEDIATE_DEPTH[id].id).deepSections.map(s=>s.body).join(' ');
 for(const [id,word] of [['laws','RA 7394'],['science','495'],['savings','₱13,800'],['languages','がくせい'],['psychology','reappraisal'],['thinking','causal']]){
  assert.ok(body(id).toLowerCase().includes(word.toLowerCase()),id+' should be discipline-specific');
 }
});
test('offline, read-aloud and editorial review include full authored material, without claiming approval',()=>{
 assert.equal(auditCurriculum(COURSES).valid,true);
 const read=p=>fs.readFileSync(p,'utf8');
 assert.match(read('sw.js'),/\/intermediatedepth\.js/);
 assert.match(read('scripts/build.mjs'),/'intermediatedepth.js'/);
 assert.match(read('app.js'),/deep-rubric/);
 assert.match(read('narration.js'),/lesson.deepRubric/);
 assert.match(read('scripts/editorial-review-packet.mjs'),/selfReviewRubric/);
 assert.equal(JSON.parse(read('docs/stage-gates.json')).gates[0].complete,false);
 assert.throws(()=>deepenIntermediateLessons(null),/Expected course list/);
});
