import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {parseStoredEnvelope,storageHealthMessage} from '../storagehealth.js';
test('corrupt or non-object saved state is rejected before data can be overwritten',()=>{
 assert.deepEqual(parseStoredEnvelope(null),{status:'empty',value:{}});
 assert.deepEqual(parseStoredEnvelope(''),{status:'empty',value:{}});
 assert.equal(parseStoredEnvelope('{"completed":["a:b"]}').status,'loaded');
 for(const payload of ['not json','[]','null','true','42','"string"','{"completed":'])assert.equal(parseStoredEnvelope(payload).status,'corrupt');
});
test('storage health warnings describe recovery and protected content',()=>{
 assert.match(storageHealthMessage('corrupt'),/NOT overwritten/);
 assert.match(storageHealthMessage('write-failed'),/Export a backup/);
 assert.ok(storageHealthMessage('read-failed').length>50);
});
test('application blocks overwrites after corrupted saves and offers raw recovery',()=>{
 const app=fs.readFileSync('app.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),sw=fs.readFileSync('sw.js','utf8');
 assert.match(app,/if\(storageProblem==='corrupt'\|\|storageProblem==='read-failed'\)return false/);
 assert.match(app,/parseStoredEnvelope\(raw\)/);
 assert.match(app,/storage-export-recovery/);
 assert.match(app,/recoveryRaw=null;storageProblem=null/);
 assert.match(sw,/\/storagehealth\.js/);assert.match(build,/'storagehealth\.js'/);
});

test('every reset creates independent nested defaults rather than reusing mutated objects',()=>{
 const a=fs.readFileSync('app.js','utf8');
 assert.match(a,/function createInitialState\(\)/);
 assert.match(a,/saved=createInitialState\(\)/);
 assert.match(a,/return \{\.\.\.createInitialState\(\),/);
 assert.match(a,/saved=candidate/);
 assert.doesNotMatch(a,/\.\.\.initial/);
});
