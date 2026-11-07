/** Applied beginner workshops — subjects 8–14. Fictional case materials.
 * No clinical, legal, security or accessibility certification implied.
 */
export const BEGINNER_WORKSHOPS_TWO={
 thinking:{
  lessonId:'evidence',title:'Evidence workbench: repair a misleading headline',
  goal:'Turn a statistical claim into a reproducible question by checking who was observed and what was actually measured.',
  case:'An online post says “90% of students learn faster with this app.” The source was an opt-in survey of 20 existing subscribers; eighteen checked a box marked “I feel faster.” There was no comparison group, timing measurement, or record of the 200 students who did not respond.',
  steps:[
   {name:'Identify the measured quantity and missing denominator',
    instruction:'Compute the proportion of positive responses among the twenty survey participants. State the difference between subjective impressions and independently measured learning speed. List the information needed to evaluate whether subscribers, respondents or all students are represented.',
    model:'Eighteen of twenty respondents selected the positive option, giving 18/20 = 90% of this self-selected responding group. This is not evidence that 90% of students learn faster; the question measured a feeling, and the selection mechanism may exclude different experiences.',
    diagnostic:'What happens to the apparent claim if students who abandoned the app were much less likely to answer the survey?'},
   {name:'Design a better claim test',
    instruction:'Write a small study plan defining a concrete learning outcome, baseline, comparable practice time and evaluation window. Include a way to recruit users who did not renew, predefine what counts as improvement and explicitly report uncertainty in the result.',
    model:'A useful test might compare performance on equivalent delayed-recall tasks after defined study periods, controlling for prior skill and exposure. Report the actual sample and uncertainty rather than a universal benefit. Participation should be voluntary and should not expose private study records.',
    diagnostic:'If study speed improves but the one-week retention score drops, which conclusion would the evidence support and which would it not?'}
  ],
  rubric:['Distinguishes a self-report percentage from measured causal performance.','Names selection bias, sample size and omitted comparisons.','Designs a measurable outcome and reports negative evidence.','Avoids inferring a population-wide effect from a tiny opt-in survey.'],
  limits:'An invented research scenario, not an assessment of any real learning platform.'
 },
 digital:{
  lessonId:'passwords',title:'Account recovery lab: verify each trust boundary',
  goal:'Practice protective steps after a suspected account compromise without exposing credentials, backups or other people’s data.',
  case:'A fictional vault user receives an email claiming their password expired and asking for a one-time code. The page resembles a known service, but the URL differs from the bookmarked domain. The user has already clicked the link but has not entered a password or code.',
  steps:[
   {name:'Contain risk before making an accusation',
    instruction:'Separate what is confirmed (a suspicious destination was visited) from unconfirmed claims (account takeover or data theft). Build a safe verification sequence using the service reached independently from a trusted bookmark. Include a way to inspect sessions and recovery contacts when the official service supports those controls.',
    model:'Do not use the email link, embedded phone number or countdown. Open the authentic service independently, check account activity and security settings, and close the suspicious page. Clicking by itself does not prove credentials were stolen; report what occurred without inventing a breach.',
    diagnostic:'Why is an HTTPS padlock alone insufficient to verify that the domain actually belongs to the intended provider?'},
   {name:'Prepare a bounded incident-response checklist',
    instruction:'Create a decision table for (a) link opened only, (b) password entered and (c) one-time code supplied. Describe legitimate recovery and session-revocation steps for each, using only synthetic examples and never asking someone to share their code.',
    model:'Exposure severity differs by action. If credentials or an authentication code were submitted, use official recovery paths and review sessions or linked devices where supported; check for credential reuse and update affected accounts. Document verified outcomes, not a guarantee that no risk remains.',
    diagnostic:'How does protecting a server-side file endpoint differ from merely hiding its button in React?'}
  ],
  rubric:['Uses a trusted independent verification route rather than the suspicious link.','Distinguishes visited pages from confirmed credential disclosure.','Avoids collecting passwords, one-time codes and real user files.','Describes defensible tests and recovery without promising total security.'],
  limits:'Fictional defensive awareness exercise, not a forensic determination.'
 },
 career:{
  lessonId:'skills',title:'Skills portfolio: turn one project into credible evidence',
  goal:'Translate a broad skill claim into a technical case study another person can assess independently.',
  case:'A new developer describes a school project as “a perfect full-stack secure application.” They implemented a React dashboard, connected an API and fixed a few validation bugs. The team also used a hosted authentication service and several third-party UI components, but the portfolio does not distinguish individual contributions.',
  steps:[
   {name:'Build an attribution and verification matrix',
    instruction:'Prepare four rows: problem, personal implementation, external dependencies and test evidence. For each claim, supply a reproducible step, observed result and limitation. Avoid claiming ownership of collaborators’ work or describing “no bugs” when only limited tests exist.',
    model:'A credible entry could say the author implemented the dashboard’s API error states, tested invalid input handling in specified scenarios, and integrated a third-party authentication library under its license. Authentication design and end-to-end security require separate review.',
    diagnostic:'What could a reviewer reproduce to distinguish “I made the dashboard responsive” from a claim supported only by screenshots?'},
   {name:'Design a focused professional growth experiment',
    instruction:'Select one skill gap, such as server authorization testing, and define a four-week exercise with an objective, synthetic test fixtures, weekly evidence and a stop point. Document both the passing and failing cases in your portfolio notes.',
    model:'A reasonable month-long target is to implement resource-ownership checks using two synthetic accounts, add negative request tests, and publish a concise explanation of results and limitations. This demonstrates learning without claiming accreditation or production security certification.',
    diagnostic:'How would you rewrite a resume claim after discovering that your earlier test only verified the interface rather than the backend?'}
  ],
  rubric:['Credits personal work and collaborators separately.','Uses reproducible tests instead of unsupported superlatives.','Identifies an honest skill gap and measurable next exercise.','Distinguishes verified implementation from production or certification claims.'],
  limits:'General career preparation, not an employment or accreditation guarantee.'
 },
 science:{
  lessonId:'method',title:'Experiment bench: one variable at a time',
  goal:'Learn to define a hypothesis, control key conditions and report the limits of a small experiment.',
  case:'A class wants to test whether a special plant spray speeds growth. Four sprayed plants are placed by a sunny window, while four untreated plants sit in a shaded room. All plants receive similar water. After two weeks the sprayed group is taller, and students declare the spray effective.',
  steps:[
   {name:'Find the confounding variable',
    instruction:'Identify the treatment, outcome and major confounders. Explain why eight plants under different light conditions cannot isolate the spray effect. Propose a fair comparison with random assignment, similar growing conditions and a dated growth log.',
    model:'Both spray and light exposure changed, so the observed difference cannot uniquely be attributed to the spray. A stronger protocol assigns comparable plants to treatments under the same light, water and soil conditions and measures growth consistently, ideally with more replication.',
    diagnostic:'If every sprayed plant also received more sunlight, which competing explanation remains unresolved even if the height difference is large?'},
   {name:'Write a result that withstands an adverse finding',
    instruction:'Assume a better controlled repeat produces similar mean growth in both groups. Write a short report with the hypothesis, observations, sample limitations and a conclusion that does not assert the spray is universally ineffective from one small trial.',
    model:'The controlled trial did not find evidence of a growth advantage under the tested conditions. With a small sample, limited duration and measurement variability, that is not proof that an effect is impossible everywhere. A credible report states the protocol, results and uncertainty.',
    diagnostic:'What extra data would distinguish a genuinely small effect from a study too imprecise to detect it?'}
  ],
  rubric:['Separates treatment from lighting and other changing conditions.','Uses a clear measure, comparable groups and documented sample size.','Reports null or contradictory evidence without cherry-picking.','Explains why limited evidence does not establish a universal conclusion.'],
  limits:'Illustrative science activity, not horticultural safety or pesticide-use advice.'
 },
 relationships:{
  lessonId:'trust',title:'Trust agreements: boundaries without surveillance',
  goal:'Distinguish an explicit, voluntary agreement from a demand for private access, and respond differently to ordinary disagreement and threats.',
  case:'Two adults jointly maintain a trip photo album. One asks for permanent access to the other’s personal email to “prove nothing is hidden.” The album owner would rather share only the agreed trip photos, while the requester worries files might be forgotten after the trip.',
  steps:[
   {name:'Specify the legitimate shared goal',
    instruction:'Write two separate columns: the shared goal (access to trip photos) and the requested control (unrestricted email access). Identify an option that achieves the first without granting the second. Describe the boundary without diagnosing the other person or demanding agreement.',
    model:'The parties can use a shared folder restricted to selected photos, with clear permissions and an export deadline. The email account remains private. A refusal of unrestricted access is not by itself evidence of dishonesty or of a lack of trust.',
    diagnostic:'What is the difference between consenting to share some photos and consenting to reveal unrelated private messages?'},
   {name:'Create a reversible handover policy',
    instruction:'Define which files will be shared, who may download them, how consent can be reconsidered, how accidental uploads are handled and what records stay private. Include a separate safety path if somebody makes credible threats or uses coercion.',
    model:'A simple agreement names the shared content and time frame, preserves each person’s control over their own credentials and offers a safe deletion or correction request. If retaliation is threatened, prioritize safety and trusted support rather than forcing a risky confrontation.',
    diagnostic:'How would the appropriate response change if the request for email access became a threat to disclose private information?'}
  ],
  rubric:['Separates a shared objective from coercive requests for credentials.','Names specific voluntary permissions and a reversible exit path.','Treats safety threats differently from ordinary conflict.','Avoids diagnosing a person or claiming access is proof of loyalty.'],
  limits:'Educational relationship scenario; seek qualified support if safety is at risk.'
 },
 negotiation:{
  lessonId:'persuasion',title:'Ethical offer lab: negotiate constraints without pressure',
  goal:'Build a clear, mutually voluntary offer without fabricated scarcity, fake alternatives or hidden obligations.',
  case:'A freelancer offers a website migration at ₱18,000 with a two-week delivery and one revision round. The potential client asks for a five-day timeline, unlimited revisions and an ₱11,000 price, then says a competitor can do it today but provides no verified written scope.',
  steps:[
   {name:'Translate the requests into comparable constraints',
    instruction:'Create an offer table for price, timeline, deliverables, revision rounds, support hours and acceptance test. Separate customer interests (fast launch, controlled budget) from stated positions. Do not count an unverifiable competitor claim as proven supply capacity.',
    model:'The counteroffer changes three dimensions at once: price decreases while speed and revision obligations rise. A defensible response asks which launch features are essential and offers a smaller phase with explicit acceptance conditions instead of pretending unlimited work is possible.',
    diagnostic:'Why is a lower quoted price not meaningful until scope, quality, payment terms and delivery capacity are comparable?'},
   {name:'Write two acceptable packages and one respectful exit',
    instruction:'Draft one package that keeps the initial scope and realistic deadline, a second that trims deliverables to fit a lower budget, and a decline if neither meets actual capacity. State verified deadlines, revision limits and a fair change-request process.',
    model:'Offer the defined migration at ₱18,000 over two weeks, or a limited initial deployment for a mutually agreed lower scope after feasibility review. Include a fixed acceptance checklist and a change estimate for additions. If constraints cannot be met responsibly, declining avoids misleading commitments.',
    diagnostic:'What would distinguish an honest limited-time offer from a false countdown designed solely to force acceptance?'}
  ],
  rubric:['Makes price, schedule, scope and acceptance independently inspectable.','Offers a real feasible alternative rather than invented leverage.','Avoids false scarcity, unlimited promises and pressure tactics.','Preserves the ability of either party to decline.'],
  limits:'Fictional commercial negotiation; contract-specific advice may require qualified review.'
 },
 shadow:{
  lessonId:'sex-consent',title:'Consent and autonomy: recognize a boundary without bargaining',
  goal:'Practice adult consent and respectful safety responses with clear boundaries, no coercion and no assumption that affection overrides a refusal.',
  case:'Two adults are dating. One declines a request for intimacy and explains that they are not ready. The other says, “If you loved me, you would prove it,” and attempts to treat earlier affection as permanent consent. The scene contains no physical detail; the central issue is the pressure placed on a present boundary.',
  steps:[
   {name:'Distinguish a present choice from a past interaction',
    instruction:'Identify the explicit present refusal and the attempted emotional leverage. Explain why earlier agreement, relationship status, or affection cannot substitute for current freely given consent. Draft a respectful response that accepts the boundary and avoids asking the person to justify it.',
    model:'A present refusal should be respected without bargaining, guilt or retaliation. The safe response is to stop pressuring, acknowledge the decision and discuss the relationship only if both want to. Past agreement does not make current participation compulsory.',
    diagnostic:'Why is “you agreed last time” not a valid reason to ignore a present no, even in a long-term relationship?'},
   {name:'Separate ordinary disappointment from coercive danger',
    instruction:'Write a short analysis of how disappointment can be expressed without threats or manipulation. Then describe how the response changes if pressure escalates into intimidation, stalking or risk of harm. Include a way to seek help that does not require confrontation.',
    model:'Someone may feel disappointed and still respect the other person’s autonomy. If threats or coercion occur, the priority shifts toward safety, private documentation where safe and trusted support rather than a debate about whether refusal was justified.',
    diagnostic:'Which specific observable behavior would indicate that a mutual conversation is no longer safe or voluntary?'}
  ],
  rubric:['Recognizes that consent must be freely given in the present context.','Rejects guilt, manipulation and relationship status as substitutes for agreement.','Distinguishes healthy disappointment from coercive threats.','Includes a safety-oriented response without forced confrontation.'],
  limits:'Adult consent education, not legal interpretation or a substitute for safety services.'
 }
};
