/** Optional three-stage competency bridges — subject worlds 1–7.
 * Original case studies. No grade or progress mutation; review pending.
 */
export const COMPETENCY_BRIDGES_ONE={
  "psychology": {
    "Beginner": {
      "objective": "Tell apart an observable event and the interpretation attached to it.",
      "scenario": "A teammate writes 'We need to discuss this tomorrow' after your presentation. You conclude that your effort was rejected, although the message gives no evaluation. The meeting could concern timing, cost or presentation quality.",
      "reasoning": "The actual observation is a meeting request; rejection is a hypothesis. The strength of a feeling does not establish which hypothesis is true. A useful explanation keeps an alternative possibility open without requiring forced optimism.",
      "challenge": "Write two columns titled 'What happened' and 'What I inferred'. Add one respectful question that could reduce uncertainty without asking for the teammate's private motives.",
      "feedback": "Do not mark 'they hate the work' as a fact. A good request might be 'Is there a particular part I should prepare before the meeting?'—it seeks actionable context without accusation.",
      "proof": "A second reader can mark each statement as observation, inference or unknown without guessing a hidden personality trait."
    },
    "Intermediate": {
      "objective": "Choose regulation, clarification or a boundary according to the actual source of risk.",
      "scenario": "During three meetings, a member repeatedly calls a colleague's questions 'stupid'. A facilitator advises deep breathing and says the problem should disappear if everyone controls their emotions.",
      "reasoning": "Regulation may help the targeted person respond deliberately, but it cannot substitute for accountability for a repeated insult. Different responses address different mechanisms: pausing reduces impulsivity, clarification addresses ambiguity, and boundaries protect conduct.",
      "challenge": "Write a short two-part plan: an immediate low-risk response and an external accountability step if the insults repeat. Identify one event that would trigger formal help.",
      "feedback": "A person could pause before speaking, ask for respectful discussion, and document repeated incidents for a mediator. It is not appropriate to blame the person targeted for failing to feel calm.",
      "proof": "The plan distinguishes private emotion management from collective conduct and includes a response to escalating threats."
    },
    "Advanced": {
      "objective": "Evaluate a behavior intervention without confusing a measured change with a causal effect.",
      "scenario": "Attendance increases from eight to eleven after a study group introduces reminders. The change also coincides with exams and free tutoring, and some people say the reminders made them feel watched.",
      "reasoning": "A before-after difference mixes the potential intervention effect with time, urgency, tutor support and who chose to attend. Outcomes should include both attendance and voluntary comfort. Causal inference needs a fair comparison and a predefined decision threshold.",
      "challenge": "Design a short consent-based pilot with a comparison condition, an aggregate attendance metric, an unintended-pressure metric and a stop rule.",
      "feedback": "The observed increase is descriptive, not proof that reminders caused it. Use opt-in private messages, minimize records and compare similar sessions, then revise the decision if participants report harm.",
      "proof": "A reviewer can identify competing explanations, ethical safeguards and the exact evidence that would change the recommendation."
    }
  },
  "laws": {
    "Beginner": {
      "objective": "Locate the relevant jurisdiction and distinguish an official rule from a viral claim.",
      "scenario": "A post promises that all Philippine online purchases are refundable within thirty days. It gives no citation, publication date or product exceptions and appears to have been copied from a foreign consumer website.",
      "reasoning": "Different countries and transaction types can have different legal duties. A legal right must be grounded in the current applicable text, not inferred from a confident post or a private seller's slogan.",
      "challenge": "Create a source-check card with transaction jurisdiction, claimed entitlement, authoritative source to consult, effective date and two missing facts.",
      "feedback": "Mark the thirty-day claim unverified until an applicable current Philippine authority is found. Product condition, contract terms and remedy procedure are material facts, not small print to ignore.",
      "proof": "The source card distinguishes a candidate legal issue from an established entitlement and does not invent a deadline."
    },
    "Intermediate": {
      "objective": "Build a rule-to-evidence matrix that does not conceal opposing facts.",
      "scenario": "A buyer saved a listing marked 'new', but a seller later provides a checkout screenshot claiming refurbished condition was disclosed. The returned item has signs of prior use, but no timestamped checkout archive has been verified.",
      "reasoning": "A listing proves some representation and delivery photos show visible condition; neither settles the final contract terms or the seller's intent. Every rule element needs supporting, conflicting or missing evidence.",
      "challenge": "Map the advertised condition, final checkout disclosure, delivery condition and seller response to primary records. Record one strong argument favoring each party.",
      "feedback": "Do not call suspected mismatch 'fraud' as an established legal finding. Preserve timestamps, originals and the seller's counterevidence; check current law before selecting a remedy.",
      "proof": "The table shows which allegations are verified, contested and unavailable, including which authority and exceptions matter."
    },
    "Advanced": {
      "objective": "Explain a proportionate remedy route while stating which legal questions remain unresolved.",
      "scenario": "A template demand letter tells the same buyer to threaten criminal charges and publish the seller's private details unless a full refund arrives in a day. The contract and current complaint procedure have not been checked.",
      "reasoning": "A plausible consumer dispute does not by itself establish a crime, a specific refund entitlement or a universal filing deadline. Proper analysis needs source hierarchy, chronology, exceptions and forum.",
      "challenge": "Write a conditional one-page issue brief with facts, potential rule, strongest counterevidence, official complaint route to verify and a neutral requested response.",
      "feedback": "A cautious letter describes the discrepancy, attaches authorized supporting evidence and requests a response, while qualified review confirms current legal remedies and procedure. Do not leak private data.",
      "proof": "The memo is traceable to primary sources or explicitly marked unknown, with no invented remedy or threatened penalty."
    }
  },
  "business": {
    "Beginner": {
      "objective": "Ask for evidence of a real customer problem instead of collecting compliments.",
      "scenario": "A student calls your study-planner app impressive but already meets deadlines using a free calendar. They have not changed their workflow or tried another product in months.",
      "reasoning": "Praise can measure courtesy or design appeal without measuring demand. Discover the last real problem, its cost and what alternatives the person already uses. A no-demand answer is valuable evidence.",
      "challenge": "Write three interview questions about last week's planning behavior, a missed deadline and tools already used. Name an answer that would weaken your idea.",
      "feedback": "Good questions invite a story of past behavior rather than 'Would you pay for my app?' If no costly problem exists, this student might not be a paying customer.",
      "proof": "The interview captures observable past behavior and one falsifiable demand signal instead of invented willingness to pay."
    },
    "Intermediate": {
      "objective": "Calculate incremental contribution after waste and operating costs.",
      "scenario": "A café prepares ninety sandwiches costing ₱55 each, sells eighty at ₱120 and pays ₱980 additional labor and ₱350 extra utilities. The owner proudly reports ₱9,600 'profit'.",
      "reasoning": "Revenue is units sold multiplied by price. Incremental contribution must subtract production cost for all prepared units, including unsold inventory, and the additional labor and utilities. Existing-product substitution remains unknown.",
      "challenge": "Calculate revenue and the remaining contribution from the listed data. Add one fact that could reduce the actual whole-café gain.",
      "feedback": "₱9,600 revenue minus ₱4,950 production, ₱980 labor and ₱350 utilities leaves ₱3,320 before tax, omitted costs or lost sales from old products. Do not call this audited profit.",
      "proof": "The computation includes wasted stock and explicitly distinguishes contribution from net income."
    },
    "Advanced": {
      "objective": "Precommit a market test with demand, retention and cost criteria.",
      "scenario": "A freemium app attracts twenty trials, six users return after a week, and two visitors say they 'might subscribe'. Nobody has paid and support labor is unmeasured.",
      "reasoning": "Trial starts, repeat use, actual payment and profitable delivery are different stages. Selection and a short observation window make lifetime-value forecasts unstable. Decide the test's continuation rule before seeing results.",
      "challenge": "Define an ethically transparent paid-offer experiment, repeat-use metric, support cost measure and conditions to continue, pivot or stop.",
      "feedback": "Do not multiply twenty trials by a proposed price and count the result as revenue. Track verified payments and variable support while keeping refund, data privacy and cancellation promises truthful.",
      "proof": "A decision memo uses observable paid behavior and full contribution assumptions rather than retrospective success claims."
    }
  },
  "savings": {
    "Beginner": {
      "objective": "Distinguish committed bills, optional costs and liquid reserves.",
      "scenario": "A worker has ₱12,000 accessible cash, a required ₱6,000 bill this week, and an optional ₱5,000 online course. An unpredictable equipment repair might also be needed soon.",
      "reasoning": "A cash balance is not entirely available for discretionary spending when essential bills and credible shocks are coming. Money that cannot be withdrawn promptly is not equivalent to accessible emergency cash.",
      "challenge": "Create an allocation table with the mandatory bill, possible course payment and remaining cash. Identify which action could be postponed.",
      "feedback": "After the bill, ₱6,000 remains. Buying the course would leave ₱1,000 for the unknown repair. Deferring the optional purchase is a reasonable way to protect liquidity until needs are clearer.",
      "proof": "The table uses actual due dates and differentiates optional spending from an unavoidable commitment."
    },
    "Intermediate": {
      "objective": "Recompute cash balance at the weakest month rather than relying on quarterly totals.",
      "scenario": "Starting savings are ₱12,000. Income is ₱28,000 in month one and ₱16,000 in month two, while essential spending is ₱18,000 per month. A ₱9,000 repair is due in month two.",
      "reasoning": "The closing balance is opening cash plus income minus outflows. Money expected in a later month cannot cover a bill before it arrives without another financing assumption.",
      "challenge": "Calculate both monthly closing balances and explain how the repair changes the decision to accept a new monthly installment.",
      "feedback": "Month one closes at ₱22,000. Month two closes at ₱11,000 after the repair. A recurring installment should be tested against that weak period, not just a future high-income month.",
      "proof": "Both month-end balances follow the dated cash flow and the repair is charged in the actual month it occurs."
    },
    "Advanced": {
      "objective": "Compare complete loan terms under a realistic adverse cash-flow scenario.",
      "scenario": "A lender offers installments of ₱2,200 but has not disclosed all fees, number of payments or the effective rate. The worker may lose half of the next month's expected contract revenue.",
      "reasoning": "An installment figure is not the total price of credit. Fixed payments remain due when income falls. Competing uses of cash should be judged against essential obligations and the accessibility of savings.",
      "challenge": "Draft a lender checklist covering amount received, total repayable, fees, terms, due dates and penalties; state a reduced-income trigger for delaying a discretionary purchase.",
      "feedback": "Request complete written terms and compare same-basis total repayment. Stress-test the worst balance and avoid relying on an uncertain investment return to meet a guaranteed obligation.",
      "proof": "The choice remains conditional on missing terms, accessible reserves and the ability to meet due dates during a bad month."
    }
  },
  "time": {
    "Beginner": {
      "objective": "Translate an aspiration into one acceptance criterion another person can verify.",
      "scenario": "A developer says a notes application is 'almost finished' but spends each day changing its theme. Search sometimes gives no feedback, including after a user types a nonmatching title.",
      "reasoning": "A useful deliverable names the person, action and observable outcome. Completion requires a normal path and a relevant failure or empty state; decorative perfection cannot substitute for functionality.",
      "challenge": "Write three checks for searching a note and one cosmetic change that will not block release.",
      "feedback": "The user can find an existing note, see a clear empty-result message for a missing note and submit using a keyboard. A new shadow style is out of scope for the defined result.",
      "proof": "The task includes a repeatable result and error path, not merely an undefined 'polish' objective."
    },
    "Intermediate": {
      "objective": "Limit work in progress and keep blocked commitments visible.",
      "scenario": "A developer has four half-finished apps, an interview in three days and a client defect due tomorrow. Fixing the defect requires permission from an administrator who has not replied.",
      "reasoning": "Changing tasks is reasonable when blocked, but the dependency needs an owner and review time. Hidden workarounds and many half-open commitments undermine trust and throughput.",
      "challenge": "Create a board with at most two active priorities, a blocked-item follow-up and a clear definition of what would justify rescheduling the client fix.",
      "feedback": "Keep the defect in a documented blocked state and send a specific authorization request. Prepare for the interview during the wait; park the personal apps and never pretend an inaccessible system was tested.",
      "proof": "The board preserves the external deadline and a legitimate next action without increasing uncontrolled work in progress."
    },
    "Advanced": {
      "objective": "Test a system constraint by end-to-end completion, not local activity counts.",
      "scenario": "A volunteer team receives twenty-five workshop proposals, screens twenty-two, approves twelve and schedules eleven. The manager proposes buying more advertisements to increase incoming proposals.",
      "reasoning": "When one stage is constrained, raising input can enlarge queues without increasing output. Track wait time, incomplete inputs, volunteer capacity and completed workshops before selecting an intervention.",
      "challenge": "Propose a small checklist-and-review-window pilot with measurable approval waiting time and total completed sessions. State what would stop a custom software build.",
      "feedback": "Approvals may be a bottleneck, but the snapshot does not prove why. A bounded pilot can test complete requests; if approval throughput rises while scheduling stalls, inspect the downstream constraint.",
      "proof": "The recommended change is reversible, accounts for volunteer workload and measures completed user value."
    }
  },
  "languages": {
    "Beginner": {
      "objective": "Learn an everyday phrase together with the reply it invites.",
      "scenario": "A learner memorizes a request for directions but cannot respond when someone mentions a landmark and a time. The phrase is familiar; the conversation is not.",
      "reasoning": "A meaningful phrase has a speaker, recipient, social register and expected kinds of replies. Word-for-word equivalence may miss politeness or regional variation. Synthetic speech is practice, not a native pronunciation certificate.",
      "challenge": "Draft a four-turn exchange: greeting, request, clarification and confirmation. Mark every phrase that needs locale-specific review.",
      "feedback": "The learner must be able to ask for repetition and check a landmark without simply repeating the original question louder. Native or regional validation remains necessary for naturalness.",
      "proof": "The interaction has an identifiable purpose, a plausible reply and a way to repair misunderstanding."
    },
    "Intermediate": {
      "objective": "Distinguish recognizing words from understanding the action a listener recommends.",
      "scenario": "Someone says 'second street after the station', but the learner hears 'second stop'. Both versions mention the station; an unchecked assumption could send the learner elsewhere.",
      "reasoning": "Recognition of a noun does not ensure comprehension. The learner should check the ambiguous directional relation and produce a confirmation that allows correction by the listener.",
      "challenge": "Write a question that distinguishes 'street' from 'stop' and two possible responses. Outline a delayed recall exercise that is not just flashcard recognition.",
      "feedback": "A correct repair asks whether the destination is along the street after the station, then waits for confirmation. The exact target-language phrasing needs a knowledgeable local reviewer.",
      "proof": "Success requires the listener to correct the actionable misunderstanding, not merely recognize the topic."
    },
    "Advanced": {
      "objective": "Validate a translated interface by intended behavior and native or regional comprehension.",
      "scenario": "A translated app tells people a form is optional, but the software refuses to continue unless every field is completed. Reviewers also disagree about whether the translation sounds like an order.",
      "reasoning": "A fluent-looking translation cannot repair a false product promise. Social context, locale, accessibility and reader comprehension determine whether the message is appropriate. Automated similarity is insufficient evidence.",
      "challenge": "Plan a source-truth audit, locale review and comprehension test asking what a person believes they may do. State a threshold for withholding a quality claim.",
      "feedback": "First fix the app behavior or the source message. Then ask qualified reviewers to examine register and test whether intended users understand the right to skip or edit, without claiming dialect-wide proof.",
      "proof": "The proposed approval depends on user comprehension, behavioral truth and unresolved native/regional review."
    }
  },
  "communication": {
    "Beginner": {
      "objective": "Describe an event and a request without turning frustration into an accusation.",
      "scenario": "A team member submits an updated file after the agreed review cutoff. You want to reply 'You always disrespect everyone', but only the late revision is documented.",
      "reasoning": "An accusation about identity or motive is difficult to verify. A clear opening identifies the behavior, its impact and a specific requested next step while preserving the other person's ability to explain.",
      "challenge": "Write a four-sentence response explaining the late file, the lost review time and which decision is needed before the next meeting.",
      "feedback": "A constructive message could request a change summary and revised review time. It need not hide anger, but it avoids claiming the teammate deliberately intended to undermine others.",
      "proof": "A neutral reader can identify the observed event, practical impact and clear actionable request."
    },
    "Intermediate": {
      "objective": "Write a proportionate exception policy and boundary that work during disagreement.",
      "scenario": "A demo is tomorrow. A late change repairs a broken login, while another changes a background gradient. A team freeze rule exists but has no process for urgent defects.",
      "reasoning": "Not every request has equal consequences. Legitimate exceptions need an owner and verifiable criteria; a boundary specifies what you will do if a condition repeats and is not a punishment for dissent.",
      "challenge": "Create a two-sentence exception rule and a response to repeated insults in group chat, identifying which authority can approve a critical fix.",
      "feedback": "A designated reviewer can accept tested essential repairs while deferring decorative changes. Personal insults can be addressed by disengaging from accusations and requesting facilitation if necessary.",
      "proof": "The policy permits necessary safety or functional fixes without opening unlimited scope or tolerating harassment."
    },
    "Advanced": {
      "objective": "Issue a correction when later evidence overturns an earlier public claim.",
      "scenario": "An organization blamed its hosting provider for a registration outage. Logs now indicate an internal configuration change, but whether any payments were duplicated remains under investigation.",
      "reasoning": "Truthful messaging separates confirmed cause from unresolved impact. Restored functionality is not proof that all users were unaffected. A correction should be dated, actionable and protect private records.",
      "challenge": "Draft a public correction and an internal investigation note. State the new evidence, unknown transaction consequences, safe guidance and the next update owner.",
      "feedback": "Withdraw the unsupported provider attribution, describe the verified configuration issue and provide a secure status-check route. Do not tell users to blindly repeat payments or disclose transaction logs.",
      "proof": "The communication visibly corrects the record and separates service restoration from ongoing user-impact uncertainty."
    }
  }
};
