/** Atlas applied response simulations, part A.
 * Each scenario is fictional. Preferred choices are instructional, not credentials.
 */
export const RESPONSE_SIMULATIONS_A={
 psychology:{
  title:'Uncertain message, measured response',
  situation:'An otherwise reliable project partner writes “We need to discuss your update.” You worry that the message means the partnership is ending. There is no accusation, no meeting agenda, and no history of threatening behavior.',
  rounds:[
   {title:'Choose the first interpretation',prompt:'You have only this short message. Which action would preserve evidence and relationships?',choices:[
    ['Tell the whole team the partner is hostile','Spreading an untested interpretation turns uncertainty into a reputational allegation and prevents a fair clarification.',false],
    ['Ask what part of the update needs discussion','A neutral question seeks an observable reason without asserting you can read a private intention.',true],
    ['Write a long apology for mistakes you have not identified','Preemptive guilt can reinforce an unsupported conclusion and may distract from the actual project issue.',false]
   ]},
   {title:'Update the explanation after a new fact',prompt:'The partner shares a document showing that an external client moved the deadline. They want to adjust responsibilities. What changes?',choices:[
    ['Acknowledge the deadline evidence and coordinate a revised plan','The new document supports a scheduling explanation. Agree on responsibilities while leaving unrelated feelings and motives unassumed.',true],
    ['Insist that the original message proves contempt anyway','Keeping the accusation despite contrary evidence is an example of protecting the first story from correction.',false],
    ['Conclude this one clarification proves the partner will always be trustworthy','One resolved interaction is useful evidence but cannot establish the future behavior of any individual.',false]
   ]}
  ],
  synthesis:'Write an observation/interpretation ledger, identify which new fact changed the prediction, and describe one future warning sign that would legitimately require a different response.',
  model:'A sound summary notes the exact wording, the missing context, the neutral question and the dated deadline change. It updates confidence in the scheduling explanation, without claiming a personality diagnosis or a permanent guarantee.',
  rubric:['Distinguishes exact message text from imagined intentions.','Uses clarification rather than public accusation.','Revises the hypothesis when credible evidence appears.','Avoids claiming lifelong trust or a clinical conclusion.'],
  caveat:'This is a fictional communication scenario, not mental-health advice or a personality assessment.'
 },
 laws:{
  title:'An online purchase dispute without invented rights',
  situation:'A buyer in the Philippines orders a charger matching a clearly advertised specification but receives a visibly different connector. The seller says the photographs could have been taken after the package was opened. Both parties have some records.',
  rounds:[
   {title:'Choose what to collect first',prompt:'You need an evidence-based initial request. What should you do before asserting a legal remedy?',choices:[
    ['Post the seller’s personal details with a demand for immediate payment','A public accusation exposes private information and does not resolve contested delivery facts.',false],
    ['Build a dated listing, receipt, delivery and product comparison','A traceable record separates the advertised product from the received item while preserving disputed facts.',true],
    ['Invent a legal deadline to pressure the seller','An unverified statutory claim weakens credibility and could mislead other consumers.',false]
   ]},
   {title:'Handle new courier evidence',prompt:'The courier confirms a packaging defect was reported before delivery. The charge history also shows payment cleared. What is the responsible next step?',choices:[
    ['Assume the courier report automatically determines every legal remedy','A courier observation matters but cannot settle jurisdiction, statutory liability or contract terms on its own.',false],
    ['Use the new record in a factual request and check current official guidance','The courier note supports chronology; remedy and escalation still require checking the applicable terms and official procedures.',true],
    ['Tell the seller that the courier must be criminally prosecuted','Nothing in the fictional record supports an allegation of a crime or a specific legal consequence.',false]
   ]}
  ],
  synthesis:'Draft a neutral complaint summary with exact supporting exhibits, unresolved facts, and the official Philippine agency or current source that must be checked before escalation.',
  model:'The case file lists the advertisement, payment, received connector and packaging report. It requests a reviewed resolution and keeps deadlines, entitlements and agency findings explicitly unverified.',
  rubric:['Uses dates and supporting records for each claim.','Maintains a distinction between courier evidence and legal responsibility.','Consults current official rules before claiming a remedy.','Protects personal details and avoids accusations unsupported by evidence.'],
  caveat:'Illustrative Philippine legal-literacy exercise, not legal advice or an official determination.'
 },
 business:{
  title:'An offer that looks profitable until costs arrive',
  situation:'A small seller takes 100 orders at ₱450 each. Known product and packing cost is ₱260 per order. The seller has ₱14,000 monthly fixed expenses and is considering additional marketing before reconciling delivery and refund costs.',
  rounds:[
   {title:'Read the first unit-economics picture',prompt:'Sales total ₱45,000 and known contribution before other variable costs is ₱19,000. What decision follows?',choices:[
    ['Call ₱19,000 net profit and double spending now','Contribution excludes fixed costs, delivery, refunds and settlement timing, so the label and expansion conclusion are unsupported.',false],
    ['Separate known contribution, fixed expenses and missing costs','Keeping the ₱19,000 contribution distinct from ₱14,000 fixed expenses and other unknown items reveals what still needs verification.',true],
    ['Treat all ₱45,000 revenue as free cash for new ads','Customer payments and their settlement dates do not remove variable costs, liabilities or obligations.',false]
   ]},
   {title:'Delivery changes the result',prompt:'The seller learns they bear ₱75 delivery cost on every order and 10 orders were refunded in full. Assume the seller still bears all 100 product, packing and delivery costs. What is most defensible?',choices:[
    ['Recompute with ₱40,500 retained sales and ₱33,500 total variable costs','Retained revenue is ₱40,500 and variable costs are 100 × (₱260+₱75)=₱33,500; contribution is ₱7,000 and minus ₱14,000 fixed costs gives a simplified −₱7,000 result.',true],
    ['Use the original ₱19,000 contribution because costs were not known at checkout','New evidence must update the model. Ignoring delivery and refunded sales preserves a materially false picture.',false],
    ['Assume refunds eliminate all cost of making and shipping the orders','In this scenario costs were already incurred, so the refund does not erase them.',false]
   ]}
  ],
  synthesis:'Create a two-column original/revised profit bridge, identify omitted expenses, and state two measurable conditions required before another advertising experiment.',
  model:'Original known contribution is ₱19,000. Refunded sales reduce retained revenue to ₱40,500 and newly discovered delivery raises total variable costs to ₱33,500, leaving ₱7,000 contribution. Minus fixed costs produces a simplified ₱7,000 loss before further omissions.',
  rubric:['Distinguishes sales revenue from contribution and net earnings.','Keeps refunded revenue and incurred order costs separate.','Recalculates every affected variable with explicit units.','Does not scale marketing from an incomplete profit estimate.'],
  caveat:'Fictional arithmetic model; refunds, taxes, fees, inventory recovery and cash timing may differ in real businesses.'
 },
 savings:{
  title:'An emergency reserve under a late-payday shock',
  situation:'A household has ₱30,000 accessible, needs ₱18,000 for monthly essentials and wants an optional ₱12,000 appliance. A paycheck of ₱24,000 is expected in ten days but has not arrived.',
  rounds:[
   {title:'Choose an immediate purchase decision',prompt:'Rent and essential bills are due before the paycheck. What is the strongest initial plan?',choices:[
    ['Buy the appliance now because the future paycheck will cover bills','Expected income is not cash already available, and the purchase reduces liquid money to ₱18,000 exactly before any unexpected cost.',false],
    ['List dated essentials and preserve liquidity until pay is received','The safe calculation uses cash on hand, confirmed obligations and delivery dates rather than assuming the paycheck arrives as expected.',true],
    ['Lock every peso into a long-term product because it advertises returns','Emergency accessibility and fees need verification; locking essential cash can create an avoidable shortfall.',false]
   ]},
   {title:'Payroll is delayed by one full month',prompt:'The employer now confirms a one-month delay. No new income is available today. What should the revised plan communicate?',choices:[
    ['Keep the appliance commitment and borrow without comparing total cost','This treats an optional purchase as necessary and could create additional repayment risk without knowing terms.',false],
    ['Calculate cash coverage, protect essentials and revise the purchase date','₱30,000 divided by ₱18,000 equals about 1.67 months of stated essentials before extra obligations. A delayed-income scenario requires more caution and a dated plan.',true],
    ['Claim that ₱30,000 always guarantees a two-month reserve','Two months of the stated essentials would require ₱36,000; the claim is numerically false even before irregular costs.',false]
   ]}
  ],
  synthesis:'Build a 45-day essentials calendar and a rule for when to reconsider the purchase. Separate verified cash, scheduled expenses, and income that remains uncertain.',
  model:'Without purchase, liquid money covers one full month of essentials and ₱12,000 toward the next. The household should document upcoming bills and available safe options rather than treating the delayed salary as settled funds.',
  rubric:['Keeps cash on hand distinct from expected salary.','Computes coverage using the correct essentials denominator.','Revises discretionary decisions when income timing changes.','Does not guarantee product returns, withdrawals or debt safety.'],
  caveat:'Fictional finance lesson, not personalized banking or credit advice.'
 },
 time:{
  title:'A release schedule meets a real blocker',
  situation:'A developer has four days to deliver a demonstration. UI construction needs two days, API verification requires one day, and final acceptance needs one day after both. The developer has no verified external API fallback.',
  rounds:[
   {title:'Define a responsible starting sequence',prompt:'What should the developer prioritize while the API is working?',choices:[
    ['Write acceptance checks and protect the final verification gate','Verifiable completion means reproducing the intended flow, not merely finishing visible code. Dependencies and time buffers must be explicit.',true],
    ['Spend the first three days refining animations with no test plan','Cosmetic work can consume time needed for essential functionality and validation.',false],
    ['Declare the demo complete when the UI looks good','Visual appearance does not establish backend integration or correct failure handling.',false]
   ]},
   {title:'The API becomes unavailable',prompt:'After day one, the provider says its endpoint will remain unavailable through the original deadline. What is a credible revised commitment?',choices:[
    ['Mark all mocked API tests as real integration verification','Mocks can demonstrate UI logic but cannot prove that the unavailable service works end to end.',false],
    ['Report the blocker, test safe independent work and hold final release','The revised plan preserves a clear integration acceptance gate and gives stakeholders a conditional date rather than a fabricated guarantee.',true],
    ['Force release without integration tests because the date was promised','Skipping essential verification to protect a deadline can misstate readiness and shift risk to users.',false]
   ]}
  ],
  synthesis:'Draft a dependency diagram, a brief stakeholder update, and a conditional release plan with a measurable API-recovery test.',
  model:'A suitable update names the blocked endpoint, the impacted acceptance test, the work completed independently, a responsible owner, and a release-hold condition until the real integration succeeds.',
  rubric:['Recognizes external dependencies and the need for verification.','Separates mock behavior from live integration evidence.','Preserves an honest, conditional release schedule and required verification.','Protects sustainable workload and escalation responsibilities.'],
  caveat:'Fictional project-management scenario; actual scheduling depends on resources and contracts.'
 },
 languages:{
  title:'A script learner enters an unscripted interaction',
  situation:'A learner confidently matches all eight written starter phrases to English. In a new conversation, a speaker gives an unfamiliar reply at natural speed. The learner knows a phrase for asking someone to repeat but has not demonstrated audio comprehension.',
  rounds:[
   {title:'Identify what is truly demonstrated',prompt:'What does excellent performance on familiar translation cards prove?',choices:[
    ['That the learner has a native accent and level A1 or higher','Written recognition alone cannot measure speech production, spontaneous interaction or CEFR proficiency.',false],
    ['Recognition of those written phrases under those test conditions','This is a valid bounded accomplishment while comprehension of unfamiliar audio and speaking remain separately unassessed.',true],
    ['That the learner automatically understands every regional dialect','Regional listening, timing and lexical variation cannot be inferred from memorized text.',false]
   ]},
   {title:'Repair an unfamiliar spoken response',prompt:'A qualified recording of the target regional variety is available and a reply remains unclear. What is a suitable next learning action?',choices:[
    ['Invent a translation from a familiar English word order','Guessing new forms can produce incorrect or unnatural phrases without any verified evidence.',false],
    ['Request repetition with a reviewed expression and compare first-hearing comprehension with a transcript','The learner can practice repair, use qualified audio, and separately record whether the meaning was understood before and after seeing written words.',true],
    ['Claim a perfect pronunciation result from the device TTS voice','Synthetic voice playback is not a human evaluation of the learner’s spoken production or regional naturalness.',false]
   ]}
  ],
  synthesis:'Prepare a four-skill evidence chart and one five-turn role-play using only authored phrase IDs, with “not assessed” for missing evidence. Japanese requires the existing kana pathway before advanced reading claims.',
  model:'The evidence chart may show “written phrase recognition: demonstrated,” “unseen listening: needs further practice,” and “pronunciation and authentic interaction: not assessed.” A transcript helps learning but cannot substitute for first-hearing comprehension.',
  rubric:['Separates recognition, listening, speaking and interaction.','Uses authored phrases and qualified recordings where available.','Practices clarification rather than guessing translations.','Avoids CEFR or native-pronunciation certification.'],
  caveat:'Language study exercise only; native and regional linguistic review remains pending.'
 },
 communication:{
  title:'A vague handoff becomes an accountable update',
  situation:'A developer tells the team “Login is fixed.” The QA engineer cannot tell which failure was reproduced, whether staging was checked, or who owns the final release decision.',
  rounds:[
   {title:'Respond to the unverified status',prompt:'What should the receiver ask before treating “fixed” as a release decision?',choices:[
    ['Ask for reproduction steps, test evidence and remaining unknowns','Clarifying observable acceptance conditions respects the engineer while revealing the current verification boundary.',true],
    ['Announce that the developer intentionally lied','An unqualified status message does not establish a deliberate deception or the developer’s character.',false],
    ['Assume “fixed” means every production environment passed','A vague label is not proof of deployed behavior, especially when the tested environment is unknown.',false]
   ]},
   {title:'A staging test now fails',prompt:'The patch passes locally, but staging login still fails after deployment. What is the best handoff?',choices:[
    ['Rename the issue “closed” so dashboards stay green','Changing labels without addressing the observed failure hides material readiness information.',false],
    ['State the local success, staging failure, owner and next verification step','The update gives each environment its own result, escalates the active blocker and defines who will retest.',true],
    ['Accuse QA of being difficult because a local test passed','An independent test revealing a failure is useful evidence, not proof that the reviewer is obstructive.',false]
   ]}
  ],
  synthesis:'Write a six-field handoff note: observation, environment, impact, owner, acceptance test, and fallback or escalation. Include an example of an honest status correction.',
  model:'“Local login regression passed. Staging returns the documented failure. Release remains blocked. Owner A is investigating deployment configuration; QA will rerun the recorded test after the next build.”',
  rubric:['Separates test environments and verification states.','Uses observable test evidence instead of personal blame or assumptions.','Names owners, checkpoints and release conditions.','Communicates uncertainty without masking production risk.'],
  caveat:'Fictional engineering teamwork, not an evaluation of any real employee.'
 }
};
