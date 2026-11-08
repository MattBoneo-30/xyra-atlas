/**
 * Xyra Atlas Evidence Path: do not conflate course progress, local notes,
 * or unverified self-review with externally demonstrated competence.
 */
import {EVIDENCE_PROTOCOLS} from './evidenceprotocols.js';
export const EVIDENCE_STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
const safe=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function evidencePathStatus(completed,hasNote){
 if(!completed&&!hasNote)return {code:'not-started',label:'Lesson and draft not started',next:'Begin the linked lesson and produce your own response.'};
 if(completed&&!hasNote)return {code:'needs-draft',label:'Lesson studied · draft needed',next:'Record the stage artifact in your private Field Notebook.'};
 if(!completed&&hasNote)return {code:'draft-in-progress',label:'Draft started · study incomplete',next:'Review the linked lesson and refine the existing draft.'};
 return {code:'awaiting-review',label:'Studied and drafted · external review needed',next:'Ask a qualified reviewer to verify the artifact and corrections; no approval is recorded in Atlas.'};
}
export function validateEvidenceProtocols(courses){
 if(!Array.isArray(courses)||courses.length!==14||Object.keys(EVIDENCE_PROTOCOLS).length!==14||
  courses.some(c=>!Object.hasOwn(EVIDENCE_PROTOCOLS,c.id)||!c.portfolioJourney?.artifacts||c.portfolioJourney.artifacts.length!==3))
  throw Error('All fourteen subjects need linked portfolio evidence');
 for(const course of courses){
  const items=EVIDENCE_PROTOCOLS[course.id];
  if(items.length!==3)throw Error('Incomplete evidence path: '+course.id);
  items.forEach(([title,protocol,trap],i)=>{
   if(typeof title!=='string'||title.length<12||typeof protocol!=='string'||protocol.length<150||
      typeof trap!=='string'||trap.length<45||!course.lessons.some(l=>l.id===course.portfolioJourney.artifacts[i].lessonId&&l.stage===EVIDENCE_STAGES[i]))
    throw Error('Invalid evidence standard: '+course.id+' / '+EVIDENCE_STAGES[i]);
  });
 }
 return 42;
}
export function evidencePathPanel(course,{isLessonDone=()=>false,hasFieldNote=()=>false}={}){
 const records=EVIDENCE_PROTOCOLS[course?.id];
 const stages=course?.portfolioJourney?.artifacts;
 if(!records||!Array.isArray(stages)||stages.length!==3)return '';
 const body=records.map(([title,protocol,trap],i)=>{
  const lessonId=stages[i].lessonId;
  const done=Boolean(isLessonDone(lessonId));
  const drafted=Boolean(hasFieldNote(lessonId));
  const status=evidencePathStatus(done,drafted);
  const url='#/lesson/'+encodeURIComponent(course.id)+'/'+encodeURIComponent(lessonId);
  return '<li class="evidence-path-stage" data-evidence-stage="'+i+'" data-evidence-status="'+status.code+'">'+
   '<div class="evidence-path-stage-top"><div><span class="overline">'+safe(EVIDENCE_STAGES[i].toUpperCase())+'</span><h3>'+safe(title)+'</h3></div>'+
   '<span class="evidence-path-status">'+safe(status.label)+'</span></div>'+
   '<p class="evidence-path-next">'+safe(status.next)+'</p>'+
   '<details class="evidence-path-criteria"><summary>What an independent reviewer should verify</summary>'+
    '<p>'+safe(protocol)+'</p><p><strong>Common evidence failure:</strong> '+safe(trap)+'</p></details>'+
   '<a class="evidence-path-link" href="'+safe(url)+'">Open linked lesson and Field Notebook</a></li>';
 }).join('');
 return '<section class="evidence-path" id="evidence-path" aria-label="Evidence-based course study roadmap">'+
  '<span class="overline">EVIDENCE PATH · STUDY IS NOT CERTIFICATION</span>'+
  '<h2>Make your learning verifiable</h2>'+
  '<p>See where you have studied and written, then prepare work for independent review. A note is only a draft, not an approved result. Atlas never assigns expert signoff automatically.</p>'+
  '<details class="evidence-path-overview"><summary>Explore your three evidence milestones</summary>'+
   '<ol class="evidence-path-list">'+body+'</ol></details>'+
  '<p class="fineprint">All forty-two verification protocols await specialist editorial review. Progress labels are derived only from local lesson completion and the presence of a notebook entry—not the quality or validity of its contents. No notes are uploaded.</p></section>';
}
