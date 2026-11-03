/** Xyra Atlas v1.32: original offline applied capstone cases for every learning subject.
 * These educational case simulations are not professional credentials, legal advice,
 * medical treatment, or recommendations to use deceptive behavior.
 * Linked sources are optional, online further reading; verify current guidance.
 */
const SOURCES={
  "psychology": [
    "NIH — Social Wellness Toolkit",
    "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
  ],
  "laws": [
    "National Privacy Commission — Right to Access",
    "https://privacy.gov.ph/right-to-access/"
  ],
  "business": [
    "U.S. Small Business Administration — Plan Your Business",
    "https://www.sba.gov/business-guide/plan-your-business"
  ],
  "savings": [
    "Consumer Financial Protection Bureau — Emergency Fund Guide",
    "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/"
  ],
  "time": [
    "CDC — About Sleep",
    "https://www.cdc.gov/sleep/about/index.html"
  ],
  "languages": [
    "British Council — LearnEnglish",
    "https://learnenglish.britishcouncil.org/"
  ],
  "communication": [
    "NIH — Social Wellness Toolkit",
    "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
  ],
  "thinking": [
    "NIH — Communicating Research Checklist",
    "https://www.nih.gov/about-nih/science-health-public-trust/tools/checklist-communicating-science-health-research-public"
  ],
  "digital": [
    "NIST SP 800-63B — Authentication Guidance",
    "https://pages.nist.gov/800-63-4/sp800-63b.html"
  ],
  "career": [
    "CareerOneStop — Résumé Guide",
    "https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/top-portion-of-resume.aspx"
  ],
  "science": [
    "NIH — Communicating Research Checklist",
    "https://www.nih.gov/about-nih/science-health-public-trust/tools/checklist-communicating-science-health-research-public"
  ],
  "relationships": [
    "NIH — Social Wellness Toolkit",
    "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
  ],
  "negotiation": [
    "Harvard Program on Negotiation — Preparation Checklist",
    "https://www.pon.harvard.edu/daily/negotiation-skills-daily/negotiation-preparation-checklist/"
  ],
  "shadow": [
    "CDC — Intimate Partner Violence",
    "https://www.cdc.gov/intimate-partner-violence/about/index.html"
  ]
};
const CASES={
  "psychology": {
    "id": "case-ambiguity-audit",
    "title": "Capstone: investigate an ambiguous message",
    "intro": "Analyze one confusing social interaction without pretending to read the other person's mind. Practice observation, probability, and a respectful experiment.",
    "sections": [
      [
        "Extract what is observable",
        "A teammate writes, 'We need to talk about your update.' The words and delivery time are observations. Your thought that you are about to be fired is an interpretation. Make two separate columns before doing anything: what was literally communicated, and what you fear or hope it means. Describe your emotional response without using it as proof of the interpretation."
      ],
      [
        "Compare plausible hypotheses",
        "Write three explanations: a project correction, routine planning, or a serious performance concern. For each, list what evidence would increase or decrease its plausibility. Avoid assigning exact percentages without calibration history. The practical next step is a neutral clarification such as 'Is this about the project timeline or something else I should prepare?'"
      ],
      [
        "Check the limits",
        "An unanswered question does not license speculation about a person's private thoughts, intentions, or mental health. If there are threats or an established pattern of harassment, prioritize documentation and support rather than treating it as a harmless uncertainty puzzle. Use this method to improve your own response, not to diagnose another person."
      ]
    ],
    "example": "Your first thought is 'I'm in trouble.' You write the exact message, note the absence of any stated accusation, and ask what materials to bring. The reply says the team needs your input on a Friday release. The clarification disproves the first confident story without pretending every future worry is false.",
    "task": "In your Field Notebook, copy a real low-stakes ambiguous message without personal identifiers. List observation, three interpretations, one missing fact, one respectful clarification, and what would change your mind.",
    "quiz": [
      "Which next step best tests an ambiguous interpretation?",
      [
        "Decide the hidden motive immediately",
        "Ask a neutral question about the meeting's purpose",
        "Forward the message to strangers and demand a diagnosis"
      ],
      1,
      "A neutral question can gather relevant information without assuming motives."
    ]
  },
  "laws": {
    "id": "case-ph-data-access",
    "title": "Capstone: prepare a Philippine data-access request",
    "intro": "Practice drafting a limited, evidence-based request to an organization's verified privacy contact, without exposing passwords or unrelated records.",
    "sections": [
      [
        "Identify the data and request",
        "A service holds your transaction profile and you want to understand how a particular field was processed. The National Privacy Commission describes a right to request information about personal data processing, subject to relevant restrictions. Write the specific field or category, the institution involved, and the information you want clarified. Do not demand another person's record."
      ],
      [
        "Select a safe procedure",
        "Find the privacy notice or officially published data-protection contact using the organization's actual website. Prepare the account reference if required and use the institution's secure identity-verification procedure. Request the applicable processing purpose, source, recipients or retention information relevant to your own data. Keep a dated copy and response reference."
      ],
      [
        "Check scope and limits",
        "Rights are not unlimited and exemptions or lawful retention requirements may apply. Do not send passwords, OTPs, or identity images to an unverified inbox. If a request concerns a bank, data access and financial consumer complaints may require different channels. Check the National Privacy Commission's current guidance before pursuing an escalation; this lesson is not legal advice."
      ]
    ],
    "example": "A user notices the wrong residential city in a retailer profile. They contact the published privacy office, specify the inaccurate field, request correction and relevant access details, and keep the response number. They never attach a full statement containing unrelated purchases or give the support agent an OTP.",
    "task": "Create a fictional six-line request with recipient role, account reference placeholder, requested data category, specific question, preferred secure response channel, and date. Explain which details you intentionally excluded for privacy.",
    "quiz": [
      "Which item belongs in a careful request for your own personal data?",
      [
        "A specific data category and verified privacy contact",
        "Another customer's account information",
        "A password and six-digit OTP"
      ],
      0,
      "A focused request through the verified channel is safer and better aligned with the rights described by the NPC."
    ]
  },
  "business": {
    "id": "case-pilot-unit-economics",
    "title": "Capstone: design a small business pilot",
    "intro": "Turn a promising product idea into a testable offer with capacity, unit economics, evidence of demand, and explicit stop conditions.",
    "sections": [
      [
        "Define the smallest real experiment",
        "A local business wants to offer custom printed tote bags. The question is not whether friends like the design; it is whether paying customers will accept a price and delivery promise. Specify a target buyer, one product variant, a limited batch, a test channel, and a measure such as paid orders minus refunds. Ask permission for customer interviews without leading questions."
      ],
      [
        "Calculate viability and capacity",
        "Assume a price of ₱300, variable materials and packaging of ₱175, and fixed pilot costs of ₱2,500. Contribution per bag is ₱125; 20 paid units cover those fixed costs before tax, waste, and owner labor. If a printer handles only five bags a day, a ten-day delivery promise cannot ignore the setup and revision queue. Use low, expected, and high demand cases."
      ],
      [
        "Establish honest decision rules",
        "A pilot has a stop condition. For example, do not expand if defects exceed the agreed threshold, orders depend on misleading scarcity, or fulfillment repeatedly misses promises. The model's assumptions may change, and customer interviews alone cannot prove a scalable market. Report actual sales, production costs, returns, and labor separately."
      ]
    ],
    "example": "Five customers pay ₱300 each. Sales total ₱1,500, variable costs total ₱875, and contribution is ₱625. The pilot is still below the ₱2,500 fixed-cost threshold. The team improves reliability and validates demand before buying more equipment.",
    "task": "Draft a one-page pilot sheet for a product you understand. Include price, variable cost, fixed cost, break-even units, one capacity constraint, two risks, and an explicit decision to expand, revise or stop.",
    "quiz": [
      "At ₱300 price, ₱175 variable cost, and ₱2,500 fixed costs, what is the break-even volume?",
      [
        "8 units",
        "20 units",
        "50 units"
      ],
      1,
      "Each paid unit contributes ₱125; ₱2,500 divided by ₱125 equals 20 units, before excluded costs."
    ]
  },
  "savings": {
    "id": "case-three-month-cash",
    "title": "Capstone: stress-test a three-month cash plan",
    "intro": "Model irregular income, essential obligations, and an unexpected expense before deciding how much money can safely be set aside.",
    "sections": [
      [
        "Separate essentials and optional spending",
        "List rent or housing, food, utilities, transport, and unavoidable debt payments by due date. Keep an emergency reserve separate from expected expenses; a bill that arrives annually is predictable even when it feels sudden. Record income when it actually clears, not when it is promised. Use lower and higher inflow scenarios instead of a single optimistic estimate."
      ],
      [
        "Walk through a shock",
        "Suppose essential monthly costs are ₱17,000, current accessible cash is ₱26,000, and a necessary repair costs ₱8,000. After the repair, cash covers only about one month of essentials, not three. If income next month is uncertain, postponing a discretionary purchase may be prudent while reserving funds for mandatory due dates. A savings target should not force missed bills."
      ],
      [
        "Respect access and uncertainty",
        "A reserve has to be available when needed and its risk should match its purpose. Deposit accounts, fees, withdrawal restrictions, and protections vary; confirm current terms with the institution. Do not assume high investment returns will fund a near-term emergency, and do not misclassify payroll or mandatory payments as optional."
      ]
    ],
    "example": "An independent worker earns ₱21,000, then ₱9,000, then ₱28,000 across three months. They set aside upcoming fixed bills from the high-income month and build their buffer gradually. A one-time payout is not treated as repeating income.",
    "task": "Prepare a three-month plan with low, typical and high inflows. Write a repair scenario and compare cash remaining against one month of essential spending. Mark one expense that could be deferred without creating a bigger problem.",
    "quiz": [
      "Which plan is safest when next month's income is uncertain?",
      [
        "Count a hoped-for bonus as guaranteed",
        "Reserve essential bills before discretionary purchases",
        "Move all emergency cash into a volatile asset"
      ],
      1,
      "Prioritizing essential obligations and access to cash reduces vulnerability to a short-term shock."
    ]
  },
  "time": {
    "id": "case-dependency-release",
    "title": "Capstone: rescue a realistic release schedule",
    "intro": "Practice identifying bottlenecks, protecting basic recovery time, and changing a project scope when the deadline and capacity do not fit.",
    "sections": [
      [
        "Map work and dependencies",
        "A six-day release needs UI copy, API integration, testing, and a demo. Testing depends on both copy and API integration, so listing hours without dependencies gives a false sense of slack. Write each deliverable, estimated effort, owner, and prerequisite. Make waiting for approvals visible rather than burying it in task descriptions."
      ],
      [
        "Build a feasible week",
        "Block sleep, caregiving, commute, meals, and fixed commitments before assigning working time. Add a buffer for uncertain integration and regression checks. If available focused time is 20 hours and tasks total 28 hours before buffer, scheduling 28 hours inside 20 does not solve the problem. Negotiate the smallest acceptable scope or later deadline."
      ],
      [
        "Protect quality and recovery",
        "A green checklist is meaningless if it hides untested critical paths. Identify a release gate: the core user flow works, data is not corrupted, known risks are documented, and a rollback exists. Avoid treating chronic sleep loss as a productivity strategy. The right response to an impossible plan may be reducing scope."
      ]
    ],
    "example": "The API arrives two days late. Instead of removing error handling, the team delays a low-priority animation, tests the payment and login paths, and documents the missing polish for a follow-up build.",
    "task": "Create a six-task dependency list for a project you know. Estimate feasible hours after essential commitments, identify the blocking task, write a small contingency buffer, and choose one feature that can safely be deferred.",
    "quiz": [
      "A project has 20 feasible work hours and 28 hours of required tasks. What should happen?",
      [
        "Remove sleep until the spreadsheet fits",
        "Revise scope, dependencies, capacity, or deadline",
        "Declare the task list complete immediately"
      ],
      1,
      "A feasible plan must reconcile actual capacity and dependencies rather than simply filling a calendar."
    ]
  },
  "languages": {
    "id": "case-restaurant-dialogue",
    "title": "Capstone: build and test a restaurant dialogue",
    "intro": "Turn memorized survival phrases into a short, purposeful exchange with repair strategies for when you cannot understand the reply.",
    "sections": [
      [
        "Identify the conversation goal",
        "A restaurant interaction involves greeting, making a request, checking price or ingredients, clarifying, thanking, and closing. Choose a language for which you have reliable phrase materials. Mark each utterance as a question, answer, or clarification. Practice the meaning before memorizing sound; a direct word-for-word translation can be unnatural."
      ],
      [
        "Rehearse with retrieval and repair",
        "Write a six-turn dialogue and hide the target-language text while recalling each line. Mark difficult phrases, then check a reputable native-language example or teacher before assuming your wording is idiomatic. Include one repair line such as 'Could you repeat that more slowly?' and one polite way to confirm what you heard."
      ],
      [
        "Check authenticity and boundaries",
        "Text prompts alone cannot verify pronunciation, accent, or listening comprehension. Voice synthesis may be absent or inaccurate on a given device. Do not present rehearsed sentences as proof of fluency, and avoid copying another person's voice or uploading private recordings without permission."
      ]
    ],
    "example": "A learner can ask for a menu in Japanese but cannot follow a rapid reply. They use a verified phrase for 'please say that again,' restate the item to confirm, and record which sound sequence they missed for later listening practice.",
    "task": "Choose one starter language and create a six-turn exchange with two questions, two answers, one clarification, and one courteous close. Mark uncertain wording to verify with credible language materials before real-world use.",
    "quiz": [
      "When a familiar sentence sounds unfamiliar in fast speech, what is the best study step?",
      [
        "Keep guessing silently",
        "Compare with a reliable transcript or native example and isolate the missing sounds",
        "Assume one accent is the only correct one"
      ],
      1,
      "Checking against reliable spoken material can reveal word boundaries, reductions, or vocabulary gaps."
    ]
  },
  "communication": {
    "id": "case-repair-feedback",
    "title": "Capstone: handle a difficult project feedback meeting",
    "intro": "Practice a respectful feedback conversation that clarifies facts, protects dignity, and ends with a measurable next action.",
    "sections": [
      [
        "Prepare observable evidence",
        "You need to discuss repeated late submissions, but labels such as 'lazy' do not identify the problem. Collect two specific dates, the actual handoff requirement, and the effect on colleagues. Separate what happened from your guess about motivation, then invite the other person's explanation without making them defend their character."
      ],
      [
        "Structure the conversation",
        "Say what you observed, describe the impact, ask a genuine question, and propose an achievable next step. Confirm what each person will do before the next milestone. An actionable request could be 'Please flag a blocker by 3 PM the day before the deadline,' not 'Be more responsible.' If your role gives you authority, account for that power difference."
      ],
      [
        "Recognize limits and follow-up",
        "A one-off missed deadline is not the same as a recurring pattern. Confidential health or family information should not be demanded as a precondition for being heard. Document the agreed work process, review it after a reasonable interval, and escalate safety or misconduct concerns through appropriate organizational procedures."
      ]
    ],
    "example": "A designer misses two review cutoffs. The lead says which drafts arrived late and how testing was delayed, asks what blocked progress, and agrees on a midweek preview plus an earlier warning when a blocker appears.",
    "task": "Write a four-sentence feedback opener: concrete observation, effect on work, non-accusatory question, and a request with timing. Then write a possible good-faith response from the other party.",
    "quiz": [
      "Which opener invites useful problem-solving?",
      [
        "You always ruin projects",
        "Two drafts arrived after our agreed review time; what got in the way?",
        "Everyone thinks you are unreliable"
      ],
      1,
      "The second statement identifies an observable pattern and makes room for an explanation."
    ]
  },
  "thinking": {
    "id": "case-viral-number-audit",
    "title": "Capstone: audit a viral statistical claim",
    "intro": "Investigate an attention-grabbing percentage by asking who was measured, how a sample was chosen, and what the underlying comparison means.",
    "sections": [
      [
        "Rewrite the claim precisely",
        "A post says '92% of customers prefer Product X' but gives no source. Your first task is to restate what must be true for the claim to be accurate. Is the percentage among paid customers, survey respondents, visitors, or a national population? What was the exact question and when was it asked? Without a denominator, the figure is not portable."
      ],
      [
        "Inspect the method and alternative explanations",
        "Ask whether respondents volunteered, whether unhappy customers were excluded, and what comparison the survey offered. A result among 50 self-selected subscribers is not an estimate of all consumers. Distinguish descriptive survey evidence from evidence that a product causes satisfaction. Keep a note of missing methods instead of inventing a correction."
      ],
      [
        "Publish a bounded conclusion",
        "A responsible summary might say 'In the company's survey of existing subscribers, 92% of respondents selected X; sampling method and response rate were not provided.' Do not replace an exaggerated claim with an equally exaggerated rebuttal. Strong evidence comes from transparent sampling, appropriate design, and independently checkable reporting."
      ]
    ],
    "example": "An infographic's headline reports 92% preference. The source turns out to be 46 out of 50 replies to an in-app poll. You describe that poll accurately but decline to generalize to every customer or conclude the product caused satisfaction.",
    "task": "Find a non-sensitive public statistic and write the original claim, intended population, actual measured group, missing denominator or sampling detail, and a cautious replacement headline.",
    "quiz": [
      "What is the biggest problem with generalizing a voluntary customer poll to everyone?",
      [
        "Selection bias and an unclear population",
        "The font on the chart",
        "The color of the survey button"
      ],
      0,
      "Voluntary respondents can differ systematically from people who never took the poll."
    ]
  },
  "digital": {
    "id": "case-account-takeover-drill",
    "title": "Capstone: contain a suspected account takeover",
    "intro": "Practice a safe recovery sequence for an account showing unknown sign-ins, using verified channels and strong authentication rather than panic.",
    "sections": [
      [
        "Verify without following the suspicious link",
        "An email warns you that someone logged in from a new city. Do not click its urgency button or call its supplied number. Open the service through a trusted bookmark or direct application and check whether an actual security event appears. Take note of the date, event type, and devices shown, without publishing session tokens."
      ],
      [
        "Prioritize recovery dependencies",
        "If unauthorized access is confirmed, start with the provider's genuine account-recovery and session-revocation workflow, then update credentials and recovery channels. Secure the primary email account because it may control password resets elsewhere. Use unique passwords, phishing-resistant passkeys or other appropriate MFA where offered; protect backup recovery codes."
      ],
      [
        "Avoid risky improvisation",
        "Do not install remote-control software recommended by an unknown support caller or share OTPs. A phishing-resistant authenticator can mitigate impersonation, but device theft, malicious software, and weak account-recovery processes remain possible. Follow the provider's documented recovery steps and preserve evidence for formal reports."
      ]
    ],
    "example": "A user receives a security alert. They open the official website directly, confirm one unfamiliar session, revoke it, reset the credential using the official flow, inspect recovery methods, and secure their linked email. They do not supply codes to an unsolicited caller.",
    "task": "Draw an account dependency map for email, a financial service, and a shopping account using generic placeholders. Write a verified recovery path, one alternative MFA method, and where to keep emergency recovery instructions securely.",
    "quiz": [
      "What is the safest response to an unsolicited login warning?",
      [
        "Use its embedded verification link immediately",
        "Open the service through a trusted channel and inspect account security",
        "Give the caller your OTP to prove account ownership"
      ],
      1,
      "Independent navigation reduces exposure to fake sign-in pages and social engineering."
    ]
  },
  "career": {
    "id": "case-project-evidence",
    "title": "Capstone: present a software project as verifiable work",
    "intro": "Convert a portfolio project into a credible case study with architecture evidence, constraints, testing, and honest limitations.",
    "sections": [
      [
        "State the problem and your role",
        "A project page should explain who had the problem, why it mattered, the scope you personally owned, and what remained out of scope. Avoid generic praise such as 'revolutionary' or 'flawless.' Be clear about whether the product was a capstone, a prototype, a production service, or an internal tool. For team work, distinguish your contribution from others'."
      ],
      [
        "Show technical decisions and validation",
        "Choose one real architecture decision and explain the alternative you considered, why you chose this design, and one tradeoff. Provide sanitized screenshots or a demo, repository excerpts where disclosure is permitted, and test evidence. A measured result needs a reproducible method; if you did not measure performance, do not invent a percentage gain."
      ],
      [
        "Document constraints without undermining credibility",
        "A responsible case study includes an unresolved issue or future improvement. Protect client data, credentials, private endpoints, and proprietary work. Separate automated test coverage, manual checks, and assumptions. A clean presentation increases readability, but evidence and clarity—not animation alone—make technical claims credible."
      ]
    ],
    "example": "A developer describes a Laravel/React inventory workflow, explains why they used server-side validation, provides a sanitized architecture diagram, and lists tested user flows. The page notes that production load testing has not yet occurred.",
    "task": "Write a six-part portfolio case study for an actual project: context, role, implementation, alternative considered, verified evidence, and remaining limitation. Include a safe artifact that independently supports one claim.",
    "quiz": [
      "Which portfolio result is professionally defensible?",
      [
        "Reduced load time by 90% without measurement",
        "Implemented server-side validation and recorded test outcomes",
        "The best developer alive"
      ],
      1,
      "A reviewer can inspect a concrete implementation and the evidence supporting it."
    ]
  },
  "science": {
    "id": "case-study-causality",
    "title": "Capstone: decide what a study actually demonstrates",
    "intro": "Use a simple research appraisal to distinguish association, intervention effects, measurement limits, and population claims.",
    "sections": [
      [
        "Map the study question and population",
        "Suppose a survey finds people who walk more often report lower stress. Record who participated, how walking was measured, the outcome scale, sample size, and whether the data was collected at one moment or over time. 'People who walk' may differ in income, health, schedule, or other factors from those who do not."
      ],
      [
        "Assess causal support",
        "Without assignment to an intervention, the observed relationship does not by itself establish that walking lowered stress. A well-designed trial could strengthen causal inference for the measured outcome and population, but could still have adherence, blinding, attrition, or generalizability limitations. Review the actual methods rather than a promotional summary."
      ],
      [
        "Explain uncertainty responsibly",
        "A chart can be mathematically precise yet scientifically misleading when self-selection or measurement quality is weak. State what the study directly observed and what is unknown. Avoid declaring either that the intervention works universally or that the study has no value; quality assessment is about justified scope."
      ]
    ],
    "example": "A 200-person convenience survey reports a relationship between weekly walking hours and self-rated stress. You summarize the association among respondents and note that the design cannot rule out confounding, reverse causality, or inaccurate self-reports.",
    "task": "Select one short research abstract, identify sample, exposure or intervention, outcome, comparison, design, and two alternative explanations. Finish with a conclusion no stronger than the evidence.",
    "quiz": [
      "What can a cross-sectional observational association establish on its own?",
      [
        "A universal causal relationship",
        "An association in the measured sample",
        "That all confounding was removed"
      ],
      1,
      "Without stronger design or other evidence, an observed correlation does not prove cause and effect."
    ]
  },
  "relationships": {
    "id": "case-boundary-repair",
    "title": "Capstone: choose a safe boundary and a repair path",
    "intro": "Practice distinguishing a personal boundary from controlling another person, while recognizing when safety must come before reconciliation.",
    "sections": [
      [
        "Name the behavior and the personal limit",
        "A disagreement becomes heated when a partner repeatedly raises their voice. You can state 'I will leave this conversation when shouting starts, and return only when it is calm.' That defines your own action. 'You may never speak to your friends again' tries to control another person's autonomy and is not a healthy substitute for a boundary."
      ],
      [
        "Offer repair without demanding forgiveness",
        "When a mistake was yours, acknowledge the specific action and its impact, avoid excuses, ask whether the other person wants to discuss repair, and describe a realistic change you can make. A sincere apology does not require an immediate reply or guarantee reconciliation. Listen to the other person's account rather than instructing them to forgive."
      ],
      [
        "Make room for safety",
        "If there are threats, stalking, intimidation, coercion, or violence, a direct confrontation or joint problem-solving exercise may increase risk. Seek trusted local support and appropriate safety resources. This lesson does not provide relationship diagnosis; repeated harmful patterns require attention beyond a communication script."
      ]
    ],
    "example": "After interrupting someone in a difficult discussion, one partner says, 'I interrupted you twice and I will let you finish before I respond.' The other may accept, ask for time, or decline. The speaker does not demand instant forgiveness.",
    "task": "Write one respectful boundary about your own participation, one specific apology for a fictional mild mistake, and one safety warning sign that would change your approach from dialogue to seeking support.",
    "quiz": [
      "Which statement describes a boundary rather than a controlling demand?",
      [
        "You must stop seeing everyone I dislike",
        "I will end this conversation if threats begin",
        "You have to forgive me right now"
      ],
      1,
      "A boundary names what the speaker will do, not a command controlling another person's relationships or feelings."
    ]
  },
  "negotiation": {
    "id": "case-three-offers",
    "title": "Capstone: compare three freelance contract offers",
    "intro": "Evaluate real alternatives, contract scope, and risks before discussing price. Practice BATNA preparation without bluffing or inventing offers.",
    "sections": [
      [
        "Make alternatives comparable",
        "A freelancer receives Offer A at ₱25,000 with four included revisions, Offer B at ₱22,000 with one revision, and an existing small client project paying ₱16,000 for less work. Compare delivery dates, hours, taxes, payment terms, revisions, client reliability, and actual capacity. The lowest price may be sensible if scope is smaller; the highest can become unprofitable if revisions are unlimited."
      ],
      [
        "Choose objective negotiation criteria",
        "Define each deliverable, acceptance criteria, limits on changes, and who supplies required assets. Ask for clarification rather than accepting vague wording. Identify the best alternative that you can really pursue if no agreement is reached, including its uncertainty, and decide what terms would make the offer preferable."
      ],
      [
        "Keep the negotiation truthful",
        "A BATNA is not a fabricated threat. Avoid claiming you have another client when you do not, imposing invented deadlines, or hiding known risks. A short written proposal that explains scope, milestones, and payment conditions can protect both parties. Employment or regulated contracts may need qualified advice."
      ]
    ],
    "example": "Offer A is larger but has unlimited correction requests that could double work time. The freelancer proposes two specified revision rounds and a change-order price. If the client declines, they compare the verified net value of Offer B and existing work instead of bluffing about other offers.",
    "task": "Make a comparison table for three hypothetical work offers. Use at least six terms beyond gross price. Identify one genuine alternative, a walk-away condition, and a respectful question to clarify hidden scope.",
    "quiz": [
      "What makes a freelancer's BATNA credible?",
      [
        "An alternative that genuinely exists and can be pursued",
        "A false claim of a higher-paying client",
        "An ultimatum without evaluating terms"
      ],
      0,
      "Only a realistic available alternative helps compare the negotiated deal."
    ]
  },
  "shadow": {
    "id": "case-pressure-defenses",
    "title": "Capstone: recognize coercive pressure without escalating danger",
    "intro": "Identify combinations of urgency, isolation, threatened consequences, and secrecy, then prioritize safe protective options rather than reproducing manipulation tactics.",
    "sections": [
      [
        "Identify the pattern in exact terms",
        "Someone demands an immediate transfer of money and threatens to reveal a private conversation if you refuse. Record the request, deadline, threat, and whether the person discourages independent advice. A single urgent request does not always equal coercion; the presence of threats and restricted choice changes the risk picture."
      ],
      [
        "Separate response options from promises of safety",
        "A helpful support step may be speaking privately with a trusted person, saving relevant evidence where safe, reviewing account security, or contacting a qualified support service. In an abusive situation, confrontation, secretly recording, or abruptly changing access can have risks; do not follow a generic script without considering personal safety and local law."
      ],
      [
        "Reject the harmful reverse lesson",
        "The objective is recognition and protection, not teaching someone how to exploit urgency, dependence, intimate material, or financial vulnerability. Do not test manipulative techniques on others to 'see if they work.' If there is immediate danger, seek suitable local emergency or protective support; this case exercise is not a replacement."
      ]
    ],
    "example": "A person receives a demand to send their salary or face public humiliation. They identify the demand plus threat, avoid providing additional credentials, and seek independent help through a safe channel rather than assuming a single confrontation will resolve the situation.",
    "task": "For a fictional coercive message, list the exact demand, threat, pressure to keep secrets, and two protective responses that do not depend on outsmarting or confronting the person. State when qualified local help would matter.",
    "quiz": [
      "Which detail makes the fictional request a serious warning sign?",
      [
        "A respectful question with time to decide",
        "A threat attached to refusal and pressure to remain silent",
        "An ordinary request for clarification"
      ],
      1,
      "Threats and secrecy combined with a demand undermine voluntary choice and can raise safety concerns."
    ]
  }
};
export const CAPSTONE_LABS=Object.freeze(Object.fromEntries(
 Object.entries(CASES).map(([courseId,entry])=>[courseId,[{
  id:entry.id,title:entry.title,stage:'Advanced',minutes:24,intro:entry.intro,
  sections:entry.sections.map(([heading,body])=>({heading,body})),
  example:entry.example,task:entry.task,
  quiz:{question:entry.quiz[0],options:entry.quiz[1],correct:entry.quiz[2],explanation:entry.quiz[3]},
  sources:[{label:SOURCES[courseId][0],url:SOURCES[courseId][1]}]
 }]])
));
export const CAPSTONE_LAB_COUNT=Object.values(CAPSTONE_LABS).reduce((n,lessons)=>n+lessons.length,0);
