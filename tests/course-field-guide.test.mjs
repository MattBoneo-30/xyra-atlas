import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {COURSE_ORIENTATIONS} from '../atlas-course-orientations.js';
import {
 COURSE_ORIENTATION_COUNT,COURSE_WAYPOINTS,validateCourseOrientations,
 planCourseSession,renderCourseFieldGuide,jumpToCourseArea,installCourseGuideNavigation
} from '../atlas-course-field-guide.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';
const source=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('fourteen study strategies and forty-two authored moves match published worlds',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(COURSE_ORIENTATION_COUNT,14);
 assert.equal(validateCourseOrientations(COURSES.map(c=>c.id)),true);
 assert.equal(Object.values(COURSE_ORIENTATIONS).reduce((n,x)=>n+x.moves.length,0),42);
 assert.equal(COURSES.reduce((n,c)=>n+c.lessons.length,0),139);
});

test('session planner uses only unfinished published lessons and obeys time limits',()=>{
 const course={id:'psychology',lessons:[
  {id:'a',title:'First',stage:'Beginner',minutes:12},
  {id:'b',title:'Second',stage:'Beginner',minutes:15},
  {id:'c',title:'Third',stage:'Intermediate',minutes:20},
  {id:'d',title:'Fourth',stage:'Advanced',minutes:12},
  {id:'e',title:'Fifth',stage:'Advanced',minutes:9}
 ]};
 const plan=planCourseSession(course,['psychology:a'],40);
 assert.equal(plan.done,1);
 assert.equal(plan.remainingMinutes,56);
 assert.equal(plan.minutes,35);
 assert.deepEqual(plan.lessons.map(x=>x.id),['b','c']);
 const slow=planCourseSession(course,['psychology:a','psychology:b'],10);
 assert.deepEqual(slow.lessons.map(x=>x.id),['c'],'Do not hide a longer first lesson');
 const full=planCourseSession(course,course.lessons.map(x=>'psychology:'+x.id));
 assert.equal(full.remainingMinutes,0);
 assert.deepEqual(full.lessons,[]);
});

test('all courses render seven landmarks and real next-lesson routes without grades',()=>{
 assert.equal(COURSE_WAYPOINTS.length,7);
 for(const course of COURSES){
  const ladder={levels:['Beginner','Intermediate','Advanced'].map(stage=>({
   stage,done:0,total:course.lessons.filter(x=>x.stage===stage).length
  }))};
  const html=renderCourseFieldGuide(course,{completed:[],ladder});
  assert.equal((html.match(/class="atlas-guide-jump"/g)||[]).length,7);
  assert.equal((html.match(/class="atlas-guide-stage /g)||[]).length,3);
  assert.ok(html.includes(COURSE_ORIENTATIONS[course.id].question));
  assert.ok(html.includes('#/lesson/'+course.id+'/'));
  assert.match(html,/How to study this subject deeply/);
  for(const stop of COURSE_WAYPOINTS)assert.ok(html.includes('data-atlas-jump="'+stop.id+'"'));
 }
 const finished=COURSES[0];
 const allDone=renderCourseFieldGuide(finished,{completed:finished.lessons.map(x=>finished.id+':'+x.id)});
 assert.match(allDone,/Every recorded lesson is complete/);
 assert.match(allDone,/Completion is not a certification/);
});

test('HTML is escaped and unknown world IDs cannot create false content',()=>{
 const course={...COURSES[0],title:'<script>Injected</script>'};
 const html=renderCourseFieldGuide(course);
 assert.match(html,/&lt;script&gt;Injected&lt;\/script&gt;/);
 assert.doesNotMatch(html,/<script>Injected/);
 assert.equal(renderCourseFieldGuide({id:'missing',lessons:[]}), '');
});

test('in-page jump scrolls only within the current course and focuses the destination',()=>{
 const calls=[];
 const heading={matches:()=>false,setAttribute:(key,val)=>calls.push(key+':'+val),focus:()=>calls.push('focus')};
 const destination={matches:()=>false,querySelector:()=>heading,scrollIntoView:()=>calls.push('scroll')};
 const page={contains:element=>element===destination};
 const button={getAttribute:()=> 'atlas-stage-ladder',closest:()=>page};
 const doc={getElementById:id=>id==='atlas-stage-ladder'?destination:null};
 assert.equal(jumpToCourseArea(button,doc),true);
 assert.deepEqual(calls,['scroll','tabindex:-1','focus']);
 assert.equal(jumpToCourseArea({...button,getAttribute:()=> 'unapproved'},doc),false);
 assert.equal(jumpToCourseArea({...button,closest:()=>({contains:()=>false})},doc),false);
 const listeners=[];const host={addEventListener:(event,cb)=>listeners.push({event,cb}),getElementById:doc.getElementById};
 assert.equal(installCourseGuideNavigation(host),true);
 assert.equal(installCourseGuideNavigation(host),false);
 listeners[0].cb({target:{closest:()=>button}});
 assert.equal(calls.filter(x=>x==='scroll').length,2);
});

test('every landmark exists in an actual course component, without new saved state',()=>{
 const sources=['app.js','atlas-inquiry.js','atlas-crossroads.js','portfoliojourneys.js','responsesimulations.js'].map(source).join('\n');
 for(const point of COURSE_WAYPOINTS)assert.ok(sources.includes('id="'+point.id+'"'),point.id);
 assert.match(source('app.js'),/renderCourseFieldGuide\(c,\{completed:saved.completed,ladder\}\)/);
 assert.doesNotMatch(source('atlas-course-field-guide.js'),/localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon/);
});

test('subject strategies are included in source-hashed independent editorial review',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const rows=packet.lessons.filter(row=>row.content.courseFieldOrientation);
 assert.equal(rows.length,14);
 for(const course of COURSES){
  const row=rows.find(record=>record.course===course.id);
  assert.ok(row,course.id);
  assert.deepEqual(row.content.courseFieldOrientation.moves,COURSE_ORIENTATIONS[course.id].moves);
  assert.equal(row.content.courseFieldOrientation.reviewStatus,'pending-independent-review');
 }
 const printed=renderEditorialReviewHTML(packet);
 assert.match(printed,/Subject-specific Field Guide/);
 assert.ok(printed.includes(COURSE_ORIENTATIONS.psychology.question));
});

test('local guide assets are precached, mobile accessible and production stays isolated',()=>{
 const build=source('scripts/build.mjs'),sw=source('sw.js');
 const html=source('index.html'),css=source('atlas-course-field-guide.css');
 const app=source('app.js');
 for(const path of ['atlas-course-field-guide.js','atlas-course-orientations.js','atlas-course-field-guide.css']){
  assert.ok(build.includes("'"+path+"'"),'build missing '+path);
  assert.ok(sw.includes("'/"+path+"'"),'precache missing '+path);
 }
 assert.ok(html.includes('href="/atlas-course-field-guide.css"'));
 assert.ok(Buffer.byteLength(app,'utf8')<240000);
 for(const token of ['max-width:360px','max-width:525px','prefers-contrast:more',
  'prefers-reduced-motion',':focus-visible','html[data-theme=light]'])
  assert.ok(css.includes(token),'CSS missing '+token);
 const vercel=JSON.parse(source('vercel.json'));
 assert.equal(vercel.git.deploymentEnabled['dev/atlas-visual-experience'],false);
});
