import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderExamHistoryPanel,renderAtlasMapView} from '../atlas-page-views.js';

const source=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,cls,attributes='')=>'<button type="button" class="'+cls+'" data-action="'+action+'" '+attributes+'>'+label+'</button>';
const icon=name=>'['+name+']';
const courses=[{id:'science',title:'Science'},{id:'digital',title:'Digital'}];

test('empty exam history is private and never presented as mastery',()=>{
 const html=renderExamHistoryPanel({report:{attempts:0},available:0,COURSES:courses,EXAM_SIZES:[5,10],button,esc});
 assert.match(html,/PRACTICE HISTORY/);
 assert.match(html,/Scores are study signals, not qualifications/);
 assert.doesNotMatch(html,/Clear history/);
});

test('exam history has the existing clear and focused practice actions',()=>{
 const report={
  attempts:2,correct:6,total:10,percent:60,
  subjects:[{title:'Science & Society',correct:3,total:5,percent:60}],
  focus:[{title:'<script>Unsafe</script>',courseTitle:'Science',count:2,courseId:'science',lessonId:'science-lesson'}],
  recent:[{endedAt:'2026-11-09T12:00:00Z',areas:[{courseId:'science'}],correct:3,total:5}]
 };
 const html=renderExamHistoryPanel({report,available:4,COURSES:courses,EXAM_SIZES:[5,10],button,esc});
 assert.match(html,/data-action="exam-history-clear"/);
 assert.match(html,/data-action="exam-focus-start"/);
 assert.match(html,/data-course="science" data-lesson="science-lesson"/);
 assert.match(html,/6\/10/);
 assert.match(html,/Science &amp; Society/);
 assert.match(html,/&lt;script&gt;Unsafe&lt;\/script&gt;/);
 assert.doesNotMatch(html,/<script>Unsafe/);
 assert.match(html,/Lower scores identify questions/);
});

test('knowledge map keeps real course actions, completion counts and connection recommendations',()=>{
 const atlas={
  nodes:[
   {id:'science',title:'Science',art:'science',done:3,total:10,percent:30,x:40,y:20,dark:false},
   {id:'digital',title:'Digital',art:'digital',done:0,total:10,percent:0,x:70,y:60,dark:false}
  ],
  links:[{x1:40,y1:20,x2:70,y2:60}],
  completed:3,total:20
 };
 const trails=[{from:{title:'Science'},to:{title:'Digital',art:'digital',id:'digital',nextLesson:{id:'digital-intro',title:'Entry'}},reason:'Compare evidence'}];
 const html=renderAtlasMapView({atlas,trails,button,icon,esc});
 assert.match(html,/aria-label="Interactive knowledge map of 2 subjects"/);
 assert.equal((html.match(/class="atlas-star-node /g)||[]).length,2);
 assert.match(html,/data-action="open-course" data-id="science"/);
 assert.match(html,/data-action="open-course" data-id="digital"/);
 assert.match(html,/data-action="open-lesson" data-course="digital" data-lesson="digital-intro"/);
 assert.match(html,/3 of 20 lessons finished/);
 assert.match(html,/Compare evidence/);
 assert.match(html,/svg viewBox="0 0 100 100"/);
 assert.match(html,/suggested topic connections—not required prerequisites/);
});

test('the renderer is pure, precached offline and keeps the main app below its source budget',()=>{
 const app=source('app.js'),renderers=source('atlas-page-views.js');
 const build=source('scripts/build.mjs'),sw=source('sw.js');
 assert.match(app,/renderExamHistoryPanel\(/);
 assert.match(app,/renderAtlasMapView\(/);
 assert.ok(!app.includes('class="exam-insights-columns"'));
 assert.ok(!app.includes('class="atlas-map-orbit"'));
 assert.doesNotMatch(renderers,/localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|document\./);
 assert.ok(build.includes("'atlas-page-views.js'"));
 assert.ok(sw.includes("'/atlas-page-views.js'"));
 assert.ok(Buffer.byteLength(app,'utf8')<230000);
});
