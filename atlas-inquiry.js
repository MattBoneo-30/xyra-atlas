/**
 * Xyra Atlas · Inquiry Trails
 * Four connected reasoning checkpoints per subject (56 total).
 * Local and read-only: no learner state, network, scoring or certificates.
 * All authored teaching remains pending independent specialist review.
 */
import {INQUIRY_TRAILS_ONE} from './inquirytrails1.js';
import {INQUIRY_TRAILS_TWO} from './inquirytrails2.js';
import {renderAtlasCrossroads} from './atlas-crossroads.js';

export const INQUIRY_TRAILS=Object.freeze({...INQUIRY_TRAILS_ONE,...INQUIRY_TRAILS_TWO});
export const INQUIRY_SUBJECT_COUNT=Object.keys(INQUIRY_TRAILS).length;
export const INQUIRY_STATION_COUNT=Object.values(INQUIRY_TRAILS).reduce((n,item)=>n+item.stations.length,0);
const IDS=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);
export const INQUIRY_STEPS=Object.freeze([
 {label:'Observe',stage:'Beginner',hint:'What do we really know?'},
 {label:'Explain',stage:'Intermediate',hint:'Which model fits?'},
 {label:'Challenge',stage:'Advanced',hint:'What might disprove it?'},
 {label:'Transfer',stage:'Advanced',hint:'Can the method travel?'}
]);

export function validateInquiryTrails(courseIds=IDS){
 if(!Array.isArray(courseIds)||courseIds.length!==14||new Set(courseIds).size!==14||
 INQUIRY_SUBJECT_COUNT!==14||INQUIRY_STATION_COUNT!==56||
 Object.keys(INQUIRY_TRAILS).some(id=>!courseIds.includes(id)))
  throw Error('Incomplete inquiry world coverage');
 const uniqueTitles=new Set();
 for(const id of courseIds){
  const item=INQUIRY_TRAILS[id];
  for(const [field,min] of Object.entries({title:19,thesis:65,context:150,boundary:60})){
   if(typeof item?.[field]!=='string'||item[field].length<min)
    throw Error('Incomplete inquiry trail '+id+':'+field);
  }
  if(uniqueTitles.has(item.title))throw Error('Duplicate inquiry trail title '+id);
  uniqueTitles.add(item.title);
  if(!Array.isArray(item.stations)||item.stations.length!==4)throw Error('Expected four inquiry stations '+id);
  const names=new Set();
  for(const [index,unit] of item.stations.entries()){
   for(const [field,min] of Object.entries({heading:15,question:35,concept:140,challenge:105,worked:140,trap:70,evidence:70})){
    if(typeof unit?.[field]!=='string'||unit[field].length<min)
     throw Error('Incomplete inquiry '+id+':'+index+':'+field);
   }
   if(names.has(unit.heading))throw Error('Repeated inquiry heading '+id+':'+index);
   names.add(unit.heading);
  }
 }
 return true;
}
validateInquiryTrails();

