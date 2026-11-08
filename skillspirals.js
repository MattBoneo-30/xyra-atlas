/**
 * Xyra Atlas — forty-two original subject skill-transfer problems.
 * Three progressively demanding activities per subject. Authored material
 * pending external subject-matter review; not an automated competence score.
 */
import {SPIRALS_ONE} from './skillspirals1.js';
import {SPIRALS_TWO} from './skillspirals2.js';
const all={...SPIRALS_ONE,...SPIRALS_TWO};
export const SKILL_SPIRAL_STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
export const SKILL_SPIRALS=Object.freeze(Object.fromEntries(
 Object.entries(all).map(([id,raw])=>[id,Object.freeze(raw.map(([title,scenario,challenge,worked,misconception,proof],i)=>Object.freeze({
  stage:SKILL_SPIRAL_STAGES[i],title,scenario,challenge,worked,misconception,proof,
  reviewStatus:'pending-independent-review'
 })))])
));
export function attachSkillSpirals(courses){
 if(!Array.isArray(courses)||courses.length!==14||new Set(courses.map(c=>c?.id)).size!==14||
  Object.keys(SKILL_SPIRALS).length!==14||courses.some(c=>!Object.hasOwn(SKILL_SPIRALS,c.id)))
  throw Error('Expected all fourteen subject skill spirals');
 let added=0;
 for(const course of courses){
  const items=SKILL_SPIRALS[course.id];
  if(items.length!==3||items.some((item,i)=>item.stage!==SKILL_SPIRAL_STAGES[i]))
   throw Error('Missing three levels for '+course.id);
  for(const item of items){
   if(typeof item.title!=='string'||item.title.length<15||
    item.scenario.length<75||item.challenge.length<65||item.worked.length<125||
    item.misconception.length<40||item.proof.length<55)throw Error('Shallow practice in '+course.id+':'+item.stage);
  }
  const first=course.lessons.find(l=>l.stage==='Beginner');
  if(!first||!course.portfolioJourney?.artifacts||course.portfolioJourney.artifacts.length!==3)
   throw Error('Missing original learning path '+course.id);
  if(course.skillSpiral){
   if(course.skillSpiral!==items||first.skillSpiral!==items)throw Error('Conflicting spiral '+course.id);
   continue;
  }
  course.skillSpiral=items;
  first.skillSpiral=items;
  added++;
 }
 return added;
}
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function skillSpiralPanel(course){
 const items=course?.skillSpiral,artifacts=course?.portfolioJourney?.artifacts;
 if(!Array.isArray(items)||items.length!==3||!Array.isArray(artifacts)||artifacts.length!==3)return '';
 const steps=items.map((item,index)=>{
  const lessonId=artifacts[index]?.lessonId;
  const url='#/lesson/'+encodeURIComponent(course.id)+'/'+encodeURIComponent(lessonId);
  return '<li class="skill-spiral-stage" data-skill-stage="'+index+'">'+
   '<span class="overline">'+safe(item.stage.toUpperCase())+' · '+
    ['OBSERVE & EXPLAIN','ADAPT & TEST','DEFEND & TRANSFER'][index]+'</span>'+
   '<h3>'+safe(item.title)+'</h3><p>'+safe(item.scenario)+'</p>'+
   '<div class="skill-spiral-challenge"><strong>Your task</strong><p>'+safe(item.challenge)+'</p></div>'+
   '<details class="skill-spiral-response"><summary>Reveal worked response after trying</summary>'+
    '<p><strong>Reasoned comparison:</strong> '+safe(item.worked)+'</p>'+
    '<p><strong>Common misconception:</strong> '+safe(item.misconception)+'</p></details>'+
   '<p class="skill-spiral-proof"><strong>Evidence to check:</strong> '+safe(item.proof)+'</p>'+
   '<a class="skill-spiral-link" href="'+safe(url)+'">Open linked '+safe(item.stage.toLowerCase())+' lesson to write your answer</a></li>';
 }).join('');
 return '<section class="skill-spiral" id="skill-spiral" aria-label="Progressive subject skill transfer">'+
  '<span class="overline">ONE SKILL · THREE DIFFICULTY LEVELS</span>'+
  '<h2>From worked examples to independent judgment</h2>'+
  '<p class="skill-spiral-intro">Attempt each new problem before revealing its worked comparison. Progressively less guidance builds practice, but no answer is automatically scored. Save your reasoning in the linked private Field Notebook.</p>'+
  '<ol class="skill-spiral-stages">'+steps+'</ol>'+
  '<p class="fineprint">All forty-two practice activities await independent specialist review. Reading an answer or completing a linked lesson does not prove mastery or accreditation.</p></section>';
}
