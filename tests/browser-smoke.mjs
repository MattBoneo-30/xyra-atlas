/** Actual Chromium PWA smoke tests for desktop and touch-sized viewports.
 * Installed only in CI; Playwright is NOT a production dependency. */
import { spawn } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import {COURSES} from '../data.js';
import {JAPANESE_UNITS} from '../japanesefoundation.js';

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
const JAPANESE_READING_PREREQUISITES=JAPANESE_UNITS
 .slice(0,JAPANESE_UNITS.findIndex(x=>x.id==='first-sentences')+1).map(x=>x.id);
async function prepareJapanesePhrasePractice(page){
 // A completed-learner fixture, not an app bypass: ensure existing advanced tools remain testable.
 await page.evaluate(ids=>{
  const key='xyra-atlas-state-v1';
  const state=JSON.parse(localStorage.getItem(key)||'{}');
  state.japaneseFoundationDone=ids;
  localStorage.setItem(key,JSON.stringify(state));
 },JAPANESE_READING_PREREQUISITES);
 await page.reload({waitUntil:'domcontentloaded'});
}
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
 await smoke('mobile-pwa-status-bar-safe-area', {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async page=>{
  // Browser emulators have no hardware notch: simulate the CSS safe-area inset.
  await page.evaluate(()=>document.documentElement.style.setProperty('--app-safe-top','47px'));
  const geometry=await page.evaluate(()=>{
   const bar=document.querySelector('.topbar');
   return {height:bar.getBoundingClientRect().height,padding:parseFloat(getComputedStyle(bar).paddingTop),innerTop:bar.querySelector('.topbar-inner').getBoundingClientRect().top,skipBottom:document.querySelector('.skip-link').getBoundingClientRect().bottom,overflow:document.documentElement.scrollWidth-window.innerWidth};
  });
  expect(Math.abs(geometry.height-117)<1 && geometry.padding===47,'standalone header reserves the simulated status-bar inset');
  expect(geometry.innerTop>=47 && geometry.skipBottom<=0,'header clears the status bar and unfocused skip link stays fully hidden');
  expect(geometry.overflow<=2,'safe-area header fits mobile viewport');
  await page.keyboard.press('Tab');
  const focusedSkip=await page.locator('#skip-content').boundingBox();
  expect(Boolean(focusedSkip)&&focusedSkip.y>=57,'keyboard-focused skip link appears below the status bar');
  await page.locator('.topbar [data-action="app-update-open"]').click();
  const modal=await page.locator('.modal-card').boundingBox();
  expect(Boolean(modal)&&modal.y>=59,'dialog clears the simulated status bar');
 });
 await smoke('all-subject-foundational-depth-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  const subjects=[
   ['psychology','thoughts','Psychology 101','manipulation'],
   ['laws','legal-basics','Philippine Law 101','Republic Act'],
   ['business','customer','Validate a customer','workaround'],
   ['savings','cashflow','Cash flow','₱28,000'],
   ['time','priorities','Priorities','bottleneck'],
   ['languages','realistic-week','languages','hiragana'],
   ['communication','listen','Listening','pressure'],
   ['thinking','evidence','Critical thinking','denominator'],
   ['digital','passwords','Digital security','authentication'],
   ['career','skills','Career skills','portfolio'],
   ['science','method','Science 101','hypothesis'],
   ['relationships','trust','Trust','coercive'],
   ['negotiation','persuasion','Influence','negotiation'],
   ['shadow','manipulation','Recognizing manipulation','hidden pressure']
  ];
  for(const [course,id,title,concept] of subjects){
   if(course==='shadow')continue; // Adult-gated route has separate access checks.
   await page.goto(BASE+'/#/lesson/'+course+'/'+id,{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect((await page.locator('.reading-head h1').textContent()).includes(title),course+' shows an honest introductory chapter');
   expect(await page.locator('.lesson-content>.deep-study-section').count()===5,course+' teaches five full conceptual sections');
   expect(await page.locator('.lesson-content>section[id^="lesson-section-"]').count()===3,course+' preserves the original three lesson sections');
   expect(await page.locator('.deep-worked-case').count()===1,course+' includes a detailed worked case');
   expect(await page.locator('.deep-study-assignment').count()===1,course+' includes a substantial independent exercise');
   expect(await page.locator('.learning-flow-track li').count()===4,course+' includes an actual concept reasoning map');
   expect((await page.locator('.lesson-content').textContent()).toLowerCase().includes(concept.toLowerCase()),course+' explains a meaningful concept');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' remains readable on a narrow screen');
  }
 });
 await smoke('intermediate-casework-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,id,term] of [['psychology','emotions','reappraisal'],['laws','consumer','RA 7394'],['science','probability','495']]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+id,{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect(await page.locator('.deep-study-section').count()===3,course+' teaches concepts before recap');
   expect(await page.locator('.deep-rubric li').count()===4,course+' has self-review criteria');
   expect((await page.locator('.lesson-content').textContent()).toLowerCase().includes(term.toLowerCase()),course+' presents domain knowledge');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' intermediate lesson fits mobile viewport');
  }
 });
 await smoke('advanced-reasoning-and-model-answers-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async(page,context)=>{
  for(const [course,id,term] of [
    ['thinking','base-rate-and-selection-bias',"Simpson's paradox"],
    ['science','observational-vs-experimental','Moon phases'],
    ['digital','passkey-and-recovery-map','WebAuthn'],
    ['laws','privacy-access-request-ph','RA 10173']
  ]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+id,{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect(await page.locator('.deep-study-section').count()===4,course+' has four explained advanced concepts');
   expect(await page.locator('.deep-rubric li').count()===4,course+' has four self-review criteria');
   expect(await page.locator('.worked-example').count()===2,course+' keeps the old and detailed examples');
   expect((await page.locator('.lesson-content').textContent()).includes(term),course+' teaches its unique discipline');
   const details=page.locator('.deep-model-answer');
   expect(await details.count()===1,course+' has one model response');
   expect(!(await details.evaluate(node=>node.open)),course+' does not reveal the model answer before practice');
   await details.locator('summary').focus();
   await page.keyboard.press('Enter');
   expect(await details.evaluate(node=>node.open),course+' makes the model response keyboard-revealable');
   expect((await details.locator('.deep-model-answer-content p').textContent()).length>350,'worked resolution is substantive');
   const size=await mobileOverflow(page);
   expect(size.scroll<=size.width+2,course+' advanced case fits narrow phones');
  }
  await page.evaluate(async()=>{await navigator.serviceWorker.ready});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  try{
   await page.reload({waitUntil:'domcontentloaded'});
   expect(await page.locator('.deep-model-answer').count()===1,'advanced answer remains readable offline');
   expect(await page.locator('.deep-study-section').count()===4,'advanced explanations remain available offline');
  }finally{await context.setOffline(false);}
 });
 await smoke('astronomy-and-republic-act-depth',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  await page.goto(BASE+'/#/lesson/science/astronomy-moon-eclipses',{waitUntil:'domcontentloaded'});
  await page.locator('.reading-page').waitFor();
  expect((await page.locator('.reading-head h1').textContent()).includes('Moon phases'),'astronomy lesson is reachable');
  expect(await page.locator('.lesson-content>section[id^="lesson-section-"]').count()>=5,'astronomy has full explanatory sections');
  expect(await page.locator('.learning-flow-track li').count()===4,'Moon lesson has a four-step causal flowchart');
  expect(await page.locator('.lesson-sources a[href*="science.nasa.gov"]').count()>=1,'astronomy cites NASA evidence');
  const spaceOverflow=await mobileOverflow(page);
  expect(spaceOverflow.scroll<=spaceOverflow.width+2,'astronomy lesson fits mobile viewport');
  await page.goto(BASE+'/#/lesson/laws/ph-ra10173-reading',{waitUntil:'domcontentloaded'});
  await page.locator('.reading-page').waitFor();
  expect((await page.locator('.reading-head h1').textContent()).includes('RA 10173'),'Republic Act lesson is reachable');
  expect((await page.locator('.lesson-content').textContent()).includes('Section 12'),'actual law provisions appear in the chapter');
  expect(await page.locator('.learning-flow-track li').count()===4,'law lesson teaches a reasoning process');
  expect(await page.locator('.lesson-sources a[href*="privacy.gov.ph"]').count()>=1,'law source links to National Privacy Commission');
  const lawOverflow=await mobileOverflow(page);
  expect(lawOverflow.scroll<=lawOverflow.width+2,'legal lesson fits mobile viewport');
 });
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
  await page.locator('.topbar [data-action="app-update-open"]').click();
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
  // Option rendering is shuffled; wait for the lesson before inspecting its canonical answer indices.
  await page.locator('.quiz-options .quiz-option').first().waitFor();
  const visualOrder=await page.locator('.quiz-options .quiz-option').evaluateAll(items=>items.map(el=>Number(el.dataset.index)));
  expect(visualOrder.length>=3&&visualOrder.every(Number.isInteger)&&
    new Set(visualOrder).size===visualOrder.length,'shuffled options preserve unique authored answer identities');
  await page.locator('.quiz-options .quiz-option[data-index="0"]').click();
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
  await page.locator('.course-stage-button[data-id="Advanced"]').click();
  const advanced=await page.locator('.lesson-row').count();
  expect(advanced>=3&&advanced<original,'Advanced filter narrows the curriculum');
  expect(await page.locator('.course-stage-button[data-id="Advanced"]').getAttribute('aria-pressed')==='true','level selection announces pressed state');
  const stages=await page.locator('.lesson-row .lesson-info small').allTextContents();
  expect(stages.every(t=>t.includes('Advanced')),'advanced filter hides beginner and intermediate lessons');
  await page.locator('[data-action="open-lesson"][data-lesson="privacy-access-request-ph"]').click();
  await waitRoute(page,'#/lesson/laws/privacy-access-request-ph');
  await page.locator('.reading-page .lesson-content .worked-example:not(.deep-worked-case)').waitFor();
  expect(await page.locator('.reading-page .lesson-content .worked-example:not(.deep-worked-case)').count()===1,'original advanced worked example is preserved');
  expect(await page.locator('.reading-page .lesson-content .deep-worked-case').count()===1,'advanced lesson adds its own detailed case');
  expect(await page.locator('.lesson-sources a[href*="privacy.gov.ph"]').count()>=1,'primary-source reference is linked in lesson');
  await page.locator('.reading-page .subnav [data-action="open-course"]').click();
  expect(await page.locator('.course-stage-button[data-id="Advanced"]').getAttribute('aria-pressed')==='true','level filter remains selected when returning from a lesson');
  await page.locator('[data-action="course-stage-filter"][data-id="all"]').click();
  expect(await page.locator('.lesson-row').count()===original,'All levels restores full course list');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'course stage filters do not cause mobile horizontal overflow');
 });


 await smoke('language-written-recall-mobile-offline',{viewport:{width:390,height:844}},async (page,context)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await prepareJapanesePhrasePractice(page);
  await page.locator('.phrase-card').waitFor();
  await page.locator('#language-select').selectOption('ja');
  const draft=page.locator('#phrase-draft');
  await draft.fill('こんにちは、テスト');
  expect(await draft.inputValue()==='こんにちは、テスト','Japanese script can be entered for private written recall');
  const storageBefore=await page.evaluate(()=>localStorage.getItem('xyra-atlas-state'));
  await page.locator('[data-action="phrase-reveal"]').click();
  expect(await page.locator('.phrase-recall-comparison p').textContent()==='こんにちは、テスト',
   'authored answer appears alongside the original written attempt');
  expect(await page.locator('.phrase-card .phrase-answer').count()===1,'translation remains available');
  expect(await page.evaluate(()=>localStorage.getItem('xyra-atlas-state'))===storageBefore,
    'written recall drafts never enter local learner progress');
  await page.locator('[data-action="phrase-next"]').click();
  expect(await page.locator('#phrase-draft').inputValue()==='','next phrase clears the previous writing');
  await page.locator('#phrase-draft').fill('<img src=x onerror=alert(1)>');
  await page.locator('[data-action="phrase-reveal"]').click();
  expect(await page.locator('.phrase-recall-comparison img').count()===0,
   'written recall is escaped text, not executable HTML');
  await page.locator('#language-select').selectOption('ko');
  expect(await page.locator('#phrase-draft').inputValue()==='','switching language clears the draft');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'written recall fits small screens');
  await page.evaluate(async()=>navigator.serviceWorker.ready);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  try{
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('#phrase-draft').fill('안녕하세요');
    await page.locator('[data-action="phrase-reveal"]').click();
    expect(await page.locator('.phrase-recall-comparison p').textContent()==='안녕하세요',
      'private writing and comparison work without internet');
  }finally{await context.setOffline(false);}
 });
 await smoke('offline-language-challenge',{viewport:{width:390,height:844}},async(page)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await prepareJapanesePhrasePractice(page);
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
  const missedButtons=page.locator('[data-action="language-review-missed"][data-review-source="challenge"]');
  const missedIds=state.languageChallenge.ids.filter(qid=>state.languageChallenge.answers[qid]!==qid);
  expect(await missedButtons.count()===missedIds.length+(missedIds.length?1:0),'only missed answers offer individual retry actions');
  if(missedIds.length){
   const beforeHistory=JSON.stringify(state.languageChallengeHistory);
   await missedButtons.first().click();
   expect(await page.locator('#phrase-draft').count()===1,'review opens the private written-recall editor');
   expect(await page.locator('#phrase-draft').evaluate(el=>document.activeElement===el),'retry focuses the answer field');
   expect(JSON.stringify((await getState(page)).languageChallengeHistory)===beforeHistory,'retry preserves challenge history');
   expect((await page.locator('.phrase-focus-session').textContent()).includes('1 of '+missedIds.length+' phrases'),
    'a challenge creates a guided queue of genuinely missed phrases');
   await page.locator('[data-action="phrase-reveal"]').click();
   await page.locator('.phrase-self-check [data-outcome="retry"]').click();
   expect((await page.locator('.phrase-focus-session').textContent()).includes('1 need practice'),
    'learner can self-report needing more practice');
   expect(JSON.stringify((await getState(page)).languageChallengeHistory)===beforeHistory,
    'self-check does not alter the challenge score');
   if(missedIds.length>1){
    await page.locator('[data-action="focused-phrase-next"]').click();
    expect((await page.locator('.phrase-focus-session').textContent()).includes('2 of '+missedIds.length+' phrases'),
     'next missed advances through the focused queue');
    await page.locator('[data-action="focused-phrase-prev"]').click();
    expect((await page.locator('.phrase-focus-session').textContent()).includes('1 of '+missedIds.length+' phrases'),
     'previous missed returns to the earlier question');
    await page.locator('[data-action="focused-phrase-next"]').click();
    for(let i=2;i<missedIds.length;i++)await page.locator('[data-action="focused-phrase-next"]').click();
   }
   await page.locator('[data-action="focused-phrase-next"]').click();
   expect(await page.locator('.phrase-focus-session').count()===0,'finishing focused recall restores ordinary phrase practice');
   expect((await page.locator('.phrase-focus-summary').textContent()).includes('1 to revisit'),
    'a final self-check summary is visible without claiming automated fluency assessment');
   await page.locator('[data-action="focused-phrase-retry"]').click();
   expect((await page.locator('.phrase-focus-session').textContent()).includes('1 of 1 phrases'),
    'learner can retry only self-reported difficult phrases');
   await page.locator('[data-action="focused-phrase-exit"]').click();
   expect(await page.locator('.phrase-focus-session').count()===0,'exit returns to ordinary phrase practice');
   expect(JSON.stringify((await getState(page)).languageChallengeHistory)===beforeHistory,'focused review never rewrites scores');
  }
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
  await page.locator('#language-select').selectOption('es');
  await page.locator('.phrase-review-section').waitFor();
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


 await smoke('pwa-update-controls',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  expect(await page.locator('.app-update-topbar').count()===1,'mobile toolbar offers a permanent refresh action');
  await page.locator('.app-update-topbar').click();
  await page.locator('.modal-card').waitFor();
  expect((await page.locator('.modal-card').textContent()).includes('Keep Atlas fresh.'),'refresh opens the in-app update manager');
  expect(await page.locator('.modal-card [data-action="app-reload"]').count()===1,'manual reload is available without uninstalling');
  await page.locator('.modal-close').click();
  await page.locator('.bottom-nav [data-action="nav"][data-id="you"]').click();
  await waitRoute(page,'#/you');
  await page.locator('.you-page [data-action="app-update-open"]').waitFor();
  expect(await page.locator('.you-page [data-action="app-update-open"]').count()===1,'your space offers a visible update shortcut');
  await page.locator('.you-page [data-action="app-update-open"]').click();
  expect(await page.locator('.modal-card [data-action="app-reload"]').count()===1,'settings reaches the same update dialog');
  await page.locator('.modal-close').click();
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+2,'app-update controls fit the mobile viewport');
 });

 await smoke('advanced-practical-studios-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,lesson] of [['psychology','calibrate-beliefs'],['business','contribution-margin-scenario'],['science','observational-vs-experimental']]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('.practical-studio').waitFor();
   expect(await page.locator('.practical-studio-round').count()===2,course+' has two applied rounds');
   expect(await page.locator('.practical-studio-model').count()===2,course+' has model responses for both rounds');
   expect(await page.locator('.practical-studio-rubric li').count()===4,course+' provides a self-review rubric');
   expect(await page.locator('.chapter-map-studio').count()===1,course+' exposes a chapter navigation jump');
   const before=await getState(page);
   const answer=page.locator('.practical-studio-model').first();
   expect(await answer.evaluate(el=>el.open)===false,course+' conceals the worked example by default');
   await page.locator('.chapter-map-studio').click();
   expect(await page.locator('#practical-studio').evaluate(el=>document.activeElement===el),course+' chapter jump restores focus');
   await answer.locator('summary').click();
   expect(await answer.evaluate(el=>el.open)===true,course+' model is revealed by learner action');
   const after=await getState(page);
   expect(JSON.stringify(before.completed||[])===JSON.stringify(after.completed||[]),course+' reading the model does not complete a lesson');
   expect(JSON.stringify(before.answers||{})===JSON.stringify(after.answers||{}),course+' reading the model does not change graded quizzes');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' studio fits mobile width');
  }
 });
 await smoke('advanced-evidence-inquiries-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,lesson] of [
   ['psychology','calibrate-beliefs'],
   ['business','contribution-margin-scenario'],
   ['science','observational-vs-experimental']
  ]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('.evidence-inquiry').waitFor();
   expect(await page.locator('.evidence-exhibits li').count()===3,course+' has three inspectable evidence exhibits');
   expect(await page.locator('.evidence-inquiry-review li').count()===4,course+' has four review criteria');
   expect(await page.locator('.chapter-map-inquiry').count()===1,course+' exposes a chapter link');
   const solution=page.locator('.evidence-inquiry-solution');
   expect(await solution.evaluate(el=>el.open)===false,course+' worked solution remains collapsed by default');
   await page.locator('.chapter-map-inquiry').click();
   expect(await page.locator('#evidence-inquiry').evaluate(el=>el===document.activeElement),course+' chapter jump moves keyboard focus');
   await solution.locator('summary').click();
   expect(await solution.evaluate(el=>el.open)===true,course+' reveals the solution only after user action');
   expect(await solution.locator('.evidence-inquiry-model').isVisible(),course+' presents a worked model');
   expect(await solution.locator('.evidence-inquiry-countercase').isVisible(),course+' presents a counterexample');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' advanced inquiry fits a narrow viewport');
  }
 });
 await smoke('guided-beginner-workshops-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,lesson] of [['psychology','biases'],['business','pricing'],['savings','emergency'],['languages','pronunciation']]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('#beginner-workshop').waitFor();
   expect(await page.locator('.beginner-workshop-step').count()===2,course+' has two real learning steps');
   expect(await page.locator('.beginner-workshop-model').count()===2,course+' has two worked models');
   expect(await page.locator('.beginner-workshop-rubric li').count()===4,course+' includes quality criteria');
   expect(await page.locator('.chapter-map-workshop').count()===1,course+' chapter links to the workshop');
   const model=page.locator('.beginner-workshop-model').first();
   expect(await model.evaluate(el=>el.open)===false,course+' works through the problem before seeing the answer');
   const before=await getState(page);
   await page.locator('.chapter-map-workshop').click();
   expect(await page.locator('#beginner-workshop').evaluate(el=>el===document.activeElement),course+' jump focuses the workshop');
   await model.locator('summary').click();
   expect(await model.evaluate(el=>el.open)===true,course+' reveals the authored comparison on learner action');
   const after=await getState(page);
   expect(JSON.stringify(before.completed||[])===JSON.stringify(after.completed||[]),course+' self-review must not mark a lesson complete');
   expect(JSON.stringify(before.answers||{})===JSON.stringify(after.answers||{}),course+' self-review must not change quiz grades');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' workshop fits mobile width');
  }
 });
 await smoke('foundation-diagnostics-mobile-feedback',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,lesson,correct] of [['psychology','thoughts',1],['laws','legal-basics',1],['science','method',2]]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('.foundation-diagnostic').waitFor();
   expect(await page.locator('.foundation-diagnostic-question').count()===3,course+' has three unique beginner questions');
   expect(await page.locator('.foundation-diagnostic-option').count()===9,course+' has three options per question');
   expect(await page.locator('.chapter-map-diagnostic').count()===1,course+' links to the guided recall section');
   await page.locator('.chapter-map-diagnostic').click();
   expect(await page.locator('#foundation-diagnostic').evaluate(el=>document.activeElement===el),course+' chapter jump focuses the activity');
   const before=await getState(page);
   const group=page.locator('[data-foundation-question="0"]');
   const wrong=(correct+1)%3;
   await group.locator('[data-option="'+wrong+'"]').click();
   expect((await group.locator('.foundation-diagnostic-feedback').textContent()).includes('Review the reasoning.'),course+' explains errors without penalizing a learner');
   expect(await group.locator('[data-option="'+wrong+'"]').getAttribute('aria-pressed')==='true',course+' marks the selected option for assistive technology');
   await group.locator('[data-option="'+correct+'"]').click();
   expect((await group.locator('.foundation-diagnostic-feedback').textContent()).includes('Correct.'),course+' confirms the supported interpretation');
   expect((await group.locator('.foundation-diagnostic-feedback').textContent()).includes('Apply it:'),course+' supplies a follow-up transfer challenge');
   expect(await group.locator('[data-option="'+wrong+'"]').getAttribute('aria-pressed')==='false',course+' clears the previous selection');
   const after=await getState(page);
   expect(JSON.stringify(after.completed||[])===JSON.stringify(before.completed||[]),course+' diagnostics never auto-complete lessons');
   expect(JSON.stringify(after.answers||{})===JSON.stringify(before.answers||{}),course+' diagnostics never alter graded quiz choices');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' recall interface fits mobile width');
  }
 });
 await smoke('cross-subject-field-missions-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,lesson] of [['business','sales'],['languages','chunks'],['science','probability']]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('.cross-subject-mission').waitFor();
   expect(await page.locator('.cross-subject-check li').count()===4,course+' has four assessable cross-subject criteria');
   expect(await page.locator('.chapter-map-bridge').count()===1,course+' map exposes its peer-linked mission');
   await page.locator('.chapter-map-bridge').click();
   expect(await page.locator('#cross-subject-mission').evaluate(el=>document.activeElement===el),course+' chapter jump focuses the mission');
   const answer=page.locator('.cross-subject-answer');
   expect(await answer.evaluate(el=>el.open)===false,course+' model is concealed before learner action');
   await answer.locator('summary').click();
   expect(await answer.evaluate(el=>el.open)===true,course+' learner may choose to inspect a model');
   expect((await page.locator('.cross-subject-peer').getAttribute('href')).startsWith('#/lesson/'),course+' companion lesson has a proper local route');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' mission fits mobile viewport');
  }
 });
 await smoke('intermediate-decision-revisions-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  for(const [course,lesson] of [['business','sales'],['thinking','causation'],['languages','chunks']]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('#decision-revision').waitFor();
   const reveal=page.locator('.decision-revision-reveal');
   expect(await reveal.evaluate(el=>el.open)===false,course+' initially withholds new evidence');
   expect(await page.locator('.chapter-map-decision').count()===1,course+' has a direct jump in the chapter map');
   const beforeState=await getState(page);
   await page.locator('.chapter-map-decision').click();
   expect(await page.locator('#decision-revision').evaluate(el=>el===document.activeElement),course+' chapter jump focuses the new exercise');
   await reveal.locator('summary').click();
   expect(await reveal.evaluate(el=>el.open)===true,course+' evidence is revealed by deliberate user action');
   expect(await reveal.locator('.decision-revision-change').count()===3,course+' shows evidence, revised answer and follow-up');
   expect(await page.locator('.decision-revision-rubric li').count()===4,course+' includes four review criteria');
   const afterState=await getState(page);
   expect(JSON.stringify(beforeState.completed||[])===JSON.stringify(afterState.completed||[]),course+' evidence reveal must not mark complete');
   expect(JSON.stringify(beforeState.answers||{})===JSON.stringify(afterState.answers||{}),course+' evidence reveal must not change quizzes');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' activity fits a narrow viewport');
  }
 });
 await smoke('intermediate-transfer-labs-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  // Distinct subjects exercise one shared reader component, with no mature-content bypass.
  for(const [course,lesson] of [['psychology','emotions'],['laws','consumer'],['thinking','causation'],['languages','chunks']]){
   await page.goto(BASE+'/#/lesson/'+course+'/'+lesson,{waitUntil:'domcontentloaded'});
   await page.locator('.transfer-lab').waitFor();
   expect(await page.locator('.transfer-lab-rubric li').count()===4,course+' shows four review criteria');
   expect(await page.locator('.chapter-map-transfer').count()===1,course+' map includes transfer lab');
   const details=page.locator('.transfer-lab-solution');
   expect(await details.evaluate(el=>el.open)===false,course+' model answer is initially collapsed');
   await page.locator('.chapter-map-transfer').click();
   expect(await page.locator('#transfer-lab').evaluate(el=>document.activeElement===el),course+' chapter jump is keyboard-accessible');
   await details.locator('summary').click();
   expect(await details.evaluate(el=>el.open)===true,course+' model answer can be revealed deliberately');
   expect((await details.textContent()).includes('Why a tempting shortcut fails'),course+' teaches a counterexample');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,course+' applied lab fits the mobile viewport');
  }
 });
 await smoke('language-literacy-pattern-checks-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('#language-select').waitFor();
  for(const [code,correct] of [['en',1],['ko',0],['ar',1],['tr',1],['el',2]]){
   await page.locator('#language-select').selectOption(code);
   await page.locator('.language-literacy-question').first().waitFor();
   expect(await page.locator('.language-literacy-question').count()===2,code+' has two distinct written pattern checks');
   expect(await page.locator('[data-action="language-literacy-answer"]').count()===6,code+' presents three choices per check');
   const before=await getState(page),group=page.locator('.language-literacy-question').first();
   const wrong=(correct+1)%3;
   await group.locator('[data-option="'+wrong+'"]').click();
   expect((await group.locator('.language-literacy-feedback').textContent()).includes('Review this distinction.'),code+' teaches through an incorrect choice');
   expect(await group.locator('[data-option="'+wrong+'"]').getAttribute('aria-pressed')==='true',code+' exposes selection to assistive tech');
   await group.locator('[data-option="'+correct+'"]').click();
   expect((await group.locator('.language-literacy-feedback').textContent()).includes('Correct.'),code+' confirms the answer');
   expect((await group.locator('.language-literacy-feedback').textContent()).includes('Next practice:'),code+' gives a transfer exercise');
   expect(await group.locator('[data-option="'+wrong+'"]').getAttribute('aria-pressed')==='false',code+' clears the prior selection');
   const after=await getState(page);
   expect(JSON.stringify(before.completed||[])===JSON.stringify(after.completed||[]),code+' does not auto-complete lessons');
   expect(JSON.stringify(before.answers||{})===JSON.stringify(after.answers||{}),code+' does not change quiz grades');
   expect(JSON.stringify(before.phrases||{})===JSON.stringify(after.phrases||{}),code+' does not create claimed phrase fluency');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,code+' literacy controls fit mobile');
  }
  await page.locator('#language-select').selectOption('ja');
  await page.locator('.language-literacy-locked').waitFor();
  expect(await page.locator('[data-action="language-literacy-answer"]').count()===0,'Japanese practice remains gated by its kana curriculum');
 });
 await smoke('sequential-language-grammar-bridges-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('#language-select').waitFor();
  for(const code of ['en','ko','fil','ar','tr']){
   await page.locator('#language-select').selectOption(code);
   const root=page.locator('.sentence-bridge');
   await root.waitFor();
   expect(await root.locator('.sentence-bridge-unit').count()===2,code+' includes question and negation stages');
   expect(await root.locator('[data-sentence-step="1"]').isHidden(),code+' requires completing the first check before progressing');
   const beforeState=await getState(page),first=root.locator('[data-sentence-step="0"]');
   await first.locator('[data-option="1"]').click();
   expect((await first.locator('.sentence-bridge-feedback').textContent()).includes('Review the pattern.'),code+' explains an incorrect response');
   expect(await root.locator('[data-sentence-step="1"]').isHidden(),code+' wrong answer cannot unlock stage two');
   await first.locator('[data-option="0"]').click();
   expect((await first.locator('.sentence-bridge-feedback').textContent()).includes('Correct.'),code+' confirms the interpretation');
   expect(await root.locator('[data-sentence-step="1"]').isVisible(),code+' unlocks negation after correct reasoning');
   const second=root.locator('[data-sentence-step="1"]');
   await second.locator('[data-option="0"]').click();
   expect((await second.locator('.sentence-bridge-feedback').textContent()).includes('Practice:'),code+' supplies independent follow-up');
   if(code==='ar')expect(await root.locator('.sentence-bridge-target').first().getAttribute('dir')==='rtl','Arabic authored text is RTL');
   const afterState=await getState(page);
   expect(JSON.stringify(beforeState.completed||[])===JSON.stringify(afterState.completed||[]),code+' grammar does not auto-complete courses');
   expect(JSON.stringify(beforeState.answers||{})===JSON.stringify(afterState.answers||{}),code+' grammar does not alter graded quizzes');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,code+' sentence instruction fits mobile');
  }
  await page.locator('#language-select').selectOption('ja');
  await page.locator('.sentence-bridge-locked').waitFor();
  expect(await page.locator('[data-action="sentence-bridge-answer"]').count()===0,'Japanese kana prerequisite is preserved');
 });
 await smoke('evidence-calibration-two-step-revision-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  await page.goto(BASE+'/#/lesson/business/sales',{waitUntil:'domcontentloaded'});
  const root=page.locator('#calibration-lab');
  await root.waitFor();
  const first=root.locator('[data-calibration-round="0"]');
  const second=root.locator('[data-calibration-round="1"]');
  expect(await second.isHidden(),'new evidence must be initially hidden');
  expect(await root.locator('[data-calibration-reveal]').isHidden(),'reveal is gated on a first judgment');
  const before=await getState(page);
  await first.locator('[data-option="1"]').click();
  expect((await first.locator('.calibration-feedback').textContent()).includes('Check the trade-off.'),'unsupported first decision gets grounded explanation');
  expect(await second.isVisible(),'new evidence follows first decision');
  await second.locator('[data-option="2"]').click();
  expect(await root.locator('[data-calibration-finish]').isVisible(),'completed revision exposes transfer task');
  await first.locator('[data-option="0"]').click();
  expect(await root.locator('[data-calibration-finish]').isHidden(),'changing original judgment invalidates downstream conclusion');
  expect(await second.locator('[aria-pressed="true"]').count()===0,'stale revision choice is cleared');
  await second.locator('[data-option="0"]').click();
  expect((await second.locator('.calibration-feedback').textContent()).includes('Best supported in this case.'),'revised decision provides specific feedback');
  expect(await root.locator('[data-calibration-finish]').isVisible(),'self-review available after revised decision');
  const after=await getState(page);
  expect(JSON.stringify(before.completed||[])===JSON.stringify(after.completed||[]),'calibration cannot mark a lesson complete');
  expect(JSON.stringify(before.answers||{})===JSON.stringify(after.answers||{}),'calibration cannot alter graded answer records');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+2,'new fieldwork decision controls fit narrow screens');
 });
 await smoke('twenty-language-guided-foundations-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async page=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('#language-select').waitFor();
  for(const code of ['en','ko','es','fil','ar']){
   await page.locator('#language-select').selectOption(code);
   await page.locator('.language-starter-path').waitFor();
   expect(await page.locator('.language-path-step').count()===4,code+' shows four progressive learning steps');
   expect(await page.locator('.language-path-phrase').count()===4,code+' supports four cover-and-reveal phrases');
   const first=page.locator('.language-path-phrase').first();
   const before=await getState(page);
   await first.locator('summary').click();
   expect(await first.locator('.language-path-target').isVisible(),code+' phrase reveal works without auto grading');
   const after=await getState(page);
   expect(JSON.stringify(after.phrases||{})===JSON.stringify(before.phrases||{}),code+' reveals do not change phrase progress');
   if(code==='ar')expect(await first.locator('.language-path-target').getAttribute('dir')==='rtl','Arabic target phrase has RTL direction');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+2,code+' foundation fits a narrow mobile viewport');
  }
  await page.locator('#language-select').selectOption('ja');
  await page.locator('.japanese-foundation').waitFor();
  expect(await page.locator('.language-path-step').count()===4,'Japanese gets the overview without replacing its full kana instruction');
  expect(await page.locator('.language-path-phrase').count()===0,'Japanese phrase reveals respect full kana prerequisites');
 });
 await smoke('japanese-beginner-foundations',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async page=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('.japanese-foundation').waitFor();
  expect(await page.locator('.japanese-unit-select').count()===26,'Japanese course has 26 sequential teaching units');
  expect((await page.locator('.japanese-foundation').textContent()).includes('Five sounds you already nearly know'),'the first lesson teaches familiar vowel sounds');
  expect(await page.locator('.japanese-kana-tile').count()===5,'beginner sees five vowel characters before any quiz');
  expect(await page.locator('.japanese-mouth-guide').count()===1,'vowel articulation is taught before written recall');
  expect(await page.locator('.japanese-mouth-glyph').count()===5,'all five vowels receive practical pronunciation cues');
  expect(await page.locator('.japanese-unit-select').nth(1).isDisabled(),'later teaching units require their prerequisites');
  expect(await page.locator('.phrase-lab').count()===0,'no konnichiwa cards before kana reading');
  expect(await page.locator('.sprint-list').count()===0,'beginner cannot accidentally jump into the seven-day phrase sprint');
  expect(await page.locator('.japanese-course-gate').count()===1,'lesson sequencing explains why phrases come later');
  expect(await page.locator('#japanese-answer').count()===0,'no guessing question until lesson has been read');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+2,'Japanese foundation fits mobile viewport');
  await page.locator('.japanese-practice [data-action="japanese-start"]').click();
  await page.locator('#japanese-answer').fill('wrong');
  await page.locator('[data-action="japanese-check"]').click();
  expect((await page.locator('.japanese-feedback').textContent()).includes('Not quite'),'wrong answers provide helpful guidance without penalty');
  for(const correct of ['a','i','u','e','o','ai','ie']){
   await page.locator('#japanese-answer').fill(correct);
   await page.locator('[data-action="japanese-check"]').click();
  }
  expect((await getState(page)).japaneseFoundationDone.includes('vowels'),'foundation checkpoint persists locally');
  expect(await page.locator('.japanese-unit-select').nth(1).isEnabled(),'next lesson unlocks after guided recall');
  await page.locator('[data-action="japanese-next"]').click();
  expect((await page.locator('.japanese-lesson h3').textContent()).includes('K row'),'next lesson starts with KA KI KU KE KO');
  expect((await page.locator('.japanese-kana-grid').textContent()).includes('か'),'K row kana appears after vowel checkpoint');
  expect(await page.locator('.japanese-kana-tile').count()===5,'K row isolates just five new kana');
  expect(await page.locator('.phrase-lab').count()===0,'no phrase drills after merely opening K row');
  await page.locator('[data-action="japanese-start"]').click();
  expect((await page.locator('.japanese-practice').textContent()).includes('1 / 7'),'K row asks for every sound plus two words');
  for(const answer of ['ka','ki','ku','ke','ko','kao','koe']){
   await page.locator('#japanese-answer').fill(answer);
   await page.locator('[data-action="japanese-check"]').click();
  }
  await page.locator('[data-action="japanese-next"]').click();
  expect((await page.locator('.japanese-lesson h3').textContent()).includes('S row'),'S row follows K row, not greetings');
  expect((await page.locator('.japanese-kana-grid').textContent()).includes('し'),'SHI is explained in the S row');
  expect(await page.locator('.phrase-lab').count()===0,'even after S row starts, no premature phrase drills');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).japaneseFoundationDone.includes('vowels'),'foundation progress survives PWA reload');
  expect(await page.locator('.japanese-unit-select').nth(1).isEnabled(),'next unit remains unlocked');
 });

 await smoke('kana-recall-retention-mobile-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true},async(page,context)=>{
  await page.goto(BASE+'/#/language',{waitUntil:'domcontentloaded'});
  await page.locator('.kana-review-panel').waitFor();
  expect(await page.locator('#kana-review-answer').count()===0,'review deck does not quiz untaught kana');
  await page.locator('.japanese-practice [data-action="japanese-start"]').click();
  for(const answer of ['a','i','u','e','o','ai','ie']){
   await page.locator('#japanese-answer').fill(answer);
   await page.locator('[data-action="japanese-check"]').click();
  }
  expect(await page.locator('#kana-review-answer').count()===1,'five taught vowels unlock a separate recall deck');
  expect((await page.locator('.kana-review-stats').textContent()).includes('5'),'five learned vowels appear due for review');
  expect((await page.locator('.kana-review-stats').textContent()).includes('new'),'brand-new unlocked sounds are identified');
  expect((await page.locator('.kana-review-glyph').textContent()).includes('あ'),'recall begins with a taught kana');
  expect(await page.locator('.phrase-lab').count()===0,'the review deck never unlocks untaught phrase games');
  await page.locator('#kana-review-answer').fill('wrong');
  await page.locator('[data-action="kana-review-check"]').click();
  expect((await page.locator('.kana-review-feedback').textContent()).includes('あ = a'),'mistake reveals correct reading instead of an unexplained wrong marker');
  let state=await getState(page);
  expect(state.japaneseKanaReviews['あ'].step===0&&state.japaneseKanaReviews['あ'].misses===1,'missed sound is scheduled for a retry');
  expect(await page.locator('.kana-review-glyph').textContent()==='い','review advances without skipping new foundation lessons');
  await page.locator('#kana-review-answer').fill('i');
  await page.locator('[data-action="kana-review-check"]').click();
  state=await getState(page);
  expect(state.japaneseKanaReviews['い'].step===1,'remembered sound receives first spaced review');
  expect(await page.locator('.kana-review-glyph').textContent()==='う','next due card remains from taught vowel row');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+2,'kana review fits narrow mobile viewport');
  await page.reload({waitUntil:'domcontentloaded'});
  expect((await getState(page)).japaneseKanaReviews['い'].step===1,'kana review survives reload');
  await page.evaluate(async()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  try{
   await page.reload({waitUntil:'domcontentloaded'});
   await page.locator('#kana-review-answer').fill('u');
   await page.locator('[data-action="kana-review-check"]').click();
   expect((await getState(page)).japaneseKanaReviews['う'].step===1,'new spaced recall schedules offline');
  }finally{await context.setOffline(false);}
 });

 await smoke('manual-offline-update-lifecycle',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.goto(BASE+'/#/offline',{waitUntil:'domcontentloaded'});
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.offline-library-page').waitFor();
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  const swFile='dist/sw.js',oldSource=await readFile(swFile,'utf8');
  const match=oldSource.match(/CACHE_PREFIX \+ '(v(\d+)(?:-[a-f0-9]{12})?)'/);
  expect(Boolean(match),'test can identify the content-fingerprinted offline cache version');
  const original='xyra-atlas-'+match[1];
  const updatedVersion='v'+(Number(match[2])+1)+(match[1].includes('-')?'-'+match[1].split('-')[1]:'');
  const replacement='xyra-atlas-'+updatedVersion;
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
   const nextSource=oldSource.replace("CACHE_PREFIX + '"+match[1]+"'", "CACHE_PREFIX + '"+updatedVersion+"'");
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
   await page.locator('.update-ready-topbar').click();
   expect(await page.locator('.modal-card [data-action="offline-apply-update"]').count()===1,'update icon offers direct installation after download');
   await page.locator('.modal-close').click();
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
  for(const selector of ['.hero-archive>img','.atlas-scene-card>img']){
   const imgs=page.locator(selector),n=await imgs.count();
   for(let i=0;i<n;i++){
    const img=imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    const dimensions=await img.evaluate(async el=>{await el.decode();return [el.naturalWidth,el.naturalHeight];});
    expect(dimensions[0]===1400&&dimensions[1]===700,'cinematic SVG actually renders in Chromium');
   }
  }
  expect(await page.locator('.atlas-scene-card').count()===2,'both supporting illustrated worlds render');
  const portrait=page.locator('.atlas-guide-medallion img');
  expect(await portrait.count()===1,'Xyra companion cameo is present in the Lantern Library scene');
  expect(await portrait.evaluate(async img=>{await img.decode();return img.naturalWidth>0&&img.naturalHeight>0;}),
   'companion portrait decodes without any remote image request');
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
 await smoke('connected-knowledge-trails-mobile',{viewport:{width:390,height:844}},async page=>{
  await page.goto(BASE+'/#/map',{waitUntil:'domcontentloaded'});
  await page.locator('.atlas-learning-trails').waitFor();
  expect(await page.locator('.atlas-trail-card').count()===3,'knowledge map offers three real subject connections');
  expect(await page.locator('.atlas-trail-card .atlas-trail-button').count()===3,'each trail opens a genuine learning experience');
  const first=page.locator('.atlas-trail-card').first();
  const ids=await first.locator('.atlas-trail-button').evaluate(el=>({course:el.dataset.course,lesson:el.dataset.lesson}));
  expect(Boolean(COURSES.find(c=>c.id===ids.course)?.lessons.find(l=>l.id===ids.lesson)),
    'trail points to an actual authored lesson rather than placeholder navigation');
  const before=JSON.stringify((await getState(page)).completed||[]);
  await first.locator('.atlas-trail-button').click();
  await waitRoute(page,'#/lesson/'+ids.course+'/'+ids.lesson);
  await page.locator('.reading-page').waitFor();
  expect(JSON.stringify((await getState(page)).completed||[])===before,
    'exploring a suggested connection never fabricates lesson completion');
  await page.goto(BASE+'/#/map',{waitUntil:'domcontentloaded'});
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'suggested curriculum trails have no mobile horizontal overflow');
  await page.screenshot({path:snapshots+'/knowledge-trails-mobile.png',fullPage:true});
 });
 await smoke('cinematic-worlds-mobile-offline',{viewport:{width:390,height:844}},async(page,context)=>{
  await page.goto(BASE+'/#/home',{waitUntil:'domcontentloaded'});
  await page.locator('.hero-archive img').waitFor();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  for(const selector of ['.hero-archive>img','.atlas-scene-card>img']){
   const imgs=page.locator(selector);
   for(let i=0;i<await imgs.count();i++){
    await imgs.nth(i).scrollIntoViewIfNeeded();
    const loaded=await imgs.nth(i).evaluate(async img=>{await img.decode();return img.naturalWidth===1400});
    expect(loaded,'illustrated world loads on a mobile-sized viewport');
   }
  }
  expect(await page.locator('.atlas-guide-medallion img').evaluate(async img=>{await img.decode();return img.naturalWidth>0;}),
   'the Xyra character portrait is also visible on a narrow screen');
  const inviteLayout=await page.locator('.home-page .path-invite').evaluate(el=>{
   const copy=el.querySelector('div:nth-child(2)'),cta=el.querySelector('.small-button');
   return {columns:getComputedStyle(el).gridTemplateColumns,
    copyWidth:copy.getBoundingClientRect().width,
    ctaBelow:cta.getBoundingClientRect().top>=copy.getBoundingClientRect().bottom-1,
    buttonMargin:getComputedStyle(cta).marginLeft};
  });
  expect(inviteLayout.copyWidth>=220&&inviteLayout.ctaBelow&&inviteLayout.buttonMargin==='0px',
   'mobile learning invitation keeps readable title and actionable button on its own row');
  let overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'cinematic home and scene cards do not overflow mobile viewport');
  await page.screenshot({path:snapshots+'/atlas-cinematic-mobile.png',fullPage:true});
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.hero-archive').waitFor();
  for(const selector of ['.hero-archive>img','.atlas-scene-card>img']){
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


 await smoke('illustrated-stage-roadmap-mobile',{viewport:{width:390,height:844}},async page=>{
  await page.goto(BASE+'/#/course/psychology',{waitUntil:'domcontentloaded'});
  await page.locator('.curriculum-world-preview').first().waitFor();
  const hero=page.locator('.course-world-hero');
  expect(await hero.locator('img').getAttribute('src')==='/assets/world-psychology-beginner.svg',
    'course opening artwork follows the next unfinished stage');
  expect((await hero.locator('.course-hero-story').textContent()).includes('YOUR NEXT WORLD'),
    'course hero narrates the next learning destination');
  expect(await page.locator('.curriculum-level-illustrated').count()===3,
    'each subject course has three illustrated and navigable levels');
  for(const stage of ['Beginner','Intermediate','Advanced']){
    const choice=page.locator('.curriculum-world-preview[data-id="'+stage+'"]');
    expect(await choice.count()===1,'illustration for '+stage+' stage exists');
    const image=choice.locator('img');
    const picture=await image.evaluate(async img=>{await img.decode();return {
      url:img.getAttribute('src'),width:img.naturalWidth,height:img.naturalHeight,
      alt:img.alt
    };});
    expect(picture.width===1400&&picture.height===700&&picture.alt==='',
      'interactive stage scene is available and decoratively accessible');
    expect(picture.url==='/assets/world-psychology-'+stage.toLowerCase()+'.svg',
      'level image matches subject and stage');
  }
  const before=(await getState(page)).completed||[];
  await page.locator('.curriculum-world-preview[data-id="Intermediate"]').click();
  const heading=page.locator('#course-lessons-heading');
  expect(await heading.evaluate(el=>document.activeElement===el),
    'level navigation moves keyboard focus to the filtered lesson list');
  expect(await page.locator('.course-stage-button[data-id="Intermediate"]').getAttribute('aria-pressed')==='true',
    'selected learning stage is visibly active');
  const rows=page.locator('.lesson-list .lesson-row');
  const expected=COURSES.find(c=>c.id==='psychology').lessons.filter(l=>l.stage==='Intermediate').length;
  expect(await rows.count()===expected,'level button filters to the authored lessons');
  expect((await rows.locator('.lesson-info small').allTextContents()).every(s=>s.includes('Intermediate')),
    'no unrelated stage lessons are shown');
  expect(JSON.stringify((await getState(page)).completed||[])===JSON.stringify(before),
    'exploring the visual stages does not alter saved progress');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'stage roadmap remains within mobile viewport');
  await page.screenshot({path:snapshots+'/atlas-stage-roadmap-mobile.png',fullPage:true});
 });
 await smoke('cinematic-stage-worlds-mobile',{viewport:{width:390,height:844}},async page=>{
  for(const [courseId,lessonId,expectedStage] of [
   ['psychology','thoughts','BEGINNER'],
   ['psychology','emotions','INTERMEDIATE'],
   ['science','systems','ADVANCED']
  ]){
   await page.goto(BASE+'/#/lesson/'+courseId+'/'+lessonId,{waitUntil:'domcontentloaded'});
   await page.locator('.reading-illustration.stage-art-feature').waitFor();
   await page.locator('.reading-illustration.stage-art-feature img').evaluate(el=>el.decode());
   const info=await page.locator('.reading-illustration.stage-art-feature img').evaluate(el=>({
    loaded:el.complete&&el.naturalWidth===1400&&el.naturalHeight===700,
    alt:el.alt,src:el.getAttribute('src')
   }));
   expect(info.loaded,'stage scene fully decodes at native artwork resolution');
   expect(info.alt.length>75,'stage art preserves meaningful accessible alternative text');
   expect(info.src.includes('/assets/world-'+courseId+'-'+expectedStage.toLowerCase()+'.svg'),
    'chapter selects the intended subject and stage, not a generic course thumbnail');
   expect((await page.locator('.chapter-art-caption').textContent()).includes(expectedStage),
    'level and illustrated world appear in the reader');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,'immersive illustration does not break mobile width');
  }
  await page.screenshot({path:snapshots+'/cinematic-stage-worlds-mobile.png',fullPage:true});
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
  expect(await page.locator('.stage-art-feature').count()===1,'ordinary lesson receives its own stage-world illustration');
  expect(await page.locator('.reading-illustration img').getAttribute('src')==='/assets/world-psychology-beginner.svg',
   'normal lessons now load the correct new subject-and-level world');
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
  await page.locator('#language-select').selectOption('es');
  await page.locator('.conversation-quest').waitFor();
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
  const conversationBefore=JSON.stringify((await getState(page)).conversationQuestHistory);
  const conversationRetry=page.locator('[data-action="language-review-missed"][data-review-source="conversation"]');
  expect(await conversationRetry.count()===2,'a completed conversation offers its genuinely missed phrase for practice');
  await conversationRetry.first().click();
  expect((await page.locator('.phrase-card h3').textContent()).trim()==='Excuse me','missed conversational phrase opens its authentic private study card');
  expect(await page.locator('#phrase-draft').evaluate(el=>document.activeElement===el),'retry moves focus to accessible written recall');
  expect(JSON.stringify((await getState(page)).conversationQuestHistory)===conversationBefore,'revisiting mistakes never changes the scored result');
  expect((await page.locator('.phrase-focus-session').textContent()).includes('1 of 1 phrases'),'a single missed conversational phrase creates a one-card guided review');
  await page.locator('[data-action="focused-phrase-next"]').click();
  expect(await page.locator('.phrase-focus-session').count()===0,'finish exits focused review and restores normal cards');
  expect(await page.locator('.conversation-quest-complete').count()===1,'finishing review returns focus to the completed situation');
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
  await prepareJapanesePhrasePractice(page);
  await page.locator('#language-audio-controls').waitFor();
  expect((await page.locator('.language-audio-indicator').textContent()).includes('Local voice ready'),'Japanese exact-locale local voice is ready');
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
  expect((await page.locator('.language-audio-indicator').textContent()).includes('Choose regional voice'),'regional voice requires deliberate consent');
  expect(await page.locator('#language-voice-picker option').count()===2,'regional voice and placeholder available, cloud voice excluded');
  expect(await page.locator('#language-audio-controls [data-action="language-speak"]').isDisabled(),
   'regional playback cannot start before opt-in');
  calls=await page.evaluate(()=>window.__atlasSpeech.calls);
  expect(calls.length===1,'changing language never automatically selects a different regional accent');
  await page.locator('#language-voice-picker').selectOption('local-es-mx');
  expect((await page.locator('.language-audio-indicator').textContent()).includes('Local voice ready'),
   'explicit user choice enables regional voice playback');
  expect((await page.locator('.language-audio-panel').textContent()).includes('regional variant'),
   'regional accent differences are explained after selection');
  await page.locator('#language-audio-controls [data-action="language-speak"]').click();
  calls=await page.evaluate(()=>window.__atlasSpeech.calls);
  expect(calls.length===2&&calls[1].text==='Hola'&&calls[1].uri==='local-es-mx',
   'Spanish uses the explicitly selected local regional voice, never the cloud');
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


 await smoke('private-category-data-controls', {viewport:{width:390,height:844},isMobile:true,hasTouch:true},async(page,context)=>{
  await page.evaluate(()=>{
   const key='xyra-atlas-state-v1',state=JSON.parse(localStorage.getItem(key)||'{}');
   state.completed=['psychology:thoughts'];
   state.answers={'psychology:thoughts':1};
   state.fieldNotes={'psychology:thoughts':'My personal reflection'};
   state.favorites=['psychology'];
   state.phrases={ja:['1','2']};
   localStorage.setItem(key,JSON.stringify(state));
  });
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.bottom-nav [data-action="nav"][data-id="you"]').click();
  await page.locator('[data-action="privacy-open"]').click();
  await page.locator('.privacy-page').waitFor();
  expect(await page.locator('.privacy-group').count()===5,'all local categories are shown');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'private data inventory fits 390px mobile width');
  await page.locator('[data-action="privacy-erase"][data-id="writing"]').click();
  await page.locator('.modal-card').waitFor();
  await page.locator('.modal-card button[data-action="close-modal"].secondary-button').click();
  expect((await getState(page)).fieldNotes['psychology:thoughts']==='My personal reflection','cancel keeps private notes unchanged');
  await page.locator('[data-action="privacy-erase"][data-id="writing"]').click();
  await page.locator('[data-action="privacy-erase-confirm"]').click();
  let state=await getState(page);
  expect(Object.keys(state.fieldNotes).length===0,'confirmed category deletion clears notes');
  expect(state.completed.includes('psychology:thoughts'),'category clearing preserves lesson completions');
  expect(state.favorites.includes('psychology'),'category clearing preserves saved courses');
  expect(state.phrases.ja.length===2,'category clearing preserves language progress');
  await page.reload({waitUntil:'domcontentloaded'});
  state=await getState(page);
  expect(Object.keys(state.fieldNotes).length===0&&state.phrases.ja.length===2,'selective erase survives reload');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.privacy-page').waitFor();
  expect(await page.locator('.privacy-group').count()===5,'privacy inventory remains available offline');
  await context.setOffline(false);
 });


 await smoke('subject-portfolio-journeys-mobile-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  for(const id of ['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation']){
   await page.goto(BASE+'/#/course/'+id,{waitUntil:'domcontentloaded'});
   await page.locator('.portfolio-journey').waitFor();
   const root=page.locator('.portfolio-journey');
   expect(await root.locator('.portfolio-journey-stage').count()===3,id+' offers three linked stages');
   expect(await root.locator('.portfolio-journey-details').count()===3,id+' has three example and evidence reviews');
   expect(await root.locator('.portfolio-journey-rubric li').count()===4,id+' has four portfolio quality criteria');
   const first=root.locator('.portfolio-journey-stage').first();
   expect(await first.locator('.portfolio-journey-details').evaluate(el=>el.open)===false,id+' worked reasoning starts concealed');
   const before=await getState(page);
   await first.locator('summary').click();
   expect(await first.locator('.portfolio-journey-details').evaluate(el=>el.open)===true,id+' learner reveals example deliberately');
   const after=await getState(page);
   expect(JSON.stringify(before.completed||[])===JSON.stringify(after.completed||[]),id+' viewing examples never completes lessons');
   expect(JSON.stringify(before.answers||{})===JSON.stringify(after.answers||{}),id+' viewing examples never grades answers');
   const links=await root.locator('.portfolio-journey-link').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
   expect(links.length===3&&links.every(url=>url.startsWith('#/lesson/'+id+'/')),id+' connects all three existing lessons');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,id+' journey fits narrow screens');
  }
  await page.goto(BASE+'/#/course/business',{waitUntil:'domcontentloaded'});
  await page.locator('.portfolio-journey').waitFor();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  expect(await page.locator('.portfolio-journey-stage').count()===3,'portfolio survives an offline reload');
  await context.setOffline(false);
 });
 await smoke('interactive-response-simulations-mobile-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  for(const course of ['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation']){
   await page.goto(BASE+'/#/course/'+course,{waitUntil:'domcontentloaded'});
   const sim=page.locator('.response-simulation');
   await sim.waitFor();
   await sim.locator('.response-simulation-shell>summary').click();
   expect(await sim.locator('.response-simulation-round').count()===2,course+' contains two decisions');
   const first=sim.locator('[data-sim-step="0"]'),second=sim.locator('[data-sim-step="1"]');
   expect(await second.isHidden(),course+' does not reveal changed evidence before a choice');
   const before=await getState(page);
   await first.locator('[data-sim-choice="2"]').click();
   const feedback=first.locator('.response-simulation-feedback');
   expect(await feedback.isVisible(),course+' reveals a tailored consequence');
   expect((await feedback.textContent()).includes('Consider the trade-off.'),course+' labels a weaker option appropriately');
   expect(await second.isVisible(),course+' reveals the second decision after choosing');
   await first.locator('[data-sim-choice="1"]').click();
   expect(await first.locator('[data-sim-choice="1"]').getAttribute('aria-pressed')==='true',course+' exposes current selection accessibly');
   expect(await first.locator('[data-sim-choice="2"]').getAttribute('aria-pressed')==='false',course+' clears the earlier selection');
   await second.locator('[data-sim-choice="0"]').click();
   expect(await sim.locator('.response-simulation-final').isVisible(),course+' reveals independent decision memo after second step');
   expect(await sim.locator('.response-simulation-final li').count()===4,course+' has four independent evaluation criteria');
   const model=sim.locator('.response-simulation-model');
   expect(await model.evaluate(el=>el.open)===false,course+' worked synthesis starts hidden');
   await model.locator('summary').click();
   expect(await model.evaluate(el=>el.open)===true,course+' worked synthesis is learner-controlled');
   await first.locator('[data-sim-choice="0"]').click();
   expect(await sim.locator('.response-simulation-final').isHidden(),course+' changing the first decision clears stale synthesis');
   expect(await second.locator('.response-simulation-feedback').isHidden(),course+' old second-step feedback resets');
   expect(await second.locator('[data-sim-choice="0"]').getAttribute('aria-pressed')==='false',course+' earlier second choice resets');
   await second.locator('[data-sim-choice="1"]').click();
   expect(await sim.locator('.response-simulation-final').isVisible(),course+' memo can be completed again');
   const after=await getState(page);
   expect(JSON.stringify(before.completed||[])===JSON.stringify(after.completed||[]),course+' simulation does not complete lessons');
   expect(JSON.stringify(before.answers||{})===JSON.stringify(after.answers||{}),course+' simulation does not change quiz scores');
   const width=await mobileOverflow(page);
   expect(width.scroll<=width.width+8,course+' simulator fits narrow screens');
  }
  await page.goto(BASE+'/#/course/business',{waitUntil:'domcontentloaded'});
  await page.locator('.response-simulation').waitFor();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.response-simulation').waitFor();
  expect(await page.locator('.response-simulation-round').count()===2,'business simulator still works without internet');
  await context.setOffline(false);
 });
 await smoke('offline-curriculum-ladders',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  await page.goto(BASE+'/#/course/psychology',{waitUntil:'domcontentloaded'});
  await page.locator('.curriculum-ladder').waitFor();
  expect(await page.locator('.curriculum-level').count()===3,'learning objectives appear at three levels');
  expect(await page.locator('.curriculum-next-action').count()===3,'each stage links a genuine lesson');
  const width=await mobileOverflow(page);
  expect(width.scroll<=width.width+8,'curriculum ladder fits mobile view');
  await page.locator('.curriculum-level').nth(2).locator('[data-action="open-lesson"]').click();
  await page.locator('.reading-page').waitFor();
  expect(await page.locator('.reading-page').count()===1,'advanced recommendation opens real lesson');
  await page.goto(BASE+'/#/course/psychology',{waitUntil:'domcontentloaded'});
  await page.locator('.curriculum-ladder').waitFor();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.curriculum-ladder').waitFor();
  expect(await page.locator('.curriculum-level').count()===3,'curriculum ladder works offline');
  await context.setOffline(false);
 });


 await smoke('ph-casework-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  await page.goto(BASE+'/#/course/laws',{waitUntil:'domcontentloaded'});
  await page.locator('.curriculum-ladder').waitFor();
  await page.locator('.course-stage-button[data-id="Advanced"]').click();
  await page.locator('.lesson-list [data-action="open-lesson"][data-lesson="ph-data-access-case"]').click();
  await page.locator('.reading-page').waitFor();
  expect((await page.locator('.reading-page').textContent()).includes('Philippine'),'jurisdiction clearly stated');
  expect(await page.locator('.lesson-sources a').count()===2,'original official resources available');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.reading-page').waitFor();
  expect((await page.locator('.reading-page').textContent()).includes('Philippine'),'casework lesson usable offline');
  await context.setOffline(false);
 });


 await smoke('subject-decision-clinics-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  await page.goto(BASE+'/#/course/laws',{waitUntil:'domcontentloaded'});
  await page.locator('.clinic-panel').waitFor();
  expect(await page.locator('.clinic-question').count()===3,'Philippine legal clinic has three independent decisions');
  const overflow=await mobileOverflow(page);
  expect(overflow.scroll<=overflow.width+8,'evidence clinic fits mobile screen');
  await page.locator('.clinic-question').first().locator('.clinic-choice').nth(2).click();
  let state=await getState(page);
  expect(state.clinicAnswers['laws:decision-1']===2,'first choice saved locally');
  expect(await page.locator('.clinic-feedback').count()===1,'choice gets feedback and reasoning');
  await page.reload({waitUntil:'domcontentloaded'});
  expect(await page.locator('.clinic-feedback').count()===1,'clinic explanation resumes after reload');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.clinic-panel').waitFor();
  expect((await getState(page)).clinicAnswers['laws:decision-1']===2,'offline clinic retains response');
  await context.setOffline(false);
  await page.locator('.clinic-question').nth(2).locator('.clinic-choice').first().focus();
  await page.keyboard.press('Enter');
  expect(Object.hasOwn((await getState(page)).clinicAnswers,'laws:decision-3'),'advanced case is keyboard-answerable offline');
  expect(await page.locator('#clinic-feedback-laws-decision-3').evaluate(node=>document.activeElement===node),'keyboard answer moves focus to reasoning feedback');
  await page.locator('[data-action="clinic-retry"]').click();
  expect((await getState(page)).clinicAnswers['laws:decision-1']===undefined,'retry clears only selected clinic answers');
  expect((await getState(page)).clinicAnswers['laws:decision-3']===undefined,'retry also clears advanced case while retaining other subject state');
  await page.goto(BASE+'/#/course/psychology',{waitUntil:'domcontentloaded'});
  await page.locator('.clinic-panel').waitFor();
  expect(await page.locator('.clinic-question').count()===3,'a distinct nonlegal course has original case practice');
 });


 await smoke('advanced-foundation-worked-examples',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
  await page.goto(BASE+'/#/lesson/laws/privacy-law',{waitUntil:'domcontentloaded'});
  await page.locator('.reading-page').waitFor();
  expect(await page.locator('.lesson-content section[id^="lesson-section-"]').count()===3,'privacy law original advanced lesson has three teaching sections');
  expect(await page.locator('.worked-example').count()===1,'worked example is displayed');
  expect(await page.locator('.lesson-sources a').count()>=2,'first-party Philippine privacy links are visible');
  const width=await mobileOverflow(page);
  expect(width.scroll<=width.width+8,'advanced reading remains narrow-screen safe');
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.worked-example').waitFor();
  expect((await page.locator('.worked-example').textContent()).includes('Mira'),'advanced original case remains offline');
  await context.setOffline(false);
 });


 await smoke('foundation-casework-mobile-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
   await page.goto(BASE+'/#/lesson/business/pricing',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect(await page.locator('.lesson-content section[id^="lesson-section-"]').count()===3,'foundation lesson now includes applied teaching');
   expect((await page.locator('.worked-example').textContent()).includes('₱14,100'),'grounded business worked calculation is present');
   expect(await page.locator('.lesson-sources a').count()===1,'independent further-reading link visible');
   const bounds=await mobileOverflow(page);
   expect(bounds.scroll<=bounds.width+8,'added case fits mobile width');
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded'});
   await page.locator('.worked-example').waitFor();
   expect((await page.locator('.worked-example').textContent()).includes('₱14,100'),'applied practice remains available offline');
   await context.setOffline(false);
 });


 await smoke('complete-original-foundation-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
   await page.goto(BASE+'/#/lesson/languages/chunks',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect(await page.locator('.lesson-content section[id^="lesson-section-"]').count()===3,'original language foundation lesson now has full teaching structure');
   expect((await page.locator('.worked-example:not(.deep-worked-case)').textContent()).includes('station'),'original language case is shown in reader');
   expect(await page.locator('.lesson-sources a').count()>=1,'further-reading source is available');
   const bounds=await mobileOverflow(page);
   expect(bounds.scroll<=bounds.width+8,'foundation case fits small phone');
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded'});
   await page.locator('.worked-example:not(.deep-worked-case)').waitFor();
   expect((await page.locator('.worked-example:not(.deep-worked-case)').textContent()).includes('station'),'new lesson remains offline');
   await context.setOffline(false);
 });


 await smoke('guided-subject-skills-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
   await page.goto(BASE+'/#/lesson/thinking/arguments',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   const list=page.locator('.practice-guide-steps li');
   expect(await list.count()===2,'advanced thinking lesson has two distinct skill-transfer prompts');
   expect((await list.first().textContent()).includes('rebuttal'),'the first challenge tests a counterargument');
   const bounds=await mobileOverflow(page);
   expect(bounds.scroll<=bounds.width+8,'reflection layout fits mobile');
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded'});
   expect(await page.locator('.practice-guide-steps li').count()===2,'guided prompts remain available offline');
   await context.setOffline(false);
 });


 await smoke('critical-foundation-money-practice-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
   await page.goto(BASE+'/#/lesson/savings/debt',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   const text=await page.locator('.reading-page').textContent();
   expect(text.includes('₱2,400'),'realistic loan comparison included in original task');
   expect(text.includes('installment'),'cost method is explained');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,'case material fits narrow mobile viewport');
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded'});
   expect((await page.locator('.reading-page').textContent()).includes('₱2,400'),'loan practice readable offline');
   await context.setOffline(false);
 });


 await smoke('general-foundation-pricing-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
   await page.goto(BASE+'/#/lesson/business/pricing',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect((await page.locator('.reading-page').textContent()).includes('₱14,100'),'concrete break-even assignment in original business lesson');
   const width=await mobileOverflow(page);
   expect(width.scroll<=width.width+8,'business scenario fits phone');
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded'});
   expect((await page.locator('.reading-page').textContent()).includes('₱14,100'),'business scenario persists offline');
   await context.setOffline(false);
 });


 await smoke('applied-reasoning-foundation-offline',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page,context)=>{
   await page.goto(BASE+'/#/lesson/science/probability',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   expect((await page.locator('.reading-page').textContent()).includes('2 in 1,000'),'statistical risk exercise present in original science lesson');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,'science reading fits narrow phone');
   await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
   await context.setOffline(true);
   await page.reload({waitUntil:'domcontentloaded'});
   expect((await page.locator('.reading-page').textContent()).includes('2 in 1,000'),'scientific reasoning remains offline');
   await context.setOffline(false);
 });


 await smoke('advanced-curriculum-practice-filter',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page)=>{
   await page.goto(BASE+'/#/exam',{waitUntil:'domcontentloaded'});
   await page.locator('#exam-stage').selectOption('Advanced');
   await page.locator('#exam-size').selectOption('20');
   await page.locator('[data-action="exam-start"]').click();
   await page.locator('.exam-options').waitFor();
   const state=await getState(page);
   expect(state.exam.ids.length===20,'advanced practice samples 20 available lessons');
   expect(state.exam.ids.every(key=>{
      const [cid,lid]=key.split(':');
      const subject=COURSES.find(c=>c.id===cid);
      return subject&&!subject.dark&&subject.lessons.find(l=>l.id===lid)?.stage==='Advanced';
   }),'advanced practice contains only advanced lessons, never mature library material');
   const overflow=await mobileOverflow(page);
   expect(overflow.scroll<=overflow.width+8,'level-scoped exam fits mobile');
   await page.reload({waitUntil:'domcontentloaded'});
   expect((await getState(page)).exam.ids.length===20,'stage-scoped exam resumes normally');
   await page.locator('[data-action="exam-discard"]').click();
   await page.locator('[data-action="exam-discard-confirm"]').click();
   await page.locator('#exam-course').selectOption('psychology');
   await page.locator('#exam-stage').selectOption('Intermediate');
   await page.locator('#exam-size').selectOption('5');
   await page.locator('[data-action="exam-start"]').click();
   const focused=await getState(page);
   expect(focused.exam.ids.every(key=>{
     const [cid,lid]=key.split(':');
     return cid==='psychology'&&COURSES.find(c=>c.id===cid).lessons.find(l=>l.id===lid)?.stage==='Intermediate';
   }),'subject and level filters compose safely');
 });

 await smoke('portable-editorial-review-mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},async(page)=>{
   const html=await readFile('artifacts/editorial-review-packet.html','utf8');
   await page.setContent(html,{waitUntil:'domcontentloaded'});
   expect(await page.locator('.review-item').count()===181,'external review HTML includes all 139 lessons and 42 decisions');
   expect(await page.locator('nav[aria-label="Review subjects"] a').count()===14,'all subjects appear in the accessible review index');
   const item=page.locator('#lesson-psychology-thoughts');
   await item.locator('summary').focus();
   await page.keyboard.press('Enter');
   expect(await item.getAttribute('open')!==null,'keyboard can reveal a complete authored lesson and answer key');
   expect((await item.textContent()).includes('SHA-256'),'review copy exposes precise content provenance for verification');
   const bounds=await mobileOverflow(page);
   expect(bounds.scroll<=bounds.width+8,'editorial review copy remains readable on narrow viewports');
   await page.screenshot({path:snapshots+'/editorial-review-mobile.png',fullPage:true});
 });


}finally{
 if(browser)await browser.close();
 server.kill('SIGTERM');
}
clearTimeout(watchdog);
if(failures)throw Error(failures+' browser smoke scenario(s) failed. Check screenshots and logs.');
console.log('\nAll real Chromium browser smoke scenarios passed.');
