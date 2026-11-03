/** Actual Chromium PWA smoke tests for desktop and touch-sized viewports.
 * Installed only in CI; Playwright is NOT a production dependency. */
import { spawn } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import {COURSES} from '../data.js';

const PORT=42751;
const BASE='http://127.0.0.1:'+PORT;
const snapshots='artifacts/browser';
await mkdir(snapshots,{recursive:true});

const server=spawn(process.execPath,['scripts/serve.mjs'],{
 cwd:process.cwd(),env:{...process.env,PORT:String(PORT)},stdio:['ignore','pipe','pipe']
});
const serverOutput=[];
server.stdout.on('data',chunk=>serverOutput.push(String(chunk)));
server.stderr.on('data',chunk=>serverOutput.push(String(chunk)));
let browser;
let failures=0;
// A failed readiness check must never consume the full CI job timeout.
const watchdog=setTimeout(()=>{console.error('Browser smoke test exceeded four minutes; aborting rather than hanging CI.');process.exit(2);},240000);
watchdog.unref();
function expect(condition,label){assert.ok(condition,label);console.log('  ✓ '+label);}
async function ready(){
 for(let attempt=0;attempt<90;attempt++){
  if(server.exitCode!==null)throw Error('Server exited: '+serverOutput.join(''));
  try{const r=await fetch(BASE+'/');if(r.ok)return;}catch{}
  await new Promise(resolve=>setTimeout(resolve,400));
 }
 throw Error('Timed out starting Atlas preview: '+serverOutput.join(''));
}
async function smoke(name,options,fn){
 const context=await browser.newContext(options),page=await context.newPage();
 page.setDefaultTimeout(12000);
 page.setDefaultNavigationTimeout(15000);
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',msg=>{if(msg.type()==='error')console.log('  Browser console: '+msg.text().slice(0,300));});
 console.log('\n--- '+name+' ---');
 try{
  await page.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  await page.locator('#app main').first().waitFor({timeout:12000});
  await fn(page,context,errors);
  expect(errors.length===0,name+' has no uncaught JavaScript exceptions'+(errors.length?': '+errors.join(' | '):''));
  console.log('PASS '+name);
 }catch(e){
  failures++;
  console.error('FAIL '+name+'\n'+(e.stack||e));
  console.error('Recorded browser errors: '+JSON.stringify(errors));
  try{await page.screenshot({path:snapshots+'/'+name.replace(/[^a-z0-9-]/gi,'-')+'-failure.png',fullPage:true});}catch{}
 }finally{await context.close();}
}
function mobileOverflow(page){return page.evaluate(()=>({
 width:window.innerWidth,scroll:document.documentElement.scrollWidth,
 offenders:[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>window.innerWidth+8 && getComputedStyle(el).position!=='fixed').slice(0,8).map(el=>el.tagName+'.'+String(el.className).slice(0,60))
}));}
function getState(page){return page.evaluate(()=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')||'{}'));}
function waitRoute(page,value){return page.waitForFunction(route=>location.hash.includes(route),value,{timeout:10000});}

try{
 await ready();
 // Validate security headers against the actual local preview, not only a config file.
 const homeResponse=await fetch(BASE+'/');
 const policy=homeResponse.headers.get('content-security-policy')||'';
 expect(policy.includes("script-src 'self'"),'preview enforces self-hosted scripts');
 expect(homeResponse.headers.get('x-frame-options')==='DENY','preview resists framing');
 const missingResponse=await fetch(BASE+'/this-asset-is-not-present.js');
 expect(missingResponse.status===404,'missing assets return 404 rather than fake HTML');
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 await smoke('desktop-lessons', {viewport:{width:1365,height:900}},async(page)=>{
  expect(await page.locator('.home-page').count()===1,'home screen renders');
  await page.locator('.desktop-rail [data-action="nav"][data-id="explore"]').click();
  await waitRoute(page,'#/explore');
  await page.locator('[data-action="open-course"][data-id="psychology"]').first().click();
  await waitRoute(page,'#/course/psychology');
  await page.locator('[data-action="open-lesson"]').first().click();
  await waitRoute(page,'#/lesson/psychology/');
  await page.locator('.reading-page').waitFor();
  expect(await page.locator('.reading-page').count()===1,'lesson page renders');
  expect(await page.locator('.chapter-map-node').count()>=2,'chapter map has navigation links');
  await page.locator('[data-action="jump-chapter"][data-index="0"]').click();
  expect(await page.evaluate(()=>document.activeElement?.id==='lesson-section-0'),'chapter link focuses lesson section');
  await page.locator('#field-note-input').fill('Verified offline learning note');
  await page.locator('[data-action="reader-size"][data-id="large"]').click();
  expect(await page.locator('.reading-page[data-reader-size="large"]').count()===1,'reading size changes');
  await page.locator('[data-action="reader-focus"]').click();
  expect(await page.locator('body.reader-focus-mode').count()===1,'focus mode hides distractions');
  await page.locator('[data-action="reader-focus"]').click();
  let quizPassed=false;
  for(const option of await page.locator('.quiz-option').all()){
   await option.click();
   if(await page.locator('.quiz-feedback.good').count()){quizPassed=true;break;}
  }
  expect(quizPassed,'quiz answer is evaluated interactively');
  const complete=page.locator('[data-action="complete"]');
  expect(await complete.isEnabled(),'passing quiz enables completion');
  await complete.click();
  let state=await getState(page);
  expect(state.completed.length===1,'lesson completion persisted in browser');
  expect(Object.values(state.fieldNotes).includes('Verified offline learning note'),'field note saved locally');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#field-note-input').waitFor();
  expect(await page.locator('#field-note-input').inputValue()==='Verified offline learning note','field note survives reload');
  await page.locator('.topbar [data-action="search"]').click();
  await waitRoute(page,'#/search');
  await page.locator('#atlas-global-search').fill('phishing');
  expect(await page.locator('.global-search-result').count()>=1,'universal search returns results');
  await page.screenshot({path:snapshots+'/desktop-search.png',fullPage:true});
 });
 await smoke('desktop-branching', {viewport:{width:1280,height:800}},async(page)=>{
  await page.locator('.desktop-rail [data-action="casebook"]').click();
  await waitRoute(page,'#/casebook');
  await page.locator('.casebook-list [data-action="casebook-open"]').first().waitFor();
  expect(await page.locator('.casebook-list [data-action="casebook-open"]').count()===3,'Case Files catalogue renders');
  await page.locator('[data-action="casebook-open"]').first().click();
  await waitRoute(page,'#/casebook/');
  await page.locator('[data-action="casebook-choice"]').first().waitFor();
  expect(await page.locator('[data-action="casebook-choice"]').count()===2,'first decision available');
  await page.locator('[data-action="casebook-choice"]').first().click();
  await page.locator('.casebook-history').waitFor();
  expect(await page.locator('[data-action="casebook-choice"]').count()===2,'second decision available');
  await page.locator('[data-action="casebook-choice"]').first().click();
  await page.locator('.casebook-result').waitFor();
  expect(await page.locator('.casebook-result').count()===1,'branch ends with consequence');
  let state=await getState(page);
  expect(Object.values(state.casebook).some(v=>v.length===2),'branch choices persisted');
  await page.locator('[data-action="casebook-reset"]').click();
  await page.locator('[data-action="casebook-choice"]').first().waitFor();
  expect(await page.locator('[data-action="casebook-choice"]').count()===2,'case can be replayed');
 });
 await smoke('mobile-offline', {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  const homeOverflow=await mobileOverflow(page);
  expect(homeOverflow.scroll<=homeOverflow.width+2,'home fits mobile width: '+JSON.stringify(homeOverflow));
  await page.locator('.bottom-nav [data-action="nav"][data-id="explore"]').click();
  await waitRoute(page,'#/explore');
  const exploreOverflow=await mobileOverflow(page);
  expect(exploreOverflow.scroll<=exploreOverflow.width+2,'course grid fits mobile width: '+JSON.stringify(exploreOverflow));
  await page.locator('[data-action="open-course"][data-id="psychology"]').first().click();
  await waitRoute(page,'#/course/psychology');
  await page.locator('[data-action="open-lesson"]').first().click();
  await waitRoute(page,'#/lesson/psychology/');
  const lessonOverflow=await mobileOverflow(page);
  expect(lessonOverflow.scroll<=lessonOverflow.width+2,'lesson fits mobile width: '+JSON.stringify(lessonOverflow));
  await page.screenshot({path:snapshots+'/mobile-lesson.png',fullPage:true});
  await page.evaluate(async()=>{
   const timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error('Service worker did not become ready within 15 seconds')),15000));
   await Promise.race([navigator.serviceWorker.ready,timeout]);
  });
  await page.waitForTimeout(900);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.reading-page').waitFor({timeout:10000});
  expect(await page.locator('.chapter-map-node').count()>=2,'cached lessons remain available offline');
  await page.locator('.bottom-nav [data-action="nav"][data-id="explore"]').click();
  await waitRoute(page,'#/explore');
  await page.locator('.course-list').waitFor();
  expect(await page.locator('.course-list [data-action="open-course"]').count()>=10,'offline navigation keeps the local course library usable');
  await page.screenshot({path:snapshots+'/mobile-offline.png',fullPage:true});
  await context.setOffline(false);
 });
 await smoke('small-phone-consent', {viewport:{width:320,height:720},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page)=>{
  const home=await mobileOverflow(page);
  expect(home.scroll<=home.width+2,'320px home has no horizontal page overflow: '+JSON.stringify(home));
  await page.locator('.bottom-nav [data-action="nav"][data-id="explore"]').click();
  await page.locator('.course-list').waitFor();
  const listing=await mobileOverflow(page);
  expect(listing.scroll<=listing.width+2,'320px course directory fits the viewport: '+JSON.stringify(listing));
  await page.locator('.course-list [data-action="open-course"][data-id="shadow"]').click();
  await page.locator('.modal-card').waitFor();
  expect(await page.locator('[data-action="enter-shadow"]').isDisabled(),'mature-content entry requires acknowledgment');
  await page.locator('#age-agree').check();
  expect(await page.locator('[data-action="enter-shadow"]').isEnabled(),'adult acknowledgment enables deliberate entry');
  await page.locator('[data-action="enter-shadow"]').click();
  await page.locator('.course-page').waitFor();
  expect(await page.locator('.course-heading').count()===1,'age acknowledgment opens selected course');
  const matureOverflow=await mobileOverflow(page);
  expect(matureOverflow.scroll<=matureOverflow.width+2,'mature course does not overflow narrow phone');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.modal-card').waitFor();
  expect(await page.locator('[data-action="enter-shadow"]').isDisabled(),'mature-content acknowledgment is not silently persisted');
  await page.screenshot({path:snapshots+'/small-phone-consent.png',fullPage:true});
 });
 await smoke('local-recovery', {viewport:{width:1280,height:800},acceptDownloads:true},async(page)=>{
  const corrupted='{broken-progress';
  await page.evaluate(value=>localStorage.setItem('xyra-atlas-state-v1',value),corrupted);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.storage-health-alert').waitFor();
  expect(await page.evaluate(()=>localStorage.getItem('xyra-atlas-state-v1'))===corrupted,'invalid original progress is protected from automatic overwrite');
  const downloadEvent=page.waitForEvent('download');
  await page.locator('[data-action="storage-export-recovery"]').click();
  const download=await downloadEvent;
  expect(download.suggestedFilename().includes('unreadable-recovery'),'corrupted progress can be exported as a recovery copy');
  await page.locator('.desktop-rail [data-action="nav"][data-id="you"]').click();
  await page.locator('.storage-health-panel').waitFor();
  expect((await page.locator('.storage-health-panel').textContent()).includes('Recovery needed'),'settings explain storage recovery state');
  await page.locator('[data-action="reset-dialog"]').click();
  await page.locator('[data-action="confirm-reset"]').click();
  await page.locator('.home-page').waitFor();
  expect(await page.locator('.storage-health-alert').count()===0,'explicit reset clears the recovery warning');
  const restored=await getState(page);
  expect(Array.isArray(restored.completed),'normal browser storage is writable after explicit reset');
 });
 await smoke('offline-pack-manager',{viewport:{width:1280,height:800}},async(page,context)=>{
  await page.evaluate(async()=>{
   const wait=new Promise((_,reject)=>setTimeout(()=>reject(new Error('Offline worker did not activate')),15000));
   await Promise.race([navigator.serviceWorker.ready,wait]);
  });
  await page.locator('.desktop-rail [data-action="offline-open"]').click();
  await page.locator('.offline-library-page').waitFor();
  await page.waitForFunction(()=>document.querySelector('.offline-pill')?.textContent?.trim()==='Ready',{},{timeout:12000});
  expect(await page.locator('.offline-count strong').textContent()!=='—','offline manager verifies a complete lesson pack');
  const deleted=await page.evaluate(async()=>{
   const names=await caches.keys(),name=names.find(n=>n.startsWith('xyra-atlas-'));
   if(!name)return false;
   const cache=await caches.open(name);return cache.delete('/assets/course-business.svg');
  });
  expect(deleted,'test can simulate a missing cached course illustration');
  await page.locator('[data-action="offline-verify"]').click();
  await page.waitForFunction(()=>document.querySelector('.offline-pill')?.textContent?.trim()==='Incomplete',{},{timeout:12000});
  expect(await page.locator('.offline-advice').textContent()!=='' ,'missing asset produces a visible warning');
  await page.locator('[data-action="offline-repair"]').click();
  await page.waitForFunction(()=>document.querySelector('.offline-pill')?.textContent?.trim()==='Ready',{},{timeout:12000});
  expect(await page.locator('.offline-meter').getAttribute('aria-valuenow')===await page.locator('.offline-meter').getAttribute('aria-valuemax'),'repair restores every required offline asset');
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.offline-library-page').waitFor();
  await page.locator('[data-action="offline-verify"]').click();
  await page.waitForFunction(()=>document.querySelector('.offline-pill')?.textContent?.trim()==='Ready',{},{timeout:12000});
  expect(await page.locator('.offline-pill').textContent()!=='' ,'offline manager can verify cached files without a network');
  await context.setOffline(false);
  await page.screenshot({path:snapshots+'/offline-library-ready.png',fullPage:true});
 });
 await smoke('repeat-progress-reset',{viewport:{width:1280,height:800}},async page=>{
  await page.locator('.desktop-rail [data-action="nav"][data-id="you"]').click();
  await page.locator('[data-action="reset-dialog"]').click();
  await page.locator('[data-action="confirm-reset"]').click();
  await page.locator('.home-page').waitFor();
  await page.locator('.desktop-rail [data-action="nav"][data-id="explore"]').click();
  await page.locator('[data-action="open-course"][data-id="psychology"]').first().click();
  await page.locator('[data-action="open-lesson"]').first().click();
  await page.locator('#field-note-input').waitFor();
  await page.locator('#field-note-input').fill('This note must disappear after reset');
  await page.locator('.quiz-option').first().click();
  const before=await getState(page);
  expect(Object.keys(before.answers||{}).length===1,'a nested quiz answer exists before reset');
  expect(Object.keys(before.fieldNotes||{}).length===1,'a nested note exists before reset');
  await page.locator('.desktop-rail [data-action="nav"][data-id="you"]').click();
  await page.locator('[data-action="reset-dialog"]').click();
  await page.locator('[data-action="confirm-reset"]').click();
  await page.locator('.home-page').waitFor();
  const after=await getState(page);
  expect(Object.keys(after.answers||{}).length===0,'repeat reset fully clears quiz answers');
  expect(Object.keys(after.fieldNotes||{}).length===0,'repeat reset fully clears private notes');
  expect((after.completed||[]).length===0,'repeat reset fully clears completed lessons');
  await page.reload({waitUntil:'domcontentloaded'});
  expect(Object.keys((await getState(page)).answers||{}).length===0,'reset remains clean after reload');
 });
 await smoke('deep-link-resilience',{viewport:{width:1280,height:800}},async page=>{
  await page.evaluate(()=>location.hash='#/lesson/%E0%A4%A');
  await page.locator('.home-page').waitFor();
  expect(await page.locator('.home-page').count()===1,'invalid encoded deep link opens safe Home');
  await page.evaluate(()=>location.hash='#/course/%ZZ');
  await page.locator('.home-page').waitFor();
  expect(await page.locator('.home-page').count()===1,'second malformed route leaves app usable');
  await page.evaluate(()=>location.hash='#/course/psychology');
  await page.locator('.course-page').waitFor();
  expect(await page.locator('.course-heading').count()===1,'a subsequent valid course deep link still works');
  await page.evaluate(()=>location.hash='#/lesson/psychology/does-not-exist');
  await page.locator('.empty-state').first().waitFor();
  expect(await page.locator('.empty-state').count()>=1,'unknown lesson shows a recoverable error screen');
 });
 await smoke('backup-preview-restore',{viewport:{width:1280,height:820}},async page=>{
  const original={completed:[],fieldNotes:{'psychology:thoughts':'Original private note'},answers:{},bookmarks:[],theme:'dark'};
  await page.evaluate(value=>localStorage.setItem('xyra-atlas-state-v1',JSON.stringify(value)),original);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.desktop-rail [data-action="nav"][data-id="you"]').click();
  const backup={format:'xyra-atlas-backup',version:1,exportedAt:'2026-11-03T09:00:00Z',
    state:{completed:['psychology:thoughts'],fieldNotes:{'psychology:thoughts':'Imported note'},answers:{},bookmarks:[]}};
  async function upload(payload,name='atlas-backup.json'){
   await page.locator('#backup-file').setInputFiles({name,mimeType:'application/json',buffer:Buffer.from(payload)});
  }
  await upload(JSON.stringify(backup));
  await page.locator('.backup-preview-grid').waitFor();
  expect((await page.locator('.modal-card').textContent()).includes('Restore this backup?'),'upload opens review modal rather than restoring immediately');
  expect((await getState(page)).fieldNotes['psychology:thoughts']==='Original private note','original note is untouched during preview');
  await page.locator('[data-action="backup-cancel"]').click();
  expect((await getState(page)).fieldNotes['psychology:thoughts']==='Original private note','cancel keeps existing data');
  await upload('{"format":"not-atlas"}');
  await page.waitForTimeout(100);
  expect((await getState(page)).fieldNotes['psychology:thoughts']==='Original private note','invalid import preserves progress');
  await upload(JSON.stringify(backup));
  await page.locator('.backup-preview-grid').waitFor();
  await page.locator('[data-action="backup-confirm"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')||'{}').fieldNotes?.['psychology:thoughts']==='Imported note');
  expect((await getState(page)).fieldNotes['psychology:thoughts']==='Imported note','confirmed restore replaces progress');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).fieldNotes['psychology:thoughts']==='Imported note','restored data survives browser reload');
  await page.screenshot({path:snapshots+'/backup-restore.png',fullPage:true});
 });
 await smoke('keyboard-dialog-accessibility',{viewport:{width:1280,height:800}},async page=>{
  await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>document.activeElement?.id==='skip-content'),'first keyboard Tab focuses skip link');
  await page.keyboard.press('Enter');
  expect(await page.evaluate(()=>document.activeElement?.id==='atlas-main'),'skip action focuses the main learning content');
  await page.locator('.topbar [data-action="open-updates"]').click();
  await page.locator('.modal-card').waitFor();
  await page.waitForFunction(()=>document.activeElement?.classList.contains('modal-close'));
  expect(await page.locator('.shell').evaluate(el=>el.inert),'background becomes inert when a dialog opens');
  for(let i=0;i<5;i++){await page.keyboard.press(i%2?'Shift+Tab':'Tab');expect(await page.evaluate(()=>document.querySelector('.modal-card')?.contains(document.activeElement)),'Tab focus stays within the dialog');}
  await page.keyboard.press('Escape');
  await page.locator('.modal-card').waitFor({state:'detached'});
  expect(!await page.locator('.shell').evaluate(el=>el.inert),'closing the dialog restores page interaction');
  await page.waitForFunction(()=>document.activeElement?.id==='atlas-main');
  expect(await page.evaluate(()=>document.activeElement?.id==='atlas-main'),'Escape restores focus to learning content');
 });
 await smoke('field-notebook-library',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  await page.locator('.bottom-nav [data-action="nav"][data-id="explore"]').click();
  await page.locator('[data-action="open-course"][data-id="psychology"]').first().click();
  await page.locator('[data-action="open-lesson"]').first().click();
  await page.locator('#field-note-input').waitFor();
  await page.locator('#field-note-input').fill('Copper orchid reflection: check the facts first.');
  await page.locator('.bottom-nav [data-action="nav"][data-id="saved"]').click();
  await page.locator('.notebook-invite [data-action="notebook-open"]').click();
  await page.locator('.notebook-page').waitFor();
  expect(await page.locator('.notebook-entry').count()===1,'private notes appear in notebook library');
  await page.locator('#notebook-search').fill('copper orchid');
  expect(await page.locator('.notebook-entry').count()===1,'note full-text search finds saved thought');
  await page.locator('#notebook-search').fill('unfindable-word');
  expect(await page.locator('.notebook-entry').count()===0,'unmatched term filters all notes');
  await page.locator('[data-action="notebook-clear"]').click();
  await page.locator('.notebook-entry').first().click();
  await page.locator('#field-note-input').waitFor();
  expect((await page.locator('#field-note-input').inputValue()).includes('Copper orchid'),'notebook opens the exact lesson and original note');
  await page.screenshot({path:snapshots+'/notebook-lesson.png',fullPage:true});
 });
 await smoke('mistake-lab-repractice',{viewport:{width:1280,height:800}},async page=>{
  await page.locator('.desktop-rail [data-action="nav"][data-id="explore"]').click();
  await page.locator('[data-action="open-course"][data-id="psychology"]').first().click();
  await page.locator('[data-action="open-lesson"]').first().click();
  await page.locator('.quiz-options .quiz-option').first().click();
  expect((await getState(page)).mistakes?.['psychology:thoughts']?.wrong===1,'incorrect quiz records a missed question');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).mistakes?.['psychology:thoughts']?.wrong===1,'missed question survives reload');
  const rail=await page.locator('.desktop-rail').evaluate(el=>({overflow:getComputedStyle(el).overflowY,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight}));
  expect(rail.overflow==='auto'&&rail.scrollHeight>rail.clientHeight,'long desktop sidebar is independently scrollable');
  await page.locator('.desktop-rail [data-action="mistakes-open"]').click();
  await page.locator('.mistakes-page').waitFor();
  expect(await page.locator('.mistake-option').count()===3,'missed question appears for re-practice');
  await page.locator('.mistake-option[data-index="0"]').click();
  await page.locator('.mistake-explanation').waitFor();
  expect((await page.locator('.mistake-explanation').textContent()).length>60,'wrong retry shows an explanatory learning hint');
  expect((await getState(page)).mistakes?.['psychology:thoughts']?.wrong===2,'repeat incorrect answer increments count');
  await page.locator('.mistake-option[data-index="1"]').click();
  await page.locator('.mistake-empty').waitFor();
  const state=await getState(page);
  expect(Object.keys(state.mistakes||{}).length===0,'correct retry clears missed-question queue');
  expect(state.answers?.['psychology:thoughts']===1,'correct response updates lesson quiz state');
  expect((state.completed||[]).length===0,'re-practice does not mark lesson completed');
  await page.screenshot({path:snapshots+'/mistake-lab.png',fullPage:true});
 });
 await smoke('multi-question-mistake-navigation',{viewport:{width:1280,height:800}},async page=>{
  await page.locator('.desktop-rail [data-action="nav"][data-id="explore"]').click();
  await page.locator('[data-action="open-course"][data-id="psychology"]').first().click();
  await page.locator('[data-action="open-lesson"]').first().click();
  await page.locator('.quiz-option[data-index="0"]').click();
  await page.locator('.next-lesson[data-action="open-lesson"]').click();
  await page.locator('.quiz-option[data-index="0"]').click();
  await page.locator('.desktop-rail [data-action="nav"][data-id="journey"]').click();
  await page.locator('.mistakes-invite [data-action="mistakes-open"]').click();
  await page.locator('.mistake-pager').waitFor();
  expect((await page.locator('.mistake-pager').textContent()).includes('1 of 2'),'two missed questions are available');
  await page.locator('[data-action="mistake-cycle"][data-id="next"]').click();
  expect((await page.locator('.mistake-pager').textContent()).includes('2 of 2'),'next moves to the second missed question');
  await page.locator('[data-action="mistake-cycle"][data-id="prev"]').click();
  expect((await page.locator('.mistake-pager').textContent()).includes('1 of 2'),'previous returns to first');
  await page.locator('.mistake-option[data-index="1"]').click();
  expect(Object.keys((await getState(page)).mistakes||{}).length===1,'correcting one question preserves the other');
  await page.locator('.mistake-option[data-index="1"]').click();
  await page.locator('.mistake-empty').waitFor();
  expect(Object.keys((await getState(page)).mistakes||{}).length===0,'both missed topics can be resolved');
  await page.screenshot({path:snapshots+'/mistake-lab-multi.png',fullPage:true});
 });
 await smoke('encrypted-backup-restore',{viewport:{width:1280,height:800},acceptDownloads:true},async page=>{
  const key='psychology:thoughts',password='a long purple archive passphrase';
  await page.evaluate(key=>{const state=JSON.parse(localStorage.getItem('xyra-atlas-state-v1'));state.fieldNotes={[key]:'Secret sunrise study notes'};localStorage.setItem('xyra-atlas-state-v1',JSON.stringify(state));},key);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.desktop-rail [data-action="nav"][data-id="you"]').click();
  await page.locator('[data-action="backup-encrypted-export"]').click();
  await page.locator('#encrypt-backup-password').fill(password);
  await page.locator('#encrypt-backup-confirm').fill(password);
  const pending=page.waitForEvent('download');
  await page.locator('[data-action="backup-encrypt-confirm"]').click();
  const dl=await pending;const content=await (await import('node:fs/promises')).readFile(await dl.path(),'utf8');
  expect(dl.suggestedFilename().startsWith('xyra-atlas-private-'),'encrypted backup gets a protected filename');
  expect(!content.includes('Secret sunrise study notes'),'encrypted backup does not expose note text');
  expect(JSON.parse(content).cipher==='AES-256-GCM','protected file declares authenticated encryption');
  await page.evaluate(key=>{const state=JSON.parse(localStorage.getItem('xyra-atlas-state-v1'));state.fieldNotes={[key]:'New current notes'};localStorage.setItem('xyra-atlas-state-v1',JSON.stringify(state));},key);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#backup-file').setInputFiles({name:'atlas-protected.json',mimeType:'application/json',buffer:Buffer.from(content)});
  await page.locator('#unlock-backup-password').waitFor();
  await page.locator('#unlock-backup-password').fill('incorrect passphrase');
  await page.locator('[data-action="backup-unlock-confirm"]').click();
  await page.getByText('Could not unlock backup. Check its passphrase and file integrity.').first().waitFor();
  expect((await getState(page)).fieldNotes[key]==='New current notes','wrong passphrase does not alter saved progress');
  await page.locator('#unlock-backup-password').fill(password);
  await page.locator('[data-action="backup-unlock-confirm"]').click();
  await page.locator('.backup-preview-grid').waitFor();
  expect((await getState(page)).fieldNotes[key]==='New current notes','correct passphrase still requires restore confirmation');
  await page.locator('[data-action="backup-confirm"]').click();
  await page.waitForFunction(key=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')).fieldNotes?.[key]==='Secret sunrise study notes',key);
  expect((await getState(page)).fieldNotes[key]==='Secret sunrise study notes','confirmed restore recovers encrypted progress');
 });

 await smoke('offline-practice-exam',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/exam',{waitUntil:'domcontentloaded'});
  await page.locator('#exam-course').selectOption('psychology');
  await page.locator('#exam-size').selectOption('5');
  await page.locator('[data-action="exam-start"]').click();
  await page.locator('.exam-options').waitFor();
  let state=await getState(page);
  expect(state.exam.ids.length===5,'exam creates the requested number of questions');
  expect(state.exam.ids.every(id=>id.startsWith('psychology:')),'subject-scoped exam contains only chosen course');
  const [firstCourse,firstLesson]=state.exam.ids[0].split(':');
  const firstQuiz=COURSES.find(c=>c.id===firstCourse).lessons.find(l=>l.id===firstLesson).quiz;
  const wrongChoice=(firstQuiz.correct+1)%firstQuiz.options.length;
  await page.locator('.exam-option[data-index="'+wrongChoice+'"]').click();
  await page.locator('.exam-explanation').waitFor();
  state=await getState(page);
  expect(Object.keys(state.exam.responses).length===1,'answers persist immediately');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.exam-explanation').waitFor();
  expect(Object.keys((await getState(page)).exam.responses).length===1,'answered question survives reload');
  for(let i=0;i<5;i++){
   if(i>0){await page.locator('.exam-option').first().click();await page.locator('.exam-explanation').waitFor();}
   await page.locator('[data-action="exam-next"]').click();
  }
  expect(await page.locator('.exam-review-item').count()===5,'final review shows each answer');
  state=await getState(page);
  expect(state.exam.position===5,'exam completed without losing session');
  expect(state.examHistory?.length===1,'completed practice exam is archived exactly once');
  expect(state.examHistory[0].missed.length>=1,'missed lesson is recorded without raw answers');
  expect(await page.locator('.exam-insights-focus-item').count()>=1,'missed topic appears as a study suggestion');
  expect(await page.locator('.exam-insights-subject').count()===1,'subject-level score reflects chosen psychology practice');
  expect(state.completed.length===0,'practice exam does not award lesson completions');
  await page.reload({waitUntil:'domcontentloaded'});
  expect(await page.locator('.exam-review-item').count()===5,'results remain after page reload');
  expect((await getState(page)).examHistory.length===1,'reloading result does not duplicate history');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'exam remains within mobile screen width');
  await page.locator('[data-action="exam-new"]').click();
  expect(await page.locator('#exam-course').count()===1,'completed exam can be restarted');
  expect((await getState(page)).examHistory.length===1,'new exam does not discard prior practice history');
  await page.locator('[data-action="exam-start"]').click();
  await page.locator('[data-action="exam-discard"]').click();
  await page.getByRole('button',{name:'Keep practicing'}).click();
  expect((await getState(page)).exam?.ids?.length>0,'cancelled discard preserves practice answers');
  await page.locator('[data-action="exam-discard"]').click();
  await page.locator('[data-action="exam-discard-confirm"]').click();
  expect((await getState(page)).exam===null,'confirmed discard clears only current exam');
  expect(await page.locator('#exam-course').count()===1,'learner can choose another exam after discard');
  await page.locator('#exam-focus-size').selectOption('5');
  await page.locator('[data-action="exam-focus-start"]').click();
  await page.locator('.exam-options').waitFor();
  let focusState=await getState(page);
  const previouslyMissed=new Set(focusState.examHistory.flatMap(record=>record.missed));
  expect(focusState.exam.ids.length>=1&&focusState.exam.ids.length<=5,'focused revision respects missed-question count and maximum');
  expect(focusState.exam.ids.every(key=>previouslyMissed.has(key)),'focused exam includes only previously missed lesson questions');
  expect(focusState.exam.ids.every(key=>!key.startsWith('shadow:')),'focused exam excludes mature-content questions');
  expect(focusState.completed.length===0,'focus mode does not award lesson completions');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.exam-options').waitFor();
  expect((await getState(page)).exam.ids.length===focusState.exam.ids.length,'focused revision survives reload');
  await page.locator('[data-action="exam-discard"]').click();
  await page.locator('[data-action="exam-discard-confirm"]').click();
  expect((await getState(page)).exam===null,'focus session can be discarded without erasing history');
  await page.locator('[data-action="exam-history-clear"]').click();
  await page.getByRole('button',{name:'Keep history'}).click();
  expect((await getState(page)).examHistory.length===1,'cancelling history clear preserves recorded scores');
  await page.locator('[data-action="exam-history-clear"]').click();
  await page.locator('[data-action="exam-history-clear-confirm"]').click();
  expect((await getState(page)).examHistory.length===0,'clearing history preserves the rest of the Atlas');
  expect(await page.locator('.exam-insights-empty').count()===1,'empty-state renders after clearing history');
 });


 await smoke('personal-study-card-workshop',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/personalcards',{waitUntil:'domcontentloaded'});
  await page.locator('.personal-cards-page').waitFor();
  expect(await page.locator('#personal-card-course option[value="shadow"]').count()===0,'mature courses are excluded from personal card subject selection');
  await page.locator('#personal-card-front').fill('Why use active recall?');
  await page.locator('#personal-card-back').fill('It practices retrieving ideas before looking at the answer.');
  await page.locator('#personal-card-course').selectOption('psychology');
  await page.locator('[data-action="personal-card-save"]').click();
  let state=await getState(page);
  expect(state.personalCards?.length===1,'new custom card saved locally');
  expect(state.personalCards[0].courseId==='psychology','card subject saved privately');
  await page.locator('[data-action="personal-card-reveal"]').click();
  expect(await page.locator('.personal-cards-answer').count()===1,'answer can be revealed');
  await page.locator('[data-action="personal-card-rate"][data-outcome="remembered"]').click();
  expect(await page.locator('.personal-cards-practice-empty').count()===1,'reviewed card no longer due immediately');
  state=await getState(page);
  expect(state.personalCards[0].review?.step===0,'remembered result schedules next review');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.personal-cards-page').waitFor();
  expect((await getState(page)).personalCards?.length===1,'custom card persists after reload');
  await page.locator('#personal-card-search').fill('active recall');
  expect(await page.locator('.personal-cards-list-item').count()===1,'card search finds matching question');
  await page.locator('.personal-cards-list-item [data-action="personal-card-edit"]').click();
  await page.locator('#personal-card-front').fill('Why retrieve before rereading?');
  await page.locator('[data-action="personal-card-save"]').click();
  state=await getState(page);
  expect(state.personalCards[0].review===null,'editing a question restarts its review schedule');
  expect(await page.locator('[data-action="personal-card-reveal"]').count()===1,'edited card returns to due queue');
  await page.locator('#personal-card-search').fill('');
  const backupEvent=page.waitForEvent('download');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  await page.locator('[data-action="export"]').click();
  const backup=await backupEvent,fs=await import('node:fs/promises');
  const exportText=await fs.readFile(await backup.path(),'utf8');
  expect(JSON.parse(exportText).state.personalCards?.length===1,'plain JSON backup contains custom study cards');
  await page.goto(BASE+'/#/personalcards',{waitUntil:'domcontentloaded'});
  await page.locator('.personal-cards-list-item [data-action="personal-card-delete"]').click();
  await page.getByRole('button',{name:'Keep card'}).click();
  expect((await getState(page)).personalCards?.length===1,'cancelled card deletion preserves data');
  await page.locator('.personal-cards-list-item [data-action="personal-card-delete"]').click();
  await page.locator('[data-action="personal-card-delete-confirm"]').click();
  expect((await getState(page)).personalCards?.length===0,'confirmed deletion removes card');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'study card interface fits mobile screen');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  await page.locator('#backup-file').setInputFiles({name:'personal-cards-backup.json',mimeType:'application/json',buffer:Buffer.from(exportText)});
  await page.locator('.backup-preview-grid').waitFor();
  await page.locator('[data-action="backup-confirm"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')).personalCards?.length===1);
  expect((await getState(page)).personalCards[0].front==='Why retrieve before rereading?','confirmed backup restore recovers private flashcards');
 });


 await smoke('mastery-course-level-filters',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/course/laws',{waitUntil:'domcontentloaded'});
  await page.locator('.course-page').waitFor();
  const original=await page.locator('.lesson-row').count();
  expect(original>=7,'Philippine law library includes earlier and mastery lessons');
  await page.locator('[data-action="course-stage-filter"][data-id="Advanced"]').click();
  const advanced=await page.locator('.lesson-row').count();
  expect(advanced>=3&&advanced<original,'Advanced filter narrows the curriculum');
  expect(await page.locator('.course-stage-button[data-id="Advanced"]').getAttribute('aria-pressed')==='true','level selection announces pressed state');
  const stages=await page.locator('.lesson-row .lesson-info small').allTextContents();
  expect(stages.every(t=>t.includes('Advanced')),'advanced filter hides beginner and intermediate lessons');
  await page.locator('[data-action="open-lesson"][data-lesson="privacy-access-request-ph"]').click();
  await waitRoute(page,'#/lesson/laws/privacy-access-request-ph');
  await page.locator('.reading-page .lesson-content .worked-example').waitFor();
  expect(await page.locator('.reading-page .lesson-content .worked-example').count()===1,'new advanced lesson includes a worked example');
  expect(await page.locator('.lesson-sources a[href*="privacy.gov.ph"]').count()>=1,'primary-source reference is linked in lesson');
  await page.locator('.reading-page .subnav [data-action="open-course"]').click();
  expect(await page.locator('.course-stage-button[data-id="Advanced"]').getAttribute('aria-pressed')==='true','level filter remains selected when returning from a lesson');
  await page.locator('[data-action="course-stage-filter"][data-id="all"]').click();
  expect(await page.locator('.lesson-row').count()===original,'All levels restores full course list');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'course stage filters do not cause mobile horizontal overflow');
 });


 await smoke('offline-language-challenge',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('.language-challenge').waitFor();
  await page.locator('#language-select').selectOption('ja');
  await page.locator('#language-challenge-mode').selectOption('recognition');
  await page.locator('[data-action="challenge-start"]').click();
  await page.locator('.language-challenge-options').waitFor();
  let state=await getState(page);
  expect(state.languageChallenge.code==='ja'&&state.languageChallenge.ids.length===8,'eight questions use Japanese authored phrase pack');
  await page.locator('.language-challenge-choice').first().click();
  await page.locator('.language-challenge-feedback').waitFor();
  state=await getState(page);
  expect(Object.keys(state.languageChallenge.answers).length===1,'challenge answer saves immediately');
  expect(Object.keys(state.phrases||{}).length===0,'challenge does not automatically mark learned phrases');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.language-challenge-feedback').waitFor();
  expect(Object.keys((await getState(page)).languageChallenge.answers).length===1,'answered challenge resumes after reload');
  for(let i=0;i<8;i++){
   if(i>0){await page.locator('.language-challenge-choice').first().click();await page.locator('.language-challenge-feedback').waitFor();}
   await page.locator('[data-action="challenge-next"]').click();
  }
  expect(await page.locator('.language-challenge-review article').count()===8,'completed challenge includes every answer review');
  state=await getState(page);
  expect(state.languageChallenge.position===8,'challenge session reaches final question');
  expect(state.languageChallengeHistory.ja.attempts===1,'completion records one practice attempt');
  expect(state.completed.length===0,'challenge leaves course completion unchanged');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).languageChallengeHistory.ja.attempts===1,'score history survives reload');
  await page.locator('[data-action="challenge-new"]').click();
  await page.locator('#language-challenge-mode').selectOption('meaning');
  await page.locator('[data-action="challenge-start"]').click();
  await page.locator('.language-challenge-question h3[lang="ja-JP"]').waitFor();
  await page.locator('.language-challenge-choice').first().click();
  await page.locator('#language-select').selectOption('ko');
  expect(await page.locator('[data-action="challenge-resume"]').count()===1,'incomplete other-language session can be resumed');
  await page.locator('[data-action="challenge-resume"]').click();
  expect((await getState(page)).language==='ja','resume returns to original language');
  await page.locator('.language-challenge-feedback').waitFor();
  await page.locator('[data-action="challenge-discard"]').click();
  await page.getByRole('button',{name:'Keep practicing'}).click();
  expect((await getState(page)).languageChallenge!==null,'cancelling discard preserves session');
  await page.locator('[data-action="challenge-discard"]').click();
  await page.locator('[data-action="challenge-discard-confirm"]').click();
  state=await getState(page);
  expect(state.languageChallenge===null,'confirmed discard removes only active challenge');
  expect(state.languageChallengeHistory.ja.attempts===1,'discard preserves completed score history');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'challenge interface remains within narrow mobile viewport');
 });


 await smoke('applied-capstone-labs',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/course/laws',{waitUntil:'domcontentloaded'});
  await page.locator('.course-page').waitFor();
  expect(await page.locator('[data-action="open-lesson"][data-lesson="case-ph-data-access"]').count()===1,'Philippine privacy capstone is listed in the course');
  expect((await page.locator('[data-action="open-lesson"][data-lesson="case-ph-data-access"] small').textContent()).includes('Applied lab'),'course list identifies capstone status');
  await page.locator('[data-action="open-lesson"][data-lesson="case-ph-data-access"]').click();
  await page.locator('.capstone-rubric li').first().waitFor();
  expect(await page.locator('.reading-head .overline').textContent().then(x=>x.includes('APPLIED CAPSTONE')),'reader clearly labels the applied capstone');
  expect(await page.locator('.capstone-rubric li').count()===3,'three evidence criteria guide the learner');
  expect((await page.locator('.capstone-rubric').textContent()).includes('not an automatically graded assessment'),'self-check is not represented as automated grading');
  expect(await page.locator('.lesson-content .worked-example').count()===1,'case lab has a worked example');
  expect(await page.locator('.lesson-content .lesson-sources a[href*="privacy.gov.ph"]').count()===1,'case law lesson links to official NPC guidance');
  expect(await page.locator('input[data-capstone-check]').count()===3,'capstone self-review has three accessible checkboxes');
  expect((await page.locator('#capstone-check-status').textContent()).includes('0 of 3'),'capstone starts with no self-reported checks');
  await page.locator('input[data-capstone-check]').nth(0).check();
  await page.locator('input[data-capstone-check]').nth(2).check();
  expect((await getState(page)).capstoneChecks['laws:case-ph-data-access'].filter(Boolean).length===2,'two rubric checks persist locally');
  expect((await getState(page)).completed.length===0,'self-reported checks do not award lesson completion');
  expect((await page.locator('#capstone-check-status').textContent()).includes('2 of 3'),'progress counter updates without a reload');
  await page.locator('#field-note-input').fill('Fictional request: verify the privacy office; ask only about my own stored profile fields.');
  const correct=COURSES.find(c=>c.id==='laws').lessons.find(l=>l.id==='case-ph-data-access').quiz.correct;
  await page.locator('.quiz-option[data-index="'+correct+'"]').click();
  expect(await page.locator('.quiz-feedback.good').count()===1,'applied case quiz evaluates correctly');
  await page.locator('[data-action="complete"]').click();
  expect((await getState(page)).completed.length===1,'completed case lab is saved like other lessons');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.capstone-rubric li').first().waitFor();
  expect(await page.locator('.capstone-rubric li').count()===3,'rubric survives a refresh');
  expect(await page.locator('input[data-capstone-check]:checked').count()===2,'self-reviewed criteria survive a browser refresh');
  await page.locator('[data-action="capstone-checks-clear"]').click();
  expect((await getState(page)).capstoneChecks['laws:case-ph-data-access']===undefined,'reset clears only that rubric');
  expect((await getState(page)).completed.length===1,'resetting checks does not undo lesson completion');
  expect((await page.locator('#field-note-input').inputValue()).includes('Fictional request'),'resetting checks does not delete exercise notes');
  expect((await page.locator('#field-note-input').inputValue()).includes('Fictional request'),'capstone exercise notes persist after reload');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'capstone rubric fits narrow mobile screens');
  await page.goto(BASE+'/#/lesson/digital/case-account-takeover-drill',{waitUntil:'domcontentloaded'});
  await page.locator('.capstone-rubric li').first().waitFor();
  expect(await page.locator('.lesson-sources a[href*="nist.gov"]').count()===1,'security case points to NIST authentication guidance');
  expect(await page.locator('.capstone-rubric li').count()===3,'security lab has subject-specific review criteria');
  await page.locator('input[data-capstone-check]').nth(1).check();
  expect((await getState(page)).capstoneChecks['digital:case-account-takeover-drill'][1]===true,'independent capstone saves only its own rubric');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  const downloadEvent=page.waitForEvent('download');
  await page.locator('[data-action="export"]').click();
  const download=await downloadEvent;
  const fs=await import('node:fs/promises');
  const backup=await fs.readFile(await download.path(),'utf8');
  expect(JSON.parse(backup).state.capstoneChecks['digital:case-account-takeover-drill'][1]===true,'backup export includes self-review progress');
  await page.goto(BASE+'/#/lesson/digital/case-account-takeover-drill',{waitUntil:'domcontentloaded'});
  await page.locator('input[data-capstone-check]').nth(1).uncheck();
  expect((await getState(page)).capstoneChecks['digital:case-account-takeover-drill']===undefined,'manual uncheck removes blank rubric record');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  await page.locator('#backup-file').setInputFiles({name:'capstone-checks-backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await page.locator('.backup-preview-grid').waitFor();
  await page.locator('[data-action="backup-confirm"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')||'{}').capstoneChecks?.['digital:case-account-takeover-drill']?.[1]===true);
  expect((await getState(page)).capstoneChecks['digital:case-account-takeover-drill'][1]===true,'confirmed restore recovers rubric checks');
 });


 await smoke('offline-spaced-phrase-recall',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('.phrase-review-section').waitFor();
  await page.locator('#language-select').selectOption('es');
  expect((await page.locator('.phrase-review-count').textContent()).includes('8 due'),'all eight new Spanish phrases start due');
  expect(await page.locator('.phrase-review-answer').count()===0,'answer is initially hidden');
  await page.locator('[data-action="phrase-review-reveal"]').click();
  await page.locator('.phrase-review-answer').waitFor();
  expect((await page.locator('.phrase-review-answer').textContent()).includes('Hola'),'first Spanish translation is correct');
  await page.locator('[data-action="phrase-review-rate"][data-outcome="remembered"]').click();
  let state=await getState(page);
  expect(state.phraseReviews['es:1'].step===0,'remembered phrase is scheduled for tomorrow');
  expect((state.phrases.es||[]).length===0,'self-rated review does not silently mark phrase learned');
  expect((await page.locator('.phrase-review-count').textContent()).includes('7 due'),'scheduled phrase exits current due queue');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.phrase-review-section').waitFor();
  expect((await getState(page)).phraseReviews['es:1'].step===0,'review schedule survives refresh');
  await page.locator('#language-select').selectOption('ko');
  expect((await page.locator('.phrase-review-count').textContent()).includes('8 due'),'Korean has its own independent review queue');
  await page.locator('[data-action="phrase-review-reveal"]').click();
  await page.locator('[data-action="phrase-review-rate"][data-outcome="again"]').click();
  state=await getState(page);
  expect(state.phraseReviews['ko:1'].step===-1,'forgotten Korean phrase is scheduled for a ten-minute retry');
  expect((await page.locator('.phrase-review-count').textContent()).includes('7 due'),'ten-minute retry is not immediately counted due');
  await page.locator('#language-select').selectOption('es');
  expect((await page.locator('.phrase-review-count').textContent()).includes('7 due'),'Spanish schedule remains unchanged after language switch');
  await page.locator('[data-action="phrase-review-reset"]').click();
  await page.getByRole('button',{name:'Keep my reviews'}).click();
  expect((await getState(page)).phraseReviews['es:1'].step===0,'cancel preserves saved review');
  const downloadEvent=page.waitForEvent('download');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  await page.locator('[data-action="export"]').click();
  const savedFile=await downloadEvent,fs=await import('node:fs/promises');
  const backup=await fs.readFile(await savedFile.path(),'utf8');
  expect(JSON.parse(backup).state.phraseReviews['es:1'].step===0,'phrase schedule is included in the offline JSON backup');
  expect(JSON.parse(backup).state.phraseReviews['ko:1'].step===-1,'both language schedules transfer in backups');
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('[data-action="phrase-review-reset"]').click();
  await page.locator('[data-action="phrase-review-reset-confirm"]').click();
  state=await getState(page);
  expect(state.phraseReviews['es:1']===undefined,'confirmed reset clears selected language review schedule');
  expect(state.phraseReviews['ko:1'].step===-1,'reset does not erase another language review');
  expect((await page.locator('.phrase-review-count').textContent()).includes('8 due'),'cleared phrases become due again');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  await page.locator('#backup-file').setInputFiles({name:'phrase-review-backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await page.locator('.backup-preview-grid').waitFor();
  await page.locator('[data-action="backup-confirm"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')||'{}').phraseReviews?.['es:1']?.step===0);
  expect((await getState(page)).phraseReviews['ko:1'].step===-1,'restoring backup recovers independent phrase schedules');
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'phrase review interface fits mobile viewport');
 });


 await smoke('manual-offline-update-lifecycle',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.goto(BASE+'/#/offline',{waitUntil:'domcontentloaded'});
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.offline-library-page').waitFor();
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  const swFile='dist/sw.js',oldSource=await readFile(swFile,'utf8');
  const match=oldSource.match(/CACHE_PREFIX \+ 'v(\d+)'/);
  expect(Boolean(match),'test can identify active offline cache version');
  const original='xyra-atlas-v'+match[1],replacement='xyra-atlas-v'+(Number(match[1])+1);
  const status=async()=>{
   return page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.getRegistration(),worker=registration?.active;
    if(!worker)return null;
    return new Promise((resolve,reject)=>{
     const channel=new MessageChannel();
     const timeout=setTimeout(()=>reject(Error('Offline status timeout')),7000);
     channel.port1.onmessage=e=>{clearTimeout(timeout);channel.port1.close();resolve(e.data);};
     worker.postMessage({type:'ATLAS_OFFLINE_STATUS'},[channel.port2]);
    });
   });
  };
  try{
   const nextSource=oldSource.replace("CACHE_PREFIX + 'v"+match[1]+"'", "CACHE_PREFIX + 'v"+(Number(match[1])+1)+"'");
   expect(nextSource!==oldSource,'test generates a new service-worker script');
   await writeFile(swFile,nextSource);
   await page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.getRegistration();
    await registration.update();
   });
   await page.waitForFunction(async()=>{
    const registration=await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.waiting&&navigator.serviceWorker.controller);
   },{},{timeout:25000});
   await page.locator('.offline-update-ready').waitFor();
   expect((await status()).version===original,'active release remains unchanged while update waits');
   expect(await page.locator('.update-ready-topbar').count()===1,'mobile toolbar indicates available update');
   expect((await page.locator('.offline-update-ready').textContent()).includes('Apply update'),'update needs explicit user consent');
   await context.setOffline(true);
   await page.locator('[data-action="offline-apply-update"]').click();
   await page.waitForFunction(async expected=>{
    const registration=await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.active&&!registration.waiting&&navigator.serviceWorker.controller&&document.querySelector('.offline-library-page'));
   },replacement,{timeout:25000});
   await page.locator('.offline-library-page').waitFor();
   const final=await status();
   expect(final?.version===replacement,'approved update activated using already cached offline assets');
   expect(final?.ready===true,'new release remains complete while fully offline');
   expect(await page.locator('.offline-update-ready').count()===0,'update notice closes after activation');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,'update notification and offline manager fit mobile');
  }finally{
   await context.setOffline(false);
   await writeFile(swFile,oldSource);
  }
 });


 await smoke('cinematic-worlds-desktop',{viewport:{width:1365,height:900}},async(page)=>{
  await page.locator('.home-page .hero-archive>img').waitFor();
  expect(await page.locator('.hero-archive [data-action="goto-explore"]').count()===1,'Archive Gate offers a real learning navigation action');
  for(const selector of ['.hero-archive>img','.atlas-scene-card img:nth-child(1)']){
   const imgs=page.locator(selector),n=await imgs.count();
   for(let i=0;i<n;i++){
    const img=imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    const dimensions=await img.evaluate(async el=>{await el.decode();return [el.naturalWidth,el.naturalHeight];});
    expect(dimensions[0]===1400&&dimensions[1]===700,'cinematic SVG actually renders in Chromium');
   }
  }
  expect(await page.locator('.atlas-scene-card').count()===2,'both supporting illustrated worlds render');
  await page.screenshot({path:snapshots+'/atlas-cinematic-desktop.png',fullPage:true});
  await page.locator('.atlas-scene-card [data-action="open-corner"]').click();
  await waitRoute(page,'#/mentor');
  await page.locator('.mentor-page').waitFor();
  expect(await page.locator('.mentor-page').count()===1,'Lantern Library opens Xyra’s Corner');
  await page.goto(BASE+'/#/home',{waitUntil:'domcontentloaded'});
  await page.locator('.atlas-scene-card [data-action="map"]').click();
  await waitRoute(page,'#/map');
  await page.locator('.atlas-map-page').waitFor();
  expect(await page.locator('.atlas-map-page').count()===1,'Starlit Garden opens the real knowledge map');
  await page.goto(BASE+'/#/home',{waitUntil:'domcontentloaded'});
  await page.locator('.hero-archive [data-action="goto-explore"]').click();
  await waitRoute(page,'#/explore');
  await page.locator('#course-search').waitFor();
  expect(await page.locator('#course-search').count()===1,'Archive Gate CTA opens the subject library');
 });
 await smoke('cinematic-worlds-mobile-offline',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.goto(BASE+'/#/home',{waitUntil:'domcontentloaded'});
  await page.locator('.hero-archive img').waitFor();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  for(const selector of ['.hero-archive>img','.atlas-scene-card img']){
   const imgs=page.locator(selector);
   for(let i=0;i<await imgs.count();i++){
    await imgs.nth(i).scrollIntoViewIfNeeded();
    const loaded=await imgs.nth(i).evaluate(async img=>{await img.decode();return img.naturalWidth===1400});
    expect(loaded,'illustrated world loads on a mobile-sized viewport');
   }
  }
  let overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'cinematic home and scene cards do not overflow mobile viewport');
  await page.screenshot({path:snapshots+'/atlas-cinematic-mobile.png',fullPage:true});
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.hero-archive').waitFor();
  for(const selector of ['.hero-archive>img','.atlas-scene-card img']){
   const imgs=page.locator(selector);
   for(let i=0;i<await imgs.count();i++){
    await imgs.nth(i).scrollIntoViewIfNeeded();
    const dimensions=await imgs.nth(i).evaluate(async img=>{await img.decode();return [img.naturalWidth,img.naturalHeight]});
    expect(dimensions[0]===1400&&dimensions[1]===700,'original Atlas scenes remain available with no internet');
   }
  }
  await page.locator('.hero-archive [data-action="goto-explore"]').click();
  await waitRoute(page,'#/explore');
  await page.locator('#course-search').waitFor();
  expect(await page.locator('#course-search').count()===1,'cinematic navigation works offline');
  overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'offline navigation fits mobile viewport');
  await context.setOffline(false);
 });


 await smoke('illustrated-case-chapters',{viewport:{width:1365,height:900}},async(page)=>{
  const cases=[
   ['laws','case-ph-data-access','chapter-privacy-observatory.svg','The Privacy Observatory'],
   ['digital','case-account-takeover-drill','chapter-security-sanctum.svg','The Security Sanctum'],
   ['business','case-pilot-unit-economics','chapter-business-atelier.svg','The Maker’s Atelier'],
   ['science','case-study-causality','chapter-science-glasshouse.svg','The Research Glasshouse'],
   ["psychology","case-ambiguity-audit","chapter-interpretation-crossroads.svg","The Interpretation Crossroads"],
   ["savings","case-three-month-cash","chapter-cash-weatherhouse.svg","The Cash Weatherhouse"],
   ["time","case-dependency-release","chapter-clockwork-schedule.svg","The Clockwork Workshop"],
   ["languages","case-restaurant-dialogue","chapter-language-teahouse.svg","The Lantern Teahouse"],
   ["communication","case-repair-feedback","chapter-feedback-bridge.svg","The Listening Bridge"],
   ["thinking","case-viral-number-audit","chapter-evidence-prism.svg","The Evidence Prism"],
   ["career","case-project-evidence","chapter-portfolio-forge.svg","The Portfolio Forge"],
   ["relationships","case-boundary-repair","chapter-boundary-garden.svg","The Boundary Garden"],
   ["negotiation","case-three-offers","chapter-offer-market.svg","The Fair Exchange Market"]
  ];
  for(const [course,lesson,file,title] of cases){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   const art=page.locator('.chapter-art-feature img');
   await art.waitFor();
   expect(await art.getAttribute('src')==='/assets/'+file,'illustrated case opens its correct scene: '+course);
   const image=await art.evaluate(async img=>{await img.decode();return {w:img.naturalWidth,h:img.naturalHeight,alt:img.alt};});
   expect(image.w===1400&&image.h===700,'chapter art decodes at its native aspect ratio');
   expect(image.alt.length>=75,'chapter art has meaningful descriptive alt text');
   expect((await page.locator('.chapter-art-caption strong').textContent())===title,'chapter illustration includes a grounded caption');
   expect(await page.locator('.lesson-content .worked-example').count()===1,'chapter art does not displace learning material');
  }
  // Mature content must remain gated even when its decorative illustration is pre-cached.
  await page.goto(BASE+'/#/lesson/shadow/case-pressure-defenses',{waitUntil:'domcontentloaded'});
  await page.getByText('Enter the Shadow Library?').waitFor();
  expect(await page.locator('.chapter-art-feature').count()===0,'mature chapter cannot render before acknowledgment');
  await page.locator('#age-agree').check();
  await page.locator('[data-action="enter-shadow"]').click();
  await waitRoute(page,'#/course/shadow');
  await page.locator('[data-action="open-lesson"][data-lesson="case-pressure-defenses"]').click();
  await page.locator('.chapter-art-feature img').waitFor();
  const gatedArt=page.locator('.chapter-art-feature img');
  expect(await gatedArt.getAttribute('src')==='/assets/chapter-protective-lantern.svg','acknowledged mature chapter receives protective artwork');
  expect(await gatedArt.evaluate(async img=>{await img.decode();return img.naturalWidth===1400}),'mature chapter image decodes after gate');
  await page.goto(BASE+'/#/lesson/psychology/thoughts',{waitUntil:'domcontentloaded'});
  await page.locator('.reading-illustration img').waitFor();
  expect(await page.locator('.chapter-art-feature').count()===0,'other lessons retain their existing artwork');
  expect(await page.locator('.reading-illustration img').getAttribute('src')==='/assets/course-psychology.svg','normal reader art fallback is unchanged');
  await page.goto(BASE+'/#/lesson/laws/case-ph-data-access',{waitUntil:'domcontentloaded'});
  await page.locator('.chapter-art-feature').waitFor();
  await page.screenshot({path:snapshots+'/chapter-art-desktop.png',fullPage:true});
 });
 await smoke('illustrated-case-chapters-mobile-offline',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.goto(BASE+'/#/lesson/laws/case-ph-data-access',{waitUntil:'domcontentloaded'});
  await page.locator('.chapter-art-feature').waitFor();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  for(const [course,lesson] of [
   ['laws','case-ph-data-access'],['digital','case-account-takeover-drill'],
   ['business','case-pilot-unit-economics'],['science','case-study-causality'],
   ["psychology","case-ambiguity-audit"],
   ["savings","case-three-month-cash"],
   ["time","case-dependency-release"],
   ["languages","case-restaurant-dialogue"],
   ["communication","case-repair-feedback"],
   ["thinking","case-viral-number-audit"],
   ["career","case-project-evidence"],
   ["relationships","case-boundary-repair"],
   ["negotiation","case-three-offers"]
  ]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   const img=page.locator('.chapter-art-feature img');
   await img.waitFor();
   await img.scrollIntoViewIfNeeded();
   expect(await img.evaluate(async el=>{await el.decode();return el.naturalWidth===1400&&el.naturalHeight===700}),'dedicated chapter artwork remains available offline for '+course);
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,'chapter illustration and caption fit narrow mobile layout');
  }
  await page.screenshot({path:snapshots+'/chapter-art-mobile-offline.png',fullPage:true});
  await context.setOffline(false);
 });


 await smoke('offline-situational-conversation-quests',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('.conversation-quest').waitFor();
  await page.locator('#language-select').selectOption('es');
  expect(await page.locator('.conversation-quest-scenarios article').count()===3,'three contextual situations are available in Spanish');
  await page.locator('#conversation-quest-select').selectOption('directions');
  await page.locator('[data-action="conversation-start"]').click();
  await page.locator('.conversation-quest-options').waitFor();
  let state=await getState(page);
  expect(state.conversationQuest.code==='es'&&state.conversationQuest.questId==='directions','new scenario saves language and selected context');
  await page.locator('.conversation-quest-option:not([data-id="3"])').first().click();
  await page.locator('.conversation-quest-feedback').waitFor();
  expect((await getState(page)).conversationQuest.answers[0]!=='3','first scene includes a meaningful incorrect option');
  expect(Object.keys((await getState(page)).phrases||{}).length===0,'context quiz never marks phrases learned');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.conversation-quest-feedback').waitFor();
  expect((await getState(page)).conversationQuest.position===0,'answered step survives refresh before advancing');
  await page.locator('[data-action="conversation-next"]').click();
  await page.locator('#language-select').selectOption('ko');
  expect(await page.locator('[data-action="conversation-resume"]').count()===1,'switching language safely pauses active conversation quest');
  await page.locator('[data-action="conversation-resume"]').click();
  expect((await getState(page)).language==='es','resume returns to original practice language');
  for(const id of ['5','6','4','2']){
   await page.locator('.conversation-quest-option[data-id="'+id+'"]').click();
   await page.locator('.conversation-quest-feedback').waitFor();
   await page.locator('[data-action="conversation-next"]').click();
  }
  await page.locator('.conversation-quest-review').waitFor();
  state=await getState(page);
  expect(state.conversationQuest.position===5,'all five situational cues have been answered');
  expect(state.conversationQuestHistory.es.directions.attempts===1,'completed quest stores one history entry');
  expect(state.conversationQuestHistory.es.directions.last===4,'history reflects the one deliberately missed step');
  expect(await page.locator('.conversation-quest-review article').count()===5,'all contextual answers appear for review');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).conversationQuestHistory.es.directions.attempts===1,'reload does not duplicate conversation scores');
  await page.locator('[data-action="conversation-new"]').click();
  await page.locator('#conversation-quest-select').selectOption('meeting');
  await page.locator('[data-action="conversation-start"]').click();
  await page.locator('.conversation-quest-options').waitFor();
  await page.locator('.conversation-quest-option[data-id="1"]').click();
  await page.locator('[data-action="conversation-discard"]').click();
  await page.getByRole('button',{name:'Keep practicing'}).click();
  expect((await getState(page)).conversationQuest!==null,'cancelled discard keeps unfinished situation');
  await page.locator('[data-action="conversation-discard"]').click();
  await page.locator('[data-action="conversation-discard-confirm"]').click();
  expect((await getState(page)).conversationQuest===null,'confirmed discard removes only the unfinished sequence');
  expect((await getState(page)).conversationQuestHistory.es.directions.attempts===1,'discard keeps completed results');
  await page.locator('#language-select').selectOption('fil');
  await page.locator('#conversation-quest-select').selectOption('market');
  await page.locator('[data-action="conversation-start"]').click();
  await page.locator('.conversation-quest-options').waitFor();
  const savedFilePromise=page.waitForEvent('download');
  await page.goto(BASE+'/#/you',{waitUntil:'domcontentloaded'});
  await page.locator('[data-action="export"]').click();
  const downloaded=await savedFilePromise,fs=await import('node:fs/promises');
  const backup=await fs.readFile(await downloaded.path(),'utf8');
  const snapshot=JSON.parse(backup).state;
  expect(snapshot.conversationQuest.code==='fil','backup includes an unfinished language context');
  expect(snapshot.conversationQuestHistory.es.directions.last===4,'backup includes completed history');
  await page.evaluate(()=>{
   const key='xyra-atlas-state-v1',state=JSON.parse(localStorage.getItem(key)||'{}');
   state.conversationQuest=null;state.conversationQuestHistory={};
   localStorage.setItem(key,JSON.stringify(state));
  });
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#backup-file').setInputFiles({name:'conversation-quest-backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
  await page.locator('.backup-preview-grid').waitFor();
  await page.locator('[data-action="backup-confirm"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('xyra-atlas-state-v1')||'{}').conversationQuest?.code==='fil');
  state=await getState(page);
  expect(state.conversationQuestHistory.es.directions.last===4,'restored backup recovers independent historical scores');
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'situational challenge fits narrow mobile viewport');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.conversation-quest-options').waitFor();
  expect((await getState(page)).conversationQuest.code==='fil','unfinished quest resumes without internet');
  await page.locator('.conversation-quest-option[data-id="1"]').click();
  await page.locator('.conversation-quest-feedback').waitFor();
  await context.setOffline(false);
 });


 await smoke('offline-local-voice-studio',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.addInitScript(()=>{
   const voices=[
    {lang:'ja-JP',name:'Japanese Local',voiceURI:'local-ja',localService:true},
    {lang:'es-ES',name:'Spanish Cloud',voiceURI:'remote-es',localService:false},
    {lang:'es-MX',name:'Spanish Regional Local',voiceURI:'local-es-mx',localService:true},
    {lang:'en-US',name:'English Local',voiceURI:'local-en',localService:true}
   ];
   const handlers=[];
   window.__atlasSpeech={voices,calls:[],cancelled:0,handlers};
   class StubUtterance{constructor(text){this.text=text;}}
   Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:StubUtterance});
   Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
    getVoices:()=>voices,
    cancel(){window.__atlasSpeech.cancelled++;},
    speak(u){window.__atlasSpeech.calls.push({text:u.text,lang:u.lang,rate:u.rate,uri:u.voice?.voiceURI});u.onstart?.();},
    addEventListener(type,fn){if(type==='voiceschanged')handlers.push(fn);}
   }});
  });
  // The smoke harness first opens '/' before this callback. A hash-only
  // navigation does not create a new document and cannot run addInitScript.
  // Reload deliberately so the installed-voice stub runs before app.js.
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#language-audio-controls').waitFor();
  expect((await page.locator('.language-audio-indicator').textContent()).includes('Local voice detected'),'Japanese local voice is detected');
  expect(await page.locator('#language-voice-picker option').count()===1,'only matching Japanese voice is offered');
  await page.locator('#language-audio-rate').selectOption('0.75');
  expect((await getState(page)).languageSpeechRate===.75,'playback rate persists as bounded profile setting');
  await page.locator('[data-action="language-speak"][data-id="1"]').first().click();
  let calls=await page.evaluate(()=>window.__atlasSpeech.calls);
  expect(calls.length===1&&calls[0].text==='こんにちは','actual authored Japanese phrase is used for local speech');
  expect(calls[0].uri==='local-ja'&&calls[0].lang==='ja-JP'&&calls[0].rate===.75,'speech uses the correct installed voice and selected rate');
  await page.locator('[data-action="language-audio-stop"]').click();
  expect((await page.locator('#language-voice-status').textContent()).includes('stopped'),'stop control gives confirmation');
  await page.locator('#language-select').selectOption('es');
  expect((await page.locator('.language-audio-indicator').textContent()).includes('Local voice detected'),'compatible regional local voice is offered');
  expect(await page.locator('#language-voice-picker option').count()===1,'network-backed Spanish voice is not offered');
  expect((await page.locator('.language-audio-panel').textContent()).includes('regional variant'),'regional accent difference is disclosed');
  await page.locator('[data-action="language-speak"][data-id="1"]').first().click();
  calls=await page.evaluate(()=>window.__atlasSpeech.calls);
  expect(calls.length===2&&calls[1].text==='Hola'&&calls[1].uri==='local-es-mx','Spanish uses local regional engine, never cloud');
  await page.locator('#language-select').selectOption('ko');
  expect((await page.locator('.language-audio-indicator').textContent()).includes('unavailable'),'unsupported Korean voice is disclosed');
  expect(await page.locator('#language-voice-picker').isDisabled(),'no unverified Korean voices can be selected');
  await page.locator('[data-action="phrase-reveal"]').click();
  expect(await page.locator('.phrase-card [data-action="language-speak"]').isEnabled(),'text practice controls remain accessible even without voice');
  await page.locator('.phrase-card [data-action="language-speak"]').click();
  calls=await page.evaluate(()=>window.__atlasSpeech.calls);
  expect(calls.length===2,'missing voice never falls back to wrong language or remote cloud');
  await page.locator('#language-select').selectOption('ja');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#language-audio-controls').waitFor();
  expect((await getState(page)).languageSpeechRate===.75,'rate setting survives reload');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#language-audio-controls').waitFor();
  await page.locator('[data-action="language-speak"][data-id="1"]').first().click();
  calls=await page.evaluate(()=>window.__atlasSpeech.calls);
  expect(calls.length===1&&calls[0].uri==='local-ja','mocked installed device voice remains selectable while website is offline');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'voice studio fits mobile layout');
  await context.setOffline(false);
 });

 await smoke('world-language-packs-mobile', {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  for(const code of ['ar','pt','hi','th','vi','id','ru','tr','nl','sv','el']){
   await page.locator('#language-select').selectOption(code);
   expect(await page.locator('.phrase-card h3').count()===1,code+' starter phrase renders');
   await page.locator('[data-action="phrase-reveal"]').click();
   expect((await page.locator('.phrase-answer').textContent()).trim().length>1,code+' has its own translation');
   expect(await page.locator('.phrase-answer').getAttribute('dir')==='auto',code+' target supports native text direction');
  }
  await page.locator('#language-select').selectOption('ar');
  expect((await page.locator('.language-region-note').textContent()).includes('Modern Standard Arabic'),'regional caution is visible');
  const width=await mobileOverflow(page);
  expect(width.scroll<=width.width+8,'right-to-left language page fits mobile: '+JSON.stringify(width));
  await page.locator('#conversation-quest-select').selectOption('meeting');
  await page.locator('[data-action="conversation-start"]').click();
  await page.locator('.conversation-quest-options').waitFor();
  expect((await getState(page)).conversationQuest.code==='ar','Arabic conversation sequence saves locally');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).conversationQuest.code==='ar','expanded language sequence resumes');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.conversation-quest-options').waitFor();
  expect((await page.locator('#language-select').inputValue())==='ar','Arabic practice is available offline');
  await context.setOffline(false);
 });


}finally{
 if(browser)await browser.close();
 server.kill('SIGTERM');
}
clearTimeout(watchdog);
if(failures)throw Error(failures+' browser smoke scenario(s) failed. Check screenshots and logs.');
console.log('\nAll real Chromium browser smoke scenarios passed.');
