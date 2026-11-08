import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {BROWSER_SHARD_COUNT,browserShardFor} from '../scripts/browser-shard-utils.mjs';

test('each Chromium browser smoke scenario is assigned exactly once across bounded runs',()=>{
 const smoke=fs.readFileSync('tests/browser-smoke.mjs','utf8');
 const names=[...smoke.matchAll(/await smoke\('([^']+)'/g)].map(m=>m[1]);
 assert.ok(names.length>=70,'preserve full 70+ scenario browser coverage');
 assert.equal(new Set(names).size,names.length,'each scenario has a unique name');
 assert.equal(BROWSER_SHARD_COUNT,3);
 const results=Array.from({length:BROWSER_SHARD_COUNT},()=>[]);
 names.forEach((name,i)=>results[browserShardFor(i)-1].push(name));
 assert.deepEqual(results.flat().slice().sort(),names.slice().sort());
 assert.ok(results.every(items=>items.length>=20&&items.length<=30));
 assert.throws(()=>browserShardFor(-1),/nonnegative/);
 assert.throws(()=>browserShardFor(1.1),/nonnegative/);
 assert.match(smoke,/browserShardFor\(position\)!==ACTIVE_SHARD/);
 assert.match(smoke,/setTimeout\(\(\)=>\{console\.error\('Browser smoke test exceeded four minutes/);
});
test('npm browser command uses the isolated three-shard runner, not a longer watchdog',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 assert.equal(pkg.scripts['test:browser'],'node scripts/run-browser-smoke.mjs');
 const runner=fs.readFileSync('scripts/run-browser-smoke.mjs','utf8');
 assert.match(runner,/for\(let shard=1;shard<=BROWSER_SHARD_COUNT;shard\+\+\)/);
 assert.match(runner,/ATLAS_BROWSER_SHARD:String\(shard\)/);
 assert.match(runner,/ATLAS_TEST_PORT:String\(42751\+shard\)/);
 assert.match(runner,/if\(code!==0\)/);
 assert.doesNotMatch(runner,/Promise\.all\(/);
});
