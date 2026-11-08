/**
 * Xyra Atlas — Mastery Defense.
 * One original evidence-producing defense for each subject's existing advanced
 * stage. A written artifact and credible counterexample are required; merely
 * revealing the illustrative response is not a competency score.
 * No new lesson identities or unverified professional qualifications.
 */
const raw={
 psychology:{
  title:'Defense 01 · An attribution is not an observation',
  brief:'A fictional manager believes a teammate is deliberately undermining a project because the teammate declined two meetings. One decline is accompanied by a calendar conflict and the other has no explanation. The manager wants to write a negative performance evaluation immediately.',
  assignment:'Build a decision memo with a verified timeline, at least two plausible explanations, an information-gathering question and a proportionate next action. Explain how your judgment would change if later evidence showed a repeated pattern of missed agreed obligations.',
  model:'The observable evidence supports two declines, not a motive. A scheduling conflict explains one; the other is ambiguous. The manager should ask for the colleague’s availability and clarify project expectations before assigning blame. If dated evidence later documents repeated missed commitments despite clear expectations, the response can shift toward documented performance support without claiming to know an inner intention.',
  counter:'The worker’s repeated nonparticipation could be material even without hostile intent. Avoid using uncertainty about motive to excuse unaddressed project risk.',
  checks:['Separates behavior, inference and confirmed facts','Includes a plausible alternate explanation','Names a noncoercive test and a revision trigger','Avoids diagnosis and preserves safety'],
  boundary:'An educational case, not mental-health diagnosis or personnel legal advice.'
 },
 laws:{
  title:'Defense 02 · A claim needs a jurisdiction and rule',
  brief:'A subscription page says renewal is automatic. A customer claims the cancellation button was difficult to find, while the seller claims the customer accepted the terms. No country, timestamped checkout design, or full agreement has yet been established.',
  assignment:'Prepare a factual complaint analysis listing parties, location, contract terms, screenshots, records of cancellation attempts and the official source you would consult. State a reasonable remedy request without asserting a universal legal conclusion.',
  model:'The strongest initial conclusion is that the facts are incomplete. Preserve the dated purchase, renewal and cancellation records; identify the applicable jurisdiction, seller and actual terms. Ask for a clear cancellation record and resolution, then verify the relevant consumer authority’s current rules before escalating. A potentially misleading design is not a proven statutory breach until the applicable rule and facts are checked.',
  counter:'A customer may have agreed to a plainly disclosed term. It remains necessary to evaluate what was actually shown and agreed, rather than assuming every unwanted renewal is unlawful.',
  checks:['Identifies jurisdiction and current primary authority','Distinguishes policy, contract and legal obligations','Documents a time-ordered evidence chain','Frames a remedy proportionately without invented certainty'],
  boundary:'Not legal advice. Verify current official legislation, complaint process and local counsel when stakes matter.'
 },
 business:{
  title:'Defense 03 · Profit cannot be inferred from revenue',
  brief:'A studio sells 40 software subscriptions monthly at ₱350 each. Recurring tools cost ₱3,000 per month; each account costs ₱50 monthly to serve. An average of 28 staff-support minutes per customer costs an estimated ₱180 per staff hour. Ignore taxes and acquisition costs for the first estimate, then discuss why doing so may overstate profit.',
  assignment:'Calculate monthly revenue, software variable costs, support labor, and provisional contribution after these stated costs. Present a sensitivity case with 60 subscribers and 40 support minutes per customer. Explain the decision you would take before increasing marketing spend.',
  model:'At 40 subscribers, revenue is ₱14,000; direct variable software cost is ₱2,000. Support takes 40×28÷60≈18.67 hours, costing ₱3,360. After ₱3,000 in recurring tools, the provisional remainder is ₱5,640 before taxes, refunds, acquisition and other labor. At 60 subscribers and 40 minutes each, revenue is ₱21,000, direct variable cost ₱3,000, support 40 hours costing ₱7,200 and tools ₱3,000; remainder ₱7,800. Growth in revenue does not scale the remainder proportionally. Verify support time, retention and true acquisition cost before buying growth.',
  counter:'These amounts assume subscriber support is uniform and tool fees fixed. If trial users require much more help or marketing costs rise, cash generation may be substantially worse.',
  checks:['Shows units and each calculation explicitly','Separates revenue, fixed cost and variable service effort','Includes a defensible stress scenario','Names missing data and a launch/stop decision'],
  boundary:'Illustrative cost model, not personalized financial or investment advice.'
 },
 savings:{
  title:'Defense 04 · Liquidity survives the worst month',
  brief:'A fictional household has ₱25,000 available, essential spending of ₱18,000 due this month, a ₱4,000 loan minimum, and a proposal to invest ₱8,000 in an asset that cannot be sold for six months. The household has no other cash and variable next-month income.',
  assignment:'Prepare a one-month liquidity plan and explain whether the ₱8,000 investment is feasible without sacrificing near-term obligations. Model one unexpected ₱3,000 bill. Identify the data needed before selecting any investment.',
  model:'After essentials and the loan minimum, only ₱3,000 remains this month. An ₱8,000 illiquid investment would create a ₱5,000 immediate cash shortfall if those bills are paid, so it cannot be justified by the information given. With a further ₱3,000 surprise, the original ₱3,000 cushion is eliminated. Preserve near-term cash and verify obligations, loan terms, income stability, protection and risk capacity before deciding whether any amount can be invested.',
  counter:'A household with an immediately accessible alternative reserve or rearrangeable due dates might reach a different answer; those facts cannot be silently invented.',
  checks:['Accounts for all stated obligations and timing','Models the unexpected cost explicitly','Distinguishes an investment horizon from cash needs','Does not promise returns or recommend unsuitable risk'],
  boundary:'General educational arithmetic, not financial advice.'
 },
 time:{
  title:'Defense 05 · The critical path versus a full calendar',
  brief:'A team has 12 focused hours available. A prototype requires 4 hours of design, then 5 hours of implementation, then 2 hours of testing. A logo polish task takes 3 hours and is independent of the prototype. The team promises both tasks by tomorrow.',
  assignment:'Draw the dependency sequence, compute the minimum prototype effort, choose what can realistically ship and name the first task to remove if testing reveals a new two-hour defect. Define a transparent update to stakeholders.',
  model:'The prototype follows design → implementation → testing, requiring at least 11 hours without delay. Adding the independent 3-hour logo task raises total focused effort to 14 hours, exceeding the 12-hour capacity by 2. Prioritize a tested prototype; defer logo polish. If a defect adds two hours to the critical path, prototype effort rises to 13, so scope, deadline or staffing must change. A responsible status report states the new estimate and the trade-off instead of calling overwork a plan.',
  counter:'Work can overlap only when distinct qualified capacity exists; the given single 12-hour budget does not establish parallel staffing.',
  checks:['Models actual dependencies rather than task wishlists','Computes remaining capacity without hidden overlap','Protects testing and reasonable recovery','Explains a clear scope or schedule trade-off'],
  boundary:'Planning exercise, not an instruction to omit required rest or safety checks.'
 },
 languages:{
  title:'Defense 06 · Reading a phrase is not understanding a response',
  brief:'A traveller memorizes eight useful phrases in a new language. They can read a station question and a price question but cannot independently interpret a rapid answer from a local speaker. A device voice reads the memorized questions aloud.',
  assignment:'Design an honest two-week skills plan that separately measures reading recall, independent listening, comprehensible spoken production and successful repair when the listener is not understood. Specify which regional forms need expert review and how you would verify them.',
  model:'Begin with exact-script reading and covered-text recall, then progress to short verified native/regional audio clips with distinct answers. Ask a speaker to reply unpredictably in a controlled station scenario and log which details were actually understood. Use clarification phrases and written destination checks. Device speech synthesis is an optional model, not a measure of the learner’s phonetic accuracy. Do not report A1 certification or fluent conversation from a rehearsed eight-phrase pack.',
  counter:'An improved written recall score may reflect memorization alone. Without comprehension of novel replies, real conversation ability remains unverified.',
  checks:['Distinguishes reading, listening, speaking and interaction','Uses independent authentic verification where available','States what rehearsal does not prove','Includes regional review and a realistic progress criterion'],
  boundary:'Authored language pedagogy pending qualified native/regional review, not a CEFR or pronunciation certification.'
 },
 communication:{
  title:'Defense 07 · Repair without pretending agreement',
  brief:'Two colleagues disagree over a missed handoff. One has a dated checklist showing an incomplete submission; the other has a dated message showing the submission requirement was changed without acknowledgement. A team lead wants a single person to apologize.',
  assignment:'Produce a 90-second repair script that acknowledges each person’s documented concern, clarifies the mismatch and establishes one prospective procedure. Separate intent, impact, accountability and unresolved facts.',
  model:'A defensible opening is: “The checklist says the original handoff was incomplete, while the later message shows the requirement changed. We can acknowledge the delay and the unclear update without assuming either person deliberately caused it. Let us agree on a single confirmation channel and owner for future changes.” An apology can address concrete impact without inventing knowledge of motive. Record the agreed handoff and revisit it after one cycle.',
  counter:'The revised rule may not have been authorized or received. Do not treat the second message alone as proof that everyone reasonably understood a changed obligation.',
  checks:['Acknowledges both documented accounts','Makes a concrete future request','Avoids mind-reading and performative blame','Defines a measurable repair follow-up'],
  boundary:'Educational conflict practice; in threats or harassment, use safe escalation rather than forced confrontation.'
 },
 thinking:{
  title:'Defense 08 · Resist the attractive causal story',
  brief:'A study compares 80 volunteers who use a productivity app with 80 nonusers. App users report 22 finished tasks per month, compared with 17 for nonusers. Participants were not randomized; initial motivation, workload and task definitions were not recorded.',
  assignment:'State the observed difference, design the smallest credible improvement to the study and identify three rival explanations. Give one conclusion the data support and one they do not.',
  model:'The observed association is five reported tasks per month (22 minus 17); the design does not isolate an app effect. More motivated volunteers may adopt the app, workloads may differ, and reporting criteria may vary. A stronger test would define completed tasks consistently, record baseline rates and compare randomly assigned access where feasible and ethical. Until that occurs, the conclusion is that the groups differ, not that the app caused five extra tasks.',
  counter:'A real causal benefit remains possible despite these flaws. Avoid concluding “the app does nothing” simply because this study is weak.',
  checks:['Calculates the descriptive effect correctly','Names selection and measurement confounding','Separates evidence of association from causality','Offers a feasible falsifiable design improvement'],
  boundary:'Methodology teaching, not a peer-reviewed result.'
 },
 digital:{
  title:'Defense 09 · Security claims need testable controls',
  brief:'A developer publishes an app with a login screen, encrypted network transport and a privacy policy, then claims “zero security risk.” The app stores sensitive user documents and has not had access-control testing or incident-recovery drills.',
  assignment:'Draft a pragmatic threat model for account takeover and unauthorized document access. Specify identity verification, authorization boundaries, logging, backup recovery, and a defensible public security claim. Include a limitation that remains after testing.',
  model:'Identify user documents as high-value assets and credentials, tokens, server APIs and object storage as boundaries. Verify server-side ownership checks across every read and download route, review session invalidation and recovery flows, and test a blocked cross-account request without exposing actual user data. Encrypting transport protects one channel but does not prove authorization. The public description should identify tested controls, date and remaining unknowns; “zero risk” is not an evidence-based claim.',
  counter:'Even rigorous security checks cannot establish absence of all vulnerabilities, especially across dependencies and future configuration changes.',
  checks:['Names concrete assets, threats and trust boundaries','Tests authorization beyond the interface','Includes recovery and incident containment','Avoids absolute security guarantees'],
  boundary:'Defensive security education; use permitted test accounts and systems only.'
 },
 career:{
  title:'Defense 10 · Technical evidence over fashionable labels',
  brief:'A junior developer lists React, Laravel and database design on a resume. Their portfolio shows a complete visual app but no reproducible build instructions, test plan or explanation of trade-offs. A reviewer questions whether the work is actually theirs.',
  assignment:'Write a defensible case study outline with a project problem, independently owned contributions, architecture rationale, deployment procedure, test evidence, a known limitation and one measurable improvement. Prepare one hard reviewer question and your response.',
  model:'A credible case describes the exact requirement, the candidate’s owned files or features, why a Laravel API and React presentation were chosen, how to run the build and a representative integration test. A screenshot demonstrates appearance, not correctness. Include a reproducible bug and its remediation, or an acknowledged unresolved limitation. State “I implemented X and verified Y” rather than “I built an enterprise-grade platform” without evidence.',
  counter:'A genuine project can still be poorly documented. Absence of a case study does not by itself prove deception; it does mean the portfolio supports fewer claims.',
  checks:['Distinguishes team and individual ownership','Offers reproductions instead of vague superlatives','Explains design trade-offs and limits','Links claims to observable artifacts'],
  boundary:'Career practice, not a guarantee of hiring outcomes.'
 },
 science:{
  title:'Defense 11 · A precise number can still be wrong',
  brief:'A classroom sensor measures a liquid at 24.62 °C three times, returning 24.62, 24.61 and 24.63 °C. A calibrated reference thermometer reads 25.4 °C under the same conditions. The sensor’s calibration history is unknown.',
  assignment:'Estimate the mean observed sensor value and the offset against the reference. Distinguish the sensor’s repeatability from accuracy, identify a plausible systematic issue and propose a verification sequence before reporting a final temperature.',
  model:'The three sensor readings average (24.62+24.61+24.63)/3 = 24.62 °C. Relative to the stated reference reading of 25.4 °C, the sensor reports about 0.78 °C lower. Its close repeated readings show repeatability under these conditions, not agreement with a calibration reference. Recheck the instruments’ stated uncertainties, probe placement, temperature stabilization and calibration history before applying any correction or claiming the true temperature.',
  counter:'A single reference reading and the label “calibrated” do not erase its own uncertainty or prove the instruments sensed identical physical conditions.',
  checks:['Performs the mean and difference calculations correctly','Separates precision and accuracy','Accounts for reference and environmental uncertainty','Proposes a reproducible calibration follow-up'],
  boundary:'Illustrative measurement exercise; not a certified calibration or health test.'
 },
 relationships:{
  title:'Defense 12 · Conflict or coercion: update the risk level',
  brief:'A person declines an invitation and their partner initially responds with disappointment. Weeks later, the partner repeatedly threatens to disclose private information if the person says no and demands isolation from friends.',
  assignment:'Create a factual behavior timeline, identify the point where the response should change from ordinary relationship repair to safety planning, and draft a nonconfrontational support option. Do not diagnose personalities from the case.',
  model:'Feeling disappointed after an invitation is not itself evidence of abuse. Repeated threats to expose private information and demands for isolation introduce coercive control and safety concerns. Preserve relevant documentation only when safe, contact a trusted person or qualified local support, and avoid arranging a private confrontation that increases danger. The conclusion should describe observable behavior and options, not an unqualified diagnosis of the partner.',
  counter:'A threatened person may not be able to preserve records or contact supporters safely. A good plan respects the person’s control over disclosure and the practical risk of retaliation.',
  checks:['Names the specific behavior that changes the risk assessment','Avoids clinical labels and one-sided certainty','Prioritizes autonomy and immediate safety','Offers choices rather than forced action'],
  boundary:'Educational safety scenario, not individualized domestic-abuse or clinical advice.'
 },
 negotiation:{
  title:'Defense 13 · A price is not the whole agreement',
  brief:'A freelancer is offered ₱24,000 for 30 hours of work, including two revisions. The buyer proposes adding a 15-hour feature and five extra revisions for ₱3,000 more. Ignore taxes and overhead for the initial hourly calculation.',
  assignment:'Compute the original and revised effective hourly rates using at least the stated 15 extra hours. State what is unknown about the five revision rounds and draft a written change order with scope, acceptance and payment terms.',
  model:'The initial headline is ₱24,000/30 = ₱800 per hour before taxes and overhead. With the extra feature alone, ₱27,000/45 = ₱600 per hour. Extra revision effort would push the actual rate below ₱600 unless compensated or tightly bounded. A defensible response specifies the feature, tested acceptance conditions, revision count and duration, delivery impact and a revised fee. The freelancer can decline if the package crosses their documented walk-away limit.',
  counter:'If the feature generates reusable intellectual property or future recurring work, it could have noncash value, but that benefit should be evaluated rather than assumed.',
  checks:['Uses hours and fee consistently','Identifies hidden revision and delivery risk','Presents a coherent alternative package','States a transparent walk-away threshold'],
  boundary:'Educational negotiation arithmetic, not a legal determination of contract rights.'
 },
 shadow:{
  title:'Defense 14 · Recognize deception without a lie detector',
  brief:'A seller changes the delivery date twice and later demands an immediate extra transfer outside the marketplace. They claim a delay will forfeit the order. There is no invoice or contract term supporting the additional fee.',
  assignment:'Create a dated claims ledger that separates confirmed discrepancies from inferred motives, identify the financial risk, and prepare a safe verification and disengagement strategy that does not rely on reading body language.',
  model:'The changing dates establish inconsistency, not knowing deceit. The off-platform payment demand, lack of documentation and manufactured urgency create specific reasons not to transfer money before independent verification. Keep records of the original order, contact the official marketplace channel rather than the provided payment link, and use available dispute procedures if appropriate. There is no need to prove the seller’s psychological intention before protecting funds.',
  counter:'A legitimate shipment can face delays or additional lawful charges; the decisive issue is whether the fee and channel can be verified against original agreements and trusted records.',
  checks:['Uses dated evidence rather than nonverbal myths','Distinguishes risk management from accusations','Verifies payment terms using independent channels','Avoids unsafe confrontation and escalation'],
  boundary:'Defensive education on coercion and fraud, not evidence of a specific person’s criminal intent.'
 }
};
export const MASTERY_DEFENSES=Object.freeze(Object.fromEntries(Object.entries(raw).map(([id,x])=>[id,Object.freeze({...x,checks:Object.freeze([...x.checks]),reviewStatus:'pending-independent-review'})])));
const safe=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function attachMasteryDefenses(courses){
 if(!Array.isArray(courses)||courses.length!==14||new Set(courses.map(c=>c.id)).size!==14||
   courses.some(c=>!Object.hasOwn(MASTERY_DEFENSES,c.id)))throw Error('Fourteen-subject Mastery Defense coverage required');
 let added=0;
 for(const course of courses){
  const lesson=course.lessons.find(x=>x.stage==='Advanced');
  const defense=MASTERY_DEFENSES[course.id];
  if(!lesson)throw Error('No advanced stage for '+course.id);
  for(const field of ['brief','assignment','model','counter']){
   if(defense[field].length<150)throw Error('Insufficient '+field+' for '+course.id);
  }
  if(defense.checks.length!==4||defense.checks.some(x=>x.length<30))throw Error('Incomplete rubric '+course.id);
  if(lesson.masteryDefense)continue;
  lesson.masteryDefense=defense;
  added++;
 }
 return added;
}
export function masteryDefenseTemplate(defense){
 if(!defense)return '';
 return [
  'MASTERY DEFENSE — '+defense.title,
  'Claim and decision: ',
  'Evidence and calculations: ',
  'Best opposing explanation: ',
  'Uncertainty and what would change my mind: ',
  'Verification / next action: '
 ].join('\n');
}
export function composeDefenseNote(existing,template,maxLength=2000){
 if(typeof existing!=='string'||typeof template!=='string'||!template.trim()||
    !Number.isInteger(maxLength)||maxLength<1)return {ok:false,reason:'invalid'};
 const original=existing.slice(0,maxLength);
 if(original.includes(template.trim()))return {ok:false,reason:'already-added'};
 const combined=original.trim()?original+'\n\n'+template:template;
 if(existing.length>maxLength||combined.length>maxLength)return {ok:false,reason:'full'};
 return {ok:true,value:combined,reason:'inserted'};
}
export function masteryDefensePanel(defense,courseId,lessonId){
 if(!defense||MASTERY_DEFENSES[courseId]!==defense)return '';
 const template=masteryDefenseTemplate(defense);
 return '<section id="mastery-defense" class="mastery-defense" data-mastery-course="'+safe(courseId)+
  '" data-mastery-lesson="'+safe(lessonId)+'" aria-label="Advanced mastery defense assignment">'+
  '<span class="overline">ADVANCED · EVIDENCE-BASED DEFENSE</span><h2>'+safe(defense.title)+'</h2>'+
  '<p class="mastery-defense-intro">A defensible conclusion survives scrutiny, opposing evidence and an explicit revision test. Produce your own response before opening the worked reference.</p>'+
  '<h3>The case</h3><p>'+safe(defense.brief)+'</p>'+
  '<h3>Your independent assignment</h3><p>'+safe(defense.assignment)+'</p>'+
  '<button type="button" class="mastery-defense-insert" data-action="mastery-insert-template">Insert writing scaffold into my private Field Notebook</button>'+
  '<p class="mastery-defense-status" role="status" aria-live="polite">The draft stays on this device and is included in your Atlas backup. Existing notes are never replaced.</p>'+
  '<details class="mastery-defense-reference"><summary>Compare with a reasoned worked response after trying</summary>'+
  '<p>'+safe(defense.model)+'</p><h4>Strongest counterargument</h4><p>'+safe(defense.counter)+'</p></details>'+
  '<h3>Self-check your evidence</h3><ol>'+defense.checks.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol>'+
  '<p class="fineprint">'+safe(defense.boundary)+' Authored examples and self-review standards are pending independent specialist review. No automatic grade or professional credential is awarded.</p></section>';
}
