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
    assert.equal(await image.evaluate(async el=>{await el.decode();return el.naturalWidth}),1400);
   }
   await page.locator('.curriculum-world-preview[data-id="Advanced"]').click();
   assert.equal(await page.locator('.course-stage-button[data-id="Advanced"]').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#course-lessons-heading').evaluate(el=>document.activeElement===el),true);
   await noHorizontalOverflow(page);
   await page.screenshot({path:output+'/webkit-mobile-stage-roadmap.png',fullPage:true});
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
