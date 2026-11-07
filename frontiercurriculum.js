/** Xyra Atlas — frontier fieldwork, November 2026.
 * Adds subject-specific advanced application to 14 EXISTING lesson IDs, and
 * a distinct, locally rendered multi-turn scenario for all 20 language packs.
 * No new completion identities, network access, stored scores or proficiency claims.
 * Material is authored educational practice pending independent expert review.
 */
const raw={
 psychology:['emotions','Emotional regulation under incomplete evidence',
 'During conflict, first record the observable trigger, the bodily response, the first interpretation and the action you feel urged to take. Avoid treating intensity as proof of the interpretation. Separate urgent safety needs from the ordinary discomfort of uncertainty. The practical goal is to choose a proportionate response while leaving room for facts you do not yet know.',
 'Case: A colleague replies “fine” and leaves a group chat. You assume you have offended them and draft an accusatory reply. A defensible alternative is to record the message exactly, note that the motive is unknown, wait until you can ask a neutral question, and avoid sending an interpretation disguised as a fact. If the pattern repeats, discuss the effect without asserting an unobserved intention.',
 'Evidence challenge: produce a four-column trigger–interpretation–alternative–response table. Name what would change your view, whether immediate action protects anyone, and what a respectful follow-up would look like. Review your response for mind-reading, threats or suppressed legitimate concerns. Regulation does not require you to tolerate coercion or danger.'],
 laws:['consumer','Consumer dispute evidence and remedy design',
 'Separate the timeline, governing documents, disputed facts and requested resolution. Preserve dated receipts, messages, photographs and relevant warranty or order terms. Identify the actual seller and the applicable jurisdiction before citing a legal right. A complaint can be precise without claiming a statutory entitlement you have not verified from a current official source.',
 'Case: A delivered device fails after intermittent use. The customer has a payment receipt, delivery date and short video of the fault, but no technician diagnosis. An evidence-led complaint describes those observations, asks the seller for the applicable remedies and handling instructions, and preserves a copy of each exchange. It does not falsely assert that every purchase guarantees an unconditional refund.',
 'Evidence challenge: assemble a dated one-page consumer dispute file, an accurate two-sentence demand and a decision tree for seller response, escalation and stop conditions. Distinguish a merchant policy from a law and cite the source date. For Philippine cases, verify the current DTI complaints guidance before using a complaint channel.'],
 business:['sales','Sales discovery as a falsifiable experiment',
 'Define the customer job, the evidence that the job matters, a viable alternative and the conditions under which your offer is not a fit. Frame discovery questions around recent behavior rather than hypothetical praise. Record the cost of delivery, support and refunds before calling a signed sale a profitable business. A compelling demonstration does not automatically establish repeatable demand.',
 'Case: A solo developer has built a booking dashboard but no customers. Five friends compliment the design, two target operators describe costly scheduling failures, and one agrees to a paid pilot with explicit limits. The paid pilot is stronger demand evidence than compliments, but one sale does not establish retention. Track onboarding, usage, defects, support time and willingness to renew.',
 'Evidence challenge: draft a six-question non-leading interview, a pilot acceptance criterion and an exit rule. Compare a low-demand, high-support outcome with a small but reliable paying cohort. State what would make you pause development, change customer segment or cancel the product without pressuring a buyer.'],
 savings:['debt','Debt repayment under cash-flow shocks',
 'Model principal, periodic interest, due dates, fees and variable income separately. Compare total cost as well as the ability to make the minimum payment during a bad month. A mathematically optimal payoff plan can still fail if it leaves no buffer for rent or emergencies. Do not promise a particular saving without checking a lender’s actual method of computing interest and penalties.',
 'Case: Two debts differ in rate and balance. Paying every extra peso to the higher-rate debt may reduce expected interest, but a worker with unpredictable cash flow first needs to protect essential bills and required minimum payments. A disciplined comparison records both plans, fees, dates, the consequences of one missed paycheck and what assistance options the lender actually offers.',
 'Evidence challenge: create a six-month table with best, normal and low-income scenarios; show each minimum payment, discretionary extra payment and remaining emergency reserve. Explain any trade-off between interest saved and liquidity retained. Flag invented rates and never interpret this exercise as personalized investment or lending advice.'],
 time:['review','Capacity planning with uncertainty and recovery',
 'A schedule is a model of available attention, not an inventory of wishes. Count real hours after sleep, transit, meals, care and recovery. Use historical task durations where available, include a buffer for rework and leave a clear stopping rule. When a plan repeatedly overruns, test the estimation method before blaming the person following it.',
 'Case: A student plans three ninety-minute deep-work sessions daily but actually has two uninterrupted hours after classes and family duties. A sustainable redesign groups one demanding task, a short administrative block and recovery. The experiment succeeds when important work is completed reliably, not when every minute is labelled productive.',
 'Evidence challenge: compare planned and actual effort for five days, identify the largest forecast error and redesign the next week with an explicit contingency. State which commitment can slip, what counts as completion and how to recover if a key task runs long. Protect necessary sleep rather than treating exhaustion as a productivity technique.'],
 languages:['conversation','Conversation repair when a script stops working',
 'Memorized phrases become useful only when you can recognize the response and request clarification. Rehearse what to do when the listener speaks too quickly, chooses an unfamiliar expression or gives information you cannot act on. Notice whether your phrase is formal, informal, dialect-specific or only a classroom approximation; avoid pretending a single model covers every social context.',
 'Case: You ask for a station and receive a rapid answer containing a direction you do not recognize. Repeating the original question louder does not solve the comprehension gap. Instead, request repetition, listen for a known landmark, confirm one detail with a simple question and use maps or written text when available. The goal is completing the task respectfully, not sounding native.',
 'Evidence challenge: write a four-turn transcript with your request, an unfamiliar response, your clarification and a final confirmation. Mark the points where a native/regional speaker must check phrasing. Compare a memorized answer with an independently interpreted response; do not award yourself listening mastery from reading a prepared dialogue.'],
 communication:['boundaries','Boundary conversations with an observable request',
 'A usable boundary states the behavior you can control and the action you will take if a condition continues. It is different from diagnosing someone’s intentions or issuing an ultimatum to force affection. Acknowledge the other person’s needs without promising compliance. If the situation involves threats or coercion, safety takes priority over finishing a scripted conversation.',
 'Case: A teammate repeatedly sends nonurgent work requests after midnight. “You disrespect me” names an unverified motive. “I review nonurgent messages after 9 a.m.; urgent incidents go through our agreed escalation route” names an observable practice. The team can then agree on response times and a genuine emergency definition.',
 'Evidence challenge: write three versions of the same boundary: too vague, too controlling and actionable. Name the specific behavior, reasonable consequence and revision if new information appears. Read your final wording aloud and remove sarcasm, mind-reading and any implied punishment unrelated to the boundary.'],
 thinking:['causation','Causal inference without a laboratory',
 'Before a causal claim, identify the proposed cause, outcome, possible confounders, selection effects and the comparison you wish you had. Observe whether the effect precedes the alleged cause; correlation alone cannot settle direction. A plausible mechanism strengthens a hypothesis, but it does not replace a fair comparison or establish how large the effect is.',
 'Case: A company reports that teams using a new planning tool finish more tasks. Early adopters were also the most experienced teams, and participation was voluntary. The apparent improvement could reflect the tool, preexisting skill, manager attention or a change in what counts as completed. Compare teams over time and measure the same outcome before deciding the tool caused the difference.',
 'Evidence challenge: draw a causal diagram with at least one confounder and a selection mechanism. Propose a feasible comparison, define a failure criterion and explain which biases remain. Include one observation that would weaken your preferred explanation and avoid converting “not proven” into “definitely false.”'],
 digital:['scams','Threat modelling a suspicious account recovery flow',
 'Treat an unexpected account alert as a decision under adversarial pressure. Identify the asset at risk, the channel by which the message arrived, the action requested and the independently trusted verification route. Urgency, spoofed branding and attractive offers can all raise risk; no single clue establishes authenticity. Verify from a known application or bookmarked site rather than clicking the provided link.',
 'Case: A message claims your account will be closed in fifteen minutes and links to a lookalike login page. You do not test the link with real credentials. Instead, open the provider’s app independently, check account notifications and security activity, and report the suspicious message through an established channel. If credentials were exposed, revoke sessions and secure recovery methods through the real service.',
 'Evidence challenge: produce a small threat model with entry point, attacker goal, trusted verification path, containment steps and residual uncertainty. Include a safe family-member explanation that avoids shame. Separate what the message alleges from what you directly confirmed.'],
 career:['portfolio','A portfolio case study that survives technical review',
 'A persuasive technical case study names the problem, constraints, architecture options, implementation trade-offs and verified outcomes. Attractive screenshots are useful evidence of presentation, not proof of security, performance or customer impact. Where data is private, demonstrate with sanitized examples and explain what cannot be shown. Distinguish solo ownership from team contributions.',
 'Case: A developer publishes a Laravel-and-React project with polished screens. A skeptical reviewer asks how authentication, validation, error states, accessibility and deployment failures were tested. The developer improves the case by adding a simple architecture diagram, reproducible test commands, a short defect history and before-and-after metrics that can be checked.',
 'Evidence challenge: turn one project into a one-page case with requirement, design choice, alternative rejected, evidence, unresolved limitation and next improvement. Ask a technically literate reviewer to identify an unsupported claim. Revise the headline to match demonstrated work, rather than padding it with unverifiable performance numbers.'],
 science:['probability','Measurement, base rates and calibrated confidence',
 'A measured result is not automatically a physical truth at unlimited precision. Record instrument resolution, sampling procedure, relevant environmental conditions and uncertainty. When interpreting a positive diagnostic-style test, distinguish sensitivity and specificity from the prevalence of the target condition. State what is known, what is modelled and what remains outside the sample.',
 'Case: A sensor produces apparently stable readings over twenty trials, yet the instrument was never calibrated against a reference. Repetition alone establishes repeatability under those conditions, not accuracy. An independent reference reading, an altered environment and a check of zero-point drift can reveal systematic error that repeated averaging would conceal.',
 'Evidence challenge: design a table of readings with units, instrument limit, sample size and plausible sources of systematic bias. Decide what finding would justify revising your confidence. Do not report more significant digits than the method supports or treat this exercise as a substitute for certified measurement.'],
 relationships:['conflict-care','Recognize patterns without diagnosing people',
 'A relationship assessment must distinguish a difficult event from a recurring pattern. Document what was said and done, the context, whether repair was attempted, and whether expressing disagreement remains safe. Avoid diagnosing personality disorders from posts or one-sided stories. Both parties can have needs, but coercion, threats and isolation are not ordinary compromises.',
 'Case: Two friends argue about cancelled plans. In one version, they acknowledge the impact and agree on a clearer arrangement. In another, one repeatedly threatens to leak private messages whenever the other says no. The second pattern changes the safety assessment: seeking support and protecting records may matter more than another persuasive discussion.',
 'Evidence challenge: compare two fictional timelines and label observations, inferences and risk indicators. Draft a repair conversation for the noncoercive case and a safety-oriented response for the threatening case. Explain which facts would change the recommendation and when outside professional support is appropriate.'],
 negotiation:['anchors','Negotiate a package instead of a headline number',
 'An initial number can bias discussion even when it is arbitrary. Before negotiating, calculate a defensible range, your walk-away threshold and the best workable alternative. Separate position (“I need this price”) from interests (timing, risk, support and certainty). Ask questions before making concessions, and compare whole-package value rather than one headline amount.',
 'Case: A freelancer receives an offer of ₱18,000 for a project with undefined revision rounds. A counteroffer of ₱21,000 alone may still be a bad deal if unlimited revisions consume weeks. A stronger proposal specifies deliverables, acceptance criteria, revisions, ownership, payment schedule and change-control terms, then evaluates hourly effort under realistic scenarios.',
 'Evidence challenge: prepare a negotiation sheet with minimum acceptable terms, two nonprice trade-offs and an exit condition. Role-play the buyer rejecting your first proposal, then make a revised offer that preserves clarity and respect. Calculate the downside of one extra revision cycle before choosing a number.'],
 shadow:['lies','Deception claims without fake certainty',
 'Do not confuse inconsistency with proof that someone knowingly deceived you. Build a narrow claims ledger: what was asserted, when, which facts conflict and what innocent explanations remain possible. Nonverbal behavior, pauses and nervousness are weak stand-alone indicators. The aim is to protect decisions through verifiable evidence, not to turn ordinary social anxiety into a lie-detection technique.',
 'Case: A seller offers two different shipping dates in separate messages. It could reflect a changed estimate, internal error or deliberate misrepresentation; the discrepancy alone cannot decide motive. Preserve the messages, request a written updated commitment and consider a safer alternative if reliable delivery cannot be established.',
 'Evidence challenge: make a claims table with source, date, confidence and verification route. Include a neutral clarification request and a threshold for disengaging without making an accusation. In coercive settings, prioritize safety, trusted support and documentary records rather than arranging confrontations to catch someone out.']
};
export const FRONTIER_WORKSHOPS=Object.freeze(Object.fromEntries(Object.entries(raw).map(([code,[lessonId,title,method,caseStudy,assignment]])=>[code,Object.freeze({lessonId,title,method,caseStudy,assignment})])));
export function attachFrontierWorkshops(courses){
 if(!Array.isArray(courses)||courses.length!==14||new Set(courses.map(c=>c.id)).size!==14||
  Object.keys(FRONTIER_WORKSHOPS).some(id=>!courses.some(c=>c.id===id)))
  throw Error('Frontier workshops require all fourteen subjects');
 let added=0;
 for(const course of courses){
  const entry=FRONTIER_WORKSHOPS[course.id];
  const lesson=course.lessons.find(x=>x.id===entry.lessonId&&x.stage==='Intermediate');
  if(!lesson)throw Error('Missing intermediate workshop target: '+course.id);
  if(lesson.frontierWorkshop)continue;
  if([entry.method,entry.caseStudy,entry.assignment].some(x=>x.length<180))
   throw Error('Frontier instruction too short: '+course.id);
  lesson.frontierWorkshop=entry;
  added++;
 }
 return added;
}
// Language practice uses existing eight phrase translations. The situations below
// are *learner prompts*, not new target-language translations or scored speech tests.
const notes={
 en:['Distinguish a polite request from a command. Stress and intonation change how a request is received, but printed text cannot assess spoken delivery.','Practise asking for repetition in a noisy station, then confirming a price without assuming the same person handles both tasks.'],
 ja:['Polite endings and particle choices carry social information; kana fluency alone does not establish appropriate register.','Use the station question only after the kana and first-sentences checkpoints. Request repetition rather than guessing an unknown direction.'],
 ko:['Honorifics and speech levels change by relationship; do not generalize one polite model to every person.','Ask for the station from an unfamiliar adult and rehearse how to request clarification without dropping politeness abruptly.'],
 es:['Question punctuation and written accents are meaningful. Local vocabulary and formal address differ across Spanish-speaking regions.','Ask for the station, verify a direction, and request repetition before attempting to buy a ticket.'],
 fr:['Register and question construction vary; the authored phrase is one workable model, not every regional or informal form.','Practise a polite interruption and then a specific location question, with a second turn when the reply is too fast.'],
 zh:['Characters, tones and spoken syllables contribute different information. Romanization is a support, not a substitute for native audio.','Point to a written station name, request directions and check a price with a listener rather than relying on text alone.'],
 de:['Formal Sie and informal du address different relationships. Preserve the formal pattern when addressing unfamiliar staff.','Rehearse a question at a railway information desk and a follow-up when you miss a compound word.'],
 ar:['Arabic dialects and Modern Standard Arabic differ substantially; this pack uses a particular authored model and cannot replace regional review.','Rehearse directions with a trusted local speaker who can verify the regional expression before using it in a real journey.'],
 fil:['Po can mark respect in many contexts, but usage varies by relationship and region. Avoid treating Filipino as identical to all Philippine languages.','Ask staff for the location, request repetition politely and check a listed fare before responding.'],
 it:['Pronouns and formal address affect politeness. Check the person you are speaking to before adapting a memorized line.','Ask a stranger for the station, then clarify the route before discussing ticket cost.'],
 pt:['This model is European Portuguese; Brazilian usage, pronunciation and vocabulary may differ.','Ask for the railway station in the variety you are studying and have a regional reviewer check the phrase.'],
 hi:['Hindi uses scripts and agreement patterns not visible in an English gloss; respectful address matters.','Practise asking for help and confirming the platform from a sign, without assuming the listener uses your textbook register.'],
 th:['Tone and social particles matter; an English gloss does not reveal the speaker’s context or pronunciation.','Ask for a station, listen for one recognizable landmark and request a slower repetition from a native speaker.'],
 vi:['Written tone marks carry meaning, and regional pronunciation varies. A transcription cannot certify your spoken accuracy.','Use a printed destination as an anchor while asking for directions and checking a displayed fare.'],
 id:['Pronouns and forms of address can change with formality and familiarity. Avoid treating literal English pronouns as universal equivalents.','Practise a courteous location question, a follow-up when the answer is unclear and a price check.'],
 ru:['Russian case forms change with grammatical role; do not construct new phrases by swapping isolated vocabulary blindly.','Use the authored complete station question, then practise a brief clarification without inventing unsourced case endings.'],
 tr:['Turkish uses agglutinating suffixes; a memorized full phrase is safer than guessing how suffixes combine.','Ask for a station with a complete model phrase and confirm the reply using a map before buying a ticket.'],
 nl:['Dutch word order can shift in questions and subordinate clauses. One location question does not establish every pattern.','Rehearse asking a staff member for a train station and asking again if the answer contains unfamiliar directions.'],
 sv:['Swedish sentence melody and word order matter beyond the printed characters. Do not infer pronunciation from English spelling.','Ask where the station is, pause for an answer, then clarify a fare without rushing into a guessed reply.'],
 el:['Greek script, stress accents and inflections cannot be reconstructed reliably from an English translation alone.','Rehearse the complete station question and a follow-up with an experienced speaker; record where comprehension fails.']
};
export const LANGUAGE_FIELDWORK=Object.freeze(Object.fromEntries(Object.entries(notes).map(([code,[focus,mission]])=>[code,Object.freeze({focus,mission})])));
export function frontierWorkshopPanel(work){
 if(!work)return '';
 return '<section class="frontier-workshop" aria-label="Applied frontier workshop">'+
  '<span class="overline">APPLIED FIELDWORK · UNGRADED</span><h2>'+esc(work.title)+'</h2>'+
  '<h3>Method</h3><p>'+esc(work.method)+'</p>'+
  '<h3>Worked case</h3><p>'+esc(work.caseStudy)+'</p>'+
  '<details><summary>Independent evidence challenge</summary><p>'+esc(work.assignment)+'</p></details>'+
  '<p class="fineprint">Independent expert review is pending. Complete the task in your private Field Notebook; completion of this lesson is not certification.</p></section>';
}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&#39;'}[c]));
export function validateFrontierWorkshops(courses,codes){
 if(!Array.isArray(codes)||codes.length!==20||new Set(codes).size!==20||
  codes.some(code=>!Object.hasOwn(LANGUAGE_FIELDWORK,code)))throw Error('Twenty-language fieldwork is incomplete');
 if(!Array.isArray(courses)||courses.length!==14||
  courses.some(c=>!FRONTIER_WORKSHOPS[c.id]||!c.lessons.some(l=>l.id===FRONTIER_WORKSHOPS[c.id].lessonId&&l.frontierWorkshop)))
  throw Error('Fourteen-subject workshop coverage is incomplete');
 return {subjects:14,languages:20,practiceStages:60};
}
export function languageFieldworkPanel(code,pack,{unlocked=true}={}){
 if(!Object.hasOwn(LANGUAGE_FIELDWORK,code)||!pack||!Array.isArray(pack.phrases)||pack.phrases.length<8)return '';
 const note=LANGUAGE_FIELDWORK[code];
 const heading='<section class="sentence-bridge" id="language-fieldwork" aria-label="Multi-turn language fieldwork">'+
  '<span class="overline">FIELDWORK · AFTER THE GRAMMAR BRIDGE</span><h2>Make a conversation survive real life</h2>'+
  '<p class="sentence-bridge-intro">Three connected, unscored tasks with phrases from your existing offline pack. Do not confuse reading prepared lines with understanding spontaneous replies.</p>';
 if(!unlocked)return heading+'<p class="sentence-bridge-locked">Complete the Japanese kana and first-sentences foundation to unlock multi-turn fieldwork.</p></section>';
 const stages=[
  ['01 · Ask to slow down','You missed part of the reply. Request repetition without pretending you understood.',3],
  ['02 · Find a location','Use the station question, then imagine two possible directions and identify which words you would need verified.',4],
  ['03 · Confirm a cost','Before purchasing, verify the displayed amount, currency and whether you have understood the reply.',6]];
 return heading+'<p><strong>Language-specific focus:</strong> '+esc(note.focus)+'</p>'+
 '<p><strong>Applied mission:</strong> '+esc(note.mission)+'</p>'+
 stages.map(([name,prompt,index])=>{
  const p=pack.phrases[index];
  return '<details class="sentence-bridge-transfer"><summary>'+esc(name)+'</summary>'+
   '<p>'+esc(prompt)+'</p><p><strong>'+esc(p.english)+'</strong></p>'+
   '<p class="sentence-bridge-target" lang="'+esc(code)+'" dir="auto">'+esc(p.target)+'</p>'+
   (p.pronunciation?'<small>Approximate romanization: '+esc(p.pronunciation)+'</small>':'')+
   '<p>Cover the target text. Reconstruct the phrase from memory, then compare it. With a qualified speaker, practise what happens when the reply is unfamiliar.</p></details>';
 }).join('')+
 '<p class="fineprint">Authored practice pending qualified native/regional review. No recording, translation grading, saved answers, proficiency certification or network requests.</p></section>';
}
