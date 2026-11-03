import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CAPSTONE_CRITERIA_COUNT,normalizeCapstoneChecks,capstoneCheckProgress,setCapstoneCheck,clearCapstoneChecks} from '../capstonechecks.js';

const legal='laws:case-ph-data-access';
const digital='digital:case-account-takeover-drill';
test('applied rubric self-checks save and uncheck criteria without altering unrelated subjects',()=>{
 let checks={};
 const initial=capstoneCheckProgress(checks,legal,COURSES);
 assert.equal(initial.total,3);assert.equal(initial.count,0);assert.equal(initial.reviewed,false);
 checks=setCapstoneCheck(checks,legal,0,true,COURSES);
 assert.deepEqual(checks[legal],[true,false,false]);
 checks=setCapstoneCheck(checks,legal,1,true,COURSES);
 checks=setCapstoneCheck(checks,legal,2,true,COURSES);
 assert.equal(capstoneCheckProgress(checks,legal,COURSES).reviewed,true);
 checks=setCapstoneCheck(checks,digital,1,true,COURSES);
 checks=setCapstoneCheck(checks,legal,1,false,COURSES);
 assert.equal(capstoneCheckProgress(checks,legal,COURSES).count,2);
 assert.equal(capstoneCheckProgress(checks,digital,COURSES).count,1);
 checks=clearCapstoneChecks(checks,legal,COURSES);
 assert.equal(capstoneCheckProgress(checks,legal,COURSES).count,0);
 assert.equal(checks[digital][1],true);
 assert.equal(CAPSTONE_CRITERIA_COUNT,3);
});
test('invalid imported checks and ordinary lesson keys are filtered',()=>{
 const raw={
  [legal]:[true,false,true],
  [digital]:[true,true,false],
  'laws:privacy-access-request-ph':[true,true,true],
  'shadow:fake-case':[true,true,true],
  'other:bogus':[true,true,true],
  'career:case-project-evidence':[true,true],
  'business:case-pilot-unit-economics':['yes',false,true],
  'time:case-dependency-release':[false,false,false],
  'thinking:case-viral-number-audit':{0:true,1:true,2:true}
 };
 const safe=normalizeCapstoneChecks(raw,COURSES);
 assert.deepEqual(Object.keys(safe).sort(),[legal,digital].sort());
 assert.deepEqual(normalizeCapstoneChecks(null,COURSES),{});
 assert.deepEqual(normalizeCapstoneChecks([],COURSES),{});
 assert.equal(capstoneCheckProgress(safe,'laws:privacy-access-request-ph',COURSES),null);
 assert.deepEqual(normalizeCapstoneChecks(JSON.parse(JSON.stringify(safe)),COURSES),safe);
});
test('invalid checkbox actions never create or mutate saved progress',()=>{
 const clean=setCapstoneCheck({},legal,0,true,COURSES);
 for(const [key,index,value] of [
  [legal,-1,true],[legal,3,true],[legal,1,'true'],[legal,1,1],
  ['laws:privacy-access-request-ph',1,true],['shadow:imposter',1,true]
 ])assert.deepEqual(setCapstoneCheck(clean,key,index,value,COURSES),clean);
 assert.deepEqual(clearCapstoneChecks(clean,'shadow:imposter',COURSES),clean);
});
test('mature-course checks can be saved but only on real capstone keys',()=>{
 const key='shadow:case-pressure-defenses';
 const saved=setCapstoneCheck({},key,2,true,COURSES);
 assert.equal(capstoneCheckProgress(saved,key,COURSES).count,1);
 assert.equal(capstoneCheckProgress(saved,'shadow:coercion',COURSES),null);
});
test('self-assessment is wired to offline PWA, local state and backup normalization',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 assert.match(app,/from '\.\/capstonechecks\.js'/);
 assert.match(app,/capstoneChecks:normalizeCapstoneChecks\(data\.capstoneChecks,COURSES\)/);
 assert.match(app,/capstoneChecks:normalizeCapstoneChecks\(clean\.capstoneChecks,COURSES\)/);
 assert.match(app,/data-capstone-check/);
 assert.match(build,/'capstonechecks\.js'/);
 assert.match(sw,/\/capstonechecks\.js/);
});
