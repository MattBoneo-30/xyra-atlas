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

const passing=()=>({schemaVersion:1,cases:template.cases.map(x=>({
 id:x.id,status:'PASS',commit:'a'.repeat(40),deploymentUrl:'https://atlas.example.org',
 device:'physical handset',os:'iOS 18.7',browser:'Safari',
 testedAt:'2026-11-03T14:20:00+08:00',tester:'independent tester',
 procedure:'Follow documented install and offline flow on a real phone',
 evidence:['timestamped screenshot and tester report']
}))});
test('fully populated physical device evidence can pass structural validation',()=>{
 const result=auditDeviceEvidence(passing());
 assert.equal(result.passes,true);
 assert.equal(result.summary.PASS,18);
});
test('placeholder deployment URLs and invalid commit SHAs cannot count as real QA',()=>{
 const report=passing();
 report.cases[0].commit='not-a-sha';
 report.cases[1].deploymentUrl='https://localhost';
 report.cases[2].deploymentUrl='https://atlas.example';
 const result=auditDeviceEvidence(report);
 assert.equal(result.passes,false);
 assert.match(result.errors.join(' '),/source commit: IOS-01/);
 assert.match(result.errors.join(' '),/public HTTPS host: IOS-02/);
 assert.match(result.errors.join(' '),/public HTTPS host: IOS-03/);
});
test('future-dated and timezone-free test timestamps cannot count as real QA',()=>{
 const report=passing();
 report.cases[0].testedAt='2999-01-01T00:00:00Z';
 report.cases[1].testedAt='2026-11-03T14:20:00';
 const result=auditDeviceEvidence(report);
 assert.match(result.errors.join(' '),/future timestamp: IOS-01/);
 assert.match(result.errors.join(' '),/future timestamp: IOS-02/);
});

test('real-device approvals are bound to the exact source revision under release',()=>{
 const report=passing();
 const matching=auditDeviceEvidence(report,{expectedCommit:'a'.repeat(40)});
 assert.equal(matching.passes,true);
 const changed=auditDeviceEvidence(report,{expectedCommit:'b'.repeat(40)});
 assert.equal(changed.passes,false);
 assert.equal(changed.errors.filter(x=>x.includes('different source commit')).length,18);
 assert.equal(changed.summary.PASS,18,'reported passes are preserved but cannot certify another revision');
});
