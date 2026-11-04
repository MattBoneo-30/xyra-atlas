/** Offline pack reporting is informational and never includes private learner data. */
export function normalizeOfflineReport(value){
 const r=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const total=Number.isInteger(r.total)&&r.total>0&&r.total<=1000?r.total:0;
 const cached=Number.isInteger(r.cached)&&r.cached>=0?Math.min(r.cached,total):0;
 const missing=Array.isArray(r.missing)?[...new Set(r.missing.filter(path=>
  typeof path==='string'&&(path==='/'||
   path.length<=140&&/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:js|css|html|svg|png|webmanifest)$/.test(path))
 ))].slice(0,1000):null;
 const ready=Boolean(total&&cached===total&&r.ready===true&&(!missing||missing.length===0));
 return {total,cached,ready,percent:total?Math.round(cached/total*100):0,
  version:typeof r.version==='string'&&/^xyra-atlas-v\d+$/.test(r.version)?r.version:'unknown',
  ...(missing?{missing}: {})};
}
export function offlineAdvice(state){
 return ({
  idle:'Verify the offline files before relying on Atlas without a signal.',
  checking:'Checking required lessons and images already stored on this device…',
  repairing:'Downloading missing learning files…',
  ready:'The complete learning library is cached for offline use on this device.',
  incomplete:'Some learning files are missing. Connect to the internet to repair the offline library.',
  unsupported:'This browser does not support the offline service worker. Atlas works while connected.',
  installing:'The offline worker is not active yet. Reload while connected and check again.',
  error:'The offline library could not be inspected. Check your connection and retry.'
 })[state]||'Check the offline library before travelling.';
}
