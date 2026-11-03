import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('professional README stays concise while detailed release history is retained',()=>{
 const readme=fs.readFileSync('README.md','utf8');
 const changelog=fs.readFileSync('CHANGELOG.md','utf8');
 assert.ok(readme.length<14000,'README should not be a 40k changelog');
 assert.ok(changelog.length>25000,'detailed history must not be discarded');
 assert.ok(readme.includes('[CHANGELOG.md](CHANGELOG.md)'));
 assert.ok(changelog.includes('Offline Asset Quality Gate (1.59)'));
 assert.ok(changelog.includes('WebKit Cross-Engine QA (1.58)'));
 assert.ok(!readme.includes('\\n- **'),'escaped line breaks make project documentation hard to read');
 assert.ok(readme.includes('0 lessons and 0 decisions'));
 assert.ok(readme.includes('not'));
});
test('stage gates still require independent editorial, visual and device signoff',()=>{
 const {gates}=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(gates.length,4);
 assert.ok(gates.every(g=>g.complete===false&&g.reportSent===false));
 const visual=gates.find(x=>x.id==='final-visual-experience');
 assert.ok(visual.evidence.some(e=>e.value.includes('41699259088')));
 assert.ok(visual.blockers.some(x=>/painterly/i.test(x)));
});
