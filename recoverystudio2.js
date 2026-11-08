/** Skill Recovery cases B: remaining seven subjects x three learning stages.
 * Fresh cases to apply a missed concept; no automatic grading or credentials.
 */
export const RECOVERY_CASES_B={
 thinking:[
  ['An influencer reports that eighty percent of participants benefit from a new routine but does not report how participants were selected or what benefit means. Reformulate the statement as a testable question.',
   'A credible version specifies the sampled population, number of participants, baseline, outcome measurement and comparison window. Ask how a benefit was classified and what result would count against the claim. Without a denominator or outcome definition, a persuasive percentage cannot establish effectiveness.',
   'Quoting a percentage as proof when its population and measurement have not been defined.',
   'Could an independent reviewer replicate the stated test and find a result that falsifies the preferred explanation?'],
  ['A product page received 500 visitors, 100 trial starts and 25 paid signups. Marketing reports a 25 percent paid conversion rate. Evaluate the claim using at least two appropriate denominators.',
   'Twenty-five divided by one hundred is a 25 percent trial-start-to-paid rate. Twenty-five divided by five hundred is a 5 percent visitor-to-paid rate. Both may be accurate for the stated cohort, but they describe different parts of the funnel. Label the numerator, denominator and time window every time.',
   'Choosing the most flattering valid denominator and allowing readers to assume it describes all visitors.',
   'Can a reviewer reproduce each percentage and identify precisely which population it represents?'],
  ['A voluntary training program reports higher wages among attendees than others. Baseline experience, motivation and prior pay were not collected. Propose a research design that does not claim certainty beyond the evidence.',
   'Voluntary participants may already differ in career opportunities, skills and ambition. Describe these confounders, measure initial outcomes consistently, and compare similar cohorts or random assignment where suitable and ethical. The observed difference does not establish a causal benefit, nor does the weakness of the data prove training cannot work.',
   'Turning correlation into proven causation, or uncertainty into a categorical negative claim.',
   'Is there a plausible competing explanation and a design improvement that could change the causal assessment?']
 ],
 digital:[
  ['A message that appears to come from an email provider warns that access will expire in ten minutes and links to a verification form. Identify a route that verifies the warning independently.',
   'Use a known application, manually typed service address or previously trusted bookmark, then check account notices and official security activity. Do not enter a password, recovery code or one-time password into the supplied form merely to test it. Report suspicious contact through an established channel.',
   'Trusting the appearance of a brand or testing authenticity by surrendering live credentials.',
   'Does the response avoid attacker-controlled channels and protect account recovery methods?'],
  ['A photo vault hides files belonging to others from a React list, but the download API only checks that the requester is logged in. Outline a permitted authorization test.',
   'Create two owned test accounts and separately owned files. Confirm that a user can retrieve their own file but receives a server denial when requesting the other test account resource. Every download and metadata endpoint must enforce resource ownership server-side. UI hiding improves navigation, not authorization.',
   'Mistaking an interface filter, unguessable-looking URL or route guard for server permission checks.',
   'Would the test fail if an authenticated user could download an unauthorized controlled test file?'],
  ['After a suspicious page may have collected a password, the account still appears normal. Develop an incident containment workflow that avoids both panic and unjustified reassurance.',
   'Use an independently verified provider route to update credentials, revoke sessions where available, inspect multi-factor and recovery methods and review suspicious activity. Address any password reuse, preserve minimal relevant evidence and seek official help if needed. Lack of observed misuse cannot establish that exposure did not occur.',
   'Assuming the account is safe because an attacker has not yet visibly changed anything.',
   'Are all containment steps possible without reusing the suspicious page or transmitting private credentials to outsiders?']
 ],
 career:[
  ['A graduate portfolio announces a system is fully secure and lightning fast, but includes only a screenshot and no deployed working demonstration. Replace the claim with reproducible evidence.',
   'Describe a feature genuinely implemented and a specific local or deployment test that another developer can repeat. State unresolved performance or security questions without inventing measurements. Good engineering case studies demonstrate responsibilities, trade-offs, test results and limits—not ungrounded adjectives.',
   'Treating visually polished design as proof of security or operational reliability.',
   'Could a reviewer verify exactly the claim being made rather than merely appreciate its appearance?'],
  ['A project uses Laravel, React and a relational database. The portfolio lists those names but does not explain why they were chosen. Draft a compact architecture decision record.',
   'Begin with the user requirement and privacy boundary. Compare the chosen server authorization and client rendering design with a plausible alternative, noting complexity and performance trade-offs. Include a repeatable test confirming a permitted data request and denying a different test account access.',
   'Assuming a technology inventory proves architectural judgment or validates the security boundary.',
   'Can an unfamiliar reviewer trace one requirement through a design choice, rejected alternative and observable test?'],
  ['In an interview a candidate says their application is production-ready, then cannot explain an intermittent authentication failure on deployment. Prepare a defensible technical response.',
   'Acknowledge the observed limitation. Compare environment configuration, session handling and error logs with local behavior, then propose a safe reproducible failure case and validation after repair. A measured incident analysis is stronger evidence than pretending no bug exists. Never claim a security audit or availability figure without a corresponding test.',
   'Hiding a known operational defect to preserve a flattering narrative about completed work.',
   'Does the explanation say what is verified, what is unknown and which next observation would confirm a fix?']
 ],
 science:[
  ['Plants in a sunny room grow taller than plants in a shaded hallway, but sunlight, watering, pot size and starting height all differ. Write a hypothesis that a controlled test could disprove.',
   'Define the response variable, baseline measurements, exposure interval and a prediction involving light. Use similar plants, soil, watering, pots and a consistent measurement procedure, and randomize or repeat where feasible. An uncontrolled difference cannot independently isolate the effect of sunlight.',
   'Calling an observed association a proven single-variable cause while other conditions vary.',
   'Could the proposed setup produce evidence against the hypothesis, rather than treating every result as confirmation?'],
  ['A classroom sensor reads 20.1, 20.2 and 20.1 °C. A reference instrument reads 21.0 °C but its uncertainty is unknown. Explain what the repeated readings can and cannot demonstrate.',
   'The sensor mean is about 20.13 °C and differs from the reference by roughly 0.87 °C. The close readings support repeatability over the small sample, not established accuracy. Investigate calibration, stabilization, probe placement and both instruments uncertainties before inferring a true correction or reporting extra digits.',
   'Conflating a stable display with physical accuracy and inventing a certified calibration offset.',
   'Does the analysis distinguish repeatability, reference agreement, instrument limits and unexplained systematic error?'],
  ['A survey finds that people using a wellness product report higher energy. The researchers did not control sleep, diet, income or recruitment method. Write a claim compatible with these limits.',
   'The reported association is observational and may be affected by self-selection, lifestyle, expectation or reporting differences. Do not infer clinical effectiveness or make a product recommendation from this finding. State what comparison, measurement procedure and independent replication would be needed to estimate a possible causal effect.',
   'Presenting a self-selected survey correlation as a demonstrated medical treatment benefit.',
   'Are alternative explanations and uncertainties visible, and does the conclusion match the study design?']
 ],
 relationships:[
  ['A friend cancels plans after an unexpected shift at work. You feel disappointed, but the friend explains the reason and offers a new time. Draft a repair-focused response.',
   'Acknowledge your feeling and the practical inconvenience without assigning malicious intent: I was looking forward to seeing you, and the cancellation was disappointing. Can we confirm another date? The work shift and the disappointment can both be real. Avoid diagnosing motives from one difficult interaction.',
   'Treating a cancellation and hurt feelings as proof of a permanent manipulative character trait.',
   'Does the proposed response preserve mutual choice and request a specific change rather than demand guilt?'],
  ['A partner asks for uninterrupted study hours. The other repeatedly implies this limit means they are not loved. Explain the difference between an actionable boundary and an attempt to control another person.',
   'A boundary names the speaker own availability and a respectful action: I will study until seven and can talk afterward. It does not require the other person to agree with the decision or prove affection through unwanted access. Both needs may be acknowledged, while consent and the ability to decline remain essential.',
   'Calling a coercive demand or an affection-based ultimatum a reasonable compromise.',
   'Can each person refuse an option without being threatened, punished or pressured to surrender autonomy?'],
  ['After a disagreement, one partner repeatedly threatens to publish private messages to obtain compliance. Create an evidence-based safety response while avoiding clinical labels.',
   'Describe the actual threats and dates, assess whether collecting evidence is safe, and identify trusted support or local qualified services. The pattern changes priority from ordinary repair to safety and autonomy. Do not insist on private confrontation, involuntary disclosure or a psychiatric diagnosis of the threatening person.',
   'Minimizing explicit threats as ordinary disagreement or forcing a risky reconciliation process.',
   'Does the plan preserve the targeted person choices and reduce exposure to retaliation?']
 ],
 negotiation:[
  ['One party offers ₱10,000 for a project while the freelancer asks for ₱15,000. Neither mentions scope, deadlines or revisions. Identify useful interests to clarify before countering the price.',
   'Consider whether the buyer needs budget certainty, a specific launch date or a minimum set of features. Consider the freelancer labor, risk and change-control needs. Ask which deliverables are essential and what is negotiable before suggesting a phased scope. Interests are hypotheses until confirmed by the parties.',
   'Assuming the opening number fully explains each party priorities and constraints.',
   'Does the conversation test what each side actually values before proposing nonprice concessions?'],
  ['Proposal A pays ₱24,000 for 30 hours with two revisions. Proposal B pays ₱27,000 for 35 hours with unspecified further revisions. Compare the initial hourly value and a five-hour added-revision scenario.',
   'A offers ₱800 per planned hour; B offers about ₱771.43 at 35 hours, falling to ₱675 if five extra hours are required. Both ignore tax and overhead. Check the exact number of revisions, acceptance tests and ownership terms before accepting either offer. The larger invoice is not necessarily the better compensation package.',
   'Evaluating an offer by headline pay while treating indefinite revisions as free.',
   'Can another reader reproduce the calculation and identify which contract term drives the sensitivity?'],
  ['A client asks for a new API integration two days before the delivery date. It was not in the signed scope and no test or extra payment has been negotiated. Prepare a clear change order.',
   'Document the original deliverables, new integration scope, security testing, acceptance procedure and impact on timeline and compensation. Request explicit written agreement or a phased delivery. Check applicable contract obligations rather than alleging a universal legal entitlement to reject every change. State a professional exit option if no workable package exists.',
   'Promising an expanded project under the old time and payment commitments without reconsidering capacity.',
   'Could a neutral reader determine exactly what changed, who approves it and how completion will be verified?']
 ],
 shadow:[
  ['A seller starts a countdown and demands an additional payment through a private account. The original listing and invoice never disclosed the fee. Describe an appropriate protective response without claiming to know intent.',
   'Record the countdown, new payment route and original documented terms. Pause the transfer and verify through the genuine marketplace or payment provider separately. A concrete financial risk justifies disengagement without relying on body-language claims or diagnosing the sender. Keep relevant records when safe.',
   'Treating perceived nervousness or urgency as certain proof of deception, rather than checking terms.',
   'Does the plan use an independent verification route and avoid sending more money to an unverified account?'],
  ['A disagreement between friends becomes a pattern of threats to reveal personal information whenever one says no. Explain how that changes the response priorities.',
   'Distinguish a normal disagreement from repeated coercive leverage. Support the targeted person capacity to choose, ask what assistance is safe, and involve trusted or qualified help as appropriate. Avoid pressuring the person to confront the threatener alone or collect evidence when doing so could increase danger.',
   'Treating repeated threats as merely a communication style to be negotiated privately.',
   'Are actions proportional to the documented risks and centered on safety, consent and autonomy?'],
  ['A company changes delivery dates twice, then demands an undisclosed release fee outside its official platform. Build a claims ledger and a safe escalation strategy.',
   'Document the original order, payment receipts, dated changes and seller assertions separately. Clarify any legitimate delivery charges through known support channels, and refuse unverified off-platform transfers until terms are established. You need not prove criminal intent to protect funds or use available consumer dispute procedures.',
   'Equating inconsistencies with certain criminal motives, or paying the extra fee merely to test legitimacy.',
   'Does each action rest on a dated record, a trusted source and an explicit stop condition?']
 ]
};
