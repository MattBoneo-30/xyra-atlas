import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {isSafeReferenceURL,authoredCourseLinks,sourceHTTPStatus,probePublicSource,inspectPublicSources} from '../sourcehealth.js';
test('source checks read only author-created public HTTPS references',()=>{
 const links=authoredCourseLinks(COURSES,CLINICS);
 assert.ok(links.length>=35);
 assert.equal(new Set(links.map(x=>x.url)).size,links.length);
 assert.ok(links.every(x=>isSafeReferenceURL(x.url)&&x.usedBy.length>=1));
 for(const bad of ['http://example.com','https://localhost/','https://127.0.0.1/','https://[::1]/',
    'https://user:password@example.com','https://private.internal/docs','https://example.com:444/a']){
  assert.equal(isSafeReferenceURL(bad),false,bad);
 }
 assert.equal(isSafeReferenceURL('https://privacy.gov.ph/right-to-access/'),true);
});
test('HTTP classifications avoid claiming a 403 or 429 means a false citation',()=>{
 assert.equal(sourceHTTPStatus(200),'reachable');
 assert.equal(sourceHTTPStatus(302),'reachable');
 assert.equal(sourceHTTPStatus(403),'restricted-or-rate-limited');
 assert.equal(sourceHTTPStatus(429),'restricted-or-rate-limited');
 assert.equal(sourceHTTPStatus(404),'missing');
 assert.equal(sourceHTTPStatus(503),'uncertain');
});
test('probes fall back to GET when HEAD cannot confirm a page',async()=>{
 const methods=[],request=async(_url,{method})=>{
  methods.push(method);return {status:method==='HEAD'?405:200,body:null};
 };
 const result=await probePublicSource('https://example.com/a',request,1000);
 assert.equal(result.status,'reachable');
 assert.equal(result.method,'GET');
 assert.deepEqual(methods,['HEAD','GET']);
});
test('offline unit mocks keep network checks deterministic and bounded',async()=>{
 const urls=[{url:'https://example.com/a',label:'A',usedBy:['sample:a']},{url:'https://example.org/b',label:'B',usedBy:['sample:b']}];
 let hits=0;
 const mock=async()=>{hits++;return {status:200,body:null};};
 const out=await inspectPublicSources(urls,mock,2);
 assert.equal(out.length,2);
 assert.ok(out.every(x=>x.status==='reachable'));
 assert.equal(hits,2);
 await assert.rejects(()=>inspectPublicSources(urls,mock,0));
 const workflow=fs.readFileSync('.github/workflows/public-sources.yml','utf8');
 assert.match(workflow,/workflow_dispatch/);
 assert.match(workflow,/schedule:/);
 assert.match(workflow,/public-source-health\.json/);
});
