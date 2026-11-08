/** Atlas Evidence Path protocols — author-authored verification standards, not professional certification. */
export const EVIDENCE_PROTOCOLS=Object.freeze({
  "psychology": [
    [
      "Observation ledger",
      "A reviewer should be able to identify the exact behavior, context, time and source without reading your interpretation. Provide two plausible alternatives, then ask whether an additional observation could disconfirm your preferred explanation.",
      "Mistaking a sincere emotional reaction for proof of another person's intention."
    ],
    [
      "Prediction audit",
      "Show the prediction made before the next event, a dated observation, and the revision you made afterward. A reviewer should be able to find at least one result that would have contradicted your forecast rather than a retrospective rationalization.",
      "Moving the prediction threshold after seeing the outcome."
    ],
    [
      "Ethical claims appraisal",
      "Present the original research claim, population, comparison method and uncertainties. Ask a qualified reviewer to challenge whether the evidence supports a population-level relation, a causal statement or a statement about an individual, and whether a false accusation could cause harm.",
      "Using isolated behavior to diagnose people or infer deliberate manipulation."
    ]
  ],
  "laws": [
    [
      "Primary-rule record",
      "Identify the legal jurisdiction, transaction facts, date and authoritative rule in force. A reviewer must be able to distinguish what the rule actually says from the buyer's assumption or a seller's policy.",
      "Treating an undated social-media summary as an applicable statute."
    ],
    [
      "Complaint chain of evidence",
      "Present dated receipts, communication history, governing terms and a neutral remedy request. Ask someone unfamiliar with the case to reconstruct which assertions are confirmed, disputed or unsupported.",
      "Presenting a cancellation attempt as conclusively received without a receipt."
    ],
    [
      "Regulatory route audit",
      "Map the parties and their contractual or regulatory roles before recommending escalation. An appropriate qualified reviewer should check current primary legal sources, procedural prerequisites and whether your proposed agency has jurisdiction.",
      "Assuming every institution can order a refund or prosecute the same dispute."
    ]
  ],
  "business": [
    [
      "Interview validity",
      "Let another person inspect the interview questions without the product pitch. They should identify whether each question invites evidence of recent customer behavior rather than hypothetical praise or leading answers.",
      "Counting compliments and friend endorsements as validated demand."
    ],
    [
      "Unit-economics reconciliation",
      "Supply a reproducible sheet with revenue, variable service costs, support hours, fixed costs and sensitivity assumptions. A reviewer should recompute one row and identify at least one missing expense rather than accept a headline margin.",
      "Labeling a contribution remainder as audited net profit."
    ],
    [
      "Pilot go-or-stop memo",
      "Document cohort definitions, paying retention, acquisition costs, delivery reliability and the dated evidence threshold. A reviewer should test whether an unfavorable result would genuinely cause a pause or scope change.",
      "Calling early signup growth proof of product-market fit despite unsafe operations."
    ]
  ],
  "savings": [
    [
      "Cash-timing reconciliation",
      "Provide a dated cash-in and required cash-out table, showing bill timing rather than only a month-end total. An independent reader should reproduce the available balance and identify which expenses are not optional.",
      "Treating a provisional end-of-month remainder as readily investable cash."
    ],
    [
      "Repayment shock comparison",
      "Compare normal and low-income months with minimum payments, fees, emergency reserves and discretionary extras shown separately. Have someone verify whether the proposed payments remain feasible in the low-income case.",
      "Ignoring contracted minimum payments to pursue a theoretical interest saving."
    ],
    [
      "Liquidity defense",
      "Use at least one unexpected-cost scenario and identify when cash becomes inaccessible. A reviewer should find the precise point at which an illiquid purchase would compromise essentials without relying on projected returns.",
      "Replacing cash-flow feasibility with optimistic assumptions about future earnings."
    ]
  ],
  "time": [
    [
      "One finishable outcome",
      "Show one time-bound task, its completion criterion and the artifact that demonstrates success. A reader should be able to verify the result without asking whether you felt productive.",
      "Measuring progress solely by hours spent rather than an observable deliverable."
    ],
    [
      "Forecast calibration",
      "Compare multiple planned and actual task durations, name the largest source of error and update the next forecast. A reviewer should check that the revised estimate follows evidence, not the original hoped-for deadline.",
      "Ignoring repeated overruns and blaming the worker instead of the estimate."
    ],
    [
      "Capacity and critical-path audit",
      "Provide a dependency map that distinguishes sequential tasks, optional polish and recovery time. Ask a reviewer to inject a delay and verify that the plan names a scope or schedule trade-off without dropping essential tests.",
      "Pretending one person's overlapping calendar blocks create parallel labor capacity."
    ]
  ],
  "languages": [
    [
      "Skill separation",
      "Show separate evidence for printed-phrase recall, comprehension of an unfamiliar reply and production judged by a speaker. Ask a qualified regional reviewer to label which of those skills the available evidence does not test.",
      "Awarding conversation fluency from reading a prepared phrase list."
    ],
    [
      "Clarification competence",
      "Present an unscripted answer from a qualified speaker and record what was understood before help was given. The reviewer should check politeness, register, the accuracy of follow-up language and whether the task can be completed after clarification.",
      "Constructing unverified grammar forms from literal English translation."
    ],
    [
      "Independent performance portfolio",
      "Assemble multiple prompts, novel listening tasks, spoken responses and meaningful dialogue with stated region, conditions and reviewer provenance. A qualified examiner must decide any formal level; Atlas cannot confer CEFR accreditation from these artifacts.",
      "Claiming native-like spoken competence after synthetic audio playback."
    ]
  ],
  "communication": [
    [
      "Reflection quality",
      "Ask an uninvolved reader whether your summary fairly represents another speaker's stated feeling without accepting an invented motive. Provide one open question and an opportunity for the speaker to correct your interpretation.",
      "Arguing about intent before confirming the actual concern."
    ],
    [
      "Boundary usability",
      "Have a colleague apply your boundary to a routine message and a genuinely urgent incident. If they cannot distinguish the cases, revise the response window and escalation definition.",
      "Using vague threats or punitive silence as if they were a clear boundary."
    ],
    [
      "Repair observability",
      "Document the incident timeline, disputed process, owners and a future acceptance criterion. A reviewer should be able to check whether the repair was followed at the next handoff without demanding blame or forced apology.",
      "Treating a performative apology as evidence that the underlying process changed."
    ]
  ],
  "thinking": [
    [
      "Claim falsifiability",
      "Rewrite one strong claim to specify population, numerator, denominator, measurement window and possible disconfirming data. Have someone identify what observation would prove your statement inadequate.",
      "Reporting a striking percentage without an interpretable denominator."
    ],
    [
      "Numerical interpretation",
      "Provide calculations using at least two legitimate denominators and explain why they answer different decisions. A reviewer must reproduce the arithmetic and verify that the compared populations have matching time windows.",
      "Choosing the most flattering ratio while implying a different population."
    ],
    [
      "Causal rival-explanation audit",
      "Diagram the proposed effect, at least two confounders and one selection mechanism. A research-literate reviewer should challenge whether the comparison isolates causation and what new result could overturn your preferred story.",
      "Mistaking an observational association for a demonstrated intervention effect."
    ]
  ],
  "digital": [
    [
      "Trust-boundary check",
      "Record how you verified an account alert without following a supplied link. A reviewer should trace each step to an independent trusted service and see no use of live credentials on an unverified page.",
      "Testing a suspicious form by submitting a real password."
    ],
    [
      "Authorization acceptance test",
      "Use permitted test accounts to prove that cross-account resource requests are rejected by the server, not merely hidden by the interface. A reviewer should reproduce both allowed and denied cases without accessing real user data.",
      "Relying on client-side filtering as a security boundary."
    ],
    [
      "Incident containment rehearsal",
      "Demonstrate a simulated credential-exposure response, including trusted account access, session invalidation, recovery checks and a documented uncertainty statement. A security reviewer should identify missing secrets or recovery routes before a real incident.",
      "Treating absence of visible misuse as proof that no containment is necessary."
    ]
  ],
  "career": [
    [
      "Evidence-backed claim",
      "Supply one working artifact, a reproducible check and a candid limitation for a project description. A reviewer should be able to distinguish what you personally built from what a library, template or teammate supplied.",
      "Replacing specific achievement evidence with impressive-sounding adjectives."
    ],
    [
      "Architecture decision record",
      "Link a user requirement to a chosen design, at least one alternative and a repeatable test of the most important trust boundary. Ask a technical reader whether the trade-off is explicit rather than implied by a framework list.",
      "Treating a technology stack inventory as an architecture explanation."
    ],
    [
      "Skeptical interview rehearsal",
      "Invite a reviewer to challenge security, deployment, accessibility or performance claims. For each unsupported claim, provide a measured follow-up test or revise the headline, without inventing scores or certifications.",
      "Assuming a polished screenshot establishes invisible operational guarantees."
    ]
  ],
  "science": [
    [
      "Controlled hypothesis",
      "Write a prediction, baseline measurement and a protocol that keeps likely confounders consistent. Another learner should be able to run the experiment and produce a result that would contradict your hypothesis.",
      "Choosing a procedure where every possible outcome is framed as success."
    ],
    [
      "Measurement uncertainty",
      "Show the observed values, units, instrument resolution, reference reading and possible systematic error. A reviewer should recompute the mean and identify whether apparent consistency is being confused with accuracy.",
      "Reporting digits of precision unsupported by the instruments."
    ],
    [
      "Research-design critique",
      "Separate the sampled population, comparison method and possible selection or reporting biases. A scientifically trained reviewer should assess the limits of causal inference and what independent replication would require.",
      "Using an observational association to claim proven health benefits."
    ]
  ],
  "relationships": [
    [
      "Mutual-account evidence",
      "Document a disagreement without diagnosing anyone, and present both observable event and subjective impact. An outside reader should find a repair request that allows each person to decline or propose an alternative.",
      "Treating an inconvenient event as proof of a permanent malicious trait."
    ],
    [
      "Consent and boundary review",
      "Show a realistic boundary with an action under the speaker's control and a respectful response to disagreement. A reviewer should flag any threat, condition on affection or coercive leverage.",
      "Confusing a refusal to comply with a failure to love."
    ],
    [
      "Safety-oriented pattern analysis",
      "Record specific conduct over time rather than inferred personality. A qualified support reviewer should check where repeated threats or isolation demands shift the response from repair to autonomy and safety, without forcing confrontation.",
      "Minimizing explicit coercion because an earlier dispute appeared ordinary."
    ]
  ],
  "negotiation": [
    [
      "Interests inventory",
      "List both parties' stated positions, plausible but unconfirmed interests and one clarifying question. A reviewer should be able to distinguish assumptions from needs the parties actually confirmed.",
      "Treating the opening price as the entire deal."
    ],
    [
      "Full-package comparison",
      "Calculate effective compensation under optimistic and high-revision workloads, identifying undefined scope, acceptance and ownership terms. Another reader should recompute the sensitivity case and challenge each assumption.",
      "Choosing the larger headline fee without accounting for unlimited work."
    ],
    [
      "Change-order defense",
      "Present original scope, requested change, testable acceptance rules, delivery impact and revised payment. A knowledgeable reviewer should verify that both sides can understand the terms and an ethical walk-away option.",
      "Promising an accelerated deadline without changing effort, scope or resources."
    ]
  ],
  "shadow": [
    [
      "Pressure-signal inventory",
      "Record the exact countdown, payment-channel switch or secrecy request rather than guessing motives. A reviewer should be able to identify a safe independent verification route that does not involve the suspicious actor.",
      "Claiming a body-language clue establishes a person's hidden intent."
    ],
    [
      "Coercion-versus-conflict check",
      "Compare an ordinary disagreement with repeated threats to expose private information. An informed reviewer should evaluate whether the proposed response prioritizes safety, agency and trusted support.",
      "Treating an escalating threat as merely a communication style difference."
    ],
    [
      "Defensive claims ledger",
      "Preserve dated agreements and conflicting fee requests, labeling verified facts, allegations and uncertainty. A reviewer should assess whether refusal, documentation and an official dispute channel reduce risk without unsafe confrontation.",
      "Assuming inconsistency alone proves criminal intent rather than a reason to investigate."
    ]
  ]
});
