import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {COURSES} from '../data.js';import {buildKnowledgeMap,suggestKnowledgeTrails} from '../atlasmap.js';
test('map covers each real subject exactly once with accessible positions',()=>{
 const m=buildKnowledgeMap(COURSES,[]);
 assert.equal(m.nodes.length,COURSES.length);
 assert.equal(new Set(m.nodes.map(n=>n.id)).size,COURSES.length);
 assert.ok(m.nodes.every(n=>n.x>0&&n.x<100&&n.y>0&&n.y<100&&n.percent===0));
 assert.ok(m.links.length>=10);
 assert.ok(m.links.every(l=>m.nodes.some(n=>n.id===l.from)&&m.nodes.some(n=>n.id===l.to)));
});
test('map reflects lesson progress and marks mature section without unlocking it',()=>{
 const c=COURSES.find(x=>!x.dark),id=c.id+':'+c.lessons[0].id;
 const m=buildKnowledgeMap(COURSES,[id,id,'unknown:lesson']);
 assert.equal(m.completed,1);assert.equal(m.nodes.find(n=>n.id===c.id).done,1);
 assert.equal(m.nodes.find(n=>n.id==='shadow').dark,true);
});
test('rendered map is available offline with complete assets and navigation',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const view=fs.readFileSync('atlas-page-views.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/function mapPage\(/);
 assert.match(app,/map:mapPage/);
 assert.match(app,/renderAtlasMapView\(\{atlas,trails,button,icon,esc\}\)/);
 assert.match(view,/data-action="open-course"/);
 assert.match(sw,/\/atlasmap\.js/);
 assert.match(build,/'atlasmap\.js'/);
 assert.match(sw,/\/atlas-page-views\.js/);
 assert.match(build,/'atlas-page-views\.js'/);
});

test('suggested connections are grounded in the actual curriculum, with real next lessons',()=>{
 const atlas=buildKnowledgeMap(COURSES,[]);
 const choices=suggestKnowledgeTrails(atlas);
 assert.equal(choices.length,3);
 assert.equal(new Set(choices.map(c=>c.to.id)).size,3);
 assert.ok(choices.every(c=>c.to.nextLesson&&c.reason.length>45),'every trail has a genuine explanation and lesson');
 assert.ok(choices.every(c=>!c.from.dark&&!c.to.dark),'adult gated content is never suggested unsolicited');
 assert.ok(choices.some(c=>c.to.id==='thinking'),'introductory trails include reasoning');
});
test('learner progress personalizes the next connections without inventing progress',()=>{
 const bank=COURSES.find(c=>c.id==='business'),first=bank.lessons[0];
 const atlas=buildKnowledgeMap(COURSES,[bank.id+':'+first.id,bank.id+':'+first.id,'fake:lesson']);
 const trails=suggestKnowledgeTrails(atlas,3);
 assert.ok(trails.length>0);
 assert.ok(trails.some(t=>t.from.id==='business'&&(t.to.id==='savings'||t.to.id==='career')),
  'related unstarted subjects are prioritized from studied courses');
 const node=atlas.nodes.find(n=>n.id==='business');
 assert.equal(node.done,1);
 assert.equal(node.nextLesson.id,bank.lessons[1].id);
});
test('finished subjects cannot be recommended as unfinished next lessons',()=>{
 const done=COURSES.filter(c=>!c.dark).flatMap(c=>c.lessons.map(l=>c.id+':'+l.id));
 const atlas=buildKnowledgeMap(COURSES,done);
 assert.equal(suggestKnowledgeTrails(atlas).length,0);
 assert.equal(suggestKnowledgeTrails(atlas,0).length,0);
 assert.deepEqual(suggestKnowledgeTrails(null),[]);
});
test('map cards expose a real accessible path into connected lessons',()=>{
 const app=fs.readFileSync('app.js','utf8'),view=fs.readFileSync('atlas-page-views.js','utf8');
 const css=fs.readFileSync('styles.css','utf8');
 assert.match(app,/suggestKnowledgeTrails\(atlas,3\)/);
 assert.match(app,/renderAtlasMapView\(\{atlas,trails,button,icon,esc\}\)/);
 assert.match(view,/class="atlas-learning-trails"/);
 assert.match(view,/'atlas-trail-button'/);
 assert.match(view,/trail\.to\.nextLesson\.id/);
 assert.match(css,/\.atlas-trails-grid/);
 assert.match(css,/\.atlas-trail-button:focus-visible/);
});
