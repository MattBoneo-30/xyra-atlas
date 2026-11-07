/** Xyra Atlas — interactive choice and consequence labs for 14 subjects.
 * Two original staged decisions per subject, 84 independently authored
 * feedback paths. No scores, user tracking, storage or server requests.
 * A choice changes local DOM only; course progress and grades stay untouched.
 */
import {RESPONSE_SIMULATIONS_A} from './responsesimulations1.js';
import {RESPONSE_SIMULATIONS_B} from './responsesimulations2.js';
export const RESPONSE_SIMULATIONS=Object.freeze({...RESPONSE_SIMULATIONS_A,...RESPONSE_SIMULATIONS_B});
export const RESPONSE_SIMULATION_COUNT=Object.keys(RESPONSE_SIMULATIONS).length;
const ESC=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validateResponseSimulations(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas subjects');
 const ids=new Set(courses.map(c=>c?.id));
 if(ids.size!==14||RESPONSE_SIMULATION_COUNT!==14||
    Object.keys(RESPONSE_SIMULATIONS).some(id=>!ids.has(id)))
  throw Error('Incomplete interactive simulation subject coverage');
 const changes=[];
 for(const [id,entry] of Object.entries(RESPONSE_SIMULATIONS)){
  const course=courses.find(c=>c.id===id);
  const lesson=course.lessons.find(l=>l.stage==='Intermediate');
  if(!lesson)throw Error('Missing published intermediate prerequisite: '+id);
  for(const [name,min] of Object.entries({title:24,situation:170,synthesis:120,model:140,caveat:65})){
   if(typeof entry[name]!=='string'||entry[name].length<min)
    throw Error('Incomplete simulation '+id+':'+name);
  }
  if(!Array.isArray(entry.rounds)||entry.rounds.length!==2||!Array.isArray(entry.rubric)||
     entry.rubric.length!==4||entry.rubric.some(x=>typeof x!=='string'||x.length<45))
   throw Error('Missing rounds or criteria in simulation '+id);
  for(const round of entry.rounds){
   if(typeof round.title!=='string'||round.title.length<20||
      typeof round.prompt!=='string'||round.prompt.length<55||
      !Array.isArray(round.choices)||round.choices.length!==3||
      round.choices.filter(c=>c[2]===true).length!==1)
    throw Error('Incomplete interactive decision '+id);
   const labels=new Set();
   for(const choice of round.choices){
    if(!Array.isArray(choice)||choice.length!==3||typeof choice[0]!=='string'||
       choice[0].length<27||typeof choice[1]!=='string'||choice[1].length<65||
       typeof choice[2]!=='boolean'||labels.has(choice[0]))
     throw Error('Incomplete response path '+id);
    labels.add(choice[0]);
   }
  }
  const key=id+':'+lesson.id;
  if(course.responseSimulation||lesson.responseSimulation){
   if(course.responseSimulation?.key!==key||lesson.responseSimulation?.key!==key)
    throw Error('Conflicting interactive simulation '+id);
   continue;
  }
  changes.push({course,lesson,entry,key});
 }
 for(const {course,lesson,entry,key} of changes){
  const item=Object.freeze({
   key,title:entry.title,situation:entry.situation,
   rounds:Object.freeze(entry.rounds.map(round=>Object.freeze({
    title:round.title,prompt:round.prompt,
    choices:Object.freeze(round.choices.map(c=>Object.freeze([...c])))
   }))),
   synthesis:entry.synthesis,model:entry.model,
   rubric:Object.freeze([...entry.rubric]),caveat:entry.caveat,
   reviewStatus:'pending-independent-review'
  });
  course.responseSimulation=item;
  lesson.responseSimulation=item;
 }
 return changes.length;
}
export function evaluateResponseChoice(item,step,option){
 if(!item||!Number.isInteger(step)||!Number.isInteger(option)||step<0||step>1||
    option<0||option>2)return null;
 const choice=item.rounds?.[step]?.choices?.[option];
 if(!choice)return null;
 return {stronger:choice[2],consequence:choice[1],next:step===0?'Review the new evidence below.':'Complete the independent synthesis below.'};
}
export function responseSimulationPanel(course){
 const item=course?.responseSimulation;
 if(!item)return '';
 return '<section class="response-simulation" id="response-simulation" aria-label="Two-round interactive scenario practice" data-simulation-course="'+ESC(course.id)+'">'+
 '<details class="response-simulation-shell"><summary><span class="overline">PRACTISE A REAL DECISION</span><strong>'+ESC(item.title)+'</strong><span class="response-simulation-toggle">Open two-round choice simulator</span></summary>'+
 '<div class="response-simulation-body"><p class="response-simulation-intro">Make a decision, examine its consequence, then respond when the situation changes. None of these choices is recorded, scored, or presented as professional advice.</p>'+
 '<div class="response-simulation-scene"><h3>Scenario brief</h3><p>'+ESC(item.situation)+'</p></div>'+
 item.rounds.map((round,i)=>'<fieldset class="response-simulation-round" data-sim-step="'+i+'"'+(i?' hidden':'')+'>'+
 '<legend><span>DECISION '+(i+1)+' / 2</span><strong>'+ESC(round.title)+'</strong></legend>'+
 '<p class="response-simulation-prompt">'+ESC(round.prompt)+'</p>'+
 '<div class="response-simulation-choices">'+round.choices.map((c,j)=>
  '<button type="button" data-sim-choice="'+j+'" data-sim-round="'+i+'" aria-pressed="false">'+ESC(c[0])+'</button>').join('')+'</div>'+
 '<p class="response-simulation-feedback" role="status" aria-live="polite" hidden></p></fieldset>').join('')+
 '<div class="response-simulation-final" hidden><h3>Produce your own decision memo</h3><p>'+ESC(item.synthesis)+'</p>'+
 '<details class="response-simulation-model"><summary>Compare with an illustrative worked response</summary><p>'+ESC(item.model)+'</p></details>'+
 '<h4>Four independent quality checks</h4><ol>'+item.rubric.map(x=>'<li>'+ESC(x)+'</li>').join('')+'</ol></div>'+
 '<p class="fineprint">'+ESC(item.caveat)+' All authored choices await independent editorial review. No grades, exams or saved learner data are modified.</p></div></details></section>';
}
export function activateResponseSimulationChoice(root,step,option){
 if(!root||typeof root.querySelector!=='function')return false;
 const item=RESPONSE_SIMULATIONS[root.dataset?.simulationCourse];
 const result=evaluateResponseChoice(item,step,option);
 const round=root.querySelector('[data-sim-step="'+step+'"]');
 if(!result||!round||round.hidden)return false;
 const choices=round.querySelectorAll('[data-sim-choice]');
 if(choices.length!==3)return false;
 choices.forEach((button,i)=>{
  const active=i===option;
  button.classList.toggle('is-selected',active);
  button.setAttribute('aria-pressed',String(active));
 });
 const feedback=round.querySelector('.response-simulation-feedback');
 if(!feedback)return false;
 feedback.hidden=false;
 feedback.textContent=(result.stronger?'Stronger decision. ':'Consider the trade-off. ')+
  result.consequence+' '+result.next;
 const next=step===0?root.querySelector('[data-sim-step="1"]'):root.querySelector('.response-simulation-final');
 if(next)next.hidden=false;
 return true;
}
if(typeof document!=='undefined'){
 document.addEventListener('click',event=>{
  const btn=event.target?.closest?.('[data-sim-choice]');
  const root=btn?.closest?.('[data-simulation-course]');
  if(!root||!btn||!root.contains(btn))return;
  const step=Number(btn.getAttribute('data-sim-round'));
  const option=Number(btn.getAttribute('data-sim-choice'));
  if(!Number.isInteger(step)||!Number.isInteger(option))return;
  const round=btn.closest('[data-sim-step]');
  if(!round||round.hidden||round.getAttribute('data-sim-step')!==String(step))return;
  activateResponseSimulationChoice(root,step,option);
 });
}
