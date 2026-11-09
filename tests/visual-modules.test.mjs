import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {icon} from '../atlas-icons.js';
import {renderMentorPage} from '../atlas-mentor-view.js';

const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));
const button=(label,action,cls='',attrs='')=>'<button type="button" data-action="'+action+'" class="'+cls+'" '+attrs+'>'+label+'</button>';

test('the extracted icon painter preserves named inline artwork and safe unknown fallback',()=>{
 const iconNames=['menu','search','arrow','home','compass','chart','bookmark','moon','brain','scale','shield','rocket','download','upload','wifi','wifi-off','close','dots'];
 for(const name of iconNames){
  const svg=icon(name,24);
  assert.match(svg,/^<svg aria-hidden="true" width="24" height="24"/);
  assert.match(svg,/<\/svg>$/);
  assert.ok(/<path|<circle|<ellipse|<rect/.test(svg),name+' lacks SVG shapes');
  assert.doesNotMatch(svg,/<script|<image|onload|https?:\/\//i);
 }
 assert.equal(icon('toString'),icon('does-not-exist'));
 assert.equal(icon('__proto__'),icon('does-not-exist'));
});

test('mentor view retains accessible actions, validated content escaping and empty fallback',()=>{
 const context={button,icon,esc,day:'2026-11-10',todayNote:{
  reflection:{title:'Try <again>',message:'Question the & usual',prompt:'What <matters>?'},
  lesson:{title:'Responsible research',course:'Digital literacy',minutes:8,courseId:'digital',lessonId:'digital-lesson-1'}
 }};
 const html=renderMentorPage(context);
 assert.match(html,/class="mentor-page"/);
 assert.match(html,/data-action="open-lesson"/);
 assert.match(html,/data-action="map"/);
 assert.match(html,/data-course="digital"/);
 assert.match(html,/Try &lt;again&gt;/);
 assert.match(html,/Question the &amp; usual/);
 assert.match(html,/2026-11-10/);
 assert.doesNotMatch(html,/<again>|<matters>/);
 const fallback=renderMentorPage({...context,todayNote:null});
 assert.match(fallback,/Follow your curiosity/);
 assert.doesNotMatch(fallback,/data-action="open-lesson"/);
});

test('app delegates pure visual assets with the same offline packaging and explicit source budgets',()=>{
 const app=read('app.js'),build=read('scripts/build.mjs'),sw=read('sw.js');
 assert.match(app,/import \{icon\} from '.\/atlas-icons\.js'/);
 assert.match(app,/import \{renderMentorPage\} from '.\/atlas-mentor-view\.js'/);
 assert.match(app,/renderMentorPage\(\{todayNote:mentorMoment/);
 assert.doesNotMatch(app,/function icon\(name,size=20\)/);
 for(const name of ['atlas-icons.js','atlas-mentor-view.js']){
  assert.ok(build.includes("'"+name+"'"),name+' not copied by production build');
  assert.ok(sw.includes("'/"+name+"'"),name+' missing from service-worker cache');
 }
 const bytes=Buffer.byteLength(app,'utf8');
 assert.ok(bytes<235000,'Main app should have at least 5 KB of headroom before 240 KB cap');
 const icons=read('atlas-icons.js'),mentor=read('atlas-mentor-view.js');
 assert.match(icons,/Object\.freeze\(/);
 assert.doesNotMatch(icons+mentor,/localStorage|sessionStorage|XMLHttpRequest|navigator\.sendBeacon|fetch\s*\(/);
});
