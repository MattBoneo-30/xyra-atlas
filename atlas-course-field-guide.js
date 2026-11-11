/**
 * Atlas Course Field Guide: a navigable, read-only itinerary above the existing
 * syllabus and optional deep-learning studios. Never creates grades, history,
 * progress IDs, cross-course prerequisites, or calls any remote service.
 */
import {COURSE_ORIENTATIONS} from './atlas-course-orientations.js';

export const COURSE_ORIENTATION_COUNT=Object.keys(COURSE_ORIENTATIONS).length;
export const COURSE_WAYPOINTS=Object.freeze([
 {id:'atlas-stage-ladder',label:'Learning levels',detail:'Study foundations through advanced evidence'},
 {id:'atlas-inquiry',label:'Inquiry trail',detail:'Question, explain, challenge and transfer'},
 {id:'atlas-crossroads',label:'Crossroads',detail:'Connect this world with another subject'},
 {id:'portfolio-journey',label:'Build a project',detail:'Create practical evidence through the stages'},
 {id:'response-simulation',label:'Decision practice',detail:'Compare choices and consequences'},
 {id:'atlas-decision-clinic',label:'Practice clinic',detail:'Work through applied judgment questions'},
 {id:'course-lessons-heading',label:'All lessons',detail:'Browse and filter the entire reading path'}
]);
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const numericMinutes=value=>Number.isFinite(Number(value))&&Number(value)>0?Math.ceil(Number(value)):1;
const lessonUrl=(course,lesson)=>'#/lesson/'+encodeURIComponent(String(course.id))+'/'+encodeURIComponent(String(lesson.id));

export function validateCourseOrientations(courseIds=Object.keys(COURSE_ORIENTATIONS)){
 if(!Array.isArray(courseIds)||courseIds.length!==14||new Set(courseIds).size!==14||
 COURSE_ORIENTATION_COUNT!==14||Object.keys(COURSE_ORIENTATIONS).some(id=>!courseIds.includes(id)))throw Error('Missing course orientation');
 for(const id of courseIds){
  const unit=COURSE_ORIENTATIONS[id];
  if(typeof unit?.question!=='string'||unit.question.length<70||
   typeof unit.boundary!=='string'||unit.boundary.length<55||
   !Array.isArray(unit.moves)||unit.moves.length!==3||
   unit.moves.some(move=>typeof move!=='string'||move.length<90))
   throw Error('Incomplete course study strategy '+id);
 }
 return true;
}
validateCourseOrientations();

/** Select a realistic next reading session using only pre-existing lesson IDs. */
export function planCourseSession(course,completed=[],minuteBudget=40){
 if(!course||!Array.isArray(course.lessons))return {total:0,done:0,remainingMinutes:0,minutes:0,lessons:[]};
 const doneIds=new Set(Array.isArray(completed)?completed.filter(x=>typeof x==='string'):[]);
 const remaining=course.lessons.filter(lesson=>!doneIds.has(course.id+':'+lesson.id));
 const done=course.lessons.length-remaining.length;
 const remainingMinutes=remaining.reduce((sum,lesson)=>sum+numericMinutes(lesson.minutes),0);
 const limit=Number.isFinite(Number(minuteBudget))?Math.max(10,Math.min(120,Math.floor(Number(minuteBudget)))):40;
 const lessons=[];
 let minutes=0;
 for(const lesson of remaining){
  const m=numericMinutes(lesson.minutes);
  if(lessons.length&&minutes+m>limit)break;
  lessons.push(lesson);minutes+=m;
  if(lessons.length>=3)break;
 }
 return {total:course.lessons.length,done,remainingMinutes,minutes,lessons};
}

