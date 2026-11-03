/** Public author-supplied reference URL health monitoring.
 * No learner data, notes, credentials, browser state, or tracking identifiers.
 * HTTP reachability is NOT subject-matter accuracy or independent expert review.
 */
const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
export function isSafeReferenceURL(value){
 if(typeof value!=='string'||value.length>1800)return false;
 try{
  const u=new URL(value);
  if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443')return false;
  const host=u.hostname.toLowerCase();
  if(host==='localhost'||host.endsWith('.local')||host.endsWith('.internal')||
   host.endsWith('.localhost')||host==='0.0.0.0'||/^\d+(?:\.\d+){3}$/.test(host)||host.includes(':')||
   !host.includes('.'))return false;
  return true;
 }catch{return false;}
}
export function authoredCourseLinks(courses,clinics={}){
 const known=new Map();
 const add=(ref,origin)=>{
  if(!record(ref)||!isSafeReferenceURL(ref.url))return;
  if(!known.has(ref.url))known.set(ref.url,{url:ref.url,label:typeof ref.label==='string'?ref.label:'Further reading',usedBy:[]});
  known.get(ref.url).usedBy.push(origin);
 };
 for(const course of Array.isArray(courses)?courses:[]){
  if(!record(course)||!Array.isArray(course.lessons)||typeof course.id!=='string')continue;
  for(const lesson of course.lessons)for(const r of Array.isArray(lesson?.sources)?lesson.sources:[])add(r,course.id+':'+lesson.id);
 }
 for(const [id,clinic] of Object.entries(record(clinics)?clinics:{})){
  for(const r of Array.isArray(clinic?.references)?clinic.references:[])add(r,id+':decision-clinic');
 }
 return [...known.values()].map(item=>({...item,usedBy:[...new Set(item.usedBy)]})).sort((a,b)=>a.url.localeCompare(b.url));
}
export function sourceHTTPStatus(status){
 if(Number.isInteger(status)&&status>=200&&status<300)return 'reachable';
 if(Number.isInteger(status)&&status>=300&&status<400)return 'unresolved-redirect';
 if(status===401||status===403||status===429)return 'restricted-or-rate-limited';
 if(status===404||status===410)return 'missing';
 return 'uncertain';
}
const REDIRECT_CODES=new Set([301,302,303,307,308]);
const MAX_REDIRECTS=5;
async function followSafePublicRedirects(url,request,method,timeoutMs){
 let current=url,redirects=0;
 const visited=new Set();
 while(true){
  if(visited.has(current))return {status:'redirect-loop',httpStatus:null,finalUrl:current,redirects};
  visited.add(current);
  // Never ask the HTTP client to follow a redirect before its destination is validated.
  const response=await request(current,{method,redirect:'manual',signal:AbortSignal.timeout(timeoutMs),
   headers:{'User-Agent':'XyraAtlasLinkReview/1.1 (public education source check; no learner data)'}});
  const status=response.status;
  if(REDIRECT_CODES.has(status)){
   const location=response.headers?.get?.('location')||null;
   try{await response.body?.cancel();}catch{}
   if(!location)return {status:'unresolved-redirect',httpStatus:status,finalUrl:current,redirects};
   let next;
   try{next=new URL(location,current).href;}catch{
    return {status:'unsafe-redirect',httpStatus:status,finalUrl:current,redirects};
   }
   if(!isSafeReferenceURL(next))return {status:'unsafe-redirect',httpStatus:status,finalUrl:current,redirects};
   if(visited.has(next))return {status:'redirect-loop',httpStatus:status,finalUrl:current,redirects};
   if(redirects===MAX_REDIRECTS)return {status:'redirect-limit',httpStatus:status,finalUrl:current,redirects};
   current=next;redirects++;
   continue;
  }
  // Only the HTTP status is needed, not the article body or personal browser state.
  try{await response.body?.cancel();}catch{}
  return {status:sourceHTTPStatus(status),httpStatus:status,finalUrl:current,redirects};
 }
}
export async function probePublicSource(url,request=fetch,timeoutMs=6500){
 if(!isSafeReferenceURL(url))return {url,status:'invalid-public-url',httpStatus:null};
 let last=null,lastError='';
 for(const method of ['HEAD','GET']){
  try{
   last={url,method,...await followSafePublicRedirects(url,request,method,timeoutMs)};
   if(last.status==='reachable'||['unsafe-redirect','redirect-loop','redirect-limit'].includes(last.status))return last;
   if(method==='GET')return last;
  }catch(error){
   lastError=error instanceof Error?error.name:'RequestError';
  }
 }
 return last?{...last,fallbackError:lastError||undefined}:
  {url,status:'network-error',httpStatus:null,method:'GET',error:lastError};
}
export async function inspectPublicSources(links,request=fetch,concurrency=4){
 const all=Array.isArray(links)?links:[];
 if(!Number.isInteger(concurrency)||concurrency<1||concurrency>12)throw Error('Invalid check concurrency.');
 const out=new Array(all.length);
 let current=0;
 await Promise.all(Array.from({length:Math.min(concurrency,all.length)},async()=>{
  while(current<all.length){
   const index=current++;
   const source=all[index];
   if(!record(source)||!isSafeReferenceURL(source.url)){
    out[index]={url:source?.url??null,status:'invalid-public-url',httpStatus:null};
    continue;
   }
   const result=await probePublicSource(source.url,request);
   out[index]={...source,...result};
  }
 }));
 return out;
}
