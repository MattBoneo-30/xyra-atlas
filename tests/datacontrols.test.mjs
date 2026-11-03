import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DATA_GROUPS,describeDataGroups,clearDataGroup} from '../datacontrols.js';
const baseline={completed:[],answers:{},reviews:{},mistakes:{},exam:null,examHistory:[],learningPath:null,
 capstoneChecks:{},dailyVisits:[],lastOpened:null,fieldNotes:{},personalCards:[],languageDays:[],phrases:{},
 phraseReviews:{},languageChallenge:null,languageChallengeHistory:{},conversationQuest:null,conversationQuestHistory:{},
 studio:{savings:{}},scenarios:{},casebook:{},favorites:[],bookmarks:[],theme:'dark',userName:'Explorer'};
const filled={...baseline,completed:['psychology:thoughts'],answers:{'psychology:thoughts':1},
 fieldNotes:{'psychology:thoughts':'do not delete'},personalCards:[{id:'a'}],phrases:{ja:['1','2']},
 languageChallenge:{code:'ja'},scenarios:{budget:1},favorites:['psychology'],bookmarks:['psychology:thoughts']};
test('privacy categories are complete, exclusive and have informative safe counts',()=>{
 assert.equal(DATA_GROUPS.length,5);
 const names=DATA_GROUPS.flatMap(group=>group.fields);
 assert.equal(new Set(names).size,names.length,'no field is accidentally shared across erase categories');
 const labels=describeDataGroups(filled);
 assert.deepEqual(labels.map(group=>group.id),['study','writing','language','practice','saved']);
 assert.ok(labels.every(group=>group.records>0));
 assert.ok(labels.find(group=>group.id==='writing').records===2);
 assert.ok(labels.find(group=>group.id==='language').records>=3);
 assert.equal(describeDataGroups({}).find(group=>group.id==='study').records,0);
});
test('selective erase replaces only specified fields and never mutates another category',()=>{
 for(const group of DATA_GROUPS){
  const clear=clearDataGroup(filled,baseline,group.id);
  assert.ok(clear,group.id);
  assert.notEqual(clear,filled);
  for(const key of group.fields)assert.deepEqual(clear[key],baseline[key],group.id+' clears '+key);
  for(const other of Object.keys(filled).filter(key=>!group.fields.includes(key)))
   assert.deepEqual(clear[other],filled[other],group.id+' preserves '+other);
  assert.equal(clear.userName,'Explorer');
  assert.equal(clear.theme,'dark');
 }
 assert.equal(filled.fieldNotes['psychology:thoughts'],'do not delete','original remains untouched');
});
test('unsupported keys or invalid inputs never trigger a privacy erase',()=>{
 assert.equal(clearDataGroup(filled,baseline,'unknown'),null);
 assert.equal(clearDataGroup(null,baseline,'study'),null);
 assert.equal(clearDataGroup(filled,{},'study'),null);
 assert.equal(clearDataGroup(filled,baseline,{}),null);
});
test('privacy controls work with offline build, route, and backup-safe confirmation UI',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/privacyPage\(\)/);
 assert.match(app,/privacy-erase-confirm/);
 assert.match(app,/modal==='privacy-clear'/);
 assert.match(app,/action==='privacy-open'/);
 assert.match(app,/clearDataGroup\(saved,createInitialState\(\),dataGroupPendingId\)/);
 assert.match(sw,/\/datacontrols\.js/);
 assert.match(build,/'datacontrols\.js'/);
});
