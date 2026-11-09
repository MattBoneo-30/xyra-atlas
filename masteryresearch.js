/** Evidence-led mastery research extension for each existing Atlas subject.
 * Original fictional packets, independent reasoning prompts and review rubrics.
 * This module is deterministic, read-only and network-free. It does not modify
 * assessment grades, lesson IDs, learner notes or existing local storage.
 */
import {MASTERY_RESEARCH_ONE} from './masteryresearch1.js';
import {MASTERY_RESEARCH_TWO} from './masteryresearch2.js';

export const MASTERY_RESEARCH=Object.freeze({...MASTERY_RESEARCH_ONE,...MASTERY_RESEARCH_TWO});
export const MASTERY_RESEARCH_COUNT=Object.keys(MASTERY_RESEARCH).length;
const EXPECTED=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);

export function validateMasteryResearch(courseIds=EXPECTED){
 if(!Array.isArray(courseIds)||courseIds.length!==14||new Set(courseIds).size!==14||
   MASTERY_RESEARCH_COUNT!==14||Object.keys(MASTERY_RESEARCH).some(id=>!courseIds.includes(id)))
  throw Error('Mastery research subject coverage mismatch');
 const titles=new Set();
 for(const id of courseIds){
  const item=MASTERY_RESEARCH[id];
  if(!item)throw Error('Research practicum absent: '+id);
  for(const [field,min] of Object.entries({title:24,brief:180,question:100,counter:120,transfer:130,limits:80}))
   if(typeof item[field]!=='string'||item[field].length<min)
    throw Error('Research practicum field incomplete: '+id+'/'+field);
  if(titles.has(item.title))throw Error('Duplicate research practicum title: '+id);
  titles.add(item.title);
  if(!Array.isArray(item.exhibits)||item.exhibits.length!==3||
    item.exhibits.some(e=>typeof e.label!=='string'||e.label.length<7||
     typeof e.detail!=='string'||e.detail.length<130))
    throw Error('Incomplete evidence exhibits: '+id);
  if(!Array.isArray(item.phases)||item.phases.length!==3||
   item.phases.some(p=>typeof p.name!=='string'||p.name.length<18||
    typeof p.task!=='string'||p.task.length<160||
    typeof p.worked!=='string'||p.worked.length<165))
    throw Error('Incomplete independent research phases: '+id);
  if(!Array.isArray(item.rubric)||item.rubric.length!==5||
   item.rubric.some(x=>typeof x!=='string'||x.length<40))
    throw Error('Incomplete research review criteria: '+id);
 }
 return true;
}
validateMasteryResearch();

const safe=value=>String(value??'').replace(/[&<>"']/g,char=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));
const pathSegment=value=>encodeURIComponent(String(value??''));

export function masteryResearchPanel(item){
 if(!item)return '';
 return '<section class="mastery-research" id="mastery-research" aria-label="Independent mastery research practicum">'+
  '<span class="overline">MASTER LEVEL · EVIDENCE, METHODS, DEFENSE</span>'+
  '<h2>'+safe(item.title)+'</h2><p class="mastery-research-brief">'+safe(item.brief)+'</p>'+
  '<div class="mastery-research-question"><strong>Guiding research question</strong><p>'+safe(item.question)+'</p></div>'+
  '<div class="mastery-research-exhibits"><h3>Fictional evidence packet</h3><ol>'+
    item.exhibits.map(e=>'<li><strong>'+safe(e.label)+'</strong><p>'+safe(e.detail)+'</p></li>').join('')+
  '</ol></div>'+
  '<div class="mastery-research-phases"><h3>Independent investigation · three stages</h3>'+
   item.phases.map((phase,i)=>'<article class="mastery-research-phase">'+
    '<span class="mastery-research-index">PHASE 0'+(i+1)+'</span>'+
    '<h4>'+safe(phase.name)+'</h4>'+
    '<p>'+safe(phase.task)+'</p>'+
    '<details class="mastery-research-worked"><summary>Reveal and challenge the worked analysis</summary>'+
    '<p>'+safe(phase.worked)+'</p></details></article>').join('')+
  '</div>'+
  '<div class="mastery-research-counter"><h3>Challenge the first explanation</h3><p>'+safe(item.counter)+'</p></div>'+
  '<div class="mastery-research-transfer"><h3>Transfer to a different context</h3><p>'+safe(item.transfer)+'</p></div>'+
  '<div class="mastery-research-rubric"><h3>Self-review: defend your work</h3><ol>'+
    item.rubric.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol></div>'+
  '<p class="fineprint">'+safe(item.limits)+
   ' All cases are fictional and await qualified independent review. This is optional, self-directed practice: opening a worked answer does not establish expertise, confer a credential or change course completion.</p></section>';
}

/** Collapsed preview on every course landing screen; linked to its advanced
 * lesson rather than creating a new lesson key, route or progress record.
 */
export function masteryResearchRoadmap(course){
 const item=MASTERY_RESEARCH[course?.id];
 if(!item)return '';
 const advanced=course.lessons?.find(lesson=>lesson?.practicalStudio);
 if(!advanced)return '';
 const link='#/lesson/'+pathSegment(course.id)+'/'+pathSegment(advanced.id);
 return '<details class="mastery-research-roadmap">'+
  '<summary><span class="overline">MASTER LEVEL · OPTIONAL INDEPENDENT RESEARCH</span>'+
   '<strong>'+safe(item.title)+'</strong></summary>'+
  '<p>'+safe(item.brief)+'</p>'+
  '<ol>'+item.phases.map(phase=>'<li>'+safe(phase.name)+'</li>').join('')+'</ol>'+
  '<a href="'+safe(link)+'">Open the advanced lesson and research practicum</a>'+
  '<p class="fineprint">Not graded. Independent specialist review remains pending.</p></details>';
}
