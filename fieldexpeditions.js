/**
 * Xyra Atlas — longitudinal field expeditions.
 * 84 independently authored sessions across the existing 14 course worlds.
 * Sessions are optional, self-directed and deliberately ungraded. The calendar
 * is suggested spacing, not a scheduled reminder or saved completion state.
 * No network, local storage, learner inputs, identity, exam marks or APIs.
 * All teaching awaits independent specialist review.
 */
import {FIELD_EXPEDITIONS_ONE} from './fieldexpeditions1.js';
import {FIELD_EXPEDITIONS_TWO} from './fieldexpeditions2.js';

export const FIELD_EXPEDITIONS=Object.freeze({...FIELD_EXPEDITIONS_ONE,...FIELD_EXPEDITIONS_TWO});
export const FIELD_EXPEDITION_COUNT=Object.keys(FIELD_EXPEDITIONS).length;
export const FIELD_SESSION_COUNT=Object.values(FIELD_EXPEDITIONS).reduce((total,item)=>total+item.sessions.length,0);
const EXPECTED=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);
const CADENCE=Object.freeze(['Begin','Return later','After a few days','After a week','After reflection','Final synthesis']);

export function validateFieldExpeditions(courseIds=EXPECTED){
 if(!Array.isArray(courseIds)||courseIds.length!==14||new Set(courseIds).size!==14||
  FIELD_EXPEDITION_COUNT!==14||FIELD_SESSION_COUNT!==84||
  Object.keys(FIELD_EXPEDITIONS).some(id=>!courseIds.includes(id)))
  throw Error('Incomplete longitudinal field expedition subject or session coverage');
 const titles=new Set();
 for(const id of courseIds){
  const item=FIELD_EXPEDITIONS[id];
  for(const [field,min] of Object.entries({title:28,mission:140,context:150,defense:120,boundary:75})){
   if(typeof item?.[field]!=='string'||item[field].length<min)
    throw Error('Incomplete field expedition '+id+':'+field);
  }
  if(titles.has(item.title))throw Error('Duplicate field expedition title: '+id);
  titles.add(item.title);
  if(!Array.isArray(item.criteria)||item.criteria.length!==5||
    item.criteria.some(c=>typeof c!=='string'||c.length<45)||
    !Array.isArray(item.sessions)||item.sessions.length!==6)
    throw Error('Incomplete field expedition criteria/sessions: '+id);
  const sessionTitles=new Set();
  for(const [index,session] of item.sessions.entries()){
   for(const [field,min] of Object.entries({name:19,principle:95,assignment:140,evidence:100,worked:150})){
    if(typeof session?.[field]!=='string'||session[field].length<min)
     throw Error('Incomplete field expedition '+id+' session '+index+':'+field);
   }
   if(sessionTitles.has(session.name))throw Error('Duplicate field session '+id+':'+index);
   sessionTitles.add(session.name);
  }
 }
 return true;
}
validateFieldExpeditions();

const safe=value=>String(value??'').replace(/[&<>"']/g,character=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[character]));
const seg=value=>encodeURIComponent(String(value??''));

export function fieldExpeditionPanel(courseId){
 const item=FIELD_EXPEDITIONS[courseId];
 if(!item)return '';
 return '<section class="field-expedition" id="field-expedition" aria-label="Longitudinal field expedition">'+
 '<details class="field-expedition-disclosure"><summary>'+
  '<span class="overline">DEEP PRACTICE · SIX SESSIONS</span>'+
  '<strong>'+safe(item.title)+'</strong>'+
  '<span class="field-expedition-summary-note">Open the six-session journey · independent and self-paced</span>'+
 '</summary><div class="field-expedition-body">'+
 '<p class="field-expedition-intro">'+safe(item.mission)+'</p>'+
 '<div class="field-expedition-context"><h3>Continuing case</h3><p>'+safe(item.context)+'</p></div>'+
 '<p class="field-expedition-cadence">Suggested spacing: begin, return later, revisit after a few days, then revisit after one week, reflection and a final synthesis. This is guidance only; no dates, grades or completion are stored. You may write privately in the existing lesson notebook.</p>'+
 '<ol class="field-expedition-sessions">'+item.sessions.map((session,i)=>
  '<li class="field-expedition-session">'+
  '<span class="field-expedition-kicker">SESSION '+String(i+1).padStart(2,'0')+' / 06 · '+safe(CADENCE[i])+'</span>'+
  '<h3>'+safe(session.name)+'</h3>'+
  '<p class="field-expedition-principle">'+safe(session.principle)+'</p>'+
  '<h4>Independent work</h4><p>'+safe(session.assignment)+'</p>'+
  '<h4>Evidence you should produce</h4><p>'+safe(session.evidence)+'</p>'+
  '<details class="field-expedition-model"><summary>Reveal one worked comparison after trying the task</summary>'+
  '<p>'+safe(session.worked)+'</p></details>'+
  '</li>').join('')+'</ol>'+
 '<div class="field-expedition-defense"><h3>Final explanation to defend</h3><p>'+safe(item.defense)+'</p>'+
 '<h4>Evidence-quality self-review</h4><ol>'+item.criteria.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol></div>'+
 '<p class="fineprint">'+safe(item.boundary)+' These fictional exercises are not graded, certified or independently approved; participation never changes saved progress.</p>'+
 '</div></details></section>';
}

/** Small course-page link, intentionally collapsed until the learner opts in. */
export function fieldExpeditionPreview(course){
 const item=FIELD_EXPEDITIONS[course?.id];
 const advanced=course?.lessons?.find(x=>x.practicalStudio);
 if(!item||!advanced)return '';
 const href='#/lesson/'+seg(course.id)+'/'+seg(advanced.id);
 return '<details class="field-expedition-preview"><summary>'+
  '<span class="overline">LONG-FORM FIELD EXPEDITION · SIX SESSIONS</span>'+
  '<strong>'+safe(item.title)+'</strong></summary>'+
  '<p>'+safe(item.mission)+'</p>'+
  '<p>Six self-directed activities, worked comparisons and an evidence defense. No dates or grades are saved.</p>'+
  '<a href="'+safe(href)+'">Open the advanced lesson and field expedition</a>'+
  '<p class="fineprint">All authored cases await specialist review; this practice is not professional qualification.</p></details>';
}
