/* Xyra Atlas: privacy-first, same-origin offline app shell. */
const CACHE_PREFIX = 'xyra-atlas-';
const CACHE = CACHE_PREFIX + 'v84';
const APP_SHELL = [
  '/', '/index.html', '/styles.css', '/language-path.css', '/study-bridges.css', '/literacy-studio.css', '/languageliteracy.js', '/literacychecks1.js', '/literacychecks2.js', '/practical-studio.css', '/practicalstudios.js', '/practicalstudios1.js', '/practicalstudios2.js', '/sentencebridges.js', '/sentencebridges1.js', '/sentencebridges2.js', '/sentence-bridges.css', '/decisionrevisions.js', '/decisionrevisions1.js', '/decisionrevisions2.js', '/decision-revisions.css', '/beginnerworkshops.js', '/beginnerworkshops1.js', '/beginnerworkshops2.js', '/beginner-workshops.css', '/portfoliojourneys.js', '/portfoliojourneys1.js', '/portfoliojourneys2.js', '/portfolio-journeys.css', '/responsesimulations.js', '/responsesimulations1.js', '/responsesimulations2.js', '/response-simulations.css', '/app.js', '/data.js', '/review.js', '/phrasebook.js', '/japanesefoundation.js', '/kanareview.js', '/japaneserows.js', '/japanesepath2.js', '/depthcurriculum.js', '/foundationdepth.js', '/foundationdepth1.js', '/foundationdepth2.js', '/intermediatedepth.js', '/advanceddepth.js', '/scienceastronomy.js', '/transferlabs.js', '/transferlabs1.js', '/transferlabs2.js', '/crosssubjectmissions.js', '/crosssubjectmissions1.js', '/crosssubjectmissions2.js', '/evidenceinquiries.js', '/evidenceinquiries1.js', '/evidenceinquiries2.js', '/foundationdiagnostics.js', '/foundationdiagnostics1.js', '/foundationdiagnostics2.js', '/advancedcases1.js', '/advancedcases2.js', '/voicecoach.js', '/phrasereview.js', '/languagechallenge.js', '/conversationquest.js', '/languagestarterpaths.js', '/deeptracks.js', '/fieldnotes.js', '/studio.js', '/paths.js', '/scenarios.js', '/atlasmap.js', '/dailyquest.js', '/glossary.js', '/search.js', '/calendar.js', '/insights.js',
  '/fieldguides.js', '/lifepractice.js', '/masterytracks.js', '/capstonelabs.js', '/phcasework.js', '/advancedenrichments.js', '/foundationcases.js', '/foundationcases2.js', '/criticalfoundation.js', '/generalfoundation.js', '/appliedfoundation.js', '/practiceguides.js', '/capstonechecks.js', '/mentor.js', '/casebook.js', '/reader.js', '/visualmap.js', '/chapterart.js', '/stageart.js', '/narration.js', '/storagehealth.js', '/offline.js', '/backup.js', '/backupcrypto.js', '/datacontrols.js', '/curriculumpath.js', '/clinics.js', '/advanceddecisions.js', '/notebook.js', '/mistakes.js', '/exam.js', '/examhistory.js', '/focusedexam.js', '/personalcards.js', '/manifest.webmanifest', '/assets/atlas-mark.svg',
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
  '/assets/world-psychology-beginner.svg', '/assets/world-psychology-intermediate.svg', '/assets/world-psychology-advanced.svg', '/assets/world-laws-beginner.svg', '/assets/world-laws-intermediate.svg', '/assets/world-laws-advanced.svg', '/assets/world-business-beginner.svg', '/assets/world-business-intermediate.svg', '/assets/world-business-advanced.svg', '/assets/world-savings-beginner.svg', '/assets/world-savings-intermediate.svg', '/assets/world-savings-advanced.svg', '/assets/world-time-beginner.svg', '/assets/world-time-intermediate.svg', '/assets/world-time-advanced.svg', '/assets/world-languages-beginner.svg', '/assets/world-languages-intermediate.svg', '/assets/world-languages-advanced.svg', '/assets/world-communication-beginner.svg', '/assets/world-communication-intermediate.svg', '/assets/world-communication-advanced.svg', '/assets/world-thinking-beginner.svg', '/assets/world-thinking-intermediate.svg', '/assets/world-thinking-advanced.svg', '/assets/world-digital-beginner.svg', '/assets/world-digital-intermediate.svg', '/assets/world-digital-advanced.svg', '/assets/world-career-beginner.svg', '/assets/world-career-intermediate.svg', '/assets/world-career-advanced.svg', '/assets/world-science-beginner.svg', '/assets/world-science-intermediate.svg', '/assets/world-science-advanced.svg', '/assets/world-relationships-beginner.svg', '/assets/world-relationships-intermediate.svg', '/assets/world-relationships-advanced.svg', '/assets/world-negotiation-beginner.svg', '/assets/world-negotiation-intermediate.svg', '/assets/world-negotiation-advanced.svg', '/assets/world-shadow-beginner.svg', '/assets/world-shadow-intermediate.svg', '/assets/world-shadow-advanced.svg',
  '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'
];
// A complete, versioned cache is prepared before the new worker activates.
// Do not skipWaiting during installation: it could replace an in-use app whose
// JavaScript modules and offline assets still belong to the previous version.
const SHELL_PATHS=new Set(APP_SHELL);
// Transient CacheStorage failures must not prevent a healthy network fallback.
async function readCached(cache,path){
 if(!cache)return null;
 try{return await cache.match(path);}
 catch{return null;}
}
async function openCurrentCache(){
 try{return await caches.open(CACHE);}
 catch{return null;}
}
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
 const cache=await openCurrentCache();
 // An unreadable cache must report incomplete status, not a misleading success.
 const results=await Promise.all(APP_SHELL.map(async path=>{
  const response=await readCached(cache,path);
  return {path,ok:Boolean(response&&response.ok)};
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
    const r=await readCached(cache,path);
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
   const current=await openCurrentCache();
   return (await readCached(current,'/index.html'))||Response.error();
  })());
  return;
 }
 // Do not silently cache arbitrary same-origin responses, user data or URLs.
 if(!SHELL_PATHS.has(url.pathname))return;
 event.respondWith((async()=>{
  const current=await openCurrentCache();
  const cached=await readCached(current,url.pathname);
  if(cached?.ok)return cached;
  try{
   const live=await fetch(req);
   if(current&&live.ok&&!url.search){
    // A failed cache write must never block a valid online response.
    try{await current.put(url.pathname,live.clone());}catch{}
   }
   return live;
  }catch{
   // A broken cache combined with no network is a genuine offline miss,
   // not an unhandled rejection that can break the application's load.
   return Response.error();
  }
 })());
});
