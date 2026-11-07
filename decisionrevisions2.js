/** Counterfactual decision revisions — seven more subjects.
 * Fictional facts. A decision changes when new evidence appears; no
 * automatic qualifications or unstated legal/safety conclusions.
 */
export const DECISION_REVISIONS_TWO={
 thinking:{
  title:'The apparent success rate reverses under a new denominator',
  case:'A dashboard claims 95% of help requests are solved because 950 of 1,000 chatbot exits did not ask for an agent. The author excludes sessions that timed out and treats silence as satisfaction. Senior leadership plans to remove human support from the product.',
  firstTask:'Identify the metric definition, numerator, denominator and the untested assumption that leaving a chat means the problem was solved. Explain what information a real resolution claim would require.',
  reveal:'A previously omitted log contains 600 additional sessions: 400 ended in timeout and 200 required human escalation. A subsequent voluntary follow-up to 100 of the 950 no-agent sessions finds only 40 people reporting a solved problem; the sample has unknown nonresponse bias.',
  revision:'The original routing proportion among all 1,600 sessions is 950/1600≈59.4%, not 95%, and even that percentage is not verified resolution. The 40/100 follow-up is a sample-specific response, not necessarily a population-wide rate. Keep human escalation and audit outcome definitions before any staffing claim.',
  follow:'Write an executive correction that states the precise routing result, the survey limitations and a plan for representative outcome validation with a documented appeal process.',
  rubric:['Uses all 1,600 eligible attempts as the complete routing denominator.','Does not equate no-agent exits or survey responses with verified resolution.','Identifies selection and nonresponse limitations explicitly.','Revises the staffing recommendation without manufacturing a success rate.'],
  caveat:'Fictional support metrics, not an evaluation of any real chatbot.'
 },
 digital:{
  title:'A green frontend test conceals a file-access failure',
  case:'A React vault hides private file cards from users who are not logged in. The team tests the navigation and concludes that all files are protected. No direct backend request or cloud storage permissions have been checked.',
  firstTask:'Map the authentication and authorization boundaries from browser to API to object storage. Design a defensive test using two fictional accounts and different file identifiers without accessing anyone else’s real data.',
  reveal:'A synthetic backend test shows that user A, while properly logged in, can request an object identifier belonging to user B and receive the file bytes. The server checks that the requester is authenticated but does not verify resource ownership.',
  revision:'The access-control claim must be withdrawn. Fix or deny access at the server resource boundary, then validate storage policy and signed-link behavior as appropriate. A valid session proves identity, not authorization for arbitrary resources. Avoid disclosing the weakness publicly before responsible remediation.',
  follow:'Write four negative tests covering cross-user IDs, expired sessions, missing files and stale links, specifying expected denial and private-data protection rather than merely an HTTP status.',
  rubric:['Identifies resource ownership as separate from authentication.','Updates security claims after a controlled synthetic negative test.','Proposes server and storage checks without sharing real confidential files.','Documents residual risks and bounded verification, not total certification.'],
  caveat:'Fictional defensive security case; actual risk depends on a qualified code and deployment review.'
 },
 career:{
  title:'A portfolio benchmark must be revised after device testing',
  case:'A developer reports that their React dashboard loads “ten times faster” after a refactor. The only measurement is a single warm-cache run on the developer’s laptop. The claim is added to the public portfolio without a measurement method.',
  firstTask:'Define the exact metric (such as largest contentful paint or time to usable interaction), the benchmark device, the cold-versus-warm cache conditions and the sample size required for a defensible comparison.',
  reveal:'A teammate repeats the comparison using a low-end mobile device over a throttled connection. The refactor helps the desktop warm-cache scenario but initially delays the mobile route because a larger client bundle must be downloaded before interaction.',
  revision:'Replace the unconditional “ten times faster” statement with a device- and condition-specific observation. Preserve the mobile finding, inspect bundle behavior, and test a targeted correction. Do not discard inconvenient results or claim broad accessibility from performance alone.',
  follow:'Write a short public-facing case study with baseline, change, observed results by environment, limitations and the next repeatable benchmark criterion.',
  rubric:['Preserves the actual measured conditions for every performance claim.','Updates the portfolio after adverse mobile evidence appears.','Distinguishes functional, performance and accessibility verification.','Does not cherry-pick one favorable sample or invent universal results.'],
  caveat:'Fictional benchmark study; no real performance metrics are claimed.'
 },
 science:{
  title:'An apparent environmental spike is a humidity artifact',
  case:'A classroom low-cost particulate sensor shows high values during rainy afternoons. Students propose that rain always causes harmful airborne particles to increase, but no comparison with a reference monitor was carried out and traffic was not recorded.',
  firstTask:'State the measured observation and list instrument, humidity, weather and traffic factors that could confound the claim. Design a controlled measurement plan with location and date metadata.',
  reveal:'A colocated reference-grade monitor does not show the same particulate increase on the sampled afternoons. The low-cost instrument responds strongly to high relative humidity under those conditions; its calibration documentation had not been checked.',
  revision:'Do not attribute the earlier spikes to real pollution increases. Report the discrepancy, its plausible measurement explanation and the limits of the small sample. Repeat with calibration and multiple locations before considering health or policy conclusions.',
  follow:'Write a revised scientific abstract containing measured values, comparison protocol, uncertainty, competing explanation and an explicit note that a citywide causal claim is unsupported.',
  rubric:['Distinguishes instrument readings from environmental concentrations.','Uses the reference discrepancy to revise—not conceal—the earlier interpretation.','Requires calibration, meteorological metadata and adequate sampling.','Rejects citywide causal or health conclusions unsupported by the observations.'],
  caveat:'Fictional environmental sampling; not a public-health exposure assessment.'
 },
 relationships:{
  title:'A boundary dispute changes with new safety information',
  case:'Two friends disagree about lending a personal laptop. The owner politely declines because the device contains private files and offers to export shared photos instead. A mutual acquaintance says refusing to lend the device proves the owner has no trust.',
  firstTask:'Differentiate a privacy boundary from rejection or mistrust. Identify a voluntary alternative that serves the requester without surrendering unrestricted access and without assuming malicious motives.',
  reveal:'The requester starts threatening to post private screenshots unless the owner provides the laptop password. The exchange is now documented, and the owner fears that refusing directly could escalate retaliation.',
  revision:'The response should change from ordinary negotiation to safety-focused planning: protect accounts through legitimate channels, preserve available evidence privately if safe, and seek trusted qualified support. Do not require direct confrontation, covert testing, revenge or surrendering credentials.',
  follow:'Write two paths: a respectful boundary script only for a low-risk disagreement, and a safety-first support plan for the new credible threat. List which sensitive details should never be made public.',
  rubric:['Distinguishes a normal privacy boundary from a credible coercive threat.','Shifts to a safer response when evidence of retaliation appears.','Protects credentials and private records without risky traps or humiliation.','Preserves the person’s control over contact and support decisions.'],
  caveat:'Fictional scenario. When immediate danger exists, use suitable local emergency or professional support.'
 },
 negotiation:{
  title:'A competing supplier quote is not yet a usable alternative',
  case:'A café buys 100 kilograms of beans each month for ₱480 per kilogram. Its supplier requests ₱540 next month, and a competitor quotes ₱515. The café announces it can switch instantly and uses that statement to demand a discount.',
  firstTask:'Calculate the current invoice, proposed invoice and nominal competitor invoice at 100 kilograms. Identify evidence needed before calling the competitor an available best alternative, including delivery, quality and contract terms.',
  reveal:'The competitor needs a three-week onboarding and cannot supply the café’s required first-week volume. The café has just seven days of usable stock, and the existing contract may limit mid-term switching. The nominal price difference is real but operational availability is not.',
  revision:'Withdraw the immediate-switch threat. The old price is ₱48,000, requested price is ₱54,000, and nominal competing price is ₱51,500 before switching costs. Negotiate factual transition options, verified terms or a short trial; protect uninterrupted supply rather than bluffing a nonexistent alternative.',
  follow:'Draft a measured counteroffer with quantity, phased price or delivery alternatives, acceptance criteria and a fallback that does not knowingly breach a verified obligation.',
  rubric:['Calculates all monthly invoices using the same quantity.','Distinguishes a conditional quote from an operationally available alternative.','Revises leverage claims when timing and contract evidence changes.','Protects service continuity without fabricated threats or unsupported legal conclusions.'],
  caveat:'Fictional procurement case, not tax, legal or contracting advice.'
 },
 shadow:{
  title:'An urgent public warning lacks an actual authority',
  case:'A group message says a new rule takes effect tomorrow and demands everyone forward the screenshot immediately. It implies that people who request evidence are disloyal. The image displays a generic government-looking seal but no act number, publication date or source link.',
  firstTask:'Record the exact claim separately from the emotional pressure cues. Write a source-first verification plan without forwarding the screenshot or contacting an unverified number embedded in the message.',
  reveal:'A trusted government directory links to a notice confirming that the alleged rule has not been adopted as law. The shared image originated from an undated draft consultation document and omitted the word “proposal.”',
  revision:'Correct the false assertion of an effective rule and give the official source and date. Avoid blaming recipients who believed the message or amplifying private sender information. Explain how a proposed policy differs from an enacted, effective requirement.',
  follow:'Create a respectful correction message, a simple verification checklist and a separate emergency branch for genuinely urgent threats confirmed through reliable channels.',
  rubric:['Identifies coercive urgency without treating it as evidence of law.','Uses the dated official source to change the initial conclusion.','Separates proposal, adoption and effective status precisely.','Avoids retaliation, mass forwarding or unsupported authority claims.'],
  caveat:'Invented policy message; real laws and effective dates must be verified from current official sources.'
 }
};
