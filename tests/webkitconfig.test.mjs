import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('WebKit is a separately tested browser engine, not a false claim of physical iOS certification',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const workflow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 const runner=fs.readFileSync('tests/webkit-smoke.mjs','utf8');
 assert.match(pkg.scripts['test:webkit'],/webkit-smoke\.mjs/);
 assert.match(workflow,/playwright install --with-deps webkit/);
 assert.match(workflow,/npm run test:webkit/);
 assert.match(runner,/Linux engine only/);
 assert.match(runner,/noHorizontalOverflow/);
 assert.match(runner,/clinic-question/);
 assert.match(runner,/practice-guide-steps/);
 const stages=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(stages.gates.find(s=>s.id==='release-readiness').complete,false);
});
