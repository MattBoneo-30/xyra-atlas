/** Original scaffolded diagnostic checks for seven Atlas foundations.
 * Educational scenarios; generated teaching material awaits qualified editorial review.
 * No claims of standardized evaluation, professional advice or certified mastery.
 */
export const FOUNDATION_DIAGNOSTICS_ONE={
 psychology:{
  lessonId:'thoughts',title:'Mind and behavior — test the first interpretation',
  intro:'Move from naming a thought to examining observable evidence. Work through the three cases before revealing each explanation.',
  questions:[
   {prompt:'A friend leaves a message unanswered for six hours. Which statement is an observation rather than an inferred motive?',
    options:['My friend is deliberately punishing me.','The message has not received a reply after six hours.','My friend no longer values the friendship.'],correct:1,
    explanation:'The time without a reply can be checked. The other answers attribute intention or a stable relationship conclusion without enough evidence. Your feelings about the delay still matter, but they do not independently establish intent.',
    transfer:'Write one testable alternative, such as work obligations or a device problem. What new observation would help distinguish it from intentional avoidance?'},
   {prompt:'You remember three occasions when a classmate was late and overlook many on-time arrivals. Which approach most directly reduces confirmation bias?',
    options:['Write a defined observation period and record both on-time and late arrivals.','Ask people who already agree that the classmate is always late.','Stop keeping records because memory should be enough.'],correct:0,
    explanation:'A defined sample and consistent recording limit selective recall. Counting both confirming and disconfirming events makes the conclusion more responsive to data. It still matters how you define a late arrival and whether the days sampled are representative.',
    transfer:'Draft a seven-day log with columns for expected time, observed time, and possible circumstances. State one limitation before interpreting it.'},
   {prompt:'A teammate explicitly threatens to delete shared files unless given your password. What changes about the reasoning task?',
    options:['The threat proves a specific psychological disorder.','Wait until you can prove the person intended harm before protecting access.','Treat the observable threat as a security concern; protect access and seek appropriate support.'],correct:2,
    explanation:'A concrete threat can justify protective action without a theory about the person’s diagnosis or inner motives. Preserve safe evidence, use legitimate account controls and involve responsible support when warranted. Inference about personality is not required.',
    transfer:'Name two immediate protective steps and one uncertainty that you would avoid pretending to know.'}
  ]
 },
 laws:{
  lessonId:'legal-basics',title:'Legal source literacy — authority, scope and facts',
  intro:'Practice matching a claim to a source and a jurisdiction before drawing a legal conclusion.',
  questions:[
   {prompt:'A social-media post says a new Philippine law grants everyone an instant refund for any purchase. What should you check first?',
    options:['Whether the post has many shares.','The actual statute or current official agency rule, its scope and effective date.','Whether another account repeats the same sentence.'],correct:1,
    explanation:'Primary legal text and applicable official guidance establish what rules say; popularity cannot substitute for the wording, scope, exceptions, or date. Consumer rights depend on facts and the relevant agency’s jurisdiction.',
    transfer:'Create a three-column source log: claimed rule, exact official provision to verify, and facts required for its applicability.'},
   {prompt:'An online seller disputes a customer complaint. Which statement is most defensible before examining evidence?',
    options:['The buyer is automatically right because they filed first.','The seller is automatically right because the package was opened.','The outcome depends on the transaction, applicable rules, evidence and the responsible forum.'],correct:2,
    explanation:'Neither party wins by making the first assertion. Compare the listing, actual delivery, dates, communications, legal requirements and jurisdiction. Avoid promising an agency outcome or a specific remedy before checking the actual facts.',
    transfer:'List four items for a neutral case file, and identify what may still be disputed after those items are collected.'},
   {prompt:'A privacy complaint concerns a student’s own account records. Which initial request respects scope?',
    options:['Request specific information about processing of the student’s own data through the verified organization channel.','Demand every record about all students and staff.','Publish private employee contact details to force a response.'],correct:0,
    explanation:'The rights of a data subject do not grant unrestricted access to unrelated third-party information. Specific, properly directed requests support verification while protecting privacy. Check the NPC’s current guidance and lawful limitations for a real request.',
    transfer:'Draft two sentences asking about data categories and recipients without naming or seeking another student’s records.'}
  ]
 },
 business:{
  lessonId:'customer',title:'Customer discovery — evidence before a product',
  intro:'Distinguish a customer’s real behavior from flattering feedback and premature sales claims.',
  questions:[
   {prompt:'A founder asks ten friends “Would you love my brilliant app?” All say yes. What would yield stronger early evidence?',
    options:['Ask neutral questions about recent attempts to solve the problem and the costs of existing alternatives.','Print the positive quotes as proof of product-market fit.','Increase the question’s enthusiasm to make friends more specific.'],correct:0,
    explanation:'Past behavior, concrete obstacles and existing workarounds reveal more than socially desirable praise. Customer interviews remain exploratory; a small friend sample does not prove market demand or willingness to pay.',
    transfer:'Write three neutral questions that ask what happened the last time someone faced the problem, without pitching your proposed solution.'},
   {prompt:'A simple service charges ₱250 and incurs ₱170 in variable costs for each order. Which statement is accurate before fixed expenses?',
    options:['Each order earns ₱250 in net profit.','The contribution per order is ₱80 before fixed costs and other unmodeled expenses.','The service loses ₱170 on every order.'],correct:1,
    explanation:'Revenue minus the stated variable cost is ₱80 per order. Net profit requires accounting for fixed expenses and any additional costs omitted from the model, such as fees, taxes or refunds. Contribution is not the same as cash flow.',
    transfer:'Compute the total contribution at 5 and 20 orders, then name two costs that might reduce the final result.'},
   {prompt:'Eight people tested a prototype and three completed its main task. What should the team do next?',
    options:['Declare the product unusable for every possible user.','Hide the failed attempts and report only successful sessions.','Investigate where the five attempts stopped, using clear task definitions and consented observations.'],correct:2,
    explanation:'The observed completion count is 3/8 in this small test, not a population-wide performance estimate. Failure points, context and recruitment matter. Document both successful and unsuccessful attempts before deciding on a focused design experiment.',
    transfer:'Write a hypothesis for one drop-off step and a measurable success criterion for a revised test.'}
  ]
 },
 savings:{
  lessonId:'cashflow',title:'Every peso has timing — build a cashflow map',
  intro:'Practice tracking what enters, what leaves and when obligations are actually due.',
  questions:[
   {prompt:'A student receives ₱18,000 this month, spends ₱12,500 on essentials and ₱3,000 on optional purchases. How much remains before other costs?',
    options:['₱2,500.','₱5,500.','₱9,000.'],correct:0,
    explanation:'₱18,000 − ₱12,500 − ₱3,000 = ₱2,500. This is an illustrative remainder, not necessarily savings: unpaid bills, irregular costs and transfers still need to be included in a complete cashflow record.',
    transfer:'Add a hypothetical ₱1,800 bill due before the next income and recalculate the amount safely available.'},
   {prompt:'A freelance invoice for ₱20,000 is promised next week, while rent is due today. What principle matters most?',
    options:['Promised receipts are equivalent to cash on hand.','A projected surplus can coexist with a short-term liquidity shortfall.','Rent has no impact if the annual income forecast is high.'],correct:1,
    explanation:'Cashflow depends on the dates when money actually arrives and leaves. An invoice may be delayed or unpaid. A useful budget maps the due date, available funds and realistic fallback rather than counting a future payment as current liquidity.',
    transfer:'Create a one-week dated timeline with opening cash, rent due date, and two plausible invoice arrival dates.'},
   {prompt:'A product offers a high guaranteed return but requires locking essential emergency money for 90 days. What is the most responsible first response?',
    options:['Accept because the advertised rate is high.','Borrow immediately to replace the locked emergency cash.','Check provider legitimacy, withdrawal restrictions and essential liquidity before deciding.'],correct:2,
    explanation:'A nominal return cannot compensate for being unable to pay necessities when they are due. Guarantees also require careful independent verification. Compare accessibility, risks and contract terms using legitimate sources before committing funds.',
    transfer:'Write a three-item verification checklist and identify a circumstance in which preserving cash is more important than chasing yield.'}
  ]
 },
 time:{
  lessonId:'priorities',title:'Priorities — turn a crowded calendar into a workable choice',
  intro:'Apply constraints, outcome definitions and buffer thinking to a realistic daily plan.',
  questions:[
   {prompt:'You have 45 minutes and three tasks: fix a launch blocker, change a button shade and reorganize old screenshots. What is the best first principle?',
    options:['Start with the most visually pleasant task.','Identify the task that constrains the promised outcome and test the actual urgency.','Choose whichever task takes the longest.'],correct:1,
    explanation:'Priority is determined by outcomes, dependencies and commitments rather than how enjoyable a task seems. If the launch blocker truly prevents required functionality, resolving or triaging it offers more value than cosmetic polishing.',
    transfer:'Define a testable acceptance condition for the launch blocker and the smallest step you could take in the next 15 minutes.'},
   {prompt:'A schedule contains 24 hours of assigned tasks in one day and no sleep. What makes it invalid?',
    options:['It assumes the day has more usable capacity than a person can sustain.','It does not have enough calendar colors.','It assigns too many different project names.'],correct:0,
    explanation:'A calendar cannot expand physical time or eliminate basic human needs. Protect sleep, meals, transitions, interruptions and recovery. If commitments do not fit, rescope or renegotiate instead of pretending all tasks are feasible.',
    transfer:'Replace the overloaded plan with three protected needs, one essential deliverable and a realistic contingency margin.'},
   {prompt:'A team’s task estimate was wrong three weeks in a row. Which retrospective is most useful?',
    options:['Tell everyone to work harder and skip measurement.','Assume every future task will take exactly the previous average.','Compare estimates to actual durations, identify repeated blockers, and adjust the next plan.'],correct:2,
    explanation:'Reviewing measured differences helps uncover hidden dependencies, interruptions and scope ambiguity. Use the evidence to improve estimates, but keep uncertainty and resource differences visible rather than claiming precise predictions.',
    transfer:'Build a three-row estimate-versus-actual log and write one scheduling rule you would change from it.'}
  ]
 },
 languages:{
  lessonId:'realistic-week',title:'Language learning — separate recognition from independent recall',
  intro:'Practice a sustainable sequence: notice sounds, recall meaning, and transfer phrases into new contexts.',
  questions:[
   {prompt:'A learner can recognize “thank you” from a familiar translation card but cannot recall it unprompted. What skill is not yet demonstrated?',
    options:['Recognition of the displayed card.','Independent retrieval without a cue.','The ability to read the card when it is visible.'],correct:1,
    explanation:'Recognition and unaided retrieval are distinct tasks. Being able to choose a translation from visible options is useful, but it does not establish that a learner can produce or understand the phrase in an unfamiliar conversation.',
    transfer:'Design a review sequence that starts without the translation, then checks the answer and repeats with a new example.'},
   {prompt:'A Japanese beginner knows あ い う え お but not the K or S rows. Which next step respects prerequisites?',
    options:['Practice the K row sounds and kana before demanding full conversations.','Jump to a long speech because familiar vowels guarantee comprehension.','Assume romanization alone measures native pronunciation.'],correct:0,
    explanation:'The first five vowel kana are a foundation, not the entire writing system. Build up the K row and subsequent rows with reading practice, retrieval and appropriate audio comparison. A short script sequence should not be mistaken for spoken fluency.',
    transfer:'Make a two-minute plan to recall vowels from memory and introduce か き く け こ with one check per sound.'},
   {prompt:'A browser speech engine plays a foreign-language phrase smoothly. Which conclusion is justified?',
    options:['It proves all stress patterns and regional variants are correct.','It makes qualified native review unnecessary.','It provides a practice example, but spoken naturalness and accuracy need independent validation.'],correct:2,
    explanation:'Synthetic speech can support rehearsal but may not represent natural timing, register or pronunciation across contexts. Compare with qualified native references and measure listening, speaking and comprehension independently.',
    transfer:'Write a checklist of two features to verify in human-authored reference audio before treating a sample as accurate.'}
  ]
 },
 communication:{
  lessonId:'listen',title:'Listening — distinguish hearing, reflecting and assuming',
  intro:'Practice asking open questions and checking understanding without turning listening into agreement.',
  questions:[
   {prompt:'A coworker says “I feel shut out of decisions.” Which reply most directly checks understanding?',
    options:['You are wrong because I always ask for input.','You should stop taking things personally.','It sounds like key choices happened without you. Is that what you mean?'],correct:2,
    explanation:'A tentative paraphrase tests the listener’s understanding without claiming certainty or dismissing the speaker. It leaves room for correction. Reflection does not obligate you to agree with every conclusion the person draws.',
    transfer:'Write a neutral follow-up question asking for one concrete example of the exclusion.'},
   {prompt:'Someone asks you for help, but you are not sure if they want advice. What should happen next?',
    options:['Ask whether they want you to listen, brainstorm or help plan a response.','Immediately deliver a detailed solution before the story ends.','Assume the person must want reassurance rather than a plan.'],correct:0,
    explanation:'Checking the kind of support wanted respects the other person’s autonomy. It also saves time by avoiding an unwanted intervention. When safety is at stake, necessary protective steps may take priority over an ordinary preference conversation.',
    transfer:'Draft a single sentence that offers both listening and practical planning without pressuring the other person.'},
   {prompt:'A teammate disagrees with your summary and offers a correction. Which response best represents active listening?',
    options:['Repeat your original summary louder.','Revise the paraphrase and check the specific point you misunderstood.','Assume disagreement proves the teammate is dishonest.'],correct:1,
    explanation:'Listening is a feedback loop, not a performance of empathy. When the person corrects your account, update it and ask a focused clarification rather than defending your first interpretation as the final truth.',
    transfer:'Write an example revised paraphrase beginning “I misunderstood the part about…” and one factual follow-up.'}
  ]
 }
};
