/** Xyra Atlas: original, offline-first applied mastery courses with public further reading.
 * Primary links are optional online references, not legal, medical, or financial advice.
 * They should be checked for current rules and regional suitability.
 */
const SOURCES={
  "privacy": [
    "National Privacy Commission — Data Subject Rights",
    "https://privacy.gov.ph/data-subject-rights/"
  ],
  "privacyRules": [
    "NPC — Data Privacy Act Implementing Rules and Regulations",
    "https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/"
  ],
  "dti": [
    "DTI — Complaints Handling",
    "https://fairtrade.dti.gov.ph/faq/how-to-file-a-consumer-complaint/"
  ],
  "bsp": [
    "BSP — Consumer Assistance Mechanism",
    "https://www.bsp.gov.ph/Pages/InclusiveFinance/ConsumerAssistanceManagement.aspx"
  ],
  "market": [
    "US SBA — Plan Your Business",
    "https://www.sba.gov/counseling/plan-your-business/"
  ],
  "breakEven": [
    "US SBA — Break-even Point",
    "https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point"
  ],
  "savings": [
    "CFPB — Building an Emergency Fund",
    "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/"
  ],
  "sleep": [
    "CDC — About Sleep",
    "https://www.cdc.gov/sleep/about/index.html"
  ],
  "language": [
    "British Council — LearnEnglish",
    "https://learnenglish.britishcouncil.org/"
  ],
  "social": [
    "NIH — Social Wellness Toolkit",
    "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
  ],
  "research": [
    "NIH — Checklist for Communicating Science and Health Research",
    "https://www.nih.gov/about-nih/science-health-public-trust/tools/checklist-communicating-science-health-research-public"
  ],
  "identity": [
    "NIST — Authentication and Authenticator Management",
    "https://pages.nist.gov/800-63-4/sp800-63b.html"
  ],
  "career": [
    "CareerOneStop — Resume Guide",
    "https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/top-portion-of-resume.aspx"
  ],
  "careerFormat": [
    "CareerOneStop — Resume Formatting",
    "https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/formatting.aspx"
  ],
  "negotiation": [
    "Harvard PON — Negotiation Preparation",
    "https://www.pon.harvard.edu/daily/negotiation-skills-daily/negotiation-preparation-checklist/"
  ],
  "batna": [
    "Harvard PON — BATNA Analysis",
    "https://www.pon.harvard.edu/daily/negotiation-skills-daily/skills-needed-for-negotiation-batna-analysis/"
  ],
  "violence": [
    "CDC — Intimate Partner Violence",
    "https://www.cdc.gov/intimate-partner-violence/about/index.html"
  ]
};
const MATERIAL={
  "psychology": [
    {
      "id": "calibrate-beliefs",
      "title": "Calibrate confidence instead of guessing",
      "intro": "Turn a strong impression into a testable estimate.",
      "concept": "A conclusion and confidence in that conclusion are separate. Record what you know, what you inferred, and which observations could change your mind. An estimate such as 60% is not a diagnostic score; it forces you to notice uncertainty rather than speak in absolutes.",
      "practice": "Choose a low-stakes prediction with a deadline. Write the predicted outcome, confidence, and the observable evidence that will settle it. Return after the deadline and compare expectation with result. Over repeated predictions, notice whether your 70% judgments happen roughly seven out of ten times.",
      "limits": "One prediction does not establish accuracy. Memory, selective attention, and hindsight distort self-assessment. Do not use informal forecasts to label a person or dismiss professional advice.",
      "example": "You think a teammate will reject a proposed design. Write 70% confidence and an observable test: ask for feedback before the meeting; their actual response is the outcome.",
      "task": "Record five small predictions with probabilities and deadlines; review the results without changing the original entries.",
      "question": "What makes a prediction calibratable?",
      "options": [
        "A clear event and a later check",
        "A strong feeling about the outcome",
        "A story that cannot be disproved"
      ],
      "correct": 0,
      "explanation": "An observable outcome allows you to compare confidence against reality.",
      "source": "research"
    },
    {
      "id": "evidence-before-labels",
      "title": "Investigate patterns without diagnosing people",
      "intro": "Separate repeated behavior from speculation about motives.",
      "concept": "A person being quiet in one meeting is an observation, not proof of insecurity, hostility, or a disorder. Strong conclusions require repeated context-aware evidence. Alternative explanations matter especially when emotions are high.",
      "practice": "Use a three-column record: exact behavior, at least two plausible explanations, and a respectful way to learn more. Ask an open question rather than diagnosing: 'I noticed the meeting was quieter than usual; is anything getting in the way?'",
      "limits": "Do not treat a self-made behavior chart as clinical assessment. If there is coercion, threats, or a safety risk, prioritize professional or protective support instead of collecting more observations.",
      "example": "A colleague misses two deadlines. Workload and unclear requirements may both explain it. Ask what blocked progress and agree on concrete next steps. A manager checks whether the tasks were clearly assigned and whether a system outage affected the timeline. The meeting ends with a specific responsibility and deadline, rather than an unsupported label about the colleague's personality or mental health.",
      "task": "Pick one ambiguous situation, record two explanations and draft a neutral clarifying question that does not accuse anyone.",
      "question": "Which statement stays closest to evidence?",
      "options": [
        "She is lazy",
        "Two tasks were delivered after the agreed date",
        "He has a personality disorder"
      ],
      "correct": 1,
      "explanation": "An observed deadline pattern can be verified; motives and diagnoses cannot be inferred from it alone.",
      "source": "social"
    }
  ],
  "laws": [
    {
      "id": "privacy-access-request-ph",
      "title": "Exercise your personal-data rights in the Philippines",
      "intro": "Prepare an accurate, minimal request to a data controller.",
      "concept": "Under the Philippine Data Privacy Act, data subjects have rights including information, access, correction, objection, and, where conditions apply, erasure or blocking. These are not unlimited: lawful processing requirements and exceptions may affect the outcome.",
      "practice": "Find an organization's official privacy contact. Identify yourself through its approved secure process, state the data or correction requested, ask about the processing purpose and response procedure, and retain a dated copy of the exchange. Share only the identification information reasonably required.",
      "limits": "Do not send identity documents to unverified email addresses or assume every deletion request must be granted. The National Privacy Commission provides official rights guidance; this is general education, not legal advice.",
      "example": "A shopping app has the wrong phone number on file. You ask its privacy team to correct the record, specify the incorrect field, and keep the request reference number. A learner writes to the retailer's verified privacy office with a correction request that names the inaccurate field and the preferred secure response route. They document dates but do not attach unrelated transaction records or assume any particular outcome is guaranteed.",
      "task": "Draft a six-line privacy correction request and identify which official channel you would use.",
      "question": "Which request best protects your privacy?",
      "options": [
        "Send your entire ID archive to an unknown chatbot",
        "Contact the verified privacy channel with a specific correction request",
        "Post your account password publicly to prove ownership"
      ],
      "correct": 1,
      "explanation": "A specific request through the verified privacy channel reduces unnecessary disclosure.",
      "source": "privacy"
    },
    {
      "id": "document-consumer-dispute-ph",
      "title": "Build a consumer complaint evidence trail",
      "intro": "Organize facts before escalating a defective-product complaint.",
      "concept": "Consumer complaints often turn on what was promised, what was delivered, and what attempts were made to resolve the issue. The Philippine DTI addresses consumer concerns within its jurisdiction, such as certain defective goods and deceptive sales practices.",
      "practice": "Create a timeline with order number, invoice, photographs, advertised description, actual defect, dates, and copies of messages. State the desired remedy calmly to the seller through its official channel first; if unresolved, check DTI's current complaint process and which government agency has jurisdiction.",
      "limits": "Rules depend on product type, evidence, and applicable law. 'No return, no exchange' wording does not automatically erase statutory remedies, but it also does not mean every change-of-mind return is mandatory.",
      "example": "A kettle arrives with a broken switch. Photograph the defect, retain the receipt, describe the issue in writing, and request the appropriate remedy without editing evidence.",
      "task": "Create a one-page complaint timeline, excluding private payment credentials and irrelevant personal documents.",
      "question": "Which evidence package is strongest?",
      "options": [
        "A dated receipt, photographs, and factual correspondence",
        "Only an angry social-media post",
        "A claim without the product or transaction details"
      ],
      "correct": 0,
      "explanation": "A clear and verifiable paper trail supports fair resolution.",
      "source": "dti"
    },
    {
      "id": "banking-complaint-escalation-ph",
      "title": "Escalate a Philippine banking complaint safely",
      "intro": "Understand the first-level and second-level consumer-assistance routes.",
      "concept": "For concerns with a BSP-supervised institution, BSP's Consumer Assistance Mechanism generally serves as a second-level avenue after the institution has had an opportunity to handle a formal complaint. A reference number helps track that first interaction.",
      "practice": "Contact the bank through a verified support channel, explain the transaction and remedy sought, save the ticket number, and give the institution an opportunity to respond. If unresolved, review BSP's current official instructions for escalation. Keep copies of relevant records with sensitive identifiers masked where possible.",
      "limits": "Never share a PIN, OTP, full password, or recovery code with a supposed complaints representative. Procedures and coverage can change; verify the current official BSP guidance before submitting documents.",
      "example": "A transfer is shown as deducted but not received. Save the app receipt, date, amount, and bank reference, report it to the bank, and follow up using the same ticket before escalating appropriately.",
      "task": "Write a bank-complaint checklist: official contact, facts, reference number, expected next step, and safe document handling.",
      "question": "What comes first in a standard BSP-supervised bank complaint?",
      "options": [
        "Give an OTP to a social-media agent",
        "File with the bank's official complaints channel",
        "Post your complete card number online"
      ],
      "correct": 1,
      "explanation": "The institution is ordinarily the first-level complaints channel; BSP offers an escalation mechanism.",
      "source": "bsp"
    }
  ],
  "business": [
    {
      "id": "interview-before-building",
      "title": "Conduct customer-discovery interviews without pitching",
      "intro": "Learn which problems people already spend effort solving.",
      "concept": "Positive reactions to an imagined product are weak evidence of actual demand. Interviews reveal real behavior when they focus on recent events, current alternatives, costs, and the consequences of a problem. Real evidence of demand has a history: someone encountered a problem, spent effort fixing it and still lacked a satisfactory alternative. An encouraging answer to an imagined product can reflect politeness rather than a willingness to spend time or money.",
      "practice": "Recruit five people who plausibly face the problem. Ask for the last time it occurred, what they tried, what they paid, and which workaround they use. Record quotes and contradictions. Summarize patterns without promising a product or leading people toward your preferred answer. Before the interviews, write the core uncertainty and a falsifiable test. Ask neutral questions about the last incident, record unsuccessful as well as successful workarounds and summarize contradictions. Then propose a small experiment that can fail without harming participants.",
      "limits": "A small interview sample cannot estimate a market share. Do not treat compliments as preorders or use false urgency to obtain commitments. Consent and data minimization matter during research. Avoid requesting private file paths or personal credentials from interviewees. Three interviews may uncover a useful idea, but cannot justify a confident population estimate, conversion forecast or market-share figure.",
      "example": "Rather than 'Would you buy my organizer?', ask 'When did you last lose a file, and how did you find it?' Concrete answers reveal whether search is painful. One respondent says files go missing every day but another reports that an existing search tool resolves the issue in seconds. The founder notes both observations, asks about the last real incident and refrains from treating a friendly interview as a paid commitment.",
      "task": "Prepare six neutral questions, interview three consenting participants, and extract one hypothesis that you can test next.",
      "question": "Which question reduces leading bias?",
      "options": [
        "My app is amazing, right?",
        "Tell me about the last time this problem happened",
        "You would pay me for this, wouldn't you?"
      ],
      "correct": 1,
      "explanation": "A recent-event question reveals behavior without supplying the answer.",
      "source": "market"
    },
    {
      "id": "contribution-margin-scenario",
      "title": "Calculate break-even with a sensitivity check",
      "intro": "Connect fixed costs, variable costs, and realistic volume.",
      "concept": "Break-even units equal fixed costs divided by contribution per unit, where contribution per unit is price minus variable cost. If contribution is zero or negative, selling more units does not cover fixed costs under that model.",
      "practice": "For a product priced at ₱250 with ₱100 variable cost and ₱15,000 monthly fixed costs, contribution is ₱150; break-even is 100 units. Then model a 10% price cut, higher packaging cost, and lower sales to see how fragile the estimate is.",
      "limits": "This is a single-product educational model. It omits taxes, financing, spoilage, changing prices, and other real-world factors unless you include them. Do not describe an estimate as guaranteed profit.",
      "example": "At ₱250 price and ₱100 variable cost, 100 units contribute ₱15,000: exactly enough for ₱15,000 fixed costs, with no operating profit before excluded costs. If price drops by ten percent to ₱225 while variable cost stays ₱100, contribution falls to ₱125. Covering ₱15,000 in fixed costs would now need 120 sales rather than 100, excluding other real operating obligations and changing customer demand.",
      "task": "Compute break-even for your imagined business, then change one assumption and explain how the required units move.",
      "question": "If fixed costs are ₱12,000 and contribution per unit is ₱120, break-even units are:",
      "options": [
        "12",
        "100",
        "1,440"
      ],
      "correct": 1,
      "explanation": "12,000 divided by 120 equals 100 units. Break-even is fixed costs divided by positive contribution per unit: ₱12,000 ÷ ₱120 = 100 units, before excluded expenses or any demand constraints.",
      "source": "breakEven"
    }
  ],
  "savings": [
    {
      "id": "emergency-buffer-scenarios",
      "title": "Size an emergency buffer for your real risks",
      "intro": "Base a cash reserve on plausible interruptions, not a magic number.",
      "concept": "An emergency fund is money set aside for unplanned costs or financial shocks. A useful target depends on essential obligations, income stability, household support, and how quickly you could replace earnings.",
      "practice": "List essential monthly costs and three plausible disruptions: urgent repair, medical travel, and lost income. Calculate the cash needed for each scenario. Choose a reachable first target and separate it from money earmarked for regular bills.",
      "limits": "Do not put money needed tomorrow into volatile assets simply to earn more. The safety, access conditions, and deposit protections of financial products vary by country and provider.",
      "example": "Essential costs total ₱18,000 per month; a two-month work interruption suggests ₱36,000 plus any urgent repair costs. This is a planning example, not a universal rule. If an additional urgent repair might cost ₱7,000 during that interruption, the illustrative combined need rises to ₱43,000. The learner compares what is reachable with present income, separates the estimate from a universal recommendation and checks access restrictions.",
      "task": "Create three buffer targets—starter, realistic, stretch—and identify what each could cover without debt.",
      "question": "Which expense most clearly fits an emergency fund?",
      "options": [
        "A planned monthly subscription",
        "An urgent unexpected appliance replacement",
        "A routine grocery allowance"
      ],
      "correct": 1,
      "explanation": "Emergency funds are for unplanned financial shocks rather than normal recurring spending.",
      "source": "savings"
    },
    {
      "id": "irregular-income-savings",
      "title": "Plan savings around uneven pay",
      "intro": "Protect essential spending when income arrives unpredictably.",
      "concept": "A fixed monthly savings amount can fail when earnings fluctuate. Separate known obligations from discretionary spending, then save a realistic portion after meeting essential needs. Track due dates as carefully as totals. Separate the timing of income from the timing of required payments. An apparently profitable month may need to fund expenses that arrive during a low-income period. Record the minimum essential baseline before assigning a fixed savings percentage that cannot survive fluctuations.",
      "practice": "Use the last three months of inflows to create low, typical, and high scenarios. On a high-income month, reserve upcoming bills and a portion of cash for future low-income months. Review the plan monthly instead of pretending income is constant. Use hypothetical income of ₱10,000, ₱25,000 and ₱14,000 against essential expenses of ₱9,000 monthly. Make three scenarios and prioritize rent, food, transport and future bills. Calculate how a stronger month can prepare for a later shortfall without spending the same money twice.",
      "limits": "An automatic transfer that causes overdrafts is counterproductive. Use amounts that fit cash flow and avoid assuming a one-time payment will repeat. A plan that assumes future income will match the best month creates hidden risk. If essentials exceed expected cash, identify the deficit and consider realistic options rather than promising automatic transfers that trigger fees or overdrafts. The illustration is not personalized financial advice.",
      "example": "A freelancer receives ₱10,000, ₱25,000, and ₱14,000 in successive months. They build a plan based on essentials and save more in the ₱25,000 month rather than committing to an unaffordable fixed amount.",
      "task": "Make a three-column income scenario table and decide how essential costs remain covered in the lowest scenario.",
      "question": "Which savings plan adapts to variable income?",
      "options": [
        "One that ignores bill due dates",
        "One that reserves essentials and increases savings in stronger months",
        "One that borrows every month to hit a fixed target"
      ],
      "correct": 1,
      "explanation": "Variable contributions can protect necessities while still growing reserves over time.",
      "source": "savings"
    }
  ],
  "time": [
    {
      "id": "design-a-sleep-protected-week",
      "title": "Plan work around sleep instead of stealing from it",
      "intro": "Treat sleep as a constraint in capacity planning.",
      "concept": "Adults generally need sufficient, consistent sleep for attention, memory, and health; the CDC provides age-based recommendations. A schedule that fits only by removing sleep is not genuinely feasible. A week contains 168 hours, but much of that time is already committed to biological needs, transit, care and fixed obligations. A plan that ignores sleep or depends on perfect energy is not a reliable measure of actual capacity or sustainable progress.",
      "practice": "On a weekly calendar, block sleep, travel, meals, caring duties, and fixed commitments before adding project work. Reserve unallocated time for interruptions. If the plan exceeds available hours, remove or rescope tasks instead of assuming infinite capacity. Add fixed commitments to a hypothetical weekly calendar before project tasks. Include transit, meals, care responsibilities and adequate recovery, then compute what remains. If the total exceeds 168 hours, reduce scope or renegotiate rather than silently subtracting sleep.",
      "limits": "Sleep needs vary and persistent sleep problems merit qualified help. Productivity arithmetic cannot diagnose fatigue or replace clinical guidance. Sleep duration and personal constraints vary; a self-study calendar cannot assess or diagnose a persistent sleep problem. Work shifts, disability and caregiving may limit available options. When significant problems continue, seek suitable qualified guidance rather than treating this as a discipline test.",
      "example": "Someone assigns 50 work hours, 20 hours of commuting, and seven nights of very short sleep. Instead of promising better focus, they revise task scope and reduce nonessential commitments.",
      "task": "Draft a 168-hour week with sleep first, then calculate how many flexible hours remain after fixed commitments.",
      "question": "Which plan is more sustainable?",
      "options": [
        "Schedule every hour and sleep when possible",
        "Protect sleep and essential commitments before assigning optional tasks",
        "Ignore travel time entirely"
      ],
      "correct": 1,
      "explanation": "Protecting biological and fixed constraints yields more realistic capacity.",
      "source": "sleep"
    },
    {
      "id": "bottleneck-and-buffer-planning",
      "title": "Find the bottleneck in a project week",
      "intro": "Improve reliability by accounting for dependencies and interruptions.",
      "concept": "A schedule's weakest dependency can determine the finish date. Counting every task as independent hides waiting time, handoffs, review, and rework. Work-in-progress also creates context-switching cost. A project can miss its deadline even when several visible tasks are complete, because a shared dependency remains unfinished. Track the order of handoffs and the waiting time attached to each, not simply the number of tickets marked done on a board.",
      "practice": "Draw a small dependency map with three deliverables. Identify the task that must finish before the others can proceed. Put a modest contingency buffer around uncertain steps and define what can be descoped if time runs short. Map a five-step fictional release: approved copy, API access, UI implementation, integration tests and deployment. Identify the dependency with the most downstream effects. Add a modest contingency, define a partial-release alternative and record evidence of when the blocker clears.",
      "limits": "A buffer is not a license to overpromise. Estimates should be revised when new evidence arrives; review output quality, not only hours filled. Adding buffers to every task without checking dependencies can hide rather than solve a scheduling problem. Be honest about uncertainty and authority over each step. A lower-scope fallback should still meet essential quality, safety and privacy conditions.",
      "example": "A web release depends on finalized copy and an API change. Styling is ready, but API approval is pending. Mark the API dependency as a risk rather than declaring the release on schedule.",
      "task": "Sketch five tasks with dependencies, identify the critical blocker and propose a lower-scope fallback.",
      "question": "What should you track first when multiple tasks depend on one unfinished task?",
      "options": [
        "The shared blocker and its uncertainty",
        "Only the total number of completed tasks",
        "The most colorful task on the board"
      ],
      "correct": 0,
      "explanation": "Dependency bottlenecks determine whether later tasks can proceed.",
      "source": "sleep"
    }
  ],
  "languages": [
    {
      "id": "phrase-retrieval-loop",
      "title": "Build a phrase retrieval loop that transfers to real life",
      "intro": "Replace passive rereading with deliberate recall and use.",
      "concept": "Recognizing a phrase on a screen is easier than producing it in conversation. Retrieval practice means hiding the answer, attempting it from memory, checking, then using the phrase in a new context.",
      "practice": "Choose ten practical phrases for a specific scenario. First read with meaning, then hide the target-language line and say it aloud. Check pronunciation using a credible learning resource; repeat incorrect phrases later and place known ones in a short role-play.",
      "limits": "Fluency requires listening and interaction over time. Text-based cards alone cannot evaluate accent or authentic speech; speech synthesis may mispronounce some names and languages.",
      "example": "To ask for directions, first recall a short question without reading, then role-play asking where a station is and respond to an imagined answer. When the partner answers with an unfamiliar destination, the learner asks for slower repetition and marks the misunderstanding for later listening practice. The phrase card still counts as recalled, but the learner does not claim that one rehearsed exchange demonstrates conversational fluency.",
      "task": "Create ten short cards, test them without hints, and use at least three in a thirty-second dialogue.",
      "question": "Which action is active recall?",
      "options": [
        "Reading the answer repeatedly",
        "Producing the phrase before checking the translation",
        "Watching an unrelated video"
      ],
      "correct": 1,
      "explanation": "Retrieval requires trying to produce the answer without seeing it.",
      "source": "language"
    },
    {
      "id": "listening-with-transcripts",
      "title": "Use transcripts to investigate listening errors",
      "intro": "Learn why a familiar sentence sounded unfamiliar.",
      "concept": "Listening difficulty can come from word boundaries, reduced sounds, speed, vocabulary, or unfamiliar accents. Replaying without diagnosing the obstacle may waste effort.",
      "practice": "Choose a short, lawful audio sample with a transcript. Listen once and write what you hear. Compare with the transcript, circle missed segments, study one pronunciation feature, then listen again without looking. Save two examples to revisit.",
      "limits": "Do not equate a single accent with the 'correct' way to speak. Exposure to varied legitimate accents broadens comprehension; automated speech tools have limits.",
      "example": "You recognize all the printed words in a greeting but miss the phrase when spoken quickly. A transcript reveals two words blend together; replay the segment at normal speed after practice.",
      "task": "Use a 20-second educational clip, annotate three missed segments, and describe why each was hard.",
      "question": "What is the best next step after missing a spoken phrase?",
      "options": [
        "Assume you lack talent",
        "Compare with a transcript and isolate the missed sounds",
        "Memorize only its written spelling"
      ],
      "correct": 1,
      "explanation": "A transcript helps identify whether the obstacle is sound, boundary, speed, or meaning.",
      "source": "language"
    }
  ],
  "communication": [
    {
      "id": "clarifying-questions-before-advice",
      "title": "Listen before solving another person's problem",
      "intro": "Distinguish understanding a concern from assuming the solution.",
      "concept": "A listener often hears the first sentence and jumps to advice. That can overlook what the other person wants: emotional support, a decision partner, or a concrete technical fix.",
      "practice": "Reflect the observed concern in one neutral sentence, ask one clarifying question, and check whether advice is welcome. Summarize the person's answer in your own words and invite correction. Respect a refusal to discuss.",
      "limits": "Listening is not agreement, and a paraphrase should not invent motives. In immediate safety situations, appropriate emergency help may matter more than conversation technique.",
      "example": "A friend says work was exhausting. Instead of listing productivity tips, ask: 'Do you want me to listen, or help you sort out options?' The friend says they mainly want to be heard, so the listener reflects the stressful deadline rather than proposing a productivity app. Later, if the friend requests options, they can brainstorm together. The exercise checks whether advice was actually invited.",
      "task": "Write a three-turn response that includes reflection, clarification, and consent before offering a suggestion.",
      "question": "Which response checks what help is wanted?",
      "options": [
        "You must quit immediately",
        "Would you like me to listen or brainstorm with you?",
        "You're exaggerating"
      ],
      "correct": 1,
      "explanation": "It clarifies the person's goal instead of assuming it.",
      "source": "social"
    },
    {
      "id": "feedback-with-observable-evidence",
      "title": "Give feedback that can actually be acted on",
      "intro": "Replace vague judgments with examples and requests.",
      "concept": "General labels such as 'unprofessional' can be hard to evaluate. Observable behavior, effect on the work, and a feasible next step make feedback more useful and less accusatory.",
      "practice": "Describe one recent event without exaggeration, explain its impact, and suggest a specific future behavior. Invite the other person to describe constraints or correct your understanding. Agree on how improvement will be checked.",
      "limits": "Do not use feedback frameworks as a pretext to shame or threaten someone. Distinguish a one-time error from a repeated pattern, and account for role and power differences.",
      "example": "Instead of 'You're unreliable,' say 'The two draft files arrived after our review cutoff, so testing was delayed. Could we agree on a handoff time and flag blockers earlier?'",
      "task": "Rewrite two vague complaints into observable examples, impact, and a respectful request. For a fictional delayed design handoff, rewrite 'you are careless' into a dated observation, a verifiable effect and a specific request for the next deliverable. Repeat for an omitted report citation. Include a clarifying question, a follow-up agreement and a way to check improvement without shaming the colleague.",
      "question": "Which feedback is most actionable?",
      "options": [
        "You are always careless",
        "The report was missing its sources; please add them before Friday",
        "Nobody likes your attitude"
      ],
      "correct": 1,
      "explanation": "It identifies specific work and a concrete correction.",
      "source": "social"
    }
  ],
  "thinking": [
    {
      "id": "claim-evidence-audit",
      "title": "Audit a confident claim with a source matrix",
      "intro": "Trace what evidence actually supports the conclusion.",
      "concept": "A persuasive headline may summarize a study inaccurately. Separate the exact claim, the source's own finding, the study design, sample, possible confounders, and any financial conflicts of interest. A scientific-looking headline can overstate what a study measured, who participated and which alternatives were considered. A careful reader distinguishes the tested outcome from the larger causal or universal claim. Source credibility and methodological fit are separate questions.",
      "practice": "Create a four-column matrix: claim, source link, what the source directly shows, and uncertainty. Read beyond the headline and distinguish a correlation from a demonstrated causal effect. Note who or what was actually studied. Create four rows for a fictional claim about improved focus. Record the headline, the original measured task, the sample and any untested generalization. Search for a credible counterexample or later replication, then write a conclusion no stronger than the actual observation.",
      "limits": "One study rarely settles a complex question. Avoid treating preprints, advertisements, and expert opinions as equivalent to independently replicated findings. A conflict of interest deserves attention but does not automatically invalidate a result; similarly, publication alone does not remove selection bias or confounding. When credible studies disagree, report the unresolved limits instead of assigning unwarranted certainty.",
      "example": "An article says a supplement 'doubles focus.' The study measures a small laboratory attention task in a narrow sample. Record that limited result instead of accepting a universal productivity claim.",
      "task": "Take one publicly shared scientific claim and write a one-sentence conclusion no stronger than the underlying evidence.",
      "question": "What is essential when judging whether a study proves cause and effect?",
      "options": [
        "Its study design and possible confounding",
        "The number of likes on the headline",
        "Whether the title uses bold letters"
      ],
      "correct": 0,
      "explanation": "Causal claims depend on design and alternative explanations, not popularity.",
      "source": "research"
    },
    {
      "id": "base-rate-and-selection-bias",
      "title": "Use base rates before interpreting striking examples",
      "intro": "Recognize why memorable cases may distort probability.",
      "concept": "A vivid example can seem more common than it is. Selection bias occurs when the observed group differs systematically from the population you care about. Base rates give an initial reference before considering individual details. A selection-biased sample may be accurate about the people included while misleading about everyone left out. A feed dominated by successful founders does not describe the actual distribution of results for all ventures that attempted a similar strategy.",
      "practice": "Identify the denominator. If a post highlights five successful businesses, ask how many attempted the same strategy and failed. Look for how the sample was chosen and whether unsuccessful outcomes were hidden. Suppose ten success stories are shared from a much larger unknown group. Write down the missing denominator and how the stories were chosen. Compare a hypothetical sample of all registered attempts with the highly visible winners, showing why the estimated probability can differ.",
      "limits": "Base rates do not remove individual differences and may be outdated or too broad. Explain what population the rate refers to before applying it elsewhere. Base rates are helpful starting points, not destiny for an individual case. The population, period and definition of success must fit the question. Do not extrapolate from a narrow or outdated group, and do not pretend the missing denominator is known without evidence.",
      "example": "A social feed shows ten founders who quit their jobs and succeeded. It omits many unsuccessful attempts, so the feed alone cannot estimate the chance of success for a new founder.",
      "task": "Choose a success-story claim and write three questions about the missing denominator and sample selection.",
      "question": "Which question helps uncover selection bias?",
      "options": [
        "How many attempts were not shown?",
        "Which success story has the best photograph?",
        "Can I copy the headline?"
      ],
      "correct": 0,
      "explanation": "Without the omitted cases, highlighted successes can badly distort estimated probability.",
      "source": "research"
    }
  ],
  "digital": [
    {
      "id": "passkey-and-recovery-map",
      "title": "Choose strong sign-in and resilient account recovery",
      "intro": "Avoid a single compromised password taking down multiple accounts.",
      "concept": "Unique passwords and appropriate multifactor authentication reduce some common account takeover risks. Phishing-resistant methods, including suitable passkeys, can offer stronger protection than passwords entered into lookalike forms.",
      "practice": "Map your five most important accounts and their recovery routes. Identify where an attacker with access to your primary email could reset others. Add unique credentials, secure recovery methods, and independent backup access where supported.",
      "limits": "Protect recovery codes offline and never share them through an unsolicited message. Authentication methods and device support differ; validate the options inside each genuine account.",
      "example": "Your email controls resets for banking and shopping. You strengthen email authentication first, confirm trusted devices, and store recovery codes securely outside the mailbox.",
      "task": "Make an account-dependency diagram and identify one single point of failure and one safe recovery improvement.",
      "question": "Which approach reduces reuse-related account compromise?",
      "options": [
        "One password for every service",
        "Unique passwords or passkeys plus appropriate MFA",
        "Sending recovery codes to support chats"
      ],
      "correct": 1,
      "explanation": "Different credentials and stronger authentication reduce cascading compromise.",
      "source": "identity"
    },
    {
      "id": "privacy-minimization-review",
      "title": "Reduce unnecessary data in everyday workflows",
      "intro": "Use data minimization as a practical design rule.",
      "concept": "More stored data increases the potential impact of access mistakes and breaches. A task should collect only fields needed for a defined purpose, protect them appropriately, and retain them no longer than justified.",
      "practice": "Review a signup form or a local file-organizing workflow. For each field ask: why needed, who accesses it, where stored, when deleted, and whether the goal can be met with less detail. Replace full identifiers with partial references when possible.",
      "limits": "Minimization does not override legal recordkeeping or verification obligations. Never falsify identity or bypass lawful checks; ask for the official privacy notice when uncertain.",
      "example": "A troubleshooting form requests a full account password to diagnose a display bug. You remove the field because the problem can be described with a screenshot excluding sensitive information.",
      "task": "Audit five fields in a hypothetical registration form and justify keeping, masking, or removing each.",
      "question": "What is a privacy-first design decision?",
      "options": [
        "Store every identifier just in case",
        "Collect only data necessary for the stated purpose",
        "Publish raw logs with account tokens"
      ],
      "correct": 1,
      "explanation": "Collecting only necessary data limits exposure and improves accountability.",
      "source": "privacyRules"
    }
  ],
  "career": [
    {
      "id": "proof-driven-portfolio",
      "title": "Turn project descriptions into verifiable evidence",
      "intro": "Show problems, decisions, tradeoffs and outcomes instead of adjectives.",
      "concept": "A portfolio claim is more credible when a reviewer can inspect work or evidence. Explain who the project served, the constraints, your role, what you built, how you evaluated it, and what remained unfinished.",
      "practice": "Write a concise case study: context, problem, approach, contribution, outcome, and limitations. Add screenshots, architecture notes, sanitized code, or a demo where permissions allow. State clearly whether results are measured, estimated, or unverified.",
      "limits": "Never reveal private client data, credentials, or proprietary code without permission. Do not invent metrics or claim production usage for an unlaunched prototype.",
      "example": "Instead of 'I made an amazing vault,' explain how its local encryption flow works, which risks it addresses, and what tests you actually ran. The case study includes the owner's role, design decisions, actual automated test results and an honest note about untested platforms. It avoids invented adoption numbers and removes confidential sample accounts. A reviewer can inspect the demo or code evidence.",
      "task": "Prepare a six-heading case study for one project, including one limitation and one artifact that supports your claim.",
      "question": "What strengthens a portfolio result?",
      "options": [
        "A verifiable example of a decision and its outcome",
        "Five unsupported superlatives",
        "Claiming an untested feature is perfect"
      ],
      "correct": 0,
      "explanation": "Reviewers can evaluate evidence much more reliably than enthusiasm.",
      "source": "career"
    },
    {
      "id": "resume-role-matching",
      "title": "Translate job requirements into evidence-based resume bullets",
      "intro": "Make each application easier to assess without distorting experience.",
      "concept": "A clear resume connects role-relevant skills to concrete work. A reader should be able to identify your contribution, tool or method, and result without decoding buzzwords or unsupported numbers.",
      "practice": "Select three requirements from an actual role. For each, map one genuine project example. Write bullets using action, scope, and outcome; include numbers only if you can explain how they were measured. Use a simple, readable layout.",
      "limits": "Recruitment expectations vary, and automated resume systems are imperfect. Do not add skills you have not used or misrepresent a solo project as a team achievement.",
      "example": "A developer bullet becomes 'Built a Laravel/React inventory flow with server-side validation and documented test cases' instead of 'Passionate full-stack ninja.' A role requests API validation, so the applicant describes a specific Laravel endpoint, the request constraints enforced and the tests run. They omit an unverified claim of production-scale usage and adjust the bullet to match documented experience.",
      "task": "Choose one target role and write three truthful skills-to-evidence bullets; remove claims you cannot defend.",
      "question": "Which resume line gives testable evidence?",
      "options": [
        "Hard-working and visionary",
        "Implemented a documented React search interface and tested keyboard navigation",
        "Expert in everything"
      ],
      "correct": 1,
      "explanation": "It names a concrete implementation and verifiable work.",
      "source": "careerFormat"
    }
  ],
  "science": [
    {
      "id": "observational-vs-experimental",
      "title": "Read study designs before taking conclusions",
      "intro": "Understand what an observation can and cannot establish.",
      "concept": "An observational study finds patterns without assigning the intervention under study. A randomized experiment can sometimes strengthen causal inference by balancing alternative explanations, but it still has limits around sample, outcome, and generalizability.",
      "practice": "For each reported scientific claim, identify the studied population, sample size, intervention or exposure, comparison group, measured outcome, and study design. Ask whether confounding or selection could explain the result.",
      "limits": "Animal results are not direct evidence of human benefit. Experimental findings can also be uncertain, and ethically impossible experiments require careful interpretation of observational data.",
      "example": "A survey finds that people sleeping more report better mood. Without controlling other factors, it shows an association rather than proving that changing sleep alone caused the difference.",
      "task": "Compare one observational and one experimental study summary; write exactly what each supports and what remains unknown.",
      "question": "Which claim is justified by a basic observational association?",
      "options": [
        "One variable caused the other",
        "The variables were associated in the measured sample",
        "The result applies to every human"
      ],
      "correct": 1,
      "explanation": "Association describes the measured relationship without establishing causality.",
      "source": "research"
    },
    {
      "id": "measurement-and-uncertainty",
      "title": "Ask what a number actually measured",
      "intro": "Separate instruments, samples, and uncertainty from bold charts.",
      "concept": "A precise-looking graph can conceal uncertain measurements. Units, sampling method, missing data, time window, and measurement instruments all affect what a result can support.",
      "practice": "Choose a public data visualization. Write the unit, observation period, sample size or denominator, and source method. Then identify one plausible measurement error and whether the chart implies more precision than the data warrant.",
      "limits": "Error bars and intervals require correct interpretation; they are not automatically the probability that an individual outcome falls inside the range. Statistical uncertainty is only one kind of uncertainty.",
      "example": "An online poll reports 82% support. If its participants self-selected, the percentage may describe only respondents, not the wider population. The reader checks who could respond, how the sample was recruited, when the poll ran and how questions were worded. Without a representative sampling method, the precise-looking percentage should not be generalized to every member of the population.",
      "task": "Annotate one chart with units, source, sample, time period, and two unanswered questions. Take a fictional online poll reporting 82% support from 100 self-selected respondents. Annotate the outcome, exact sampled group, sample recruitment method, collection period, measurement uncertainty and two questions about nonrespondents. Explain what the result cannot establish about the wider population.",
      "question": "What should be clarified first about a reported 82%?",
      "options": [
        "Who was measured and how they were sampled",
        "Whether the chart uses purple",
        "How many times it was reposted"
      ],
      "correct": 0,
      "explanation": "A number is only meaningful in relation to its population and measurement method.",
      "source": "research"
    }
  ],
  "relationships": [
    {
      "id": "boundary-request-and-response",
      "title": "Set a boundary without trying to control another person",
      "intro": "Distinguish personal limits from threats or punishments.",
      "concept": "A boundary describes what you are willing to participate in and what you will do to protect that limit. It is different from commanding another person to feel or behave a certain way. Respectful communication leaves room for the other person's own choices.",
      "practice": "State the situation, your limit, and the action you can control. Ask about the other person's needs without bargaining away a safety boundary. Revisit agreements when circumstances change, and notice whether words match actions.",
      "limits": "If someone responds with threats, stalking, intimidation, or violence, ordinary negotiation advice may not be safe. Seek trusted local help and appropriate protective services.",
      "example": "Instead of 'You are forbidden to speak to anyone else,' say 'I won't continue a conversation when there is shouting; I will return when we can speak calmly.' The speaker clarifies that they can return after a break, but the other person remains free to disagree or end the discussion. If the behavior involves threats or violence rather than ordinary raised voices, they prioritize safety and appropriate support.",
      "task": "Write two boundary statements focused on your own behavior, then rewrite one controlling demand as a respectful limit.",
      "question": "Which statement is a personal boundary?",
      "options": [
        "You must obey me",
        "I will leave this conversation if I am being threatened",
        "You are not allowed to have friends"
      ],
      "correct": 1,
      "explanation": "The statement identifies an action within the speaker's control.",
      "source": "social"
    },
    {
      "id": "repair-after-conflict",
      "title": "Repair a disagreement without erasing accountability",
      "intro": "Practice listening, acknowledgment, and an observable change.",
      "concept": "An apology can acknowledge impact without inventing excuses. Repair also requires listening to the affected person and agreeing on a future behavior that can be observed. Some conflicts cannot be resolved immediately, and not every relationship should continue.",
      "practice": "Name the specific action, acknowledge its impact, ask what the other person needs, and describe one change you can genuinely make. Allow time for the other person to decide whether to continue the conversation.",
      "limits": "Do not pressure someone to forgive, reconcile, or disclose sensitive experiences. Where abuse is present, safety planning and trusted professional support take priority over reconciliation exercises.",
      "example": "After interrupting a friend repeatedly, you say 'I cut you off twice, and that was disrespectful. Next time I will let you finish before responding,' without demanding instant forgiveness.",
      "task": "Draft an apology that includes a specific action, its impact, and one verifiable future change.",
      "question": "Which apology best supports accountability?",
      "options": [
        "I'm sorry you are sensitive",
        "I interrupted you; I will let you finish and check I understood",
        "Forget it, I already said sorry"
      ],
      "correct": 1,
      "explanation": "It identifies behavior and a realistic change rather than shifting blame.",
      "source": "social"
    }
  ],
  "negotiation": [
    {
      "id": "batna-without-bluffing",
      "title": "Prepare a real alternative before negotiating",
      "intro": "Separate aspirations, alternatives, and a walk-away boundary.",
      "concept": "A BATNA is your best alternative if no agreement is reached, not a fictional threat. Knowing it helps evaluate an offer, while your reservation point reflects the terms below which the alternative is preferable.",
      "practice": "List achievable alternatives, estimate their costs and timing, and verify them before the conversation. Then identify what you want, what you can trade, and what you cannot accept. Explore the other side's interests with questions, not assumptions.",
      "limits": "Do not bluff about offers or invent deadlines. Legal, financial, or employment negotiations may require qualified advice; uncertainty in the alternatives must be included.",
      "example": "A freelancer has a confirmed smaller project next month. They compare its real after-cost income with the proposed contract instead of pretending they have multiple high-paying offers.",
      "task": "Create a BATNA worksheet with one actual alternative, its constraints, and a defensible walk-away condition.",
      "question": "What is a credible BATNA?",
      "options": [
        "An option you can actually pursue if talks fail",
        "A threat you invented to pressure the other person",
        "The first number you mention"
      ],
      "correct": 0,
      "explanation": "An alternative only helps if it is genuinely available.",
      "source": "batna"
    },
    {
      "id": "objective-criteria-negotiation",
      "title": "Use shared criteria when offers seem arbitrary",
      "intro": "Shift from positions to verifiable tradeoffs.",
      "concept": "A negotiation can become stuck when each party repeats a preferred number. Shared external criteria, such as documented scope, market comparisons, and measurable quality standards, may help evaluate options more fairly.",
      "practice": "Before discussing price, define what the deliverable includes, revision limits, schedule, acceptance criteria, and responsibilities. Present evidence-based options and invite the other party to question assumptions. Document agreements in plain language.",
      "limits": "Comparable prices are not always equivalent when quality or risk differs. No worksheet guarantees a fair deal, and a party can still decline for legitimate reasons.",
      "example": "A website proposal includes three rounds of changes; an alternative offer is cheaper but excludes revisions. Compare total scope and acceptance conditions instead of only the headline price.",
      "task": "Write three objective criteria for a project contract and a question that tests each party's assumptions.",
      "question": "Which comparison is most useful?",
      "options": [
        "Price alone with no scope details",
        "Price, deliverables, change limits, and acceptance criteria",
        "Who speaks more loudly"
      ],
      "correct": 1,
      "explanation": "Comparable scope and measurable terms reduce hidden misunderstandings.",
      "source": "negotiation"
    }
  ],
  "shadow": [
    {
      "id": "coercive-pressure-check",
      "title": "Recognize high-pressure compliance demands",
      "intro": "Notice when urgency, secrecy, or dependency limits informed choice.",
      "concept": "A manipulative demand may pair urgency with threats of withdrawal, isolation, humiliation, or financial consequences. The learner's goal is to recognize these patterns, not to reproduce them. A single tense moment may differ from a repeated coercive pattern.",
      "practice": "Record exact words or actions without interpreting motives. Ask whether you can say no safely, request time to decide, or seek independent advice. If the pattern involves threats, abuse, or isolation, prioritize trusted assistance and a safety plan.",
      "limits": "Confrontation can increase danger in an abusive situation. Do not use this exercise to coach coercion or prove a clinical diagnosis. Seek qualified local support where appropriate.",
      "example": "Someone says, 'Transfer your entire pay now or I will make you lose your job.' The warning signs are a demand, a threat, and a restricted choice. Independent support matters.",
      "task": "Write a recognition checklist for coercive pressure, emphasizing what a person can do safely and without escalating the situation.",
      "question": "Which factor is a stronger warning sign?",
      "options": [
        "A respectful request with time to decide",
        "A threat attached to refusing a demand",
        "A clear statement of preferences"
      ],
      "correct": 1,
      "explanation": "Threats attached to compliance undermine voluntary choice.",
      "source": "violence"
    },
    {
      "id": "consent-and-digital-boundaries",
      "title": "Understand consent in private digital spaces",
      "intro": "Apply autonomy and privacy to images, accounts, and messages.",
      "concept": "Consent to one activity does not create permission for every later use. Someone may agree to share a message privately without agreeing to publication, forwarding, impersonation, or continued access. Pressure, threats, or inability to decline compromise meaningful choice.",
      "practice": "Before collecting or sharing another person's private material, ask a specific question about the intended use and accept refusal. Protect shared accounts with distinct access, avoid retaining unnecessary intimate information, and honor requests to stop unless an overriding lawful duty applies.",
      "limits": "The law on recording, intimate imagery, and data processing varies by jurisdiction. This lesson is ethical literacy, not legal advice; urgent threats or nonconsensual disclosure should be handled with trusted support.",
      "example": "A private photo was shared for one conversation. Forwarding it to a group without permission is a different use and cannot be justified by the original exchange. A person receiving the image should ask before forwarding or storing it in a shared folder, and must accept a refusal. The original private exchange does not provide permanent permission for redistribution, impersonation or access to other accounts.",
      "task": "Write a short privacy agreement for a fictional shared-project chat covering forwarding, retention, account access, and consent to publication.",
      "question": "What does private sharing automatically authorize?",
      "options": [
        "Any redistribution by the recipient",
        "Only the uses the person agreed to, subject to applicable law",
        "Permanent access to all accounts"
      ],
      "correct": 1,
      "explanation": "Specific and voluntary permission is not unlimited permission.",
      "source": "privacy"
    }
  ]
};
export const MASTERY_TRACKS=Object.freeze(Object.fromEntries(
 Object.entries(MATERIAL).map(([courseId,lessons])=>[courseId,
  lessons.map(item=>({
   id:item.id,title:item.title,stage:'Advanced',intro:item.intro,minutes:21,
   sections:[
    {heading:'Examine the model',body:item.concept},
    {heading:'Apply it step by step',body:item.practice},
    {heading:'Limits and responsible use',body:item.limits}
   ],
   example:item.example,task:item.task,
   quiz:{question:item.question,options:item.options,correct:item.correct,explanation:item.explanation},
   sources:[{label:SOURCES[item.source][0],url:SOURCES[item.source][1]}]
  }))
 ])
));
export const MASTERY_TRACK_COUNT=Object.values(MASTERY_TRACKS).reduce((n,lessons)=>n+lessons.length,0);
