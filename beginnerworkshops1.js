/** Applied beginner workshops — subjects 1–7.
 * Original fictional exercises. Models are illustrative, not verified advice.
 */
export const BEGINNER_WORKSHOPS_ONE={
 psychology:{
  lessonId:'biases',title:'Bias detective: improve a judgment with a complete sample',
  goal:'Turn an intuitive opinion into a claim you can inspect, disconfirm, and revise without diagnosing anyone.',
  case:'A study group says its newest member is unreliable because two messages went unanswered. Over fourteen days the member replied to eight other requests on time and explained that notifications were muted during one weekend. The group remembers the delays but has not defined the response-time expectation.',
  steps:[
   {name:'Build the observation table before judging',
    instruction:'Create columns for message date, expected response window, whether the member replied within that window, context actually known, and information missing. Enter all ten requests instead of selecting only the two frustrating delays. Distinguish a measured response from an opinion about commitment.',
    model:'The relevant denominator is ten observed requests, not the two that created frustration. With a defined response window, the raw record shows eight on-time and two late responses. Whether the timing mattered to the project depends on urgency, agreement and impact; it does not establish a personality trait.',
    diagnostic:'Would a late answer to a weekend social invitation and a late answer to a time-critical production incident deserve the same interpretation? Why?'},
   {name:'Design one fair future test',
    instruction:'Agree on a response window for time-critical requests, a separate window for nonurgent messages and a backup owner. Track the next two weeks, including every request, then write what evidence would make you reconsider your initial claim. Record whether the intervention itself changed expectations.',
    model:'An explicit rule could require acknowledgment of urgent work within the agreed workday, with a backup for absence, while allowing longer response times for optional discussions. Track consistent adherence against that rule; compare like requests and identify which uncertainties persist.',
    diagnostic:'If punctual replies improve only after expectations are clarified, what does that suggest about the original judgment and what remains unknown?'}
  ],
  rubric:['Uses all observations and a clearly stated denominator.','Does not turn inferred intentions into measured facts.','Designs consistent conditions and records counterevidence.','Explains what new evidence would change the conclusion.'],
  limits:'A practical reasoning exercise, not mental-health assessment or employee discipline.'
 },
 laws:{
  lessonId:'contracts',title:'Contract reader: know what you are actually agreeing to',
  goal:'Move from reacting to a headline price to identifying precise obligations, exceptions, and unresolved legal questions.',
  case:'A fictional software vendor advertises a ₱499 monthly subscription. The terms also mention automatic renewal, a charge after a promotional period, a seven-day trial, cancellation through the account settings and possible fees for early exit from an annual commitment. The landing page does not clarify which terms apply to the selected checkout option.',
  steps:[
   {name:'Translate the contract into an obligation map',
    instruction:'Draft a table with price, billing frequency, renewal trigger, trial end, cancellation method, refund terms, personal-data use and dispute process. For every row, quote a short precise term or mark it unresolved. Do not invent a cancellation right or assume the annual fee applies to a monthly checkout.',
    model:'A reliable map distinguishes the monthly offer from a possible annual plan and flags ambiguity where the checkout does not identify the selected commitment. Verify whether a trial creates a recurring payment and on what date. Unknown refund rights and data-handling terms stay explicitly unknown until documented.',
    diagnostic:'What additional screenshot or contract clause would establish whether the user chose a monthly commitment or an annual one?'},
   {name:'Construct a verification-first purchasing decision',
    instruction:'Write three questions for the seller about the exact first bill, future renewal, and cancellation or exit conditions. Identify the official Philippine legal or agency sources you would verify if a dispute arose. Specify which personal documents should never be shared publicly.',
    model:'Before payment, request the actual plan name, charge dates, payment authorization and accessible cancellation instructions. Keep a dated copy of accepted terms and receipts. If disputed, consult current official consumer and data-privacy guidance rather than treating a generic social-media claim as conclusive.',
    diagnostic:'Which differences between an advertisement and the checkout contract would justify pausing the purchase instead of guessing?'}
  ],
  rubric:['Distinguishes advertised price from full documented obligations.','Marks ambiguous or missing contractual facts rather than inventing them.','Uses proportionate, official-source verification before legal conclusions.','Preserves private payment, identity, and account information.'],
  limits:'Hypothetical reading exercise; not a ruling about Philippine law or legal advice.'
 },
 business:{
  lessonId:'pricing',title:'Pricing bench: calculate the real decision boundary',
  goal:'Explain a contribution margin and a break-even threshold using transparent assumptions rather than confusing revenue with profit.',
  case:'A fictional repair service charges ₱500 per job and spends ₱285 on materials and direct labor plus ₱35 in payment and delivery variable fees. Its monthly fixed expenses total ₱7,200. It currently expects 25 jobs, and its owner says the business must already be profitable because each job collects ₱500.',
  steps:[
   {name:'Compute unit contribution and break-even volume',
    instruction:'Calculate total variable cost per job, contribution per job and the minimum whole number of jobs needed to cover stated fixed expenses, before taxes, unexpected repairs or owner draw. Estimate the simplified result at 25 jobs and name which inputs are assumptions.',
    model:'Variable cost is ₱285 + ₱35 = ₱320. Contribution is ₱500 − ₱320 = ₱180 per job. Fixed-cost break-even is ₱7,200 / ₱180 = 40 jobs. At 25 jobs, contribution is ₱4,500 and the simplified result is −₱2,700 before any omitted costs.',
    diagnostic:'Why would 25 × ₱500 in cash receipts not establish whether the service covered its expenses?'},
   {name:'Stress-test the price decision',
    instruction:'Assume material cost rises by ₱30 per job while the fee and other costs stay fixed. Recalculate contribution and whole-job break-even. Explain whether a price increase, efficiency change or narrower service scope needs a customer-value test before implementation.',
    model:'Revised variable cost is ₱350 and contribution is ₱150 per job. Stated fixed-cost break-even rises to ₱7,200 / ₱150 = 48 jobs. The change makes the prior 40-job threshold outdated. Customer demand, quality and affordability must be investigated before changing prices.',
    diagnostic:'What evidence about demand would you need before assuming that a higher price improves the final result?'}
  ],
  rubric:['Includes all specified variable expenses in each unit calculation.','Rounds up break-even units only when the quotient is not a whole unit.','Updates the threshold after material costs change.','Does not claim projected margin equals settled cash or final profit.'],
  limits:'Fictional economics without taxes, refunds, financing or real business forecasts.'
 },
 savings:{
  lessonId:'emergency',title:'Emergency reserve builder: protect the next expense',
  goal:'Estimate a transparent savings target and test whether a plan survives the timing of real obligations.',
  case:'A household lists essential monthly expenses of ₱18,000 and has ₱15,000 set aside for emergencies. It hopes to reach a three-month essentials reserve in twelve months. An optional ₱8,000 purchase would make the household feel better today, but irregular medical and home expenses are not yet fully documented.',
  steps:[
   {name:'Set a target without implying it is universally enough',
    instruction:'Compute a three-month reserve using only the stated essentials, the current gap and the monthly amount needed to close that gap in twelve equal contributions with no interest. Identify which expense categories and timing uncertainties could make the target inadequate.',
    model:'An illustrative three-month target is ₱18,000 × 3 = ₱54,000. The gap from ₱15,000 is ₱39,000. Equal contributions over twelve months require ₱3,250 per month. This is a planning calculation, not proof that three months covers every household risk.',
    diagnostic:'If irregular obligations are missing from the ₱18,000 estimate, does the target remain trustworthy? What should be measured next?'},
   {name:'Run an interrupted-income scenario',
    instruction:'Suppose the household cannot save in month three and instead uses ₱6,000 from its reserve for a necessary repair. Recompute the remaining reserve and the new gap. State the amount needed over the remaining nine months if it restarts contributions in month four; consider affordability before treating that amount as a demand.',
    model:'After saving ₱3,250 in each of months one and two, the reserve is ₱21,500. Spending ₱6,000 in month three leaves ₱15,500; the target gap is then ₱38,500. Over months four through twelve, equal payments would be about ₱4,277.78 each, which may be unaffordable and require a revised timeline.',
    diagnostic:'What would make extending the timeline safer than forcing contributions that threaten essentials or require expensive debt?'}
  ],
  rubric:['Keeps target, current reserve and funding gap distinct.','Calculates the interruption scenario from the actual dated balance.','Recognizes uncertainty in essential costs and reserve accessibility.','Does not promise returns or prescribe unsustainable monthly payments.'],
  limits:'Educational calculations, not personal financial advice or verification of a bank product.'
 },
 time:{
  lessonId:'focus',title:'Focus protocol: find where work actually breaks',
  goal:'Design a workable attention experiment that accounts for interruptions, recovery and honest measurement.',
  case:'An independent developer schedules three uninterrupted 90-minute coding blocks. In practice, 20 minutes is spent clarifying tasks, 35 minutes switching between chats and 15 minutes on unavoidable system updates. The developer calls the day a failure and responds by booking another five hours without rest.',
  steps:[
   {name:'Audit usable work instead of calendar labels',
    instruction:'Compute the planned focus time and how much of it was occupied by the three explicitly recorded noncoding categories. State why the remaining minutes cannot be assumed to be all productive coding without a proper activity log. Define one outcome measure beyond elapsed time.',
    model:'Three 90-minute blocks are 270 scheduled minutes. Explicit noncoding activity totals 20 + 35 + 15 = 70 minutes, leaving at most 200 minutes for other work within the blocks. That upper bound does not prove 200 minutes of coding, because unrecorded delays may exist.',
    diagnostic:'What information would tell you whether the 35 minutes of chat switching was avoidable coordination or necessary engineering communication?'},
   {name:'Test a humane focus intervention',
    instruction:'Prepare a two-day protocol using one task definition, short planned breaks, a designated message-check window and an exception for urgent incidents. Track completed testable work, interruption type and recovery time. Include a rule to stop or rescope when the plan threatens sleep or essential needs.',
    model:'A reasonable trial protects a few feasible focus intervals rather than adding five hours to an already full day. Define the acceptance test before coding, log actual interruptions, and compare output and fatigue qualitatively. If emergency communication is required, record it rather than labeling it a moral failure.',
    diagnostic:'How would you revise the experiment if message batching makes urgent coordination worse even when uninterrupted time increases?'}
  ],
  rubric:['Distinguishes calendar allocation from observed productive time.','Uses a meaningful finished-work measure, not only timer totals.','Preserves rest and legitimate urgent interruptions.','Defines a reversible test and reports adverse results honestly.'],
  limits:'General productivity learning; not a substitute for medical or occupational care.'
 },
 languages:{
  lessonId:'pronunciation',title:'Sound investigator: separate hearing from speaking',
  goal:'Build an evidence-based listening and pronunciation workflow without claiming that written phrase recognition proves listening comprehension.',
  case:'A learner can read all eight phrase cards in the selected Atlas language and is proud of the result. When another speaker asks for directions at natural speed, the learner misses the key word and keeps answering from the memorized transcript. No qualified regional audio or independent speaking assessment is available in the app.',
  steps:[
   {name:'Construct a four-channel skill check',
    instruction:'Create separate fields for reading recognition, unaided written recall, new audio comprehension and spoken intelligibility. Mark a channel “not assessed” if there is no appropriate reference or qualified partner. For a language with a new script, specify the reading prerequisites rather than substituting Roman letters.',
    model:'A card translation score supports recognition of familiar written content only. It does not establish the ability to segment a new recording, pronounce target sounds or repair a live conversation. All unsupported channels remain “not assessed,” and the target locale or dialect is explicitly named.',
    diagnostic:'Why would replaying the same synthetic voice until a phrase is memorized be insufficient evidence of understanding unfamiliar speech?'},
   {name:'Build an honest listening-to-repair drill',
    instruction:'Choose a short legally usable recording reviewed for the intended variety. Attempt meaning recognition without text, replay once, then compare against a transcript and request clarification if a key detail is missed. In Japanese, complete kana and small-character prerequisites before relying on romanization. Never treat this app’s device TTS as verified native speech.',
    model:'Record first-hearing comprehension, transcript-supported comprehension and which detail remained unknown. Use a verified clarification expression and seek human feedback for natural timing and accent. A successful scripted rehearsal is progress on that task, not a CEFR certification.',
    diagnostic:'How would you report progress if written recall improved but first-hearing comprehension stayed unchanged over the study week?'}
  ],
  rubric:['Separates writing recognition, retrieval, listening and speaking evidence.','Requires qualified regional audio instead of synthetic-voice certification.','Respects script prerequisites and avoids inventing translations.','Reports unassessed abilities clearly without a fluency claim.'],
  limits:'Language study guidance pending qualified native/regional review; no speech recognition or proficiency certification.'
 },
 communication:{
  lessonId:'listen',title:'Listening clinic: clarify before advising',
  goal:'Convert a confusing complaint into a checkable, respectful conversation with shared next steps.',
  case:'A coworker says “Nobody tells me when project requirements change.” Another person replies “Stop complaining; check the messages.” The coworker actually missed a release-critical dependency update, but it is unclear whether the message was sent through the agreed channel or whether the requirements were documented.',
  steps:[
   {name:'Reflect facts without conceding conclusions',
    instruction:'Write one tentative paraphrase, one open question for a concrete event and one statement that avoids blame. Do not immediately agree that nobody ever communicates or claim that the coworker is simply inattentive.',
    model:'“It sounds like a requirement changed and you learned about it too late. Which update affected your work, and where did you expect it to appear?” This reflects the concern without accepting the universal word nobody or guessing at intent.',
    diagnostic:'What detail would distinguish a failed notification process from an update that the coworker overlooked?'},
   {name:'Build a two-way confirmation protocol',
    instruction:'Specify one shared decision log, update owner, change-notification channel, acknowledgment rule and fallback for emergencies. Describe how both sender and recipient verify understanding without requiring around-the-clock availability.',
    model:'An agreed change record can include the affected dependency, effective date, owner, required action and acknowledgment deadline within working hours. If acknowledgment is missing, the release owner escalates through a predefined backup; silence is not automatically consent.',
    diagnostic:'How would you revise the protocol if more messages increase noise and reduce the chance a critical change is noticed?'}
  ],
  rubric:['Uses tentative paraphrasing rather than unsupported agreement.','Asks for a specific event and checks the intended information channel.','Defines a measurable sender-to-recipient confirmation loop.','Does not convert communication friction into a personality accusation.'],
  limits:'Fictional team coordination example, not personnel advice.'
 }
};
