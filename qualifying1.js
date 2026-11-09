/** Qualification decisions 1/2. Fictional, original, independently unreviewed. */
export const QUALIFYING_ONE={
  "psychology": {
    "title": "Voluntary behavior-change defense",
    "defense": "Draft a plan to evaluate whether optional private reminders improve study participation. Include at least two competing causal explanations, evidence of unwanted pressure, opt-out procedures and a reversal threshold.",
    "criteria": [
      "Separate observations from attributions.",
      "Include participant autonomy and a harm metric.",
      "Define a causal comparison and revision threshold."
    ],
    "cases": [
      {
        "title": "Association or cause?",
        "scene": "Participation increased after reminders, but exam season also began and the lesson schedule changed. What is defensible?",
        "choices": [
          {
            "label": "The reminders definitely worked.",
            "reason": "Timing and changing content confound the comparison; attendance alone does not establish a causal effect."
          },
          {
            "label": "Attendance rose in these sessions, but the cause remains uncertain.",
            "reason": "Correctly distinguishes observed change from attribution and leaves room for a better comparison."
          },
          {
            "label": "The reminders harmed everyone.",
            "reason": "Some participants expressed discomfort, but the evidence does not establish universal harm."
          }
        ],
        "preferred": 1,
        "transfer": "Describe a comparison that keeps content and timing more similar and explicitly measures unwanted pressure."
      },
      {
        "title": "A protective intervention",
        "scene": "An organizer wants to publish the names of absent learners even though they did not consent. Which revision should be tried first?",
        "choices": [
          {
            "label": "Publish names only for a week.",
            "reason": "Even short public disclosure could shame participants or expose private attendance without permission."
          },
          {
            "label": "Abandon every form of measurement.",
            "reason": "Responsible aggregate measurement could still evaluate an opt-in intervention without identifying individuals."
          },
          {
            "label": "Offer private opt-in reminders, aggregate reporting and a clear decline route.",
            "reason": "This preserves autonomy and allows a reversible, privacy-conscious learning experiment."
          }
        ],
        "preferred": 2,
        "transfer": "Explain what should change when participants share devices and cannot safely receive messages."
      }
    ]
  },
  "laws": {
    "title": "Privacy incident evidence defense",
    "defense": "Create an issue brief for a fictional misconfigured file share. Distinguish the known timeline, unknown access, current applicable authority, remedial actions, and duties that require qualified verification.",
    "criteria": [
      "Do not invent statutory deadlines.",
      "Separate suspected exposure from proved access.",
      "Avoid further publication of private records."
    ],
    "cases": [
      {
        "title": "What is the known duration?",
        "scene": "A file was discovered public at 09:10 and its link disabled at 09:24. The start of exposure is unknown.",
        "choices": [
          {
            "label": "Exposure lasted exactly fourteen minutes.",
            "reason": "Discovery-to-containment is known, but the share could have been public earlier."
          },
          {
            "label": "Exposure was known by 09:10; its beginning and any viewing are unconfirmed.",
            "reason": "Preserves verified times and the genuine gaps in evidence."
          },
          {
            "label": "No access is proven, so nothing happened.",
            "reason": "Incomplete access logs do not demonstrate the absence of risk."
          }
        ],
        "preferred": 1,
        "transfer": "List which authorized logs and records would help bound the actual exposure without revealing the file itself."
      },
      {
        "title": "Verify the governing rule",
        "scene": "Staff cite an old policy as proof that notification cannot be required. Several affected people live outside the organization's country.",
        "choices": [
          {
            "label": "Trust the handbook as controlling law.",
            "reason": "Internal policy cannot displace current statutory, regulatory or cross-border duties."
          },
          {
            "label": "Announce a statutory deadline that seems common elsewhere.",
            "reason": "A deadline must come from the current applicable source and factual trigger, not analogy."
          },
          {
            "label": "Map jurisdictions, categories, facts and current primary authority for qualified review.",
            "reason": "This creates a verifiable legal applicability analysis without asserting unverified duties."
          }
        ],
        "preferred": 2,
        "transfer": "Draft a factual communication threshold and identify who must confirm legal requirements."
      }
    ]
  },
  "business": {
    "title": "New product unit-economics defense",
    "defense": "Produce a decision memo for a fictional café sandwich trial. Account for every prepared unit, new labor, waste, existing-menu substitution and a representative weekday pilot before recommending expansion.",
    "criteria": [
      "Compute incremental rather than gross income.",
      "Track unsold inventory and displaced sales.",
      "Define a prespecified launch gate."
    ],
    "cases": [
      {
        "title": "Recover the contribution bridge",
        "scene": "The café sells eighty sandwiches at ₱120, prepared ninety at ₱55 each, and spent ₱980 labor plus ₱350 utilities. What is the stated incremental contribution?",
        "choices": [
          {
            "label": "₱9,600.",
            "reason": "That is revenue and omits both produced-unit costs and operating expenses."
          },
          {
            "label": "₱3,320 before substitution, tax and unspecified costs.",
            "reason": "Revenue ₱9,600 less ₱4,950 ingredients, ₱980 labor and ₱350 additional expenses equals ₱3,320."
          },
          {
            "label": "₱4,520.",
            "reason": "That counts ingredient costs only for sold units, ignoring ten prepared but unsold sandwiches."
          }
        ],
        "preferred": 1,
        "transfer": "Subtract a hypothetical ₱800 lost contribution from displaced products and interpret the new result."
      },
      {
        "title": "Repeat the test without festival bias",
        "scene": "Two days of unusual festival traffic drove the sandwich trial. The owner proposes doubling production immediately.",
        "choices": [
          {
            "label": "Double output because the initial week was profitable.",
            "reason": "Festival traffic may not generalize, and higher preparation increases spoilage risk."
          },
          {
            "label": "Stop tracking waste because all sales are good.",
            "reason": "Waste is a real cost and can make an apparently successful new menu unprofitable."
          },
          {
            "label": "Run safe smaller batches on ordinary days and record displacement and waste.",
            "reason": "This collects representative evidence about additional contribution and capacity before scaling."
          }
        ],
        "preferred": 2,
        "transfer": "Specify an ordinary-day decision gate that would justify stopping, revising or scaling."
      }
    ]
  },
  "savings": {
    "title": "Irregular-income liquidity defense",
    "defense": "Build a three-month cash forecast including an adverse repair and a lower-income month. Compare the full cost of an optional loan without confusing a small installment with affordability.",
    "criteria": [
      "Show dated cash balances rather than a grand total.",
      "Protect liquid reserves during uncertain income.",
      "Distinguish disclosed terms from assumptions."
    ],
    "cases": [
      {
        "title": "Find the weak-month balance",
        "scene": "Starting cash ₱12,000, monthly income ₱28,000 then ₱16,000, essential expenses ₱18,000 each month, and a ₱9,000 repair in month two.",
        "choices": [
          {
            "label": "₱11,000 at the end of month two.",
            "reason": "Month one closes at ₱22,000; month two adds ₱16,000 and subtracts ₱18,000 and ₱9,000."
          },
          {
            "label": "₱20,000 because repairs are irregular.",
            "reason": "The specified repair must be included in the month it is expected for the stress scenario."
          },
          {
            "label": "₱27,000 using next month's expected income.",
            "reason": "A future uncertain payment is not cash available to meet this month's obligation."
          }
        ],
        "preferred": 0,
        "transfer": "Recalculate after adding a ₱2,200 installment in each of the two months."
      },
      {
        "title": "Choose how to evaluate the loan",
        "scene": "A lender advertises low monthly payments but has not disclosed all fees, penalties or total repayments.",
        "choices": [
          {
            "label": "Accept because the payment is small compared with the best month.",
            "reason": "High-income months do not guarantee enough cash during adverse periods."
          },
          {
            "label": "Request the entire repayment schedule and model essential cash under stress.",
            "reason": "Total cost, dates and emergency liquidity determine whether the obligation is manageable."
          },
          {
            "label": "Invest the emergency money to offset the installment.",
            "reason": "Expected yield cannot guarantee liquidity or safety for an imminent obligation."
          }
        ],
        "preferred": 1,
        "transfer": "State what change in forecast income would trigger renegotiation before default."
      }
    ]
  },
  "time": {
    "title": "Throughput and sustainable workload defense",
    "defense": "Audit the workflow of a volunteer program. Identify the probable constraint, design a limited pilot, and defend the decision without requiring unpaid staff to absorb unlimited hours.",
    "criteria": [
      "Measure end-to-end completion.",
      "Track queue waiting time and workload.",
      "Plan for the bottleneck moving downstream."
    ],
    "cases": [
      {
        "title": "Locate the queue",
        "scene": "In one week twenty-two proposals clear screening, twelve are approved, and eleven are scheduled. One person handles approvals.",
        "choices": [
          {
            "label": "The queue is proof of laziness.",
            "reason": "Differences between stage counts do not establish individual motivation or intent."
          },
          {
            "label": "Scheduling is certainly the only bottleneck.",
            "reason": "Scheduled work depends on upstream approvals, so counts alone cannot isolate the cause."
          },
          {
            "label": "Approval is a plausible constraint; inspect per-stage waiting and incomplete inputs.",
            "reason": "The flow suggests a bottleneck but needs timestamps, rework information and capacity data."
          }
        ],
        "preferred": 2,
        "transfer": "Define two additional measures that would distinguish approval capacity from incomplete requests."
      },
      {
        "title": "Choose the smallest reversible experiment",
        "scene": "Approval requests are often incomplete. A manager proposes developing a large platform instead of standardizing required information.",
        "choices": [
          {
            "label": "Pilot a short input checklist and fixed review windows.",
            "reason": "A bounded trial addresses a plausible cause and can measure both waiting time and volunteer burden."
          },
          {
            "label": "Build the entire platform first.",
            "reason": "Automating an unknown workflow creates cost before confirming which problem needs solving."
          },
          {
            "label": "Require 24-hour volunteer responses.",
            "reason": "More unpaid availability shifts burdens without showing that the workflow improves."
          }
        ],
        "preferred": 0,
        "transfer": "What would you do if approvals doubled but completed workshops remained unchanged?"
      }
    ]
  },
  "languages": {
    "title": "Locale and comprehension acceptance defense",
    "defense": "Design a multilingual interface review that checks the product promise, intended social meaning, regional register and user comprehension rather than claiming a machine translation is verified.",
    "criteria": [
      "Check source behavior before translating.",
      "Seek qualified native/regional judgment.",
      "Use comprehension rather than appearance as the outcome."
    ],
    "cases": [
      {
        "title": "Correct the source before translation",
        "scene": "The interface says 'This form is optional' but software rejects submission unless every field is completed.",
        "choices": [
          {
            "label": "Select the smoothest translation and keep the form mandatory.",
            "reason": "An elegant translation cannot make a false promise truthful."
          },
          {
            "label": "Correct product behavior or source meaning, then review the actual promise.",
            "reason": "Verifying what users can do is a prerequisite to honest localization."
          },
          {
            "label": "Hide the message only from non-English readers.",
            "reason": "That creates unequal clarity while leaving the source misrepresentation."
          }
        ],
        "preferred": 1,
        "transfer": "Explain how to test the perceived right to skip, not merely the literal translation."
      },
      {
        "title": "Resolve different regional judgments",
        "scene": "One fluent reviewer calls a phrase polite; another says it sounds like an order in the target region.",
        "choices": [
          {
            "label": "Let the first reviewer certify all dialects.",
            "reason": "One opinion cannot establish suitability across regions and contexts."
          },
          {
            "label": "Replace the phrase with an unreviewed model translation.",
            "reason": "This removes an audit trail and does not resolve register or comprehension."
          },
          {
            "label": "Record the dispute, test intended users and avoid a blanket verified label.",
            "reason": "This respects locale variation and keeps unresolved quality claims explicit."
          }
        ],
        "preferred": 2,
        "transfer": "Define how the validation threshold would become stricter for emergency or clinical instructions."
      }
    ]
  },
  "communication": {
    "title": "Evidence-based incident communication defense",
    "defense": "Write public and internal updates for an outage. Disclose verified impact and practical next steps while keeping unproven root-cause hypotheses and personal records out of public notices.",
    "criteria": [
      "Separate facts, hypotheses and unknowns.",
      "Provide safe verified next actions.",
      "Publish visible corrections when evidence changes."
    ],
    "cases": [
      {
        "title": "Do not blame without evidence",
        "scene": "Registration failed between 10:05 and 10:24. Staff suspect the infrastructure host, but root-cause investigation is incomplete.",
        "choices": [
          {
            "label": "Announce that the host was at fault.",
            "reason": "The suspected cause is not verified and could be wrong."
          },
          {
            "label": "Say only 'we observed errors and are investigating the cause'.",
            "reason": "This truthfully describes observed impact and uncertainty while allowing a useful follow-up."
          },
          {
            "label": "Stay silent until every technical question is answered.",
            "reason": "Users need prompt, accurate impact guidance even when diagnosis is incomplete."
          }
        ],
        "preferred": 1,
        "transfer": "Draft a brief public update with a reliable support route and a next-update commitment."
      },
      {
        "title": "Correct a public claim",
        "scene": "Logs show a project configuration caused the outage; an earlier public message had blamed the provider.",
        "choices": [
          {
            "label": "Delete the earlier message without a correction.",
            "reason": "Silent erasure leaves affected users without a reliable record of what changed."
          },
          {
            "label": "Keep the old blame to avoid embarrassment.",
            "reason": "Continuing a disproven explanation is deceptive and harms future learning."
          },
          {
            "label": "Publish a dated correction and explain verified remediation.",
            "reason": "An accountable update distinguishes earlier uncertainty from new evidence without leaking confidential logs."
          }
        ],
        "preferred": 2,
        "transfer": "How would a new finding of possible duplicate payments change the immediate guidance?"
      }
    ]
  }
};
