/** Xyra Atlas advanced evidence inquiries: group A.
 * Original fictional scenarios. All examples need independent editorial review.
 * No user data, network requests, or persistence.
 */
export const EVIDENCE_INQUIRIES_A = {
 psychology: {
  title:'An intervention claim: separate improvement from explanation',
  scenario:'A fictional school reports that students using a five-minute reflection exercise felt less stressed after a week. An administrator wants to make the exercise compulsory and announce that it cures anxiety. A volunteer sample completed both surveys, but nonresponders and stressful exam dates were omitted from the presentation.',
  exhibits:[
   ['Measured responses','Of 40 volunteers who began the exercise, 28 completed the follow-up survey. Their average self-rated stress score moved from 7 to 5 on a ten-point scale.'],
   ['Missing comparison','The school did not collect matching before/after ratings from students who did not use the exercise, and it has no outcome records for 12 nonresponders.'],
   ['Alternative explanation','Exams ended during the same week. Sleep, workload and willingness to respond may have changed independently of the reflection exercise.']
  ],
  reasoning:'A two-point change among respondents is a descriptive finding, not proof of a clinical effect. Attrition means the 28 completers may differ from the original 40. The end of exams offers a rival explanation. A fair summary would report the sample, measure, missing data and timing, then propose voluntary comparison groups with appropriate protections and a pre-defined outcome. The intervention might be useful, but compulsory treatment and claims of curing anxiety do not follow from these observations.',
  countercase:'Even if a randomized comparison later shows a benefit, an average improvement would not establish that the technique works for every individual or replaces qualified assessment when distress is severe.',
  challenge:'Create an evidence table with claim, directly observed result, missing information, and a test that could weaken the proposed explanation. Compute the follow-up response rate, draft a cautious 40-word school announcement, and identify a safeguard against coercing vulnerable students.',
  model:'The response rate is 28/40, or 70%. The observed score change is two points among those 28 respondents; it says nothing direct about the missing 12. A cautious message is: “In a small voluntary survey, respondents reported less stress after a week; other changes occurred and we have no comparison group. We will study this further before drawing causal conclusions.” Participation should remain voluntary, with appropriate support for students needing individualized care.',
  rubric:['Reports the 70% follow-up rate, denominator and attrition rather than only the apparent improvement.','Names exam timing or selection as an alternative explanation without claiming it is the true cause.','Proposes an ethical comparison and appropriately bounded communication of uncertainty.','Distinguishes a school wellbeing exercise from clinical treatment or an individual diagnosis.'],
  limits:'Invented survey data; not a validated intervention or medical advice.'
 },
 laws: {
  title:'Data processing inquiry: trace facts and governing authority',
  scenario:'A fictional Philippine campus app stores student profile fields and uses a third-party messaging provider. A student finds a privacy notice mentioning account support but cannot tell whether an optional marketing field is being used. A classmate insists all outside processing is illegal without consent and recommends reporting a breach immediately.',
  exhibits:[
   ['The published notice','The notice lists account delivery and maintenance, but the excerpt does not state which data fields are sent to the messaging provider.'],
   ['The user record','The student can inspect their own submitted profile, but has no direct evidence that another student’s data was accessed.'],
   ['The unresolved legal facts','The processing purposes, safeguards, controller-processor relationship, lawful basis, retention and applicable current NPC procedures have not been verified.']
  ],
  reasoning:'Construct a documented question before asserting a violation. Separate what the notice actually discloses, what the student personally submitted, and what is unknown about the provider. The Philippines’ Data Privacy Act can involve different lawful bases for processing; absence of an explicit consent screen by itself does not settle legality. Request the student’s own processing information through the genuine data-protection channel and check current National Privacy Commission guidance. Protect third-party records and do not presume an outside service automatically means a breach.',
  countercase:'A privacy notice that names a vendor is not by itself proof that every disclosure is lawful; lawful basis, necessity, security and the actual data flow still matter. Likewise, silence after a single message is not a concluded regulatory finding.',
  challenge:'Draw a four-column matrix of known processing, claimed purpose, evidence still needed, and source or party to verify it with. Draft an access request limited to the student’s own data. Identify two competing legal interpretations and state what official source or professional review would distinguish them.',
  model:'A careful request asks the verified controller to explain the categories, processing purposes, recipients and retention of the student’s own information. It records the date and the stated response, without requesting classmates’ files or assuming a particular statutory deadline. The learner labels any claim about lawfulness provisional until the current law, NPC guidance and material facts are checked.',
  rubric:['Separates a cited privacy notice from the actual, unobserved transfer of specific data.','Recognizes that consent is not automatically the only possible legal basis and avoids a categorical verdict.','Limits access requests to legitimate data-subject information and protects third-party privacy.','Names primary-law or NPC guidance checks and a proportionate verified route for further questions.'],
  limits:'Educational case only. Current Philippine law, regulations and agency procedure require independent verification; not legal advice.'
 },
 business: {
  title:'Three-month pilot: profit, cash and return risk are different',
  scenario:'A fictional small online shop sells digital design templates. Last month 80 orders sold for ₱500 each with variable processing/support costs of ₱120 per order and fixed monthly costs of ₱18,000. The owner wants to double ad spending because total revenue looks strong. The payment provider holds receipts for seven days and 12 of 80 buyers have asked for refunds.',
  exhibits:[
   ['Order economics','80 orders × ₱500 = ₱40,000 gross sales. At ₱120 variable cost per order, the simple pre-refund contribution is ₱30,400.'],
   ['Fixed commitments','The current month includes ₱18,000 in fixed costs; proposed extra advertising is ₱10,000 with no verified incremental conversion rate.'],
   ['Cash and refunds','Twelve refund requests are unresolved. Payout delay, refund obligations, chargebacks and taxes are not modeled in the headline sales number.']
  ],
  reasoning:'Under the stated simplified assumptions, pre-refund contribution less fixed costs is ₱12,400. It is not cash in the bank or final profit. If all twelve requests receive full ₱500 refunds, gross sales fall by ₱6,000; actual cost recovery, fees and revised contribution depend on the terms. Spending another ₱10,000 before learning the actual refund rate and incremental acquisition cost could exhaust working cash. Analyze cohorts, refund causes, net receipts and actual payout timing before scaling. Choose an ethical experiment with a fixed loss limit rather than assuming more advertising creates proportional sales.',
  countercase:'Even a positive margin can coexist with an imminent cash shortage if fixed bills are due before payouts. A refund request does not automatically prove a refund was granted, and deleting complaints to improve metrics corrupts the evidence.',
  challenge:'Calculate the pre-refund contribution and simple operating result; build best, base and adverse cases for zero, six and twelve full-price refunds, clearly stating any cost-recovery assumptions. Specify a payout calendar and a measurable condition that must be met before increasing advertising.',
  model:'Gross sales are ₱40,000; variable costs are ₱9,600; contribution is ₱30,400; the simplified result after ₱18,000 fixed expenses is ₱12,400. Twelve full-price refunds would lower collected gross revenue by ₱6,000 before processing-cost adjustments. A responsible decision waits for observed refunds, available cash and verified acquisition results before authorizing additional spend.',
  rubric:['Calculates revenue, contribution and simplified result accurately without calling any one of them cash.','Makes refund assumptions explicit and separates requested from completed refunds.','Accounts for cash timing and unmodeled costs before committing new advertising.','Uses measurable test criteria and a stop-loss condition instead of extrapolating from gross sales.'],
  limits:'Fictional figures omit contractual refunds, taxes, chargeback fees, capital needs and specific business rules.'
 },
 savings: {
  title:'Irregular-income reserve: choose resilience before yield',
  scenario:'A freelancer starts with ₱48,000 liquid savings and ₱24,000 monthly essentials. Their next three invoices may arrive on time, one month late, or not at all. An online offer advertises high guaranteed returns if most savings are locked for 90 days. The freelancer also expects an optional ₱12,000 device upgrade.',
  exhibits:[
   ['Runway baseline','Without new income or spending changes, ₱48,000 covers exactly two months of the stated ₱24,000 essentials.'],
   ['Availability condition','The advertised product would restrict access for 90 days. The exact issuer, regulatory status, deposit protection and withdrawal rules are unverified.'],
   ['Discretionary choice','The optional upgrade costs half a month of essentials and can be delayed without removing basic housing, food or medicine.']
  ],
  reasoning:'Liquidity is part of the decision, not a footnote to the interest rate. Under zero-income assumptions the first month leaves ₱24,000; the second leaves ₱0; a third month would be short ₱24,000. Buying the upgrade immediately leaves ₱36,000 and reduces the no-income runway to 1.5 months. Locking money for 90 days can create a cash problem before its nominal return matters. Before any product decision, verify the provider and contract through official channels and stress-test access to essentials. A reserve sized for irregular receipts should reflect actual expenses, risk, obligations and available alternatives; there is no universal amount for everyone.',
  countercase:'An apparently higher yield may be irrelevant if an early withdrawal is prohibited or punitive. A future invoice promise is not cash on hand. Being too cautious can also have an opportunity cost, but it should be modeled only after basic obligations are covered.',
  challenge:'Prepare a three-month cash table for no income; a one-month delayed invoice of ₱30,000 arriving in month two; and a device purchase in month one. Show the exact month balances become negative or reach zero. Write a verification checklist before accepting any product with a lockup.',
  model:'With no income, balances after months one through three are ₱24,000, ₱0 and minus ₱24,000. With a ₱30,000 invoice received in month two and no other receipts, balances are ₱24,000, ₱30,000 and ₱6,000. If a ₱12,000 optional upgrade is paid in month one with no income, balances are ₱12,000, minus ₱12,000 and minus ₱36,000. These are cash-flow examples, not an investment recommendation.',
  rubric:['Correctly tracks starting balance, timing of receipts and expenses for all three scenarios.','Makes the impact of lockup and withdrawal restrictions explicit before considering yield.','Distinguishes essential spending from optional upgrades without assuming all costs can be cut.','Requests independently verifiable issuer and product details rather than trusting guaranteed-return marketing.'],
  limits:'Illustrative amounts only. This is financial literacy, not regulated investment advice or a product endorsement.'
 },
 time: {
  title:'Release dependency trap: why a parallel task can still block delivery',
  scenario:'A six-task app release includes design (A, 2 days), API contract (B, 3 days after A), frontend (C, 4 days after B), documentation (D, 2 days after A), integration testing (E, 2 days after C and D) and production review (F, 1 day after E). The only frontend engineer must also write documentation. In week two, the API contract slips by one day.',
  exhibits:[
   ['Logical dependencies','A→B→C→E→F requires 2+3+4+2+1=12 days. A→D→E→F requires 2+2+2+1=7 days under independent parallel-resource assumptions.'],
   ['Resource conflict','C and D were planned in parallel but the same engineer is responsible for both. Whether that is feasible depends on who actually performs the work.'],
   ['Observed change','B slips one day; no validated fallback or schedule buffer exists. Acceptance depends on E finishing before F.']
  ],
  reasoning:'A dependency graph is a calculation with assumptions, not an automatic release date. Under the simple precedence model, the critical path is A-B-C-E-F, 12 days, and a one-day B delay raises it to 13 if nothing else changes. Shared staffing can extend actual completion beyond the idealized graph, especially if D must wait for the same person. Before committing a new delivery date, identify tasks with float, check the resource calendar and change integration-test sequencing only if acceptance standards remain intact. A useful plan records evidence for schedule revisions and keeps quality gates mandatory.',
  countercase:'Shortening documentation does not remove the API dependency if C cannot start. Dropping integration testing to “save” two days changes what release readiness means and hides risk rather than solving the bottleneck.',
  challenge:'Draw an ASCII dependency chart for all tasks, calculate the two principal paths and new critical path after B slips, then create two alternative staffing schedules for C and D. Identify one checkpoint when the plan should be re-estimated and one change that would constitute an unacceptable quality shortcut.',
  model:'A→B→C→E→F is 12 days; A→D→E→F is 7 days, assuming parallel availability. A one-day slip in B raises the first path to 13 days. A realistic schedule must then check whether the engineer can complete D alongside C; if not, resequence D or resource it separately. E and F should still retain their acceptance criteria.',
  rubric:['Distinguishes critical-path arithmetic from resource-constrained scheduling.','Correctly identifies the 12-day baseline and 13-day delayed path.','Models the shared engineer’s capacity rather than double-booking time.','Preserves verification and production acceptance rather than hiding delay by skipping gates.'],
  limits:'Simplified deterministic durations; actual project schedules include variability, communications, review time and resource calendars.'
 },
 languages: {
  title:'Listening evidence: transcript correctness is not speaking fluency',
  scenario:'An adult Japanese learner can read a short transcript with きのう (yesterday), きょう (today), and あした (tomorrow), but cannot distinguish a rapid native recording without text. A quiz app gives a 100% score because the learner memorized written translations. A friend tells them that the score demonstrates conversational fluency.',
  exhibits:[
   ['Written performance','The learner matches all three time words correctly when they are printed and romanized on a familiar flashcard.'],
   ['Independent listening','Without the transcript the learner misses key time words in a naturally paced recording; the sample contains no measured score or validated audio benchmark.'],
   ['Conversation behavior','The learner has not demonstrated understanding of a follow-up question, a clarification request, or polite adjustment to a conversational setting.']
  ],
  reasoning:'Separate skills instead of collapsing them into one percentage. Reading recognition demonstrates useful progress on reading, not yet listening or interactive speaking. A meaningful assessment would include unfamiliar recordings at multiple speeds, comprehension questions that cannot be answered from memorized word order, and supported opportunities to ask for repetition. Compare performance after seeing a transcript with performance before viewing it. Record which sound, word boundary or grammatical clue was missed and avoid inferring pronunciation competence from the synthetic playback voice. An ethical learning plan repeats listening with qualified native references and keeps confidence aligned with observed skills.',
  countercase:'A transcript exercise can still be worthwhile; rejecting it as “not real learning” would be unfair. The error is labeling it a test of abilities it did not measure. Perfect one-day recall does not establish retention a month later.',
  challenge:'Design a four-task assessment for one fictional dialogue: unseen listening, transcript reading, comprehension transfer and polite repair when a sentence is not understood. Name the evidence each task measures, a possible confound, and how a native-qualified reviewer would check the spoken examples.',
  model:'A defensible report could say “Reading recognition: 3/3 on a familiar written card; listening: needs separate measurement; interactive speaking: not assessed.” The learner should compare their first hearing with later transcript-supported hearings and write down exactly which segmentation or time word changed meaning. No fluency claim follows from this single result.',
  rubric:['Separates written recognition, listening comprehension and interactive speaking into distinct measurable skills.','Uses unfamiliar audio and transfer questions rather than only recalling a memorized card.','Identifies reference-audio and register checks needing qualified native review.','Avoids translating a single narrow quiz score into a general fluency claim.'],
  limits:'All learner observations are fictional. Actual Japanese usage, prosody and pronunciation require qualified native or regional review.'
 },
 communication: {
  title:'Incident debrief: responsibility without forced agreement',
  scenario:'A project lead announced that an integration bug was “the designer’s fault” during a team meeting. Later investigation shows the API contract did not specify the required error state. The designer now refuses to attend public reviews. Leadership asks the project lead to send an apology and close the issue before release.',
  exhibits:[
   ['What was public','The lead made a specific accusation in front of the team before the contract and implementation were investigated.'],
   ['What was verified later','The missing error-state requirement appears in the interface contract, but the record does not establish a single individual responsible for all implementation decisions.'],
   ['What remains unresolved','The effect on the designer, desired repair and long-term decision procedure have not been discussed with the person harmed.']
  ],
  reasoning:'A responsible repair identifies the lead’s actual action without inventing a motive for the designer. Acknowledge the unsupported public accusation, correct the factual record with an appropriate audience, and avoid making the designer responsible for reassuring leadership. Invite the designer to choose whether and how to participate in any follow-up, while addressing the technical contract gap through a process change. A release schedule does not entitle the lead to forgiveness. The learning outcome is accountable communication plus a verifiable change in review practice, not ceremonial harmony.',
  countercase:'A private apology alone may leave a public false accusation uncorrected. An email saying “I’m sorry you felt blamed” dodges the actual act. Publicly disclosing private details of the designer’s response can cause fresh harm.',
  challenge:'Write a three-part repair script: precise responsibility, factual correction and one observable review-process change. List two possible responses from the designer—including declining further discussion—and draft respectful follow-ups. Name a release risk that remains even after the apology.',
  model:'A workable lead statement is: “I said the bug was caused by the design before verifying the API requirements. That was unsupported and unfair. I will correct the meeting record and require a contract review before assigning ownership of similar issues.” The designer may prefer no direct meeting, and the error-state requirement still needs specification, testing and acceptance.',
  rubric:['Names the unsupported public accusation as an observable act and corrects it at an appropriate scope.','Acknowledges impact without requiring the other person to forgive or supply reassurance.','Includes a measurable process change addressing the missing API contract and review procedure.','Preserves privacy and separates relational repair from technical release acceptance.'],
  limits:'Fictional workplace example; actual workplace and employment procedures vary.'
 }
};
