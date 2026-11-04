/* Xyra Atlas: privacy-first, same-origin offline app shell. */
const CACHE_PREFIX = 'xyra-atlas-';
const CACHE = CACHE_PREFIX + 'v71';
const APP_SHELL = [
  '/', '/index.html', '/styles.css', '/app.js', '/data.js', '/review.js', '/phrasebook.js', '/voicecoach.js', '/phrasereview.js', '/languagechallenge.js', '/conversationquest.js', '/deeptracks.js', '/fieldnotes.js', '/studio.js', '/paths.js', '/scenarios.js', '/atlasmap.js', '/dailyquest.js', '/glossary.js', '/search.js', '/calendar.js', '/insights.js',
  '/fieldguides.js', '/lifepractice.js', '/masterytracks.js', '/capstonelabs.js', '/phcasework.js', '/advancedenrichments.js', '/foundationcases.js', '/foundationcases2.js', '/criticalfoundation.js', '/generalfoundation.js', '/appliedfoundation.js', '/practiceguides.js', '/capstonechecks.js', '/mentor.js', '/casebook.js', '/reader.js', '/visualmap.js', '/chapterart.js', '/narration.js', '/storagehealth.js', '/offline.js', '/backup.js', '/backupcrypto.js', '/datacontrols.js', '/curriculumpath.js', '/clinics.js', '/advanceddecisions.js', '/notebook.js', '/mistakes.js', '/exam.js', '/examhistory.js', '/focusedexam.js', '/personalcards.js', '/manifest.webmanifest', '/assets/atlas-mark.svg',
  '/assets/atlas-horizon.svg', '/assets/atlas-archive-gate.svg', '/assets/atlas-lantern-library.svg', '/assets/atlas-starlit-garden.svg', '/assets/chapter-privacy-observatory.svg', '/assets/chapter-security-sanctum.svg', '/assets/chapter-business-atelier.svg', '/assets/chapter-science-glasshouse.svg', '/assets/chapter-interpretation-crossroads.svg', '/assets/chapter-cash-weatherhouse.svg', '/assets/chapter-clockwork-schedule.svg', '/assets/chapter-language-teahouse.svg', '/assets/chapter-feedback-bridge.svg', '/assets/chapter-evidence-prism.svg', '/assets/chapter-portfolio-forge.svg', '/assets/chapter-boundary-garden.svg', '/assets/chapter-offer-market.svg', '/assets/chapter-protective-lantern.svg', '/assets/xyra-guide.svg', '/assets/course-library.svg',
  '/assets/course-business.svg',
  '/assets/course-career.svg',
  '/assets/course-communication.svg',
  '/assets/course-digital.svg',
  '/assets/course-languages.svg',
  '/assets/course-laws.svg',
  '/assets/course-negotiation.svg',
  '/assets/course-psychology.svg',
  '/assets/course-relationships.svg',
  '/assets/course-savings.svg',
  '/assets/course-science.svg',
  '/assets/course-shadow.svg',
  '/assets/course-thinking.svg',
  '/assets/course-time.svg',
  '/assets/xyra-corner.svg',
  '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'
];
// A complete, versioned cache is prepared before the new worker activates.
// Do not skipWaiting during installation: it could replace an in-use app whose
// JavaScript modules and offline assets still belong to the previous version.
const SHELL_PATHS=new Set(APP_SHELL);
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE)
   .map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
async function offlineStatus(){
 const cache=await caches.open(CACHE);
 const results=await Promise.all(APP_SHELL.map(async path=>{
  try{
   const response=await cache.match(path);
   return {path,ok:Boolean(response&&response.ok)};
  }catch{
   // A transient read error is not evidence that this file is safely available offline.
   return {path,ok:false};
  }
 }));
 const missing=results.filter(x=>!x.ok).map(x=>x.path);
 const cached=APP_SHELL.length-missing.length;
 return {cached,total:APP_SHELL.length,ready:missing.length===0,version:CACHE,missing};
}
let repairJob=null;
function offlineRepair(){
 if(!repairJob){
  repairJob=(async()=>{
   const cache=await caches.open(CACHE);
   const missing=(await Promise.all(APP_SHELL.map(async path=>{
    const r=await cache.match(path);
    return r&&r.ok?null:path;
   }))).filter(Boolean);
   // Failed requests stay missing and are reported; never claim success on errors.
   await Promise.allSettled(missing.map(path=>cache.add(path)));
   return offlineStatus();
  })().finally(()=>{repairJob=null;});
 }
 return repairJob;
}
self.addEventListener('message',event=>{
 const type=event.data?.type;
 if(type==='ATLAS_ACTIVATE_UPDATE'){
  // Only a deliberately prompted user action in the client sends this message.
  event.waitUntil(self.skipWaiting());
  return;
 }
 const port=event.ports?.[0];
 if(!port||!['ATLAS_OFFLINE_STATUS','ATLAS_REPAIR_OFFLINE'].includes(type))return;
 event.waitUntil((async()=>{
  try{port.postMessage(type==='ATLAS_OFFLINE_STATUS'?await offlineStatus():await offlineRepair());}
  catch{port.postMessage({error:'Unable to inspect offline files'});}
 })());
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith((async()=>{
   try{const live=await fetch(req);if(live.ok)return live;}catch{}
   // Only the active release cache can supply a navigation fallback.
   const current=await caches.open(CACHE);
   return await current.match('/index.html')||Response.error();
  })());
  return;
 }
 // Do not silently cache arbitrary same-origin responses, user data or URLs.
 if(!SHELL_PATHS.has(url.pathname))return;
 event.respondWith((async()=>{
  const current=await caches.open(CACHE);
  const cached=await current.match(url.pathname);
  if(cached?.ok)return cached;
  const live=await fetch(req);
  if(live.ok&&!url.search){
   // Put a verified same-origin asset in this release cache before resolving.
   // Cache-write errors do not block an otherwise valid online response.
   try{await current.put(url.pathname,live.clone());}catch{}
  }
  return live;
 })());
});
