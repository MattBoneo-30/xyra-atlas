/** Ephemeral decision-calibration interactions; no storage or network. */
import {calibrationFeedback} from './calibrationlabs.js';
const idle='Choose a response to see its evidence-based trade-off. No automatic skill grade is given.';
function resetRound(node){
 node.querySelectorAll('[data-action="calibration-answer"]').forEach(button=>{
  button.setAttribute('aria-pressed','false');
  button.classList.remove('is-selected');
 });
 const feedback=node.querySelector('.calibration-feedback');
 if(feedback){feedback.textContent=idle;feedback.classList.remove('is-supported');}
}
document.addEventListener('click',event=>{
 const button=event.target.closest?.('[data-action="calibration-answer"]');
 if(!button)return;
 const root=button.closest('#calibration-lab');
 if(!root||!root.closest('.reading-page'))return;
 const round=Number(button.dataset.round),option=Number(button.dataset.option);
 const group=button.closest('[data-calibration-round]');
 const result=calibrationFeedback(root.dataset.calibrationCourse,round,option);
 if(!result||!group||group.dataset.calibrationRound!==String(round)||group.hidden)return;
 if(round===1&&!root.dataset.firstChoice)return;
 const first=root.querySelector('[data-calibration-round="0"]');
 const second=root.querySelector('[data-calibration-round="1"]');
 if(round===0){
  if(root.dataset.firstChoice!==String(option)){
   resetRound(second);
   const finish=root.querySelector('[data-calibration-finish]');
   if(finish)finish.hidden=true;
  }
  root.dataset.firstChoice=String(option);
 }
 group.querySelectorAll('[data-action="calibration-answer"]').forEach(el=>{
  const active=el===button;
  el.setAttribute('aria-pressed',String(active));
  el.classList.toggle('is-selected',active);
 });
 const feedback=group.querySelector('.calibration-feedback');
 if(feedback){
  feedback.classList.toggle('is-supported',result.preferred);
  feedback.textContent=(result.preferred?'Best supported in this case. ':'Check the trade-off. ')+result.explanation;
 }
 if(round===0){
  const reveal=root.querySelector('[data-calibration-reveal]');
  if(reveal)reveal.hidden=false;
  if(second)second.hidden=false;
 }else{
  const finish=root.querySelector('[data-calibration-finish]');
  if(finish)finish.hidden=false;
 }
});