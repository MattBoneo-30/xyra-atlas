import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { COURSES, LANGUAGES, LEARNING_SPRINT, findCourse, findLesson, totalLessons } from '../data.js';
const root=process.cwd();
test('every course and lesson has stable unique identifiers and meaningful content',()=>{
  assert.ok(COURSES.length>=14);
  assert.equal(new Set(COURSES.map(c=>c.id)).size,COURSES.length);
  const ids=[];
  for(const c of COURSES){
    assert.ok(c.title && c.subtitle && c.art && c.icon);
    assert.ok(c.lessons.length>=3);
    assert.ok(fs.existsSync(path.join(root,'assets',c.art+'.svg')),`Artwork exists for ${c.id}`);
    for(const l of c.lessons){
      ids.push(c.id+':'+l.id);
      assert.ok(l.sections.length>=2);
      assert.ok(l.sections.every(s=>s.heading&&s.body.length>45));
      assert.ok(l.task.length>20);
      assert.ok(l.quiz.options.length>=3);
      assert.ok(l.quiz.correct>=0&&l.quiz.correct<l.quiz.options.length);
      assert.equal(findLesson(c.id,l.id)?.title,l.title);
    }
    assert.equal(findCourse(c.id)?.id,c.id);
  }
  assert.equal(new Set(ids).size,ids.length);
  assert.equal(ids.length,totalLessons);
});
test('age-aware Shadow Library and language sprint are structured',()=>{
  assert.equal(findCourse('shadow').dark,true);
  assert.ok(findCourse('shadow').lessons.length>=7);
  assert.ok(LANGUAGES.length>=20);
  assert.equal(new Set(LANGUAGES.map(l=>l.code)).size,LANGUAGES.length);
  assert.equal(LEARNING_SPRINT.length,7);
});
test('PWA includes local assets and offline app shell',()=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
  assert.equal(manifest.display,'standalone');
  assert.equal(manifest.start_url,'/?source=pwa');
  assert.ok(manifest.icons.some(i=>i.sizes==='192x192'));
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  for(const asset of ['app.js','data.js','styles.css','atlas-horizon.svg','course-shadow.svg']) assert.ok(sw.includes(asset),`Precaches ${asset}`);
  assert.ok(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('apple-touch-icon'));
});
