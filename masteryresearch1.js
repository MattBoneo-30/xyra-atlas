/** Seven original advanced research practicums, first half of Atlas.
 * Fictional data; not externally reviewed, accredited or legal/financial advice.
 */
export const MASTERY_RESEARCH_ONE={
  "psychology": {
    "title": "Behavior-change laboratory: test what actually helps",
    "brief": "A community study group wants to increase completion of voluntary weekly practice. One organizer assumes that public reminders motivate everyone; another believes the reminders create pressure and avoidance. You are the investigator. Your aim is not to diagnose motivation but to design a humane, testable improvement that respects privacy and different needs.",
    "question": "Which low-pressure reminder approach, if any, is associated with more voluntary completions without increasing distress or excluding learners?",
    "exhibits": [
      {
        "label": "Baseline record",
        "detail": "Twelve fictional study sessions are logged. Across six sessions without public reminders, attendance was 7, 8, 6, 9, 7 and 8. Across six later sessions with public reminders, attendance was 9, 10, 9, 8, 10 and 8. Session topics, exams and group size also changed."
      },
      {
        "label": "Learner experience",
        "detail": "An anonymous optional comment collection includes 'Reminders helped me start,' 'I felt singled out when my name was missing,' and 'I was on night shifts during two meetings.' These are experiences, not a representative estimate of every learner."
      },
      {
        "label": "Ethical constraint",
        "detail": "The group cannot publish individual attendance or privately pressure participants; it can offer opt-in personal reminders, accessible alternatives and withdrawal without penalty. No health screening or personality labels are justified."
      }
    ],
    "phases": [
      {
        "name": "01 / Frame the causal question",
        "task": "Define what would count as improvement, including completion, optional feedback and an unwanted side effect. Distinguish a change over time from an effect caused by reminders; propose a plausible comparison and record confounders. Write two rival explanations before choosing a method.",
        "worked": "The later sessions average 9 attendees, compared with 7.5 earlier, but this is not evidence of a 1.5-person causal increase. Exam timing, lesson relevance and participant availability also changed. The outcome should include both engagement and voluntary participation."
      },
      {
        "name": "02 / Plan an ethical pilot",
        "task": "Design two comparable four-week opt-in approaches, with clear consent and a consistent way to collect aggregate attendance. Describe how participants can decline reminders and how you would avoid exposing individual activity. Specify a stop rule for complaints or exclusion.",
        "worked": "An ethical pilot could offer personal opt-in reminders and a no-reminder comparison where feasible, keep the same scheduled activities, publish only suitable aggregate totals and invite anonymous feedback. It should not punish nonattendance or turn a small sample into a diagnosis."
      },
      {
        "name": "03 / Defend a cautious recommendation",
        "task": "Write a recommendation that addresses the attendance pattern, ambiguous causal evidence, participant preferences and a fallback strategy for learners with poor connectivity or unpredictable shifts. State exactly which future evidence would change your mind.",
        "worked": "A credible decision may be to pilot optional individual prompts, preserve flexible alternatives and re-evaluate after a pre-agreed period. It should reject mandatory public callouts, retain the possibility that reminders have no causal benefit and distinguish learner autonomy from raw attendance numbers."
      }
    ],
    "counter": "The apparent increase might reflect upcoming exams rather than reminders. Explain how a pre-specified comparison and consistent session content would reduce—not eliminate—this uncertainty.",
    "transfer": "Transfer to a workplace: employees report that constant productivity notifications distract them. Build a two-outcome evaluation that measures both task completion and interruption cost, without monitoring private messages.",
    "rubric": [
      "Separates observed attendance from causal claims and competing explanations.",
      "Predefines at least two outcomes and a practical stop rule.",
      "Protects consent, autonomy and privacy throughout the pilot.",
      "Uses the contradictory comments rather than discarding them.",
      "Explains what result would cause a reversal or a revised recommendation."
    ],
    "limits": "Educational exercise, not psychological diagnosis or human-subjects research approval. Real studies may require organizational ethics review."
  },
  "laws": {
    "title": "Privacy incident review: rule, evidence and remedy",
    "brief": "A fictional education nonprofit collects learner contact details to organize workshops. A spreadsheet link is accidentally set to 'anyone with link'. A staff member says that because only ten people received the link, no privacy issue exists. Another insists the organization must publicly announce a legal breach immediately. The applicable jurisdiction, data fields, access logs and contractual responsibilities have not yet been checked.",
    "question": "What facts and authoritative rules are needed to assess risk and determine a proportionate, lawful response without inventing legal duties?",
    "exhibits": [
      {
        "label": "System record",
        "detail": "The file may contain names, personal email addresses and class attendance. It is unknown whether an unauthorized person opened it, whether download was allowed or when the link became public."
      },
      {
        "label": "Operations record",
        "detail": "A coordinator discovered the setting at 09:10, disabled link sharing at 09:24 and notified a supervisor at 09:40. A contractor's own copy might also exist but has not been located."
      },
      {
        "label": "Authority gap",
        "detail": "The nonprofit operates in the Philippines but some learners reside elsewhere. An internal handbook is dated two years earlier. Current statutory definitions, reportability thresholds, agency directions and relevant contracts require checking."
      }
    ],
    "phases": [
      {
        "name": "01 / Preserve the factual chain",
        "task": "Draft a chronology separating observed configuration, suspected access, notification actions and unresolved questions. List authorized people who can safely preserve logs. Avoid duplicating the exposed spreadsheet in a public report.",
        "worked": "The known exposure window is at least fourteen minutes from detection to closure; the actual start time is not established. The presence of a link is not proof it was opened. Keep access logs, role history and file metadata in a secured evidence location while limiting access."
      },
      {
        "name": "02 / Map the applicable rule",
        "task": "Prepare an applicability table covering organization location, affected people, data categories, current primary law and regulations, relevant agency guidance, contractual obligations, possible notification requirements and deadlines. Mark every entry 'verified', 'disputed' or 'unknown'.",
        "worked": "A legitimate table identifies the National Privacy Commission and current Philippine privacy law as starting points without asserting that every accidental link is reportable. Foreign jurisdiction issues or special categories can change duties; counsel and the responsible privacy officer should review."
      },
      {
        "name": "03 / Recommend a bounded response",
        "task": "Write a short internal incident memo with containment, factual investigation, protective action, escalation owner and public communication threshold. State how the response changes if evidence later shows unauthorized downloads.",
        "worked": "A defensible memo records immediate containment, checks accessible logs, investigates copies, protects affected people and seeks qualified privacy guidance. It avoids claiming 'no incident' simply because only ten recipients were known; it also avoids inventing a mandatory announcement before the current notification test is applied."
      }
    ],
    "counter": "A missing access log does not mean access did not occur. Explain how your confidence should change if logs were disabled and how a privacy-preserving response can still be taken.",
    "transfer": "Transfer the method to a consumer subscription: an employee exports customer addresses before leaving. Identify which evidence and rules differ from an accidentally shared link.",
    "rubric": [
      "Maintains a time-ordered record and separately labels unknown facts.",
      "Checks current primary law and regulator guidance before invoking duties.",
      "Includes preservation and containment without further disclosure.",
      "Explains alternative interpretations of missing logs.",
      "Describes who can make the final compliance decision and why."
    ],
    "limits": "Not legal advice. Incident notification and cross-border obligations depend on current law and detailed facts; qualified privacy and legal review is required."
  },
  "business": {
    "title": "Product economics investigation: the café lunch experiment",
    "brief": "A small café wants to add a pre-made sandwich menu. The owner is excited by sales but has never recorded unsold inventory, labor time or the impact on existing orders. A seven-day fictional trial provides enough numbers to build a first decision model but not enough to predict year-round demand.",
    "question": "At what volume and operating conditions would the new menu improve the café rather than merely increase gross sales?",
    "exhibits": [
      {
        "label": "Trial sales",
        "detail": "Over a hypothetical week the café prepared 90 sandwiches and sold 80 at ₱120 each. Ingredient and packaging cost is ₱55 for every prepared unit, including the ten that were unsold and discarded."
      },
      {
        "label": "Incremental operations",
        "detail": "The menu needs 7 staff hours weekly, with a hypothetical loaded labor cost of ₱140 per hour. It also adds ₱350 of weekly refrigeration and cleaning expense. Rent and existing staff shifts are unchanged in the first analysis."
      },
      {
        "label": "Demand uncertainty",
        "detail": "A festival raised foot traffic on two days. Five customers said they bought a sandwich instead of a higher-margin existing lunch item, but the number and lost contribution from such substitution have not been measured."
      }
    ],
    "phases": [
      {
        "name": "01 / Build the contribution bridge",
        "task": "Calculate revenue, produced-unit variable cost, waste, incremental staff and cleaning costs. Distinguish contribution before fixed overhead from cash retained after incremental operating costs. State every omission from the model.",
        "worked": "Revenue is 80×₱120=₱9,600. Produced-unit cost is 90×₱55=₱4,950, leaving ₱4,650 before added labor and utilities. Subtract ₱980 labor and ₱350 overhead to reach ₱3,320 in hypothetical weekly incremental contribution before substitution, taxes and other costs."
      },
      {
        "name": "02 / Stress-test uncertain demand",
        "task": "Recalculate a scenario with only sixty sold from ninety prepared, and one with ninety sold. Compare sensitivity to spoilage and the extra labor constraint. Decide what smaller-batch test would reduce uncertainty without sacrificing food safety.",
        "worked": "At sixty sold, revenue drops to ₱7,200 with the same ₱4,950 produced cost, ₱980 labor and ₱350 overhead: ₱920 remains before substitution. Selling ninety would yield ₱4,520 on the same assumptions. A smaller safe batch might protect against waste, but must meet availability and food-safety requirements."
      },
      {
        "name": "03 / Set an honest launch gate",
        "task": "Define how many weeks of ordinary, non-festival trading to observe, what to measure each day and the threshold for preserving or changing the menu. Include displacement of existing products and customer feedback before recommending expansion.",
        "worked": "A disciplined owner would test smaller production lots on representative weekdays, track sell-through, waste, customer substitution, preparation time and margin, and publish a pre-agreed go/no-go rule. One unusual week is insufficient to announce durable profitability."
      }
    ],
    "counter": "If the sandwich replaces a higher-margin lunch sale, the 'extra contribution' may be overstated. Show how you would measure cannibalization rather than assume every purchase is incremental.",
    "transfer": "Transfer the trial to a digital subscription with low manufacturing waste but recurring support costs. Which drivers disappear, and what retention and refunds replace them?",
    "rubric": [
      "Shows produced-unit cost for all ninety sandwiches, not only sold units.",
      "Gets the hypothetical ₱3,320 weekly contribution with disclosed assumptions.",
      "Recalculates a meaningful low-demand stress case correctly.",
      "Includes product substitution, labor and seasonality uncertainties.",
      "Sets a precommitted decision gate with repeatable measurements."
    ],
    "limits": "All amounts are fictional teaching data. Real food safety, permits, labor rules and financial decisions need local professional review."
  },
  "savings": {
    "title": "Financial resilience plan for irregular income",
    "brief": "A freelance worker earns uneven monthly income and wants to invest most savings while also preparing for a large possible repair. A lender offers a new installment plan that looks manageable during a high-income month. The worker needs a cash-flow view that survives a bad month and does not depend on uncertain future earnings.",
    "question": "How much can responsibly be committed while maintaining near-term liquidity and meeting known obligations?",
    "exhibits": [
      {
        "label": "Three-month forecast",
        "detail": "Fictional income is ₱28,000, ₱16,000 and ₱34,000 over three consecutive months. Essential expenses are ₱18,000 per month, and starting accessible savings are ₱12,000."
      },
      {
        "label": "Known and uncertain needs",
        "detail": "A ₱9,000 equipment repair may arise during the quarter. A ₱3,000 course purchase is optional, and a new loan would require ₱2,200 per month, excluding any undisclosed charges."
      },
      {
        "label": "Decision conditions",
        "detail": "The worker has no written guarantee of the next project, needs equipment to earn and can postpone the optional course. Investments with withdrawal delays cannot be treated as immediate emergency cash."
      }
    ],
    "phases": [
      {
        "name": "01 / Map timing, not just totals",
        "task": "Prepare a monthly opening-and-closing cash balance that includes essential expenses and starting savings. Put the repair in the weakest cash month as one stress case and state where the balances would fail if a discretionary commitment is added.",
        "worked": "Before a repair or new commitments, cash closes at ₱22,000, ₱20,000 and ₱36,000 after months one through three. A ₱9,000 repair in month two instead reduces that second close to ₱11,000 and the third to ₱27,000. Timing changes the safety margin despite positive quarterly totals."
      },
      {
        "name": "02 / Evaluate resilience boundaries",
        "task": "Define a minimum accessible emergency balance based on personal needs, likely disruptions and income volatility. Compare postponing the course, accepting the installment and keeping the current position. State what missing fee and term information you require.",
        "worked": "A new ₱2,200 monthly installment would reduce free cash and create a fixed obligation during low-income periods. Its lower monthly payment is not enough to judge total cost. A cautious plan postpones optional spending until the buffer target and realistic repair scenario are accounted for."
      },
      {
        "name": "03 / Build a monitoring and response rule",
        "task": "Write a simple monthly decision rule that identifies leading indicators such as unpaid invoices, forecast income and upcoming obligations. Explain when to renegotiate, save more cash or seek qualified advice without guaranteeing investment returns.",
        "worked": "A practical rule flags commitments before a projected cash balance falls under the worker's chosen reserve. The worker reviews invoices weekly, separates money reserved for expenses and taxes, and treats expected client income as uncertain until confirmed."
      }
    ],
    "counter": "A higher expected investment return does not remove the possibility of a near-term loss or delayed withdrawal. Explain when an apparently attractive yield should not override an urgent cash obligation.",
    "transfer": "Transfer to a dual-income household where one income stops for six weeks. What changes in the emergency buffer and the order of decisions?",
    "rubric": [
      "Produces a coherent month-by-month cash balance, including the stressed repair.",
      "Treats optional purchases and fixed debt commitments differently.",
      "Separates accessible cash from investments with uncertain liquidity.",
      "Requests full loan terms rather than judging by installment size.",
      "Names observable triggers for revising the plan."
    ],
    "limits": "Fictional financial education, not personalized lending or investment advice. Real interest rates, taxes and consumer protections require current official information."
  },
  "time": {
    "title": "Systems planning: locate the bottleneck before adding effort",
    "brief": "A volunteer education team coordinates workshop registrations, approvals and reminders. Members say that everyone is busy, but many sessions remain unscheduled. The coordinator wants an app with more notifications. You are asked to investigate the workflow before recommending software or longer working hours.",
    "question": "Which step constrains completed workshops, and what experiment could reduce queue time without compromising participant welfare?",
    "exhibits": [
      {
        "label": "Flow data",
        "detail": "A fictional week has 25 session proposals, 22 initial checks completed, 12 approvals completed and 11 scheduled sessions. One approver handles all approvals; the team already sends two notification messages per proposal."
      },
      {
        "label": "Work experience",
        "detail": "Two volunteers report frequent context switching; another notes that approval requests lack required information. An organizer works evenings and cannot answer during the day. No reliable per-stage timestamps were recorded before this week."
      },
      {
        "label": "Capacity and safety",
        "detail": "The group must not assume unpaid workers can add hours. User data include names and availability and should not be copied into a public spreadsheet for productivity monitoring."
      }
    ],
    "phases": [
      {
        "name": "01 / Define throughput and queue",
        "task": "Build a flow map from proposal to scheduled session. Distinguish proposals entering a stage from work actually completed, and identify which stage appears constrained. List what timestamps and rejection reasons must be collected before diagnosing the cause.",
        "worked": "Approval throughput is 12 in the week, versus 22 completed initial checks. Scheduling 11 depends on prior approvals, so increasing proposal intake alone may expand the queue. The single approver looks like a plausible bottleneck, but incomplete submissions and scheduling capacity also require measurement."
      },
      {
        "name": "02 / Pilot a limited improvement",
        "task": "Design a small experiment with an approval checklist, office-hour batch or delegated review for low-risk cases. Cap work-in-progress, preserve humane response times and choose a before/after measure. Explain how to avoid a misleading comparison with a peak-demand week.",
        "worked": "A four-week pilot can standardize required fields and reserve predictable approval slots, while tracking median days waiting, completed sessions and volunteer workload. Changes should be reversible. Additional notifications are not the default answer without evidence they reduce blocking."
      },
      {
        "name": "03 / Report the trade-offs",
        "task": "Write a decision note comparing expected benefits, the cost of implementation, risk to volunteer capacity and the possibility that the bottleneck simply moves downstream. Define what result would justify building a tool.",
        "worked": "If approvals improve but scheduling stalls, the constraint moved and the team should inspect the next stage. A tool is justified only when a repeatable workflow and access rules are known; otherwise a short checklist may outperform a custom system."
      }
    ],
    "counter": "Imagine approvals increase to twenty, but only eleven workshops still get scheduled. Why is calling the experiment a success without downstream measures misleading?",
    "transfer": "Transfer the flow model to an individual developer with unfinished projects. Define what counts as completed user value rather than task starts or time spent.",
    "rubric": [
      "Identifies the plausible constrained stage using actual flow counts.",
      "Distinguishes queue size from completed throughput.",
      "Plans a limited ethical pilot with workload measurement.",
      "Anticipates downstream bottlenecks and data privacy.",
      "States a decision threshold for software rather than assuming automation helps."
    ],
    "limits": "Illustrative workflow education only. Volunteer capacity and accessibility needs must take priority over efficiency metrics."
  },
  "languages": {
    "title": "Localisation field study: meaning, register and community review",
    "brief": "A nonprofit wants to translate three everyday help messages for learners from several language communities. Machine translations look fluent, but reviewers disagree over politeness, inclusive wording and regional expressions. No single editor can claim to represent every dialect.",
    "question": "How can a small team produce language materials that communicate the intended action safely while documenting where local review remains necessary?",
    "exhibits": [
      {
        "label": "Source texts",
        "detail": "The English messages are 'Please ask if something is unclear', 'This form is optional', and 'You can change your answer later'. Each has a practical consequence; the last depends on whether the system actually permits edits."
      },
      {
        "label": "Reviewer notes",
        "detail": "A bilingual volunteer says one candidate translation sounds like an order. Another says a term for 'form' is uncommon locally. A third questions whether the promise about later editing is true for people using offline devices."
      },
      {
        "label": "Product constraint",
        "detail": "The application offers twenty selectable languages, but no qualified native/regional validation has yet been completed. Synthetic speech availability varies by device and does not establish natural pronunciation."
      }
    ],
    "phases": [
      {
        "name": "01 / Define meaning and use context",
        "task": "For each sentence, document intended audience, required action, level of formality, whether declining is allowed, and what would count as misunderstanding. Identify where the underlying product behavior must be checked before translation.",
        "worked": "The phrase 'This form is optional' must permit a learner to decline without penalty. If the app actually forces completion, perfect translation would still be misleading. Start with a behavioral truth check, then translate the verified meaning in context."
      },
      {
        "name": "02 / Design a native review protocol",
        "task": "Prepare a review sheet with source intent, proposed text, back-translation, alternative regional wording, usability context and reviewer confidence. Set a resolution process when reviewers disagree and retain unresolved variants instead of silently picking one.",
        "worked": "A robust sheet distinguishes literal grammar from pragmatic effect and stores locale labels, not just language names. It records the reasons for a revision and asks another qualified reviewer to independently check sensitive words and expected listener interpretations."
      },
      {
        "name": "03 / Validate real comprehension",
        "task": "Write a short comprehension task that asks a learner what they believe the message permits, rather than which translation looks prettiest. Define privacy-preserving feedback and a rule for suspending a translation if it misstates user rights.",
        "worked": "Someone seeing 'optional' should be able to infer that skipping is allowed. Test outcomes should record comprehension of this consequence without collecting unnecessary identity. Conflicting results trigger another native/regional review, not a claim that automated metrics prove fluency."
      }
    ],
    "counter": "A fluent-sounding sentence can still be misleading if the product promise is false. Explain why content verification must happen before and after linguistic review.",
    "transfer": "Transfer to a high-stakes emergency message where time, dialect and literacy differ. What extra human review and accessibility safeguards are needed?",
    "rubric": [
      "Specifies intended user action and social register for each source message.",
      "Checks product truthfulness rather than treating translation as isolated text.",
      "Includes independent native/regional review and versioned decisions.",
      "Tests comprehension without overstating automated quality.",
      "Retains unresolved uncertainty instead of declaring universal correctness."
    ],
    "limits": "Native/regional language validation remains outstanding. This exercise does not certify translation quality or authorize high-stakes deployment."
  },
  "communication": {
    "title": "Crisis communication lab: clarify what is known",
    "brief": "A community service experiences an unexplained outage that interrupts registration. A manager wants a confident announcement blaming the hosting provider to protect the team's reputation. Another proposes saying nothing until every detail is confirmed. The audience needs guidance now, while the root cause remains uncertain.",
    "question": "How can an update be timely, clear and accountable without inventing a cause or disclosing private user details?",
    "exhibits": [
      {
        "label": "Verified observation",
        "detail": "Registration attempts returned errors from 10:05 to 10:24. The team observed an application error message, but does not yet know whether it resulted from configuration, network failure or an upstream provider."
      },
      {
        "label": "Impact signal",
        "detail": "Fourteen users reported difficulty registering. The service has not confirmed how many total attempts failed, whether any submissions were duplicated or whether payments were affected."
      },
      {
        "label": "Operating constraint",
        "detail": "Staff can provide an alternative contact channel and will publish an update after a defined review window. Internal logs might contain names or tokens and should not be pasted into public notices."
      }
    ],
    "phases": [
      {
        "name": "01 / Construct a truth-status board",
        "task": "Separate confirmed observations, reasonable hypotheses, disputed claims and unknowns. Define who owns each investigation and which questions matter to users immediately. Write a short statement of impact without guessing the root cause.",
        "worked": "A defensible first update says that registration was disrupted during an observed time window, acknowledges that some users may be affected and avoids blaming the host before evidence supports that attribution. It does not claim 'only fourteen users' were affected because that is merely the report count."
      },
      {
        "name": "02 / Draft two updates for two audiences",
        "task": "Write a public message with safe next steps and a commitment to a specific next update, plus an internal investigation memo with broader hypotheses and evidence owners. Keep personal data, tokens and speculation out of the public version.",
        "worked": "The public notice can offer a verified support channel and caution against retrying payments if duplicates are unverified. The internal memo can record application logs, infrastructure changes and known limitations. Different detail levels must not create contradictory facts."
      },
      {
        "name": "03 / Plan corrective communication",
        "task": "Define how the team will acknowledge an earlier mistake and revise guidance if later evidence contradicts the first update. Create a follow-up note that distinguishes restoration from full resolution and explains what has been verified.",
        "worked": "If the service recovers while cause remains unknown, say functionality appears restored under current checks and monitoring continues. If a previous claim was wrong, correct it visibly with a dated update rather than erasing the record."
      }
    ],
    "counter": "Users who lost money or missed deadlines may need individualized remedies. Explain why a reassuring tone is not a substitute for an accurate impact assessment.",
    "transfer": "Transfer to a workplace safety notice where the evidence is incomplete. What changes about urgency, escalation and the language of protective action?",
    "rubric": [
      "Separates observation from unsupported attribution.",
      "Produces both audience-specific updates without contradicting facts.",
      "Gives practical, verified user guidance and follow-up ownership.",
      "Accounts for privacy, duplicate actions and potential harm.",
      "Explains how to correct the record if new evidence changes the conclusion."
    ],
    "limits": "Fictional communications practice only. Actual incident notices may require legal, security and safety experts."
  }
};
