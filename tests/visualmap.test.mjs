import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';import {createChapterMap} from '../visualmap.js';
test('each lesson has a unique accessible visual path to all its authored sections',()=>{
 for(const c of COURSES)for(const l of c.lessons){
  const map=createChapterMap(c,l);assert.equal(map.steps.length,l.sections.length);
  assert.deepEqual(map.steps.map(s=>s.id),l.sections.map((_,i)=>'lesson-section-'+i));
  assert.ok(map.steps.every(s=>s.preview.length>20&&s.preview.length<=150));
  assert.ok(map.practice && map.practice.id==='lesson-practice');
 }
});
test('visual map provides safe previews and handles invalid entries',()=>{
 assert.equal(createChapterMap(null,{}),null);
 const p=createChapterMap({title:'Test'},{title:'Test',sections:[{heading:'First',body:'  a   '.repeat(50)}],task:'apply'});
 assert.ok(p.steps[0].preview.length<=136);
 assert.ok(!p.steps[0].preview.includes('  '));
});
test('lesson navigation and offline build use the visual map, without changing content',()=>{
 const app=fs.readFileSync('app.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),sw=fs.readFileSync('sw.js','utf8');
 assert.match(app,/createChapterMap\(c,l\)/);
 assert.match(app,/id="lesson-section-\$\{i\}"/);
 assert.match(app,/id="lesson-practice"/);
 assert.match(app,/jump-chapter/);
 assert.match(build,/'visualmap\.js'/);
 assert.match(sw,/\/visualmap\.js/);
});
