/**
 * Xyra Atlas — Evidence calibration lab.
 * Fourteen original subject scenarios; two decisions each, three responses
 * each. Model choices are context-bounded examples, not professional advice,
 * actual reviewer approval, diagnostic findings or a validated competence score.
 * No persistence, private inputs, network access or lesson identity changes.
 */
const drafts={
 psychology:{
  lessonId:'emotions',title:'When a single message feels like proof',
  situation:'A teammate replies “fine” to a request and abruptly leaves the conversation. You feel embarrassed and assume they are angry with you. You do not know what else happened today.',
  first:{prompt:'What should you do with your first interpretation?',
   options:[
    ['Treat the interpretation as a hypothesis and ask a neutral follow-up.','The message is observable; the teammate’s intention is not. A neutral follow-up checks your story without surrendering a legitimate need.'],
    ['Message the group that the teammate is disrespectful.','This elevates an unverified interpretation to a public accusation. It may damage trust without clarifying the missing facts.'],
    ['Deny the feeling and never address the situation.','Suppressing every concern removes an opportunity to clarify expectations. Regulation is not the same as silence.']
   ],preferred:0},
  reveal:'You learn the teammate left because a family member needed urgent help. They did not know you interpreted the reply as hostile.',
  second:{prompt:'How does this new evidence change your next response?',
   options:[
    ['Acknowledge the new context, offer flexibility, and discuss any unresolved work detail later.','This updates the original hypothesis, responds humanely and preserves the option for practical coordination.'],
    ['Insist the original message proves they were angry.','This protects the first story against contradictory evidence rather than recalibrating it.'],
    ['Apologize for every feeling you experienced and promise never to ask again.','A new explanation does not make your emotions wrong or require permanent withdrawal of reasonable questions.']
   ],preferred:0},
  transfer:'Write a trigger–fact–inference–alternative table for a new ambiguous interaction. Define one observation that would change the response.',
  rubric:['Can I quote the observable event without assigning motive?','Did I revise my interpretation when new information arrived?','Does my follow-up respect my safety and the other person’s agency?']
 },
 laws:{
  lessonId:'consumer',title:'A consumer complaint without invented legal certainty',
  situation:'A recently purchased device intermittently fails. You have a receipt, a video and the seller’s order terms, but have not checked the applicable law or warranty exclusions.',
  first:{prompt:'Which complaint begins with a defensible evidentiary record?',
   options:[
    ['Send a dated description of the fault, the receipt, and a request for the available remedies.','This clearly separates documented facts from disputed legal remedies and creates a record for follow-up.'],
    ['State that every defective purchase automatically carries a cash refund anywhere.','Consumer remedies vary by jurisdiction, timing and facts. A universal legal assertion is not established here.'],
    ['Threaten criminal prosecution in the first message without identifying a rule.','An unsupported legal threat substitutes intimidation for accurate jurisdiction-specific analysis.']
   ],preferred:0},
  reveal:'The seller replies that the manufacturer should handle the case, but does not identify a contract provision or official procedure supporting that position.',
  second:{prompt:'What is the next evidence-focused step?',
   options:[
    ['Request the relevant warranty terms and escalation procedure; verify the current official local guidance.','The seller’s response is a claim to investigate, not automatically proof of either party’s legal position.'],
    ['Assume the referral is always illegal.','A referral may or may not be relevant under particular terms and laws; no universal violation is established.'],
    ['Delete the order record and restart without documentation.','Removing contemporaneous evidence makes an accurate chronology and effective escalation harder.']
   ],preferred:0},
  transfer:'Prepare a one-page chronology, document inventory and a neutral escalation request for a fictional purchase in a named jurisdiction.',
  rubric:['Did I distinguish seller policy, contract wording and actual law?','Are disputed details stated as questions instead of unverified violations?','Can another reader reconstruct the dates and sources?']
 },
 business:{
  lessonId:'sales',title:'Do compliments forecast a viable product?',
  situation:'A founder has twenty enthusiastic landing-page comments, two detailed discovery interviews and one limited paid pilot. Development time is nearly exhausted.',
  first:{prompt:'What most directly tests whether the business might work?',
   options:[
    ['Track the pilot’s paid usage, retention signals, delivery cost and unmet needs.','A paid pilot is stronger evidence than compliments, but repeatability and economics still need to be measured.'],
    ['Assume comments equal twenty paying customers.','Positive words without purchasing behavior cannot reliably establish conversion or sustainable demand.'],
    ['Build every feature suggested by commenters before shipping.','This may consume resources while delaying a test of the customer problem and real usage.']
   ],preferred:0},
  reveal:'The pilot pays a small fee but support takes more hours than the service earns. Customers request a feature unrelated to the original value proposition.',
  second:{prompt:'How should the offer change in light of this cost evidence?',
   options:[
    ['Review scope and pricing, test a narrower workflow, and define a viability threshold.','The offer might be salvageable, but the economics demand an explicit test before expansion.'],
    ['Scale advertising immediately because revenue is positive.','Positive sales can conceal negative contribution after support, refunds and variable costs.'],
    ['Promise free unlimited support indefinitely to secure testimonials.','An unbounded service commitment can worsen the exact cost structure the pilot exposed.']
   ],preferred:0},
  transfer:'Build a small pilot scorecard with user behavior, support minutes, variable cost, contribution and a stop-or-iterate criterion.',
  rubric:['Did I separate compliments, purchase and retention evidence?','Are delivery and support costs included in the decision?','Is there a falsifiable stopping condition?']
 },
 savings:{
  lessonId:'debt',title:'A payoff plan that survives a bad month',
  situation:'A person has two debts with different rates and minimum payments. Their wages vary month to month, and the emergency reserve covers less than one essential-bill cycle.',
  first:{prompt:'What is the safest starting frame for comparing repayment plans?',
   options:[
    ['Protect essential expenses and minimums, then model extra payments and a realistic reserve.','Rate comparisons matter, but a plan that fails when income dips can trigger penalties and immediate hardship.'],
    ['Ignore minimum payments and send all cash to the highest-interest account.','Missing a contractual minimum can create costs or default even if the targeted debt carries a high rate.'],
    ['Assume a bigger payment always saves the same interest regardless of loan terms.','Interest calculations, timing and prepayment terms must be checked against the actual agreement.']
   ],preferred:0},
  reveal:'A lower-than-usual paycheck arrives next month. The originally proposed extra payment would leave insufficient funds for rent and food.',
  second:{prompt:'How should the debt repayment plan respond to this income shortfall?',
   options:[
    ['Revise the payment schedule, preserve essentials, and contact the lender early if minimums are at risk.','This treats repayment as a cash-flow problem under uncertainty rather than defending an unworkable schedule.'],
    ['Borrow at an unknown rate immediately to preserve the old repayment target.','Unexamined new credit can move or deepen the risk without fixing the actual budget shock.'],
    ['Conceal the shortage and assume fees are impossible.','A plan should model contractual consequences and contingencies, not depend on unverified optimism.']
   ],preferred:0},
  transfer:'Compare two six-month repayment tables with a low-income shock. Show cash left for essentials and any penalties rather than quoting only interest saved.',
  rubric:['Do the assumptions match actual payment terms?','Are the minimum payments and essentials feasible in the stress case?','Have I stated when professional or lender support is needed?']
 },
 time:{
  lessonId:'review',title:'Planning against capacity rather than ambition',
  situation:'A learner schedules forty hours of project work, but a realistic calendar shows only sixteen usable hours after employment, sleep and commitments.',
  first:{prompt:'What should change before the week begins?',
   options:[
    ['Prioritize the highest-value deliverable, reduce scope and reserve contingency time.','Capacity is a hard constraint; selecting a finishable outcome creates clearer evidence of progress.'],
    ['Keep forty hours on the calendar and label the difference motivation.','An estimate that ignores known constraints makes failure likely and obscures the real scheduling problem.'],
    ['Remove all sleep and recovery blocks to reach the original target.','Sacrificing necessary recovery is neither a reliable estimate nor a sustainable productivity strategy.']
   ],preferred:0},
  reveal:'An unavoidable family obligation removes four hours from the planned sixteen, while a partially completed feature has an unclear remaining effort.',
  second:{prompt:'How do you handle the changed forecast?',
   options:[
    ['Re-estimate the remaining critical task, protect a shippable minimum, and communicate what moves.','A good plan updates with evidence, preserves explicit completion criteria, and communicates which lower-priority commitment must move.'],
    ['Continue promising the full original scope without revisiting the timeline.','Known capacity loss should change the forecast; otherwise deadlines are presented without support.'],
    ['Start three new tasks to compensate for the delay.','Additional work in progress increases switching and makes the bottleneck harder to finish.']
   ],preferred:0},
  transfer:'Create a twelve-hour weekly plan with task estimates, recovery time, a buffer and a stated task to defer if the first estimate overruns.',
  rubric:['Did I count actual available time rather than ideal time?','Does the revised scope have an observable definition of done?','Are contingency and recovery protected?']
 },
 languages:{
  lessonId:'conversation',title:'Repair communication when memorization fails',
  situation:'You ask for the train station using an authored model phrase. The listener answers quickly, and you recognize only a place name. You are unsure where to go.',
  first:{prompt:'What response demonstrates practical comprehension discipline?',
   options:[
    ['Request repetition and confirm only the detail you actually recognized.','Admitting a gap is more useful than pretending a full answer was understood. The phrase must suit the speaker and locale.'],
    ['Nod and walk in an unverified direction.','Polite appearance does not substitute for understanding directions, particularly in an unfamiliar place.'],
    ['Repeat the first question more loudly without listening to the reply.','Volume alone does not resolve a vocabulary or speech-rate gap; this response repeats the request without checking whether the answer was understood.']
   ],preferred:0},
  reveal:'The repeated reply still contains an unfamiliar direction. A public map and the written station name are available nearby.',
  second:{prompt:'What should you confirm before following unfamiliar directions?',
   options:[
    ['Use the written destination and map to confirm one usable step, and seek a slower explanation if needed.','Combining textual evidence with clarification closes the comprehension gap without claiming native-like fluency.'],
    ['Guess a verb ending and give directions back to the listener.','Unsupported invented morphology risks confusion and does not confirm the route; request an independently checked example instead.'],
    ['Treat hearing the same phrase twice as proof of understanding.','Repeated sound exposure is not equivalent to interpreting the information correctly.']
   ],preferred:0},
  transfer:'Create a four-turn clarification exchange and identify which translation, register and pronunciation details need a qualified regional reviewer.',
  rubric:['Did I distinguish recognition from independent comprehension?','Can the task be completed with the evidence actually available?','Did I flag any unverified local expression or pronunciation?']
 },
 communication:{
  lessonId:'boundaries',title:'A boundary with an emergency exception',
  situation:'Work messages arrive after midnight even when they concern nonurgent matters. You need consistent sleep but want a reliable way to deal with real emergencies.',
  first:{prompt:'Which response names an actionable boundary?',
   options:[
    ['State normal reply hours and ask the team to agree on an urgent escalation route.','This defines a behavior you can control while protecting genuine operational needs.'],
    ['Accuse everyone who sends a message of trying to harm you.','Assigning motive without evidence can intensify conflict and avoids designing a workable team norm.'],
    ['Answer every message instantly but resent the team privately.','Without a communicated expectation, the pattern is likely to continue and both sides may remain unaware of the practical boundary.']
   ],preferred:0},
  reveal:'A colleague now describes an actual production outage affecting customers, but has used the same informal channel as routine reminders.',
  second:{prompt:'How should this communication boundary evolve for genuine emergencies?',
   options:[
    ['Clarify and test a genuine emergency pathway with explicit criteria, preserving the regular-hours rule.','A reasonable exception improves coordination rather than making every late message urgent.'],
    ['Declare all future night messages emergencies.','Without triage criteria, the exception swallows the boundary and repeats the original problem.'],
    ['Ignore all emergency communication forever, regardless of shared responsibilities.','The case calls for negotiating obligations and an explicit response arrangement, not pretending risk disappeared.']
   ],preferred:0},
  transfer:'Write a two-sentence boundary and a one-sentence emergency definition that a colleague can apply without interpreting your mood.',
  rubric:['Is the expectation observable and within my control?','Does the exception have a clear definition?','Does the wording avoid diagnoses and personal attacks?']
 },
 thinking:{
  lessonId:'causation',title:'The metric moved. Did the product cause it?',
  situation:'A new planning tool is adopted by high-performing teams first. Their output is better than the organization average, and the vendor claims the tool caused the improvement.',
  first:{prompt:'What is the most useful challenge to the causal claim?',
   options:[
    ['Compare outcomes before and after adoption while accounting for baseline team differences.','The voluntary early-adopter group may differ before treatment; a suitable comparison is necessary before causal attribution.'],
    ['Accept the vendor’s explanation because the observed average is higher.','A between-group difference alone cannot rule out selection or confounding, particularly when experienced teams volunteered first.'],
    ['Reject all software interventions as incapable of affecting productivity.','The data are insufficient to prove this effect, not evidence that no tool could ever help.']
   ],preferred:0},
  reveal:'After controlling for baseline output, the apparent advantage shrinks. Other changes to staffing happened at the same time.',
  second:{prompt:'How should your causal conclusion change after the new evidence?',
   options:[
    ['Describe the association as uncertain, investigate staffing effects, and design a fairer comparison.','The new information weakens confidence in the original attribution without proving the tool has no effect.'],
    ['Keep claiming the original improvement as fully caused by the tool.','That conclusion is inconsistent with the new confounding evidence and hides uncertainty about the cause of the observed change.'],
    ['State that the tool has been proven harmful.','A shrinking advantage does not establish a negative causal effect; a fairer comparison would be needed before claiming either direction.']
   ],preferred:0},
  transfer:'Draw a three-node confounding diagram and identify one result that would change your preferred causal story.',
  rubric:['Are baseline differences accounted for?','Did I distinguish uncertainty from a negative finding?','Is the next test designed to rule out a plausible alternative?']
 },
 digital:{
  lessonId:'scams',title:'Incident response after a suspicious login prompt',
  situation:'A text says your cloud account will close in fifteen minutes and includes a familiar-looking URL. You cannot verify the sender from the message alone.',
  first:{prompt:'Which verification path does not depend on the message?',
   options:[
    ['Open the official app or a known bookmark independently and inspect account alerts.','Independent access avoids handing credentials to a link whose destination the sender controls.'],
    ['Enter your password on the text link to see whether the threat is real.','Credential submission is exactly what many phishing pages seek; testing it can create the incident.'],
    ['Send the message to friends with instructions to click it.','Redistribution may expose more people without establishing legitimacy and can amplify an attacker-controlled credential collection link.']
   ],preferred:0},
  reveal:'You remember entering credentials on the linked page before realizing it looked suspicious. It is unknown whether they were captured.',
  second:{prompt:'What changes from verification to containment?',
   options:[
    ['Use the trusted service to change credentials, review sessions and MFA, and check recovery contacts.','Possible exposure warrants a proportionate incident response through the real provider, not further interaction with the suspicious page.'],
    ['Return to the suspicious site to ask whether it saved the password.','The page is not a trusted incident responder and could continue collecting information.'],
    ['Do nothing because no account takeover has yet been observed.','An absence of visible misuse does not eliminate the need to contain potentially exposed credentials.']
   ],preferred:0},
  transfer:'Create a short incident checklist covering verification, session revocation, recovery-method integrity, and communication that avoids victim blame.',
  rubric:['Is the verification route independent of the suspicious sender?','Do response steps address possible credential exposure?','Are unknown facts represented as unknown rather than proved?']
 },
 career:{
  lessonId:'portfolio',title:'From a polished demo to a credible technical case',
  situation:'A developer presents a responsive React interface and claims it is secure, accessible and production-ready, but provides no testing or operational evidence.',
  first:{prompt:'What most strengthens the portfolio claim?',
   options:[
    ['Add verifiable architecture decisions, test evidence and a precise list of remaining limitations.','The reviewer can assess real engineering decisions when claims have reproducible supporting artifacts.'],
    ['Increase animation speed and call the site enterprise-grade.','Visual polish does not establish architecture, security or production reliability.'],
    ['Hide all bug reports and present every feature as flawless.','Withholding known limitations erodes trust and prevents meaningful technical review.']
   ],preferred:0},
  reveal:'A deployment error appears under a real-world configuration. The developer cannot reproduce a locally passing test in that environment.',
  second:{prompt:'What belongs in the case study update?',
   options:[
    ['Document the environment difference, isolate a reproduction, fix or disclose the failure, and show the verification result.','An accurate defect history can be stronger engineering evidence than an unqualified success claim.'],
    ['Remove the deployment link but keep the “fully deployed” claim.','That headline becomes misleading once the operational limitation is known; describe exactly which deployment environment was verified.'],
    ['Blame the hosting provider without checking application behavior.','Attributing fault before investigation is an unsupported claim that skips debugging.']
   ],preferred:0},
  transfer:'Write a project case page with an architecture diagram, test commands, measured results and one explicitly unresolved risk.',
  rubric:['Can another developer repeat my test?','Have I separated what works locally from what works in production?','Does every performance or security claim have evidence?']
 },
 science:{
  lessonId:'probability',title:'Precision, repeatability and a drifting instrument',
  situation:'A field sensor produces consistent values to two decimal places over twenty trials. The team assumes the readings are accurate even though the sensor was not calibrated.',
  first:{prompt:'What does the evidence establish at this stage?',
   options:[
    ['Repeatability under the tested conditions, but not independently established accuracy.','Consistency can coexist with systematic bias; calibration against an appropriate reference remains necessary.'],
    ['Accuracy to two decimal places because the display has two decimal places.','Resolution and printed digits do not independently establish measurement accuracy.'],
    ['Proof the underlying phenomenon never changes.','The repeated sample cannot justify an unlimited claim about all environments or time periods.']
   ],preferred:0},
  reveal:'A reference measurement reveals a stable offset, and readings drift more strongly when ambient temperature rises.',
  second:{prompt:'How should the measurement report be revised after calibration?',
   options:[
    ['Report the bias and environmental limit, revise the method, and remeasure against a traceable reference.','The new data reveal systematic error that simple repeated averaging would not remove.'],
    ['Average more uncalibrated readings and ignore the reference.','More samples can narrow random error but do not remove an uncorrected systematic offset.'],
    ['Delete the reference result as inconvenient and keep the published precision.','Discarding disconfirming evidence makes the reported uncertainty less defensible.']
   ],preferred:0},
  transfer:'Draft a measurement memo separating resolution, repeatability, bias, environmental sensitivity and required next calibration.',
  rubric:['Are instrument precision and accuracy treated separately?','Did environmental effects enter the uncertainty account?','Is the proposed correction empirically testable?']
 },
 relationships:{
  lessonId:'conflict-care',title:'When disagreement becomes a safety question',
  situation:'Two friends disagree about cancelled plans. Both express frustration, but no threats are present, and each is willing to discuss repairs.',
  first:{prompt:'What is a proportionate response to this first account?',
   options:[
    ['Describe the impact, listen to the other account, and agree on a specific scheduling repair.','The known facts support a repair-focused conversation; a single disagreement is not enough to infer abuse or a diagnosis.'],
    ['Diagnose one friend with a personality disorder.','No clinical evaluation is available, and labeling from an isolated dispute is unwarranted.'],
    ['Assume a healthy friendship never involves conflict.','Disagreements can occur without coercion; the pattern, mutual safety and willingness to repair matter more than the mere presence of conflict.']
   ],preferred:0},
  reveal:'Later, one friend repeatedly threatens to publish private messages whenever the other declines an invitation. The person targeted feels afraid to say no.',
  second:{prompt:'How does this change the assessment?',
   options:[
    ['Treat the threats as a safety concern, preserve evidence when safe, and seek trusted support.','Coercive threats change the priority from ordinary compromise to autonomy and safety.'],
    ['Keep insisting on a private reconciliation meeting regardless of fear.','A forced confrontation can increase risk when consent and safety are compromised.'],
    ['Conclude that the initial scheduling conflict itself proved this threat would occur.','New conduct can change the assessment without making earlier unverified predictions retrospectively proven.']
   ],preferred:0},
  transfer:'Compare two timelines and identify the precise point where the recommendation changes from repair to safety-oriented support.',
  rubric:['Did I avoid diagnosing from anecdotes?','Did I respond to evidence of coercion without minimization?','Are safety and access to support prioritized over confrontation?']
 },
 negotiation:{
  lessonId:'anchors',title:'The true price of an undefined revision clause',
  situation:'A freelancer is offered ₱18,000 for a website with unspecified revisions, deadlines and handover criteria. The headline price seems attractive.',
  first:{prompt:'What should be clarified before accepting?',
   options:[
    ['Deliverables, revision rounds, change requests, acceptance criteria and payment schedule.','The total workload and nonprice terms determine whether the offer is viable; undefined revisions can overwhelm a seemingly good headline price.'],
    ['Only whether the buyer can increase the upfront amount.','An improved headline can still hide unlimited effort and low effective hourly earnings.'],
    ['Nothing; ambiguity always benefits the freelancer.','Undefined responsibilities often increase dispute and unpaid revision risk for both parties.']
   ],preferred:0},
  reveal:'The buyer asks for a full additional page and a new integration after the original design was approved, without offering more time or payment.',
  second:{prompt:'What is a constructive response to the scope change?',
   options:[
    ['Show the agreed scope, assess the new effort, and propose an explicit change order.','The process separates a new deliverable from the existing contract and allows informed agreement.'],
    ['Promise to do all extra work for free to avoid discomfort.','An unbounded concession may undermine delivery quality and the project’s economics.'],
    ['Declare the buyer malicious without confirming what was originally agreed.','A disagreement about scope should first be evaluated against the written terms and actual request.']
   ],preferred:0},
  transfer:'Calculate an effective hourly range at two possible revision counts and write a clear, respectful change request.',
  rubric:['Did I compare the complete package rather than price alone?','Can the change request be understood without hidden assumptions?','Is the walk-away or renegotiation point explicit?']
 },
 shadow:{
  lessonId:'lies',title:'Inconsistency is a question, not a verdict',
  situation:'A seller gives two different shipping estimates on separate dates. You cannot tell whether the difference came from a revised forecast, an error or intentional deception.',
  first:{prompt:'What is justified by the evidence available?',
   options:[
    ['Record both statements and ask for a verifiable current delivery commitment.','The inconsistency is real, but the sender’s awareness or intention remains unknown.'],
    ['Call the seller a proven liar based on the discrepancy alone.','A conflict between estimates does not prove knowing deception or rule out legitimate changes.'],
    ['Trust the latest estimate automatically without keeping the previous record.','Discarding the timeline makes it harder to identify a reliable commitment or later remedy.']
   ],preferred:0},
  reveal:'The seller begins pressuring you to pay an extra “release fee” immediately, but offers no invoice, agreement or verified business channel for this charge.',
  second:{prompt:'What changes in the risk assessment?',
   options:[
    ['Stop using the unverified payment channel, request documentation, and use a trusted dispute route if needed.','The new payment demand creates a concrete financial risk even without proof of the seller’s personal motives.'],
    ['Pay quickly to test whether the shipment is real.','Using a payment as a verification experiment risks loss and may invite further demands.'],
    ['Arrange a confrontation solely to detect lies from body language.','Nonverbal stereotypes are not a reliable proof method and a confrontation may increase risk while failing to establish the truth of the payment claim.']
   ],preferred:0},
  transfer:'Build a dated claims ledger and define when uncertainty is sufficient to refuse payment without accusing a person of a crime.',
  rubric:['Are claims tied to dated records?','Do I act on verified financial risks rather than speculative motives?','Is the verification or escalation path independent?']
 }
};
// Different preferred-option positions prevent a repeated answer-key pattern.
 // Deterministic rotation keeps exported review hashes stable across sessions.
