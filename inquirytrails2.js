/** Xyra Atlas — four-stop inquiry trails, remaining seven subjects.
 * Original educational exercises pending independent expert editorial review.
 */
export const INQUIRY_TRAILS_TWO={
  "thinking": {
    "title": "The Number Behind the Headline",
    "thesis": "Learn to inspect persuasive statistics, identify causal gaps and update conclusions when the denominator changes.",
    "context": "A fictional learning program announces that it doubled examination success. Its viral chart omits how many people were enrolled, which students left, and whether another tutoring program operated during the same period.",
    "boundary": "Statistical and digital-ethics education only. Real high-stakes screening requires independent expert assessment, privacy protections and appropriate legal review.",
    "stations": [
      {
        "heading": "Observe the missing denominator",
        "question": "What question must be answered before 'doubled success' can be interpreted?",
        "concept": "A percentage has a numerator and denominator, plus a definition of the measured event. A relative increase from 20% to 40% is different from an increase of twenty percentage points, although both descriptions are true for that example. Without counts and population context the claimed magnitude can mislead.",
        "challenge": "Rewrite the headline into a precise statement requiring two dated cohorts, a clearly defined outcome, number of successes and number eligible for assessment.",
        "worked": "If 40 of 200 earlier learners pass and 40 of 100 later learners pass, the reported pass rate doubles from 20% to 40%, even though the number passing stays 40. Both counts must be reported.",
        "trap": "Repeating the rate change without the smaller eligible cohort makes it sound as though more people definitely benefited.",
        "evidence": "The revised statement defines the event and gives enough numbers to reproduce the rate."
      },
      {
        "heading": "Explain competing causal accounts",
        "question": "Does the changed rate demonstrate the program caused improvement?",
        "concept": "A before-and-after comparison does not identify causal impact if admissions, withdrawals, school calendars or outside tutoring changed. A competing mechanism should make a prediction that could be compared against relevant data. Skepticism alone does not prove the program ineffective.",
        "challenge": "Write three explanations for the observed rate: genuine program benefit, selective entry, and outside tutoring. Describe one record that might weaken each account.",
        "worked": "If the later group was selected for stronger prior scores, its higher pass rate may not be caused by the program. Comparable baseline scores and independent tutor records would help evaluate alternatives without confirming any one cause automatically.",
        "trap": "Concluding 'the program definitely failed' is just as unsupported as declaring success solely from the chart.",
        "evidence": "The analysis specifies what new observation could distinguish causes rather than merely naming biases."
      },
      {
        "heading": "Challenge a confident classifier",
        "question": "How could a system that catches most problems still produce unreliable alerts?",
        "concept": "Conditional probability depends on the base rate. In a rare-event population, false positives can dominate even when a detector has high sensitivity. Construct a complete confusion matrix instead of confusing the fraction of true problems detected with the fraction of flagged cases that are true problems.",
        "challenge": "A fictional detector screens 1,000 applications; ten truly contain a problem, nine are flagged, and fifty normal applications are falsely flagged. Calculate what share of all flags reflect a real problem.",
        "worked": "Nine true positives divided by fifty-nine total flags is approximately 15.3%. The nine-of-ten sensitivity is 90%, but that is a different denominator. An alert should trigger careful review, not irreversible punishment.",
        "trap": "Stating that every flagged applicant is 90% likely to be problematic confuses sensitivity with predictive value.",
        "evidence": "The conclusion shows the 2×2 counts and names the costs of both false alarms and missed events."
      },
      {
        "heading": "Transfer to a scholarship decision",
        "question": "What must change when an uncertain score affects an individual opportunity?",
        "concept": "Predictions in high-stakes systems interact with access barriers, poor historic labels and unequal error costs. A statistically strong aggregate can still produce harmful decisions for subgroups. Human review, appeals and a defined stopping condition protect people where evidence remains weak.",
        "challenge": "Design a provisional scholarship screener with disclosed role, missing-field treatment, evidence checks, fair reconsideration route and triggers to suspend automatic decisions.",
        "worked": "A safer proposal treats model scores as one review input, audits historic label quality and supports applicants whose missing fields reflect internet access. It does not claim fairness without subgroup evidence or let software alone deny eligibility.",
        "trap": "A system that predicts an earlier human decision accurately may reproduce that decision's bias rather than objective merit.",
        "evidence": "The proposal distinguishes prediction from cause and includes a practical appeal and reversibility mechanism."
      }
    ]
  },
  "digital": {
    "title": "The Backup That Must Not Break",
    "thesis": "Learn threat-model thinking and resilient backup design by following a failed import from its first warning through release decision.",
    "context": "An offline-first notes PWA has private learner notes and local review schedules. A new JSON import feature appears helpful until a corrupted file silently clears existing data, raising questions about integrity, recovery and trustworthy user messaging.",
    "boundary": "Defensive software education, not security certification. Do not include real passwords, tokens, financial details or personal learner records in public tests.",
    "stations": [
      {
        "heading": "Observe the critical data boundaries",
        "question": "Which assets are at risk even without a server?",
        "concept": "Offline-first software has browser eviction, device sharing, physical loss, bad imports and unsafe rendering risks. Identify confidentiality, integrity and availability separately. Browser storage is not a guarantee of permanence and a backup stored beside the device may fail with it.",
        "challenge": "Draw an asset-to-risk table for notes, review schedules, app settings, export files and shared-device access. Add one residual risk no app feature can entirely remove.",
        "worked": "For example, an exported backup can mitigate eviction, but the file may itself be corrupted, lost or shared. Protected device access matters because local storage may remain readable on an unlocked device.",
        "trap": "'No cloud means no security risk' confuses reduced remote exposure with total protection.",
        "evidence": "Each asset has a credible failure mode and a user-facing protection or limitation."
      },
      {
        "heading": "Explain safe import invariants",
        "question": "What should remain true when a selected file is invalid?",
        "concept": "Parsing JSON is only the first validation step. A safe importer must check supported schema version, types, array limits, sizes, relationships and unsafe strings treated as data. Atomicity means either the validated new state commits completely or the previous state stays intact.",
        "challenge": "Design postconditions for a valid backup, a truncated file, an unsupported schema version and a note with the wrong type.",
        "worked": "A rejected file must not erase the original twelve notes or review schedules. Temporary validation and a transactional or recoverable commit path separate input checking from state replacement. A success requires semantic equality across documented fields.",
        "trap": "Clearing current notes before fully validating the candidate turns an ordinary input error into data loss.",
        "evidence": "The test explicitly states unchanged state after every failure and a complete verified restore after success."
      },
      {
        "heading": "Challenge a reassuring export result",
        "question": "Does a successful export demonstrate users can restore?",
        "concept": "An export button may create a file while losing important metadata, mishandling passwords or failing on a different browser version. A meaningful recovery test performs a round trip in a clean profile and deliberately tests adverse scenarios. Scope and device limitations must be stated truthfully.",
        "challenge": "Describe a matrix for valid restoration, wrong password, file corruption, interruption, offline reopen and browser storage eviction. Mark which require physical devices.",
        "worked": "A passing desktop round trip supports a narrow behavior claim; it cannot establish that iOS storage survives eviction or that a forgotten password can be recovered. Wrong-password and malformed-file failures must leave previous notes intact.",
        "trap": "A green build badge is not proof of complete backup recoverability, encryption safety or permanent storage.",
        "evidence": "The matrix distinguishes executed evidence from planned tests and names a rollback condition."
      },
      {
        "heading": "Transfer to a money-management app",
        "question": "How would a larger privacy impact change the release decision?",
        "concept": "An application with transaction descriptions and bank data may face stricter access and export risks. Convenience features such as automatic sync must be weighed against new trust boundaries, user consent and obligations. A documented threat model and valid backups are prerequisites, not afterthoughts.",
        "challenge": "Write a release decision for an offline expense tracker that wants to add cloud sync. Compare a local export option, optional encrypted sync and indefinite deferral with test evidence required for each.",
        "worked": "A local export keeps network exposure narrower but still needs validation and secure user handling. Sync requires a different authentication, encryption, key recovery and legal review plan. Nothing should be called production-safe merely because it compiles.",
        "trap": "Treating convenience as proof of adequate authorization or privacy overstates what the technical work establishes.",
        "evidence": "The release note includes clear tested behavior, unresolved risk and a condition to pause rollout."
      }
    ]
  },
  "career": {
    "title": "A Portfolio That Can Be Proven",
    "thesis": "Turn a polished project showcase into an evidence-backed engineering narrative with reproducible tests and honest boundaries.",
    "context": "An IT graduate has an elegant personal vault prototype, a group capstone and an unfinished storefront. A résumé says the projects are production-ready and dramatically improve productivity, but no reliable measurements support those claims.",
    "boundary": "Career education only, with no job or certification guarantee. Respect confidentiality, licenses and participant privacy.",
    "stations": [
      {
        "heading": "Observe the claim versus artifact",
        "question": "Which statements could an interviewer independently verify?",
        "concept": "A screenshot documents appearance; it does not establish load performance, security, accessibility or business value. A feature claim should name the actual behavior and your individual contribution. A broad impact claim needs measured baseline, population, conditions and a reasonable comparison.",
        "challenge": "Choose two résumé claims and map them to source code, a test run or a safe demonstration. Mark a claim as unverified when no reproducible evidence exists.",
        "worked": "'Implemented local note search with a reproducible keyboard test' can be supported. 'Guaranteed secure and 80% faster for everyone' needs independent performance and security evidence unavailable in a personal prototype.",
        "trap": "Turning a private experimental app into a fictitious paying business on a résumé risks professional credibility.",
        "evidence": "Every claim has a demonstrated behavior, a qualified measurement or an honest uncertainty note."
      },
      {
        "heading": "Explain an engineering choice",
        "question": "What trade-off would justify the architecture in a real review?",
        "concept": "A case study should connect user problem, constraints, competing options, decision and evaluation. Local-first storage can improve offline usability while increasing backup requirements. A particular framework is a tool, not proof of quality in isolation.",
        "challenge": "Create a one-page decision record comparing local storage and a hosted backend for the vault. Include privacy assumptions, offline need, recovery risk and one decision-reversing observation.",
        "worked": "A balanced record might choose local-first for simple offline use but make export/restore integrity a release prerequisite. With cross-device collaboration requirements, secure server-backed storage might become justified.",
        "trap": "Declaring an architecture universally superior conceals the conditions under which its disadvantages matter.",
        "evidence": "The reader can see why the decision was made and what evidence could reverse it."
      },
      {
        "heading": "Challenge invented impact numbers",
        "question": "Would an informal task demo justify a general productivity gain?",
        "concept": "Usability outcomes depend on task definition, users, device, sample and error handling. A few favorable responses can be useful pilot feedback without supporting population-level claims. The reliability of the measurement matters as much as the number.",
        "challenge": "Plan a repeatable note-finding task with clear success criteria and one accessible error state; report how a hypothetical five-person informal test should be described.",
        "worked": "If four of five invited participants complete the task, report it as an informal check with selection limits. It does not mean eighty percent faster, or that all target users can operate the app. Keyboard and screen-reader checks need their own evidence.",
        "trap": "Treating a sample success percentage as a speed improvement substitutes one metric for an entirely different one.",
        "evidence": "The report states task, denominator, environment, limitations and next test."
      },
      {
        "heading": "Transfer to a public portfolio release",
        "question": "How should an unfinished project be presented when secrets and real customers are involved?",
        "concept": "A public case study should be reproducible without leaking confidential data, tokens, account access or identifiable test participants. Honest project status can still demonstrate skill. Distinguish prototype, beta and production; note unperformed acceptance tests and ownership boundaries.",
        "challenge": "Write an interviewer-ready case outline with a narrow achievement, your role, reproducible steps, rejected alternatives, known defect and next validation milestone.",
        "worked": "A mature account might say the vault prototype supports local search and a tested export path but has not undergone external security or full mobile accessibility review. Provide a safe demo and redacted evidence only.",
        "trap": "Concealing known defects, publishing credentials or claiming production uptime from a local demo undermines trust.",
        "evidence": "The case study enables review while protecting data and avoiding unsupported commercial or security claims."
      }
    ]
  },
  "science": {
    "title": "The Observation That Changed the Model",
    "thesis": "Study models, measurement and confounding by tracing lunar observations and a separate urban-temperature experiment.",
    "context": "A learner sees different portions of the Moon illuminated on different evenings and hears that Earth's shadow explains every phase. Later they encounter a city claim that shade reliably reduces temperature by exactly four degrees.",
    "boundary": "Scientific education, not environmental or health certification. Never view the Sun directly without appropriate certified solar protection and training.",
    "stations": [
      {
        "heading": "Observe the lunar appearance",
        "question": "What did the observer actually see, and what remains an explanation?",
        "concept": "At a given time the lunar disk has a visible illuminated fraction. Describe that observation without immediately naming a cause. Moon phases usually reflect the geometry of Sun, Earth and Moon rather than Earth's shadow, which is involved in a lunar eclipse.",
        "challenge": "Write a dated observation with the visible fraction, sky position and weather limitations, without inventing precise coordinates or looking at the Sun.",
        "worked": "A quarter Moon appears roughly half-lit from Earth. The observed fraction alone is not proof that Earth's shadow covered the rest; a geometry model must explain when each appearance is expected.",
        "trap": "Calling an ordinary quarter phase a lunar eclipse confuses two physically different configurations.",
        "evidence": "The observation log separates what was seen from the causal model and records uncertainty."
      },
      {
        "heading": "Explain the geometry",
        "question": "Why can a mostly sunlit Moon look partly illuminated from our viewpoint?",
        "concept": "The Sun lights approximately one hemisphere of the Moon. As the Moon orbits Earth, the portion of that lit hemisphere visible to an Earth observer changes. Schematic drawings help explain the pattern but must not be mistaken for scale diagrams or actual measured positions.",
        "challenge": "Sketch four lunar positions and identify the sunlit hemisphere and fraction visible from Earth at each. Explain when a true lunar eclipse would require special alignment.",
        "worked": "At first quarter, the observer sees approximately half the visible face lit while the Sun still illuminates roughly half the Moon globally. An eclipse requires Earth to move into the sunlight path between Sun and Moon.",
        "trap": "Drawing the dark visible portion as Earth's shadow for every phase is a model error.",
        "evidence": "The diagram distinguishes phase geometry from eclipses and makes a testable sequence prediction."
      },
      {
        "heading": "Challenge a seasonal explanation",
        "question": "Would Earth–Sun distance alone explain opposite hemispheric seasons?",
        "concept": "Axial tilt changes the angle and duration of sunlight across hemispheres. A simple distance-only theory affects the whole planet similarly and cannot account for opposite seasonal patterns at the same time. Predictive comparison is stronger than memorizing a slogan.",
        "challenge": "Draw Earth with its axis tilted for a June solstice and compare northern and southern midlatitude sunlight patterns. Identify what the distance-only model fails to predict.",
        "worked": "Northern midlatitudes generally receive longer daylight and more direct sunlight in June while southern midlatitudes have the opposite seasonal tendency. The Earth–Sun distance is essentially shared at that instant, so it cannot alone explain the contrast.",
        "trap": "Explaining all summer heat by Earth being closer to the Sun ignores the actual hemispheric prediction.",
        "evidence": "The explanation makes contrasting predictions from two models and states the latitude/date dependence."
      },
      {
        "heading": "Transfer to a local thermometer study",
        "question": "What would a fair comparison require before claiming shade caused cooling?",
        "concept": "Two temperatures measured at different times with different instruments confound shade with time, sensor bias, surfaces, wind and traffic. Science requires an operational definition, controlled or recorded conditions and repeated observations. Unsupported decimal precision does not remove uncertainty.",
        "challenge": "A volunteer records 31°C in shade at 08:30 and 35°C on pavement at 13:00. Design paired-site measurements for a better estimate, naming instrument, timing, height and repetition.",
        "worked": "The two readings demonstrate a difference under unequal conditions, not an established four-degree causal tree effect. Simultaneous calibrated readings repeated across days are more interpretable, while long-term tree planting remains a separate intervention.",
        "trap": "Claiming a precise causal effect from unmatched observations confuses an association with an experiment.",
        "evidence": "The test plan can be replicated and clearly limits conclusions to the observed setting."
      }
    ]
  },
  "relationships": {
    "title": "Repair Is Not Instant Forgiveness",
    "thesis": "Understand privacy, consent, accountable repair and safety through a continuing fictional friendship case.",
    "context": "Two adult friends agree not to share identifiable details of a private dispute online. One posts a recognizable story, apologizes and then demands immediate forgiveness. The harmed friend must decide which boundaries are justified without attempting retaliation.",
    "boundary": "General relationship education, not therapy or diagnosis. If threats, coercion or violence occur, prioritize qualified safety support over further confrontation.",
    "stations": [
      {
        "heading": "Observe the agreement and action",
        "question": "What conduct breached the shared boundary?",
        "concept": "A specific privacy agreement can be compared with what was published. The effect of an identifiable post matters even if its author genuinely needed emotional support. Separate observed action, claimed motive and felt impact without diagnosing either person.",
        "challenge": "Write a neutral account of the agreement, the visible disclosure, the impact and one consent-respecting request. Leave private names and screenshots out of the public exercise.",
        "worked": "'We agreed not to identify each other, but this post makes the dispute recognizable; please remove the identifiable details' names the conflict. It does not forbid the poster from seeking safe, anonymized help.",
        "trap": "Demanding that a person never discuss distress with a trusted professional confuses privacy boundaries with isolation.",
        "evidence": "The account distinguishes the privacy breach from the legitimate need for outside support."
      },
      {
        "heading": "Explain meaningful repair",
        "question": "What would a repair proposal change in future behavior?",
        "concept": "An apology may acknowledge harm but is not proof of lasting repair. Observable accountability might include removing an identifiable post, clarifying future privacy boundaries and accepting that trust may recover slowly or not at all. Forgiveness and reconciliation are separate voluntary choices.",
        "challenge": "Review an apology that says 'I'm sorry, so you must forgive me now.' Rewrite it to recognize impact and offer an action without a demand for immediate closeness.",
        "worked": "A revised apology accepts responsibility for the recognizable disclosure and offers to remove it, then respects that renewed contact is the other person's decision. It should not bargain for deletion of someone's private journal.",
        "trap": "Emotional intensity or beautiful wording alone cannot establish that an agreed boundary will be respected later.",
        "evidence": "The proposed repair contains concrete behavior and does not coerce forgiveness."
      },
      {
        "heading": "Challenge a repeated pattern",
        "question": "How should a third disclosure change the decision?",
        "concept": "Repeated conduct after an explicit agreement provides additional evidence of reliability without revealing a hidden motive. A boundary describes what the affected person will do to protect their information; it is not a scheme to punish or humiliate the other person.",
        "challenge": "Assume the identifiable story is posted again after two repair conversations. Compare continued close sharing, reduced information exchange and time apart, noting likely consequences.",
        "worked": "Limiting sensitive disclosures or choosing distance may be proportionate. The person can seek trusted support and avoid covert tests or retaliatory exposure. One need not prove a personality diagnosis to protect private information.",
        "trap": "Publishing the other person's messages to 'teach them a lesson' reproduces the privacy harm and may increase danger.",
        "evidence": "The response follows observable repeated conduct, preserves autonomy and names a safety stop."
      },
      {
        "heading": "Transfer to family care",
        "question": "How could shared caregiving needs change the privacy process?",
        "concept": "Information sharing for a dependent relative may involve consent, necessity, medical duties and legal capacity. The friendship model's emphasis on dignity transfers, but informal rules alone cannot decide high-stakes health decisions. A qualified care or legal professional may need to guide the process.",
        "challenge": "Design a fictional sibling coordination note that shares only necessary appointment details and records who consented. Identify a case where outside expert guidance is needed.",
        "worked": "A suitable note limits access to necessary people and avoids posting private diagnoses in a general family chat. Where the relative can consent, their preferences matter; complex capacity questions require qualified review.",
        "trap": "Assuming family membership grants unlimited access to personal medical information ignores consent and local duties.",
        "evidence": "The method protects necessary care coordination while narrowing disclosure and acknowledging professional boundaries."
      }
    ]
  },
  "negotiation": {
    "title": "The Offer Behind the Number",
    "thesis": "Understand alternatives, the true cost of work, fair scope and the ability to decline a risky agreement.",
    "context": "A freelance developer receives an ₱8,000 offer for a UI prototype requiring fifty hours and unlimited revisions. Another available project pays ₱6,000 for twenty-five hours with a limited scope. The first client later asks for a new dashboard without changing the price.",
    "boundary": "Fictional negotiation education, not legal, employment or tax advice. Qualified counsel must verify real contractual rights.",
    "stations": [
      {
        "heading": "Observe the complete offer",
        "question": "Which terms matter beyond the opening payment figure?",
        "concept": "A fee is only one part of an agreement. Expected hours, payment certainty, deliverables, ownership, revisions, overhead and opportunity cost determine whether it improves on a genuine alternative. A hypothetical future job is not an actual BATNA.",
        "challenge": "Calculate gross hourly rates for the two offers and list material terms missing from the larger contract before accepting it.",
        "worked": "The first offer is ₱160 per expected hour and the second ₱240 before tax and overhead. Even that comparison remains incomplete until payment terms, revisions and work certainty are understood.",
        "trap": "Calling the larger ₱8,000 offer automatically better ignores the time and risk attached to it.",
        "evidence": "The comparison uses actual alternatives, total expected workload and material unknowns."
      },
      {
        "heading": "Explain scope and acceptance",
        "question": "What would both sides need to agree for 'finished' to have a meaning?",
        "concept": "An unlimited-revision promise lacks a bounded end. Effective contract scope specifies outputs, acceptance tests, included correction cycles, authorized reviewers, timeline, payment stages and paid changes. Clarifying terms can reduce conflict for both client and developer.",
        "challenge": "Draft a mini statement of work for a responsive prototype with three deliverables, a test environment, two revision rounds and an explicit change-request path.",
        "worked": "The statement could define pages and supported screen sizes, correction of agreed defects, two scheduled revision rounds and a separately priced dashboard addition. Current local law and IP terms need qualified review.",
        "trap": "Vague phrases such as 'world-class quality until satisfied' do not define acceptance or ownership.",
        "evidence": "Another person can determine what is included, when review ends and how to request a new feature."
      },
      {
        "heading": "Challenge the hidden hours",
        "question": "What happens to the effective rate when revisions grow?",
        "concept": "Additional unpaid work lowers realized compensation even when headline revenue stays fixed. Pricing uncertainty includes client delays, meetings, rework and post-delivery support. A reservation point should account for realistic alternative opportunities and risk, not just a preferred number.",
        "challenge": "Suppose the first contract expands from fifty to seventy-five hours with no added payment. Recompute the gross hourly return and propose a nonthreatening counteroffer.",
        "worked": "₱8,000 divided by seventy-five hours is about ₱106.67 per hour before expenses. A counteroffer might cap remaining revisions and put new functionality into a priced change order with mutual acceptance.",
        "trap": "Pretending more hours are free because they were not itemized hides a cost borne by the worker.",
        "evidence": "The revised comparison quantifies scope creep and offers a clear alternative without coercive pressure."
      },
      {
        "heading": "Transfer to SaaS vendor selection",
        "question": "Would the same negotiation logic apply to subscription software?",
        "concept": "Software vendors offer bundles of renewal price, export rights, security commitments, support response, migration costs and termination terms. An attractive first-month price can conceal lock-in. Meaningful choice includes a realistic exit path and verified legal duties.",
        "challenge": "Compare two fictional SaaS contracts: one cheap with unclear export rights, the other more expensive with documented portability. Define a walk-away condition and an evidence request.",
        "worked": "A sensible decision includes all-in cost, data portability testing and support terms, not price alone. If essential customer records cannot be exported, the cheap option may violate a nonnegotiable operational requirement.",
        "trap": "Calling a subscription a bargain from its promotional price alone ignores switching and data recovery risks.",
        "evidence": "The final choice explains the actual alternative, a risk threshold and a path to decline."
      }
    ]
  },
  "shadow": {
    "title": "The Button That Wasn't a Choice",
    "thesis": "Learn defensive influence literacy by auditing deceptive interfaces and protecting meaningful refusal without retaliatory manipulation.",
    "context": "A fictional subscription service celebrates increased sign-ups after making a free trial button prominent, hiding recurring fees behind another screen and turning cancellation into a confusing journey. A community group separately pressures members to prove loyalty by disclosing private information.",
    "boundary": "Defensive adult education only. Do not use these examples for coercion, unauthorized surveillance or retaliation; legal and safeguarding matters need qualified assistance.",
    "stations": [
      {
        "heading": "Observe consent opportunities",
        "question": "What did a user actually see before committing?",
        "concept": "Consent depends on understandable consequences and a realistic option to decline. A button click may demonstrate action but not knowledge of a later recurring fee. Audit sequence, visibility, timing, labels and whether the user can safely revisit a choice.",
        "challenge": "Create a neutral map from trial offer to renewal confirmation, including where price, cancellation terms and decline actions appear.",
        "worked": "A transparent flow states trial duration, recurring price and cancellation method near the commitment, with a visible refusal path. In this fictional audit, hidden disclosures would need redesign and legal verification.",
        "trap": "Treating the existence of any fine-print terms as proof of meaningful informed consent mistakes legal text placement for comprehension.",
        "evidence": "The map identifies concrete choice obstacles without speculating about the designer's private motives."
      },
      {
        "heading": "Explain misleading success metrics",
        "question": "Does a higher sign-up rate mean a better consent process?",
        "concept": "Conversion measures how many people took an action, not whether they understood or freely wanted its consequences. An ethical experiment measures comprehension, reversibility, accessibility and complaint rates, not only clicks. A clear decline may reduce conversions while improving fairness.",
        "challenge": "Propose a before-and-after interface test asking participants when payment begins, how to cancel and what happens if they decline, using accessible alternatives.",
        "worked": "Success is accurate user understanding and ability to refuse, not maximized subscription count. A comparison should describe the sample and avoid inferring intentional deception solely from one version's analytics.",
        "trap": "Celebrating higher conversion without checking informed understanding can reward accidental agreement.",
        "evidence": "The experiment defines comprehension and voluntary choice independently from sign-up totals."
      },
      {
        "heading": "Challenge a pressure-based request",
        "question": "How do you identify a pattern without diagnosing anyone?",
        "concept": "Repeated retaliation for saying no can undermine autonomy, but an isolated slogan may be ambiguous. Record observable incidents, context and consequences; leave unverified reports as reports. Do not secretly record, trap or publish another person's communications to prove a theory.",
        "challenge": "A group says posting private details demonstrates loyalty. Write a privacy-respecting boundary and a safe support route if refusal leads to intimidation.",
        "worked": "A member can decline to share information and seek trusted independent help. Credible threats warrant safety planning rather than trying to win a debate or run an undercover experiment.",
        "trap": "Labeling a group leader with a clinical diagnosis from a single phrase creates unsupported certainty and may distract from concrete safety.",
        "evidence": "The response protects refusal and safety while keeping motives uncertain."
      },
      {
        "heading": "Transfer to mobile permissions",
        "question": "What would an ethical optional analytics consent screen require?",
        "concept": "Permissions create a specific data choice. A fair screen explains categories of data, purpose, retention or withdrawal terms as applicable, and offers comparable accepting and declining paths. Actual app behavior must match the language. Legal compliance requires current jurisdiction-specific verification.",
        "challenge": "Sketch a mobile consent card with clear Yes and No options, a settings path to revisit the decision and one data-minimization rule. Describe how to test actual comprehension.",
        "worked": "The design avoids preselected optional tracking, shows what may be collected before the choice, and allows users to decline without false claims that analytics is required for core learning. Actual implementation still needs privacy and accessibility review.",
        "trap": "Making the decline path confusing to protect conversion is the very pressure the redesign should eliminate.",
        "evidence": "The outcome shows equal-access choice, true product behavior, and a plan for independent policy review."
      }
    ]
  }
};
