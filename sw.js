/* Xyra Atlas: privacy-first, same-origin offline app shell. */
const CACHE = 'xyra-atlas-v11';
const APP_SHELL = [
  '/', '/index.html', '/styles.css', '/app.js', '/data.js', '/review.js', '/phrasebook.js', '/deeptracks.js', '/fieldnotes.js', '/studio.js', '/paths.js', '/scenarios.js', '/atlasmap.js', '/dailyquest.js',
  '/manifest.webmanifest', '/assets/atlas-mark.svg',
  '/assets/atlas-horizon.svg', '/assets/course-library.svg',
  '/assets/course-business.svg',
  '/assets/course-career.svg',
  '/assets/course-communication.svg',
  '/assets/course-digital.svg',
  '/assets/course-languages.svg',
  '/assets/course-laws.svg',
  '/assets/course-library.svg',
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
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
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