const rotated=(round,offset)=>{
 const count=round.options.length,shift=offset%count;
 return Object.freeze({...round,
  preferred:(round.preferred+shift)%count,
  options:Object.freeze(round.options.map((_,index)=>Object.freeze(
    round.options[(index-shift+count)%count])))});
};
const entries=Object.entries(drafts).map(([id,value],index)=>[id,Object.freeze({
 ...value,
 first:rotated(value.first,index%3),
 second:rotated(value.second,(index+1)%3),
 rubric:Object.freeze([...value.rubric]),
 reviewStatus:'pending-independent-review'
})]);
export const CALIBRATION_LABS=Object.freeze(Object.fromEntries(entries));
const safe=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function attachCalibrationLabs(courses){
 if(!Array.isArray(courses)||courses.length!==14||new Set(courses.map(c=>c.id)).size!==14||
   courses.some(c=>!Object.hasOwn(CALIBRATION_LABS,c.id)))throw Error('Expected all fourteen Atlas subjects');
 let attached=0;
 for(const course of courses){
  const lab=CALIBRATION_LABS[course.id],lesson=course.lessons.find(l=>l.id===lab.lessonId&&l.stage==='Intermediate');
  if(!lesson||!lesson.frontierWorkshop)throw Error('Fieldwork prerequisite missing: '+course.id);
  for(const round of [lab.first,lab.second]){
   if(!round.prompt||!Array.isArray(round.options)||round.options.length!==3||round.options.some(o=>o.length!==2)||
    !Number.isInteger(round.preferred)||round.preferred<0||round.preferred>2)
    throw Error('Invalid evidence-round choices: '+course.id);
  }
  if(lesson.calibrationLab)continue;
  lesson.calibrationLab=lab;
  attached++;
 }
 return attached;
}
export function calibrationFeedback(courseId,round,option){
 const lab=CALIBRATION_LABS[courseId];
 if(!lab||!Number.isInteger(round)||round<0||round>1||
    !Number.isInteger(option)||option<0||option>2)return null;
 const item=round===0?lab.first:lab.second;
 return {preferred:item.preferred===option,explanation:item.options[option][1],
  revision:round===1?lab.transfer:lab.reveal};
}
export function calibrationLabPanel(lab,courseId){
 if(!lab||!Object.hasOwn(CALIBRATION_LABS,courseId)||lab!==CALIBRATION_LABS[courseId])return '';
 const renderRound=(round,i)=>'<section class="calibration-round" data-calibration-round="'+i+'"'+(i?' hidden':'')+'>'+
  '<span class="overline">DECISION '+(i+1)+' / 2</span><h3>'+safe(round.prompt)+'</h3>'+
  '<div class="calibration-choices" role="group" aria-label="Decision '+(i+1)+' alternatives">'+
  round.options.map((o,j)=>'<button type="button" data-action="calibration-answer" data-round="'+i+'" data-option="'+j+'" aria-pressed="false">'+safe(o[0])+'</button>').join('')+'</div>'+
  '<p class="calibration-feedback" role="status" aria-live="polite">Choose a response to see its evidence-based trade-off. No automatic skill grade is given.</p></section>';
 return '<section class="calibration-lab" id="calibration-lab" data-calibration-course="'+safe(courseId)+'" aria-label="Evidence calibration scenario">'+
  '<span class="overline">DECISION CALIBRATION · PRACTICE, NOT CERTIFICATION</span>'+
  '<h2>'+safe(lab.title)+'</h2><p>'+safe(lab.situation)+'</p>'+
  renderRound(lab.first,0)+
  '<div class="calibration-new-evidence" data-calibration-reveal hidden><strong>NEW EVIDENCE</strong><p>'+safe(lab.reveal)+'</p></div>'+
  renderRound(lab.second,1)+
  '<div class="calibration-finish" data-calibration-finish hidden>'+
  '<h3>Prove the reasoning, not just the choice</h3><p>'+safe(lab.transfer)+'</p>'+
  '<strong>Self-review checklist</strong><ol>'+lab.rubric.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol></div>'+
  '<p class="fineprint">Illustrative authored cases, with competing approaches explained in their stated contexts. No personal responses are transmitted or stored. Independent specialist editorial validation is pending.</p></section>';
}
