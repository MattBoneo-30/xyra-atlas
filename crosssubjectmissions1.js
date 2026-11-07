/** Interdisciplinary field missions, part 1.
 * Each links an intermediate lesson to a separately authored subject.
 * Fictional study cases; no credentials or external expert signoff claimed.
 */
export const CROSS_SUBJECT_MISSIONS_ONE={
 psychology:{
  peerCourse:'relationships',peerLesson:'trust',
  title:'Trust without mind-reading: psychology meets relationships',
  scene:'A friend fails to answer three messages, then apologizes for a family emergency. Another friend says the delay proves the relationship is unsafe. You have a time record, a report from the friend, and strong feelings—but no independent evidence of an ongoing pattern.',
  bridge:'Psychology asks which claims follow from observations; relationship literacy asks whether boundaries, reliability and repeated actions support trust. Compare the observable behavior with the decision it requires. A concern can be valid without a final explanation for another person’s motive.',
  challenge:'Draft two parallel analyses: (a) evidence supporting each possible interpretation, and (b) actions that preserve both people’s autonomy. Create a follow-up condition that would change your view, and distinguish the ordinary uncertainty case from a documented threat or repeated coercion.',
  model:'The three delays are observations, not a diagnosis of disloyalty. Ask about workable communication expectations without demanding constant access. Watch whether reliability improves over time. If threats or surveillance occur, use a safety-oriented response rather than an ordinary clarification script.',
  rubric:['Verifiable observations remain separate from explanations or attributed intentions.','Two plausible explanations are considered without asserting equal probability.','The proposed boundary describes an action you control.','The analysis distinguishes routine conflict from credible safety risk.']
 },
 laws:{
  peerCourse:'digital',peerLesson:'passwords',
  title:'Privacy claim meets implementation: law and digital security',
  scene:'A Philippine school portal promises that only enrolled students can see their own records. A developer hides a “Grades” tab for guests, but the server has never been tested with another student’s authenticated account requesting a different record ID.',
  bridge:'Legal data-protection concepts specify purposes, rights and responsibilities; technical authorization must enforce permitted access on every request. A privacy notice does not implement a server control, and a browser check does not adjudicate legal compliance.',
  challenge:'Draw the user → session → controller API → stored record flow. Specify two defensive tests, who should review the privacy claim, and what evidence would be needed before claiming compliance with applicable Philippine rules. Avoid trying to fetch anyone’s real records.',
  model:'Protect resource access on the server using the authenticated identity and record ownership. Test that student A cannot read student B’s grades and that expired sessions are denied. Record results without student data, and send statutory interpretation and notice wording for qualified review.',
  rubric:['The access-control test checks the requested record, not only login.','The practice uses fictional test accounts and no real student files.','Technical and legal verification are treated as different evidence.','The conclusion avoids unsupported certification or breach assertions.']
 },
 business:{
  peerCourse:'savings',peerLesson:'cashflow',
  title:'A profitable preorder can still run out of money',
  scene:'A fictional seller gets 25 preorders at ₱600 each, pays ₱260 variable cost per order, and owes ₱7,000 for equipment before the payment provider releases its proceeds. The owner counts all ₱15,000 of projected revenue as cash available today.',
  bridge:'Business unit economics describe contribution; personal-finance cashflow makes the timing of receipts and obligations explicit. The simplified contribution is 25×(₱600−₱260)=₱8,500 before fixed costs, but none of that establishes cash is already accessible.',
  challenge:'Build a four-date cash calendar showing equipment due, product-cost payment, customer settlement and refunds. Compute the ₱8,500 contribution, then describe the minimum cash required before fulfillment and one action if payment settlement slips a week.',
  model:'Gross receipts are ₱15,000, variable costs are ₱6,500, and contribution is ₱8,500. Record settlement timing and when the ₱6,500 must be paid. The ₱7,000 equipment bill can create a cash gap despite positive contribution; postpone discretionary commitments or arrange a legitimate, sustainable alternative.',
  rubric:['Revenue, contribution and available cash are not confused.','The dated cash calendar includes all stated obligations.','Refund obligations and delayed payment settlement are included in the decision.','The proposal avoids assuming a future payout is money already received.']
 },
 savings:{
  peerCourse:'time',peerLesson:'priorities',
  title:'Budget the month and the week, not just the amount',
  scene:'A worker has ₱9,000 today and expects ₱15,000 in 12 days. Their ₱7,000 rent is due tomorrow and a nonessential ₱4,000 device accessory is discounted for two more days. A colleague argues the discount makes buying it the highest priority.',
  bridge:'Cash planning tells you how much money is available now and when; time prioritization asks which deadlines protect essential outcomes. A promotional countdown cannot override necessities or turn expected income into a certain receipt.',
  challenge:'Create a dated 14-day obligation calendar and a basic cash balance under two scenarios: wages on time and wages delayed by a week. Rank rent, food, accessory and contingency needs with explicit reasons. Propose an ethical alternative to the discounted purchase.',
  model:'If the ₱4,000 accessory is bought immediately and rent is paid next day, only ₱-2,000 remains from the initial ₱9,000 before food, an infeasible position without new funds. Paying rent first preserves ₱2,000 for essentials until the expected wage arrives. The accessory can be deferred; an expected deposit is not current liquidity.',
  rubric:['The dated cash calendar combines transaction timing with the correct amounts.','Required essentials outrank unverifiable promotional urgency.','The delayed-income scenario is evaluated independently from the on-time case.','No recommendation assumes new debt or guaranteed future payment without evidence.']
 },
 time:{
  peerCourse:'career',peerLesson:'skills',
  title:'Deliver one measurable portfolio increment',
  scene:'A developer has eight free hours this week. Their backlog includes a polished landing animation (estimated six hours), fixing a public demo login failure (three hours), and writing evidence of three completed features (two hours). They want to present a professional portfolio on Monday.',
  bridge:'Time management ranks work by dependency and consequence; career development asks what evidence a reviewer needs to trust the applicant’s claims. A beautiful UI may not compensate for a nonfunctional demonstration.',
  challenge:'Create a dependency-aware 8-hour plan. Include a minimum acceptance test for demo authentication, documentation of personal contributions and a one-hour buffer. Describe what to cut if the login repair takes five hours.',
  model:'Allocate three hours to verify and fix demo access, two to document implemented features with limitations, and one to retest, leaving two hours for contingency or selective polish. If the blocker overruns, drop cosmetic animation first and report the actual verified outcome.',
  rubric:['A demo-blocking failure is prioritized on evidence.','The proposed schedule reserves realistic contingency time before commitments.','Portfolio claims are tied to reproducible features.','A fallback rescope does not erase necessary verification.']
 },
 languages:{
  peerCourse:'communication',peerLesson:'listen',
  title:'Repair a conversation across a language gap',
  scene:'A beginner recognizes a station-direction question on a written phrase card. In a live interaction, the other person responds faster than expected. The learner guesses the direction to avoid looking embarrassed, then walks toward the wrong stop.',
  bridge:'Language study provides phrases and sound recognition; communication study teaches clarification, paraphrasing and listening without pretending understanding. A successful interaction requires the learner to repair uncertainty, not just produce a memorized sentence.',
  challenge:'Using the existing target-language phrase pack, identify the exact phrase for “I don’t understand” and the one requesting repetition. Create a five-turn cue-only dialogue: greeting, question, uncertainty, repeat request and thanks. Explain which turns need qualified native review for register and pronunciation.',
  model:'Use the existing authored phrases for greeting, station question, misunderstanding, repeat request and gratitude rather than inventing new translations. When the reply is unclear, ask for repetition instead of pretending to understand. Review whether the phrases are natural for the region and speaker.',
  rubric:['All target-language wording comes from authored starter material.','The learner explicitly acknowledges unclear meaning.','The dialogue includes a repair request rather than a forced guess.','Native pronunciation and local register are not treated as automatically verified.']
 },
 communication:{
  peerCourse:'psychology',peerLesson:'thoughts',
  title:'Feedback without attributing personality or motive',
  scene:'A teammate submits documentation two days after the agreed review date. During a meeting, a lead says, “You are careless and never respect deadlines.” The teammate claims a dependency changed without an update to the plan.',
  bridge:'Psychology distinguishes observations from untested assumptions; communication translates that distinction into a factual, actionable conversation. The delay needs coordination, but labels about character do not identify which system failed.',
  challenge:'Rewrite the lead’s criticism as a four-part feedback exchange: observed fact, effect on delivery, open question about constraints, and future agreement with date. Include a condition that would change the lead’s understanding of the issue.',
  model:'“The documentation arrived two days after our review date, so testing started later. What changed in the dependency? Can we agree to raise a blocked review in the shared channel by the next working day?” This does not erase accountability but replaces global character judgments with a verifiable plan.',
  rubric:['The feedback references a dated, observable event rather than a character judgment.','The delivery impact is distinguished from any unverified assumption about intention.','The other person can provide relevant missing evidence.','The agreement defines a future process or measurable commitment.']
 }
};
