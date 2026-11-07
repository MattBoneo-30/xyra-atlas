import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,LANGUAGES,totalLessons} from '../data.js';
import {getPhrasePack} from '../phrasebook.js';
import {FRONTIER_WORKSHOPS,LANGUAGE_FIELDWORK,attachFrontierWorkshops,validateFrontierWorkshops,languageFieldworkPanel} from '../frontiercurriculum.js';

test('frontier content deepens fourteen existing intermediate lessons without migrating progress',()=>{
 assert.equal(totalLessons,139);
 assert.equal(Object.keys(FRONTIER_WORKSHOPS).length,14);
 assert.deepEqual(validateFrontierWorkshops(COURSES,LANGUAGES.map(x=>x.code)),{subjects:14,languages:20,practiceStages:60});
 for(const course of COURSES){
  const work=FRONTIER_WORKSHOPS[course.id];
  const lesson=course.lessons.find(x=>x.id===work.lessonId);
  assert.equal(lesson.stage,'Intermediate');
  assert.equal(lesson.frontierWorkshop,work);
  assert.ok(lesson.sections.length>=3);
  for(const part of ['method','caseStudy','assignment'])assert.ok(work[part].length>=180,course.id+' '+part);
 }
 assert.equal(attachFrontierWorkshops(COURSES),0);
});
test('all twenty language fieldwork scenarios use the exact existing phrase inventory',()=>{
 assert.equal(Object.keys(LANGUAGE_FIELDWORK).length,20);
 for(const {code} of LANGUAGES){
  const pack=getPhrasePack(code);
  const panel=languageFieldworkPanel(code,pack);
  assert.equal((panel.match(/<details class="sentence-bridge-transfer">/g)||[]).length,3,code);
  for(const i of [3,4,6]){
   assert.ok(panel.includes(pack.phrases[i].target.replace(/&/g,'&amp;').replace(/</g,'&lt;')),code+':'+i);
  }
  assert.match(panel,/native\/regional review/);
 }
 const japanese=languageFieldworkPanel('ja',getPhrasePack('ja'),{unlocked:false});
 assert.match(japanese,/Complete the Japanese kana/);
 assert.doesNotMatch(japanese,/sentence-bridge-target/);
 assert.equal(languageFieldworkPanel('not-a-language',getPhrasePack('ja')),'');
});
test('fieldwork remains offline, ephemeral, integrated and independently unapproved',()=>{
 const file=fs.readFileSync('frontiercurriculum.js','utf8');
 assert.doesNotMatch(file,/\b(fetch|localStorage|sessionStorage)\s*\(/);
 for(const path of ['sw.js','scripts/build.mjs'])assert.match(fs.readFileSync(path,'utf8'),/frontiercurriculum\.js/);
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/languageFieldworkPanel\(saved\.language/);
 const stage=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(stage.gates[0].complete,false);
});
