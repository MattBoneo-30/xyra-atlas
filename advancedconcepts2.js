/** Xyra Atlas advanced concept-first chapters, group B.
 * Original educational teaching; specialist review is pending.
 */
export const ADVANCED_CONCEPTS_B={
  "thinking": {
    "id": "base-rate-and-selection-bias",
    "title": "Base rates, conditional probability and selection effects",
    "minutes": 39,
    "sections": [
      [
        "Start from the population before the memorable case",
        "A dramatic example can feel common because it is easy to remember. A base rate describes how frequently an outcome occurs in the relevant population over a defined period. Before interpreting a surprising claim, specify the denominator and whether your sample is representative of the population for the decision. A review drawn only from people who complained may tell you about the complaints, but cannot directly tell you the overall rate among all customers."
      ],
      [
        "Compute conditional outcomes with a count table",
        "Suppose a screening test has 90 percent sensitivity and 90 percent specificity for a fictional condition that affects 1 percent of 10,000 people. About 100 people have the condition and 90 test positive. Among the 9,900 without it, roughly 990 are false positives. There are approximately 1,080 positive tests, of which only 90 are true positives: 90 divided by 1,080 is about 8.3 percent. Sensitivity is not the probability of a condition given a positive result. The example illustrates base-rate dependence, not any real medical screening tool."
      ],
      [
        "Ask who was selected and who disappeared",
        "Sampling bias can arise when participation, visibility or follow-up depends on the outcome. A success story from users who completed a program ignores those who left early; survey responses from vocal customers may differ from quiet customers. Draw a simple selection diagram: what causes exposure to the sample, and could that also relate to the measured result? Compare like-for-like populations before describing a causal effect. Avoid replacing uncertain evidence with a claim that no effect is possible."
      ]
    ],
    "case": "An advertisement says its imaginary test is 90 percent accurate, so a positive result means nine chances in ten of having the condition. But prevalence in the specified 10,000-person population is one percent. Of about 1,080 positives, 990 are false alarms under the given assumptions, leaving roughly 8.3 percent true positives. The marketing claim confuses two conditional probabilities. The calculation cannot predict any actual individual’s condition without a valid calibrated model and qualified interpretation.",
    "task": "Reproduce the 10,000-person two-by-two count table and the probability of a true condition among positives. Next change prevalence to ten percent while keeping sensitivity and specificity fixed, calculate the new result, and explain which assumptions must hold for the illustrative calculation. Add one example of survivorship bias in an unrelated business or learning dataset.",
    "model": "At ten percent prevalence, 1,000 people have the fictional condition and 9,000 do not. Sensitivity 90 percent gives 900 true positives; specificity 90 percent gives 900 false positives; total positives are 1,800, so 900/1,800 = 50 percent are true positives. That differs sharply from roughly 8.3 percent at one percent prevalence although test characteristics are unchanged. Real testing may not fit a fixed-rate model, and the case should not be interpreted as medical advice.",
    "rubric": [
      "The total population and two conditional probabilities are explicitly identified.",
      "All true and false classifications reconcile to the population counts.",
      "The calculation changes correctly when prevalence changes.",
      "No medical diagnosis or causal inference is claimed from the classroom example."
    ]
  },
  "digital": {
    "id": "passkey-and-recovery-map",
    "title": "Authentication threat models and resilient recovery",
    "minutes": 39,
    "sections": [
      [
        "Differentiate who you are from what you can access",
        "Authentication verifies an asserted identity; authorization determines whether that identity may perform a specific action on a particular resource. Strong sign-in alone cannot protect an API that permits cross-user document downloads. In a threat model, list assets, entry points, credential types, recovery routes and who controls each step. Identify the damage from one stolen device, one leaked password or one support impersonation attempt before choosing controls."
      ],
      [
        "Passkeys change common phishing risks, not every risk",
        "Origin-bound cryptographic authentication, including appropriately implemented passkeys, can resist credential phishing because the browser and authenticator bind the response to a legitimate service origin. NIST SP 800-63-4 distinguishes authenticator types and assurance requirements; a password or SMS code is not equivalent to every cryptographic method. However, device compromise, account recovery flaws, cloud sync risks, insecure sessions or server authorization failures can still matter. Do not market passkeys as making an entire application perfectly secure."
      ],
      [
        "Recovery and incident response are part of the design",
        "Document how a legitimate user regains access when all devices are lost. Review session invalidation, recovery contacts, identity re-verification, trusted channels, and rate limits on sensitive changes. If a user reports possible credential exposure, advise actions through the official app or site rather than the suspicious message link. In a permitted test environment, verify that a stolen old session is revoked after recovery and that other users’ resources remain inaccessible. Never experiment against accounts or services without permission."
      ]
    ],
    "case": "A vault application adds passkeys and announces that all data is now unhackable. During a permitted test, a user can still request another test user’s document through a download endpoint that checks only whether the requester is logged in. The passkey authenticator worked as designed; the server failed to check resource ownership. The team patches authorization, adds a regression test and documents a separate lost-device recovery process. A trustworthy security claim states which control was tested, not that all threats disappeared.",
    "task": "Create a threat model for a fictional document vault with two test accounts and three assets: login identity, private documents and recovery credentials. Map one phishing threat, one broken authorization threat and one lost-device threat. Write acceptance tests that can run entirely on authorized test data and explain the residual risk after each mitigation.",
    "model": "A good security table names the authentication origin and verifies passkey challenge handling; identifies the document API as a separate authorization boundary; and defines recovery as a guarded change to trusted account factors. The most important negative test authenticates as user B and requests user A’s test document, expecting a server denial. The lost-device test revokes old sessions and verifies secure recovery without exposing other accounts. None of these tests prove a zero-risk product.",
    "rubric": [
      "Authentication and per-resource authorization are treated as distinct controls.",
      "Phishing-resistance statements are scoped to authenticator behavior.",
      "Recovery and session revocation have permitted negative tests.",
      "Security claims name verified boundaries and unresolved dependencies."
    ]
  },
  "career": {
    "id": "resume-role-matching",
    "title": "Evidence-led resume design and technical storytelling",
    "minutes": 36,
    "sections": [
      [
        "Map an actual requirement to an honest contribution",
        "A job description contains responsibilities, skills and evidence the employer hopes to see. Build a table with requirement, your actual project or work, your role, measurable outcome and the artifact that supports it. Do not claim team achievements as solo accomplishments or list technologies you cannot explain. If a requirement is unmet, identify a small public demonstration you could realistically build instead of fabricating experience."
      ],
      [
        "Write bullets that explain action and verification",
        "A strong bullet communicates context, action and an observable result. For a software project, distinguish developing a feature from proving its reliability. Instead of writing Built a secure scalable platform, specify a concrete deliverable such as implemented authenticated document access and added cross-account denial tests. Include measurements only if the method and baseline are documented. Avoid inventing percentages, hiring outcomes or production traffic numbers that a skeptical interviewer could not verify."
      ],
      [
        "Design an interview defense around tradeoffs",
        "Choose one architecture decision, an alternative and a limitation. Describe why the selected stack fit the requirements, how deployment differs from local testing and how you handled an error. Prepare a simple reproduction route, sample data or test command without exposing private credentials. A portfolio is stronger when the reviewer can inspect the decision and its evidence; visual design alone cannot establish security, accessibility or performance."
      ]
    ],
    "case": "A graduate lists React, Laravel and MySQL, and describes their project as enterprise-ready. Their repository shows a working interface but no install instructions or authorization tests. They revise the case study to name exact components they implemented, explain why server-side identity validation was necessary, add local setup instructions and one regression test for unauthorized file access. The updated description is narrower but much easier for a technical reviewer to trust.",
    "task": "Choose one real or fictional full-stack project and produce four resume bullets, each tied to a requirement, action, evidence and honest limitation. Create a one-page architecture note comparing an alternate implementation. Design a reviewer challenge that might falsify your best claim and state what you would do if that test failed.",
    "model": "A defensible example is Implemented an authenticated React interface with Laravel endpoints and documented both allowed requests and blocked cross-account access using test accounts. The bullet describes a specific contribution and a repeatable check without claiming an independent security audit. A second artifact explains the choice of a server authorization boundary over client-only filtering. If the test fails, the case study must say the feature is incomplete until repaired.",
    "rubric": [
      "Every claimed skill maps to work that can be demonstrated independently.",
      "Ownership is accurate and team contributions are not appropriated.",
      "A limitation and an alternative architecture are explicitly described.",
      "No unmeasured performance, accessibility or security guarantees appear."
    ]
  },
  "science": {
    "id": "measurement-and-uncertainty",
    "title": "Measurement uncertainty from instruments to conclusions",
    "minutes": 38,
    "sections": [
      [
        "Define what is measured and how",
        "A number is meaningful only with a physical quantity, unit, instrument, method and context. Resolution, repeatability and accuracy are different properties. An instrument showing two decimal places does not prove that all displayed digits are correct. Record whether observations were independent and how the environment was controlled. Before calculating an average, check that all measurements concern the same phenomenon under comparable conditions."
      ],
      [
        "Quantify repeatability without hiding bias",
        "Imagine a sensor reports 24.61, 24.62 and 24.63 degrees Celsius under stable conditions. The mean is 24.62 degrees, and the observed range is only 0.02 degrees. A calibrated reference under suitable comparison conditions reads 25.40 degrees, suggesting an offset of about minus 0.78 degrees. More repeated sensor readings can improve the estimate of random variability but cannot correct an unexamined systematic difference. Account for reference uncertainty, calibration validity, probe location and response time before adjusting readings."
      ],
      [
        "Report conclusions with an uncertainty budget",
        "List likely random and systematic effects separately: instrument limits, sample variability, operator technique, reference uncertainty and environmental drift. Describe which components were measured, which were estimated and which remain unknown. When results inform safety or health decisions, seek appropriate certified measurement and professional interpretation. A classroom error estimate is not a calibration certificate. Avoid reporting precision beyond evidence or turning a correlation into a causal conclusion."
      ]
    ],
    "case": "Three measurements are tightly clustered, so a learner claims the room is precisely 24.62 degrees Celsius. A properly used reference indicates 25.40 degrees. The learner now separates a repeatable instrument from an accurate one and checks whether both probes were in the same stable location. The observed offset suggests systematic bias but is not automatically a correction to every future reading, because temperature dependence and reference uncertainty may vary.",
    "task": "Compute the mean, range and approximate offset from the three sensor readings and 25.40-degree reference. Create an uncertainty checklist with at least four items, identify one plausible systematic effect and design a second calibration comparison at a different stable temperature. State which observations would change whether you trust the initial offset.",
    "model": "The average is 24.62 degrees Celsius, the maximum-minus-minimum range is 0.02 degrees and the average sensor-minus-reference difference is about minus 0.78 degrees. These values describe this comparison, not universal instrument performance. Further tests should examine the certified reference uncertainty, probe placement, stabilization and temperature-dependent drift. If the offset changes at a second temperature, using one fixed correction would need reconsideration.",
    "rubric": [
      "Units, averages, range and sign of the offset are reported correctly.",
      "Repeatability and agreement with a reference are clearly distinguished.",
      "Systematic uncertainty is not falsely solved by taking more readings.",
      "A reproducible second test and the limits of the estimate are stated."
    ]
  },
  "relationships": {
    "id": "repair-after-conflict",
    "title": "Repair, autonomy and when the frame must change",
    "minutes": 37,
    "sections": [
      [
        "Separate effect, responsibility and inferred intention",
        "A repair conversation can begin with observable conduct and its impact without diagnosing motives. Both people may experience legitimate frustration while remembering events differently. Identify what happened, what each person expected and whether either person can safely disagree. Responsibility means acknowledging a chosen action and making a credible change, not automatically accepting an unsupported global judgment about personal worth."
      ],
      [
        "A repair plan requires measurable behavior",
        "After hearing both accounts, agree on a small procedure that the people involved can actually follow. If a cancellation caused hurt, for example, define when to warn about a scheduling problem and how to confirm new plans. Review whether the behavior changed rather than counting how many times someone apologized. A boundary describes one’s own choices; it should not be an ultimatum designed to force affection, isolation or access to private accounts."
      ],
      [
        "Coercion changes the priority from persuasion to safety",
        "Repeated threats, exposure of private information, stalking or demands for isolation are not ordinary disagreement styles. If the person targeted fears retaliation, do not insist on a private meeting or evidence collection that increases risk. Offer trusted support and choices appropriate to that person’s circumstances. Avoid declaring a clinical diagnosis or making generalized assumptions from one-sided anecdotes. The educational distinction is between observable risk patterns and a routine repair process."
      ]
    ],
    "case": "Two friends cancel plans and disagree about how much notice is reasonable. They discuss the impact and agree to check schedules the day before. Later, in a different fictional scenario, one repeatedly threatens to publish private messages whenever the other declines an invitation. The second pattern makes a normal negotiation script unsafe. The response shifts toward protecting privacy, seeking support and preserving the threatened person’s autonomy.",
    "task": "Write two contrasting timelines: one routine conflict with a repairable scheduling mismatch and one pattern containing threats to privacy. For the first, prepare a short accountable repair script and follow-up test. For the second, identify a nonconfrontational safety choice, a trusted support path and why forcing immediate disclosure might cause harm.",
    "model": "In the ordinary conflict, someone might say I felt disappointed when the meeting was cancelled late; could we confirm by Thursday next time? The other person can accept, propose an alternative or explain constraints. In the threatening case, the central evidence is repeated conditional exposure threats, not a supposed personality label. A supportive response offers safe options and does not require the person to negotiate alone or surrender private information.",
    "rubric": [
      "Routine conflict is not conflated with coercive control.",
      "Repair involves voluntary, observable behavior rather than forced agreement.",
      "Safety options prioritize autonomy and realistic retaliation risks.",
      "No clinical diagnosis or universal legal outcome is inferred from the scenario."
    ]
  },
  "negotiation": {
    "id": "objective-criteria-negotiation",
    "title": "Negotiating packages through verifiable criteria",
    "minutes": 38,
    "sections": [
      [
        "Positions are prices; interests are the reasons behind them",
        "An opening offer is information about a position, not a complete account of the other party’s constraints. Ask what the buyer values about time, scope, risk, support and certainty. Prepare your own credible alternative before bargaining. A supposed alternative that does not actually exist is not a BATNA and should not be used as a threat. Document which concessions cost you money or time and which might create mutual value."
      ],
      [
        "Compare total packages with a common model",
        "A freelancer is offered ₱30,000 for a 40-hour deliverable with two revision rounds and 50 percent paid up front. Another offer is ₱33,000 for 42 expected hours but unlimited revisions and payment only after acceptance. The visible rates are ₱750 per hour for the first and about ₱786 per hour for the second. However, ten extra hours of rework would reduce the second offer to roughly ₱635 per hour, before taxes and other costs. Payment risk and acceptance ambiguity also matter."
      ],
      [
        "Counter with criteria and a documented change rule",
        "Instead of demanding a larger headline amount alone, propose measurable deliverables, acceptance tests, revision counts, change-control fees, cancellation terms and a realistic deadline. Compare the expected package value to the actual alternative available. If the buyer changes requirements after agreement, ask for a clear variation before doing the extra work. Legal remedies depend on jurisdiction and contract language; a professional negotiator does not invent them."
      ]
    ],
    "case": "A developer initially prefers the ₱33,000 contract because its headline price and stated hourly rate look higher. After asking about revisions, the buyer confirms acceptance is subjective and there is no change limit. The developer proposes a revision cap and staged acceptance milestones before ranking offers. That clarifies uncertainty without assuming the client acts in bad faith. The preferred outcome is a fair, executable agreement, not simply winning the highest first number.",
    "task": "Compare the two package rates using 0, 5 and 10 additional revision hours for the second offer. Draft a three-term counteroffer that names deliverables, change acceptance and payment timing. Include your actual alternative and a transparent walk-away criterion. Explain one way the buyer might reasonably reject the new terms.",
    "model": "At 42 hours the second offer yields approximately ₱785.71 per hour; with five extra hours, ₱33,000 divided by 47 is about ₱702.13; with ten extra hours, divided by 52 is about ₱634.62. These are gross rates before taxes and overhead. The first offer remains ₱750 for its stated 40 hours if revisions fit inside that estimate. A sensible counteroffer caps revisions, defines objective acceptance and splits payment at verifiable milestones; any legal claim must be reviewed under the actual contract and jurisdiction.",
    "rubric": [
      "Total work and revision sensitivity are included in every comparison.",
      "Nonprice terms are evaluated alongside headline compensation.",
      "The counteroffer is written in measurable, negotiable terms.",
      "The walk-away option is real, not fabricated leverage."
    ]
  },
  "shadow": {
    "id": "consent-and-digital-boundaries",
    "title": "Digital consent, disclosure and protective decision-making",
    "minutes": 37,
    "sections": [
      [
        "Permission is contextual and specific",
        "Consent to share a message with one person does not necessarily authorize forwarding it to a group, using it to impersonate someone or retaining it forever. Consent is meaningful when the person understands the proposed use and can freely choose without manipulation or threats. Describe the permitted action, audience, retention expectations and revocation limitations in plain language. The laws that govern recording, intimate images and personal-data processing vary by jurisdiction, so do not invent a universal legal remedy."
      ],
      [
        "Design privacy boundaries before a dispute",
        "For a shared project, define who can access files, where material is stored, whether screenshots can be redistributed and how permissions are changed. Access controls should be enforced by the system, not only by a promise in a chat. Minimize unnecessary sensitive information and avoid storing secrets or images in public folders. For digital coercion, use independently trusted accounts and support channels; arguing with a threatening sender is rarely a reliable verification strategy."
      ],
      [
        "Recognize threats and preserve safe choices",
        "Repeated exposure threats, unauthorized sharing and demands for credentials create concrete privacy and safety concerns. A person may choose not to save evidence if doing so increases immediate danger. Offer options for securing accounts, asking trusted people for support and consulting qualified local services. Avoid stigmatizing someone for a past private interaction. The educational objective is to recognize coercive behavior and reduce harm, not to teach pressure tactics or promise automatic legal outcomes."
      ]
    ],
    "case": "A person shares a private photo with a friend for a single conversation. Later, the friend asks to forward it to another group for entertainment. The original sharing does not establish permission for that separate use. In a more serious fictional case, the friend threatens publication unless the sender gives them an account password. The response should prioritize immediate safety, trusted support and protecting account access, rather than negotiating permission under pressure.",
    "task": "Draft a fictional digital-boundary agreement covering audience, forwarding, retention, account access and the handling of a request to stop. Then write two safe responses: one for an ordinary misunderstanding about forwarding and one for a coercive disclosure threat. Include circumstances in which collecting screenshots or confronting someone might itself increase risk.",
    "model": "A bounded agreement says shared project files remain available only to named collaborators for the stated purpose, are not forwarded or publicly posted without additional permission, and have an agreed deletion or retention process when feasible. If someone asks to stop redistribution, treat that request seriously and explain any technical limits. Under an exposure threat, prioritize safety and independently verified support instead of treating forced password disclosure as voluntary consent.",
    "rubric": [
      "The agreement separates distinct uses rather than granting unlimited permission.",
      "Audience, retention, access controls and change procedures are specified.",
      "Threatened people retain choices about disclosure and evidence collection.",
      "No harmful manipulation technique or unsupported legal entitlement is presented."
    ]
  }
};
