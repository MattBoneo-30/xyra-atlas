import { DEEP_TRACKS } from './deeptracks.js';
import {attachFrontierWorkshops} from './frontiercurriculum.js';
import {attachCalibrationLabs} from './calibrationlabs.js';
import {DEEPER_FOUNDATIONS} from './depthcurriculum.js';
import {deepenOriginalFoundations} from './foundationdepth.js';
import {deepenIntermediateLessons} from './intermediatedepth.js';
import {deepenAdvancedLessons} from './advanceddepth.js';
import {extendScienceWithAstronomy} from './scienceastronomy.js';
import {attachTransferLabs} from './transferlabs.js';
import {attachCrossSubjectMissions} from './crosssubjectmissions.js';
import {attachDecisionRevisions} from './decisionrevisions.js';
import {attachEvidenceInquiries} from './evidenceinquiries.js';
import {attachPracticalStudios} from './practicalstudios.js';
import {attachFoundationDiagnostics} from './foundationdiagnostics.js';
import {attachBeginnerWorkshops} from './beginnerworkshops.js';
import {attachPortfolioJourneys} from './portfoliojourneys.js';
import {validateResponseSimulations} from './responsesimulations.js';
import { FIELD_GUIDES } from './fieldguides.js';
import { LIFE_PRACTICE } from './lifepractice.js';
import { MASTERY_TRACKS } from './masterytracks.js';
import { CAPSTONE_LABS } from './capstonelabs.js';
import { PH_CASEWORK } from './phcasework.js';
import { ADVANCED_ENRICHMENTS } from './advancedenrichments.js';
import { FOUNDATION_CASES } from './foundationcases.js';
import { FOUNDATION_CASES_TWO } from './foundationcases2.js';
import {deepenCriticalFoundation} from './criticalfoundation.js';
import {deepenGeneralFoundation} from './generalfoundation.js';
import {deepenAppliedFoundation} from './appliedfoundation.js';
/** Xyra Atlas starter curriculum. Educational content is general information, not professional advice. */
const lesson = (id, title, minutes, stage, intro, first, second, task, question, options, correct, explanation) => ({
  id, title, minutes, stage, intro,
  sections: [
    { heading: first[0], body: first[1] },
    { heading: second[0], body: second[1] }
  ],
  task, quiz: { question, options, correct, explanation }
});
const course = (id,title,subtitle,icon,art,tag,lessons,{dark=false,featured=false}={}) => ({
  id,title,subtitle,icon,art,tag,lessons,dark,featured
});
export const COURSES = [
  course('psychology','Psychology','Understand your mind, feelings and the people around you.','brain','course-psychology','Mind & behavior',[
    lesson('thoughts','Thoughts are not facts',8,'Beginner','Your brain constantly predicts, filters and interprets events.',
      ['The interpretation gap','An event and your interpretation of it are different. “They did not reply” is observable; “they hate me” is a guess.'],
      ['Challenge your first story','Ask what else could explain the situation. Look for evidence against the strongest interpretation, not just evidence for it.'],
      'Write down one stressful thought, two alternative explanations and the evidence for each.','Which sentence is an observation?', ['They dislike me','They have not replied for two days','They are ignoring me on purpose'],1,'Only the time without a reply is directly observable.'),
    lesson('biases','The traps of cognitive bias',10,'Beginner','Mental shortcuts help us decide quickly, but they also distort judgment.',
      ['Confirmation bias','We naturally notice support for what we already believe, and overlook contradictions.'],
      ['Make room for disproof','Try “What would change my mind?” Use independent sources and compare against plausible alternatives.'],
      'Pick a strong opinion and find one trustworthy counterargument.','What best counters confirmation bias?', ['Search only supporters','Consider a good opposing explanation','Trust the first impression'],1,'Deliberately seeking disconfirming evidence reduces one-sided judgment.'),
    lesson('emotions','Regulate before you react',9,'Intermediate','Regulation means responding to emotions without letting them drive every choice.',
      ['Name the emotion','Labeling what you feel can create enough distance to choose your next move. Emotions provide information, not orders.'],
      ['A short reset','Pause, breathe slowly, relax your shoulders, and ask what response aligns with your values. Strong distress may need support from a professional.'],
      'Try a 60-second pause before replying to a frustrating message.','Healthy regulation means...', ['Never feel angry','Notice feelings and respond intentionally','Always suppress sadness'],1,'Regulation is choice and awareness, not emotional suppression.'),
    lesson('attachment','Patterns in relationships',11,'Advanced','Learn why our expectations affect closeness and conflict.',
      ['Patterns, not labels','Attachment language can describe tendencies, but it is not a diagnosis or a fixed identity.'],
      ['Create secure habits','Practice consistency, clear needs, listening and repair after conflict rather than testing another person.'],
      'Write a boundary and a direct request that do not blame the other person.','What builds relational trust?', ['Secret tests','Consistent behavior and direct communication','Reading someone’s mind'],1,'Reliability and direct conversation build trust more than hidden tests.')
  ],{featured:true}),
  course('laws','Laws & Your Rights','Understand legal essentials and ask better questions.','scale','course-laws','Civic literacy',[
    lesson('legal-basics','How a legal system works',10,'Beginner','Know the difference between laws, regulations, contracts and court decisions.',
      ['Sources of law','Constitutions, statutes, regulations and case law have different authority. The exact hierarchy depends on your jurisdiction.'],
      ['Use primary sources','When stakes matter, check official legislation, government guidance and qualified local counsel. A blog is not legal authority.'],
      'Find your jurisdiction’s official legislation website and bookmark it.','What is the most reliable starting point for a legal rule?', ['An anonymous viral post','An official legal source','A meme about the law'],1,'Original legal texts and official sources are the strongest starting point.'),
    lesson('contracts','Read before you agree',12,'Beginner','A signature, checkbox or verbal agreement can carry obligations.',
      ['Terms worth checking','Parties, payment, scope, deadlines, cancellation, renewal, penalties, privacy and dispute provisions matter.'],
      ['Negotiating a fair term','Ask for unclear clauses in plain language and request written changes. Keep a copy of what was agreed.'],
      'Review a sample subscription agreement for auto-renewal and cancellation conditions.','Which is a contract red flag?', ['Clear prices','A vague fee that can change without notice','A written cancellation process'],1,'Unclear and unilateral fee changes deserve extra scrutiny.'),
    lesson('consumer','Consumer rights & complaints',11,'Intermediate','Protect yourself in purchases, deliveries and digital services.',
      ['Build a paper trail','Keep receipts, screenshots, warranty text, dates, and communication records. Remedies depend on local law.'],
      ['Escalate methodically','Contact the seller clearly, explain what went wrong, specify a reasonable remedy, and use an official complaints route when needed.'],
      'Draft a calm three-sentence refund request with a date and receipt reference.','What strengthens a complaint?', ['A threat without evidence','A precise timeline with supporting records','Only an angry comment'],1,'Specific facts and documentation make issues easier to assess.'),
    lesson('privacy-law','Privacy & digital rights',12,'Advanced','Your information has value and obligations often follow its collection.',
      ['Consent is contextual','A privacy notice, legal basis and the ability to exercise rights may be relevant depending on where you live.'],
      ['Practical response','Limit permissions, download your records where possible, and use official complaint or data-access channels.'],
      'Audit the permissions granted to three mobile apps.','What is a sound privacy habit?', ['Give all apps every permission','Grant only access needed for the function','Post sensitive data publicly'],1,'Permission minimization reduces unnecessary exposure.')
  ]),
  course('business','Business & Entrepreneurship','From a useful problem to a sustainable business.','briefcase','course-business','Build & create',[
    lesson('customer','Start with a real customer problem',10,'Beginner','Do not fall in love with the solution before confirming the need.',
      ['Observe and interview','Ask what people already do, what frustrates them, and what they have tried. Avoid leading questions.'],
      ['Test demand','A small landing page, demo, pre-order or paid pilot may teach more than months of building.'],
      'Interview two potential customers without pitching your idea.','What validates demand best?', ['Friends saying “nice idea”','Evidence that people will actually use or pay','Your personal excitement'],1,'Real behavior is stronger evidence than compliments.'),
    lesson('pricing','Pricing, costs and profit',12,'Beginner','Revenue and profit are not the same thing.',
      ['Map the costs','Separate fixed costs, variable costs and taxes. Estimate customer acquisition, refunds and support.'],
      ['Test the unit economics','Contribution per sale equals selling price minus variable cost. It must help cover fixed expenses.'],
      'Estimate cost and contribution for one product or service.','If a sale brings ₱500 and variable cost is ₱300, contribution is...', ['₱200','₱500','₱800'],0,'₱500 minus ₱300 equals ₱200 before fixed costs and taxes.'),
    lesson('sales','Sell with clarity, not pressure',11,'Intermediate','Ethical sales connects genuine needs to a suitable offer.',
      ['Discover first','Ask about goals, constraints, budget and the consequences of doing nothing. Listen more than you speak.'],
      ['Make an honest offer','Explain outcomes, limitations, price, terms and any uncertainty. Give people room to decline.'],
      'Write a six-line offer describing who it helps and what it cannot do.','What makes a sustainable sale?', ['Hidden terms','A good fit and clear expectations','Invented scarcity'],1,'Clarity and product fit are more durable than pressure.'),
    lesson('systems','Build systems that scale',13,'Advanced','Growth becomes fragile without repeatable processes.',
      ['Document repeatable work','Use checklists for quality, payments, support, backups and delivery. Track a few meaningful metrics.'],
      ['Improve the bottleneck','Find the step limiting results and improve it before adding new complexity.'],
      'Document the five steps of fulfilling one customer order.','Which metric is more useful?', ['Vanity views alone','Customer retention and contribution margin','Number of colors in the logo'],1,'Retention and margin link more directly to business health.')
  ]),
  course('savings','Money & Savings','Build stability before chasing wealth.','wallet','course-savings','Financial confidence',[
    lesson('cashflow','Know where money goes',9,'Beginner','Financial confidence starts with visibility, not perfection.',
      ['Four simple buckets','List income, essential bills, flexible spending and savings/debt payments. Separate needs from preferences.'],
      ['Review without shame','Check recent transactions and spot repeat costs. Small recurring costs can matter more than rare purchases.'],
      'Track every expense for seven days using a note or spreadsheet.','What is the first step to a useful budget?', ['Buy stocks immediately','Understand actual income and spending','Ignore irregular bills'],1,'Start from real cash flow before deciding allocations.'),
    lesson('emergency','Create an emergency fund',10,'Beginner','Emergency savings cushion unexpected expenses.',
      ['Size for your reality','A common starting target is one month of essentials, then gradually several months. Needs vary by income stability and dependents.'],
      ['Keep it accessible','Use a reasonably secure, liquid place. Emergencies should not depend on volatile investments.'],
      'Calculate one month of essential expenses and pick a small first milestone.','Where should emergency money generally be?', ['Easy to access and relatively safe','Locked in a speculative coin','All spent on rewards'],0,'Liquidity and stability matter more than chasing return.'),
    lesson('debt','Debt, interest and risk',12,'Intermediate','Know the actual cost of borrowing before signing.',
      ['Compare total cost','Look at effective rates, fees, penalties and repayment schedule—not just a low-looking monthly payment.'],
      ['A repayment strategy','Pay required minimums; then prioritize costly debt while keeping essential expenses covered. Seek regulated help if overwhelmed.'],
      'Compare two hypothetical loans by total repayment, not only installment size.','What matters most in a loan comparison?', ['Payment size alone','Total cost and terms','Advertising color'],1,'Fees, effective interest and terms change the real cost.'),
    lesson('investing','Investing without the hype',13,'Advanced','Understand risk, diversification and time horizon.',
      ['Risk comes first','High possible return usually carries uncertainty. Verify providers and avoid guaranteed-profit claims.'],
      ['Diversify deliberately','Match any investment to time horizon, liquidity needs and tolerance for loss. Fees compound too.'],
      'List three risks you would need to understand before investing.','A guaranteed high return with no risk is...', ['A reason to verify carefully','Always legitimate','The same as insured savings'],0,'Unusually certain high returns are a common warning sign.')
  ],{featured:true}),
  course('time','Time & Focus','Protect attention and make plans you can keep.','clock','course-time','Personal systems',[
    lesson('priorities','Find the next important action',8,'Beginner','Being busy is not the same as making progress.',
      ['Choose a meaningful target','Pick one outcome that matters this week; translate it into a concrete next action.'],
      ['Decide what not to do','Time is finite. Removing low-value commitments is often more powerful than adding hacks.'],
      'Write your top goal and the next action you can complete within 20 minutes.','Which is an actionable task?', ['Get better at life','Draft the first paragraph of my CV','Become productive'],1,'A next action is specific enough to begin. Drafting a paragraph produces a specific, observable result that can be started now; the other options describe broad outcomes without an actionable first step.'),
    lesson('focus','Work with your attention',9,'Beginner','Attention is easier to protect than to constantly recover.',
      ['Reduce switching','Silence unnecessary alerts and batch shallow tasks. Select a single visible target.'],
      ['Create a focus block','Set a realistic interval, work on one task, then take a brief break. Adjust timing to your needs.'],
      'Try a 25-minute distraction-light session and note what interrupted you.','What usually helps deep work?', ['Frequent context switching','A clearly defined task and fewer interruptions','More notifications'],1,'Clear boundaries reduce attention fragmentation. A bounded work target and fewer avoidable interruptions reduce context switches. Focus time must still allow important responsibilities, breaks and realistic attention limits.'),
    lesson('review','Build a weekly review',10,'Intermediate','A simple feedback loop helps a plan survive real life.',
      ['Close open loops','Collect scattered tasks, check calendar commitments and flag anything overdue.'],
      ['Adjust the system','Ask what worked, what was too ambitious and what one improvement to try next week.'],
      'Choose a regular 15-minute review time for the coming week.','Why review plans?', ['To punish yourself','To adapt from real evidence','To add tasks forever'],1,'Reviewing supports adaptation rather than rigid perfection.')
  ]),
  course('languages','Language Lab','A practical launchpad for speaking new languages.','languages','course-languages','Words & cultures',[
    lesson('realistic-week','What a week can really do',7,'Beginner','Seven days can build momentum and survival phrases; native-like command takes sustained exposure and practice.',
      ['Build a seven-day sprint','Day 1 sounds; Day 2 greetings; Day 3 essential verbs; Day 4 listening; Day 5 questions; Day 6 role-play; Day 7 conversation and review.'],
      ['Start with high-frequency needs','Prioritize pronunciation, introductions, numbers, directions, time, food and repair phrases such as “Please repeat.”'],
      'Choose a language in Language Lab and set a realistic seven-day goal.','What is a realistic one-week objective?', ['Guaranteed native fluency','A small repertoire of usable phrases','Complete mastery of all grammar'],1,'Fluency develops over far more practice than one week.'),
    lesson('pronunciation','Train your ears first',10,'Beginner','Understanding sounds supports both listening and speaking.',
      ['Notice unfamiliar contrasts','Listen for sounds that are not present in your native language. Do not rely only on spelling.'],
      ['Use feedback','Record yourself, imitate short native examples and get correction from a fluent speaker or quality resource.'],
      'Repeat a useful phrase five times, recording attempt one and attempt five.','What supports pronunciation?', ['Only reading translations','Listening, imitation and feedback','Avoiding speech until perfect'],1,'Active listening and targeted feedback are key tools.'),
    lesson('chunks','Learn phrases, not word lists',9,'Intermediate','Useful chunks let you speak before grammar feels automatic.',
      ['Retrieval beats rereading','Recall a phrase from memory rather than reviewing it passively. Increase intervals between successful attempts.'],
      ['Practice in context','Build tiny scripts: ordering food, asking directions, a brief introduction, and asking someone to slow down.'],
      'Write and rehearse a five-line interaction you might actually need.','Which practice improves recall?', ['Active retrieval','Highlighting the same page forever','Skipping repetition'],0,'Retrieving knowledge strengthens later access. Trying to produce the phrase before checking it exercises retrieval. Repeated highlighting may improve familiarity but does not prove spontaneous recall or correct pronunciation.'),
    lesson('conversation','Break the speaking barrier',12,'Intermediate','Conversation is an imperfect skill you build by doing.',
      ['Prepare repair phrases','“How do you say…?” and “Could you say that slowly?” keep conversations alive even with limited vocabulary.'],
      ['Keep a correction log','Record only a handful of recurring mistakes; focus on accuracy gradually while preserving confidence.'],
      'Do a three-minute voice note introducing yourself without reading a script.','What is a useful conversation strategy?', ['Pretend you understand','Ask for clarification','Memorize complex essays only'],1,'Repair questions keep meaning clear. Clarifying questions preserve shared understanding when vocabulary is limited. Guessing or pretending to understand can create errors, especially when the details matter.'),
    lesson('native-like','A long-term proficiency roadmap',14,'Advanced','Real proficiency includes listening speed, idiom, culture and context.',
      ['Measure function, not fantasy','Track whether you can hold conversations, understand everyday media, read authentic material and write to an audience.'],
      ['Keep difficulty just above comfort','Combine comprehensible input, speaking, spaced practice and feedback. Expand domains steadily.'],
      'Pick one measurable three-month language goal.','What points toward higher proficiency?', ['Daily meaningful use with feedback','Only seven days of memorization','Never encountering real speech'],0,'Sustained, varied practice builds durable language skill.')
  ],{featured:true}),
  course('communication','Communication','Speak clearly, listen deeply and set boundaries.','message','course-communication','Relationships & work',[
    lesson('listen','Listen to understand',8,'Beginner','Good conversation starts before your reply.',
      ['Listen for meaning','Notice facts, feelings and needs. Reflect back what you heard instead of immediately solving.'],
      ['Ask open questions','“What was the hardest part?” often reveals more than “Are you fine?”'],
      'In your next conversation, summarize before offering advice.','What is active listening?', ['Preparing your comeback','Reflecting the message and asking questions','Interrupting to fix everything'],1,'Reflection and curiosity communicate attention. Reflection tests whether the meaning was understood, while an open question allows the speaker to correct your assumptions before you offer a solution.'),
    lesson('boundaries','Say no without cruelty',10,'Intermediate','Boundaries clarify what you will and will not do.',
      ['Own your position','Use direct language: “I can help tomorrow, not tonight.” Avoid excessive explanations.'],
      ['Follow through','A boundary is most reliable when paired with a consistent, proportionate action.'],
      'Write a kind but firm response to an unreasonable request.','Which is a healthy boundary?', ['Silent punishment','Clear limits and respectful follow-through','Trying to control someone’s thoughts'],1,'Boundaries describe your limits and choices. A clear boundary states what you will do and follows through proportionately. It does not require controlling another person\'s thoughts or punishing them into agreement.'),
    lesson('conflict','Repair after conflict',11,'Advanced','Disagreement need not destroy cooperation.',
      ['Describe impact','Name a specific behavior and its effect without diagnosing someone’s personality.'],
      ['Seek repair','A genuine apology names the action, accepts responsibility and follows through with change.'],
      'Rewrite a blaming accusation as a clear observation and request.','What makes an apology stronger?', ['“Sorry you feel that way”','Owning the behavior and changing it','Demanding immediate forgiveness'],1,'Accountability and action are central to repair. Owning a specific action and changing it gives the other person observable evidence of repair; demanding forgiveness or deflecting responsibility undermines the apology.')
  ]),
  course('thinking','Critical Thinking','Spot weak claims, confusion and false certainty.','spark','course-thinking','Mental tools',[
    lesson('evidence','Evidence versus assertion',9,'Beginner','Confidence is not a substitute for proof.',
      ['Understand the claim','Ask what exactly is being asserted, what would count as evidence and what would disprove it.'],
      ['Trace the source','Prefer primary documents, quality research and transparent methods when possible.'],
      'Investigate one striking headline before sharing it.','Which question helps evaluate a claim?', ['Who said it loudly?','What evidence supports it?','How viral is it?'],1,'Claims need support independent of confidence or popularity.'),
    lesson('causation','Correlation is not causation',11,'Intermediate','Two trends can move together without one causing the other.',
      ['Look for confounders','A third factor may explain both observations. Consider selection bias and reverse causality.'],
      ['Compare better evidence','Well-designed experiments or careful natural experiments can improve causal inference.'],
      'Find one correlation online and sketch two alternative explanations.','Two variables move together. What follows?', ['One definitely causes the other','A causal link needs more evidence','The numbers are fake'],1,'Correlation alone cannot establish causation. The association may reflect confounding, reverse influence, bias or a direct effect. Comparing plausible explanations and stronger study designs is necessary before a causal claim.'),
    lesson('arguments','Disagree without losing clarity',10,'Advanced','The strongest critique targets the strongest fair version of an argument.',
      ['Steelman first','Restate the opposing position accurately enough that its supporter would recognize it.'],
      ['Separate values and facts','Some disagreements involve different priorities, not only a missing statistic.'],
      'Write a fair summary of a view you oppose before responding.','What is steelmanning?', ['Mocking a weak claim','Presenting a view in its strongest fair form','Changing the subject'],1,'A fair reconstruction improves real dialogue. Steelmanning means representing the strongest reasonable version of another position before critiquing it, not inventing weaknesses or pretending unsupported claims have equal evidence.')
  ]),
  course('digital','Digital & AI Literacy','Stay safe, verify outputs and use technology well.','shield','course-digital','Modern essentials',[
    lesson('passwords','Your digital security baseline',9,'Beginner','Simple security habits prevent many common compromises.',
      ['Use unique credentials','A password manager and unique strong passwords reduce credential reuse risk. Enable multi-factor authentication.'],
      ['Keep recovery current','Secure your recovery methods and update software. Treat unexpected login prompts cautiously.'],
      'Check whether your key accounts use unique passwords and MFA.','Which practice is safest?', ['Reuse a clever password','Unique passwords plus MFA','Share recovery codes in chat'],1,'Compromised reuse passwords can cascade into other accounts.'),
    lesson('scams','Recognize phishing & scams',11,'Intermediate','Fraud often relies on urgency, secrecy and authority.',
      ['Slow the clock','Verify unexpected requests using an independently found contact method. Never trust caller ID alone.'],
      ['Protect private data','Do not hand over one-time codes, recovery keys or remote-device access after an unsolicited contact.'],
      'Write down a simple verification checklist for payment requests.','A caller demands a login code immediately. You should...', ['Share it to resolve urgency','Verify independently and keep code private','Ask them for a better story'],1,'Authentication codes should not be disclosed to an unsolicited caller.'),
    lesson('ai','Use AI without surrendering judgment',12,'Advanced','Generated answers can be fluent and still incorrect.',
      ['Check material facts','Verify legal, medical, financial and technical claims against trusted current sources.'],
      ['Protect sensitive inputs','Avoid pasting passwords, personal records or private documents without understanding the provider and controls.'],
      'Fact-check three specific claims in an AI-generated answer.','What is a sound AI habit?', ['Assume all confident answers are true','Verify high-stakes claims','Share secrets to get faster results'],1,'High-stakes decisions require verification. A confident output can still contain invented citations or incorrect facts; independent primary-source verification and privacy review matter before consequential use.')
  ]),
  course('career','Career & Work','Build skills, opportunities and a compelling portfolio.','rocket','course-career','Your future',[
    lesson('skills','Map a valuable skill',8,'Beginner','Your career is built through evidence of ability.',
      ['Choose a practical target','Study real job descriptions and note recurring tasks, tools and expected outcomes.'],
      ['Learn by producing','Create small public or private projects that prove a specific capability.'],
      'Choose one skill and outline a 14-day portfolio project.','What shows skill more clearly?', ['Only a buzzword list','A relevant completed project','An untested promise'],1,'Demonstrable work is strong evidence of practical skill.'),
    lesson('portfolio','Make a portfolio that earns trust',11,'Intermediate','Explain the problem, your role, your decisions and the result.',
      ['Show your reasoning','Use concise case studies with honest screenshots, trade-offs and measured outcomes.'],
      ['Respect confidentiality','Use permission, anonymized examples or recreated demos when work is private.'],
      'Draft a short case study using problem → action → result.','What belongs in a portfolio case study?', ['Invented metrics','Your actual role and outcome','Only decoration'],1,'Specific, truthful evidence earns confidence. Verifiable responsibility, tradeoffs and actual outcomes let reviewers judge your contribution. Unsupported metrics and decoration alone cannot establish real impact.'),
    lesson('negotiate-work','Negotiate compensation fairly',12,'Advanced','Good negotiations are prepared and grounded in mutual value.',
      ['Research your range','Compare similar roles, locations and responsibilities; consider non-salary factors.'],
      ['Make a specific case','Explain measurable contributions, ask for a clear range and leave room for discussion.'],
      'Practice a respectful salary conversation aloud.','What improves a negotiation?', ['Bluffing about offers','Market evidence and a clear request','Threatening a colleague'],1,'Evidence and clarity are more effective than deception.')
  ]),
  course('science','Science & The World','Explore how science tests explanations.','orbit','course-science','Curiosity',[
    lesson('method','Think like a scientist',9,'Beginner','Science is a process for revising claims in light of evidence.',
      ['Ask testable questions','Separate predictions from observations and choose measurable outcomes.'],
      ['Accept revision','A good model changes when stronger evidence appears. Uncertainty can be useful, not shameful.'],
      'Turn a vague curiosity into a testable question.','What is a strength of science?', ['Never changing a theory','Testing and revising models','Only collecting opinions'],1,'Revision in response to evidence is a feature of science.'),
    lesson('probability','Understand uncertainty',11,'Intermediate','Probabilities describe possible outcomes, not personal guarantees.',
      ['Read denominators','A risk increase may sound large until you inspect baseline risk and sample size.'],
      ['Distinguish confidence','A forecast is not certainty. Look for error bars, missing data and reasonable alternatives.'],
      'Find a statistic and rewrite it with its denominator.','A rise from 1% to 2% is...', ['A one-percentage-point increase','A 100-percentage-point increase','No change'],0,'The absolute increase is one percentage point. The percentage-point change is two percent minus one percent, or one point; the relative increase is 100 percent. Both need the baseline and population context.'),
    lesson('systems','See connected systems',12,'Advanced','Many problems emerge from loops, delays and incentives.',
      ['Trace consequences','Identify inputs, outputs, feedback and delays. Avoid assuming a single cause.'],
      ['Look for leverage','Small structural changes sometimes beat repeated one-time fixes.'],
      'Sketch a feedback loop affecting your sleep or productivity.','A feedback loop describes...', ['An isolated fact','How an output influences future behavior','A random opinion'],1,'Systems thinking considers consequences across time.')
  ]),
  course('relationships','Relationships & Wellbeing','Build mutual respect, healthy habits and resilience.','heart','course-relationships','Care & connection',[
    lesson('trust','Build trust through actions',9,'Beginner','Trust grows through reliability, transparency and repair.',
      ['Small promises matter','Follow through on reasonable commitments and communicate promptly when plans change.'],
      ['Mutual agency','A healthy relationship respects both people’s choices, social ties and boundaries.'],
      'Identify one small promise you can consistently keep.','What builds trust?', ['Constant monitoring','Reliable behavior and respect','Secret loyalty tests'],1,'Consistent behavior matters more than control. Repeated, voluntary reliability supports trust while monitoring and secret tests constrain autonomy. People can still disagree about boundaries without losing mutual respect.'),
    lesson('conflict-care','Spot unhealthy patterns',11,'Intermediate','Patterns matter more than isolated moments.',
      ['Look at behavior','Repeated isolation, threats, humiliation, pressure, or controlling access to money can be warning signs.'],
      ['Seek support safely','If you feel unsafe, prioritize a trusted support network and local professional resources. Avoid escalating confrontations.'],
      'Write a list of healthy boundaries you expect in a relationship.','What is a warning sign?', ['Respecting time alone','Repeated threats to control behavior','A calm request'],1,'Threats and coercive control are not healthy disagreement.'),
    lesson('wellbeing','Basics that support wellbeing',10,'Intermediate','Sleep, movement, connection and routines support health without guaranteeing any outcome.',
      ['Build sustainable basics','Start with consistent sleep opportunities, regular movement, nourishment and meaningful social connection.'],
      ['Know when to ask for help','A professional can help when symptoms persist or interfere with daily life. General guidance is not a diagnosis.'],
      'Pick one sustainable habit to practice this week.','What is a realistic change strategy?', ['Change everything overnight','Start small and adjust','Avoid all support'],1,'Small consistent habits are easier to maintain. A small feasible habit is easier to observe and adapt than an overnight overhaul. This is general wellbeing education, not a diagnosis or replacement for professional care.')
  ]),
  course('negotiation','Influence & Negotiation','Understand persuasion without becoming coercive.','compass','course-negotiation','People skills',[
    lesson('persuasion','Persuasion versus manipulation',10,'Beginner','Influence becomes unethical when it relies on deception or overrides informed choice.',
      ['Understand the difference','Persuasion presents relevant reasons openly. Manipulation conceals key information or exploits fear and vulnerabilities.'],
      ['Use informed choice','State your interests, show trade-offs, invite questions and accept a no.'],
      'Rewrite a pushy sales pitch to explain real pros, cons and cost.','What is ethical persuasion?', ['Concealing critical terms','Presenting truthful reasons and respecting refusal','Creating false urgency'],1,'Informed choice separates persuasion from coercion.'),
    lesson('anchors','Anchors and framing',11,'Intermediate','The first number or framing can shift how an offer feels.',
      ['Spot an anchor','Opening prices, comparisons and suggested defaults can affect perceived value. Do not let an unrelated number define your decision.'],
      ['Prepare a reference point','Research independent benchmarks and your walk-away criteria before bargaining.'],
      'Compare a product price against two independent references.','How can you resist arbitrary anchors?', ['Accept the first number','Use independent benchmarks','Hide relevant information'],1,'External comparisons reduce dependence on the first number.'),
    lesson('hard-talks','Navigate difficult discussions',12,'Advanced','Preparation helps you stay clear when stakes are high.',
      ['Separate positions from interests','“I need Friday off” is a position; the underlying interest may be family time or recovery.'],
      ['Offer options','Develop a few solutions that could serve both parties; do not promise what you cannot deliver.'],
      'Practice a difficult ask with two possible compromises.','What often improves negotiations?', ['Identifying underlying interests','Inventing consequences','Threatening someone’s job'],0,'Interests create more options than rigid positions.')
  ]),
  course('shadow','The Shadow Library','Understand manipulation, deception, power and adult realities.','moon','course-shadow','18+ • Difficult knowledge',[
    lesson('manipulation','How manipulation actually works',13,'Beginner','Manipulation uses hidden pressure, distorted information or exploited vulnerability to redirect a person’s choices.',
      ['Recognize recurring mechanisms','Guilt, manufactured urgency, selective disclosure, intermittent approval and isolation can each distort free choice. A single behavior is not a diagnosis.'],
      ['Analyze without imitating','Identify the requested action, the leverage being applied and what information is missing. Protect your time, verify facts and consult someone independent.'],
      'Analyze a fictional pressure scenario: identify the pressure, missing facts and a boundary.','What best signals manipulative pressure?', ['An honest request you can decline','A threat that punishes you for asking questions','A clear explanation of options'],1,'Punishing questions undermines informed choice. A threat for asking ordinary questions removes meaningful room to choose. The protective goal is to recognize pressure, slow down and seek safe support, not imitate the tactic.'),
    lesson('gaslighting','Gaslighting and reality confusion',12,'Intermediate','Gaslighting is a pattern of undermining a person’s trust in their perception or memory.',
      ['Separate mistakes from patterns','People disagree and misremember. Look for repeated denial, manufactured doubt, and power imbalance rather than labeling every disagreement.'],
      ['Ground yourself','Keep factual records where safe, check outside perspectives and focus on observable behavior. Prioritize safety if coercion is escalating.'],
      'Rewrite a confusing exchange as a neutral timeline of what was actually said.','What distinguishes a serious concern?', ['One ordinary disagreement','Repeated reality distortion and coercive patterns','Having different tastes'],1,'Patterns and their impact matter more than a single dispute.'),
    lesson('lies','Lies, omissions and uncertainty',14,'Intermediate','There is no reliable universal body-language trick that proves someone is lying.',
      ['Avoid lie-detection myths','Eye contact, fidgeting or pauses may reflect anxiety, culture or context. They are not dependable proof of dishonesty.'],
      ['Use evidence-based checking','Compare specific claims against documents, timelines and independent evidence; invite clarification without false accusations.'],
      'Assess a fictional inconsistent story using verifiable facts rather than facial expressions.','Which observation proves a lie?', ['Looking away','Nervous hands','Neither proves deception'],2,'Behavioral cues are ambiguous and cannot establish a lie alone.'),
    lesson('mind-games','Mind games and emotional leverage',13,'Intermediate','Hot-and-cold attention, loyalty tests and silent punishment can turn relationships into power struggles.',
      ['Understand the pattern','Track how treatment changes after you comply or assert a boundary. Focus on repeated behavior and impact.'],
      ['Exit the game','Communicate expectations once, avoid retaliatory tactics, and step away from ongoing coercive dynamics when safe.'],
      'Write a clear reply to an ultimatum that asks you to abandon a healthy boundary.','What is a healthy response to a loyalty test?', ['Run a counter-test','Set a boundary and seek direct conversation','Pretend nothing happened'],1,'Directness and boundaries reduce game-playing. A direct boundary preserves personal agency without escalating into another loyalty test. When threats or coercion appear, prioritize safety rather than forcing a conversation.'),
    lesson('dark-patterns','Dirty tricks in marketing and apps',13,'Advanced','Dark patterns use interface design to push choices users did not intend.',
      ['Inspect the design','Watch for hidden cancellation, confirmshaming, preselected extras, misleading countdowns and distorted button prominence.'],
      ['Protect agency','Slow down, inspect totals, read recurring charges and use screenshots or official complaint routes if needed.'],
      'Audit a sample checkout flow for three questionable design choices.','Which is a dark pattern?', ['Clearly labeled cancel button','Disguised recurring charge','Equal-weight opt-in and opt-out'],1,'Concealing financial commitment undermines informed consent.'),
    lesson('sex-consent','Adult intimacy, consent and boundaries',15,'Beginner','Sexual wellbeing depends on mutual respect, clear consent and reliable information.',
      ['Consent is freely given','Consent must be voluntary, informed, specific and reversible. Pressure, threats or incapacity undermine consent.'],
      ['Health and communication','Discuss boundaries, contraception, STI prevention and testing with partners and qualified healthcare providers. No single method prevents all risks.'],
      'Write a respectful example of checking comfort and accepting a no.','Can consent be withdrawn?', ['Yes, at any time','Only before intimacy begins','Only with a written reason'],0,'Consent remains reversible. Agreement to one act does not permanently authorize another; meaningful consent is voluntary, specific and can be withdrawn. Respecting a no requires stopping without punishment.'),
    lesson('adult-media','Pornography, expectations and reality',12,'Intermediate','Adult media is produced entertainment, not a guide to health, relationships or consent.',
      ['Distinguish performance from life','Editing, staging, scripts and economic incentives can produce unrealistic expectations about bodies and intimacy.'],
      ['Use reliable sources','For sexual health questions, prefer qualified clinicians and public health organizations. Protect privacy and avoid nonconsensual content.'],
      'List three reasons entertainment should not be treated as sexual health education.','What is a sound source for health decisions?', ['A staged video','Evidence-based healthcare information','An anonymous rumor'],1,'Clinical and public-health sources are more reliable for health information.')
  ],{dark:true,featured:true})
];
deepenCriticalFoundation(COURSES);
deepenGeneralFoundation(COURSES);
deepenAppliedFoundation(COURSES);
for(const entry of COURSES){
  const extras=ADVANCED_ENRICHMENTS[entry.id]||{};
  for(const original of entry.lessons){
    const addition=extras[original.id];
    if(!addition)continue;
    original.sections.push({...addition.section});
    original.example=addition.example;
    original.sources=addition.sources.map(source=>({...source}));
  }
}
for(const entry of COURSES) {
 const cases=FOUNDATION_CASES[entry.id]||{};
 for(const original of entry.lessons){
  const extra=cases[original.id];
  if(!extra)continue;
  original.sections.push({...extra.section});
  original.example=extra.example;
  original.sources=extra.sources.map(s=>({...s}));
 }
}
for(const entry of COURSES){
 const cases=FOUNDATION_CASES_TWO[entry.id]||{};
 for(const original of entry.lessons){
  const extra=cases[original.id];
  if(!extra)continue;
  original.sections.push({...extra.section});
  original.example=extra.example;
  original.sources=extra.sources.map(source=>({...source}));
 }
}
for(const entry of COURSES) if(DEEP_TRACKS[entry.id]) entry.lessons.push(...DEEP_TRACKS[entry.id]);
for(const entry of COURSES) if(FIELD_GUIDES[entry.id]) entry.lessons.push(...FIELD_GUIDES[entry.id]);
for(const entry of COURSES) if(LIFE_PRACTICE[entry.id]) entry.lessons.push(...LIFE_PRACTICE[entry.id]);
for(const entry of COURSES) if(MASTERY_TRACKS[entry.id]) entry.lessons.push(...MASTERY_TRACKS[entry.id]);
for(const entry of COURSES) if(CAPSTONE_LABS[entry.id]) entry.lessons.push(...CAPSTONE_LABS[entry.id]);
for(const entry of COURSES) if(PH_CASEWORK[entry.id]) entry.lessons.push(...PH_CASEWORK[entry.id]);
// Source-linked teaching chapters augment the existing library without changing stable lesson IDs.
for(const entry of COURSES) if(DEEPER_FOUNDATIONS[entry.id]) entry.lessons.push(...DEEPER_FOUNDATIONS[entry.id]);
// Replace shallow original openers with concept-first teaching; preserve IDs and sources.
deepenOriginalFoundations(COURSES);
// Keep existing lesson identities and recaps, enrich the applied tier.
deepenIntermediateLessons(COURSES);
// Advanced case studies retain the original identity, explanations and source history.
deepenAdvancedLessons(COURSES);
// Adds applied astronomy without changing the 139 stable lesson identities.
extendScienceWithAstronomy(COURSES);
// Independent applied reasoning, attached to 14 existing intermediate lessons.
attachTransferLabs(COURSES);
// Peer-linked subject synthesis without new lesson or progress identities.
attachCrossSubjectMissions(COURSES);
// Revisit an initial intermediate decision when material evidence changes.
attachDecisionRevisions(COURSES);
// One independent evidence investigation per published advanced course.
attachEvidenceInquiries(COURSES);
// Two applied production-and-verification rounds per published advanced subject.
attachPracticalStudios(COURSES);
// Active recall after concept-first teaching across all fourteen subjects.
attachFoundationDiagnostics(COURSES);
// Two-step practical learning beyond initial foundation drills in every subject.
attachBeginnerWorkshops(COURSES);
// Three connected project deliverables per subject, attached to existing stage lessons.
attachPortfolioJourneys(COURSES);
// Two decisions with tailored consequences per subject; no added lesson IDs.
validateResponseSimulations(COURSES);
// Deeper fieldwork without changing any stable lesson identity.
attachFrontierWorkshops(COURSES);
attachCalibrationLabs(COURSES);
export const LANGUAGES = [
  {name:'English',flag:'🇬🇧',code:'en'}, {name:'Japanese',flag:'🇯🇵',code:'ja'},
  {name:'Korean',flag:'🇰🇷',code:'ko'}, {name:'Spanish',flag:'🇪🇸',code:'es'},
  {name:'French',flag:'🇫🇷',code:'fr'}, {name:'Mandarin Chinese',flag:'🇨🇳',code:'zh'},
  {name:'German',flag:'🇩🇪',code:'de'}, {name:'Arabic',flag:'🇸🇦',code:'ar'},
  {name:'Filipino',flag:'🇵🇭',code:'fil'}, {name:'Italian',flag:'🇮🇹',code:'it'},
  {name:'Portuguese',flag:'🇵🇹',code:'pt'}, {name:'Hindi',flag:'🇮🇳',code:'hi'},
  {name:'Thai',flag:'🇹🇭',code:'th'}, {name:'Vietnamese',flag:'🇻🇳',code:'vi'},
  {name:'Indonesian',flag:'🇮🇩',code:'id'}, {name:'Russian',flag:'🇷🇺',code:'ru'},
  {name:'Turkish',flag:'🇹🇷',code:'tr'}, {name:'Dutch',flag:'🇳🇱',code:'nl'},
  {name:'Swedish',flag:'🇸🇪',code:'sv'}, {name:'Greek',flag:'🇬🇷',code:'el'}
];
export const LEARNING_SPRINT = [
  ['Sound map','Find the alphabet or sound system; listen and imitate 10 common sounds.'],
  ['Survival phrases','Practice hello, thank you, sorry, yes/no and “please repeat”.'],
  ['Useful verbs','Build 10 small sentences with high-frequency verbs.'],
  ['Listening day','Repeat short native-language audio and write down what you recognized.'],
  ['Ask questions','Rehearse when, where, how much, how and why.'],
  ['Real-life scenario','Role-play ordering food, asking for help or an introduction.'],
  ['Speak and review','Record a 3-minute conversation and plan your next 30 days.']
];
export const DAILY_NOTES = [
  'The goal is not to know everything. It is to become someone who keeps learning.',
  'A question asked carefully can be more powerful than an answer delivered quickly.',
  'The most useful skill is noticing when your assumptions might be wrong.',
  'Progress grows quietly when you return to the work on ordinary days.',
  'Learn the difficult thing. Keep your kindness while you do.',
  'A clear boundary is not a punishment. It is an act of honesty.',
  'You do not need perfect confidence to take the next small step.'
];
export const findCourse = id => COURSES.find(course => course.id === id);
export const findLesson = (courseId, lessonId) => findCourse(courseId)?.lessons.find(lesson => lesson.id === lessonId);
export const totalLessons = COURSES.reduce((count, item) => count + item.lessons.length, 0);
