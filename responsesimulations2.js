/** Atlas applied response simulations, part B.
 * Hypothetical content; no real user records or implied professional assessment.
 */
export const RESPONSE_SIMULATIONS_B={
 thinking:{
  title:'The misleading success metric',
  situation:'An online course reports a “95% success rate.” The figure comes from 950 of 1,000 sessions that did not request human support; it does not measure whether learners actually solved their problems.',
  rounds:[
   {title:'Audit the original claim',prompt:'What is the best way to evaluate this headline before endorsing it?',choices:[
    ['Call 95% a proven learning gain because the number is large','The proportion measures routing behavior, not a verified change in skills or even a solved problem.',false],
    ['Separate the observed event from the outcome being claimed','950/1000 did not request a person, but resolution, understanding and future performance have not been measured.',true],
    ['Assume every silent user was dissatisfied instead','The reverse assumption is just as unsupported without credible outcome evidence.',false]
   ]},
   {title:'New sessions change the denominator',prompt:'The team discovers 600 omitted sessions, including 400 timeouts and 200 escalations. What should the report now say?',choices:[
    ['Keep the original 95% because it was already published','Missing records materially change the stated denominator and invalidate the original population claim.',false],
    ['Report 950 of 1,600 with the narrow routing definition and seek outcomes','The revised fraction is about 59.4%, and even that is not verified learning success. Additional representative outcomes are required.',true],
    ['Treat the 200 escalations as users who definitely failed to learn','Escalation may be a healthy help-seeking choice and cannot automatically be equated with failure.',false]
   ]}
  ],
  synthesis:'Write a corrected public metric statement with its denominator, outcome definition, missingness concerns and a test that could genuinely measure learning.',
  model:'The original 95% headline was not a learning result. In the larger record, 950/1600 ≈ 59.4% did not request support. Neither fraction proves understanding or improvement; a validated outcome study is needed.',
  rubric:['Uses the complete eligible population when calculating rates.','Distinguishes routing from actual learning outcomes.','Updates conclusions when new records appear.','Avoids inventing the reasons for silence or escalation.'],
  caveat:'Fictional statistical case, not evidence about a real company or learning product.'
 },
 digital:{
  title:'A private file exposed by a direct request',
  situation:'A developer builds a React secure-file interface and hides private items when the viewer is not logged in. The team calls it “fully secure,” but direct API object access has not been tested with separate accounts.',
  rounds:[
   {title:'Choose the real security boundary',prompt:'What must be tested before promising private files are protected?',choices:[
    ['Try synthetic cross-account requests at the API and storage boundary','A server must verify ownership for every requested object. Hiding frontend controls cannot stop a direct request.',true],
    ['Only verify that the file button disappears from the UI','Presentation state is not authorization. An attacker or another client can request the endpoint independently.',false],
    ['Collect real customer secrets for an exploratory penetration test','Using private production data without clear authorization is unsafe and unnecessary for a defensive unit test.',false]
   ]},
   {title:'A synthetic test finds cross-user access',prompt:'Account A receives a test file belonging to synthetic account B. How should the team respond?',choices:[
    ['Fix resource-level authorization and retest every relevant path','An authenticated requester is not automatically permitted to access another account’s object. Correct the server/storage rules and verify denial without leaking metadata.',true],
    ['Change the icon so the vulnerability becomes less visible','Cosmetic concealment does not correct a backend access-control flaw.',false],
    ['Claim that encryption guarantees ownership enforcement','Encryption and authorization solve different problems; an exposed endpoint can still release decrypted data or signed access.',false]
   ]}
  ],
  synthesis:'Create a defensive threat model and a synthetic test matrix for owned, cross-user, missing and expired-session requests. List open deployment and storage checks.',
  model:'Test ownership using server-side access rules and return no private metadata or reusable file URL to unauthorized users. Report precisely which fixtures passed, and keep independent security review pending.',
  rubric:['Distinguishes identity from per-resource authorization.','Exercises both permitted and denied requests with synthetic data.','Protects metadata, URLs, secrets and error paths.','Does not certify an entire system from a frontend or single API test.'],
  caveat:'Defensive training on fictional accounts, not authorization to access real private systems.'
 },
 career:{
  title:'A portfolio claim meets an accessibility test',
  situation:'A developer’s portfolio says “fully accessible and lightning fast.” It has visually polished project cards, but the first evaluation was a single desktop screenshot rather than actual keyboard, assistive-technology or performance tests.',
  rounds:[
   {title:'Decide what evidence the claim needs',prompt:'A reviewer asks how the interactive filters work without a mouse. Which response is professionally credible?',choices:[
    ['Demonstrate keyboard navigation and state what has and has not been tested','Real interaction evidence is more useful than appearance, and explicit limitations protect the credibility of the case study.',true],
    ['Point to the color palette and claim accessibility follows from good taste','Visual polish does not prove focus order, semantic controls, screen-reader behavior or motion preferences.',false],
    ['Say that one passing screenshot guarantees support for all users','A static image cannot test keyboard operation, dynamic announcements or performance.',false]
   ]},
   {title:'New testing reveals a failure',prompt:'On a keyboard-only session, the filter cannot be activated. What is the best portfolio update?',choices:[
    ['Remove the unsupported universal claim, repair the control, and retest','Use an appropriate semantic button or accessible interaction, verify focus and activation in defined environments, and disclose remaining coverage.',true],
    ['Hide the filter from keyboard users and call it a design choice','Avoiding a test failure by withholding functionality does not address equivalent access.',false],
    ['Keep the old claim because the screenshot still looks polished','Known adverse evidence should change a public professional claim.',false]
   ]}
  ],
  synthesis:'Draft a concise case study documenting original failure, technical choice, reproducible test, measurable results and untested devices or assistive technologies.',
  model:'A reliable claim is “Keyboard operation of the project filter was tested in the stated browsers after replacing the non-semantic control.” Further assistive-technology review is still required.',
  rubric:['Connects professional claims to reproducible tests.','Treats observed access failures as evidence for repair.','Credits the actual implementation and environment.','Does not overstate certification, universal usability or performance gains.'],
  caveat:'Illustrative portfolio quality scenario, not an accessibility audit of a real site.'
 },
 science:{
  title:'Two sensors disagree about the same sample',
  situation:'Two classroom thermometers measure one container of water under the same conditions. Sensor A reports 24.8, 25.0 and 24.9 °C; sensor B reports 26.0, 26.1 and 25.9 °C. Neither has been checked against a calibrated reference.',
  rounds:[
   {title:'Interpret repeatability cautiously',prompt:'Which statement fits the data without claiming an untested cause?',choices:[
    ['Averaged readings differ by 1.1 °C; accuracy is still unknown','Both devices are internally consistent in this small sample, but repeatability does not establish which mean reflects the true temperature.',true],
    ['The second part of the water is hotter by exactly 1.1 °C','Both instruments measured the same water sample, so the reading difference cannot automatically be attributed to a physical difference.',false],
    ['The sensor with the lower number must be accurate','A lower reading has no inherent claim to correctness without reference evidence.',false]
   ]},
   {title:'A reference changes the interpretation',prompt:'A calibrated reference is measured alongside both and reads 24.9 °C under carefully matched conditions. What is now supported?',choices:[
    ['Sensor A agrees with this reference under these test conditions','The local comparison makes a bias in B plausible while preserving uncertainty about range, time and other operating conditions.',true],
    ['Sensor B is always defective in every environment','One set of conditions does not establish universal instrument performance or the source of every future discrepancy.',false],
    ['Erase the first readings because the new comparison is inconvenient','Scientific records should preserve the measurements, correction method and reasons for revising the conclusion.',false]
   ]}
  ],
  synthesis:'Prepare a measurement table with units, means, calibration conditions, plausible competing explanations and a bounded conclusion for a laboratory report.',
  model:'The original means are 24.9 and 26.0 °C. A reference at 24.9 °C makes A’s readings more consistent with the reference in this trial, but further calibration and uncertainty analysis are necessary before broad accuracy claims.',
  rubric:['Calculates observed means and differences correctly.','Separates repeatability, accuracy and sensor bias.','Uses a credible reference and documents conditions.','Avoids unwarranted causal or universal claims.'],
  caveat:'Hypothetical classroom study, not an instrument certification or environmental safety analysis.'
 },
 relationships:{
  title:'Shared files, personal boundaries and consent',
  situation:'Three friends maintain a shared photo album from a trip. One person asks for another friend’s personal account password to speed up exporting photos. The original agreement only covered trip images, not private email or chat history.',
  rounds:[
   {title:'Protect the legitimate shared goal',prompt:'How can the group provide trip photos without surrendering unrelated private access?',choices:[
    ['Create a bounded shared export of mutually agreed photos','The legitimate goal is access to shared images, not control over another person’s personal credentials or unrelated materials.',true],
    ['Demand the personal password as proof of trust','Privacy boundaries do not prove dishonesty, and access to an account exceeds the stated sharing purpose.',false],
    ['Export every personal message and decide later what to keep','Mass copying private information creates unnecessary exposure and bypasses consent.',false]
   ]},
   {title:'The request turns coercive',prompt:'The requester now threatens to post private screenshots unless granted the account password. What should the response prioritize?',choices:[
    ['Protect the account and seek trusted safety support without forced confrontation','A credible threat changes the response from routine coordination to safety planning. Preserve evidence privately when safe and use legitimate account protections.',true],
    ['Surrender credentials to prove there is nothing to hide','Giving account control under threats does not resolve coercion and can expand exposure.',false],
    ['Publish the requester’s private messages in revenge','Retaliatory disclosure may escalate harm and undermine everyone’s privacy.',false]
   ]}
  ],
  synthesis:'Write one voluntary shared-photo agreement and a separate safety-first response for credible coercion. Keep private accounts and disputed materials outside the shared export.',
  model:'Friends can agree on named photo files, recipients and permissions without exposing private email. If threats arise, personal safety, appropriate support and legitimate account control take priority over argument or retaliation.',
  rubric:['Distinguishes specific sharing consent from unrestricted access.','Provides a voluntary and reversible content transfer plan.','Prioritizes safety when threats replace ordinary disagreement.','Avoids coerced credentials, stalking or retaliatory publication.'],
  caveat:'Fictional boundary scenario; real safety threats may require qualified local help.'
 },
 negotiation:{
  title:'A discounted quote with hidden workload',
  situation:'A freelancer offers ₱24,000 for two weeks with one revision round. A client requests ₱20,000, a five-day deadline and unlimited revisions. The developer has not checked whether a five-day delivery is possible.',
  rounds:[
   {title:'Assess the apparent compromise',prompt:'Which next step creates a genuinely comparable negotiation?',choices:[
    ['Write a scope, capacity and acceptance table before counteroffering','The new proposal lowers price while increasing urgency and obligations. A coherent counteroffer needs measurable scope and limits.',true],
    ['Agree and assume unpaid revisions will somehow be absorbed','Unlimited work and an unverified deadline introduce foreseeable conflict and misrepresent capacity.',false],
    ['Invent a competing client and fake deadline to increase leverage','Bluffing a nonexistent alternative is not a verifiable or ethical response to the client’s constraints.',false]
   ]},
   {title:'A feasibility check changes the offer',prompt:'A task estimate shows the full scope requires at least nine working days with current capacity. What is the best response?',choices:[
    ['Offer a smaller phase at a realistic cost and confirm acceptance criteria','A phased package can serve the client’s priority while openly excluding work that cannot safely fit within five days.',true],
    ['Promise all features in five days anyway to win the contract','A verified estimate does not support that guarantee; the promise creates risk for both parties.',false],
    ['Claim the estimate is legally binding and cannot be discussed','A planning estimate alone does not establish a legal judgment; delivery constraints should be negotiated with care.',false]
   ]}
  ],
  synthesis:'Draft two comparable written packages and a respectful decline path, defining deliverables, timeline, revision count, payment conditions and acceptance tests.',
  model:'Keep the original full-scope option or propose a five-day limited deliverable after a feasibility review. Any additional revisions or features require a separately agreed scope and estimate.',
  rubric:['Compares scope, price, timeline and quality on equal terms.','Bases proposals on actual delivery capacity.','Provides explicit revision and acceptance boundaries.','Avoids false deadlines, threats or unlimited commitments.'],
  caveat:'Fictional freelance negotiation, not a specific contract or legal opinion.'
 },
 shadow:{
  title:'A forwarding campaign disguises an unverified rule',
  situation:'A group chat displays an alarming graphic with a government-looking seal and says a new rule is effective tomorrow. Members who ask for evidence are accused of disloyalty. The image has no official document number or date.',
  rounds:[
   {title:'Choose how to react to urgency',prompt:'Which action is appropriate before treating this claim as a real public requirement?',choices:[
    ['Demand a dated official source and decline unverified forwarding','An authority-like logo, countdown and group pressure do not establish that a rule is effective.',true],
    ['Forward immediately so nobody accuses you of betrayal','Forwarding an unsupported claim expands potential misinformation and reinforces pressure.',false],
    ['Post the sender’s private identity to embarrass them','Doxxing or retaliation does not verify the alleged rule and can cause additional harm.',false]
   ]},
   {title:'Official records reveal a proposal, not an enacted rule',prompt:'The official publication shows the graphic came from an undated consultation draft. What correction is justified?',choices:[
    ['Explain the difference between a proposal and an enforceable rule, citing the official text','A dated and verifiable correction should distinguish draft, adoption and effective status without shaming the people who were misled.',true],
    ['Say every future public warning must be false','One false or misrepresented graphic does not justify ignoring credible future hazards or official instructions.',false],
    ['Keep forwarding because the campaign’s intention was probably good','Good intentions do not make an unsupported factual assertion true or harmless.',false]
   ]}
  ],
  synthesis:'Create a verification protocol for official source, effective date, scope and safe correction. Include an urgent-safety exception for a credible immediate threat confirmed through trustworthy channels.',
  model:'The group can pause forwarding, consult the current official record, and publish a clear correction that the document is a draft rather than an adopted requirement. A genuine emergency should use verified safety contacts.',
  rubric:['Separates social pressure from actual authority.','Checks source, applicability and effective date.','Corrects with evidence and without retaliatory exposure.','Keeps real safety threats and misinformation claims distinct.'],
  caveat:'Fictional media-literacy study; real Philippine laws and emergencies require current official verification.'
 }
};
