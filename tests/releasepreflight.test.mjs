import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
test('release candidate packaging command and immutable output are integrated',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const ci=fs.readFileSync('.github/workflows/verify.yml','utf8');
 const script=fs.readFileSync('scripts/release-preflight.mjs','utf8');
 assert.match(pkg.scripts['release:preflight'],/release-preflight/);
 assert.match(ci,/Package reviewable release candidate/);
 assert.match(ci,/release-candidate-manifest\.json/);
 assert.match(ci,/xyra-atlas-reviewable-release-candidate/);
 assert.match(script,/createHash\('sha256'\)/);
 assert.match(script,/productionReady/);
 assert.match(script,/RELEASE CANDIDATE ONLY/);
});
test('release gates remain blocked without independently verified human and device evidence',()=>{
 assert.equal(COURSES.length,14);
 const gates=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates;
 assert.equal(gates.length,4);
 assert.ok(gates.every(g=>g.complete===false));
 const device=JSON.parse(fs.readFileSync('docs/device-evidence.json','utf8'));
 assert.equal(device.cases.filter(x=>x.status==='PASS').length,0);
 assert.ok(fs.readFileSync('docs/RELEASE_HANDOFF.md','utf8').includes('Vercel'));
});
