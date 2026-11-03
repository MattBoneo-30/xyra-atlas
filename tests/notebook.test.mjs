import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';import {buildNotebookIndex,searchNotebook} from '../notebook.js';
test('notebook finds private notes with associated known lesson and subject',()=>{
 const c=COURSES.find(c=>!c.dark),l=c.lessons[0],key=c.id+':'+l.id;
 const index=buildNotebookIndex(COURSES,{[key]:'Copper orchid notebook text','unknown:topic':'Do not render'});
 assert.equal(index.length,1);assert.equal(index[0].key,key);assert.equal(index[0].content,'Copper orchid notebook text');
 assert.equal(searchNotebook(index,'copper').length,1);
 assert.equal(searchNotebook(index,'orchid missing').length,0);
 assert.equal(searchNotebook(index,'').length,1);
});
test('mature notes stay hidden until Shadow Library acknowledgment',()=>{
 const c=COURSES.find(c=>c.dark),l=c.lessons[0],key=c.id+':'+l.id;
 const notes={[key]:'Personal mature note'};
 assert.equal(buildNotebookIndex(COURSES,notes).length,0);
 assert.equal(buildNotebookIndex(COURSES,notes,{allowMature:true}).length,1);
});
test('search is case and accent insensitive and ignores unsupported content',()=>{
 const c=COURSES.find(c=>!c.dark),l=c.lessons[0],k=c.id+':'+l.id;
 const index=buildNotebookIndex(COURSES,{[k]:'Café reflection'});
 assert.equal(searchNotebook(index,'CAFE').length,1);
 assert.equal(searchNotebook(index,'NONSENSE').length,0);
 assert.deepEqual(buildNotebookIndex(COURSES,null),[]);
});
test('notebook is bundled, navigable, and searchable without remote APIs',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/function notebookPage\(/);
 assert.match(app,/notebook:notebookPage/);
 assert.match(app,/id="notebook-search"/);
 assert.match(sw,/\/notebook\.js/);assert.match(build,/'notebook\.js'/);
});
