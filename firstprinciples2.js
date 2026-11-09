/** Remaining seven original first-principles concept companions.
 * Original theory and fictional cases, pending independent specialist review.
 */
export const FIRST_PRINCIPLES_TWO={
  "thinking": {
    "title": "Critical thinking: causal diagrams, Bayesian updating and model critique",
    "frame": "A critical thinker does not merely distrust claims; they specify what would count as evidence, quantify uncertainty when possible and preserve the distinction between a useful prediction and a demonstrated cause. This continuation connects causal diagrams, base-rate reasoning and fair comparison with a practical plan for revising a belief.",
    "concepts": [
      {
        "heading": "Causal questions require a counterfactual",
        "explain": "To ask whether an intervention worked is to compare what happened with what would have happened to comparable people or situations without it. We cannot observe both outcomes for the same person at the same instant. A causal diagram in words can name treatment, outcome and confounders such as motivation, access or selection. Random assignment can help under appropriate conditions, but attrition, measurement quality and external validity still matter.",
        "distinction": "A correlation may be useful for prediction without identifying an intervention's causal effect. A statistically strong association does not by itself establish a mechanism.",
        "failure": "Failure mode: comparing self-selected users with nonusers and attributing their entire outcome difference to a product or program."
      },
      {
        "heading": "Base rates change what an alert means",
        "explain": "The conditional probability of a signal given an event is not the same as the conditional probability of the event given the signal. When the event is rare, even an apparently strong detector may generate many false alarms. Translate abstract percentages into counts in a realistic population and build the full confusion matrix. Whether a model should guide action also depends on how costly false alarms and missed events are.",
        "distinction": "Sensitivity measures how often real events are flagged; positive predictive value measures how often a flag corresponds to a real event.",
        "failure": "Failure mode: presenting '90% sensitivity' as a 90% probability that every flagged individual truly has the condition."
      },
      {
        "heading": "Model calibration, selection and updating",
        "explain": "A probability estimate has meaning only with a defined event, target population and time. If outcomes contradict predictions, revise the model rather than changing the success criterion afterward. A good model can be calibrated for one population and misleading for another because prevalence, selection or circumstances differ. Uncertainty ranges and sensitivity checks communicate limits better than a single authoritative-looking score.",
        "distinction": "Discrimination ranks cases; calibration concerns whether predicted probabilities match observed frequencies across comparable cases. Both are distinct from causal explanation.",
        "failure": "Failure mode: hiding dropout cases, fitting an explanation after seeing all results or assuming historic labels are unbiased truth."
      }
    ],
    "experiment": {
      "setup": "A fictional screening tool checks 1,000 items for a problem affecting 1% of them. It detects nine of ten true problems and wrongly flags fifty of the 990 normal items. A manager says every flagged item is '90% likely to be bad'.",
      "variables": "Use the complete population: true positives nine, false negatives one, false positives fifty, true negatives 940. The outcome of interest is the fraction of flagged cases that actually contain a problem.",
      "reasoning": "Only 9 of 59 flagged items are true problems: approximately 15.3%, not 90%. The nine-of-ten detection rate measures sensitivity and uses a different denominator. A review system may still benefit from the tool, but flagging should not automatically impose irreversible sanctions.",
      "task": "Construct the 2×2 table and then recompute the predictive value when prevalence changes while sensitivity and specificity are held constant as a hypothetical comparison."
    },
    "contradiction": {
      "claim": "A machine-learning score predicts past decisions accurately, so it must be objectively fair and causally correct.",
      "response": "A predictive model can reproduce biased historical judgments, perform unequally after population shift and remain causally uninformative. Evaluate label quality, errors across relevant groups, accessibility, appeal rights and the potential effects of its use.",
      "unknown": "The case does not establish real-world subgroup error rates, intervention effects or the legal acceptability of any particular decision policy."
    },
    "transfer": {
      "task": "Design an evaluation of a fictional scholarship screener: define ground truth, alternative explanations for missing fields, a human-review path, error costs and a precommitted stop condition.",
      "criteria": [
        "Definitions and denominators for all rates are preserved.",
        "Prediction, causal effect and normative fairness are kept distinct.",
        "Alternative hypotheses can be tested by observable evidence.",
        "The recommendation includes uncertainty, contestability and reversibility."
      ]
    },
    "boundary": "Scientific and statistical education only. High-stakes algorithmic decisions require domain specialists, privacy safeguards and independent fairness review."
  },
  "digital": {
    "title": "Digital systems: threat modeling, atomicity and recoverable state",
    "frame": "A privacy-first product is not automatically secure merely because it works offline. It has assets, trust boundaries, malicious or corrupted inputs and operational failure modes. The deeper engineering task is to specify invariants: what must remain true before and after every user action, including when the action fails halfway through.",
    "concepts": [
      {
        "heading": "Security is a model of assets and trust boundaries",
        "explain": "Start by identifying private notes, session state, recovery methods, backup files and user permissions as distinct assets. Define who can read, modify or delete each asset and what attackers or accidents could threaten it. An account recovery email, an exported archive and local browser storage can all compromise security in different ways. Controls should match likely risks rather than chase improbable attack stories.",
        "distinction": "Confidentiality prevents unauthorized reading, integrity prevents unauthorized or accidental modification, and availability supports continued access. Strengthening one property can complicate another.",
        "failure": "Failure mode: encrypting one data store while exposing plaintext through logs, long-lived backups or an unsecured account-recovery channel."
      },
      {
        "heading": "Atomic operations preserve invariants during failure",
        "explain": "An import should behave like a transaction: either the full validated new state becomes active or the previous known-good state remains intact. Checking only whether a file is parseable JSON is inadequate. Input constraints may include schema version, expected types, maximum sizes, identifier formats, references and content treated as inert text. Successful import must also preserve all documented data categories rather than silently discarding a field.",
        "distinction": "Syntactic validity means the file parses; semantic validity means it matches the application's supported data model and constraints.",
        "failure": "Failure mode: deleting current notes before validation, partially applying an import, then announcing 'restore complete' after some fields were dropped."
      },
      {
        "heading": "Recovery evidence requires round-trip and adverse tests",
        "explain": "An export feature is not proof of recovery. Validate an export-import round trip on a clean profile, corrupt bytes, unsupported versions, wrong encryption password, oversized input and offline reopen. State expected behavior for every rejection. Device storage policies and service-worker updates may introduce risks beyond unit tests; real physical-device observations and a rollback plan are still needed.",
        "distinction": "A green build verifies some development conditions; it does not establish that private learner notes can survive device failure or that the installed PWA retains data.",
        "failure": "Failure mode: advertising 'permanent encrypted backup' without verifying the restore path, password handling, storage limits or version compatibility."
      }
    ],
    "experiment": {
      "setup": "A fictional offline notebook has 12 entries and three review schedules. A malformed backup contains valid JSON with an unsupported schema and a note field of unexpected type. The existing implementation clears local records before validation, then writes entries one by one.",
      "variables": "Model the original profile, candidate file size and schema, temporary validated state, commit boundary and behavior under write interruption. Preserve privacy and avoid embedding real learner notes in the test.",
      "reasoning": "The importer violates atomicity. It should validate the entire candidate and necessary constraints first, then commit using a mechanism that preserves the previous profile on failure. Rejecting invalid content must not change notes or schedules. A successful test also needs a semantic comparison of every supported category.",
      "task": "Write a failure-mode matrix for clean import, wrong password, truncated file, unsupported version, invalid note type and interrupted commit. State the postcondition for each test."
    },
    "contradiction": {
      "claim": "No server is involved, so an offline application has no meaningful privacy or security risks.",
      "response": "Device sharing, browser eviction, tampered exports, unsafe rendering, malicious local software, physical loss and unauthorized access remain relevant. Offline operation can reduce network exposure but does not eliminate the need for threat modeling, safe parsing, recovery and truthful limitations.",
      "unknown": "No fictional test proves production security or compliance; real-device QA, code review and deployment-specific evidence remain essential."
    },
    "transfer": {
      "task": "Transfer the model to a financial-tracker app with personally sensitive transactions. Design a recovery policy that supports user-controlled export without automatically uploading records.",
      "criteria": [
        "Assets, capabilities and trust boundaries are clearly enumerated.",
        "Accepted inputs satisfy both structural and semantic constraints.",
        "Failure paths preserve current state and give meaningful errors.",
        "Claims about backups, encryption and privacy are limited to tested evidence."
      ]
    },
    "boundary": "Defensive software education only. Do not claim compliance or production-grade security from a conceptual exercise; test real devices and seek qualified security review."
  },
  "career": {
    "title": "Professional development: claims, reproducibility and experimental proof",
    "frame": "A professional portfolio is an argument about capability. Its evidence must establish what the person actually did, the constraints they faced, the alternatives they considered and the limits of their validation. More adjectives or screenshots cannot compensate for unverifiable impact metrics or blurred team ownership.",
    "concepts": [
      {
        "heading": "A portfolio claim is a hypothesis with evidence",
        "explain": "'I built a fast app' can be translated into a precise performance claim only after defining the device, test, metric and baseline. 'My project increased productivity by 80%' needs valid comparison, time frame, participant context and measurement. In a group project, attribution requires identifying personal contributions rather than claiming every team result. Distinguish prototypes, internal tools and genuine production deployments.",
        "distinction": "An implemented feature is evidence of a capability; an asserted business impact requires a different, usually stronger, evaluation.",
        "failure": "Failure mode: describing an unfinished demo as a live commercial service or inventing users, conversion gains or accessibility certification."
      },
      {
        "heading": "Decision narratives demonstrate judgment",
        "explain": "Employers often need to understand how a developer reasons through constraints, trade-offs and failure—not merely the polished outcome. A useful case study shows the user problem, requirements, chosen approach, rejected alternatives, implementation and verification. Recognizing that local-first storage improves offline access but complicates backup demonstrates more depth than claiming every architectural choice is automatically optimal.",
        "distinction": "The artifact shows what exists; the decision record explains why its design was chosen and what assumptions could cause a different choice.",
        "failure": "Failure mode: presenting a framework name as proof of engineering quality or hiding unresolved defects because they make the project less impressive."
      },
      {
        "heading": "Reproducibility and privacy are part of credibility",
        "explain": "A reviewer should be able to inspect a safe sample, follow a documented test or reproduce a behavior without relying on private credentials. Evidence should identify environment, steps, expected result and limitations. A small informal usability check is not equivalent to a statistically reliable impact study, and screenshots do not substitute for assistive-technology testing. Redact sensitive customer, team and participant data.",
        "distinction": "A test that a reviewer can repeat supports a narrow claim. A broad claim about reliability needs testing across appropriate devices, workloads, failure modes and real use.",
        "failure": "Failure mode: publishing access tokens in a portfolio repository or turning a five-person informal demo into a population-wide usability assertion."
      }
    ],
    "experiment": {
      "setup": "A fictional junior engineer has three projects: a private note PWA that works locally, an unfinished storefront and a three-person capstone. Their résumé says 'delivered a 100% secure, production-ready system that tripled productivity'.",
      "variables": "Examine actual deployment, ownership, observed test runs, baseline measurement, code provenance, accessible demo material and known risks. No verified productivity study or production-security audit is available.",
      "reasoning": "The résumé statement bundles multiple unsupported claims. A defensible description names implemented behavior, the person's role and repeatable test evidence, while labeling untested assumptions. The lack of deployment does not make the project worthless; pretending deployment happened makes the evidence unreliable.",
      "task": "Rewrite the résumé into three precise bullet points and produce a one-page case outline with one counterexample and an honest testing plan."
    },
    "contradiction": {
      "claim": "A portfolio should hide all limitations and maximize impressive claims because employers do not have time to verify details.",
      "response": "Clear, narrow claims are faster to trust and easier to discuss. Naming trade-offs and reproducible tests demonstrates professional reasoning and prevents a reviewer from discovering a dramatic discrepancy during an interview. A limitation can guide the next useful experiment.",
      "unknown": "The fictional case cannot support measured productivity improvement, production uptime or a security/accreditation guarantee."
    },
    "transfer": {
      "task": "Transfer the claim-evidence method to a startup pitch with no paying customers. Draft what the founder may accurately say about prototype traction, willingness to pay and unanswered risks.",
      "criteria": [
        "Each claim maps to a directly observable artifact or is labeled unverified.",
        "Team work and individual contributions are separated.",
        "Reproduction steps do not expose private code or credentials.",
        "The narrative explains a trade-off and a possible disconfirming test."
      ]
    },
    "boundary": "Career education only, not hiring or credential guarantees. Respect source licenses, confidentiality obligations and privacy of test participants."
  },
  "science": {
    "title": "Scientific practice: measurement, models and falsifiability",
    "frame": "Science is not a contest to memorize isolated facts. It is a disciplined connection between a model, a measurable prediction and observations that could challenge it. This study relates calibration and confounding to familiar astronomy examples, then transfers those habits to a local environmental field experiment.",
    "concepts": [
      {
        "heading": "Operational definitions make claims testable",
        "explain": "A claim such as 'shaded streets are cooler' is incomplete without specifying air or surface temperature, sensor position, sampling time and weather. Instruments have uncertainty and can be biased. Repeating the measurement reduces random scatter but does not automatically remove systematic error. A clearly defined quantity lets someone else repeat the observation under comparable conditions.",
        "distinction": "Precision is not accuracy. Reporting many decimal places cannot compensate for an uncalibrated thermometer or ambiguous measurement conditions.",
        "failure": "Failure mode: combining readings taken at different times and heights, then reporting a precise causal temperature reduction attributed entirely to tree cover."
      },
      {
        "heading": "Astronomical models make distinct predictions",
        "explain": "Earth's rotation explains much of the apparent daily motion of the sky; lunar phases depend on how the sunlit Moon is seen from Earth, rather than the normal passage of Earth's shadow. Earth's axial tilt accounts for opposite seasons across hemispheres. These explanations survive because they jointly predict observable patterns under specified positions and times, not because their diagrams look elegant.",
        "distinction": "A model's mechanism and its testable predictions are distinct. A lunar eclipse involves Earth's shadow; ordinary Moon phases do not.",
        "failure": "Failure mode: treating a schematic diagram as if it established measured star positions or assuming Earth-Sun distance alone explains opposite hemispheric seasons."
      },
      {
        "heading": "Confounding, repeated trials and honest conclusions",
        "explain": "A comparison of a shaded morning and sunny afternoon conflates shade with time, cloud conditions and other variables. Match observations more carefully and repeat across varied days. An association can still inform a pilot, but a causal estimate for planting trees needs stronger study design and long-term follow-up. Identify what finding would contradict your preferred hypothesis, and report that outcome if it occurs.",
        "distinction": "A proposed intervention can be plausible without an established effect size. The public recommendation should reflect the strength and scope of the actual data.",
        "failure": "Failure mode: treating one convenient location pair as a representative citywide experiment or refusing to publish unexpected measurements."
      }
    ],
    "experiment": {
      "setup": "A volunteer reports 31°C near a shaded wall at 08:30 and 35°C beside open pavement at 13:00, using different uncalibrated devices. Their article states that planting trees lowers the local air temperature by exactly four degrees.",
      "variables": "Specify the measured quantity, instrument, height, location, traffic, time, wind, clouds and repeated days. Separate direct measurements from a tree-planting intervention that has not been performed.",
      "reasoning": "The two readings show a difference under unmatched conditions. They cannot isolate shade, much less the causal effect of future tree planting. The result suggests hypotheses worth testing, not a verified four-degree intervention effect.",
      "task": "Design a paired-site protocol with timing, calibration, replication, safety rules and a precommitted definition of evidence that would change your conclusion."
    },
    "contradiction": {
      "claim": "A model is scientifically proven forever once its first prediction matches one observation.",
      "response": "A supporting observation raises confidence within its scope but cannot eliminate alternative explanations or measurement errors. Scientific models remain testable and revisable. Stronger confidence comes from replicated evidence, competing predictions and success under new conditions.",
      "unknown": "These fictional observations establish neither the causal effect of planting trees nor an exact numerical reduction in urban heat."
    },
    "transfer": {
      "task": "Transfer the method to comparing nighttime visibility of the Moon from two cities at different latitudes and times. Define what geometry predicts and what local observations remain necessary.",
      "criteria": [
        "Measurements are operationally defined with units and uncertainties.",
        "Competing explanations and confounders are explicit.",
        "At least one falsifiable prediction could challenge the model.",
        "The reported conclusion stays within the observed population and conditions."
      ]
    },
    "boundary": "Science education only; high-stakes health/environmental applications require qualified methods and safety oversight. Never look at the Sun directly without proper certified protection."
  },
  "relationships": {
    "title": "Relationships: consent, trust dynamics and sustainable repair",
    "frame": "Relationship reasoning should respect the difference between a hurtful event, the meaning a person assigns to it and what happens afterward. A safe, healthy response often depends on explicit agreements, voluntary choice and consistent repair. These tools cannot diagnose another person's motives or prescribe reconciliation.",
    "concepts": [
      {
        "heading": "Consent is contextual and revocable",
        "explain": "A person's agreement to share one story or photograph does not imply blanket permission to publish all private conversations. Consent depends on the information, audience, purpose and ability to withdraw. The fact that someone sought support can be understandable while the public disclosure still violates a mutual agreement. Begin by identifying the actual permission, not by ranking whose feelings are more valid.",
        "distinction": "Explanation is not permission; understandable intent does not erase impact. The right to ask for privacy is separate from a demand that someone never seek outside support.",
        "failure": "Failure mode: treating a past yes as permanent consent, or demanding the other person surrender access to trusted outside help as proof of loyalty."
      },
      {
        "heading": "Repair changes the future, not just the narrative",
        "explain": "A useful apology names the action, recognizes the impact and proposes specific changed behavior without demanding immediate forgiveness. Trust may update slowly through consistency across relevant situations. The harmed person can choose distance, safeguards or reconciliation, and those decisions need not be final at once. Repeated broken agreements provide evidence about reliability without requiring a personality label.",
        "distinction": "Forgiveness is an internal decision; reconciliation is renewed participation. Neither is automatically owed after an apology.",
        "failure": "Failure mode: scoring sincerity by emotional performance while ignoring whether the underlying boundary is respected after the conversation."
      },
      {
        "heading": "Boundaries protect autonomy under different power dynamics",
        "explain": "A boundary states the action you will take when a situation occurs. It should be realistic and proportionate. In family care, employment or dependency relationships, capacity and safety can complicate a simple request; informed choice and appropriate support matter. Where intimidation or violence is credible, repeated debate may increase risk, so protective planning takes priority over persuasion.",
        "distinction": "A request asks another person to change; a boundary tells them what you will do. A threat tries to coerce someone through retaliation.",
        "failure": "Failure mode: describing punishment or isolation as a loving boundary, or pressing an unsafe person into another confrontation."
      }
    ],
    "experiment": {
      "setup": "Two adult friends agreed not to share identifiable details of disputes online. One posts a recognizable account, apologizes, then insists the other forgive them immediately and delete a private journal in return.",
      "variables": "Identify the existing agreement, observed disclosure, need for outside support, the demand for immediate forgiveness and control over another person's private notes. Consider whether there is a repeated pattern or any credible threat.",
      "reasoning": "The public disclosure can breach the agreement even if the poster needed help. A meaningful repair might involve removing the post and choosing consent-respecting support. The harmed person is not obliged to forgive instantly or delete private records as the price of repair.",
      "task": "Draft a two-path response: one for a first incident with voluntary repair, and one for repeated breaches with a protective boundary and trusted support."
    },
    "contradiction": {
      "claim": "An apology means the relationship is fully repaired, so refusal to forgive immediately proves the injured person is unreasonable.",
      "response": "Apologies and later conduct are different evidence. Trust, closeness and forgiveness cannot be demanded as obligations. A reasonable process can permit time, clearer agreements and changed behavior without requiring the injured person to abandon personal autonomy.",
      "unknown": "The fictional case does not establish either friend's hidden motives or dictate whether their relationship should continue."
    },
    "transfer": {
      "task": "Transfer the same principles to siblings coordinating care for an older person. Identify who controls information and why consent and medical safety may require a different practical process.",
      "criteria": [
        "The actual consent and privacy agreement are identifiable.",
        "Intent, impact and repeated behavior are not collapsed.",
        "Repair includes voluntary choice and observable action.",
        "Safety and dependency change the response when necessary."
      ]
    },
    "boundary": "General relationship education, not therapy or abuse diagnosis. Use professional or trusted local support where coercion, threats or violence may be involved."
  },
  "negotiation": {
    "title": "Negotiation: alternatives, reservation thresholds and durable terms",
    "frame": "Negotiation is a decision about feasible agreements, not a contest of social dominance. The strongest preparation identifies your real alternative, costs, risk exposure and conditions for walking away. A sustainable agreement also describes what will happen if assumptions, scope or delivery conditions change.",
    "concepts": [
      {
        "heading": "BATNA and reservation conditions",
        "explain": "The best alternative to a negotiated agreement must be an available path, not a bluff about mythical clients or buyers. A reservation threshold represents the worst package you are willing to accept after considering price, time, rights, risk and opportunity cost. Compare complete packages rather than a single headline payment. A high fee coupled with indefinite revisions can be economically worse than a smaller, well-scoped offer.",
        "distinction": "An opening offer is an anchor in the conversation; the reservation point comes from independent preparation and must incorporate real costs.",
        "failure": "Failure mode: accepting a nominally higher contract because the initial fee looks impressive while ignoring the number of revisions and delayed payment."
      },
      {
        "heading": "Interests, constraints and agreement design",
        "explain": "A stated position may hide practical interests: speed, predictable cost, low risk, control of source code or a fair review process. Clarifying these can produce options such as phased delivery, a capped revision scope, defined milestones and a separately priced change order. Some terms are not negotiable when they compromise safety, legality or consent. Record what each party actually agreed, not the assumptions you hope they share.",
        "distinction": "A mutually useful package has explicit deliverables and trade-offs; a 'win-win' label without written terms is not a contract design.",
        "failure": "Failure mode: treating indefinite 'high quality' or 'unlimited support' as clear acceptance criteria, then blaming disagreement on personality."
      },
      {
        "heading": "Risk, enforcement and walk-away decisions",
        "explain": "Terms should address acceptance, deadlines, payment, changes, ownership, confidentiality and disputes. A signed document can still be harmful if the technical and legal duties are not understood. Test the agreement against delays, changed scope and access failure. Seek qualified review when intellectual property, regulated data or significant liability is involved; the ability to postpone or decline can be rational.",
        "distinction": "A signed deal is not synonymous with a successful outcome. Enforceability, execution capacity and data rights matter after the conversation ends.",
        "failure": "Failure mode: signing vague ownership clauses under discount pressure or providing real customer records to a supplier before a protected testing agreement exists."
      }
    ],
    "experiment": {
      "setup": "A fictional freelancer is offered ₱8,000 for 50 hours with unlimited revisions and payment only after approval. Another job pays ₱6,000 for 25 hours with two defined revision rounds.",
      "variables": "Compute expected gross hourly rates before overhead, taxes and collection risk. Then estimate the effect of 25 extra unbilled hours and unresolved acceptance terms.",
      "reasoning": "The original gross rates are ₱160/hour and ₱240/hour. If the first job expands to 75 hours, its rate falls to about ₱106.67/hour. The higher headline payment may be an inferior alternative, though other benefits and confirmed contract terms also affect the actual decision.",
      "task": "Write a counteroffer with fixed deliverables, a capped number of revisions, milestone payment and an explicit change-order procedure."
    },
    "contradiction": {
      "claim": "A skilled negotiator never walks away, because winning means getting the other person to say yes.",
      "response": "Agreement is valuable only when it improves on a feasible alternative and respects constraints. A poor agreement can worsen cash, time, privacy or legal risk. Declining with a respectful rationale may be a competent negotiation decision.",
      "unknown": "The fictional figures cannot settle tax, legal enforceability, client collection risk or a particular professional's reservation point."
    },
    "transfer": {
      "task": "Transfer the framework to choosing between two SaaS vendors with different renewal prices, export rights and migration support. Identify a non-negotiable exit condition.",
      "criteria": [
        "The comparison uses realistic alternatives and full package economics.",
        "Scope, milestones and revision rights are explicit.",
        "Adverse scenarios and a walk-away threshold are documented.",
        "Privacy, ownership and legal unknowns are referred for qualified review."
      ]
    },
    "boundary": "Illustrative negotiation education, not legal advice. Actual contracts, tax obligations, intellectual property and consumer rules require current local verification."
  },
  "shadow": {
    "title": "Defensive influence literacy: autonomy, evidence and humane interface design",
    "frame": "Influence is common, but coercion and deceptive choice designs deserve careful recognition. Defensive literacy observes concrete behavior, evaluates whether meaningful refusal is possible and considers safety and privacy. It does not require diagnosing another person's intent or learning techniques to pressure them back.",
    "concepts": [
      {
        "heading": "Consent needs a real choice",
        "explain": "A subscription screen can present a visually prominent 'start free' button while hiding a later recurring fee. Even if legal text exists somewhere, the practical clarity of the choice matters to comprehension and autonomy. Compare the position, wording, timing and consequences of accepting versus declining. A transparent design makes the price, trial duration and cancellation route understandable before commitment.",
        "distinction": "The existence of a consent checkbox is not proof of informed agreement when essential consequences are hidden or refusal is obstructed.",
        "failure": "Failure mode: measuring only conversions and calling a deceptive layout successful because more people accidentally accepted recurring charges."
      },
      {
        "heading": "Patterns, power and epistemic caution",
        "explain": "One awkward phrase does not prove malicious intent or a clinical label. Look for repeat behavior, consequences for saying no, unequal access to information and ways a person could seek independent help. Several accounts can disagree because experiences or versions differ. Keep factual observations and testimony separate, and do not use unavailable evidence to assert certainty.",
        "distinction": "A pattern can justify protective action without conclusively proving secret motive. Doubt about motive is not a reason to dismiss credible threats.",
        "failure": "Failure mode: declaring a person an abuser from a slogan alone, or dismissing repeated retaliation because other participants report positive experiences."
      },
      {
        "heading": "Design safe alternatives without reverse manipulation",
        "explain": "For digital products, improve disclosure, accessible opt-outs and the ability to change consent later; test comprehension rather than the acceptance rate alone. For personal pressure, use proportionate boundaries, trusted support and lawful evidence handling. Covert entrapment, publishing private chats or confronting a threatening party may make the situation worse. Protective action should expand options rather than manufacture a social victory.",
        "distinction": "A good defensive response preserves agency and privacy. Ethical redesign makes refusal clear, not shameful or technically obstructed.",
        "failure": "Failure mode: teaching retaliatory coercion as self-defense or using unauthorized surveillance in an attempt to prove a suspicion."
      }
    ],
    "experiment": {
      "setup": "A fictional trial flow prominently advertises a free start, while a recurring fee appears only after an additional screen. Cancellation requires several confusing steps. The product team reports that subscriptions increased after the redesign.",
      "variables": "Record what the user sees before acceptance, whether payment terms are understandable, how refusal and cancellation work, accessibility barriers and what evidence shows actual comprehension.",
      "reasoning": "Higher conversion is not evidence that consent improved. The design may create friction and misunderstanding. A safer version puts relevant billing terms before the commitment, gives a clear decline and cancellation option and tests whether users understand what will happen.",
      "task": "Create a before/after interface inventory and a consent comprehension task that does not reward accidental agreement."
    },
    "contradiction": {
      "claim": "Because more users signed up, the interface must be fair and the company has no ethical reason to change it.",
      "response": "Conversion is a business outcome, not a direct measure of informed choice. A system can increase conversion while reducing clarity. Assess comprehension, voluntariness, accessible alternatives, cancellation outcomes and current consumer/privacy duties.",
      "unknown": "The fictional case does not establish the legality of an actual interface or the private intention of any designer."
    },
    "transfer": {
      "task": "Transfer the audit to an app's optional analytics permission. Design a truthful accept/decline choice, easy future settings and an appropriate data-minimization explanation.",
      "criteria": [
        "Behavior is documented without speculative intent or diagnosis.",
        "The user can understand the consequences of each option.",
        "Refusal, withdrawal and accessibility are treated as meaningful constraints.",
        "Protective recommendations avoid surveillance, retaliation or coercion."
      ]
    },
    "boundary": "Adults-only defensive education; do not use material to exploit, coerce, impersonate or surveil people. Safety and legal concerns warrant qualified assistance."
  }
};
