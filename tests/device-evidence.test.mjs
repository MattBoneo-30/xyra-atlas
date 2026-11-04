import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {auditDeviceEvidence} from '../scripts/audit-device-evidence.mjs';
const template=JSON.parse(fs.readFileSync(new URL('../docs/device-evidence.json',import.meta.url),'utf8'));
test('unrun physical-device evidence never passes release',()=>{
 const result=auditDeviceEvidence(template);
 assert.equal(result.passes,false);
 assert.equal(result.summary['NOT RUN'],18);
 assert.equal(result.errors.length,0);
});
test('a PASS without physical-device evidence is rejected',()=>{
 const report=structuredClone(template);
 report.cases[0].status='PASS';
 assert.match(auditDeviceEvidence(report).errors.join(' '),/PASS lacks required actual evidence/);
});
test('duplicate and missing case records fail',()=>{
 const report=structuredClone(template);
 report.cases[1].id=report.cases[0].id;
 assert.equal(auditDeviceEvidence(report).passes,false);
 assert.match(auditDeviceEvidence(report).errors.join(' '),/Duplicate/);
 assert.match(auditDeviceEvidence(report).errors.join(' '),/Missing/);
});
