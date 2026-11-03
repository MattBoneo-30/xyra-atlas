import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {CASE_FILES,getCaseFile,evaluateCase,normalizeCasebook,advanceCase,resetCase,casebookStats} from '../casebook.js';
test('three distinct branching cases contain meaningful two-step decisions and four endings each',()=>{
 assert.equal(CASE_FILES.length,3);assert.equal(new Set(CASE_FILES.map(c=>c.id)).size,3);
 for(const c of CASE_FILES){assert.ok(c.intro.length>50);assert.ok(c.sourceUrl.startsWith('https://'));assert.equal(c.branches.length,2);
  assert.equal(evaluateCase(c).options.length,2);for(let i=0;i<2;i++){assert.equal(evaluateCase(c,[i]).options.length,2);
   for(let j=0;j<2;j++){const result=evaluateCase(c,[i,j]);assert.equal(result.complete,true);
    assert.ok(result.ending.outcome.length>60&&result.ending.takeaway.length>40);}}
 }
});
test('progress is deterministic and backups reject unsupported paths and arbitrary keys',()=>{
 assert.deepEqual(normalizeCasebook({unknown:[0],'bank-phishing':[7]}),{});
 let p=advanceCase({},'bank-phishing',1);assert.equal(evaluateCase(getCaseFile('bank-phishing'),p['bank-phishing']).history.length,1);
 p=advanceCase(p,'bank-phishing',0);assert.equal(casebookStats(p).finished,1);assert.deepEqual(advanceCase(p,'bank-phishing',1),p);
 assert.deepEqual(normalizeCasebook({'bank-phishing':[0,0,0]}),{});assert.deepEqual(resetCase(p,'bank-phishing'),{});
});
test('Case Files are reachable from app, backed up, copied in build, and precached offline',()=>{
 const a=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),b=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(a,/function casebookPage\(/);assert.match(a,/casebook:casebookPage/);
 assert.match(a,/casebook:normalizeCasebook\(clean.casebook\)/);
 assert.match(a,/data-action="casebook-choice"/);assert.match(sw,/\/casebook\.js/);assert.match(b,/'casebook\.js'/);
});
