import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {localDayKey,validDayKey,countVisitStreak} from '../calendar.js';
import {COURSES} from '../data.js';import {SCENARIOS} from '../scenarios.js';import {createDailyQuest} from '../dailyquest.js';
test('local day keys use date components and survive year boundaries',()=>{
 assert.equal(localDayKey(new Date(2026,10,3,23,59,59)),'2026-11-03');
 assert.equal(localDayKey(new Date(2027,0,1,0,1,0)),'2027-01-01');
 assert.equal(localDayKey(new Date(NaN)),null);
 assert.ok(validDayKey('2024-02-29'));assert.equal(validDayKey('2026-02-29'),false);
 assert.equal(validDayKey('2026-02-30'),false);assert.equal(validDayKey('2026-13-01'),false);
 assert.equal(validDayKey('2026-11-03'),true);
});
test('streaks count actual consecutive local calendar days, including year change',()=>{
 const now=new Date(2027,0,2,13);
 assert.equal(countVisitStreak(['2026-12-31','2027-01-01','2027-01-02'],now),3);
 assert.equal(countVisitStreak(['2026-12-31','2027-01-01'],now),2);
 assert.equal(countVisitStreak(['2026-12-30'],now),0);
 assert.equal(countVisitStreak([],now),0);
 assert.equal(countVisitStreak(['2027-01-01','2027-01-01','2027-01-02'],now),2);
});
test('daily quests reject dates which do not actually exist',()=>{
 assert.equal(createDailyQuest(COURSES,SCENARIOS,'2026-02-30'),null);
 assert.equal(createDailyQuest(COURSES,SCENARIOS,'2026-00-01'),null);
 assert.ok(createDailyQuest(COURSES,SCENARIOS,'2026-11-03'));
});
test('service worker only removes older Atlas caches and leaves unrelated caches',async()=>{
 const code=fs.readFileSync('sw.js','utf8'),events={};const deleted=[];
 const versionLine=code.split('\n').find(line=>line.startsWith('const CACHE = CACHE_PREFIX '));assert.ok(versionLine,'current Atlas cache version');
 const active='xyra-atlas-'+versionLine.split("'")[1];
 const cacheNames=['xyra-atlas-v11','xyra-atlas-v13','xyra-atlas-v14',active,'another-pwa-cache','site-content-v3'];
 const caches={keys:async()=>cacheNames,delete:async name=>{deleted.push(name);return true;}};
 const self={addEventListener:(type,cb)=>{events[type]=cb;},clients:{claim:async()=>true},location:{origin:'https://example.test'}};
 vm.runInNewContext(code,{self,caches,Promise,URL});
 let pending;events.activate({waitUntil(p){pending=p;}});await pending;
 assert.deepEqual(deleted.sort(),cacheNames.filter(key=>key.startsWith('xyra-atlas-')&&key!==active).sort());
});
test('app and production output use consistent local dates and offline module',()=>{
 const app=fs.readFileSync('app.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),sw=fs.readFileSync('sw.js','utf8');
 assert.match(app,/countVisitStreak\(saved.dailyVisits\)/);
 assert.match(app,/const today = \(\) => localDayKey\(new Date\(\)\)/);
 assert.match(app,/const stamp=today\(\)/);
 assert.match(build,/'calendar\.js'/);assert.match(sw,/\/calendar\.js/);
});
