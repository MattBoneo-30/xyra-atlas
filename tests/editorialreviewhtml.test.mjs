import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';
test('HTML reviewer copy includes all full authored records and immutable source hashes',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS),html=renderEditorialReviewHTML(packet);
 assert.equal((html.match(/class="review-item"/g)||[]).length,176);
 assert.equal((html.match(/class="group"/g)||[]).length,14);
 for(const item of [...packet.lessons,...packet.decisions])assert.ok(html.includes(item.contentHash),item.id);
 assert.ok(html.startsWith('<!doctype html>'));
 assert.ok(html.includes('All items pending independent review.'));
 assert.ok(html.includes('noindex,nofollow'));
 assert.ok(html.includes('Expert safety review prioritized'));
 assert.ok(!html.includes('<script'));
 assert.ok(!html.includes('localStorage'));
});
test('HTML review rendering escapes text and URL attributes, blocks inadvertent markup execution',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const item=packet.lessons[0],malicious='<img src=x onerror=alert("x")> &';
 const spoof={...packet,lessons:[{...item,content:{...item.content,intro:malicious,
  references:[{label:'A <script> & "citation"',url:'https://example.org/?a=1&b=2'}]}}]};
 const html=renderEditorialReviewHTML(spoof);
 assert.ok(!html.includes(malicious));
 assert.ok(html.includes('&lt;img src=x onerror=alert(&quot;x&quot;)&gt; &amp;'));
 assert.ok(html.includes('A &lt;script&gt; &amp; &quot;citation&quot;'));
 assert.ok(html.includes('https://example.org/?a=1&amp;b=2'));
 assert.throws(()=>renderEditorialReviewHTML({}),/Invalid/);
});
test('printable editor artifact is archived alongside source hashes without changing acceptance gates',()=>{
 const script=fs.readFileSync('scripts/export-editorial-review.mjs','utf8');
 const flow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 assert.match(script,/renderEditorialReviewHTML/);
 assert.match(script,/editorial-review-packet\.html/);
 assert.match(flow,/artifacts\/editorial-review-packet\.html/);
 const gates=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(gates.gates[0].complete,false);
});
