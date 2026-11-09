/** Xyra Atlas optional qualification clinic.
 * Two subject-specific, authored decision checkpoints per learning world:
 * 28 cases, 84 alternative-specific explanations, 14 defense prompts.
 * This is not the official course quiz, a certificate, a psychological or
 * professional assessment. All cases are fictional and require human review.
 * No accounts, storage, analytics, telemetry, network or grading.
 */
import {QUALIFYING_ONE} from './qualifying1.js';
import {QUALIFYING_TWO} from './qualifying2.js';

export const QUALIFYING=Object.freeze({...QUALIFYING_ONE,...QUALIFYING_TWO});
export const QUALIFYING_COUNT=Object.keys(QUALIFYING).length;
const SUBJECTS=Object.freeze(['psychology','laws','business','savings','time','languages','communication','thinking','digital','career','science','relationships','negotiation','shadow']);
export function validateQualification(subjects=SUBJECTS){
 if(!Array.isArray(subjects)||subjects.length!==14||new Set(subjects).size!==14||
 QUALIFYING_COUNT!==14||Object.keys(QUALIFYING).some(k=>!subjects.includes(k)))
  throw Error('Qualification subject coverage is incomplete');
 const titles=new Set();
 for(const id of subjects){
  const unit=QUALIFYING[id];
  if(typeof unit?.title!=='string'||unit.title.length<18||
   titles.has(unit.title)||typeof unit.defense!=='string'||unit.defense.length<100||
   !Array.isArray(unit.criteria)||unit.criteria.length!==3||
   unit.criteria.some(line=>typeof line!=='string'||line.length<30)||
   !Array.isArray(unit.cases)||unit.cases.length!==2)
   throw Error('Qualification unit invalid: '+id);
  titles.add(unit.title);
  for(const [i,caseItem] of unit.cases.entries()){
   if(typeof caseItem.title!=='string'||caseItem.title.length<16||
    typeof caseItem.scene!=='string'||caseItem.scene.length<100||
    typeof caseItem.transfer!=='string'||caseItem.transfer.length<65||
    !Array.isArray(caseItem.choices)||caseItem.choices.length!==3||
    !Number.isInteger(caseItem.preferred)||caseItem.preferred<0||caseItem.preferred>2||
    caseItem.choices.some(choice=>typeof choice.label!=='string'||choice.label.length<7||
     typeof choice.reason!=='string'||choice.reason.length<50))
    throw Error('Qualification checkpoint incomplete: '+id+':'+i);
  }
 }
 return true;
}
validateQualification();

const safe=value=>String(value??'').replace(/[&<>"']/g,char=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));

/** Pure evaluation supports unit tests without DOM, persistence or scoring. */
export function evaluateQualification(courseId,caseIndex,choiceIndex){
 const item=QUALIFYING[courseId];
 if(!item||!Number.isInteger(caseIndex)||!Number.isInteger(choiceIndex)||
  caseIndex<0||caseIndex>=item.cases.length||choiceIndex<0||choiceIndex>2)return null;
 const caseItem=item.cases[caseIndex],preferred=caseItem.preferred;
 return Object.freeze({
  preferred:choiceIndex===preferred,chosen:choiceIndex,
  rationale:caseItem.choices[choiceIndex].reason,
  preferredLabel:caseItem.choices[preferred].label,
  preferredReason:caseItem.choices[preferred].reason,
  transfer:caseItem.transfer
 });
}

export function qualificationPanel(courseId){
 const item=QUALIFYING[courseId];
 if(!item)return '';
 return '<section class="qualifying-clinic" aria-label="Mastery qualification clinic">'+
 '<span class="overline">ADVANCED · APPLY, CHALLENGE, DEFEND</span>'+
 '<h2>'+safe(item.title)+'</h2>'+
 '<p class="qualifying-intro">Choose a response before viewing the comparison. Each answer has different reasoning; the preferred response applies only to this fictional situation. No grade or saved score is created.</p>'+
 '<div class="qualifying-cases">'+item.cases.map((caseItem,index)=>
  '<article class="qualifying-case" data-qualifying-case="'+index+'">'+
   '<span class="qualifying-number">DECISION '+String(index+1).padStart(2,'0')+' / 02</span>'+
   '<h3>'+safe(caseItem.title)+'</h3><p>'+safe(caseItem.scene)+'</p>'+
   '<p class="qualifying-question"><strong>Choose the best-supported response.</strong></p>'+
   '<div class="qualifying-choices" role="group" aria-label="'+safe(caseItem.title)+' answer choices">'+
    caseItem.choices.map((choice,choiceIndex)=>
    '<button type="button" class="qualifying-choice" data-qualifying-course="'+safe(courseId)+
     '" data-qualifying-step="'+index+'" data-qualifying-answer="'+choiceIndex+
     '" aria-pressed="false">'+safe(choice.label)+'</button>').join('')+'</div>'+
   '<p class="qualifying-feedback" role="status" aria-live="polite" aria-atomic="true" data-qualifying-feedback="'+index+'"></p>'+
   '<details class="qualifying-transfer"><summary>Independent transfer challenge</summary><p>'+
    safe(caseItem.transfer)+'</p></details>'+
  '</article>').join('')+'</div>'+
 '<div class="qualifying-defense"><h3>Research defense · produce an artifact</h3><p>'+safe(item.defense)+'</p>'+
 '<h4>Check your evidence against these standards</h4><ol>'+
  item.criteria.map(line=>'<li>'+safe(line)+'</li>').join('')+'</ol></div>'+
 '<p class="fineprint">Educational self-check only. Neither a correct choice nor this defense implies professional competence, independent editorial approval, accreditation or certification. Keep private work in your own notebook if you choose.</p></section>';
}

/** Event delegation survives SPA route changes. All output uses textContent. */
export function installQualificationInteractions(doc=typeof document==='undefined'?null:document){
 if(!doc?.addEventListener)return false;
 if(doc.__atlasQualificationInstalled)return false;
 Object.defineProperty(doc,'__atlasQualificationInstalled',{value:true,configurable:true});
 doc.addEventListener('click',event=>{
  const button=event.target?.closest?.('button[data-qualifying-answer]');
  if(!button)return;
  const scope=button.closest('.qualifying-case');
  if(!scope)return;
  const id=button.getAttribute('data-qualifying-course');
  const step=Number(button.getAttribute('data-qualifying-step'));
  const choice=Number(button.getAttribute('data-qualifying-answer'));
  const result=evaluateQualification(id,step,choice);
  if(!result)return;
  for(const other of scope.querySelectorAll('button[data-qualifying-answer]')){
   other.setAttribute('aria-pressed',String(other===button));
  }
  const output=scope.querySelector('[data-qualifying-feedback]');
  if(!output)return;
  output.textContent=(result.preferred?'Preferred for this fictional case. ':'Reconsider this choice. ')+
   result.rationale+(result.preferred?'':(' Preferred here: '+result.preferredLabel+
   '. '+result.preferredReason));
 });
 return true;
}
installQualificationInteractions();
