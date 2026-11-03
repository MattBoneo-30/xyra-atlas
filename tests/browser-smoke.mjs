/** Actual Chromium PWA smoke tests for desktop and touch-sized viewports.
 * Installed only in CI; Playwright is NOT a production dependency. */
import { spawn } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

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
  expect(await page.locator('[data-action="casebook-open"]').count()===3,'Case Files catalogue renders');
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
}finally{
 if(browser)await browser.close();
 server.kill('SIGTERM');
}
clearTimeout(watchdog);
if(failures)throw Error(failures+' browser smoke scenario(s) failed. Check screenshots and logs.');
console.log('\nAll real Chromium browser smoke scenarios passed.');
