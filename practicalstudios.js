import {competencyBridgePanel} from './competencybridges.js';
/** Advanced practical studios: two rounds for each of fourteen subjects.
 * Fictional numbers/cases. Validate source data before any mutation so the
 * published curriculum and learner progress remain stable on failure.
 * Rendering is pure and safe: worked answers reveal only on user action.
 */
import {ADVANCED_DEPTH} from './advanceddepth.js';
import {MASTERY_RESEARCH,masteryResearchPanel} from './masteryresearch.js';
import {qualificationPanel} from './qualifyingclinic.js';
import {fieldExpeditionPanel} from './fieldexpeditions.js';
import {firstPrinciplesPanel} from './firstprinciples.js';
import {PRACTICAL_STUDIOS_ONE} from './practicalstudios1.js';
import {PRACTICAL_STUDIOS_TWO} from './practicalstudios2.js';
export const PRACTICAL_STUDIOS=Object.freeze({...PRACTICAL_STUDIOS_ONE,...PRACTICAL_STUDIOS_TWO});
export const PRACTICAL_STUDIO_COUNT=Object.keys(PRACTICAL_STUDIOS).length;
export function attachPracticalStudios(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas curriculum list');
 const keys=new Set(courses.map(c=>c?.id));
 if(keys.size!==14||PRACTICAL_STUDIO_COUNT!==14||
   Object.keys(PRACTICAL_STUDIOS).some(id=>!keys.has(id)))
  throw Error('Practical studio coverage incomplete');
 const staged=[];
 for(const [courseId,data] of Object.entries(PRACTICAL_STUDIOS)){
  const lessonId=ADVANCED_DEPTH[courseId]?.id;
  const lesson=courses.find(c=>c.id===courseId)?.lessons?.find(l=>l.id===lessonId);
  if(!lesson||lesson.stage!=='Advanced'||!lesson.evidenceInquiry)
   throw Error('Missing published advanced prerequisite: '+courseId);
  if(typeof data.title!=='string'||data.title.length<20||
     typeof data.situation!=='string'||data.situation.length<130||
     !Array.isArray(data.rounds)||data.rounds.length!==2||
     !Array.isArray(data.rubric)||data.rubric.length!==4||
     data.rubric.some(x=>typeof x!=='string'||x.length<48))
   throw Error('Incomplete advanced practical studio: '+courseId);
  for(const round of data.rounds){
   for(const [field,min] of Object.entries({title:16,focus:170,evidence:125,assignment:135,model:145})){
    if(typeof round[field]!=='string'||round[field].length<min)
     throw Error('Incomplete '+field+' in practical studio '+courseId);
   }
  }
  const key=courseId+':'+lessonId;
  if(lesson.practicalStudio){
   if(lesson.practicalStudio.key!==key)throw Error('Studio key conflict: '+key);
   continue;
  }
  staged.push({lesson,courseId,data,key});
 }
 for(const {lesson,data,key} of staged){
  lesson.practicalStudio=Object.freeze({
   key,title:data.title,situation:data.situation,
   rounds:Object.freeze(data.rounds.map(round=>Object.freeze({...round}))),
   rubric:Object.freeze([...data.rubric]),
   reviewStatus:'pending-independent-review'
  });
 }
 return staged.length;
}
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function practicalStudioPanel(studio){
 if(!studio)return '';
 return firstPrinciplesPanel(studio.key.split(':')[0])+competencyBridgePanel(studio.key.split(':')[0],'Advanced')+'<section class="practical-studio" id="practical-studio" aria-label="Advanced practical studio">'+
  '<span class="overline">ADVANCED · BUILD, TEST AND EXPLAIN</span><h2>'+safe(studio.title)+'</h2>'+
  '<p class="practical-studio-intro">This is a two-round applied studio. Make each artifact before opening the worked response. It is fictional, optional and not a professional or graded qualification.</p>'+
  '<div class="practical-studio-situation"><h3>Starting brief</h3><p>'+safe(studio.situation)+'</p></div>'+
  studio.rounds.map((round,i)=>'<article class="practical-studio-round"><span class="practical-studio-number">ROUND 0'+(i+1)+'</span><h3>'+safe(round.title)+'</h3>'+
   '<h4>Concept to apply</h4><p>'+safe(round.focus)+'</p>'+
   '<h4>Evidence available</h4><p>'+safe(round.evidence)+'</p>'+
   '<div class="practical-studio-task"><h4>Produce the artifact</h4><p>'+safe(round.assignment)+'</p></div>'+
   '<details class="practical-studio-model"><summary>Reveal and compare an illustrative worked response</summary><p>'+safe(round.model)+'</p></details></article>').join('')+
  '<div class="practical-studio-rubric"><h3>Review the completed work</h3><ol>'+
   studio.rubric.map(line=>'<li>'+safe(line)+'</li>').join('')+'</ol></div>'+
  '<p class="fineprint">Independent specialist and content-source review are pending. Worked responses are examples, not the only acceptable solutions. Existing quiz grades and stored completion remain unchanged.</p></section>'+masteryResearchPanel(MASTERY_RESEARCH[studio.key.split(':')[0]])+qualificationPanel(studio.key.split(':')[0])+fieldExpeditionPanel(studio.key.split(':')[0]);
}
