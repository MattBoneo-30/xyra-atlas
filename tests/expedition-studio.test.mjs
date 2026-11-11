import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {ATLAS_EXPEDITIONS,EXPEDITION_WORLD_COUNT,EXPEDITION_MISSION_COUNT,validateAtlasExpeditions,expeditionLessonRoutes,expeditionDecisionFeedback,renderAtlasExpedition,installAtlasExpedition} from '../atlas-expedition.js';
const source=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('expeditions have 14 independently authored subjects and 42 stage missions',()=>{
 assert.equal(EXPEDITION_WORLD_COUNT,14);assert.equal(EXPEDITION_MISSION_COUNT,42);
 assert.equal(validateAtlasExpeditions(COURSES.map(c=>c.id)),true);
 for(const c of COURSES){const x=ATLAS_EXPEDITIONS[c.id];assert.equal(x.choices.length,3);assert.equal(x.missions.length,3);}
});
test('rendered expedition routes use existing published lessons and real completion keys',()=>{
 for(const c of COURSES){
  const routes=expeditionLessonRoutes(c);
  assert.deepEqual(routes.map(x=>x.stage),['Beginner','Intermediate','Advanced']);
  for(const route of routes)assert.ok(c.lessons.some(l=>l.id===route.next.id));
  const html=renderAtlasExpedition(c,{completed:[c.id+':'+routes[0].next.id],getStageArt:()=>({src:'/assets/atlas-mark.svg'})});
  assert.match(html, /aria-label="Applied expedition/);
  assert.match(html,/1\/\d+ lessons read/);
  assert.equal((html.match(/data-atlas-expedition-choice=/g)||[]).length,3);
  assert.equal((html.match(/class="atlas-expedition-stage"/g)||[]).length,3);
  for(const route of routes)assert.ok(html.includes('#/lesson/'+c.id+'/'+route.next.id));
 }
});
test('decision feedback is not a score and invalid choices are ignored',()=>{
 const x=expeditionDecisionFeedback('business',1);
 assert.equal(x.label,ATLAS_EXPEDITIONS.business.choices[1].label);
 assert.equal(x.consequence,ATLAS_EXPEDITIONS.business.choices[1].consequence);
 assert.equal(expeditionDecisionFeedback('unknown',0),null);
 assert.equal(expeditionDecisionFeedback('business',3),null);
 assert.equal(expeditionDecisionFeedback('business',-1),null);
});
test('malicious course names are escaped and unknown courses render nothing',()=>{
 const html=renderAtlasExpedition({...COURSES[0],title:'<script>oops</script>'});
 assert.match(html,/&lt;script&gt;oops&lt;\/script&gt;/);
 assert.doesNotMatch(html,/<script>oops<\/script>/);
 assert.equal(renderAtlasExpedition({id:'invalid',lessons:[]}), '');
});
test('interactive listener is installed once per document',()=>{
 const mock={listeners:[],addEventListener(type,callback){this.listeners.push([type,callback]);}};
 assert.equal(installAtlasExpedition(mock),true);
 assert.equal(installAtlasExpedition(mock),false);
 assert.equal(mock.listeners.length,1);
 assert.equal(mock.listeners[0][0],'click');
});
test('expedition modules are built and explicitly precached for offline PWA',()=>{
 for(const name of ['index.html','scripts/build.mjs','sw.js']){
  const src=source(name);
  assert.match(src,/atlas-expedition\.css/);
  if(name!=='index.html')assert.match(src,/atlas-expedition\.js/);
 }
 assert.match(source('app.js'),/renderAtlasExpedition/);
 assert.match(source('atlas-expedition.css'),/prefers-reduced-motion/);
});
