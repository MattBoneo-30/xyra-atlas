import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {COMPETENCY_BRIDGES,COMPETENCY_BRIDGE_COUNT,COMPETENCY_STAGE_COUNT,COMPETENCY_STAGES,validateCompetencyBridges,competencyBridgePanel,competencyBridgeRoadmap} from '../competencybridges.js';
import {beginnerWorkshopPanel} from '../beginnerworkshops.js';
import {decisionRevisionPanel} from '../decisionrevisions.js';
import {practicalStudioPanel} from '../practicalstudios.js';
import {portfolioJourneyPanel} from '../portfoliojourneys.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';

test('all course worlds have an evidence-producing lesson at every stage',()=>{
 const ids=COURSES.map(x=>x.id);
 assert.equal(COMPETENCY_BRIDGE_COUNT,14);
 assert.equal(COMPETENCY_STAGE_COUNT,42);
 assert.equal(validateCompetencyBridges(ids),true);
 for(const id of ids){
  for(const stage of COMPETENCY_STAGES){
   const unit=COMPETENCY_BRIDGES[id][stage];
   assert.ok(unit.objective.length>=38,id+' '+stage+' goal');
   assert.ok(unit.reasoning.length>=150,id+' '+stage+' reasoning');
   assert.ok(unit.scenario.length>=115,id+' '+stage+' case');
   assert.ok(unit.challenge.length>=105,id+' '+stage+' independent work');
   assert.ok(unit.feedback.length>=135,id+' '+stage+' worked response');
   assert.ok(unit.proof.length>=70,id+' '+stage+' observable outcome');
  }
 }
});

test('each competency bridge appears on the correct published lesson stage',()=>{
 for(const course of COURSES){
  const beginner=course.lessons.find(x=>x.beginnerWorkshop);
  const intermediate=course.lessons.find(x=>x.decisionRevision);
  const advanced=course.lessons.find(x=>x.practicalStudio);
  assert.ok(beginner&&intermediate&&advanced,'Missing stage attachment '+course.id);
  for(const [stage,html] of [
   ['Beginner',beginnerWorkshopPanel(beginner.beginnerWorkshop)],
   ['Intermediate',decisionRevisionPanel(intermediate.decisionRevision)],
   ['Advanced',practicalStudioPanel(advanced.practicalStudio)]
  ]){
   assert.match(html,/class="competency-bridge"/);
   assert.match(html,/Reveal a worked analysis after attempting the task/);
   assert.match(html,/What would demonstrate understanding/);
   assert.ok(html.includes(stage+' competency bridge'),'Wrong level '+course.id+' '+stage);
  }
 }
 assert.equal(COURSES.length,14);
 assert.equal(COURSES.reduce((n,x)=>n+x.lessons.length,0),139);
});

test('course competency map uses existing lesson IDs and never invents progress keys',()=>{
 for(const course of COURSES){
  const html=portfolioJourneyPanel(course,{isLessonDone:()=>false,hasFieldNote:()=>false});
  assert.match(html,/class="competency-roadmap"/);
  assert.equal((html.match(/class="competency-roadmap-level"/g)||[]).length,3);
  for(const [stage,property] of [['Beginner','beginnerWorkshop'],['Intermediate','decisionRevision'],['Advanced','practicalStudio']]){
   const lesson=course.lessons.find(x=>x[property]);
   assert.ok(html.includes('#/lesson/'+course.id+'/'+lesson.id),'Missing actual lesson path '+course.id+' '+stage);
  }
 }
 assert.equal(competencyBridgePanel('invalid','Advanced'),'');
 assert.equal(competencyBridgePanel('business','Unrecognized'),'');
 assert.equal(competencyBridgeRoadmap({id:'invalid',lessons:[]}), '');
});

test('each of forty-two additions enters the exact-content review hashes and print handoff',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 const bridgeReviews=packet.lessons.filter(x=>x.content.stageCompetencyBridge);
 assert.equal(bridgeReviews.length,42);
 for(const course of COURSES){
  for(const stage of COMPETENCY_STAGES){
   const item=bridgeReviews.find(x=>x.course===course.id&&x.stage===stage);
   assert.ok(item,'Missing hash of '+course.id+' '+stage);
   assert.equal(item.content.stageCompetencyBridge.reviewStatus,'pending-independent-review');
   assert.equal(item.content.stageCompetencyBridge.objective,COMPETENCY_BRIDGES[course.id][stage].objective);
   assert.equal(item.content.stageCompetencyBridge.feedback,COMPETENCY_BRIDGES[course.id][stage].feedback);
  }
 }
 const html=renderEditorialReviewHTML(packet);
 assert.ok(html.includes(COMPETENCY_BRIDGES.business.Beginner.objective));
 assert.ok(html.includes(COMPETENCY_BRIDGES.science.Advanced.objective));
 assert.match(html,/Progressive competency bridge/);
});

test('offline bundle, style and no-telemetry constraints remain explicit',()=>{
 const root=new URL('../',import.meta.url);
 const build=fs.readFileSync(new URL('scripts/build.mjs',root),'utf8');
 const sw=fs.readFileSync(new URL('sw.js',root),'utf8');
 const html=fs.readFileSync(new URL('index.html',root),'utf8');
 const bridge=fs.readFileSync(new URL('competencybridges.js',root),'utf8');
 for(const name of ['competencybridges.js','competencybridges1.js','competencybridges2.js','competency-bridges.css']){
  assert.ok(build.includes("'"+name+"'"),'Build missing '+name);
  assert.ok(sw.includes("'/"+name+"'"),'Offline cache missing '+name);
 }
 assert.match(html,/competency-bridges.css/);
 assert.doesNotMatch(bridge,/localStorage|sessionStorage|XMLHttpRequest|fetch\s*\(/);
});
