/** Xyra Atlas advanced evidence inquiries: group B.
 * Original fictional scenarios. Not specialist or professional advice.
 * All authoring remains pending independent editorial review.
 */
export const EVIDENCE_INQUIRIES_B = {
 thinking: {
  title:'A performance dashboard: investigate a misleading denominator',
  scenario:'A fictional help desk claims its new chatbot solves 90% of customer inquiries. The report only counts 900 conversations that ended without an agent. It excludes 300 conversations that timed out and 200 escalations. Another analyst treats every unanswered message as a customer success because nobody complained further.',
  exhibits:[
   ['Success label','The dashboard marks “no agent joined” as solved; it does not record whether the user received a correct or useful answer.'],
   ['Population count','There were 1,400 initiated conversations: 900 without agents, 300 timeouts and 200 escalations. Outcome verification was performed for none.'],
   ['Selection and incentives','A team bonus is tied to low escalation volume, while the dashboard excludes the events most likely to represent unmet needs.']
  ],
  reasoning:'A numerator is meaningful only when its outcome definition matches the claim. The 900 conversations without agents represent 900/1400, about 64.3% of all initiated sessions, not a verified 90% resolution rate. Even 64.3% would only describe the channel routing outcome, not success. A credible metric requires a traceable definition of resolved, a denominator including eligible attempts, consistent treatment of timeouts and independent customer confirmation. Incentives create an additional reason to audit how events are labeled. A correct analysis identifies where missing records could bias the estimate and proposes an audit before promising business value.',
  countercase:'Counting all escalated conversations as failures could also distort a legitimate service whose correct behavior is handing complex cases to trained staff. Resolution, safe escalation and abandonment are different outcomes.',
  challenge:'Reconstruct the complete count and compute the no-agent proportion. Propose two independently verifiable success measures, describe how timeouts should be represented, and design a small manual review sample. Write a three-line executive summary that avoids a fabricated resolution rate.',
  model:'The routing proportion is 900/1,400≈64.3%, but the true resolution rate is unknown because success was not measured. A defensible report names 300 timeouts and 200 escalations separately, checks a representative sample for answer correctness and customer understanding, and reports uncertainty. It avoids treating silence as satisfaction or legitimate escalation as automatically bad.',
  rubric:['Calculates the correct complete denominator and labels the result as routing, not confirmed resolution.','Distinguishes silent exits, safe escalations, timeouts and actually solved issues.','Proposes a transparent independent validation sample and handles missing outcomes explicitly.','Recognizes metric incentives and reports uncertainty without manufacturing a success percentage.'],
  limits:'Invented counts and incentives, not an evaluation of a real service.'
 },
 digital: {
  title:'Document access review: trace enforcement across the stack',
  scenario:'A fictional React file manager displays a private-documents tab only after login. During a demo, a developer removes the button from a guest screen and concludes the documents are secure. A tester finds that changing a file identifier in a download request may access a second account’s record. The project also uses cloud object storage and keeps expired login sessions in browser state.',
  exhibits:[
   ['Frontend visibility','React hides the navigation item for guests, but the client still knows or can guess the protected endpoint.'],
   ['Server boundary','The backend receives an authenticated user ID and a requested file ID. The current test report does not prove file ownership is verified for each request.'],
   ['Storage and session path','Direct object URLs, signed download links, cache behavior and revoked sessions are all independent places where authorization can fail.']
  ],
  reasoning:'Visibility is presentation, not authorization. A legitimate request should traverse authentication, resource-ownership check, and only then a controlled access path to storage. State the security invariant: user A cannot retrieve user B’s file by substituting a file identifier, even while holding a valid A session. Tests should cover guessed IDs, expired sessions, disabled accounts and stale signed links, without assuming every object URL can be revoked after issuance. Cloud storage policies must align with server-side authorization. Do not announce security certification from a green functional test; document the exact attack surfaces, implemented controls and limits of the assessment.',
  countercase:'Encrypting a file at rest does not excuse a server that hands the decryption key or plaintext to an unauthorized account. Hiding ID values in the interface may reduce accidental exposure but cannot replace ownership enforcement.',
  challenge:'Draw the request route from React to server authorization to object storage, labeling at least four trust boundaries. Specify four negative tests with setup, request, expected status and expected data protection result. Add a check for session expiration and explain what should be logged without exposing sensitive document content.',
  model:'A reviewable model routes file requests through the server, validates the session, verifies user-to-file ownership and restricts any storage token to the authorized object and purpose. Negative tests assert that A’s valid session cannot download B’s file and that expired sessions cannot retrieve either. Logs record denied access metadata without dumping private contents. The design documents token lifetime and recovery limitations.',
  rubric:['Treats server-side ownership as an invariant independent of frontend visibility.','Includes cross-user, expired-session and invalid-resource negative tests with verifiable outcomes.','Separates the server and object-storage trust boundaries and evaluates temporary link behavior.','States the exact verification scope and avoids any unsupported zero-risk or certification claim.'],
  limits:'Fictional architecture for defensive learning. Provider policies and actual code require a separate security review.'
 },
 career: {
  title:'Engineering postmortem: make the failure part of a trustworthy portfolio',
  scenario:'A developer built a PWA for field technicians. It worked in desktop tests, but an offline update on a mobile device left users with an old cache and a new JavaScript bundle. Management asked the developer to remove the incident from their portfolio because it looks bad. The developer has screenshots, issue history and the fix, but no production incident telemetry.',
  exhibits:[
   ['Reproducible behavior','The mismatch appeared on one tested mobile install after a service-worker update; a clean desktop load did not reproduce it.'],
   ['Technical change','The patch introduced a consistent asset-version manifest and delayed activation until the expected bundle was ready.'],
   ['Evidence boundary','A local regression test and a successful retest exist; the team has no reliable count of affected users or long-term real-device coverage.']
  ],
  reasoning:'A serious portfolio can describe a failure without claiming that every possible failure was eliminated. Begin with the intended field workflow and its offline constraint. Show a timeline of the mismatch, the user-visible impact observed, the initial hypothesis, the test that discriminated between cache state and API problems, and the patch. Separate verified outcomes from aspirations: “passed a controlled mobile update test” is different from “100% of users updated safely.” Explain your exact code ownership and collaborators, then include the future acceptance test that would catch a similar regression. A strong artifact makes the reasoning inspectable and acknowledges uncertainty.',
  countercase:'Removing all incident details may produce an attractive but untrustworthy case study. Publicly posting real user logs or private incident identifiers to demonstrate evidence can create a new confidentiality failure.',
  challenge:'Write a six-section portfolio incident case study with objective, observed failure, timeline, competing hypotheses, fix, and regression evidence. Draft an ethical one-sentence outcome claim; state which numbers are unavailable and identify one remaining device-testing gap.',
  model:'A defensible narrative says: “I investigated an offline asset-version mismatch, reproduced it in a controlled mobile environment, changed the update activation logic and added a repeatable regression case. Actual production impact and all-device reliability were not measured.” It identifies the responsible components, preserved privacy and describes next acceptance steps.',
  rubric:['Documents a reproducible failure and a traceable technical change rather than hiding the incident.','Distinguishes controlled tests, production telemetry and unobserved long-term outcomes.','Credits team contributions and avoids publishing private user records or logs.','Includes a meaningful remaining limitation and a future acceptance criterion.'],
  limits:'Fictional incident; details do not describe a confirmed real deployment or user-impact assessment.'
 },
 science: {
  title:'Environmental sensor study: calibrate before claiming a citywide trend',
  scenario:'A school measures particulate concentration with one low-cost sensor placed beside a busy road for six afternoons. The readings increase on rainy days. A class report concludes that rain causes greater air pollution everywhere in the city and proposes penalties against nearby residents. The device has not been calibrated against a reference monitor.',
  exhibits:[
   ['Measurement location','One sensor sits near vehicle traffic, where local exhaust and vehicle movement may differ from other city blocks.'],
   ['Environmental conditions','The six observations combine different traffic volumes, humidity, rain and wind conditions. There are no simultaneous reference measurements.'],
   ['Instrument limits','Sensor accuracy, humidity sensitivity, placement, and maintenance history are unknown; apparent changes could reflect environmental or measurement effects.']
  ],
  reasoning:'Start from what was observed: one instrument produced different values on several afternoons. Calibration, repeatability and representativeness must be evaluated before interpreting the result as a citywide causal trend. A good design pairs the device with a qualified reference instrument, records humidity and meteorology, samples multiple positions and times, and predefines the outcome of interest. Weather and traffic can confound observed associations. Even if a meaningful local signal appears, predicting exposure or prescribing penalties requires additional evidence and applicable public-health or regulatory review. Data literacy means knowing where the observations stop and where interpretation starts.',
  countercase:'A sensor with perfect software code can still be biased by its physical environment. Expanding to many uncalibrated sensors can reproduce a systematic error at larger scale rather than eliminate it.',
  challenge:'Design a seven-day repeat study with a control location and reference comparison. Specify the observed variable, at least four metadata fields, a calibration check and an explanation for missing data. Write a two-sentence result summary that does not claim citywide causation.',
  model:'A measured statement is: “At one roadside location, a low-cost instrument recorded higher readings on some wet afternoons; no reference calibration or adequate control observations were available. The measurements cannot establish rainfall as the cause or represent the whole city.” A stronger plan includes matched locations, meteorological data and reference-instrument comparisons.',
  rubric:['Distinguishes local instrument readings from population exposure and citywide conclusions.','Identifies calibration, humidity and sampling limitations before causal interpretation.','Proposes measurements that can separate weather, traffic and instrument artifacts.','Rejects unsupported enforcement claims and documents uncertainty and missing observations.'],
  limits:'Fictional study. Environmental and health recommendations require validated instruments and appropriate specialist review.'
 },
 relationships: {
  title:'Shared accounts after a breakup: consent, privacy and agency',
  scenario:'Two fictional adults once shared a household streaming and cloud-photo account. After separating, one partner can still log in with an old password and wants to inspect recent private photos to prove a suspected lie. The other wants copies of shared trip photographs but does not agree to exposing personal conversations. A mutual friend suggests changing passwords secretly as revenge.',
  exhibits:[
   ['Past permission','The account was shared for a defined household purpose; no record establishes continuing permission to inspect unrelated private content.'],
   ['Legitimate interests','Both people may have an interest in retrieving shared trip memories, but their ownership rights and provider terms need verification.'],
   ['Risk escalation','Secret access, public exposure, retaliation and uncoordinated deletion can create privacy, trust and safety consequences.']
  ],
  reasoning:'Distinguish an earlier shared-use arrangement from present consent. Having technical access to an account does not automatically provide ethical or lawful authority to inspect everything inside it. A safer plan is to stop accessing private areas, secure personal accounts using verified recovery paths, and request only clearly identified shared files through an agreed transfer process. Avoid making access to photographs conditional on relationship demands. If direct contact is unsafe or contested, use a trusted appropriate intermediary or specialist support, respecting applicable laws and provider policies. The goal is a bounded and documented handover, not extracting an admission.',
  countercase:'A blanket recommendation to delete the entire account immediately could destroy legitimate shared records and create disputes. Secretly downloading all content “just in case” does not resolve consent or privacy questions.',
  challenge:'Create a permissions table separating personal, shared and disputed materials. Draft an opt-in request for specific shared photos, a safe account-security checklist and a non-retaliation rule. Include a separate next step for a situation involving threats or coercive pressure.',
  model:'The plan stops unauthorized browsing, changes personal credentials through legitimate channels, offers a list of specific shared trip files for consensual exchange, and avoids taking private messages or unrelated documents. Any dispute about ownership or abuse is referred to appropriate qualified support rather than decided by technical access alone.',
  rubric:['Treats old credentials as a technical state, not unrestricted ongoing consent.','Differentiates personal, jointly created and disputed content without unsupported legal conclusions.','Offers a proportionate and documented retrieval or transfer route without coercion.','Prioritizes safety and privacy if threats or retaliation are present.'],
  limits:'Fictional adult relationship and privacy scenario; legal ownership and provider terms require individual verification.'
 },
 negotiation: {
  title:'Supplier renegotiation: protect a genuine alternative without bluffing',
  scenario:'A small café has a six-month bean supply agreement for 100 kilograms monthly at ₱480 per kilogram. The supplier requests ₱540 next month due to claimed logistics changes. A competitor quotes ₱515 but requires a 60-kilogram minimum and an untested two-week onboarding period. The café needs 90 kilograms to meet its current menu and has only seven days of backup stock.',
  exhibits:[
   ['Existing commitment','The current hypothetical monthly price is ₱48,000 for 100 kilograms. The proposed price would be ₱54,000; contractual adjustment rights are unverified.'],
   ['Alternative offer','At ₱515 per kilogram, 100 kilograms would cost ₱51,500 before testing, delivery, switching and possible quality losses.'],
   ['Operational constraint','The café uses about 90 kilograms per month and has limited buffer; a poorly managed switch could disrupt service.']
  ],
  reasoning:'Compute the increase before choosing a response: ₱60 per kilogram × 100 = ₱6,000 per month. The nominal competitor saving against the proposed new price is ₱2,500 for 100 kilograms, but only if volume, quality and switching terms hold. The competitor is not yet a fully available best alternative; onboarding and product testing may take longer than the safety stock allows. Verify the actual contract terms, logistics evidence and service performance, then propose an ethical negotiation around phased price changes, purchase volume, delivery reliability or a short trial. Do not invent another offer or threaten to switch tomorrow if the alternative is not operationally ready.',
  countercase:'Fixating only on price can increase total cost if quality failures or delays cause lost sales. Treating a conditional quotation as a guaranteed supplier is an unsupported BATNA, and withholding an existing contractual obligation is not a neutral bargaining tactic.',
  challenge:'Compute the old, proposed and competing monthly invoice totals at 100 kilograms. Create a decision grid with price, transition, quality, delivery and contractual uncertainty. Draft a fact-based counterproposal and a fallback plan that preserves café operations during the two-week onboarding period.',
  model:'The old invoice is ₱48,000; the requested new invoice is ₱54,000; the competitor quote for the same amount is ₱51,500 before hidden costs. The proposed increase is ₱6,000, and the nominal alternative saves ₱2,500 versus the new quote. A credible reply asks to review the contract and cost basis, proposes staged changes or a trial with acceptance criteria, and uses a verified backup stock plan.',
  rubric:['Computes all three invoices and the nominal differences with consistent quantities.','Treats an alternative as conditional until onboarding, quality and delivery are verified.','Explores scope and continuity tradeoffs rather than relying on a threatening price anchor.','Respects actual contractual terms and avoids inventing leverage or guaranteeing supply.'],
  limits:'Illustrative café data; actual contracting, food safety and financial decisions need appropriate verification.'
 },
 shadow: {
  title:'Subscription dark-pattern audit: design safety without teaching exploitation',
  scenario:'A fictional mobile app offers a seven-day trial. The enrollment button is large, the total recurring price appears in faint text, and cancellation requires four additional screens with confusing wording. An internal team proposes making the decline button even harder to see because trials convert better when people forget to cancel.',
  exhibits:[
   ['Choice architecture','Enrollment and refusal do not have comparable visibility or clarity; recurring charges are easy to miss.'],
   ['Workflow asymmetry','The path to cancel has several more steps than the initial choice; users cannot easily confirm whether cancellation succeeded.'],
   ['Business metric','The team tracks revenue per trial but does not separately track confused users, disputes, clear consent or successful cancellation.']
  ],
  reasoning:'Audit the full journey from offer to exit. The relevant questions are whether the user understands the recurring amount and billing date, can give an informed choice without deceptive visual hierarchy, and can end the agreement through a straightforward documented route. A defensible redesign puts important costs and renewal information in readable proximity to the action, separates genuine opt-in from preselected settings, and displays cancellation status with a clear confirmation. Measure informed conversion, billing disputes and successful cancellation rather than treating accidental retention as customer value. This exercise teaches recognition and prevention of coercive interface design, not how to maximize exploitation.',
  countercase:'A simple but honest cancellation interface may reduce short-term apparent retention while improving customer trust. A clear subscription flow can still sell effectively; it should be judged by informed decisions rather than compelled or mistaken ones.',
  challenge:'Write a seven-step UX audit covering discovery, price disclosure, consent, enrollment, reminders, cancellation and confirmation. Redesign three pieces of microcopy for clarity. Propose two metrics that discourage accidental subscriptions and one test involving a screen reader or small mobile display.',
  model:'A responsible experience states the exact recurring price and renewal cadence before enrollment, uses an unambiguous opt-in action and gives an easy-to-find cancel path with confirmation. The team tests whether representative users can identify the price and finish cancellation without confusing prompts, then tracks disputes and user-reported understanding alongside voluntary conversions.',
  rubric:['Identifies misleading hierarchy and friction as design concerns without encouraging deployment of manipulative tactics.','Makes amount, timing and user consent understandable before the commitment.','Includes straightforward cancellation and a reliable user-visible confirmation.','Measures informed outcomes and accessibility rather than accidental retention alone.'],
  limits:'Mature educational content about recognizing manipulation; jurisdiction-specific subscription laws need current review.'
 }
};
