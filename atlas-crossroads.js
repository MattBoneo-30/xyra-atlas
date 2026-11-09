/**
 * Atlas Crossroads — interdisciplinary learning bridges and a visual route
 * through two real worlds. Pure HTML; no learner storage, scoring, APIs or
 * fabricated credentials. All authored claims require independent review.
 */
import {CROSSROADS_ONE} from './atlascrossroads1.js';
import {CROSSROADS_TWO} from './atlascrossroads2.js';
export const CROSSROAD_CASES=Object.freeze({...CROSSROADS_ONE,...CROSSROADS_TWO});
export const CROSSROAD_COUNT=Object.keys(CROSSROAD_CASES).length;
const IDS=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);
const STEP_NAMES=Object.freeze(['Observe','Explain','Challenge','Transfer']);
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const href=(id,lessonId)=>'#/'+(lessonId?'lesson/':'course/')+encodeURIComponent(String(id))+(lessonId?'/'+encodeURIComponent(String(lessonId)):'');
const localArt=value=>/^\/assets\/[a-z0-9_-]+\.svg$/.test(String(value||''))?value:'/assets/atlas-mark.svg';

export function validateCrossroads(ids=IDS){
 if(!Array.isArray(ids)||ids.length!==14||new Set(ids).size!==14||
  CROSSROAD_COUNT!==14||Object.keys(CROSSROAD_CASES).some(x=>!ids.includes(x)))throw Error('Missing cross-world subject');
 for(const id of ids){
  const unit=CROSSROAD_CASES[id];
  if(!unit||!ids.includes(unit.partner)||id===unit.partner)throw Error('Invalid partner world '+id);
  for(const [field,min] of Object.entries({title:20,scenario:120,challenge:100,worked:145,falsifier:90,evidence:90,boundary:60})){
   const name=field;
    if(typeof unit[name]!=='string'||unit[name].length<min)throw Error('Incomplete cross-world '+id+':'+name);
  }
  if(!Array.isArray(unit.models)||unit.models.length!==2||unit.models.some(x=>typeof x!=='string'||x.length<90))throw Error('Missing reasoning lenses '+id);
 }
 return true;
}
validateCrossroads();

/** Four existing real lesson IDs plus two real course IDs form the route. */
export function crossroadNodeRoutes(course,partner,lessons){
 if(!course?.id||!partner?.id||!Array.isArray(lessons)||lessons.length!==4||
 lessons.some(l=>!l?.id||!course.lessons?.some(x=>x.id===l.id)))return [];
 return [
  {label:course.title,description:'Home world',url:href(course.id),kind:'world'},
  ...lessons.map((lesson,i)=>({label:STEP_NAMES[i],description:lesson.title,url:href(course.id,lesson.id),kind:'lesson',lessonId:lesson.id})),
  {label:partner.title,description:'Connected discipline',url:href(partner.id),kind:'partner'}
 ];
}

export function renderAtlasCrossroads(course,allCourses,{lessonNodes=[],isLessonDone=()=>false,getStageArt=()=>null}={}){
 const unit=CROSSROAD_CASES[course?.id];
 const partner=Array.isArray(allCourses)?allCourses.find(c=>c.id===unit?.partner):null;
 const routes=partner?crossroadNodeRoutes(course,partner,lessonNodes):[];
 if(!unit||!partner||routes.length!==6)return '';
 const image=getStageArt(partner.id,'Advanced');
 const art=localArt(image?.src||'/assets/'+partner.art+'.svg');
 const nodes=routes.map((node,i)=>{
  const completed=node.kind==='lesson'&&Boolean(isLessonDone(node.lessonId));
  return '<li class="atlas-crossroads-node" data-bridge-node="'+i+'">'+
   '<a href="'+escapeHtml(node.url)+'" class="atlas-crossroads-link" aria-label="'+escapeHtml('Open '+node.label+': '+node.description)+(node.kind==='lesson'?(completed?' (linked lesson complete)':' (linked lesson not complete)'):'')+'">'+
   '<span class="atlas-crossroads-symbol" aria-hidden="true">'+(node.kind==='world'?'✦':node.kind==='partner'?'✧':String(i).padStart(2,'0'))+'</span>'+
   '<strong>'+escapeHtml(node.label)+'</strong>'+
   '<small>'+escapeHtml(node.description)+'</small>'+
   (node.kind==='lesson'?'<span class="atlas-crossroads-cue">'+(completed?'Linked lesson complete':'Linked lesson not complete')+'</span>':'')+
   '</a></li>';
 }).join('');
 const standards='<p>'+escapeHtml(unit.evidence)+'</p>';
 const partnerName=escapeHtml(partner.title);
 return '<section class="atlas-crossroads" aria-label="Cross-world transfer mission for '+escapeHtml(course.title)+'">'+
  '<details class="atlas-crossroads-disclosure"><summary class="atlas-crossroads-summary">'+
   '<span class="atlas-crossroads-summary-media"><img src="'+escapeHtml(art)+'" alt="" loading="lazy" decoding="async"/><span class="atlas-crossroads-art-shade" aria-hidden="true"></span></span>'+
   '<span class="atlas-crossroads-summary-content"><span class="overline">FIELD CROSSROADS · ONE QUESTION, TWO WORLDS</span>'+
    '<strong>'+escapeHtml(unit.title)+'</strong>'+
    '<span>Connect '+escapeHtml(course.title)+' with '+partnerName+' in a new case requiring both disciplines.</span>'+
    '<span class="atlas-crossroads-cta">Explore the interdisciplinary mission</span></span>'+
  '</summary><div class="atlas-crossroads-body">'+
   '<header><span class="overline">THE KNOWLEDGE ROUTE</span><h2>Trace the ideas. Then cross the boundary.</h2>'+
    '<p>These six points lead to real courses and lessons. They are a reading map, not an assessment or certification.</p></header>'+
   '<ol class="atlas-crossroads-map">'+nodes+'</ol>'+
   '<div class="atlas-crossroads-case"><span class="overline">THE CONTINUING CASE</span><p>'+escapeHtml(unit.scenario)+'</p></div>'+
   '<div class="atlas-crossroads-lenses">'+
    '<article><h3>'+escapeHtml(course.title)+' lens</h3><p>'+escapeHtml(unit.models[0])+'</p></article>'+
    '<article><h3>'+partnerName+' lens</h3><p>'+escapeHtml(unit.models[1])+'</p></article></div>'+
   '<div class="atlas-crossroads-task"><h3>Attempt the integrated challenge</h3><p>'+escapeHtml(unit.challenge)+'</p></div>'+
   '<details class="atlas-crossroads-answer"><summary>Compare your reasoning with a worked response</summary><p>'+escapeHtml(unit.worked)+'</p></details>'+
   '<div class="atlas-crossroads-counter"><h3>Challenge your own conclusion</h3><p>'+escapeHtml(unit.falsifier)+'</p></div>'+
   '<div class="atlas-crossroads-evidence"><h3>What counts as convincing evidence?</h3>'+standards+'</div>'+
   '<p class="fineprint">'+escapeHtml(unit.boundary)+' This optional mission is not graded or independently expert-approved. Linked lesson completion does not verify this work. No personal data or scores are created.</p>'+
  '</div></details></section>';
}
