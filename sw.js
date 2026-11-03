/* Xyra Atlas: privacy-first, same-origin offline app shell. */
const CACHE_PREFIX = 'xyra-atlas-';
const CACHE = CACHE_PREFIX + 'v34';
const APP_SHELL = [
  '/', '/index.html', '/styles.css', '/app.js', '/data.js', '/review.js', '/phrasebook.js', '/deeptracks.js', '/fieldnotes.js', '/studio.js', '/paths.js', '/scenarios.js', '/atlasmap.js', '/dailyquest.js', '/glossary.js', '/search.js', '/calendar.js', '/insights.js',
  '/fieldguides.js', '/lifepractice.js', '/mentor.js', '/casebook.js', '/reader.js', '/visualmap.js', '/narration.js', '/storagehealth.js', '/offline.js', '/backup.js', '/notebook.js', '/mistakes.js', '/manifest.webmanifest', '/assets/atlas-mark.svg',
  '/assets/atlas-horizon.svg', '/assets/xyra-guide.svg', '/assets/course-library.svg',
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
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
async function offlineStatus(){
 const cache=await caches.open(CACHE);
 const stored=await Promise.all(APP_SHELL.map(path=>cache.match(path).then(Boolean)));
 const count=stored.filter(Boolean).length;
 return {cached:count,total:APP_SHELL.length,ready:count===APP_SHELL.length,version:CACHE};
}
async function offlineRepair(){
 const cache=await caches.open(CACHE);
 const missing=(await Promise.all(APP_SHELL.map(async path=>(await cache.match(path))?null:path))).filter(Boolean);
 await Promise.allSettled(missing.map(path=>cache.add(path)));
 return offlineStatus();
}
self.addEventListener('message',event=>{
 const type=event.data?.type,port=event.ports?.[0];
 if(!port||!['ATLAS_OFFLINE_STATUS','ATLAS_REPAIR_OFFLINE'].includes(type))return;
 event.waitUntil((async()=>{
  try{port.postMessage(type==='ATLAS_OFFLINE_STATUS'?await offlineStatus():await offlineRepair());}
  catch{port.postMessage({error:'Unable to inspect offline files'});}
 })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(res => res.ok ? res : Promise.reject(new Error('offline')))
      .catch(() => caches.match('/index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
    }
    return response;
  })));
});
