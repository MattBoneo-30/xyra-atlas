import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {LANGUAGES} from '../data.js';
import {PHRASEBOOK,getPhrasePack} from '../phrasebook.js';
import {LANGUAGE_STARTER_PATHS,getLanguageStarterPath,languageStarterPanel} from '../languagestarterpaths.js';

test('each of the twenty available language packs includes substantive guided foundations',()=>{
 assert.equal(LANGUAGES.length,20);
 assert.deepEqual(new Set(LANGUAGES.map(l=>l.code)),new Set(Object.keys(LANGUAGE_STARTER_PATHS)));
 for(const {code,name} of LANGUAGES){
  const pack=getPhrasePack(code),path=getLanguageStarterPath(code,pack);
  assert.ok(path,name+' is missing a guided pathway');
  assert.equal(path.locale,pack.locale);
  assert.equal(path.stages.length,4);
  assert.deepEqual(path.stages.map(s=>s.number),[1,2,3,4]);
  assert.ok(path.stages.every(s=>s.body.length>90&&s.exercise.length>80),name+' has shallow instructions');
  assert.ok(path.warnings.length>80,name+' lacks an honest language-specific limitation');
  assert.equal(path.examples.length,4);
  for(const item of path.examples){
   assert.ok(pack.phrases.some(p=>p.id===item.id&&p.target===item.target&&p.english===item.english));
  }
  assert.match(languageStarterPanel(code,pack),/Cover, recall, then reveal/);
  assert.match(languageStarterPanel(code,pack),/Four guided steps/);
 }
});

test('Japanese kana remains a prerequisite before revealing phrase samples',()=>{
 const pack=getPhrasePack('ja');
 const gated=languageStarterPanel('ja',pack,{showExamples:false});
 assert.match(gated,/unlock/i);
 assert.doesNotMatch(gated,/class="language-path-target"/);
 assert.doesNotMatch(gated,/こんにちは/);
 const unlocked=languageStarterPanel('ja',pack,{showExamples:true});
 assert.match(unlocked,/こんにちは/);
 assert.ok(unlocked.includes('language-path-target'));
 assert.match(fs.readFileSync('app.js','utf8'),/showExamples:showPhrasePractice/);
 assert.match(fs.readFileSync('app.js','utf8'),/saved\.language!=='ja'\|\|done\.includes\('first-sentences'\)/);
});

test('Arabic sample uses right-to-left text without reversing the surrounding layout',()=>{
 const html=languageStarterPanel('ar',getPhrasePack('ar'));
 assert.match(html,/lang="ar" dir="rtl"/);
 assert.match(html,/مرحبًا/);
 assert.match(html,/Reveal the authored phrase/);
 assert.doesNotMatch(html,/<script/);
 assert.equal(getLanguageStarterPath('invalid',getPhrasePack('en')),null);
 assert.equal(languageStarterPanel('invalid',getPhrasePack('en')),'');
});

test('language foundations ship offline and do not redefine stored language course progress',()=>{
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(sw,/\/languagestarterpaths\.js/);
 assert.match(build,/'languagestarterpaths\.js'/);
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/import \{languageStarterPanel\}/);
 assert.match(app,/\$\{languageStarterPanel\(saved\.language,getPhrasePack\(saved\.language\)/);
 const pathSource=fs.readFileSync('languagestarterpaths.js','utf8');
 assert.doesNotMatch(pathSource,/localStorage|sessionStorage|speechSynthesis|fetch\(/);
 assert.match(pathSource,/not a full A1 curriculum/);
});