export function renderCourseFieldGuide(course,{completed=[],ladder=null}={}){
 const item=COURSE_ORIENTATIONS[course?.id];
 if(!item||!Array.isArray(course.lessons)||!course.lessons.length)return '';
 const plan=planCourseSession(course,completed);
 const donePercent=Math.round(100*plan.done/plan.total);
 const activeStage=plan.lessons[0]?.stage||'Advanced';
 const stageSteps=Array.isArray(ladder?.levels)?ladder.levels.map((level,i)=>
  '<li class="atlas-guide-stage '+(level.stage===activeStage?'is-current':'')+'">'+
  '<span class="atlas-guide-stage-index">0'+(i+1)+'</span>'+
  '<span><strong>'+esc(level.stage)+'</strong><small>'+level.done+'/'+level.total+' lessons</small></span>'+
  '</li>').join(''):'';
 const cards=plan.lessons.length?plan.lessons.map((lesson,index)=>{
  const globalIndex=course.lessons.findIndex(x=>x.id===lesson.id)+1;
  return '<li class="atlas-guide-session-item">'+
   '<a href="'+esc(lessonUrl(course,lesson))+'" class="atlas-guide-session-link">'+
   '<span class="atlas-guide-session-ordinal">'+String(index+1).padStart(2,'0')+'</span>'+
   '<span class="atlas-guide-session-copy"><strong>'+esc(lesson.title)+'</strong>'+
     '<small>'+esc(lesson.stage)+' · Lesson '+globalIndex+' · '+numericMinutes(lesson.minutes)+' min</small></span>'+
   '<span class="atlas-guide-session-arrow" aria-hidden="true">↗</span></a></li>';
 }).join(''):
 '<li class="atlas-guide-session-complete"><strong>Every recorded lesson is complete.</strong>'+
 '<span>Choose a lesson to revisit, review a worked example, or examine evidence in the studios below. Completion is not a certification.</span>'+
 '<a href="'+esc(lessonUrl(course,course.lessons[0]))+'">Revisit the first lesson</a></li>';
 const jumpLinks=COURSE_WAYPOINTS.map((waypoint,i)=>
  '<li><button type="button" class="atlas-guide-jump" data-atlas-jump="'+waypoint.id+'" '+
   'aria-label="Go to '+esc(waypoint.label)+' in '+esc(course.title)+'">'+
   '<span class="atlas-guide-jump-index">'+String(i+1).padStart(2,'0')+'</span>'+
   '<span><strong>'+esc(waypoint.label)+'</strong><small>'+esc(waypoint.detail)+'</small></span>'+
   '<span class="atlas-guide-jump-arrow" aria-hidden="true">↓</span></button></li>'
 ).join('');
 const methods=item.moves.map((move,i)=>
  '<li><span class="atlas-guide-method-number">'+String(i+1).padStart(2,'0')+'</span><p>'+esc(move)+'</p></li>'
 ).join('');
 return '<section class="atlas-course-field-guide" aria-labelledby="atlas-course-field-guide-heading">'+
  '<div class="atlas-guide-heading"><div><span class="overline">YOUR PERSONAL FIELD GUIDE · '+esc(course.title.toUpperCase())+'</span>'+
   '<h2 id="atlas-course-field-guide-heading">Find your way through this world.</h2>'+
   '<p>Start with your next chapter, return to a specific practice studio, or explore the deeper evidence behind what you learn.</p></div>'+
   '<span class="atlas-guide-completion" aria-label="'+plan.done+' of '+plan.total+' lessons complete">'+plan.done+' / '+plan.total+'<small>lessons</small></span></div>'+
  '<div class="atlas-guide-layout"><div class="atlas-guide-primary">'+
   '<section class="atlas-guide-session" aria-label="Suggested next reading session">'+
    '<div class="atlas-guide-panel-heading"><span class="overline">NEXT READING SESSION</span>'+
      '<span class="atlas-guide-time">'+(plan.lessons.length?plan.minutes+' min planned':'Revisit at your pace')+'</span></div>'+
    '<p class="atlas-guide-session-context">'+(plan.lessons.length?'An optional sequence of up to three unfinished lessons, sized for one focused sitting.':'Your lesson record is complete; deepen your understanding with practice and revision.')+'</p>'+
    '<ol class="atlas-guide-session-list">'+cards+'</ol>'+
    '<div class="atlas-guide-overview"><span>'+plan.remainingMinutes+' min remaining in published lessons</span>'+
     '<span>'+donePercent+'% of lesson entries completed</span></div>'+
   '</section>'+
   (stageSteps?'<ol class="atlas-guide-stages" aria-label="Current course learning stages">'+stageSteps+'</ol>':'')+
   '<details class="atlas-guide-method"><summary>How to study this subject deeply</summary>'+
    '<div class="atlas-guide-method-body"><h3>'+esc(item.question)+'</h3>'+
     '<ol>'+methods+'</ol><p class="fineprint">'+esc(item.boundary)+' Study prompts and guided plans are educational and pending independent subject review.</p></div></details>'+
  '</div>'+
  '<nav class="atlas-guide-contents" aria-label="Jump to course learning areas">'+
   '<span class="overline">THE COURSE CONTENTS</span><h3>Explore the learning studios</h3>'+
   '<ol>'+jumpLinks+'</ol><p class="fineprint">These are navigation shortcuts—not required stages or evidence of mastery.</p></nav>'+
  '</div></section>';
}

const installedDocs=new WeakSet();
export function jumpToCourseArea(button,doc=typeof document==='undefined'?null:document){
 const id=button?.getAttribute?.('data-atlas-jump');
 if(!COURSE_WAYPOINTS.some(point=>point.id===id)||!doc?.getElementById)return false;
 const root=button.closest?.('.course-page');
 const target=doc.getElementById(id);
 if(!root||!target||!root.contains(target))return false;
 target.scrollIntoView?.({block:'start',behavior:'auto'});
 const toFocus=target.matches?.('h2,h3,summary')?target:target.querySelector?.('summary,h2,h3')||target;
 if(!toFocus.matches?.('summary,[tabindex]'))toFocus.setAttribute?.('tabindex','-1');
 toFocus.focus?.({preventScroll:true});
 return true;
}
export function installCourseGuideNavigation(doc=typeof document==='undefined'?null:document){
 if(!doc||typeof doc.addEventListener!=='function'||installedDocs.has(doc))return false;
 installedDocs.add(doc);
 doc.addEventListener('click',event=>{
  const button=event.target?.closest?.('[data-atlas-jump]');
  if(button)jumpToCourseArea(button,doc);
 });
 return true;
}
if(typeof document!=='undefined')installCourseGuideNavigation();
