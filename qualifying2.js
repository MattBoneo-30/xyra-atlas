/** Qualification decisions 2/2. Fictional, original, independently unreviewed. */
export const QUALIFYING_TWO={
  "thinking": {
    "title": "Causal claims and algorithmic fairness defense",
    "defense": "Audit a fictional scholarship-screening model using a confusion matrix, missingness analysis and a reversible human-review policy with an appeal route.",
    "criteria": [
      "Use the correct denominators for prediction metrics.",
      "Question historical labels and sample shift.",
      "Protect applicants from unjust automatic rejection."
    ],
    "cases": [
      {
        "title": "Compute rather than quote accuracy",
        "scene": "Out of 200 applicants, 80 are eligible. The classifier flags 64 eligible people and 30 ineligible people. How many eligible applicants are missed?",
        "choices": [
          {
            "label": "Sixteen eligible people are missed.",
            "reason": "Subtract 64 flagged eligible cases from 80 actual eligible cases. Those false negatives matter when opportunities are scarce."
          },
          {
            "label": "Thirty eligible people are missed.",
            "reason": "Thirty is the number of flagged ineligible applicants, not missed eligible ones."
          },
          {
            "label": "One hundred six eligible people are missed.",
            "reason": "That quantity cannot be inferred and exceeds the known number of eligible applicants."
          }
        ],
        "preferred": 0,
        "transfer": "Compute precision among flagged applications and discuss whether predictive accuracy alone justifies rejection."
      },
      {
        "title": "Respond to distribution shift",
        "scene": "New scholarship applicants have less reliable internet than last year's training population, and empty optional fields influence the score.",
        "choices": [
          {
            "label": "Apply the old score with automatic rejection.",
            "reason": "A shifted population and missingness may increase false negatives and unfairly exclude applicants."
          },
          {
            "label": "Use a human-review queue, audit missingness and preserve accessible appeals.",
            "reason": "A provisional, reversible process protects people while evaluating the score in the relevant population."
          },
          {
            "label": "Remove applicants with incomplete fields from evaluation.",
            "reason": "Discarding the most affected group can conceal the exact accessibility and fairness problem."
          }
        ],
        "preferred": 1,
        "transfer": "Specify how the impact assessment would change if the ground-truth eligibility decisions also proved inconsistent."
      }
    ]
  },
  "digital": {
    "title": "Offline data recovery and privacy defense",
    "defense": "Develop a failure-mode and restoration test plan for a private offline knowledge app. Protect existing learner data from bad imports and decline silent sync without consent.",
    "criteria": [
      "Reject corrupt input before committing changes.",
      "Test a complete export-import round trip.",
      "Distinguish local backup from server synchronization."
    ],
    "cases": [
      {
        "title": "Protect an existing device profile",
        "scene": "A user's backup is well-formed JSON but contains invalid note values. The import routine currently overwrites local data before checking every field.",
        "choices": [
          {
            "label": "Commit first and report errors afterward.",
            "reason": "Partial overwrite can destroy a valid profile and make recovery more difficult."
          },
          {
            "label": "Silently drop invalid notes and mark import complete.",
            "reason": "That can conceal data loss and falsely reassure a user about the recovered content."
          },
          {
            "label": "Validate the candidate fully, then commit atomically or reject without changes.",
            "reason": "This preserves the old profile on failure and makes errors visible before destructive writes."
          }
        ],
        "preferred": 2,
        "transfer": "Name two additional rejection tests beyond malformed JSON, including wrong password or oversized content."
      },
      {
        "title": "Decide whether to add cloud sync",
        "scene": "A developer proposes uploading local field notes to a third-party service to prevent browser eviction, despite an existing no-account and offline-only privacy statement.",
        "choices": [
          {
            "label": "Retain manual private backup until optional sync receives explicit consent and threat review.",
            "reason": "The product promise must not silently change, and syncing creates additional sensitive-data risks."
          },
          {
            "label": "Enable sync secretly because backups are inconvenient.",
            "reason": "This violates reasonable user expectations and may expose confidential content without consent."
          },
          {
            "label": "Disable export and assume browser storage never gets evicted.",
            "reason": "Local browser data can be cleared or evicted, so removing recovery worsens resilience."
          }
        ],
        "preferred": 0,
        "transfer": "Design a truthful disclosure of the limitations of offline persistence and a minimally invasive opt-in recovery option."
      }
    ]
  },
  "career": {
    "title": "Verifiable career portfolio defense",
    "defense": "Turn project screenshots and unmeasured résumé claims into a reproducible dossier with accurately attributed work, tested behavior, limitations and a safe public demonstration.",
    "criteria": [
      "Use evidence rather than invented metrics.",
      "State your actual individual contribution.",
      "Do not publish keys, client data or unverified credentials."
    ],
    "cases": [
      {
        "title": "Rewrite an unsupported impact claim",
        "scene": "A résumé says a personal app 'tripled productivity', but no baseline, defined metric or controlled comparison exists.",
        "choices": [
          {
            "label": "Keep the figure because recruiters prefer numbers.",
            "reason": "An appealing claim is not evidence; inventing an impact metric harms credibility."
          },
          {
            "label": "Describe the implemented function and verified test without pretending to measure user productivity.",
            "reason": "A reproducible feature and testing record are defensible even before a controlled outcome study."
          },
          {
            "label": "Replace it with 'universally the fastest app'.",
            "reason": "A universal superlative requires stronger comparative evidence that the candidate has not collected."
          }
        ],
        "preferred": 1,
        "transfer": "Draft one precise bullet describing a real feature, your own role and a testable verification method."
      },
      {
        "title": "Present an unfinished prototype honestly",
        "scene": "A storefront demo looks complete but has no real customers, a production deployment or accessibility testing with assistive technologies.",
        "choices": [
          {
            "label": "Describe it as a profitable production service.",
            "reason": "The available evidence does not support usage, revenue or release maturity."
          },
          {
            "label": "Hide the work entirely until it becomes commercially successful.",
            "reason": "An honest prototype can still demonstrate decisions, implementation and learning."
          },
          {
            "label": "Label it a prototype, demonstrate implemented flows and document untested risks.",
            "reason": "Explicit scope and reproducibility let reviewers assess technical work without confusing a demo for a deployed business."
          }
        ],
        "preferred": 2,
        "transfer": "Outline the evidence needed before saying the project is reliable on real mobile devices and assistive technologies."
      }
    ]
  },
  "science": {
    "title": "Urban-heat measurement and causal inference defense",
    "defense": "Plan a reproducible comparison of shaded and exposed locations that controls sensor differences and time-of-day variation before making claims about trees.",
    "criteria": [
      "Specify what temperature is measured and its unit.",
      "Control or document time and instrument confounders.",
      "Do not turn correlation into an intervention guarantee."
    ],
    "cases": [
      {
        "title": "Identify a non-comparable measurement",
        "scene": "A shaded street was measured at 31°C at 08:30, while an exposed street showed 35°C at 13:00 with another unknown sensor.",
        "choices": [
          {
            "label": "The four-degree difference is entirely caused by tree cover.",
            "reason": "Different times, instruments and surfaces prevent isolating the effect of shade."
          },
          {
            "label": "The readings are not a matched comparison; standardize time, exposure and sensors.",
            "reason": "The next design should record consistent measurement conditions and uncertainty before inferring a shade association."
          },
          {
            "label": "Both numbers are useless and must be discarded.",
            "reason": "The observations are exploratory clues, though not sufficient causal proof."
          }
        ],
        "preferred": 1,
        "transfer": "Describe a repeated paired-site protocol that makes the comparison more interpretable."
      },
      {
        "title": "Interpret a successful field pilot",
        "scene": "Paired readings repeatedly show cooler air under trees, but shaded sites also have less traffic and different pavement.",
        "choices": [
          {
            "label": "Publish a guaranteed causal cooling effect for all neighborhoods.",
            "reason": "Traffic and material differences may contribute; field association alone does not fix the causal effect."
          },
          {
            "label": "Avoid communicating any observations whatsoever.",
            "reason": "Careful reporting can distinguish measured association from an unverified causal mechanism."
          },
          {
            "label": "Report the measured pattern and confounders, then propose stronger comparison sites.",
            "reason": "This informs local planning without exaggeration and identifies data needed for causal conclusions."
          }
        ],
        "preferred": 2,
        "transfer": "What would a longer before-and-after planting study need to address changing weather and urban development?"
      }
    ]
  },
  "relationships": {
    "title": "Shared care, agency and repair defense",
    "defense": "Create a cooperative care plan that respects the supported person's preferences, recognizes uneven resources and responds to missed handoffs without measuring affection by spending.",
    "criteria": [
      "Center the supported person's consent and privacy.",
      "Differentiate contribution from moral judgment.",
      "Escalate safety-critical matters to qualified support."
    ],
    "cases": [
      {
        "title": "Define what fairness means in context",
        "scene": "One sibling provides appointment time, another money. Both accuse the other of not caring; neither has asked the supported family member what help they want.",
        "choices": [
          {
            "label": "Assign blame to the person contributing fewer hours.",
            "reason": "Hours do not capture differing resources, travel constraints or the care recipient's preferences."
          },
          {
            "label": "Inventory actual needs and constraints with the supported person's participation.",
            "reason": "Cooperative responsibilities should begin with consent, essential needs and practical capacity rather than accusation."
          },
          {
            "label": "Divide every responsibility identically regardless of shift work.",
            "reason": "Identical tasks may be impossible or inequitable when schedules, abilities and distances differ."
          }
        ],
        "preferred": 1,
        "transfer": "Create a two-week task-and-backup schedule without exposing private medical details."
      },
      {
        "title": "Respond to repeated missed handoffs",
        "scene": "A necessary appointment is missed despite a clear assignment. One family member wants to punish the responsible sibling in public group messages.",
        "choices": [
          {
            "label": "Publicly shame them to force compliance.",
            "reason": "Humiliation can worsen conflict and does not create a dependable backup for essential care."
          },
          {
            "label": "Assume every missed task proves the person does not love the family.",
            "reason": "A missed obligation must be addressed, but motives and long-term character are not established by the event."
          },
          {
            "label": "Document the failure, secure the immediate need and create a verified backup process.",
            "reason": "This prioritizes the care recipient's safety, accountability and workable changes rather than emotional retaliation."
          }
        ],
        "preferred": 2,
        "transfer": "Explain when the plan should involve qualified clinical, social-service or community support."
      }
    ]
  },
  "negotiation": {
    "title": "Procurement and exit-rights defense",
    "defense": "Compare two scheduling-software offers using total economic and operational risk. Write a conditional agreement with export access, renewal clarity and a credible walk-away alternative.",
    "criteria": [
      "Separate headline price from unknown switching costs.",
      "Specify written acceptance and termination terms.",
      "Review legal and privacy provisions independently."
    ],
    "cases": [
      {
        "title": "Compare offers without inventing totals",
        "scene": "Vendor A costs ₱24,000 in year one but has unspecified migration fees and renewal. Vendor B costs ₱31,000 with stated migration support and one fixed renewal quote.",
        "choices": [
          {
            "label": "Vendor A is certainly cheaper over two years.",
            "reason": "Unknown renewal, migration and switching fees prevent a supported two-year total-cost conclusion."
          },
          {
            "label": "Vendor B is certainly more reliable because its price is higher.",
            "reason": "Higher price and clearer terms do not prove actual reliability or support quality."
          },
          {
            "label": "Vendor A has a lower first-year headline, but total value requires missing terms and service tests.",
            "reason": "The comparison must include migration, exportability, support, security, cancellation and uncertainty."
          }
        ],
        "preferred": 2,
        "transfer": "List the minimum terms that must be written before either choice can be authorized."
      },
      {
        "title": "Protect the ability to leave",
        "scene": "A vendor offers a one-day discount but cannot demonstrate a usable export of participant records at the end of the contract.",
        "choices": [
          {
            "label": "Make successful test-data export a condition of purchase or decline.",
            "reason": "Data portability is a critical requirement, and urgency marketing does not replace a workable exit plan."
          },
          {
            "label": "Sign now and negotiate export rights after dependency increases.",
            "reason": "Once locked in, the organization may have less leverage and face high migration costs."
          },
          {
            "label": "Copy real participant records into the vendor's demo to find out.",
            "reason": "A demo should use safe test data, with privacy and authorization reviewed before any real transfer."
          }
        ],
        "preferred": 0,
        "transfer": "Explain how a documented fallback or postponement can strengthen the reservation point without bluffing."
      }
    ]
  },
  "shadow": {
    "title": "Coercion recognition and protective agency defense",
    "defense": "Analyze a fictional group's loyalty pressure using observable patterns, autonomy, uncertainty and safe support. Avoid diagnosing motives or escalating with covert tests.",
    "criteria": [
      "Judge patterns and consequences, not a single phrase.",
      "Prioritize meaningful consent and safety.",
      "Reject retaliation or unauthorized monitoring."
    ],
    "cases": [
      {
        "title": "Recognize an autonomy warning",
        "scene": "Members report that declining an optional meeting sometimes leads to public criticism. Other members say they declined without consequences; reports are unverified.",
        "choices": [
          {
            "label": "One statement is conclusive proof of a leader's diagnosis.",
            "reason": "A single allegation cannot establish hidden motives, a psychiatric label or a complete pattern."
          },
          {
            "label": "Document specific incidents, alternative explanations and whether refusal leads to retaliation.",
            "reason": "This assesses meaningful choice while preserving uncertainty and the credibility of conflicting accounts."
          },
          {
            "label": "Dismiss every negative account because some participants were happy.",
            "reason": "Positive experiences do not negate the possibility of repeated harm for other people."
          }
        ],
        "preferred": 1,
        "transfer": "Describe how to record concerns safely without breaking into private communication channels."
      },
      {
        "title": "Offer support without a risky test",
        "scene": "A friend wants to create fake messages to entrap a group organizer and publish private chats to prove manipulation.",
        "choices": [
          {
            "label": "Help write deceptive messages to make a stronger case.",
            "reason": "Retaliatory deception may violate privacy, worsen risk and make evidence unreliable."
          },
          {
            "label": "Demand direct confrontation before offering support.",
            "reason": "Confrontation can increase danger when power or retaliation is a concern."
          },
          {
            "label": "Discourage entrapment, discuss safe boundaries and seek trusted independent support.",
            "reason": "Protective choices do not require proving someone's inner motives or exposing private conversations."
          }
        ],
        "preferred": 2,
        "transfer": "What additional support route should be prioritized if threats, isolation or immediate safety concerns emerge?"
      }
    ]
  }
};
