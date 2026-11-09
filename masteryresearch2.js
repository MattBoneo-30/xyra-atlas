/** Seven original advanced research practicums, second half of Atlas.
 * All case data are invented for learning and await independent review.
 */
export const MASTERY_RESEARCH_TWO={
  "thinking": {
    "title": "Algorithmic decisions: evidence, fairness and uncertainty",
    "brief": "A scholarship committee wants to use an automated screening score to rank applicants. The model was evaluated using last year's applicants, but the group receiving the scholarship has changed. A high overall accuracy number hides different error rates among applicants with different access to the information requested. Your task is to audit evidence without making unsupported claims about any individual.",
    "question": "Can the score safely support human review, and what evidence would justify using, changing or rejecting it for this decision?",
    "exhibits": [
      {
        "label": "Historical evaluation",
        "detail": "In a fictional set of 200 applications, 80 were ultimately judged eligible under the committee's rules. The screen correctly flagged 64 of those and also flagged 30 of 120 judged ineligible. The rules and human judgments themselves may need scrutiny."
      },
      {
        "label": "Population shift",
        "detail": "The earlier set came mostly from schools with reliable internet access; new outreach includes applicants with intermittent access, who may leave optional online fields empty. No group-level error analysis or missingness audit was done."
      },
      {
        "label": "Decision impact",
        "detail": "A false negative can deny someone an opportunity to be heard. A false positive adds manual review effort. Applicants require an understandable appeal route, and sensitive characteristics must not be exposed in reviewer dashboards."
      }
    ],
    "phases": [
      {
        "name": "01 / Reconstruct what the headline conceals",
        "task": "Calculate true positives, false negatives, false positives and true negatives. Explain why an overall accuracy figure does not settle the ethical question and how mislabeled ground truth could distort every metric.",
        "worked": "True positives are 64, false negatives 16, false positives 30 and true negatives 90. Accuracy is (64+90)/200=77%, while sensitivity for eligible applicants is 64/80=80%. Thirty false positives matter for workload, and sixteen false negatives may unjustly block review; the original eligibility labels are not automatically unquestionable."
      },
      {
        "name": "02 / Investigate representation and error",
        "task": "Design an evaluation for new applicants. Specify how to measure missing fields, compare error patterns across meaningful populations where lawful and ethical, and test whether the application interface itself causes missing data. Include a privacy plan.",
        "worked": "A defensible assessment examines completeness and error rates under the new outreach context, uses a carefully approved fairness analysis, and prevents sensitive attributes from being published or used casually. Comparing only applicants who completed every optional field would select away the very people at risk of exclusion."
      },
      {
        "name": "03 / Choose a reversible decision policy",
        "task": "Write a policy that defines whether the model may prioritize rather than reject applications, the human review threshold, what applicants can contest and who audits the outcomes. Record a stop rule if new evidence reveals unfair impact.",
        "worked": "A risk-conscious committee might keep the score as a nonbinding work queue, require humans to review potential rejections, publish accessible criteria and provide an appeal. Decisions should be revised if subgroup harms, label problems or sample shift make the model unreliable."
      }
    ],
    "counter": "An accurate prediction of historic committee decisions may simply reproduce their earlier biases. Explain how prediction quality and procedural fairness can diverge.",
    "transfer": "Transfer to an employment résumé sorter or school attendance alert. Identify which errors are most consequential and how you would evaluate a tool that can change people's opportunities.",
    "rubric": [
      "Rebuilds the full confusion matrix and distinguishes metrics.",
      "Questions whether historical judgments are reliable ground truth.",
      "Includes population shift and missingness as threats to validity.",
      "Designs a human review, explanation and appeal route.",
      "Proposes measurable limits or conditions for suspending automation."
    ],
    "limits": "Educational reasoning only. Fairness, employment and privacy compliance require specialist and jurisdiction-specific independent review."
  },
  "digital": {
    "title": "Resilience engineering: recover before claiming security",
    "brief": "A small offline-first learning app stores progress locally. A recent update changes its backup format, and a simulated device failure causes some users to report missing notes. Engineers propose automatic cloud sync, but the project currently promises no account and no tracking. You must protect learner data while developing a verifiable recovery path.",
    "question": "How can the team demonstrate a safe restoration process, identify failure modes and avoid creating new privacy risks?",
    "exhibits": [
      {
        "label": "Failure report",
        "detail": "Two test profiles contain 139 completed-or-uncompleted lesson identities, field notes, review history and a theme preference. One export is interrupted during writing, and another has a valid outer JSON structure but altered note contents."
      },
      {
        "label": "System constraints",
        "detail": "The app works offline and cannot assume network access. An encrypted backup may require a password, and a wrong-password import must never overwrite current data. Devices may evict browser storage."
      },
      {
        "label": "Trust boundary",
        "detail": "Backup filenames, embedded names and note text are user-controlled. Importing content must not execute scripts or replace a working data set until the entire payload is validated."
      }
    ],
    "phases": [
      {
        "name": "01 / Build a failure-mode inventory",
        "task": "List data categories, threats, likely symptoms, detection, recovery and irreversible damage. Distinguish data corruption, incompatible schema, wrong password, storage eviction and synchronization conflict. Identify which claims can actually be verified offline.",
        "worked": "A credible matrix treats a truncated export differently from a tampered valid JSON file. A completed download does not prove recoverability. Include input limits, schema checks, source identity and a way to preserve the existing profile if validation fails."
      },
      {
        "name": "02 / Specify an atomic restoration test",
        "task": "Design a reproducible set of tests: clean export/import, interrupted export, malformed payload, wrong password, oversized content, legacy schema and recovery after reopening offline. Say which bytes or counts should match and when the old profile must remain intact.",
        "worked": "A safe import validates the entire candidate in memory or a temporary area, confirms supported schema and constraints, and commits only after success. Wrong passwords and malformed data preserve current notes and review schedules; a byte-for-byte match may be unsuitable when exports contain nonessential timestamps, so define semantic equivalence."
      },
      {
        "name": "03 / Defend the privacy and UX trade-off",
        "task": "Write a release note that states whether backup and restore were tested, what remains risky and how people can keep safe copies. Compare optional encrypted sync with manual export without suggesting that cloud storage is automatically safer.",
        "worked": "The user-facing notice should explain local-only persistence, browser eviction and the need for private backups. If sync is later designed, require explicit opt-in, conflict rules and security analysis; do not silently upload sensitive field notes merely to simplify recovery."
      }
    ],
    "counter": "An export button can work while restoration silently drops one data field. What round-trip and property-based tests would reveal this, and why should a release gate depend on restore evidence?",
    "transfer": "Transfer to a small clinic's appointment system: what extra security, retention, audit and legal review would be required before reusing the same backup process?",
    "rubric": [
      "Identifies multiple independent failure modes and data categories.",
      "Defines atomic import with no destructive changes on rejection.",
      "Tests corrupted, legacy, wrong-password and offline cases.",
      "Separates local persistence from optional network sync and privacy.",
      "Communicates known limitations without advertising unverified resilience."
    ],
    "limits": "Defensive engineering education only. A backup exercise does not establish legal compliance or prove complete security."
  },
  "career": {
    "title": "Professional proof dossier: claims that another reviewer can verify",
    "brief": "A junior engineer applies for a software position with a beautiful portfolio but little explanation of decisions. The portfolio includes an unfinished release, a team capstone and a personal accessibility redesign. An interviewer asks for concrete evidence rather than broad adjectives. You must create a credible case dossier without exposing secrets or exaggerating outcomes.",
    "question": "Which claims about the applicant's work can be demonstrated independently, and what evidence would establish stronger claims later?",
    "exhibits": [
      {
        "label": "Project artifacts",
        "detail": "The redesign has screenshots, documented keyboard navigation behavior, issues fixed and a reproducible local demo. The unfinished release has several implemented features but no deployment or external users."
      },
      {
        "label": "Team and measurement",
        "detail": "The capstone has a commit history and design notes from three people. No baseline was recorded for the résumé claim 'tripled user productivity'. A five-person informal usability check was run without a standardized task or comparison."
      },
      {
        "label": "Review conditions",
        "detail": "A reviewer has 15 minutes, needs a clear statement of individual responsibility and must not receive API keys, customer credentials, unreleased client assets or identifiable participant records."
      }
    ],
    "phases": [
      {
        "name": "01 / Audit a résumé line by line",
        "task": "Mark claims as verified, supported-but-limited, or unsupported. Create an evidence link for each strong claim and rewrite claims that conflate prototypes, outcomes and team contributions. Record what measurements would be needed for a real impact statement.",
        "worked": "'Implemented keyboard navigation for three major app flows and verified focus visibility with a documented checklist' can be grounded. 'Tripled productivity' is unsupported without a defined unit, baseline, sample and design. A capstone should say which components the candidate personally built."
      },
      {
        "name": "02 / Build a reproducible case study",
        "task": "Prepare a one-page dossier with context, constraints, your role, decision trade-off, alternative rejected, implementation, validation, limitations and reproduction steps. Choose one artifact that makes the reasoning traceable in fifteen minutes.",
        "worked": "A strong dossier shows a before-state, the specific interaction defect, the chosen keyboard behavior, a short walkthrough and a test checklist. It states which assistive technologies were not tested and links only public-safe source material. The unresolved deployment is described as such."
      },
      {
        "name": "03 / Practice an adverse interview",
        "task": "Write responses to 'How do you know it worked?', 'What did you personally do?', and 'What would you change?' Include one genuine limitation and a proposed next experiment. Avoid hiding uncertainty behind technical terminology.",
        "worked": "Credible answers distinguish observed behavior from untested impact and make one improvement measurable. An interviewer may trust a modest, reproducible claim more than a dazzling metric with no measurement method."
      }
    ],
    "counter": "A demo may look polished but fail under slow devices or screen readers. Explain what evidence would be needed before presenting the portfolio as accessibility-compliant or production-ready.",
    "transfer": "Transfer the proof standard to a business founder pitching a product without paying users. Which portfolio principles apply to investment or partnership claims?",
    "rubric": [
      "Separates verified deliverables from invented business impact.",
      "Attributes team and individual work precisely.",
      "Provides reproducible, public-safe project evidence.",
      "States important untested limitations openly.",
      "Proposes a concrete measurement plan rather than a boast."
    ],
    "limits": "General career education; hiring and accessibility requirements depend on job context, jurisdiction and independently validated testing."
  },
  "science": {
    "title": "Field science: measure urban heat without confusing cause",
    "brief": "A community group measures the temperature of shaded and exposed streets to evaluate a proposal for more trees. Participants observe warmer readings near traffic but use different thermometers and take measurements at different times. A newspaper headline attributes every temperature difference to tree cover. You need a design that separates observation from causal inference.",
    "question": "How can volunteers measure a meaningful urban-heat difference while controlling or documenting confounders and avoiding exaggerated conclusions?",
    "exhibits": [
      {
        "label": "Initial observations",
        "detail": "A fictional notebook includes 31°C at a shaded corner at 08:30, 35°C on an open road at 13:00, and 33°C near a shaded road at 12:45. Instrument models and measurement height were not recorded."
      },
      {
        "label": "Environmental context",
        "detail": "Surface material, wind, humidity, cloud cover, nearby vehicles, time of day and sensor exposure can all affect measurements. Air temperature and surface temperature are different outcomes."
      },
      {
        "label": "Community stakes",
        "detail": "Tree planting affects maintenance, accessibility, water use and long-term public space. Residents need a clear interpretation without false precision, and volunteer participation must be safe during heat."
      }
    ],
    "phases": [
      {
        "name": "01 / Specify a measurable claim",
        "task": "Define whether the study concerns air temperature, ground temperature or perceived comfort. Choose a consistent unit, calibration procedure, measurement height, exposure and time-window plan. Explain why comparing 08:30 with 13:00 cannot isolate shade.",
        "worked": "The 31°C versus 35°C readings are not matched for time, location or instrument, so they do not establish a four-degree tree effect. A reproducible design would use comparable sensors at standardized heights and simultaneous or closely timed measurements across repeated days."
      },
      {
        "name": "02 / Plan matched observations",
        "task": "Design repeated paired shaded and exposed measurements with site metadata, uncertainty and safety rules. Include a way to record sensor drift and failures, and consider whether trees differ systematically from other locations in traffic or surface type.",
        "worked": "A matched-pair plan might use repeated readings at consistent times across several candidate sites, note traffic and surface conditions, rotate calibrated sensors where feasible and publish raw observations with units. It cannot remove every confounder but makes the largest ones visible."
      },
      {
        "name": "03 / Draft a defensible public finding",
        "task": "Write three possible conclusions: strong evidence of an association, inconclusive evidence, and a reversed result. For each, state uncertainty, study limits and what would be needed to test causal impact of future planting.",
        "worked": "A measured shade association can inform a pilot without proving that any specific planting plan reduces heat by a fixed amount everywhere. A long-term controlled before/after study or credible comparison sites would be needed for causal claims; report what the field data actually measured."
      }
    ],
    "counter": "Suppose the shaded sites are also farther from traffic. How could traffic and surface type confound the result, and what alternative comparison might help?",
    "transfer": "Transfer to indoor air quality testing in classrooms. Identify new confounders, privacy needs, instrument calibration and conditions for escalating a possible safety hazard.",
    "rubric": [
      "Defines measurable outcomes and preserves units.",
      "Addresses time, sensor and site confounding rather than ignoring them.",
      "Uses repeated matched observations with uncertainty notes.",
      "Avoids turning correlation into a guaranteed intervention effect.",
      "Includes participant safety and community implementation constraints."
    ],
    "limits": "Science education, not environmental certification or public-health guidance. Real measurements and safety recommendations need qualified review."
  },
  "relationships": {
    "title": "Shared responsibility: repair trust without treating care as a score",
    "brief": "Two adult siblings support an older family member while holding different jobs and living at different distances. One manages appointments; the other pays more expenses. They argue about fairness, interpreting different forms of support as proof of love or neglect. You are asked to construct a cooperative plan while respecting the care recipient's wishes and everyone else's capacity.",
    "question": "How can the family negotiate responsibilities, preserve autonomy and identify unmet needs without assigning guilt from incomplete comparisons?",
    "exhibits": [
      {
        "label": "Support records",
        "detail": "A fictional four-week log shows six appointments coordinated by one sibling, ₱4,000 paid by the other and four missed handoffs. Neither amount nor time captures the full emotional and logistical burden."
      },
      {
        "label": "Preferences and capacity",
        "detail": "The supported family member prefers predictable visits and privacy. One sibling has variable shifts; the other has limited transport. No one has agreed which tasks are urgent or who may see private health information."
      },
      {
        "label": "Risk indicators",
        "detail": "A missed medication or a clear safety concern is not merely a fairness dispute. In such cases the family needs appropriate clinical or community assistance rather than assigning amateur medical decisions."
      }
    ],
    "phases": [
      {
        "name": "01 / Define needs before splitting tasks",
        "task": "Write a needs inventory based on the care recipient's consent and preferences: reliable transport, appointment reminders, finances and private communications. Mark what must be handled by a qualified professional or a designated support person.",
        "worked": "A responsible inventory asks the older adult what they want and can decide. It records urgent care needs without turning the person into a task list. Unreliable handoffs are a process issue, not automatic evidence that either sibling cares less."
      },
      {
        "name": "02 / Model capacity and a fair trial",
        "task": "Create a two-week task-sharing plan with owners, backups and agreed check-in intervals. Incorporate cost, travel time, shift uncertainty and reasonable boundaries. Show how to ask for changes without using emotional leverage.",
        "worked": "An example plan might schedule appointment confirmation with a named backup, a shared but privacy-limited expense record and an agreed emergency escalation contact. Contributions need not be identical to be negotiated fairly; each participant can state constraints without being accused of indifference."
      },
      {
        "name": "03 / Review failures and repair",
        "task": "Describe how the team will discuss a missed handoff, distinguish misunderstanding from repeated unreliability and update the plan. Address what changes if one person repeatedly ignores clear agreements or the care recipient wants less involvement.",
        "worked": "A good review records what was agreed, what happened and what support is missing. Repair includes an observable change and follow-up. Repeated failures may require outside practical support; guilt and public shaming rarely improve reliable care."
      }
    ],
    "counter": "Equal hours may not mean equitable burden, and private spending records may not prove emotional commitment. What information would you need before claiming the arrangement is unfair?",
    "transfer": "Transfer to housemates sharing chores or colleagues sharing invisible support work. What would change when consent, privacy and caregiving risk are lower?",
    "rubric": [
      "Centers the affected person's stated wishes and autonomy.",
      "Separates practical contributions from judgments about affection.",
      "Defines tasks, owners, backups and negotiated limits.",
      "Provides a repair process that responds to patterns.",
      "Escalates safety-critical matters to qualified human support."
    ],
    "limits": "General relationship and caregiving education, not clinical, legal or elder-care advice. Coercion, neglect or safety threats require appropriate local support."
  },
  "negotiation": {
    "title": "Procurement negotiation: clarify total value before signing",
    "brief": "A local nonprofit is buying a year of scheduling software. A vendor offers a low first-year price but unclear renewal terms, migration assistance and data export. A competing vendor costs more upfront but includes support and fixed cancellation steps. The negotiator's goal is not simply the cheapest contract; it is a reversible, workable agreement.",
    "question": "Which terms are essential to compare the alternatives fairly, and what package would protect the organization's mission under uncertainty?",
    "exhibits": [
      {
        "label": "Offer A",
        "detail": "A fictional supplier charges ₱24,000 in year one, with renewal 'at prevailing rates', assisted migration billed separately and no stated export window. The representative emphasizes a same-day discount."
      },
      {
        "label": "Offer B",
        "detail": "Another fictional supplier charges ₱31,000 in year one, includes two migration sessions, states a written data-export procedure and quotes a fixed renewal price for one following year. Actual service quality is not yet independently tested."
      },
      {
        "label": "Organizational limits",
        "detail": "The nonprofit has a maximum approved annual spend of ₱35,000 and cannot lose participant records. Staff have only limited hours for retraining. Legal, data privacy and security provisions must be reviewed by qualified people."
      }
    ],
    "phases": [
      {
        "name": "01 / Prepare the decision variables",
        "task": "Create a side-by-side comparison of price, training hours, renewal, export capability, security, support, accessibility and termination. Identify missing costs rather than inventing a total cost of ownership.",
        "worked": "Offer A is cheaper by ₱7,000 in the first year, but its migration and renewal costs are unknown. The effective choice depends on all relevant terms and real workflow requirements. A one-day discount is not evidence of value or urgency unless independently justified."
      },
      {
        "name": "02 / Design a conditional counteroffer",
        "task": "Propose a limited pilot or contract package with defined acceptance criteria, a price cap where negotiable, an exit/export commitment and a written change process. Record your BATNA and a legitimate walk-away condition.",
        "worked": "A defensible counteroffer asks for a trial using non-sensitive test data, accessibility and export demonstrations, clear support levels, a predictable renewal mechanism and a termination path. If critical export or privacy terms remain vague, no discount should compel a signature."
      },
      {
        "name": "03 / Write a negotiation debrief",
        "task": "Draft a short recommendation comparing the offers under normal and adverse scenarios, including migration failure and unexpected renewal. Explain what still needs counsel or vendor verification before authorization.",
        "worked": "The final memo distinguishes negotiable commercial terms from legal or technical due diligence and recommends a decision only after key unknowns are checked. If both offers fail essential requirements, delaying purchase or using the current system may be the better alternative."
      }
    ],
    "counter": "The cheapest first-year number can hide later dependence. Explain how switching costs and inaccessible exports change leverage after the first contract is signed.",
    "transfer": "Transfer to negotiating a personal job offer that trades higher salary for uncertain hours or restrictive clauses. How should the reservation point and independent review change?",
    "rubric": [
      "Compares total value rather than only sticker price.",
      "Identifies unknown renewal, migration, export and privacy terms.",
      "Uses a credible BATNA without bluffing or threatening.",
      "Specifies written acceptance and termination criteria.",
      "Includes adverse scenarios and conditions for walking away."
    ],
    "limits": "Fictional negotiations education only. Current data protection, procurement, contractual and tax questions need local specialist review."
  },
  "shadow": {
    "title": "Protective influence literacy: recognize pressure without retaliation",
    "brief": "A fictional community group offers career connections and emotional support but gradually links access to meetings with public declarations of loyalty. Some members report feeling unable to decline private requests. Others say participation is voluntary and the group offers genuine help. An educational evaluation must preserve nuance, protect people and avoid teaching coercive tactics.",
    "question": "What observable patterns would help an individual evaluate their autonomy and safety without diagnosing leaders or organizing retaliatory manipulation?",
    "exhibits": [
      {
        "label": "Reported experiences",
        "detail": "One member says declining a weekend meeting led to public criticism. A second reports that private messages were quoted out of context. A third says they declined multiple events without consequences. Reports are not independently verified."
      },
      {
        "label": "Group communications",
        "detail": "Sample fictional instructions include 'Attendance shows commitment' and 'Bring concerns directly to leadership'. The statements are ambiguous outside of context; repeated retaliation or isolation would be stronger evidence than a slogan alone."
      },
      {
        "label": "Safety constraints",
        "detail": "Participants may fear losing social ties or employment opportunities. Direct confrontation, public accusation, unauthorized access to private chat or covert tests may increase risk and invade others' privacy."
      }
    ],
    "phases": [
      {
        "name": "01 / Separate conduct from interpretation",
        "task": "Build a dated evidence table distinguishing direct observations, participant reports, alternative explanations and effects on the ability to refuse. Do not use a single emotionally charged phrase as proof of coercive control.",
        "worked": "An accurate table might record an identifiable public rebuke after a declined invitation, label whose account it is, note missing witnesses and ask whether disagreement consistently produces punishment. The goal is to assess autonomy and consequences, not to infer a hidden personality disorder."
      },
      {
        "name": "02 / Map protective options",
        "task": "List low-risk choices for seeking independent information, setting a boundary, preserving only lawfully possessed evidence, and contacting trusted support. Include a safety-first route when threats or isolation are credible.",
        "worked": "A person might decline a nonessential meeting, check whether they retain normal access, and discuss concerns privately with a trusted outside contact if safe. They should not have to conduct secret experiments, hack private channels or publicly challenge someone in a threatening environment."
      },
      {
        "name": "03 / Form a bounded conclusion",
        "task": "Write a neutral assessment: observations that merit concern, what remains uncertain, what further independent advice could help and what protective next step is proportionate. Explain what evidence could lower or increase concern.",
        "worked": "A careful conclusion can say that repeated retaliation for refusal would materially weaken meaningful consent, while contradictory reports require more context. The safest decision may be to reduce involvement and seek support without proving anyone's motives or encouraging retaliation."
      }
    ],
    "counter": "A community can provide genuine help while also imposing harmful pressure. Explain why positive experiences do not automatically cancel reports of retaliation, and why allegations require fair, careful handling.",
    "transfer": "Transfer to an app that frames declining tracking consent as disloyalty. Identify the interface behaviors that reduce genuine choice and propose consent-respecting alternatives.",
    "rubric": [
      "Records specific patterns rather than inventing motives or diagnoses.",
      "Evaluates whether a person can refuse without retaliation.",
      "Identifies uncertainty and credible alternative explanations.",
      "Prioritizes privacy, safety and independent support.",
      "Rejects retaliatory manipulation, harassment and unsafe surveillance."
    ],
    "limits": "Adults-only defensive educational content. It does not diagnose abuse or substitute for safeguarding, crisis intervention or qualified local assistance."
  }
};