const safe=value=>String(value??'').replace(/[&<>"']/g,char=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));
const fragment=value=>encodeURIComponent(String(value??''));

/** Use ONLY existing, published lesson IDs; never create synthetic progress keys. */
export function inquiryLinkedLessons(course){
 if(!course?.id||!Array.isArray(course.lessons))return [];
 const beginner=course.lessons.find(l=>l.stage==='Beginner');
 const intermediate=course.lessons.find(l=>l.stage==='Intermediate');
 const advanced=course.lessons.filter(l=>l.stage==='Advanced');
 if(!beginner||!intermediate||!advanced.length)return [];
 return [beginner,intermediate,advanced[0],advanced[advanced.length-1]];
}

export function inquiryProgress(course,isLessonDone=()=>false){
 const lessons=inquiryLinkedLessons(course);
 const done=lessons.map(lesson=>Boolean(isLessonDone(lesson.id)));
 return {done,total:lessons.length,linkedComplete:done.filter(Boolean).length};
}

export function renderAtlasInquiryTrail(course,{isLessonDone=()=>false,getStageArt=()=>null,allCourses=[]}={}){
 const item=INQUIRY_TRAILS[course?.id];
 const lessons=inquiryLinkedLessons(course);
 if(!item||lessons.length!==4)return '';
 const prog=inquiryProgress(course,isLessonDone);
 const art=getStageArt(course.id,'Advanced');
 const artSrc=typeof art?.src==='string'&&/^\/assets\/[a-z0-9_-]+\.svg$/.test(art.src)?art.src:'/assets/atlas-mark.svg';
 const marks=INQUIRY_STEPS.map((step,index)=>
  '<span class="atlas-inquiry-mark" aria-hidden="true"><span class="atlas-inquiry-mark-number">'+
  String(index+1).padStart(2,'0')+'</span><span>'+safe(step.label)+'</span></span>'
 ).join('');
 const sections=item.stations.map((station,index)=>{
  const step=INQUIRY_STEPS[index];
  const lesson=lessons[index];
  const completed=prog.done[index];
  const href='#/lesson/'+fragment(course.id)+'/'+fragment(lesson.id);
  return '<li class="atlas-inquiry-stop" data-inquiry-step="'+index+'">'+
  '<div class="atlas-inquiry-stop-signpost"><span class="atlas-inquiry-stop-number">0'+(index+1)+'</span>'+
   '<span class="atlas-inquiry-stop-phase">'+safe(step.label)+' · '+safe(step.stage)+'</span>'+
   '<span class="atlas-inquiry-lesson-status">'+(completed?'Linked lesson completed':'Linked lesson not completed')+'</span></div>'+
  '<article><h3>'+safe(station.heading)+'</h3>'+
   '<p class="atlas-inquiry-focus">'+safe(station.question)+'</p>'+
   '<div class="atlas-inquiry-explain"><h4>Concept to understand</h4><p>'+safe(station.concept)+'</p></div>'+
   '<div class="atlas-inquiry-challenge"><h4>Try before revealing</h4><p>'+safe(station.challenge)+'</p></div>'+
   '<details class="atlas-inquiry-answer"><summary>Reveal a worked explanation</summary><p>'+safe(station.worked)+'</p></details>'+
   '<div class="atlas-inquiry-counter"><h4>Tempting mistake to avoid</h4><p>'+safe(station.trap)+'</p></div>'+
   '<div class="atlas-inquiry-evidence"><h4>Evidence that your reasoning holds</h4><p>'+safe(station.evidence)+'</p></div>'+
   '<a class="atlas-inquiry-link" href="'+safe(href)+'">Study the linked '+safe(step.stage.toLowerCase())+' lesson</a>'+
  '</article></li>';
 }).join('');
 return '<section class="atlas-inquiry" id="atlas-inquiry" aria-label="Visual inquiry trail for '+safe(course.title)+'">'+
  '<details class="atlas-inquiry-disclosure"><summary class="atlas-inquiry-summary">'+
   '<span class="atlas-inquiry-summary-image"><img src="'+safe(artSrc)+'" alt="" loading="lazy" decoding="async"/>'+
    '<span class="atlas-inquiry-summary-image-shade" aria-hidden="true"></span></span>'+
   '<span class="atlas-inquiry-summary-copy"><span class="overline">THE INQUIRY TRAIL · FOUR CHAPTERS</span>'+
    '<strong>'+safe(item.title)+'</strong><span>'+safe(item.thesis)+'</span>'+
    '<span class="atlas-inquiry-summary-cta">Explore the guided inquiry</span></span>'+
  '</summary><div class="atlas-inquiry-body">'+
   '<div class="atlas-inquiry-introduction"><h2>Follow an idea until it survives a challenge.</h2>'+
    '<p>'+safe(item.context)+'</p><p>Each stop has a question, an independent task, a hidden worked explanation and evidence to check your reasoning. Linked lesson completion is a navigation cue, not a grade for this inquiry.</p></div>'+
   '<div class="atlas-inquiry-marks" aria-hidden="true">'+marks+'</div>'+
   '<ol class="atlas-inquiry-stops">'+sections+'</ol>'+
   '<p class="fineprint">'+safe(item.boundary)+' Exercises are optional, ungraded and pending independent expert review. No new scores or completion records are created.</p>'+
  '</div></details></section>'+renderAtlasCrossroads(course,allCourses,{lessonNodes:lessons,isLessonDone,getStageArt});
}
