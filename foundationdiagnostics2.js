/** Original scaffolded diagnostic checks for the remaining seven foundations.
 * These are ungraded learning prompts, not certification or personal advice.
 * Independent subject and language review remains outstanding.
 */
export const FOUNDATION_DIAGNOSTICS_TWO={
 thinking:{
  lessonId:'evidence',title:'Claims and evidence — make conclusions answerable',
  intro:'Three short decisions reveal why confident language is not the same as a justified conclusion.',
  questions:[
   {prompt:'A news graphic states “9 out of 10 users prefer this service” but gives no sampling method. What is the most important missing detail?',
    options:['The graphic’s background color.','Whether respondents represent the intended users and how preference was measured.','How often the headline was reposted.'],correct:1,
    explanation:'A percentage requires a numerator, denominator, selection rule and measurement method. Nine enthusiastic survey responses out of ten selected volunteers may not describe a larger user population.',
    transfer:'Write three methodological questions about recruitment, sample size and the exact preference question.'},
   {prompt:'Coffee sales and umbrella sales both increase on a rainy day. What conclusion follows from the association alone?',
    options:['Coffee causes rain.','Umbrellas cause demand for coffee.','Both could be influenced by weather; the pattern does not identify a causal direction.'],correct:2,
    explanation:'A third variable such as weather or foot traffic can affect both quantities. An association may deserve investigation, but it does not establish which variable causes another.',
    transfer:'Draw arrows from a plausible common cause toward both sales quantities, then describe a comparison that could test your explanation.'},
   {prompt:'A study’s conclusion contradicts your preferred belief. Which response is most intellectually responsible?',
    options:['Examine its definitions, design and relevant counterevidence before updating confidence.','Reject the paper because you dislike the result.','Share only the headline and treat the finding as indisputable truth.'],correct:0,
    explanation:'Good reasoning evaluates evidence quality rather than rewarding conclusions that feel familiar. A single study can be informative but limited; consider replication, population relevance and rival explanations.',
    transfer:'Name one result that would increase and one result that would decrease your confidence in the study’s main claim.'}
  ]
 },
 digital:{
  lessonId:'passwords',title:'Digital security — verify who is trusted',
  intro:'Practice choosing controls based on actual trust boundaries rather than interface appearance.',
  questions:[
   {prompt:'A login page shows a lock icon inside the design. Which test best checks that you reached a legitimate service?',
    options:['Confirm the actual domain from a known-good bookmark and check the connection, rather than trusting a decorative icon.','Trust it because a logo can only be displayed by its owner.','Enter a one-time passcode to see whether the page looks professional.'],correct:0,
    explanation:'A lock illustration is simply page content and can be copied. An HTTPS connection is important but does not by itself prove the site belongs to the expected organization. Verify the destination through an independent trusted path.',
    transfer:'Describe how you would reach your account after receiving a suspicious alert without tapping its supplied link.'},
   {prompt:'Two online accounts share the same password. One provider later suffers a credential leak. What risk does reuse increase?',
    options:['It forces all accounts to use stronger encryption.','Exposed credentials can be tried against other accounts using the same secret.','It makes the second provider responsible for the first breach.'],correct:1,
    explanation:'Password reuse links otherwise separate accounts. Unique strong passwords, protected recovery methods and suitable multi-factor authentication limit the impact of one exposed credential.',
    transfer:'Write a recovery order for the reused accounts without storing passwords in the learning note.'},
   {prompt:'A private file button is hidden in React for other users. What is still required to protect the file?',
    options:['A darker interface theme.','A hard-to-guess file name alone.','Server-side authorization that checks whether this requester may access that particular record.'],correct:2,
    explanation:'Clients can be modified and hidden endpoints can still receive requests. Backend identity and resource authorization must guard every sensitive operation, along with appropriately restricted storage access.',
    transfer:'Describe a negative test in which user A tries to access user B’s file and the protected response is denied.'}
  ]
 },
 career:{
  lessonId:'skills',title:'Professional skills — prove what you built',
  intro:'Choose a demonstrable deliverable, explain your role, and state limitations accurately.',
  questions:[
   {prompt:'Your portfolio says “built a perfect secure dashboard.” What revision improves credibility most?',
    options:['Add more superlatives and animation.','Describe a specific user problem, your implementation, tests and known limitations.','Remove every technical detail so recruiters focus only on screenshots.'],correct:1,
    explanation:'Reproducible evidence earns trust. An architecture decision, a tested user path and honest limits show what you can actually do without promising that software has no vulnerabilities.',
    transfer:'Rewrite the claim as two sentences naming a React frontend behavior, a verified backend control and one unresolved risk.'},
   {prompt:'A group project involved one designer, two developers and an open-source chart package. How should your case study present authorship?',
    options:['Claim full authorship because you uploaded the final repository.','Omit collaborators to keep the text short.','State your exact contribution and credit collaborators and licensed dependencies.'],correct:2,
    explanation:'Accurate attribution is a professional skill. A reader needs to understand which decisions and artifacts you personally implemented and which came from other people or third-party libraries.',
    transfer:'Create an attribution line distinguishing personal code, design collaboration and third-party package use.'},
   {prompt:'A project performance metric improved on your laptop but no shared benchmark was run. Which claim is supportable?',
    options:['A local comparison showed improvement under the stated device and test conditions; broader results remain untested.','The application is now faster on every device.','All future deployments will have identical performance.'],correct:0,
    explanation:'Performance depends on hardware, data, network, browser and benchmark method. Report the actual measurement environment and test repeatability rather than generalizing a narrow observation to everyone.',
    transfer:'Specify the metric, before/after method and two conditions needed before extending the claim to another device.'}
  ]
 },
 science:{
  lessonId:'method',title:'Scientific method — from question to fair measurement',
  intro:'Check whether a hypothesis can be tested and whether a result really follows from the design.',
  questions:[
   {prompt:'Someone says “This plant grows better with music.” Which revision makes the statement testable?',
    options:['Music is universally good for plants.','I like plants that listen to music.','Under specified conditions, compare plant growth with and without a defined sound treatment.'],correct:2,
    explanation:'A test requires clear treatments, comparable conditions and an outcome measure, such as height over time. Control water, light, species and other factors to make the comparison informative.',
    transfer:'Specify one measurement, one control variable and a period over which the two plant groups would be compared.'},
   {prompt:'A class measures water temperature with a device that consistently reads 2 °C too high. Which issue is most directly illustrated?',
    options:['A systematic measurement bias requiring calibration or correction.','Proof that the water itself became hotter.','A reason to report more decimal places without checking the device.'],correct:0,
    explanation:'A persistent offset is a measurement problem, not a change in the physical system. Repeating biased measurements can increase consistency without improving accuracy. A reference check or calibration is needed.',
    transfer:'Design a calibration check and explain why repeated readings from one miscalibrated sensor are insufficient.'},
   {prompt:'A single clear night reveals a crescent Moon. What is a justified scientific next step?',
    options:['Conclude Earth’s shadow creates all Moon phases.','Record date and appearance, model reflected sunlight and compare subsequent observations with predictions.','Infer the Moon makes its own visible light because one side is bright.'],correct:1,
    explanation:'Ordinary lunar phases result from our view of the sunlit lunar hemisphere, not a routine Earth shadow. A dated sequence and a geometric model allow testable predictions without pretending to control celestial motion.',
    transfer:'Sketch the Sun–Earth–Moon positions for a quarter Moon and state one limitation of your scale drawing.'}
  ]
 },
 relationships:{
  lessonId:'trust',title:'Trust — distinguish consent from control',
  intro:'Explore what voluntary cooperation looks like and when a different safety response is needed.',
  questions:[
   {prompt:'One friend asks for access to another friend’s private messages “to prove trust.” Which response best respects autonomy?',
    options:['Trust requires permanent access to all private accounts.','A person can set a privacy boundary without having to prove innocence by surrendering credentials.','Declining automatically demonstrates dishonesty.'],correct:1,
    explanation:'Privacy and trust are compatible. Consent must be voluntary and appropriately scoped. Repeated coercive demands or threatened consequences change the situation from ordinary negotiation toward a potential safety concern.',
    transfer:'Draft a respectful boundary that protects private accounts and names an alternative way to discuss a specific concern.'},
   {prompt:'You apologize for sharing a private screenshot without permission. What does meaningful repair require?',
    options:['Ask for immediate forgiveness so both sides can move on.','Explain why the other person should not feel upset.','Acknowledge the act, limit further exposure and propose a concrete prevention measure.'],correct:2,
    explanation:'Repair is strongest when it identifies observable responsibility and changes future behavior. The harmed person can choose whether and when to respond; an apology cannot require reconciliation.',
    transfer:'Create a two-step plan for removing unauthorized sharing and preventing recurrence.'},
   {prompt:'A partner repeatedly threatens to reveal private information if the other person meets friends. What should take priority?',
    options:['Safety, privacy and appropriate support rather than a risky loyalty test or forced confrontation.','Persuading the threatening partner by giving them more private passwords.','Publicly exposing the person as a first response without considering safety.'],correct:0,
    explanation:'Repeated threats and isolation pressure are more concerning than ordinary disagreement. A safe response should consider escalation risk and trusted support, without requiring someone to confront a potentially dangerous person.',
    transfer:'Describe one low-risk support option and an important detail that should remain private in a safety plan.'}
  ]
 },
 negotiation:{
  lessonId:'persuasion',title:'Ethical influence — clear information without hidden pressure',
  intro:'Compare a fair request with a manipulative tactic, then practice an informed alternative.',
  questions:[
   {prompt:'A seller tells a buyer “This offer expires in ten minutes” although the deadline is invented. What is the problem?',
    options:['The buyer received too much information.','A fabricated deadline uses misleading urgency to pressure a decision.','The price must therefore be lower than every competitor.'],correct:1,
    explanation:'A false scarcity or timing claim interferes with informed choice. A genuine deadline can be described honestly, while fabricated urgency attempts to gain compliance through misleading information.',
    transfer:'Rewrite the offer using a real expiry condition—or omit the deadline entirely if none exists.'},
   {prompt:'You are negotiating project scope with a client whose budget is below your sustainable cost. What is a defensible response?',
    options:['Invent an alternative client to gain leverage.','Agree to unlimited work and hope the client pays more later.','Explain the work assumptions and offer a smaller defined scope or decline respectfully.'],correct:2,
    explanation:'Preparation includes costs, a real alternative and acceptance criteria. A narrower scope can make a limited budget viable without disguising unpaid work or pressuring the other party with false claims.',
    transfer:'Write one smaller deliverable with clear inclusion, exclusion and acceptance criteria.'},
   {prompt:'Two sides disagree about a project handoff. Which question most helps reveal their actual interests?',
    options:['What outcome must each side protect, and which constraints make that important?','Which side sounds more confident?','How can I make the other side concede before discussing facts?'],correct:0,
    explanation:'Interests and constraints may reveal options a fixed position hides. A useful question invites verifiable details and makes space for each side to decide without deceit or coercion.',
    transfer:'List two possible interests behind a demand for a faster deadline and one ethical option addressing each.'}
  ]
 },
 shadow:{
  lessonId:'manipulation',title:'Recognize manipulation — keep evidence and safety distinct',
  intro:'Learn to recognize coercive patterns without turning the material into a guide to exploiting people.',
  questions:[
   {prompt:'A message promises affection only if the recipient surrenders their passwords. Which feature is most concerning?',
    options:['A conditional threat to withhold care in exchange for control of private access.','That the message contains a request.','That the recipient prefers privacy.'],correct:0,
    explanation:'The concerning feature is coercive leverage over another person’s privacy and autonomy. A strong response does not require diagnosing the sender; it focuses on protecting access and seeking support where safety is uncertain.',
    transfer:'Write a non-retaliatory account-protection plan that does not involve sending credentials or staging a trap.'},
   {prompt:'Someone remembers an event differently from you once. What conclusion is warranted from that disagreement alone?',
    options:['It proves a deliberate abuse tactic.','Memory conflict alone cannot establish manipulation; investigate context and patterns cautiously.','Their recollection must be false because you feel more certain.'],correct:1,
    explanation:'Memory is imperfect, and a single contradiction does not reveal intention. Repeated humiliation, isolation or threats may raise stronger concerns, but the analysis should still separate documented behavior from inference.',
    transfer:'Make separate columns for verifiable records, conflicting recollections and interpretations that remain unproven.'},
   {prompt:'A subscription interface hides recurring charges and makes cancellation confusing. Which redesign protects users?',
    options:['Make the cancellation control harder to find.','Use misleading countdowns to increase accidental renewals.','Show price and renewal terms clearly and provide straightforward cancellation with confirmation.'],correct:2,
    explanation:'Transparent terms and a usable exit path support informed decisions. Measuring voluntary retention and disputes is more ethical than exploiting misunderstanding or interface friction.',
    transfer:'Draft clear microcopy for the recurring amount, renewal date and cancellation confirmation.'}
  ]
 }
};
