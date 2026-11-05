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
 id:x.id,status:'PASS',commit:'a'.repeat(40),deploymentUrl:'https://atlas-test-review.vercel.app',
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

test('reserved domain and IP literal deployment URLs cannot certify device QA',()=>{
 const report=passing();
 for(const url of [
  'https://atlas.example.org','https://example.com','https://preview.example.net',
  'https://atlas.example','https://atlas.test','https://test.localhost',
  'https://machine.internal','https://127.0.0.1','https://192.168.1.5',
  'https://[::1]','https://[2001:db8::1]',
  'https://atlas-test-review.vercel.app/?token=anything',
  'https://atlas-test-review.vercel.app/#/language'
 ]){
  report.cases[0].deploymentUrl=url;
  assert.match(auditDeviceEvidence(report).errors.join(' '),/public HTTPS host: IOS-01/,url);
 }
 report.cases[0].deploymentUrl='https://atlas-test-review.vercel.app';
 assert.equal(auditDeviceEvidence(report).passes,true,
  'a plausible hostname is only a structural pass, never proof of a real deployed site');
});
test('impossible calendar dates cannot pass as device-test timestamps',()=>{
 const report=passing();
 for(const invalid of [
  '2026-02-30T12:00:00Z','2025-02-29T12:00:00Z',
  '2026-11-31T12:00:00Z','2026-00-05T12:00:00Z',
  '2026-13-05T12:00:00Z','2026-11-03T24:00:00Z',
  '2026-11-03T14:60:00Z','2026-11-03T14:20:60Z',
  '2026-11-03T14:20:00+15:00'
 ]){
  report.cases[0].testedAt=invalid;
  assert.match(auditDeviceEvidence(report).errors.join(' '),/invalid or future timestamp: IOS-01/,invalid);
 }
 report.cases[0].testedAt='2024-02-29T12:00:00Z';
 assert.equal(auditDeviceEvidence(report).passes,true,'a real leap-day is valid');
});
