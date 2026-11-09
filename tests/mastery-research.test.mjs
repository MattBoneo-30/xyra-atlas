import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {MASTERY_RESEARCH,MASTERY_RESEARCH_COUNT,validateMasteryResearch,masteryResearchPanel,masteryResearchRoadmap} from '../masteryresearch.js';
import {practicalStudioPanel} from '../practicalstudios.js';
import {portfolioJourneyPanel} from '../portfoliojourneys.js';

test('all fourteen subjects have distinct specialist research cases and evidence',()=>{
 const ids=COURSES.map(c=>c.id);
 assert.equal(validateMasteryResearch(ids),true);
 assert.equal(MASTERY_RESEARCH_COUNT,14);
 assert.equal(new Set(Object.values(MASTERY_RESEARCH).map(x=>x.title)).size,14);
 for(const id of ids){
  const item=MASTERY_RESEARCH[id];
  assert.equal(item.exhibits.length,3);
  assert.equal(item.phases.length,3);
  assert.equal(item.rubric.length,5);
  assert.ok(item.phases.every(x=>x.worked.length>150));
 }
});

test('every course and advanced lesson expose the appropriate research practicum',()=>{
 for(const course of COURSES){
  const advanced=course.lessons.find(x=>x.stage==='Advanced'&&x.practicalStudio);
  assert.ok(advanced,'No attached advanced studio for '+course.id);
  const research=MASTERY_RESEARCH[course.id];
  const lessonHtml=practicalStudioPanel(advanced.practicalStudio);
  assert.ok(lessonHtml.includes(research.title),'Advanced lesson missing practicum '+course.id);
  assert.match(lessonHtml,/Fictional evidence packet/);
  assert.equal((lessonHtml.match(/class="mastery-research-phase"/g)||[]).length,3);
  assert.equal((lessonHtml.match(/class="mastery-research-worked"/g)||[]).length,3);
  const courseHtml=portfolioJourneyPanel(course,{isLessonDone:()=>false,hasFieldNote:()=>false});
  assert.ok(courseHtml.includes('mastery-research-roadmap'),'Course roadmap missing '+course.id);
  assert.ok(courseHtml.includes('#/lesson/'+course.id+'/'+advanced.id));
 }
});

test('review and evidence remain non-credentialed and user input is escaped',()=>{
 const item=MASTERY_RESEARCH.psychology;
 const markup=masteryResearchPanel({...item,question:'<script>doNotRender()</script>'});
 assert.ok(!markup.includes('<script>'));
 assert.ok(markup.includes('&lt;script&gt;'));
 assert.match(markup,/qualified independent review/);
 assert.match(markup,/does not establish expertise/);
 const fakeCourse={id:'psychology',lessons:[{id:'sample',practicalStudio:{}}]};
 assert.ok(masteryResearchRoadmap(fakeCourse).includes('#/lesson/psychology/sample'));
 assert.equal(masteryResearchPanel(null),'');
 assert.equal(masteryResearchRoadmap({id:'unknown',lessons:[]}), '');
});

test('new course reading modules ship in deterministic offline app shell',()=>{
 const build=fs.readFileSync(new URL('../scripts/build.mjs',import.meta.url),'utf8');
 const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
 for(const file of ['masteryresearch.js','masteryresearch1.js','masteryresearch2.js']){
  assert.ok(build.includes("'"+file+"'"),'Unbundled: '+file);
  assert.ok(sw.includes("'/"+file+"'"),'Not precached: '+file);
 }
 assert.equal(COURSES.length,14);
 assert.equal(COURSES.reduce((sum,c)=>sum+c.lessons.length,0),139);
});
