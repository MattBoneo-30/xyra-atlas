import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {FIRST_PRINCIPLES,FIRST_PRINCIPLES_COUNT,FIRST_PRINCIPLES_CONCEPTS,validateFirstPrinciples,firstPrinciplesPanel,firstPrinciplesPreview} from '../firstprinciples.js';
import {practicalStudioPanel} from '../practicalstudios.js';
import {portfolioJourneyPanel} from '../portfoliojourneys.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';

test('fourteen subjects contain 42 deep conceptual models and falsifiable exercises',()=>{
 const ids=COURSES.map(course=>course.id);
 assert.equal(FIRST_PRINCIPLES_COUNT,14);
 assert.equal(FIRST_PRINCIPLES_CONCEPTS,42);
 assert.equal(validateFirstPrinciples(ids),true);
 assert.equal(new Set(Object.values(FIRST_PRINCIPLES).map(x=>x.title)).size,14);
 for(const id of ids){
  const item=FIRST_PRINCIPLES[id];
  assert.equal(item.concepts.length,3);
  assert.equal(item.transfer.criteria.length,4);
  assert.ok(item.concepts.every(c=>c.explain.length>=300&&c.distinction.length>=95&&c.failure.length>=100));
  assert.ok(item.experiment.setup.length>=160&&item.experiment.reasoning.length>=180);
  assert.ok(item.contradiction.response.length>=180);
 }
});

test('each advanced practical lesson starts with one opt-in theory companion',()=>{
 for(const course of COURSES){
  const studio=course.lessons.find(lesson=>lesson.practicalStudio)?.practicalStudio;
  assert.ok(studio,'No advanced studio for '+course.id);
  const html=practicalStudioPanel(studio);
  const title=FIRST_PRINCIPLES[course.id].title;
  assert.ok(html.includes(title),'Missing first-principles lesson for '+course.id);
  assert.ok(html.indexOf('first-principles')<html.indexOf('practical-studio'),'Conceptual study should precede application');
  assert.equal((html.match(/class="first-principles-concept"/g)||[]).length,3);
  assert.equal((html.match(/class="first-principles-solution"/g)||[]).length,1);
  assert.equal((html.match(/class="first-principles-rebuttal"/g)||[]).length,1);
  assert.ok(html.includes('Independent derivation'));
  assert.ok(html.includes('pending')||html.includes('pending independent'));
 }
 assert.equal(COURSES.length,14);
 assert.equal(COURSES.reduce((n,c)=>n+c.lessons.length,0),139);
});

test('course previews target original advanced lesson rather than new progress identifiers',()=>{
 for(const course of COURSES){
  const advanced=course.lessons.find(lesson=>lesson.practicalStudio);
  assert.ok(advanced);
  const html=portfolioJourneyPanel(course,{isLessonDone:()=>false,hasFieldNote:()=>false});
  assert.ok(html.includes('first-principles-preview'),'No companion preview '+course.id);
  assert.ok(html.includes(FIRST_PRINCIPLES[course.id].title));
  assert.ok(html.includes('#/lesson/'+course.id+'/'+advanced.id));
 }
 assert.equal(firstPrinciplesPanel('nonexistent'),'');
 assert.equal(firstPrinciplesPreview({id:'nonexistent',lessons:[]}), '');
});

test('all new authored theory appears in exact-content specialist review hash and workbook',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 for(const course of COURSES){
  const review=packet.lessons.find(lesson=>lesson.course===course.id&&lesson.content.firstPrinciplesCompanion);
  assert.ok(review,'Missing reviewed content '+course.id);
  assert.equal(review.content.firstPrinciplesCompanion.title,FIRST_PRINCIPLES[course.id].title);
  assert.equal(review.content.firstPrinciplesCompanion.concepts.length,3);
  assert.equal(review.content.firstPrinciplesCompanion.reviewStatus,'pending-independent-review');
 }
 const html=renderEditorialReviewHTML(packet);
 assert.ok(html.includes(FIRST_PRINCIPLES.psychology.title));
 assert.ok(html.includes(FIRST_PRINCIPLES.science.title));
 assert.ok(html.includes('Adversarial claim and reply'));
});

test('offline build and service worker both include all concept source modules',()=>{
 const build=fs.readFileSync(new URL('../scripts/build.mjs',import.meta.url),'utf8');
 const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
 const source=fs.readFileSync(new URL('../firstprinciples.js',import.meta.url),'utf8');
 for(const name of ['firstprinciples.js','firstprinciples1.js','firstprinciples2.js']){
  assert.ok(build.includes("'"+name+"'"),'Absent from build '+name);
  assert.ok(sw.includes("'/"+name+"'"),'Absent from offline cache '+name);
 }
 assert.doesNotMatch(source,/localStorage|sessionStorage|fetch\s*\(|XMLHttpRequest/);
 assert.ok(source.includes("const safe="));
});
