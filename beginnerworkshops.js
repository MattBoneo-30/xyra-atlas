import {competencyBridgePanel} from './competencybridges.js';
/** Applied second-foundation workshops for all Atlas subjects.
 * Original cases. Two independently attempted activities per subject.
 * No new lesson IDs, new grading, user storage, or external requests.
 */
import {BEGINNER_WORKSHOPS_ONE} from './beginnerworkshops1.js';
import {BEGINNER_WORKSHOPS_TWO} from './beginnerworkshops2.js';
export const BEGINNER_WORKSHOPS=Object.freeze({...BEGINNER_WORKSHOPS_ONE,...BEGINNER_WORKSHOPS_TWO});
export const BEGINNER_WORKSHOP_COUNT=Object.keys(BEGINNER_WORKSHOPS).length;
export function attachBeginnerWorkshops(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas courses');
 const courseIds=new Set(courses.map(c=>c?.id));
 if(courseIds.size!==14||BEGINNER_WORKSHOP_COUNT!==14||
   Object.keys(BEGINNER_WORKSHOPS).some(id=>!courseIds.has(id)))
  throw Error('Incomplete beginner workshop subject coverage');
 const pending=[];
 for(const [id,entry] of Object.entries(BEGINNER_WORKSHOPS)){
  const lesson=courses.find(c=>c.id===id)?.lessons?.find(l=>l.id===entry.lessonId);
  if(!lesson||lesson.stage!=='Beginner'||!Array.isArray(lesson.sections))
   throw Error('Missing original beginner prerequisite: '+id+':'+entry.lessonId);
  for(const [field,min] of Object.entries({title:28,goal:80,case:140,limits:50})){
   if(typeof entry[field]!=='string'||entry[field].length<min)
    throw Error('Incomplete beginner workshop '+id+':'+field);
  }
  if(!Array.isArray(entry.steps)||entry.steps.length!==2||
   !Array.isArray(entry.rubric)||entry.rubric.length!==4||
   entry.rubric.some(s=>typeof s!=='string'||s.length<50))
   throw Error('Incomplete step count or rubric in '+id);
  for(const step of entry.steps){
   for(const [field,min] of Object.entries({name:23,instruction:150,model:150,diagnostic:75})){
    if(typeof step[field]!=='string'||step[field].length<min)
     throw Error('Incomplete beginner workshop step '+id+':'+field);
   }
  }
  const key=id+':'+lesson.id;
  if(lesson.beginnerWorkshop){
   if(lesson.beginnerWorkshop.key!==key)throw Error('Conflicting beginner workshop '+id);
   continue;
  }
  pending.push({lesson,entry,key});
 }
 // Atomic assignment: never modify the published curriculum before validating all topics.
 for(const {lesson,entry,key} of pending){
  lesson.beginnerWorkshop=Object.freeze({
   key,title:entry.title,goal:entry.goal,case:entry.case,
   steps:Object.freeze(entry.steps.map(step=>Object.freeze({...step}))),
   rubric:Object.freeze([...entry.rubric]),limits:entry.limits,
   reviewStatus:'pending-independent-review'
  });
 }
 return pending.length;
}
const safe=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function beginnerWorkshopPanel(item){
 if(!item)return '';
 return competencyBridgePanel(item.key.split(':')[0],'Beginner')+'<section class="beginner-workshop" id="beginner-workshop" aria-label="Guided beginner workshop">'+
  '<span class="overline">FOUNDATION · PRACTISE WITH EVIDENCE</span><h2>'+safe(item.title)+'</h2>'+
  '<p class="beginner-workshop-goal">'+safe(item.goal)+'</p>'+
  '<div class="beginner-workshop-case"><h3>Starting case</h3><p>'+safe(item.case)+'</p></div>'+
  item.steps.map((step,i)=>'<article class="beginner-workshop-step">'+
    '<span class="beginner-workshop-number">STEP 0'+(i+1)+' / 02</span><h3>'+safe(step.name)+'</h3>'+
    '<div class="beginner-workshop-task"><h4>Try this first</h4><p>'+safe(step.instruction)+'</p></div>'+
    '<p class="beginner-workshop-check"><strong>Check your assumption:</strong> '+safe(step.diagnostic)+'</p>'+
    '<details class="beginner-workshop-model"><summary>Reveal a worked comparison after attempting the task</summary>'+
      '<p>'+safe(step.model)+'</p></details></article>').join('')+
  '<div class="beginner-workshop-rubric"><h3>Independent quality checklist</h3><ol>'+
    item.rubric.map(line=>'<li>'+safe(line)+'</li>').join('')+'</ol></div>'+
  '<p class="fineprint">'+safe(item.limits)+' Independent specialist review remains pending. These self-checks are optional, ungraded and never alter saved progress.</p></section>';
}
