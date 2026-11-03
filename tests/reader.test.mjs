import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {READER_SIZES,normalizeReaderPreferences,setReaderSize,toggleReaderFocus} from '../reader.js';
test('reader preferences handle malformed or imported backup data safely',()=>{
 assert.deepEqual(normalizeReaderPreferences(null),{size:'comfortable',focus:false});
 assert.deepEqual(normalizeReaderPreferences({size:'huge',focus:'yes'}),{size:'comfortable',focus:false});
 assert.deepEqual(normalizeReaderPreferences([]),{size:'comfortable',focus:false});
 assert.deepEqual(normalizeReaderPreferences({size:'large',focus:true}),{size:'large',focus:true});
});
test('reader controls only accept expected sizes and toggle focus reversibly',()=>{
 let p=setReaderSize(null,'large');assert.equal(p.size,'large');
 assert.deepEqual(setReaderSize(p,'not-a-size'),p);
 p=toggleReaderFocus(p);assert.equal(p.focus,true);assert.equal(toggleReaderFocus(p).focus,false);
 assert.deepEqual(READER_SIZES.map(x=>x.id),['compact','comfortable','large']);
});
test('lesson reader controls are accessible and included in offline build and backup',()=>{
 const a=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),b=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(a,/data-reader-size/);assert.match(a,/reader-size/);assert.match(a,/reader-focus/);
 assert.match(a,/reader:normalizeReaderPreferences\(clean.reader\)/);
 assert.match(a,/aria-pressed/);assert.match(sw,/\/reader\.js/);assert.match(b,/'reader\.js'/);
});
