/** Offline print-friendly review copy of authored curriculum; no learner notes or telemetry. */
import {isSafeReferenceURL} from '../sourcehealth.js';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=x=>String(x).replace(/[^a-z0-9-]/gi,'-');
const p=x=>'<p>'+esc(x)+'</p>';
function list(items,ordered=false){
 const tag=ordered?'ol':'ul';
 return '<'+tag+'>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</'+tag+'>';
}
function sources(items){
 return '<h4>References — validate each material claim</h4><ul>'+
 (items||[]).map(x=>isSafeReferenceURL(x.url)?'<li><a href="'+esc(x.url)+'" target="_blank" rel="noreferrer noopener">'+esc(x.label)+'</a></li>':'<li class="disclaimer">'+esc(x.label)+' (unsafe URL omitted)</li>').join('')+'</ul>';
}
function answers(options,correct){
 return '<ol class="choices">'+options.map((x,i)=>'<li'+(i===correct?' class="answer"':'')+'>'+
 esc(x)+(i===correct?' <strong>(authored answer — verify independently)</strong>':'')+'</li>').join('')+'</ol>';
}
function researchSupplement(unit){
 if(!unit)return '';
 return '<section class="review-appendix"><h4>Advanced master-level research practicum — verify every exhibit, calculation and response</h4>'+
 '<h5>'+esc(unit.title)+'</h5>'+p(unit.brief)+
 '<h5>Research question</h5>'+p(unit.question)+
 '<h5>Fictional evidence exhibits</h5>'+unit.exhibits.map((x,i)=>
  '<h6>Exhibit '+(i+1)+': '+esc(x.label)+'</h6>'+p(x.detail)).join('')+
 '<h5>Investigations and worked reasoning</h5>'+unit.phases.map((x,i)=>
  '<h6>Phase '+(i+1)+': '+esc(x.name)+'</h6>'+
  '<strong>Independent task</strong>'+p(x.task)+
  '<strong>Author example — verify rather than accept</strong>'+p(x.worked)).join('')+
 '<h5>Countercase</h5>'+p(unit.counter)+
 '<h5>Transfer assignment</h5>'+p(unit.transfer)+
 '<h5>Quality criteria</h5>'+list(unit.rubric,true)+
 '<h5>Boundaries</h5>'+p(unit.limits)+'</section>';
}
function synthesisSupplement(unit){
 if(!unit)return '';
 return '<section class="review-appendix"><h4>Intermediate synthesis seminar — verify all arguments and safety limits</h4>'+
 '<h5>'+esc(unit.title)+'</h5>'+p(unit.thesis)+
 unit.lenses.map((x,i)=>'<h6>Concept '+(i+1)+': '+esc(x.heading)+'</h6>'+p(x.body)).join('')+
 '<h5>Scenario</h5>'+p(unit.scenario)+
 '<h5>Independent assignment</h5>'+p(unit.assignment)+
 '<h5>Author model — verify independently</h5>'+p(unit.model)+
 '<h5>Transfer challenge</h5>'+p(unit.transfer)+
 '<h5>Limitations</h5>'+p(unit.limits)+'</section>';
}
function qualificationSupplement(unit){
 if(!unit)return '';
 return '<section class="review-appendix"><h4>Mastery qualification decisions — externally verify each alternative and its rationale</h4>'+
 '<h5>'+esc(unit.title)+'</h5>'+
 unit.cases.map((caseItem,i)=>
  '<h6>Decision '+(i+1)+': '+esc(caseItem.title)+'</h6>'+p(caseItem.scene)+
  '<ol class="choices">'+caseItem.choices.map((choice,j)=>
   '<li'+(j===caseItem.preferred?' class="answer"':'')+'>'+
    esc(choice.label)+(j===caseItem.preferred?' (author preferred, unverified)':'')+
    p(choice.reason)+'</li>').join('')+'</ol>'+
  '<strong>Transfer task</strong>'+p(caseItem.transfer)).join('')+
 '<h5>Independent research defense</h5>'+p(unit.defense)+
 '<h5>Defense criteria</h5>'+list(unit.criteria,true)+
 '<p class="disclaimer">Authored preferred options, calculations and interpretations require independent review, not automatic certification.</p></section>';
}
function fieldExpeditionSupplement(unit){
 if(!unit)return '';
 return '<section class="review-appendix"><h4>Longitudinal field expedition — independently verify every concept, task, worked example and limitation</h4>'+
 '<h5>'+esc(unit.title)+'</h5>'+
 '<strong>Learning mission</strong>'+p(unit.mission)+
 '<strong>Continuing case</strong>'+p(unit.context)+
 unit.sessions.map((session,i)=>
   '<h6>Session '+(i+1)+': '+esc(session.name)+'</h6>'+
   '<strong>Conceptual basis</strong>'+p(session.principle)+
   '<strong>Independent assignment</strong>'+p(session.assignment)+
   '<strong>Evidence standard</strong>'+p(session.evidence)+
   '<strong>Illustrative response — independently verify</strong>'+p(session.worked)
 ).join('')+
 '<h5>Final research defense</h5>'+p(unit.defense)+
 '<h5>Five quality checks</h5>'+list(unit.criteria,true)+
 '<h5>Boundaries and safety</h5>'+p(unit.boundary)+
 '<p class="disclaimer">Self-directed learning, not independent expert approval or certification. The time spacing is optional and no progress is recorded.</p></section>';
}
function firstPrinciplesSupplement(item){
 if(!item)return '';
 return '<section class="review-appendix"><h4>First-principles conceptual companion — verify models, examples and safety limitations</h4>'+
 '<h5>'+esc(item.title)+'</h5>'+p(item.frame)+
 item.concepts.map((part,i)=>
  '<h6>Concept '+(i+1)+': '+esc(part.heading)+'</h6>'+
  '<strong>Explanation — verify each claim</strong>'+p(part.explain)+
  '<strong>Essential distinction</strong>'+p(part.distinction)+
  '<strong>Common failure</strong>'+p(part.failure)).join('')+
 '<h5>Thought experiment</h5><strong>Situation</strong>'+p(item.experiment.setup)+
 '<strong>Variables</strong>'+p(item.experiment.variables)+
 '<strong>Independent task</strong>'+p(item.experiment.task)+
 '<strong>Worked argument — not yet approved</strong>'+p(item.experiment.reasoning)+
 '<h5>Adversarial claim and reply</h5>'+p(item.contradiction.claim)+
 '<strong>Authored rebuttal</strong>'+p(item.contradiction.response)+
 '<strong>Unknown facts</strong>'+p(item.contradiction.unknown)+
 '<h5>Transfer exercise</h5>'+p(item.transfer.task)+
 '<h5>Evidence standards</h5>'+list(item.transfer.criteria,true)+
 '<h5>Boundaries</h5>'+p(item.boundary)+
 '<p class="disclaimer">All theoretical claims and worked arguments remain pending independent specialist review; this content does not imply a credential.</p></section>';
}
function competencyBridgeSupplement(item){
 if(!item)return '';
 return '<section class="review-appendix"><h4>Progressive competency bridge — verify the stage-specific learning claim and all worked reasoning</h4>'+
 '<h5>'+esc(item.stage)+' skill target</h5>'+p(item.objective)+
 '<h5>Reasoning model</h5>'+p(item.reasoning)+
 '<h5>Illustrative case</h5>'+p(item.scenario)+
 '<h5>Independent assignment</h5>'+p(item.challenge)+
 '<h5>Author worked explanation — independently verify</h5>'+p(item.feedback)+
 '<h5>Evidence of understanding</h5>'+p(item.proof)+
 '<p class="disclaimer">Pending qualified independent review. Neither completion nor a worked example certifies mastery.</p></section>';
}
function inquiryTrailSupplement(item){
 if(!item)return '';
 const stationNames=['Observe','Explain','Challenge','Transfer'];
 return '<section class="review-appendix"><h4>Four-stop visual inquiry trail — verify all course teaching and worked reasoning</h4>'+
  '<h5>'+esc(item.title)+'</h5>'+
  '<strong>Learning claim</strong>'+p(item.thesis)+
  '<strong>Continuing case</strong>'+p(item.context)+
  item.stations.map((station,i)=>
   '<h6>Station '+(i+1)+' — '+esc(stationNames[i])+': '+esc(station.heading)+'</h6>'+
   '<strong>Driving question</strong>'+p(station.question)+
   '<strong>Conceptual explanation</strong>'+p(station.concept)+
   '<strong>Independent exercise</strong>'+p(station.challenge)+
   '<strong>Worked comparison, pending independent review</strong>'+p(station.worked)+
   '<strong>Misleading shortcut</strong>'+p(station.trap)+
   '<strong>Evidence standard</strong>'+p(station.evidence)
  ).join('')+
  '<h5>Ethical or domain boundaries</h5>'+p(item.boundary)+
  '<p class="disclaimer">Educational and ungraded. All 56 inquiry responses and subject facts require genuine independent expert review. No approval is implied.</p></section>';
}
function crossworldSupplement(item){
 if(!item)return '';
 return '<section class="review-appendix"><h4>Cross-world transfer studio — independent specialist verification required</h4>'+
 '<h5>'+esc(item.title)+'</h5>'+
 '<p><strong>Related discipline:</strong> '+esc(item.partner)+'</p>'+
 '<strong>Continuing case</strong>'+p(item.scenario)+
 '<h5>Two separate reasoning lenses</h5>'+
 (item.models||[]).map((entry,i)=>'<strong>Lens '+(i+1)+'</strong>'+p(entry)).join('')+
 '<h5>Independent application task</h5>'+p(item.challenge)+
 '<h5>Worked reference — do not assume expert approval</h5>'+p(item.worked)+
 '<h5>Counterargument or disconfirming possibility</h5>'+p(item.falsifier)+
 '<h5>Evidence of satisfactory reasoning</h5>'+p(item.evidence)+
 '<h5>Domain limits</h5>'+p(item.boundary)+
 '<p class="disclaimer">Optional educational material pending independently qualified subject review. No score, credential or accreditation is implied.</p></section>';
}
function lesson(item){
 const c=item.content;
 return '<details id="lesson-'+slug(item.id)+'" class="review-item"><summary><strong>'+esc(c.title)+
 '</strong><span>'+esc(c.stage)+' · Pending review</span></summary><div class="detail">'+
 '<p class="hash">SHA-256 source hash: <code>'+esc(item.contentHash)+'</code></p>'+
 '<h4>Stage learning objective — independently evaluate alignment</h4>'+
 (c.stageLearningObjective?'<p><strong>Goal:</strong> '+esc(c.stageLearningObjective.goal)+'</p>'+
 '<p><strong>Evidence of understanding:</strong> '+esc(c.stageLearningObjective.evidence)+'</p>':
 '<p class="disclaimer">Stage objective not documented: reviewer must request curriculum correction.</p>')+
 '<h4>Introduction</h4>'+p(c.intro)+
 (c.sections||[]).map((s,i)=>'<h4>Teaching section '+(i+1)+': '+esc(s.heading)+'</h4>'+p(s.body)).join('')+
 '<h4>Worked example</h4>'+p(c.workedExample)+
 '<h4>Applied assignment</h4>'+p(c.task)+
 '<h4>Evidence and transfer practice</h4>'+list(c.stagePractice||[],true)+
 '<h4>Assessment question</h4>'+p(c.quiz.question)+answers(c.quiz.options,c.quiz.correct)+
 '<h4>Assessment rationale</h4>'+p(c.quiz.explanation)+sources(c.references)+
 researchSupplement(c.masterLevelResearchPracticum)+competencyBridgeSupplement(c.stageCompetencyBridge)+synthesisSupplement(c.intermediateSynthesisSeminar)+qualificationSupplement(c.qualificationDecisions)+fieldExpeditionSupplement(c.longitudinalFieldExpedition)+firstPrinciplesSupplement(c.firstPrinciplesCompanion)+inquiryTrailSupplement(c.subjectInquiryTrail)+crossworldSupplement(c.crossWorldAppliedMission)+
 '<h4>Human review checklist</h4>'+list(item.checklist||[])+
 '<p class="disclaimer">This author-supplied copy is not an independent expert approval. Review actual evidence, applicability, context and safety before signing.</p>'+
 '</div></details>';
}
function decision(item){
 const c=item.content;
 return '<details id="decision-'+slug(item.id)+'" class="review-item"><summary><strong>'+esc(item.id)+
 '</strong><span>Pending review</span></summary><div class="detail">'+
 '<p class="hash">SHA-256 source hash: <code>'+esc(item.contentHash)+'</code></p>'+
 '<h4>Scenario</h4>'+p(c.question)+answers(c.options,c.correct)+
 '<h4>Decision rationale</h4>'+p(c.explanation)+sources(c.sources)+
 '<p class="disclaimer">An authored answer is not validated expertise. Inspect each alternative and the reasoning.</p>'+
 '</div></details>';
}
const style=[
 '.review-appendix{border-top:2px solid #a18bbb;margin:28px 0;padding:16px;background:#faf8fc}.review-appendix h5{font-size:17px;margin:20px 0 8px}.review-appendix h6{font-size:14px;margin:15px 0 5px}.review-appendix p{overflow-wrap:anywhere}',
 '*,*:before,*:after{box-sizing:border-box}',
 'body{margin:0;color:#20192e;background:#f5f2fa;font:16px/1.65 system-ui,Arial,sans-serif}',
 'header{padding:30px 5%;background:#211333;color:#fff}main{max-width:1080px;margin:auto;padding:24px}',
 'nav,.intro,.review-item{background:#fff;border:1px solid #d9cfe6;border-radius:10px}',
 'nav,.intro{padding:18px}nav ul{columns:2}.group{margin:28px 0}',
 '.review-item{margin:9px 0}summary{cursor:pointer;padding:13px 16px;display:flex;gap:10px;justify-content:space-between}',
 'summary span,.hash,.disclaimer{font-size:.86rem;color:#645575}',
 '.detail{padding:0 18px 22px;border-top:1px solid #e5dfec}',
 '.detail p,code{overflow-wrap:anywhere}h2,h3,h4{line-height:1.3}',
 '.choices .answer{background:#eff9e9;padding:4px}',
 'a{color:#49318c}a:focus-visible,summary:focus-visible{outline:3px solid #7350aa;outline-offset:3px}',
 '.flag{background:#fff0c9;color:#6b3b10;border-radius:5px;padding:3px;font-size:.74rem}',
 '@media(max-width:600px){nav ul{columns:1}main{padding:12px}summary{flex-direction:column}}',
 '@media print{body{background:white}header{color:#20192e;background:white}nav{display:none}.group{break-before:page}summary{display:block}details:not([open])>.detail{display:block!important}details{break-inside:auto}}'
].join('');
export function renderEditorialReviewHTML(packet){
 if(!packet||packet.status!=='review-packet-not-independent-signoff'||
 !Array.isArray(packet.lessons)||!Array.isArray(packet.decisions)||!Array.isArray(packet.references))
 throw Error('Invalid author review packet');
 const subjects=[...new Set(packet.lessons.map(x=>x.course))];
 const nav=subjects.map(s=>'<li><a href="#subject-'+slug(s)+'">'+esc(s)+
 ' ('+packet.lessons.filter(x=>x.course===s).length+')</a></li>').join('');
 const content=subjects.map(s=>{
  const ls=packet.lessons.filter(x=>x.course===s);
  const ds=packet.decisions.filter(x=>x.content.courseId===s);
  return '<section id="subject-'+slug(s)+'" class="group"><h2>'+esc(s)+
  (ls.some(x=>x.highStakes)?' <span class="flag">Expert safety review prioritized</span>':'')+'</h2>'+
  '<p>'+ls.length+' lessons · '+ds.length+' decision cases</p>'+
  '<h3>Full lessons</h3>'+ls.map(lesson).join('')+
  '<h3>Applied decisions</h3>'+ds.map(decision).join('')+'</section>';
 }).join('');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8">'+
 '<meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<meta name="robots" content="noindex,nofollow"><title>Xyra Atlas — Independent Editorial Review Copy</title>'+
 '<style>'+style+'</style></head><body><header><h1>Xyra Atlas · Editorial Review Copy</h1>'+
 '<p>Full authored curriculum for externally credential-verified reviewers. Never an automatic certification.</p></header>'+
 '<main><aside role="note" class="intro"><strong>All items pending independent review.</strong>'+
 '<p>'+packet.lessons.length+' lessons, '+packet.decisions.length+' decisions and '+
 packet.references.length+' unique references. Source hashes match the companion machine-readable packet.'+
 ' Verify every factual statement and answer, with special care for high-stakes and Philippine jurisdiction-specific claims.</p>'+
 '<p>No personal notes, analytics or passwords are included. Reference links open only when selected.</p></aside>'+
 '<nav aria-label="Review subjects"><h2>Subject index</h2><ul>'+nav+'</ul></nav>'+
 content+'</main></body></html>';
}
