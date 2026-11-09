/**
 * Xyra Atlas — first-principles companions.
 * 14 subject studies, 42 conceptual arguments, 14 worked thought experiments,
 * 14 opposing claims and 14 transfer assignments. All content is fictional
 * or educational, pending independent subject specialist review.
 * Pure rendering with no storage, network, user identity or scoring.
 */
import {FIRST_PRINCIPLES_ONE} from './firstprinciples1.js';
import {FIRST_PRINCIPLES_TWO} from './firstprinciples2.js';

export const FIRST_PRINCIPLES=Object.freeze({...FIRST_PRINCIPLES_ONE,...FIRST_PRINCIPLES_TWO});
export const FIRST_PRINCIPLES_COUNT=Object.keys(FIRST_PRINCIPLES).length;
export const FIRST_PRINCIPLES_CONCEPTS=Object.values(FIRST_PRINCIPLES).reduce((n,item)=>n+item.concepts.length,0);
const SUBJECTS=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);

export function validateFirstPrinciples(ids=SUBJECTS){
 if(!Array.isArray(ids)||ids.length!==14||new Set(ids).size!==14||
  FIRST_PRINCIPLES_COUNT!==14||FIRST_PRINCIPLES_CONCEPTS!==42||
  Object.keys(FIRST_PRINCIPLES).some(id=>!ids.includes(id)))
  throw Error('First-principles subject or concept coverage missing');
 const seen=new Set();
 for(const id of ids){
  const item=FIRST_PRINCIPLES[id];
  for(const [field,min] of Object.entries({title:24,frame:200,boundary:90}))
   if(typeof item?.[field]!=='string'||item[field].length<min)
    throw Error('First-principles field missing '+id+':'+field);
  if(seen.has(item.title))throw Error('Duplicate first-principles title '+id);
  seen.add(item.title);
  if(!Array.isArray(item.concepts)||item.concepts.length!==3)
    throw Error('Three conceptual arguments required '+id);
  for(const [index,part] of item.concepts.entries()){
   for(const [field,min] of Object.entries({heading:18,explain:300,distinction:95,failure:100}))
    if(typeof part?.[field]!=='string'||part[field].length<min)
     throw Error('Incomplete concept '+id+':'+index+':'+field);
  }
  for(const [section,fields] of [
   ['experiment',{setup:160,variables:150,reasoning:180,task:120}],
   ['contradiction',{claim:70,response:180,unknown:100}],
   ['transfer',{task:150}]
  ]){
   for(const [field,min] of Object.entries(fields))
    if(typeof item?.[section]?.[field]!=='string'||item[section][field].length<min)
     throw Error('Incomplete '+section+' '+id+':'+field);
  }
  if(!Array.isArray(item.transfer.criteria)||item.transfer.criteria.length!==4||
    item.transfer.criteria.some(x=>typeof x!=='string'||x.length<45))
    throw Error('Incomplete conceptual transfer criteria '+id);
 }
 return true;
}
validateFirstPrinciples();

const safe=value=>String(value??'').replace(/[&<>"']/g,char=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));
const urlPiece=value=>encodeURIComponent(String(value??''));

export function firstPrinciplesPanel(courseId){
 const item=FIRST_PRINCIPLES[courseId];
 if(!item)return '';
 return '<section class="first-principles" id="first-principles" aria-label="First-principles concept study">'+
 '<details class="first-principles-disclosure"><summary>'+
 '<span class="overline">FIRST PRINCIPLES · STUDY THE WHY</span>'+
 '<strong>'+safe(item.title)+'</strong>'+
 '<span class="first-principles-summary">Three deep concepts, a worked experiment and an adversarial defense. Read before tackling the advanced practical work.</span>'+
 '</summary><div class="first-principles-body">'+
 '<p class="first-principles-frame">'+safe(item.frame)+'</p>'+
 '<div class="first-principles-concepts">'+item.concepts.map((part,i)=>
  '<article class="first-principles-concept">'+
  '<span class="first-principles-number">MODEL 0'+(i+1)+' / 03</span>'+
  '<h3>'+safe(part.heading)+'</h3>'+
  '<p>'+safe(part.explain)+'</p>'+
  '<div class="first-principles-distinction"><h4>Important distinction</h4><p>'+safe(part.distinction)+'</p></div>'+
  '<div class="first-principles-failure"><h4>Common failure mode</h4><p>'+safe(part.failure)+'</p></div>'+
  '</article>').join('')+'</div>'+
 '<div class="first-principles-experiment"><h3>Thought experiment · derive, then compare</h3>'+
  '<h4>The situation</h4><p>'+safe(item.experiment.setup)+'</p>'+
  '<h4>Variables and evidence</h4><p>'+safe(item.experiment.variables)+'</p>'+
  '<h4>Independent derivation</h4><p>'+safe(item.experiment.task)+'</p>'+
  '<details class="first-principles-solution"><summary>Reveal the worked reasoning</summary><p>'+safe(item.experiment.reasoning)+'</p></details></div>'+
 '<div class="first-principles-opposition"><h3>Challenge a confident claim</h3>'+
  '<blockquote>'+safe(item.contradiction.claim)+'</blockquote>'+
  '<details class="first-principles-rebuttal"><summary>Reveal a reasoned rebuttal</summary><p>'+safe(item.contradiction.response)+'</p></details>'+
  '<h4>What remains unknown</h4><p>'+safe(item.contradiction.unknown)+'</p></div>'+
 '<div class="first-principles-transfer"><h3>Transfer your understanding</h3><p>'+safe(item.transfer.task)+'</p>'+
  '<h4>Review your evidence</h4><ol>'+item.transfer.criteria.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol></div>'+
 '<p class="fineprint">'+safe(item.boundary)+
 ' Independent editorial review remains pending. These are optional, non-graded conceptual studies, not professional qualifications. Existing lesson IDs and saved progress are unaffected.</p>'+
 '</div></details></section>';
}

export function firstPrinciplesPreview(course){
 const item=FIRST_PRINCIPLES[course?.id];
 const lesson=course?.lessons?.find(x=>x.practicalStudio);
 if(!item||!lesson)return '';
 const href='#/lesson/'+urlPiece(course.id)+'/'+urlPiece(lesson.id);
 return '<details class="first-principles-preview">'+
  '<summary><span class="overline">DEEP THEORY · THREE CONCEPTUAL MODELS</span>'+
   '<strong>'+safe(item.title)+'</strong></summary>'+
  '<p>'+safe(item.frame)+'</p>'+
  '<a href="'+safe(href)+'">Study the first-principles companion</a>'+
  '<p class="fineprint">Unreviewed educational content, not a credential or graded exam.</p></details>';
}
