import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {COURSES} from '../data.js';import {buildKnowledgeMap} from '../atlasmap.js';
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
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/function mapPage\(/);assert.match(app,/map:mapPage/);assert.match(app,/data-action="open-course"/);
 assert.match(sw,/\/atlasmap\.js/);assert.match(build,/'atlasmap\.js'/);
});
