import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {svgViolations,shellPaths,pngSize} from '../scripts/static-asset-audit.mjs';
test('precache list is real, unique, entirely same-origin and includes critical offline lessons',()=>{
 const paths=shellPaths(fs.readFileSync('sw.js','utf8'));
 assert.ok(paths.length>65);
 assert.equal(new Set(paths).size,paths.length);
 assert.ok(paths.every(s=>s.startsWith('/')&&!s.includes('..')&&!s.startsWith('//')));
 for(const key of ['/index.html','/data.js','/practiceguides.js','/advanceddecisions.js',
  '/assets/atlas-lantern-library.svg','/assets/chapter-business-atelier.svg'])
  assert.ok(paths.includes(key),key+' must be available offline');
 assert.throws(()=>shellPaths('const CACHED = [];'));
});
test('bundled SVG safety scan catches active and network-loaded content',()=>{
 assert.deepEqual(svgViolations('<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A room"></svg>'),[]);
 assert.ok(svgViolations('<svg><script>alert(1)</script></svg>').length);
 assert.ok(svgViolations('<svg><image href="https://bad.example/image.png"/></svg>').length);
 assert.ok(svgViolations('<svg onload="evil()"></svg>').length);
 assert.ok(svgViolations('<svg><foreignObject>html</foreignObject></svg>').length);
 assert.ok(svgViolations('<not-svg/>').length);
});
test('PNG header dimension validation rejects wrong formats and sizes',()=>{
 const header=Buffer.alloc(24);
 Buffer.from([137,80,78,71,13,10,26,10]).copy(header);
 header.writeUInt32BE(192,16);header.writeUInt32BE(192,20);
 assert.deepEqual(pngSize(header),{width:192,height:192});
 assert.equal(pngSize(Buffer.from('not png')),null);
 const packageJson=JSON.parse(fs.readFileSync('package.json','utf8'));
 const workflow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 assert.match(packageJson.scripts['audit:assets'],/audit-static-assets/);
 assert.match(workflow,/Audit static art accessibility and offline bundle budget/);
 assert.match(workflow,/xyra-atlas-static-asset-audit/);
});
