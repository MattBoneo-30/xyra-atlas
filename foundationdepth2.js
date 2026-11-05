/**
 * Foundational concept-first instructional revisions, part 2/2.
 * Original teaching text with worked examples and applied reasoning,
 * pending independent subject-specialist editorial review.
 */
const section=(heading,body)=>({heading,body});
const flow=(title,steps,caption)=>({title,steps:steps.map(([label,detail])=>({label,detail})),caption});
export const FOUNDATION_DEPTH_TWO={
 thinking:{
  id:'evidence',minutes:28,title:'Critical thinking: claims, evidence and uncertainty',
  intro:'Critical thinking is the careful evaluation of claims, reasoning and uncertainty. It is neither habitual skepticism about everything nor automatic trust in what sounds confident.',
  sections:[
   section('Decompose a claim before checking it',
    'A claim is a statement that can be evaluated, such as “this course doubles employment chances.” Separate descriptive claims (“20 people finished it”), causal claims (“the course caused their employment”) and value judgments (“it is worth the price”). Ask what each term means, for whom, over what period and compared with what. “Doubles” requires a baseline: changing from one in a hundred to two in a hundred differs from changing from forty in a hundred to eighty. If the statement cannot be measured as written, clarify it before asking whether it is true.'),
   section('Distinguish testimony, data and explanatory models',
    'A firsthand story may identify a possible issue but cannot establish how common it is. A survey needs attention to how participants were selected, how questions were worded and who did not respond. An experiment can help test causal hypotheses when variables and confounding influences are handled appropriately. A model connects observations into an explanation that predicts something; its usefulness depends on whether those predictions hold. Different evidence answers different questions, so there is no single universal ranking for every inquiry.'),
   section('Examine denominators, selection and base rates',
    'Imagine a service claims a 90 percent success rate from nine positive responses out of ten, but 200 people signed up and only ten answered the survey. The reported ratio describes respondents, not necessarily everyone who signed up. Selection bias arises when people included in a sample differ meaningfully from those excluded. Base rates matter when judging rare events: even a strong screening test can produce many false alarms when the condition is uncommon. Ask “out of how many?” and “who was missing?” before concluding.'),
   section('Test competing explanations and evidence that would change your mind',
    'Suppose grades improved after a new study technique. The technique may help, but other possibilities include easier tests, more study hours, different students or random variation. Form at least two plausible hypotheses and identify evidence that would favor one over the other. An honest analysis also asks which observation would weaken your preferred conclusion. Believing a claim temporarily can be reasonable, but treating it as certain before testing is not.'),
   section('Communicate your confidence honestly',
    'Use terms such as “observed,” “consistent with,” “suggests,” and “not established” carefully. A small nonrepresentative sample supports different confidence from repeated independent studies. Avoid false balance: unsupported rumor and robust evidence do not deserve equal weight simply because two sides exist. Likewise, sources may make real mistakes and need checking. Your conclusion should name its scope, strongest support and important remaining uncertainty.')
  ],
  example:'A mobile app advertises “Users learn 200 percent faster.” First find what the measured outcome was: vocabulary recall after a day or ability to hold a conversation after months? Ask about comparison students, group assignment, baseline skill, dropouts and duration. If learners remembered six rather than two words, the relative increase is 200 percent but the outcome may still be small. A convincing evaluation asks whether the advantage persists and transfers to meaningful communication instead of repeating the marketing statistic.',
  flow:flow('Audit a claim before repeating it',[
   ['Define the proposition','Turn slogans into precise, measurable statements.'],
   ['Inspect evidence quality','Look for denominator, selection, controls, missing data and relevance.'],
   ['Compare explanations','Find alternatives and identify a possible falsifying observation.'],
   ['State a calibrated finding','Describe what follows, what does not and what remains unknown.']
  ],'Skepticism is a method of checking claims, not an identity that always says no.'),
  task:'Choose a hypothetical claim: “our app reduces study time by 50 percent.” Define the outcome, baseline, sample, comparison condition and measurement period. Invent a dataset with both favorable and unfavorable results, then compute the absolute difference and relative difference. Identify two ways the study could mislead, two sources of missing evidence and a provisional conclusion no stronger than the data justify.'
 },
 digital:{
  id:'passwords',minutes:30,title:'Digital security: accounts, authentication and recovery',
  intro:'Digital literacy begins with understanding how identities and accounts are protected, how attackers exploit trust, and how to recover safely when something goes wrong. A password is one component of a wider security system.',
  sections:[
   section('Know what the account is protecting',
    'An account is valuable because it controls access to messages, purchases, work, personal records and sometimes password resets for other services. Map the potential consequences of losing an email account versus a disposable forum account. Prioritize your primary email, banking and recovery mechanisms. The attacker’s goal may be account takeover, theft of information, unauthorized purchases or impersonation; the appropriate protection depends on the threat and the sensitivity of the account.'),
   section('Use unique credentials and a trustworthy recovery plan',
    'Reusing one password across websites makes a breach on a minor site dangerous elsewhere. A password manager can help produce and store unique long passwords. Protect access to the manager itself and keep recovery options that you can use if your phone is lost or replaced. Record official recovery steps and backup codes securely. Never put recovery keys in an email or message to someone claiming to be support, and do not assume a device is trustworthy merely because it remembers a login.'),
   section('Distinguish authentication from account verification',
    'A password asks for a secret you know; an authenticator demonstrates possession or control of a device or key, sometimes combined with a local activation factor. Multi-factor authentication adds protection, but different methods have different resistance to phishing. Manually entered one-time codes can be tricked into being disclosed or relayed to an impostor site. Properly implemented passkeys and other phishing-resistant cryptographic authenticators can bind a sign-in to the legitimate service. Check the service’s actual support and account-recovery design before assuming one method is perfect.'),
   section('Recognize social engineering without guessing from appearance',
    'A message may use urgency, authority or an invented deadline to pressure you to act before checking the sender. A familiar logo, caller ID or even a plausible name does not prove legitimacy. Stop, open the service using your own bookmarked address or installed app, and verify the request in the official account interface. Do not provide one-time codes, passwords or remote screen access through unsolicited contact. Checking the actual domain helps, but a secure connection icon alone does not guarantee that the business is genuine.'),
   section('Respond to a possible compromise step by step',
    'From a trusted device and known official site, secure the primary email account and affected service, change compromised credentials, revoke suspicious sessions where available and review recovery methods. Preserve relevant transaction records or notices and contact the provider through verified channels. If finances are affected, follow the institution’s official dispute process promptly. Security is a cycle of prevention, detection, response and recovery rather than a single “strong password” setting.')
  ],
  example:'A caller says an online bank will suspend your account unless you repeat a six-digit login code. The caller knows your name and cites a recent transfer, which makes the story sound credible. None of that proves the call is legitimate. End the call, open your official banking app independently and check notices or support channels there. Because a one-time code may complete sign-in on an attacker’s device, keep it private even when the caller claims to be fraud prevention. If you already shared it, prioritize account recovery and transaction monitoring.',
  flow:flow('Protect and verify a digital account',[
   ['Identify the asset','Determine what access or information the account controls.'],
   ['Strengthen authenticators','Use unique credentials, phishing-resistant options and secure recovery.'],
   ['Verify requests independently','Never trust the sender’s claimed identity without another channel.'],
   ['Respond and recover','Revoke access, secure connected accounts and document consequences.']
  ],'Security tools reduce risk, not guarantee zero incidents; account recovery is part of security.'),
  task:'Draw a fictional account map for email, a shopping app and a bank app. Identify which account can reset the others, what would happen if one login were stolen, how each should use unique credentials and additional authentication, and where backup recovery information would be stored. Then script a safe response to an unsolicited code request and a five-step recovery plan after suspected compromise.'
 },
 career:{
  id:'skills',minutes:28,title:'Career skills: evidence, practice and progression',
  intro:'An employable skill is not a tool name on a résumé. It is the ability to produce useful work under realistic conditions, explain decisions and show evidence that the results meet requirements.',
  sections:[
   section('Read job requirements as observable activities',
    'A listing that says “React, APIs and teamwork” names technologies and competencies but does not yet define performance. Translate it into tasks: build an accessible form, handle API errors, test state changes, explain design choices and review code. Separate essential abilities from employer-specific tool preferences. Compare several credible listings rather than basing an entire study plan on one unusually broad advertisement. Job titles and market conditions vary by location, industry and seniority.'),
   section('Create a skill ladder with meaningful checkpoints',
    'A useful progression moves from recognizing concepts, to implementing a guided example, to solving an unfamiliar problem, to reviewing a trade-off and diagnosing failures. For a web developer, knowing that authentication exists is not the same as setting up sessions, protecting routes and recovering safely from expired credentials. Define evidence for each checkpoint, such as a passing test, a working deployment or a written explanation of an error you investigated.'),
   section('Build portfolio artifacts that show your decisions',
    'Employers cannot infer your reasoning from a screenshot alone. A strong case study states the user problem, your actual role, constraints, architecture choices, unexpected issues, tests and outcomes. Use honest metrics: “tested on three viewport sizes” is valid if true; inventing a 200 percent performance gain is not. Explain what you would improve after observing the results. When the work contains customer or employer information, use permission, anonymized data or a recreated demonstration.'),
   section('Practise feedback and maintainability',
    'A solo project can reveal programming ability but collaboration also involves communication, readable code, review, documentation and respectful feedback. Show how changes can be verified: clear setup instructions, meaningful commit history, an issue list and a small reproducible test. Learn to describe a failure honestly and how you corrected it. Reliability often matters more than adding a fashionable library without understanding maintenance costs.'),
   section('Make a learning plan grounded in current evidence',
    'Choose one realistic role, find five relevant job descriptions, group recurring tasks and rank the largest skill gaps. Build a project that demonstrates two or three important competencies rather than many superficial features. Review the result against a checklist and seek feedback from someone capable of evaluating the work. Hiring remains contingent on market conditions and employer decisions; a certificate or portfolio does not guarantee employment.')
  ],
  example:'A junior applicant says they know “full-stack development.” Their project repository contains a working web app but no README, tests or description of how authentication failures are handled. A better portfolio case study demonstrates the login flow, explains session boundaries, includes a reproducible test for a revoked session, and states a known limitation. The result is narrower than a grand claim but provides stronger evidence. A recruiter or engineer can inspect what the candidate actually built and why.',
  flow:flow('Convert learning into demonstrable capability',[
   ['Analyze a target role','Extract repeated work tasks from multiple actual job listings.'],
   ['Define a skill ladder','Specify what successful beginner and independent performance look like.'],
   ['Build and verify','Produce a relevant artifact and explain trade-offs, tests and mistakes.'],
   ['Review the evidence','Ask what a reviewer could reproduce and what still needs improvement.']
  ],'Evidence of current ability is more credible than an unsupported label of mastery.'),
  task:'Choose a hypothetical entry-level software role. Write six measurable competencies and rank them by frequency across five fictional job listings. Design a two-week project demonstrating three competencies, with a README outline, three test cases and one failure-recovery scenario. Draft a portfolio description that accurately distinguishes what you built yourself, what you reused and what you have not yet verified.'
 },
 science:{
  id:'method',minutes:30,title:'Science 101: hypotheses, measurement and explanations',
  intro:'Science is an evidence-based way to investigate the world. Learn to formulate answerable questions, design useful comparisons, quantify uncertainty and revise explanations when observations disagree.',
  sections:[
   section('Begin with something observable',
    'Questions such as “Why do seeds sprout?” are useful starting curiosities, but a specific test needs measurable variables: “Do seeds of the same species germinate at different rates when water amounts differ under similar conditions?” Define an outcome such as the number germinated after seven days and a procedure for measuring it. Science is not merely a list of accepted facts; it is a system of models and methods tested against observations.'),
   section('Make a prediction that could turn out wrong',
    'A hypothesis proposes an explanation or relationship. A prediction states what we expect to observe under defined conditions if that hypothesis and its assumptions are correct. “Sunlight helps plants grow” is broad; “plants given light for eight hours daily will average taller growth than those given two hours, with other conditions held similar” is more testable. A result that disagrees with a prediction may challenge the hypothesis, measurement process or assumptions; it does not always settle the whole scientific question in one experiment.'),
   section('Design controls and record sources of uncertainty',
    'To compare treatments, avoid changing multiple important conditions at once. Use suitable control or comparison groups, define the sampling method and record factors like temperature, seed variety and soil. A few unusual observations can distort the average, so report variation and sample sizes. Measurement instruments have resolution and calibration limits, and human observers can introduce biases. Repeated measurements and independent replication make a conclusion more robust than one perfectly worded guess.'),
   section('Distinguish observations, models, laws and theories',
    'An observation describes something measured or seen. A scientific model is a simplified representation that helps explain and predict. A scientific law describes a regular relationship within a specified domain; a theory provides an explanatory framework supported by evidence. A theory does not “graduate into a law” when enough people believe it. A good model can be limited and still useful: for example, simple orbital diagrams teach seasonal geometry before more precise gravitational calculations.'),
   section('Interpret results without overstating causation',
    'Suppose plants in the longer-light group grow taller in a small classroom experiment. Ask whether watering and temperature were comparable, whether results varied, and whether the observed effect persists in more trials. A meaningful report includes methods, outcomes, uncertainty, conflicting evidence and the next useful test. One small result may support a local conclusion, not prove a universal biological rule. Science proceeds by refining explanations as evidence accumulates.')
  ],
  example:'Two pots are placed in different spots; one seedling grows 8 cm and the other 5 cm. Calling light the cause is premature if their soils, water and temperature also differ. A more informative test uses multiple comparable seedlings, randomizes placement when feasible, varies one planned light condition, measures height consistently and records all outcomes. If the mean difference repeats, the evidence supports further investigation. If not, the original anecdote was insufficient to establish the explanation.',
  flow:flow('Build and test a scientific explanation',[
   ['Observe and define','Choose an answerable question and operationalize the outcome.'],
   ['Hypothesize and predict','State a prediction that could be contradicted by data.'],
   ['Compare and measure','Control important factors and record variation or error.'],
   ['Revise and communicate','Report what follows, what remains uncertain and what to test next.']
  ],'Science is iterative: a result changes confidence instead of guaranteeing permanent certainty.'),
  task:'Design a safe fictional experiment comparing how light exposure influences seedling growth. Specify the independent variable, dependent variable, comparison condition, five controlled factors, sample size and measurement schedule. Invent eight measurements across two groups, calculate group means, explain what an outlier could indicate and write a conclusion that distinguishes the observed result from a universal claim. Include one follow-up experiment.'
 },
 relationships:{
  id:'trust',minutes:28,title:'Trust, consent and recognizing harmful patterns',
  intro:'A healthy relationship involves reliability, respect for choices and repair after mistakes. Learn to distinguish ordinary conflict from repeated pressure, isolation or control without making diagnoses from isolated signs.',
  sections:[
   section('Define trust through observable behavior',
    'Trust is a reasonable expectation that someone will act reliably in relevant situations. It builds from followed-through commitments, clear communication and how people respond when they make errors. Trust is not blind certainty: the importance of a broken promise, the circumstances and the repeated pattern all affect how much confidence is reasonable. Respect also means letting another person maintain their own relationships, privacy and independent choices.'),
   section('Boundaries are about actions within your control',
    'A useful boundary specifies what you will accept and what you will do if a limit is crossed: “I will stop this conversation if you insult me; we can resume when it is respectful.” It is different from controlling another person with threats or surveillance. A request can be negotiated; consent is voluntary and can be withdrawn. Having a boundary does not give a person the power to demand private passwords, constant location tracking or removal of healthy outside friendships.'),
   section('Understand conflict and repair',
    'Two people may remember a conversation differently or disagree about priorities without either deliberately deceiving the other. Look for specific behavior, its impact, whether each person can ask questions safely and whether agreed changes are followed through. Repair includes accountability, a concrete plan and opportunities to observe changed behavior. An apology without any change in a harmful pattern provides weaker evidence of repair than repeated actions over time.'),
   section('Take coercive control and exploitation seriously',
    'Repeated threats, financial restrictions, humiliation, isolation, forced sexual pressure or punishment for refusing demands are not simply communication-style differences. The useful question is how a pattern limits agency and affects safety, not whether you can prove the other person’s private psychology. Avoid encouraging risky confrontations or secret tests. If there is immediate danger, prioritize emergency services and trusted local support; people facing coercion may need a safe, individualized plan.'),
   section('Do not turn uncertainty into compulsory self-doubt',
    'It is valuable to question a rapid interpretation of a delayed text, but that does not mean ignoring a pattern of documented retaliation. Separate unverified intentions from concrete conduct. “I cannot know exactly why” and “I can still decline this demand” can both be true. Where possible, compare observations across time, seek independent perspectives and protect personal agency. General lessons cannot judge a particular relationship from a few details.')
  ],
  example:'A person forgets one agreed call while working late, explains it and proposes a new plan. That may be an ordinary reliability problem. A different partner repeatedly demands proof of loyalty, blocks contact with friends and threatens to leave whenever a password is withheld. The second pattern is about escalating restrictions, not a harmless difference in attachment style. The learner should not label either person with a clinical condition; instead assess observable actions, freedom to refuse, repeated consequences and safety.',
  flow:flow('Evaluate relationship behavior without mind reading',[
   ['Record the pattern','Separate one-time errors from repeated demands and consequences.'],
   ['Assess agency and safety','Can each person refuse, keep support networks and ask questions?'],
   ['Look for accountability','Do agreements lead to observable change or recurring retaliation?'],
   ['Choose support and limits','Communicate boundaries when safe and seek trusted assistance for coercion.']
  ],'Respectful repair and protective boundaries are different responses to different patterns.'),
  task:'Write two fictional scenarios: an ordinary misunderstanding and a repeated controlling demand. For each, identify observable events, assumptions you cannot prove, the person’s ability to refuse, and a proportionate response. Draft a repair agreement for the first and a safe boundary/support plan for the second. Avoid diagnosing either character or promising that a single response will resolve the situation.'
 },
 negotiation:{
  id:'persuasion',minutes:27,title:'Influence, negotiation and informed choice',
  intro:'Influence is part of ordinary life, from explaining an idea to negotiating a deadline. Learn to recognize interests, evaluate claims and preserve informed choice rather than equating persuasion with trickery.',
  sections:[
   section('Understand why people persuade',
    'Persuasion attempts to change beliefs, attitudes or decisions with reasons, evidence and communication. Negotiation addresses interdependent interests when people need some arrangement despite differing preferences. Neither process is inherently exploitative. The ethical distinction depends on truthful representation, relevant information, realistic freedom to refuse and the use of pressure. An articulate presentation can still be deceptive if material terms or consequences are hidden.'),
   section('Identify positions, interests and legitimate limits',
    'A position states a demand: “I need the price reduced to ₱8,000.” An interest explains why that outcome matters: “My monthly budget cannot exceed ₱8,000.” Discovering underlying interests can create options such as a smaller scope, later delivery or another payment structure. But not every conflict has a mutually beneficial solution. A buyer’s budget is not permission to demand unpaid labor, and a seller’s costs do not require the buyer to agree.'),
   section('Use independent reference points',
    'Opening offers and comparisons influence perception, but a number presented first is not automatically fair. Build alternatives from comparable market prices, total cost, quality, timing and credible benchmarks. Distinguish your best alternative if no agreement is reached from the minimum acceptable terms you choose to disclose. Do not fabricate competing offers or scarcity; credible negotiation is compatible with saying “I need to verify that information first.”'),
   section('Detect pressure without assuming all persuasion is manipulation',
    'A transparent limited-time discount may be a real term. A countdown that restarts whenever the page reloads may signal a fabricated deadline. Repeated threats, concealed fees, guilt tied to loyalty or retaliation for asking questions can undermine free choice. Evaluate the exact claim, time pressure, missing alternatives and consequences of refusal. Safety matters more than winning a negotiation with someone who uses coercion.'),
   section('Make agreements testable and reversible where appropriate',
    'A negotiated outcome should specify scope, price, deadlines, responsibilities, cancellation and what happens if conditions change. Summarize open questions and do not treat vague approval as consent to additional obligations. For complex or legally significant terms, get a qualified review. A sound agreement is one each party can understand and choose, not one produced by confusion or manufactured urgency.')
  ],
  example:'A freelancer quotes ₱20,000 for a website. The client offers ₱8,000. Rather than saying the client is disrespectful or inventing a competing offer, the freelancer asks which features are indispensable, compares the required hours with costs and proposes a small landing page within the lower budget. If maintenance and hosting are excluded, those exclusions are written down. The client can accept, decline or reconsider. The negotiation succeeds only if the resulting terms are clear and workable for both parties.',
  flow:flow('Negotiate with evidence and freedom to refuse',[
   ['State interests and limits','Separate the desired outcome from the reason and constraints.'],
   ['Check objective alternatives','Compare credible costs, options and the consequences of no agreement.'],
   ['Propose transparent options','Explain scope, trade-offs and uncertainty without misleading pressure.'],
   ['Document the agreement','Define responsibilities and allow meaningful consent.']
  ],'A successful negotiation need not end in agreement; a clear refusal may protect both sides.'),
  task:'Draft a fictional negotiation between a freelance developer and a small client. Provide the requested project scope, the freelancer’s estimated work, the client’s budget, two alternative packages and clear exclusions. Identify one misleading tactic that should not be used, an objective reference for pricing and the best alternative if they cannot agree. Write a brief final agreement or a respectful refusal.'
 },
 shadow:{
  id:'manipulation',minutes:30,title:'Recognizing manipulation, coercion and hidden pressure',
  intro:'Manipulation involves influence that hides important information, distorts choices or exploits vulnerability. Study observable mechanisms and protective reasoning without learning to engineer pressure on other people.',
  sections:[
   section('Distinguish influence, persuasion and coercion',
    'A request states what someone wants and permits a meaningful no. Persuasion openly offers reasons that can be questioned. Manipulation may conceal material facts, selectively present information or use emotional leverage to redirect a choice; coercion introduces threats or penalties that undermine free consent. Boundaries can be firm without being manipulative, and not every disappointing conversation is abusive. The pattern, stakes and consequences matter more than one keyword used in an argument.'),
   section('Identify pressure in behavior, not mind-reading',
    'Observable mechanisms include fabricated urgency, repeated guilt demands, threats to withdraw essential support, isolation from independent advice, denial of promised terms, and sudden rewards after compliance. Record the actual request, who benefits, what the listener loses, whether the person can safely refuse and whether consequences follow refusal. Private intent is often unknown. You can reject a risky demand even if you cannot prove an elaborate hidden plan.'),
   section('Distinguish ordinary mistakes from a recurring pattern',
    'Someone may forget a promise, communicate badly or react defensively once. Repeated rewriting of agreed facts, retaliation for questioning, escalating conditions and punishment after an asserted boundary are stronger grounds for concern. Corroborating records and independent perspectives can help, but keeping evidence is not always safe for someone under surveillance. The point is not to use a checklist to diagnose the other person; it is to understand control over information and options.'),
   section('Learn protective rather than retaliatory responses',
    'Slow an urgent demand when safe, verify claims using independent channels and compare the actual consequences of saying no. Keep reasonable control of personal information, money and support networks. A brief boundary such as “I will decide after reviewing the terms” can prevent rushed commitments. Do not respond with fabricated threats, secret retaliation or manipulative counter-tests. If pressure escalates into threats or violence, prioritize a safe exit and appropriate trusted or emergency support rather than confrontation.'),
   section('Recognize the limits of a case study',
    'A written scenario rarely captures the full context of power, dependency, danger and culture. A single body-language cue cannot reveal deception. Repeated coercive behavior may merit safety action while a motive label remains uncertain. General guidance cannot determine a person’s clinical diagnosis or legal guilt. Responsible learning keeps observations, hypotheses and safety choices distinct.')
  ],
  example:'An acquaintance offers help with tuition and later insists the recipient must surrender banking credentials as proof of gratitude. When they refuse, the acquaintance threatens to cut off all help and spread rumors. The protective analysis identifies the credential request, leverage, threatened consequence and lack of free consent. The recipient does not need to prove the acquaintance’s inner motive to decline sharing passwords. If support is essential or the threat escalates, involving trusted services and building a safe alternative takes priority over winning an argument.',
  flow:flow('Analyze and respond to a coercive request',[
   ['Identify the requested action','Name the behavior, information or resource being demanded.'],
   ['Locate the leverage','Look for threats, withheld options, misleading terms or vulnerability.'],
   ['Assess safe refusal','Consider consequences, dependency, documentation and trusted support.'],
   ['Protect agency','Verify independently, decline where safe and prioritize safety over confrontation.']
  ],'Understanding exploitation is for protection and ethical literacy, not instructions for harming others.'),
  task:'Analyze a fictional relationship or commercial pressure scenario. Write separate lists of observable demands, missing information, incentives, threats and signs that the request could be ordinary. Explain two possible interpretations without declaring a diagnosis. Draft a safe boundary and an alternative support path; describe when direct confrontation would increase danger and a different response is preferable.'
 }
};
