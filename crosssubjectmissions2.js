/** Interdisciplinary field missions, part 2.
 * Subject-specific fictional cases to connect the existing curriculum.
 */
export const CROSS_SUBJECT_MISSIONS_TWO={
 thinking:{
  peerCourse:'science',peerLesson:'method',
  title:'Do the numbers support the experiment?',
  scene:'An app team reports a 25% productivity increase after adopting a focus timer. Only five volunteers were measured, and the test week had fewer customer requests. Their result is presented as proof the timer causes faster work for every team.',
  bridge:'Critical thinking checks denominators, sampling and confounding. Science teaches measurement and testable predictions. Those skills combine when evaluating a claimed improvement: design, outcomes and uncertainty determine what can be concluded.',
  challenge:'Define productivity in a measurable way, propose a comparison that holds workload more consistent, and list at least three sources of bias. Write a two-sentence result report that is accurate even if the observed 25% difference remains.',
  model:'The preliminary difference is an observation in five volunteers, not a general causal estimate. A stronger study predefines the metric, tracks comparable tasks and conditions, compares with a control or counterbalanced period and records failures and uncertainty. Do not claim a 25% gain for every team.',
  rubric:['The outcome and denominator are defined precisely.','At least three confounders or selection factors are identified.','The design tests a prediction rather than reinforcing a slogan.','The conclusion does not claim universal causality from a small sample.']
 },
 digital:{
  peerCourse:'laws',peerLesson:'privacy-law',
  title:'Make a privacy promise technically testable',
  scene:'An online service says it deletes every uploaded photo forever when the user presses Delete. The frontend removes the preview immediately, but documentation does not explain backup retention, CDN caching, trash state or the storage vendor’s deletion lifecycle.',
  bridge:'Digital engineering identifies each storage and cache copy; privacy literacy asks what the service can lawfully and accurately promise. Removing a visible image and permanently erasing all replicas are different events.',
  challenge:'Draw a lifecycle from upload through object store, thumbnails, cache, trash and backup. Write four negative tests and a user-facing deletion statement that accurately describes what is known, unknown and outside immediate control.',
  model:'A defensible system deletes or marks each controlled copy according to a documented retention policy and verifies results. It avoids promising instant destruction of backups or caches without testing that claim. Qualified legal review is required before representing the implementation as compliant.',
  rubric:['The lifecycle covers more than the visible frontend state.','Tests identify retained or inaccessible copies and verified outcomes.','The user-facing statement respects known limits and timing.','Legal compliance is not inferred solely from a successful deletion UI test.']
 },
 career:{
  peerCourse:'business',peerLesson:'sales',
  title:'Sell a technical service with evidence instead of inflated claims',
  scene:'A freelance developer offers a small inventory dashboard to neighborhood shops. A proposal says “zero bugs, guaranteed profits, enterprise secure” and bundles unlimited edits at a fixed price. Prospects cannot tell what functionality, support or outcome is actually included.',
  bridge:'Career portfolio work makes implementations inspectable; business sales require an honest value proposition and bounded delivery. Evidence-based claims improve trust while clear scope protects both buyer and provider.',
  challenge:'Draft a concise proposal naming the customer problem, two features, a demo acceptance test, revision limit, exclusions and an outcome you can actually verify. Separate product functionality from the business benefit that still depends on customer use.',
  model:'A reviewable offer shows a working stock-adjustment flow and reports specific tests, planned handoff, two revision rounds and a clear support window. It does not promise profit or perfect security. Price and delivery are based on an agreed specification.',
  rubric:['The promised behavior can be demonstrated and tested.','Claims of security and business impact remain bounded by evidence.','Scope and revisions are limited and readable.','The buyer can accept, negotiate or decline without deceptive urgency.']
 },
 science:{
  peerCourse:'thinking',peerLesson:'causation',
  title:'Can the astronomy observation support the conclusion?',
  scene:'A learner photographs the Moon on four evenings and notices the illuminated shape changing. They claim the changing phase proves Earth’s shadow is moving across the Moon every night. The images have different exposure and cloud conditions.',
  bridge:'Science contributes geometric models and measurement; critical thinking tests whether the observation distinguishes competing explanations. Ordinary Moon phases reflect changing viewing geometry of the sunlit half, whereas an eclipse requires a specific alignment.',
  challenge:'Draw a simple Sun–Earth–Moon model for two different phases and specify a prediction that differs from the Earth-shadow theory. Create a dated observation log with missing observations noted, and name two camera or weather limitations.',
  model:'The lunar surface reflects sunlight; the visible fraction of its lit hemisphere varies with orbital geometry. Earth’s shadow causes a lunar eclipse under suitable alignment, not the usual monthly phases. Photographs should be compared with dated predictions and instrument limits.',
  rubric:['The model distinguishes phases from a lunar eclipse.','An alternative explanation makes a testable prediction.','Observations and missing nights are recorded honestly.','Exposure, clouds and scale are acknowledged as limitations.']
 },
 relationships:{
  peerCourse:'communication',peerLesson:'boundaries',
  title:'Repair a disagreement while keeping autonomy intact',
  scene:'Two friends disagree about borrowing a laptop. One says “You never trust me” after a request is declined. The owner has important private files and wants to help with a small design task without surrendering unrestricted access.',
  bridge:'Relationship health involves consistent trust and consent; communication turns those principles into specific, respectful boundaries. A refusal of device access need not be rejection of friendship.',
  challenge:'Write a boundary that protects the files and offers one safe alternative, such as helping in a supervised session or sharing only a chosen export. Then describe how the response changes if the friend threatens retaliation.',
  model:'“I’m not lending my personal laptop because it holds private files. I can help export the assets you need or work with you for an hour.” If threats occur, protect accounts and seek support rather than bargaining under pressure.',
  rubric:['A clearly defined personal limit is stated without insults.','The other person is offered a voluntary option rather than a demand.','Private information is not surrendered as proof of affection.','Credible threats trigger a distinct safety-oriented response.']
 },
 negotiation:{
  peerCourse:'business',peerLesson:'pricing',
  title:'Negotiate scope using real unit economics',
  scene:'A customer wants a website project for ₱12,000, while a freelancer estimates 24 hours of work at a minimum sustainable ₱700 per hour before additional costs. The customer values quick delivery but does not need every feature immediately.',
  bridge:'Negotiation seeks informed options; pricing turns time and operating constraints into an economic floor. Under the simplifying assumption of 24 hours at ₱700, the labor floor is ₱16,800, above the offered budget by ₱4,800.',
  challenge:'Create a cost table for the original scope and a revised 16-hour deliverable. Define three acceptance criteria and a change-request rule. Draft a respectful counteroffer and distinguish a real alternative client from a bluff.',
  model:'At the illustrative rate, the original 24-hour labor floor is ₱16,800 and 16 hours would cost ₱11,200 before other obligations. A smaller scope might fit ₱12,000 only if risks and overhead are still covered. Never promise unlimited revisions or invent competing offers.',
  rubric:['Cost arithmetic and assumptions are explicit.','An alternative preserves core client value within defensible scope.','Revisions and acceptance are bounded.','No unsupported leverage or guaranteed outcome is claimed.']
 },
 shadow:{
  peerCourse:'digital',peerLesson:'scams',
  title:'Defend against pressure across messages and interfaces',
  scene:'A fictional account-reset email says private photos will be exposed in ten minutes unless the user enters a one-time code through a shortened link. The accompanying page copies a familiar brand and uses a countdown and a hidden close button.',
  bridge:'Manipulation literacy recognizes urgency, fear and constrained choice; digital security checks the actual origin, recovery process and trust boundaries. Neither a countdown nor a familiar-looking logo authenticates the sender.',
  challenge:'Identify four pressure signals and create a safe verification plan that never uses the supplied link or contact number. Include separate responses for no interaction, clicking only, and submitting a password or OTP. Do not reproduce live attack instructions.',
  model:'Stop engaging with the suspicious link, open the legitimate service independently and verify account activity. If a credential or code was entered, use official recovery and session-revocation processes. Preserve limited evidence without exposing personal data.',
  rubric:['Urgency and branding are not mistaken for authenticity.','The verification path is independent of attacker-supplied contact details.','Possible credential compromise receives a separate response.','The exercise teaches safe defense rather than coercion or imitation of an attack.']
 }
};
