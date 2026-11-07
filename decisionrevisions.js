/** Counterfactual decision revision labs for every intermediate subject.
 * No extra lesson identities, grading, user data, or background operations.
 * Decisions are revised when the learner reveals new evidence.
 */
import {TRANSFER_LABS} from './transferlabs.js';
import {DECISION_REVISIONS_ONE} from './decisionrevisions1.js';
import {DECISION_REVISIONS_TWO} from './decisionrevisions2.js';
export const DECISION_REVISIONS=Object.freeze({...DECISION_REVISIONS_ONE,...DECISION_REVISIONS_TWO});
export const DECISION_REVISION_COUNT=Object.keys(DECISION_REVISIONS).length;
export function attachDecisionRevisions(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas courses');
 const ids=new Set(courses.map(course=>course?.id));
 if(ids.size!==14||DECISION_REVISION_COUNT!==14||
   Object.keys(DECISION_REVISIONS).some(id=>!ids.has(id)))
  throw Error('Decision revision coverage incomplete');
 const pending=[];
 for(const [id,entry] of Object.entries(DECISION_REVISIONS)){
  const lessonId=TRANSFER_LABS[id]?.lessonId;
  const lesson=courses.find(course=>course.id===id)?.lessons?.find(l=>l.id===lessonId);
  if(!lesson||lesson.stage!=='Intermediate'||!lesson.transferLab)
   throw Error('Intermediate case prerequisite missing: '+id);
  for(const [field,min] of Object.entries({title:24,case:155,firstTask:160,reveal:165,revision:160,follow:115,caveat:45})){
   if(typeof entry[field]!=='string'||entry[field].length<min)
    throw Error('Incomplete revision '+id+':'+field);
  }
  if(!Array.isArray(entry.rubric)||entry.rubric.length!==4||
    entry.rubric.some(x=>typeof x!=='string'||x.length<48))
   throw Error('Incomplete revision rubric: '+id);
  const key=id+':'+lessonId;
  if(lesson.decisionRevision){
   if(lesson.decisionRevision.key!==key)throw Error('Conflict in revision lab '+id);
   continue;
  }
  pending.push({lesson,key,entry});
 }
 for(const {lesson,key,entry} of pending)lesson.decisionRevision=Object.freeze({
  key,title:entry.title,case:entry.case,firstTask:entry.firstTask,
  reveal:entry.reveal,revision:entry.revision,follow:entry.follow,
  caveat:entry.caveat,rubric:Object.freeze([...entry.rubric]),
  reviewStatus:'pending-independent-review'
 });
 return pending.length;
}
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function decisionRevisionPanel(item){
 if(!item)return '';
 return '<section class="decision-revision" id="decision-revision" aria-label="Counterfactual decision-revision lab">'+
  '<span class="overline">EVIDENCE CHANGES THE DECISION</span><h2>'+safe(item.title)+'</h2>'+
  '<p class="decision-revision-intro">Make an initial judgment from the available case. Reveal a new fact only after recording your reasoning; then compare your revised decision with an illustrative analysis.</p>'+
  '<div class="decision-revision-start"><h3>What is known first</h3><p>'+safe(item.case)+'</p></div>'+
  '<div class="decision-revision-start"><h3>Before revealing new evidence</h3><p>'+safe(item.firstTask)+'</p></div>'+
  '<details class="decision-revision-reveal"><summary>Reveal the new evidence and reconsider</summary>'+
   '<div class="decision-revision-change"><h3>New evidence</h3><p>'+safe(item.reveal)+'</p></div>'+
   '<div class="decision-revision-change"><h3>One defensible revision</h3><p>'+safe(item.revision)+'</p></div>'+
   '<div class="decision-revision-change"><h3>Independent follow-up</h3><p>'+safe(item.follow)+'</p></div></details>'+
  '<div class="decision-revision-rubric"><h3>Check how your conclusion changed</h3><ol>'+
    item.rubric.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol></div>'+
  '<p class="fineprint">'+safe(item.caveat)+' Content awaits independent review and does not change stored grades or certification.</p></section>';
}
