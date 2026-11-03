import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import { COURSES } from '../data.js';import { GLOSSARY } from '../glossary.js';import { SCENARIOS } from '../scenarios.js';import { CASE_FILES } from '../casebook.js';
import {SEARCH_KINDS,normalizeSearchText,buildSearchIndex,searchAtlas} from '../search.js';
const index=buildSearchIndex(COURSES,GLOSSARY,SCENARIOS,CASE_FILES);
test('index includes actual courses, lessons, glossary terms and situations',()=>{
  assert.equal(index.length,COURSES.length+COURSES.reduce((n,c)=>n+c.lessons.length,0)+GLOSSARY.length+SCENARIOS.length+CASE_FILES.length);
  assert.equal(new Set(index.map(i=>i.key)).size,index.length);
  assert.deepEqual(new Set(index.map(i=>i.kind)),new Set(['course','lesson','term','scenario','case']));
});
test('accent-insensitive matching and exact terms rank first',()=>{
  assert.equal(normalizeSearchText('  ÉmoTiÓnAL   '),'emotional');
  assert.equal(searchAtlas(index,'phishing')[0].title,'Phishing');
  assert.equal(searchAtlas(index,'break-even')[0].title,'Break-even point');
  assert.equal(searchAtlas(index,'what a legal system')[0].kind,'lesson');
});
test('mature learning items cannot leak into ordinary search results',()=>{
  for(const word of ['gaslighting','coercive control']){
    assert.equal(searchAtlas(index,word).some(i=>i.hidden),false);
    assert.ok(searchAtlas(index,word,{allowMature:true}).some(i=>i.hidden));
  }
  assert.equal(searchAtlas(index,'shadow library').some(i=>i.hidden),false);
});
test('filters and safeguards are deterministic',()=>{
  assert.deepEqual(searchAtlas(index,'   '),[]);
  assert.deepEqual(searchAtlas(index,'$',{limit:0}),[]);
  assert.ok(searchAtlas(index,'price',{kind:'scenario'}).every(x=>x.kind==='scenario'));
  assert.ok(searchAtlas(index,'budget',{kind:'lesson'}).every(x=>x.kind==='lesson'));
  assert.ok(SEARCH_KINDS.some(x=>x.id==='term'));
  assert.ok(SEARCH_KINDS.some(x=>x.id==='case'));
  assert.ok(searchAtlas(index,'midnight bank',{kind:'case'}).some(x=>x.id==='bank-phishing'));
  assert.ok(searchAtlas(index,'workplace',{kind:'case'}).every(x=>x.kind==='case'));
  assert.ok(searchAtlas(index,'the',{limit:10}).length<=10);
  assert.ok(searchAtlas(index,'phish',{limit:1}).length===1);
});
test('app shell includes direct Search route, input, and source navigation',()=>{
  const app=fs.readFileSync('app.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),sw=fs.readFileSync('sw.js','utf8');
  assert.match(app,/function globalSearchPage\(/);
  assert.match(app,/search:globalSearchPage/);
  assert.match(app,/id="atlas-global-search"/);
  assert.match(app,/open-search-term/);
  assert.match(app,/open-search-scenario/);
  assert.match(app,/item.kind==='case'\?'casebook-open'/);
  assert.match(build,/'search\.js'/);assert.match(sw,/\/search\.js/);
});
