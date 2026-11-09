/** Three-stage competency bridges for every Atlas subject.
 * Original educational cases, not expert-reviewed or accredited.
 * Each stage trains a different capability and has a teachable error.
 * Pure functions; do not write grades, notes, user data or network requests.
 */
import {COMPETENCY_BRIDGES_ONE} from './competencybridges1.js';
import {COMPETENCY_BRIDGES_TWO} from './competencybridges2.js';

export const COMPETENCY_BRIDGES=Object.freeze({...COMPETENCY_BRIDGES_ONE,...COMPETENCY_BRIDGES_TWO});
export const COMPETENCY_BRIDGE_COUNT=Object.keys(COMPETENCY_BRIDGES).length;
export const COMPETENCY_STAGE_COUNT=Object.values(COMPETENCY_BRIDGES).reduce((n,item)=>n+Object.keys(item).length,0);
export const COMPETENCY_STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
const EXPECTED_IDS=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);
const minFields=Object.freeze({objective:38,scenario:115,reasoning:150,challenge:105,feedback:135,proof:70});

export function validateCompetencyBridges(ids=EXPECTED_IDS){
 if(!Array.isArray(ids)||ids.length!==14||new Set(ids).size!==14||
  COMPETENCY_BRIDGE_COUNT!==14||COMPETENCY_STAGE_COUNT!==42||
  Object.keys(COMPETENCY_BRIDGES).some(id=>!ids.includes(id)))
  throw Error('Competency bridge course coverage incomplete');
 for(const id of ids){
  const stages=COMPETENCY_BRIDGES[id];
  if(!stages||Object.keys(stages).length!==3||
   COMPETENCY_STAGES.some(stage=>!stages[stage]))
    throw Error('Missing competency stages for '+id);
  for(const stage of COMPETENCY_STAGES){
   const entry=stages[stage];
   for(const [field,min] of Object.entries(minFields)){
    if(typeof entry[field]!=='string'||entry[field].length<min)
     throw Error('Incomplete competency bridge '+id+':'+stage+':'+field);
   }
  }
 }
 return true;
}
validateCompetencyBridges();

const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[ch]));
const segment=value=>encodeURIComponent(String(value??''));

export function competencyBridgePanel(courseId,stage){
 const entry=COMPETENCY_BRIDGES[courseId]?.[stage];
 if(!entry||!COMPETENCY_STAGES.includes(stage))return '';
 const nextStage=COMPETENCY_STAGES[COMPETENCY_STAGES.indexOf(stage)+1];
 const next=nextStage?'<p class="competency-next">Next stage: '+esc(nextStage)+
  ' — bring your evidence forward and examine a more demanding version of the same subject.</p>':'';
 return '<section class="competency-bridge" aria-label="'+esc(stage)+' competency bridge">'+
  '<details class="competency-bridge-details"><summary>'+
   '<span class="overline">THINK · APPLY · EXPLAIN</span>'+
   '<strong>'+esc(stage)+' competency bridge</strong>'+
   '<span class="competency-bridge-subtitle">'+esc(entry.objective)+'</span></summary>'+
  '<div class="competency-bridge-body">'+
   '<h3>Core reasoning</h3><p>'+esc(entry.reasoning)+'</p>'+
   '<div class="competency-bridge-case"><h3>Case to investigate</h3><p>'+esc(entry.scenario)+'</p></div>'+
   '<div class="competency-bridge-task"><h3>Attempt independently</h3><p>'+esc(entry.challenge)+'</p></div>'+
   '<details class="competency-bridge-answer"><summary>Reveal a worked analysis after attempting the task</summary><p>'+
     esc(entry.feedback)+'</p></details>'+
   '<div class="competency-bridge-proof"><h3>What would demonstrate understanding?</h3><p>'+esc(entry.proof)+'</p></div>'+
   next+
   '<p class="fineprint">Optional self-directed study. Worked examples may not be the only acceptable answers. The case has not received independent specialist review, is not a professional credential and changes no saved completion or grades.</p>'+
  '</div></details></section>';
}

/** Course overview uses published lesson IDs, never synthetic routes. */
export function competencyBridgeRoadmap(course){
 const track=COMPETENCY_BRIDGES[course?.id];
 if(!track||!Array.isArray(course?.lessons))return '';
 const lookups={
  Beginner:course.lessons.find(lesson=>lesson.beginnerWorkshop),
  Intermediate:course.lessons.find(lesson=>lesson.decisionRevision),
  Advanced:course.lessons.find(lesson=>lesson.practicalStudio)
 };
 if(COMPETENCY_STAGES.some(stage=>!lookups[stage]))return '';
 return '<details class="competency-roadmap"><summary>'+
  '<span class="overline">THREE LEVELS · ONE COMPETENCY PROGRESSION</span>'+
  '<strong>Learn it, apply it, then defend it</strong></summary>'+
  '<ol>'+COMPETENCY_STAGES.map((stage,i)=>
   '<li><span class="competency-roadmap-level">0'+(i+1)+' · '+esc(stage)+'</span>'+
   '<p>'+esc(track[stage].objective)+'</p>'+
   '<a href="#/lesson/'+segment(course.id)+'/'+segment(lookups[stage].id)+'">Open '+esc(stage.toLowerCase())+' practice</a></li>').join('')+
  '</ol><p class="fineprint">Learning guidance only. Existing completion and assessment rules are unchanged; editorial review is pending.</p></details>';
}
