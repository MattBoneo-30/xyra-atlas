/** Counterfactual decision revisions — first seven Atlas subjects.
 * Fictional evidence: examine a first interpretation, reveal a change of facts,
 * then revise rather than defend an earlier answer.
 */
export const DECISION_REVISIONS_ONE={
 psychology:{
  title:'Reconsider an apparently careless teammate',
  case:'A teammate misses three standups in a week. You initially infer they are disengaged and recommend removing them from an important project. The team has not checked schedules, message delivery, health disclosures, or whether an alternate reporting arrangement was agreed.',
  firstTask:'Separate the three recorded absences from an inference about the teammate’s character. Describe what evidence would justify a scheduling conversation and what evidence would be required for a broader staffing judgment.',
  reveal:'The teammate has been working an agreed shifted schedule approved by the project lead, and the team calendar was never updated. The activity log shows the assigned work was completed and reviewed on time. Their absence from standups was real, but the assumption of disengagement lacked context.',
  revision:'Replace the character judgment with a process diagnosis: the coordination calendar did not represent the approved schedule. Confirm the approved arrangement through an authorized channel, update expectations, and measure work quality separately from meeting attendance. Do not seek private health explanations.',
  follow:'Write a three-sentence corrective message to the team, a respectful private check-in, and one system fix that prevents this inference in the next sprint.',
  rubric:['Separates observed attendance from a claim about motivation.','Updates the recommendation after credible scheduling evidence appears.','Protects the teammate’s private circumstances and agency.','Specifies a measurable coordination repair instead of blaming personality.'],
  caveat:'Fictional team scenario; no mental-health diagnosis or employment ruling.'
 },
 laws:{
  title:'A returned item changes the consumer evidence file',
  case:'A Philippine customer reports that an online product arrived damaged. Photographs show a cracked exterior and the customer requests a remedy. The seller says the item was delivered intact. Neither party has documented when the damage occurred or verified the current law and complaint procedure.',
  firstTask:'Build a neutral chronology of the order, delivery and reported defect. Mark which observations are supported by the listing, delivery scan, contemporaneous photos and communication record, and which remain disputed.',
  reveal:'A courier record shows that an exterior package damage report was filed before the customer received the delivery. This strengthens the timeline that the package was damaged during transport, but does not by itself identify final statutory liability or the exact remedy.',
  revision:'Update the incident chronology and explicitly label the new courier evidence. Reconsider any previous conclusion blaming the customer. Verify seller and courier obligations using current official Philippine sources and the purchase contract before stating a remedy, deadline or complaint venue.',
  follow:'Draft a proportionate request asking for review of the courier report, preserving dates and the desired resolution, and make a separate list of legal questions still requiring official verification.',
  rubric:['Tracks new courier evidence without treating it as an automatic legal verdict.','Separates the timing of package damage from the question of statutory responsibility.','Relies on current official sources before naming rights or deadlines.','Uses privacy-preserving documented communication rather than threats.'],
  caveat:'Hypothetical Philippine consumer case, not legal advice or a verified agency determination.'
 },
 business:{
  title:'Revenue rises while the true margin falls',
  case:'A small seller sells 100 orders for ₱400 each. With ₱220 variable cost per order and ₱12,000 fixed costs, the simplified contribution is ₱18,000 and the result before other costs is ₱6,000. The founder proposes doubling advertising because 100 orders sounds encouraging.',
  firstTask:'Verify the gross sales, variable costs, contribution and simplified operating result. Name the assumptions under which these values would be meaningful, and list unknown refund, delivery, payment and tax costs.',
  reveal:'A platform statement shows that a new delivery charge of ₱70 per order was not included in variable cost. If the seller bears all of it, an additional ₱7,000 must be paid for the same 100 orders. No additional customer orders can be assumed from higher advertising.',
  revision:'Recalculate contribution as ₱11,000 and the simplified result after fixed expenses as −₱1,000 before other missing costs. The new evidence overturns the earlier positive result. Pause an untested scale-up, verify actual settlement terms, and evaluate whether pricing, fulfillment or product economics can be changed.',
  follow:'Create a corrected per-order margin worksheet, a cash-settlement calendar and a three-metric threshold for a limited ad experiment if the unit economics improve.',
  rubric:['Recalculates every affected amount using the newly revealed delivery cost.','Distinguishes a negative simplified result from final audited profit.','Does not assume higher ad spending automatically increases paid orders.','Defines a measurable condition for revisiting the expansion decision.'],
  caveat:'Illustrative costs; no tax, marketing return or accounting conclusion about a real business.'
 },
 savings:{
  title:'A delayed paycheck changes the affordability decision',
  case:'A worker has ₱36,000 cash, essential costs of ₱15,000 per month and an optional ₱8,000 electronics purchase. They expect a ₱20,000 salary in ten days, but must pay rent next week. An advertisement says the purchase discount disappears tomorrow.',
  firstTask:'Estimate available cash immediately and after one month of essentials, with and without the purchase. Make a separate assumption about the expected salary; do not count it as guaranteed cash.',
  reveal:'The employer confirms payroll will be delayed at least four weeks, and there is no confirmed emergency advance. The discounted price remains unchanged, but a future receipt is no longer expected before all first-month obligations.',
  revision:'Recompute the no-income cash runway: ₱36,000/₱15,000=2.4 months before other bills. Buying now reduces available funds to ₱28,000, or about 1.87 months of stated essentials. The revised priority is to protect the liquidity needed for due obligations, not chase the countdown.',
  follow:'Prepare a dated four-week essentials calendar and two contingency options that do not depend on unverified debt or future pay. Describe when the optional purchase can be safely re-evaluated.',
  rubric:['Separates money already available from an unconfirmed salary date.','Uses clear monthly expense units and recomputes the resulting runway.','Does not let a promotional clock override essential obligations.','States a realistic re-evaluation rule under changed income timing.'],
  caveat:'Fictional personal-finance scenario, not a recommendation for a regulated financial product.'
 },
 time:{
  title:'A release plan changes when a dependency breaks',
  case:'A small web release has UI implementation (three days), API verification (two days) and acceptance testing (two days). UI and API work were expected to finish independently before acceptance. Management publishes a seven-day deadline assuming no interruptions.',
  firstTask:'Draw a dependency chart with UI and API as parallel prerequisites for final acceptance. Estimate the minimum calendar length under the stated independence assumption and list what would make it longer.',
  reveal:'On day two, the API provider announces the verification endpoint will be unavailable for four additional days. The UI team can finish its work, but final acceptance still requires a successful API check. The provider does not offer a verified fallback.',
  revision:'Recalculate the earliest feasible acceptance start based on the delayed dependency and its actual return date, not the original plan. Separate safe parallel work such as documentation and mocks from the mandatory live verification gate. Tell stakeholders which date is now conditional.',
  follow:'Write a one-page change report with the disrupted dependency, new sequence, owner, validation criterion, contingency and release-hold condition if the API remains unavailable.',
  rubric:['Shows why parallel tasks do not remove a blocking final dependency.','Reports the revised date as conditional on verified API availability.','Keeps acceptance testing rather than silently skipping the gate.','Provides transparent owners, checkpoints and a scope-controlled fallback.'],
  caveat:'Simplified deterministic project schedule; real calendars and resource constraints may differ.'
 },
 languages:{
  title:'The transcript changed how well you understood',
  case:'A learner gets all eight familiar written phrase-card translations right. They immediately call themselves conversationally fluent, though no unfamiliar audio, speech production or interaction has been observed in the selected language.',
  firstTask:'Make a four-column evidence record for written recognition, unaided retrieval, listening comprehension and interactive repair. Label which skill the phrase-card score directly measures and which remain unassessed.',
  reveal:'A qualified teacher plays an unfamiliar short dialogue without a transcript; the learner cannot identify the requested destination but succeeds after reading the printed words. Their written recognition is real, while listening segmentation remains a separate challenge.',
  revision:'Update the skill profile: written recognition on the familiar pack is demonstrated; unfamiliar listening needs focused practice; speaking and spontaneous interaction remain untested. Design a short, ethically observed repeat task using qualified recordings rather than claiming a new CEFR level.',
  follow:'Write a five-day mini-plan that starts with short audio, tracks first-hearing comprehension separately from transcript-supported attempts, and ends with a clarification request using a verified local expression.',
  rubric:['Distinguishes familiar written-card results from unseen listening comprehension.','Treats the new evidence as a skill-specific gap, not proof of personal inability.','Uses qualified reference audio and verifiable assessment tasks.','Avoids a fluency, pronunciation or CEFR certification claim.'],
  caveat:'Fictional skills assessment; qualified language review remains required.'
 },
 communication:{
  title:'A late handoff becomes a missing dependency',
  case:'A project lead tells a teammate, “You ignored the deadline.” The documentation arrived two days late according to the published schedule, and the testing group lost an afternoon. No one has checked whether the technical prerequisites were supplied on time.',
  firstTask:'Separate the late submission, the observed testing impact and the claim that the teammate intentionally ignored the schedule. Draft an accountability question that could uncover missing information without dismissing the delay.',
  reveal:'The API team revised the required response schema a day before documentation was due, but never notified the writer. A ticket demonstrates the writer requested clarification and received no answer until after the stated handoff date.',
  revision:'Correct the public attribution and investigate contract-change notifications and change ownership. Replan the actual review task and introduce a traceable “blocked by upstream change” state. The delay is still important, but the causal explanation must now account for the missed notification.',
  follow:'Write a factual correction to the team, a handoff template with blocking conditions, and an acceptance test demonstrating that a future schema update reaches every downstream owner.',
  rubric:['Acknowledges the documented delay without inferring deliberate disrespect.','Integrates upstream change evidence into the cause analysis.','Provides an appropriate public correction of the earlier accusation.','Creates a measurable communication and dependency-control repair.'],
  caveat:'Fictional workplace incident; not an employment evaluation.'
 }
};
