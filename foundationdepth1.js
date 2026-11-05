/**
 * Foundational concept-first instructional revisions, part 1/2.
 * Original educational text, not a substitute for human editorial review.
 * Each revision retains its original stable course and lesson identifiers.
 */
const section=(heading,body)=>({heading,body});
const flow=(title,steps,caption)=>({title,steps:steps.map(([label,detail])=>({label,detail})),caption});
export const FOUNDATION_DEPTH_ONE={
 psychology:{
  id:'thoughts',minutes:30,title:'Psychology 101 — Mind, behavior and evidence',
  intro:'Psychology is the scientific study of mind and behavior. Learn how psychologists examine observable actions, internal processes, competing explanations and actual evidence. This is not a course in simply being positive or ignoring warning signs.',
  sections:[
   section('What psychology actually investigates',
    'Psychology studies behavior (what organisms do) and mental processes (memory, attention, perception, emotion, thought and learning). It also asks how development, relationships, environment, biology and culture influence those processes. Cognitive psychology studies thinking and remembering; developmental psychology investigates change across the lifespan; social psychology studies how context and other people influence behavior; clinical psychology is only one applied area. An isolated piece of relationship advice is not a substitute for studying these branches and their methods.'),
   section('Observation versus interpretation versus hypothesis',
    'Separate what happened from how you explain it. “The message was opened at 9:00 and no answer arrived by 18:00” describes an observation if the timestamps are reliable. “The person dislikes me” is an interpretation. “They may be avoiding a difficult conversation” is a testable hypothesis only if we can specify what further observations would discriminate it from other explanations. Psychology does not tell us to reject an interpretation just because it is uncomfortable; it asks how strongly the available evidence supports that interpretation.'),
   section('How psychological evidence is produced',
    'In descriptive studies, researchers observe behavior or ask participants to report experiences. Correlational studies estimate whether variables change together but cannot alone demonstrate that one variable causes another. Experiments compare conditions while trying to limit confounding variables, sometimes assigning participants randomly. Repeated measurements, carefully specified outcomes and independent replication help reduce misleading conclusions. A small convenience sample and a personal story can suggest a question but are not enough to generalize reliably to everyone.'),
   section('When a person may actually be manipulating you',
    'Doubting every instinct can be dangerous if there is repeated coercion. Suppose someone repeatedly threatens to withdraw affection unless you hand over money. Do not reduce this to “your thoughts are not facts.” Describe the actual requests, threats, deadlines and consequences, ideally using records that are safe to keep. Compare alternative explanations, assess the pattern across time and consider the power difference. Even without proof of someone’s private intention, repeated threats or exploitation are behaviorally relevant. Seeking an outside perspective may help; prioritize safety over trying to win a confrontation.'),
   section('What psychology can and cannot conclude',
    'A diagnosis, deception claim or motive attribution cannot be established from one gesture, a screenshot or a short quiz. Different causes can produce similar behavior. An ethical learner states their confidence and uncertainty, considers cultural and situational context, and does not turn theories into labels for strangers. Scientific psychology can still help identify risk patterns and choose safer responses without claiming to read minds. When mental health or safety is at stake, individualized assessment requires an appropriate qualified professional.')
  ],
  example:'A coworker says a manager deliberately excludes them because the manager repeatedly schedules meetings when they are absent. Instead of automatically saying “you are overthinking,” write an observation log of meeting times, notice whether others are excluded, ask what information the organizer had, and look for repeated patterns. A scheduling mistake, an opaque process and deliberate exclusion predict different evidence. Even if intention remains unknown, the organization can improve meeting access and the worker can document the resulting disadvantage. The psychological lesson is disciplined inference, not mandatory optimism.',
  flow:flow('Investigate a psychological explanation',[
   ['Describe the behavior','Record concrete actions, times and circumstances without guessing motivation.'],
   ['List competing hypotheses','Consider ordinary constraints, misunderstanding, habit, and deliberate pressure.'],
   ['Look for discriminating evidence','Compare repeated patterns, records, context and alternative explanations.'],
   ['Act proportionately','Choose a safe response while describing what remains uncertain.']
  ],'Evidence-based caution is compatible with recognizing real manipulation. It does not require excusing repeated harmful conduct.'),
  task:'Choose a fictional situation involving delayed replies, unfair treatment or interpersonal pressure. Write three columns: observations, at least three possible explanations, and information that would distinguish those explanations. Identify one situation where waiting for more evidence is appropriate and one where a safety boundary is appropriate even without proving motive. Conclude with two sentences explaining the limits of your inference.'
 },
 laws:{
  id:'legal-basics',minutes:30,title:'Philippine Law 101 — Constitution, statutes and rights',
  intro:'Before memorizing Republic Act numbers, learn what gives a legal rule authority in the Philippines, how different branches of government operate, and how to read the actual provision that governs a problem.',
  sections:[
   section('Start with jurisdiction and the 1987 Constitution',
    'The Philippines has a written Constitution. Its Article II states general principles and policies, while Article III sets out a Bill of Rights. The Constitution allocates government powers and limits their exercise. A legal question first asks where the event occurred, who the parties are, what kind of dispute is involved and which version of the governing rule applies. An internet answer about another country’s law may sound persuasive but cannot automatically determine a Philippine legal obligation.'),
   section('Who makes, implements and interprets rules?',
    'Congress exercises legislative power under Article VI and ordinarily makes Republic Acts. The President and executive agencies implement laws under Article VII, issuing implementing regulations when authorized and within statutory and constitutional bounds. The judiciary exercises judicial power under Article VIII, resolving actual legal controversies and reviewing particular government actions within its jurisdiction. Executive guidance can clarify compliance but cannot simply override a higher valid law. Courts also rely on procedural rules, evidence and applicable decisions rather than deciding purely from personal fairness.'),
   section('Read a Republic Act in the correct order',
    'Begin with the short title and purpose, then locate definitions, scope, duties, exceptions, penalties and effectivity. Republic Act No. 10173, for example, is the Data Privacy Act of 2012; a learner should examine its definitions and legal bases rather than thinking consent is always the only lawful basis. Republic Act No. 7394 is the Consumer Act of the Philippines, relevant to certain deceptive and unfair trade practices. These statutes cover distinct questions and do not automatically apply to every interaction.'),
   section('Rights are real, but remedies have conditions',
    'A right stated in the Constitution or statute does not imply that every complaint wins immediately. Who may invoke a right, what conduct counts, exceptions, limitation periods, evidence, jurisdiction and the correct administrative or judicial process all matter. For a consumer issue, preserving the original advertisement, receipt and written communications may be as important as citing the right law. For a privacy issue, identify the personal information and processing purpose before selecting a complaint path. Never promise a penalty or damages without checking the particular legal provisions and facts.'),
   section('A practical framework: issue, rule, application and conclusion',
    'Identify the exact disputed act and applicable jurisdiction. Find the authoritative legal text, quote the relevant section number in your own notes and explain the operative terms in plain language. Then compare each legal requirement with known facts and list unresolved questions. Conclude provisionally: “This may engage Article 50 of the Consumer Act if the representation is shown to be deceptive,” rather than “the seller is definitely guilty.” Use current official publications and qualified Philippine counsel for consequential decisions.')
  ],
  example:'Suppose a shopping site advertises a phone as “brand new” but the delivered unit appears to have a replaced battery. Do not begin with a guessed prison sentence. First establish where the seller and transaction are regulated, preserve the listing and receipt, and verify whether the unit was reconditioned. Read RA 7394, particularly the provisions on deceptive representations, and separate facts from claims. Request a documented response from the seller, then examine the proper agency or dispute procedure. The outcome is conditional on what the evidence proves and which remedy the governing law permits.',
  flow:flow('Reason from a real Philippine legal question',[
   ['Jurisdiction and facts','Establish where and when conduct occurred and what can be documented.'],
   ['Legal authority','Find the Constitution, applicable Republic Act and valid implementing rules.'],
   ['Requirements and exceptions','Match each element of the rule to verified facts; record missing information.'],
   ['Proper remedy','Identify the official administrative or judicial process and qualify the conclusion.']
  ],'General legal literacy does not replace professional advice; the date and jurisdiction of law matter.'),
  task:'Open the official 1987 Constitution and list the function of Articles III, VI, VII and VIII. Then choose a fictional misleading-product or personal-data scenario and write an IRAC note: identify the issue, the relevant Republic Act and section to read, the specific facts you would need, possible exceptions, and the agency or process to investigate. Do not claim an outcome or invent penalties.'
 },
 business:{
  id:'customer',minutes:28,title:'Validate a customer problem before building',
  intro:'A compelling product idea is a hypothesis about people and a problem. Learn how to test it with interviews, observed behavior and small commitments before spending heavily on design or development.',
  sections:[
   section('Separate the problem from your proposed solution',
    '“People need my scheduling app” assumes a solution. “Small shops lose customer orders because bookings are scattered across chat messages” is a problem statement that can be investigated. Define the affected customer, the repeated job they are trying to accomplish, their existing workaround and the cost of failure. You should be able to describe the problem without using your product name. If the problem disappears when you remove the proposed app, you may be attached to a feature rather than a meaningful unmet need.'),
   section('Conduct interviews that do not ask for compliments',
    'Avoid “Would you use a smart AI booking assistant?” and “Isn’t this a great idea?”; both invite polite speculation. Ask “Tell me about the last time a booking was lost,” “What did you do afterward?” and “What did that cost?” Follow the timeline, ask for a real example, and record the customer’s words separately from your interpretation. Sample people who have the problem, not only friends who want to encourage you. A few interviews generate hypotheses; they do not prove a market-size estimate.'),
   section('Build an evidence ladder',
    'Vague interest is weak evidence. Repeated past behavior, money or time already spent on workarounds, a completed signup followed by actual engagement, and a genuine purchase commitment are progressively more informative, depending on the product. A pre-order can be strong but must be described honestly; a landing-page click alone does not establish willingness to pay. Specify a success criterion in advance, and report both negative and positive results.'),
   section('Design a small, ethical experiment',
    'Offer a manual concierge version of a proposed service to a few real users, with clear terms. Track who returns, what problem is solved, what support time you spend and what users are willing to exchange. Avoid secretly charging people, pretending a nonexistent feature is live or manufacturing scarcity. Keep experiments small enough to learn quickly, but do not mistake an atypical pilot audience for the full market.'),
   section('Decide whether to build, change direction or stop',
    'After each test compare results with the original success threshold. If users enjoy a demo but never return, investigate onboarding, problem frequency and alternatives before writing more code. If several customers already pay for a clumsy workaround, the opportunity may be real but you still need to validate a sustainable delivery model. Record what evidence would change your decision. The goal is not to prove the founder right; it is to reduce uncertainty before expensive commitments.')
  ],
  example:'Imagine five café owners say a reservations dashboard sounds useful. That is encouraging but not yet demand. You then observe that three already spend an hour a day reconciling bookings, two have staff assigned to prevent double-booking, and one agrees to pay for a two-week manual trial. The trial uncovers a bigger problem: cancellations, not new reservations, cause most lost revenue. The next product experiment should focus on confirmation and waitlist handling rather than adding unrelated dashboard charts.',
  flow:flow('From observed problem to small launch',[
   ['Who struggles, and when?','Document an actual recent problem and the current workaround.'],
   ['Which evidence matters?','Compare claimed interest with past behavior and concrete commitments.'],
   ['Run the smallest ethical test','Measure repeat use, cost, willingness to pay and negative feedback.'],
   ['Decide with criteria','Build, revise, retest or stop based on observed outcomes.']
  ],'An attractive UI is not proof of customer demand; learning precedes scaling.'),
  task:'Select one hypothetical product idea. Interview-question design: write six neutral questions about a recent real problem, not future praise. Define one small two-week pilot, its cost, a measurable threshold for success and a failure condition. Create an evidence table with “what the person said,” “what they actually did” and “what remains unknown.” Explain how your plan prevents sunk-cost bias.'
 },
 savings:{
  id:'cashflow',minutes:28,title:'Cash flow: know where your money goes',
  intro:'A personal budget is an evidence-based map of money arriving and leaving over time, not a moral judgment about your spending. Learn to separate amounts, timing, commitments and uncertainty.',
  sections:[
   section('Understand inflows, outflows and the period',
    'Cash flow for a period is cash received minus cash paid. Salary, freelance fees and refunds have different predictability; a pending payment is not money you can necessarily spend today. Outflows include housing, food, transport, debt payments and flexible purchases. Always name the period: a monthly estimate cannot explain a cash shortfall next Tuesday if every bill comes due early. Check both the total and the timing of money.'),
   section('Distinguish fixed, variable and irregular expenses',
    'Fixed commitments tend to recur at a predictable amount and date, such as a contractually set rent payment. Variable costs move with behavior or usage, such as food and transport. Irregular costs include annual fees, repairs, school expenses or replacement devices. Estimate their annual total and divide by twelve to plan monthly reserves; this is a planning approximation, not a guarantee that real emergencies arrive evenly.'),
   section('Work a complete cash-flow calculation',
    'Example: a hypothetical household receives ₱28,000 in a month, pays ₱12,000 for essentials, ₱5,000 in flexible costs, ₱3,000 in required debt payments and sets aside ₱2,000 for irregular expenses. Planned remainder = ₱28,000 − ₱12,000 − ₱5,000 − ₱3,000 − ₱2,000 = ₱6,000. That remainder is not automatically “free money”: it could fund a buffer, emergency savings or future obligations. Include every category once so that the arithmetic is not misleading.'),
   section('Check the calendar, not only the average',
    'Suppose income arrives on the 15th but rent is due on the 5th. The monthly totals may show a surplus while the bank balance goes negative before payday. List cash available at the start of the period, then process transactions in date order to find the lowest projected balance. Prioritize essential bills and required payments, understand fees and due dates, and plan an accessible buffer. When income varies, test a low-income scenario instead of committing every expected peso in advance.'),
   section('Convert the budget into a learning loop',
    'For the next four weeks, compare planned spending with actual transactions, group differences by cause and change one controllable factor at a time. An unexpectedly high grocery bill may reflect price changes, guests or a mistaken estimate, not necessarily lack of discipline. Document what the budget cannot predict and avoid treating rules of thumb as obligations for every household. Seek regulated financial help when debt or essential needs are in jeopardy.')
  ],
  example:'A freelancer expects ₱40,000 this month but only ₱15,000 has cleared. Rent of ₱9,000 is due tomorrow and utilities of ₱2,500 follow next week. Budgeting the unreceived ₱25,000 as available is risky even if the invoices are legitimate. A calendar model begins with the cleared balance and marks future income as uncertain. The freelancer can postpone discretionary expenses, seek earlier payment where appropriate, and keep essential bills visible. The monthly forecast and the short-term cash position answer different questions.',
  flow:flow('Build a cash-flow plan that survives dates',[
   ['Record actual inflows','Separate cleared receipts from expected but uncertain income.'],
   ['Classify costs','Include essential, variable, debt and irregular obligations.'],
   ['Calculate totals and dates','Check the remainder and the lowest balance before payday.'],
   ['Review and adjust','Compare projections with transactions without hiding exceptions.']
  ],'This is educational budgeting, not a promise of financial returns.'),
  task:'Create a fictional 30-day cash-flow calendar. Begin with ₱4,000 cash, include ₱20,000 income arriving halfway through the month, and at least six expenses spread across dates. Calculate your ending balance and the lowest balance during the month. Add a ₱3,000 unexpected repair and recompute both values. Write three practical actions you could take before a shortfall occurs.'
 },
 time:{
  id:'priorities',minutes:25,title:'Priorities, capacity and realistic plans',
  intro:'Productivity is not the number of tasks checked. Learn to choose meaningful outcomes, estimate capacity and design a system that still works when time or energy changes.',
  sections:[
   section('Outcomes, projects and next actions are different',
    '“Become a better developer” is an aspiration, not a task. “Publish a deployed portfolio case study” is an outcome. “Write the problem statement and collect two screenshots” is a next action. Projects often fail when these levels are mixed together: a vague goal cannot tell you what to do at 9 a.m. Break an outcome into deliverables and a clearly startable next action that can be observed and reviewed.'),
   section('Measure available capacity rather than ideal time',
    'A calendar has fixed commitments, hidden transition time and unpredictable interruptions. Subtract sleep, meals, commuting, essential responsibilities and recovery before scheduling focused work. Estimate how long similar tasks actually took; distinguish elapsed time from concentrated work. A plan that fills every free minute offers no buffer for sickness, traffic or a task that takes longer than expected. Lowering the planned workload is sometimes a better optimization than adding a new tool.'),
   section('Use bottlenecks and dependencies',
    'A software project may have design, authentication, data migration, testing and deployment tasks. Coding the attractive landing page will not unblock a release if an unverified database migration is the actual constraint. Create a simple dependency map: what must be done first, what can proceed in parallel and what has a fixed deadline? The next important action should often reduce the risk on the critical path, not provide the fastest feeling of completion.'),
   section('Choose a short planning experiment',
    'For a week, identify one weekly outcome, two or three important actions and protected time blocks with small buffers. Note interruptions without treating them as personal failures. At week end compare planned and completed effort, revise estimates and consider whether tasks were poorly defined, priorities conflicted or capacity was genuinely unavailable. Avoid turning a 25-minute focus timer into a test of your worth.'),
   section('Protect the conditions for sustainable work',
    'More work sessions do not always yield more useful progress. Sleep opportunity, breaks, accessible support and a stopping rule help prevent an unsustainable plan. A student or worker may face caregiving responsibilities or health constraints; one fixed technique will not fit everyone. Successful time management optimizes important work over a realistic horizon, including the time needed to recover and maintain relationships.')
  ],
  example:'A developer has six hours on Saturday and lists “fix 12 bugs, learn a framework, build a dashboard, publish everything.” Past experience suggests fixing one tricky bug may consume two hours. A realistic plan identifies the release-blocking error, reserves an hour for tests, sets one optional improvement and leaves a buffer. If the critical bug takes longer, the plan still addresses the highest consequence rather than ending with four unfinished projects.',
  flow:flow('Turn intentions into a workable week',[
   ['Define the outcome','What observable result would matter by the review date?'],
   ['Check real capacity','Subtract commitments, transitions and necessary recovery.'],
   ['Sequence the bottleneck','Start tasks that unblock other tasks or reduce major risks.'],
   ['Review actual effort','Record variation and revise the next plan rather than blame yourself.']
  ],'Planning is a feedback system, not a promise that every interruption can be eliminated.'),
  task:'Design a fictional week with 40 hours of fixed commitments and 10 hours potentially available for study. Choose one deliverable that needs three dependent tasks. Estimate the tasks, reserve at least 20 percent contingency, identify one likely interruption and define a stopping rule. After inventing a delay of 90 minutes, revise the plan and explain which low-priority work you would drop.'
 },
 languages:{
  id:'realistic-week',minutes:26,title:'How languages are actually learned',
  intro:'Language learning is more than collecting phrases. A learner needs an ordered sound system, recognition of writing, high-frequency vocabulary, grammar, comprehension and opportunities to produce meaningful speech or writing.',
  sections:[
   section('A language is a system, not eight flashcards',
    'Speech uses sound contrasts; writing represents language in different ways depending on the script; words and grammar combine into sentences; meaning depends on social context. Japanese hiragana primarily represents mora-sized sound units, Korean Hangul groups alphabetic letters into syllable blocks, and many languages use alphabetic spelling with imperfect sound correspondence. A beginner course must choose a sequence appropriate to the language rather than simply copy the same phrase quiz into twenty languages.'),
   section('Begin with sounds you can already recognize',
    'An accessible Japanese start compares a, i, u, e and o with familiar Filipino vowels, then teaches あ・い・う・え・お, then かきくけこ and the other rows. The association is a bridge, not a substitute for accurate listening. A different language may demand tonal distinctions, unfamiliar consonant contrasts or new writing direction. Teach the contrast, show written symbols where relevant, play a trustworthy model and let the student practise before asking a recognition question.'),
   section('Make the learning sequence cumulative',
    'A first lesson teaches a small set of sounds; a second combines them into reading patterns; subsequent lessons introduce words, sentence particles or grammar and comprehensible listening. Ask the student to decode only symbols already introduced, unless a future character is clearly marked as a preview. Give every new sound recall practice, combine it with older sounds and return to confusing pairs later. Passing a single multiple-choice quiz is not evidence of conversational proficiency.'),
   section('Understand four complementary skills',
    'Listening, speaking, reading and writing overlap but cannot be treated as interchangeable. A learner may recognize a written kana and still struggle to hear it in fast speech; a speaker may be able to order food but not read an email. Set objectives for the skill being taught, choose activities that actually exercise that skill, and do not present synthetic device speech as native-speaker evaluation. Feedback from fluent speakers and authentic materials becomes increasingly important.'),
   section('Build a seven-day launch without claiming fluency',
    'Day one can focus on sound contrasts; day two on a new script row; day three on decoding familiar symbols; day four on high-frequency meanings; day five on one grammar pattern; day six on guided listening and production; day seven on cumulative review. Different languages and learners need different timelines. The purpose of a short plan is to establish a sustainable process, not to promise that anyone can master pronunciation, vocabulary or grammar in a week.')
  ],
  example:'A new Japanese learner sees こんにちは and is asked to choose “hello” without having learned こ, ん, に, ち or は. They may memorize the answer while understanding nothing about reading. A better sequence teaches the five vowels first, then the K, N and T-row symbols, explains that ん is a nasal sound and distinguishes written は from its particle pronunciation in greetings. Only when the building blocks have been introduced should the learner practise greeting meaning and context.',
  flow:flow('Build from recognition into communication',[
   ['Hear and compare sounds','Connect familiar speech patterns to new sound contrasts.'],
   ['Learn the writing system','Introduce a manageable set of symbols and show how they combine.'],
   ['Form meaningful language','Add vocabulary, grammar and contextual listening.'],
   ['Use and revisit','Produce short messages and return to uncertain skills after a delay.']
  ],'A learner can be confident in one skill but a beginner in another; progress should name the skill.'),
  task:'Select Japanese, Korean, Spanish or another language and design the first three lessons for someone who knows nothing. Specify which sounds or characters each lesson introduces, one meaningful example using only learned symbols, one pronunciation issue, and a recall check that does not require guessing a new word. Explain why a dialogue comes after its component sounds and basic structures rather than before.'
 },
 communication:{
  id:'listen',minutes:27,title:'Listening, meaning and mutual understanding',
  intro:'Listening is an active skill of understanding what someone means, distinguishing their words from your assumptions, and checking your interpretation without surrendering your own boundaries.',
  sections:[
   section('Separate hearing from understanding',
    'Hearing provides sensory input, but attention and prior expectations shape what we perceive. In conversation, we often fill gaps with assumptions about motive or intended meaning. Active listening asks the listener to focus, avoid preparing a rebuttal while the other person speaks, and collect the actual statement before interpreting it. A paraphrase should preserve the speaker’s meaning rather than recast it as something more convenient to agree with.'),
   section('Use open questions and accurate paraphrases',
    'An open question invites description: “Which part of the process stopped working?” A leading question suggests a preferred answer: “You agree my design was better, right?” Paraphrasing can verify comprehension: “I hear that the deadline changed without warning; is that the main concern?” If the other person corrects you, revise your summary rather than treating the correction as a personal attack. Clarifying questions also reveal missing details that a confident guess would hide.'),
   section('Validate the experience without endorsing every claim',
    'Saying “That sounds frustrating” recognizes an emotion; it does not establish that a specific accusation is true. Two people can disagree about facts while both experiencing genuine stress. Good communication keeps three layers distinct: what was said, how it affected someone, and what actually happened. This helps resolve ordinary misunderstandings while preserving the ability to challenge a mistaken or harmful claim.'),
   section('Respond to manipulation or pressure without participating',
    'Listening does not obligate you to obey someone’s request or keep arguing through threats. If a speaker says “If you cared about me, you would give me your password,” recognize the requested action and the leverage used. A calm response may be “I understand you want reassurance; I will not share my password.” Repeated pressure, retaliation or coercion is a reason to step away and seek support, not merely practise more empathetic listening.'),
   section('Repair an error with a concrete agreement',
    'After clarifying the problem, turn a vague resolution into who will do what by when. For example, “I will send the revised file by Thursday at 3 p.m., and you will confirm the missing sections on Friday.” Summarize constraints and ask whether the understanding is accurate. Notice where culture, language, accessibility or stress may affect how direct a person can be. A conversation succeeds when meaning is sufficiently shared and consent or limits are respected, not when one party always yields.')
  ],
  example:'In a capstone group, one person says, “You never finish anything on time.” Rather than replying with a counteraccusation, another asks which deliverable was late and what impact it had. They discover that one report arrived two days late while two others were on schedule. The first person still has a legitimate concern about the delayed report, but “never” was an inaccurate summary. They agree on a progress checkpoint and escalation rule instead of arguing about personality.',
  flow:flow('Communicate without erasing disagreement',[
   ['Hear the actual claim','Focus on the specific request, observation and impact.'],
   ['Check your interpretation','Paraphrase and ask an open clarification question.'],
   ['Set facts and boundaries','Separate emotion from evidence and refuse coercive demands.'],
   ['Agree on a next step','Define responsibilities, time frames and review points.']
  ],'Understanding another person does not require agreeing with an unsupported statement.'),
  task:'Write a fictional six-turn conversation about a missed project deadline. Include a specific observation, one accurate paraphrase, one open question, a respectful correction of an exaggerated claim, and a verifiable agreement. Then rewrite the same scenario with an inappropriate pressure tactic and show how to maintain a boundary without counter-manipulation.'
 }
};
