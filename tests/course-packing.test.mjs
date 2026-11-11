import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {packCourseData,isPlainTeachingData,PACKABLE_COURSE_DATA} from '../scripts/pack-static-data.mjs';
import {unpackAtlasJSON} from '../atlas-packed-content.js';

const get=filename=>fs.readFileSync(new URL('../'+filename,import.meta.url),'utf8');

test('packing rejects functions, frozen objects, cycles and unusual runtime types',()=>{
 assert.equal(isPlainTeachingData({a:'hello',b:[1,true,{x:'value'}]}),true);
 assert.equal(isPlainTeachingData({missing:undefined}),false);
 assert.equal(isPlainTeachingData({handler:()=>1}),false);
 assert.equal(isPlainTeachingData({date:new Date()}),false);
 assert.equal(isPlainTeachingData(Object.freeze({a:1})),false);
 assert.equal(isPlainTeachingData({weird:Infinity}),false);
 const loop={x:1};loop.self=loop;
 assert.equal(isPlainTeachingData(loop),false);
});

test('lossless native-gzip packaging retains exact original authored course objects',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-course-pack-'));
 try{
  const out=path.join(temp,'dist');
  fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(temp,'package.json'),'{"type":"module"}');
  fs.copyFileSync(new URL('../atlascrossroads1.js',import.meta.url),path.join(temp,'atlascrossroads1.js'));
  fs.copyFileSync(new URL('../atlas-packed-content.js',import.meta.url),path.join(out,'atlas-packed-content.js'));
  fs.copyFileSync(new URL('../package.json',import.meta.url),path.join(out,'package.json'));
  const before=fs.readFileSync(path.join(temp,'atlascrossroads1.js'),'utf8');
  assert.equal(PACKABLE_COURSE_DATA.has('atlascrossroads1.js'),true);
  const savings=await packCourseData(temp,out,'atlascrossroads1.js');
  assert.ok(savings>1000,'Plain authored course data should be packed');
  assert.equal(fs.readFileSync(path.join(temp,'atlascrossroads1.js'),'utf8'),before);
  const original=await import(pathToFileURL(path.join(temp,'atlascrossroads1.js')).href);
  const packed=await import(pathToFileURL(path.join(out,'atlascrossroads1.js')).href);
  assert.deepEqual(packed.CROSSROADS_ONE,original.CROSSROADS_ONE);
  assert.equal(Object.keys(packed.CROSSROADS_ONE).length,7);
  assert.ok(fs.statSync(path.join(out,'atlascrossroads1.js')).size<Buffer.byteLength(before));
 } finally {
  fs.rmSync(temp,{recursive:true,force:true});
 }
});

test('packed data rejects malformed input and never evaluates strings as source code',async()=>{
 await assert.rejects(()=>unpackAtlasJSON('not-base64!!'),/Invalid packaged Atlas data/);
 await assert.rejects(()=>unpackAtlasJSON('Zm9v'),/Invalid packaged Atlas data/);
 const runtime=get('atlas-packed-content.js');
 assert.doesNotMatch(runtime,/\beval\s*\(|\bFunction\s*\(|fetch\s*\(|XMLHttpRequest/);
});

test('pack helper and its runtime loader are both present in offline output without modifying audit caps',()=>{
 const build=get('scripts/build.mjs'),sw=get('sw.js');
 const audit=get('scripts/static-asset-audit.mjs');
 assert.match(build,/packCourseData\(root,out,name\)/);
 assert.match(build,/atlas-packed-content\.js/);
 assert.match(sw,/\/atlas-packed-content\.js/);
 assert.match(audit,/rawAll:3000000/);
 assert.match(audit,/gzipAll:1600000/);
 assert.match(audit,/maxAppJS:240000/);
});
