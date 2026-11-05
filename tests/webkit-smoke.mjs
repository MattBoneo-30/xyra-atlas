/** WebKit engine regression on Linux — complements Chromium, not a substitute for physical iOS Safari. */
import {spawn} from 'node:child_process';
import {strict as assert} from 'node:assert';
import {mkdir} from 'node:fs/promises';
import {webkit} from 'playwright';

const PORT=42752,BASE='http://127.0.0.1:'+PORT;
const output='artifacts/browser-webkit';
await mkdir(output,{recursive:true});
const server=spawn(process.execPath,['scripts/serve.mjs'],{
 cwd:process.cwd(),env:{...process.env,PORT:String(PORT)},stdio:['ignore','pipe','pipe']
});
const serverOutput=[];
server.stdout.on('data',chunk=>serverOutput.push(String(chunk)));
server.stderr.on('data',chunk=>serverOutput.push(String(chunk)));
let browser;
const watchdog=setTimeout(()=>{console.error('WebKit regression exceeded two minutes.');process.exit(2);},120000);
watchdog.unref();
async function ready(){
 for(let i=0;i<90;i++){
  if(server.exitCode!==null)throw Error('Preview stopped: '+serverOutput.join(''));
  try{if((await fetch(BASE+'/')).ok)return;}catch{}
  await new Promise(resolve=>setTimeout(resolve,350));
 }
 throw Error('Timed out starting preview: '+serverOutput.join(''));
}
async function checkScenario(name,options,run){
 const context=await browser.newContext(options),page=await context.newPage();
 const errors=[];
 page.setDefaultTimeout(13000);
 page.on('pageerror',error=>errors.push(error.message));
 try{
  await page.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  await page.locator('#app main').first().waitFor();
  await run(page);
  assert.deepEqual(errors,[],'No uncaught WebKit script errors');
  console.log('PASS WebKit '+name);
 }catch(error){
  console.error('FAIL WebKit '+name+': '+(error.stack||error));
  console.error('Uncaught page errors:',errors);
  try{await page.screenshot({path:output+'/'+name+'-failure.png',fullPage:true});}catch{}
  throw error;
 }finally{await context.close();}
}
async function noHorizontalOverflow(page){
 const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
 assert.ok(dimensions.scroll<=dimensions.width+8,'Unexpected horizontal overflow '+JSON.stringify(dimensions));
}
try{
 await ready();
 browser=await webkit.launch({headless:true});
 await checkScenario('mobile-pwa-status-bar-safe-area',
  {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},
  async page=>{
   // Linux WebKit cannot emulate a hardware notch; simulate safe-area geometry in CSS.
   await page.evaluate(()=>document.documentElement.style.setProperty('--app-safe-top','47px'));
   const geometry=await page.evaluate(()=>{
    const bar=document.querySelector('.topbar');
    return {height:bar.getBoundingClientRect().height,padding:parseFloat(getComputedStyle(bar).paddingTop),innerTop:bar.querySelector('.topbar-inner').getBoundingClientRect().top,skipBottom:document.querySelector('.skip-link').getBoundingClientRect().bottom};
   });
   assert.ok(Math.abs(geometry.height-117)<1 && geometry.padding===47 && geometry.innerTop>=47,'standalone header reserves top inset');
   assert.ok(geometry.skipBottom<=0,'unfocused skip link stays above the visible status bar');
   await page.keyboard.press('Tab');
   const focusedSkip=await page.locator('#skip-content').boundingBox();
   assert.ok(focusedSkip && focusedSkip.y>=57,'keyboard skip shortcut appears beneath the status bar');
   await page.locator('.topbar [data-action="app-update-open"]').click();
   await page.locator('.modal-card').waitFor({state:'visible'});
   const modal=await page.locator('.modal-card').boundingBox();
   assert.ok(modal && modal.y>=59,'dialog clears simulated top safe area');
  });
 await checkScenario('mobile-lesson-and-decisions',
  {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},
  async page=>{
   await page.goto(BASE+'/#/course/laws',{waitUntil:'domcontentloaded'});
   await page.locator('.clinic-panel').waitFor();
   assert.equal(await page.locator('.clinic-question').count(),3);
   await noHorizontalOverflow(page);
   await page.locator('.clinic-question').first().locator('.clinic-choice').first().click();
   await page.locator('.clinic-feedback').first().waitFor();
   await page.goto(BASE+'/#/lesson/laws/privacy-law',{waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   assert.equal(await page.locator('.practice-guide-steps li').count(),2);
   await noHorizontalOverflow(page);
   await page.screenshot({path:output+'/webkit-mobile-reading.png',fullPage:true});
   await page.reload({waitUntil:'domcontentloaded'});
   await page.locator('.reading-page').waitFor();
   assert.equal(await page.locator('.practice-guide-steps li').count(),2);
  });
 await checkScenario('mobile-illustrated-stage-roadmap',
  {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},
  async page=>{
   await page.goto(BASE+'/#/course/psychology',{waitUntil:'domcontentloaded'});
   await page.locator('.curriculum-world-preview').first().waitFor();
   assert.equal(await page.locator('.curriculum-world-preview').count(),3);
   for(const stage of ['Beginner','Intermediate','Advanced']){
    const image=page.locator('.curriculum-world-preview[data-id="'+stage+'"] img');
    const src=await image.getAttribute('src');
    assert.equal(src,'/assets/world-psychology-'+stage.toLowerCase()+'.svg');
    // Images use loading=lazy: scroll them into view before awaiting a loaded state.
    // WebKit can leave offscreen decode() promises pending indefinitely.
    console.log('WebKit roadmap: loading '+stage+' world');
    await image.scrollIntoViewIfNeeded({timeout:9000});
    const selector='.curriculum-world-preview[data-id="'+stage+'"] img';
    await page.waitForFunction(css=>{
     const img=document.querySelector(css);
     return Boolean(img&&img.complete&&img.naturalWidth>0&&img.naturalHeight>0);
    },selector,{timeout:8500});
    const decoded=await image.evaluate(el=>({
     width:el.naturalWidth,height:el.naturalHeight,complete:el.complete
    }));
   // Mobile WebKit can report a subsampled intrinsic SVG size; verify successful 2:1 decoding
   // rather than assuming naturalWidth matches the SVG's nominal 1400 CSS pixels.
   assert.ok(decoded.complete&&decoded.width>=200&&decoded.height>=90&&
     Math.abs(decoded.width/decoded.height-2)<.075,
     'stage artwork must decode at a valid two-to-one aspect ratio');
   }
   console.log('WebKit roadmap: all three stage images decoded; selecting Advanced');
   await page.locator('.curriculum-world-preview[data-id="Advanced"]').click({timeout:9000});
   assert.equal(await page.locator('.course-stage-button[data-id="Advanced"]').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#course-lessons-heading').evaluate(el=>document.activeElement===el),true);
   await noHorizontalOverflow(page);
   // Capturing a very tall full-page image can hang Linux WebKit when large lazy SVGs are present.
   // The visible viewport still provides a useful layout proof and returns within a bounded timeout.
   console.log('WebKit roadmap: viewport screenshot');
   await page.screenshot({path:output+'/webkit-mobile-stage-roadmap.png',fullPage:false,timeout:10000});
  });
 await checkScenario('desktop-navigation-and-advanced-exam',
  {viewport:{width:1366,height:900}},
  async page=>{
   await page.locator('.desktop-rail [data-action="nav"][data-id="explore"]').click();
   await page.waitForFunction(()=>location.hash.includes('#/explore'));
   await page.goto(BASE+'/#/exam',{waitUntil:'domcontentloaded'});
   await page.locator('#exam-stage').selectOption('Advanced');
   await page.locator('#exam-size').selectOption('5');
   await page.locator('[data-action="exam-start"]').click();
   await page.locator('.exam-options').waitFor();
   await noHorizontalOverflow(page);
   await page.screenshot({path:output+'/webkit-desktop-advanced-exam.png',fullPage:true});
  });
 console.log('All WebKit engine regression scenarios passed (Linux engine only; physical iOS validation remains outstanding).');
}finally{
 clearTimeout(watchdog);
 if(browser)await browser.close();
 server.kill('SIGTERM');
}
