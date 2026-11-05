/** Xyra Atlas advanced reasoning lessons, part 2.
 * Supplementary original text; specialist editorial review is pending.
 */
export const ADVANCED_CASES_TWO={
  "thinking": {
    "id": "base-rate-and-selection-bias",
    "title": "Advanced critical thinking — selection bias and Simpson's paradox",
    "minutes": 42,
    "sections": [
      {
        "title": "A rate is a fraction, not a property of a headline",
        "part": "When somebody says a service succeeds 90 percent of the time, identify the numerator, denominator, time window and inclusion rule. Ten successes among eleven enthusiastic respondents cannot be generalized to a thousand users who did not respond. A base rate describes how common a result is before considering a new piece of evidence. Selection bias enters when the observed group differs systematically from the population we care about. Data quality and the sampling process are part of a claim, not minor footnotes."
      },
      {
        "title": "Why a combined average can reverse subgroup comparisons",
        "part": "Consider two fictional study methods and two difficulty groups. In the easier group, method A succeeds for 18 of 20 learners (90 percent), while B succeeds for 72 of 90 (80 percent). In the harder group, A succeeds for 15 of 30 (50 percent), while B succeeds for 2 of 10 (20 percent). A performs better within each group, yet overall A is 33 of 50 (66 percent) and B is 74 of 100 (74 percent). The reversal occurs because the methods were used by different mixes of easy and difficult cases."
      },
      {
        "title": "Distinguish arithmetic from a causal explanation",
        "part": "This is an illustration of Simpson's paradox: grouped comparisons and combined comparisons can point in opposite directions. It does not prove A causes improvement, because learners may have selected their method for reasons related to success. Differences in instructor, prior ability, measurement, time and group size can still matter. A careful analyst reports both aggregate and subgroup rates, checks how the groups were defined, and avoids choosing whichever number supports a preferred story."
      },
      {
        "title": "Build a reproducible source and evidence audit",
        "part": "Before sharing a claim, retain the primary source, publication date, operational definition, raw counts and major exclusions if available. Ask whether categories were defined before results were inspected, whether dropouts were omitted and whether competing explanations were examined. Consider how the conclusion would change if missing cases had poor outcomes. Distinguish an observed pattern from a confident generalization or a demonstrated causal effect. An impressive graphic with no denominators is not enough."
      }
    ],
    "case": "An online training provider advertises that method B has a 74-percent success rate while A has only 66 percent. A student concludes B is better for everyone. But the underlying data reveal that B served mostly easier cases and A mostly harder ones. Within each difficulty category, A's observed success proportion is higher. The student recalculates the table, checks selection and possible confounders, and refuses to declare a causal winner. The right question becomes whether an appropriately designed comparison would show similar differences among truly comparable learners.",
    "task": "Recreate the two-by-two subgroup table: easier A=18/20, easier B=72/90, harder A=15/30 and harder B=2/10. Calculate each subgroup rate and the two overall rates. Explain in words why the ranking reverses when cases are combined. Name two possible selection effects and propose a study that would provide stronger causal evidence. Draft a cautious conclusion suitable for a public report.",
    "answer": "In easier cases A has 90 percent versus B's 80 percent; in harder cases A has 50 percent versus B's 20 percent. Overall A is (18+15)/(20+30)=33/50=66 percent, while B is (72+2)/(90+10)=74/100=74 percent. The mixture of difficulty levels differs across methods, which reverses the aggregate comparison. This pattern says nothing definitive about treatment effectiveness without a credible assignment or adjustment design. A strong answer reports subgroup and total denominators and resists the false claim that the larger combined rate proves B is causally superior.",
    "rubric": [
      "Recalculate every numerator and denominator correctly.",
      "Explain the subgroup/aggregate reversal without magical thinking.",
      "Identify selection and confounding as separate interpretation risks.",
      "Propose evidence that could support a causal rather than merely descriptive claim."
    ],
    "flow": [
      [
        "Recover the counts",
        "Get numerator, denominator and subgroup definitions."
      ],
      [
        "Compute at both levels",
        "Calculate separate subgroup and total rates."
      ],
      [
        "Inspect the selection",
        "Ask why the population mixes differ."
      ],
      [
        "Conclude carefully",
        "State the observation and what design would test causality."
      ]
    ]
  },
  "digital": {
    "id": "passkey-and-recovery-map",
    "title": "Advanced digital security — passkeys, sessions and recovery threats",
    "minutes": 43,
    "sections": [
      {
        "title": "Protect the right asset, not merely the login form",
        "part": "An account's value comes from the permissions and data it controls. Losing primary email may let an attacker reset several other accounts; losing a banking session may expose transactions. A simple threat model lists the assets, the entry points, trusted devices, recovery channels and consequences of compromise. A security feature should be evaluated against a particular threat instead of advertised as 'unhackable.'"
      },
      {
        "title": "Understand what phishing-resistant authentication means",
        "part": "NIST SP 800-63B distinguishes manually entered one-time codes from authenticator protocols that resist phishing. Codes can be relayed to an impostor website, whereas properly implemented WebAuthn passkeys use cryptographic authentication bound to the legitimate verifier's domain. This does not mean any application calling a feature a passkey is secure in all circumstances. Device compromise, account sharing, implementation defects and insecure recovery methods remain important risks."
      },
      {
        "title": "Map the recovery path as part of the threat model",
        "part": "Strong primary sign-in can be undermined by weak account recovery. If anyone knowing a publicly visible phone number can convince support to replace an authenticator, the recovery route becomes the critical weak point. Document how a legitimate user can regain access after losing a device, how requests are verified, how sessions are revoked and how backups are protected. Avoid recommending that backup codes be stored unencrypted in an ordinary shared note or sent to someone claiming to be support."
      },
      {
        "title": "Separate authentication, authorization and sessions",
        "part": "Authentication establishes a user or device's claimed identity; authorization decides which resources the authenticated identity can access. A UI hiding an admin button is not a substitute for backend permission checks. Sessions require expiration, revocation and protection against token theft. Review how an expired session behaves, what happens after a password or authenticator reset, and how the user is alerted to suspicious access. Test legitimate failure and recovery workflows rather than attempting account compromise."
      }
    ],
    "case": "A secure-file app adds passkey sign-in and declares the entire platform phishing-proof. A reviewer traces the system: the passkey may resist phishing at the initial login, but recovery still accepts weak email-only verification and existing sessions are not revoked after a recovery event. An attacker controlling the linked inbox may retain account access despite the strong login mechanism. The team improves recovery verification, session revocation and access logs, then documents which risks remain outside its test scope. It does not claim that a green automated build is an independent security audit.",
    "task": "Draw an account-access map for a fictional file manager: registration, passkey login, backup recovery, active session, file authorization and emergency sign-out. Identify at least five assets or trust boundaries. For each, state one plausible failure, the intended defensive control, and a test that verifies the legitimate security behavior. Explain why a passkey alone cannot compensate for poor authorization or weak recovery.",
    "answer": "A sound map covers the authenticated domain, credential storage, recovery-channel access, session revocation and server-side authorization. WebAuthn provides phishing resistance under a properly implemented verifier binding, but access can still fail through recovery abuse or stolen valid sessions. A useful test checks that an expired session cannot fetch private files and that recovery triggers the intended session policy. A weak answer simply calls passkeys '100 percent secure' or trusts a hidden button as permission enforcement.",
    "rubric": [
      "Differentiate password, OTP, passkey and session responsibilities.",
      "Identify a specific recovery weakness and a corresponding legitimate defensive check.",
      "Require backend authorization independent of UI visibility.",
      "Describe a reproducible test and a remaining limitation without security guarantees."
    ],
    "flow": [
      [
        "Define protected assets",
        "List sensitive data, permissions and reset routes."
      ],
      [
        "Map authentication",
        "Identify authenticators and verifier trust boundaries."
      ],
      [
        "Review recovery and sessions",
        "Check revocation, verification and credential replacement."
      ],
      [
        "Validate authorization",
        "Test that protected resources remain protected after failure."
      ]
    ]
  },
  "career": {
    "id": "proof-driven-portfolio",
    "title": "Advanced portfolio engineering — prove outcomes and trade-offs",
    "minutes": 40,
    "sections": [
      {
        "title": "Turn a project claim into an acceptance test",
        "part": "'Production-ready full-stack system' is a promotional label, not an observable requirement. Translate it into behaviors: users can authenticate, unauthorized requests are rejected by the server, invalid forms explain corrections, and deployment failures can be reproduced. For each claim, specify test conditions, expected outcome, actual observed result and the date or environment. Avoid inventing percentages or referring to a handful of emulated devices as a comprehensive cross-device audit."
      },
      {
        "title": "Show architecture decisions with their alternatives",
        "part": "A useful technical case study identifies the data flow and trust boundaries. In a Laravel + Inertia + React application, server authorization must decide access to sensitive records, while React should render UI states consistent with the authorization response. Compare an alternative that stores all sensitive authorization logic in client code and explain why it is weaker. Explicitly state which parts came from frameworks, third-party libraries or collaborators. Design decisions are credible when constraints and rejected alternatives are visible."
      },
      {
        "title": "Demonstrate a failure recovery workflow",
        "part": "Real systems encounter expired sessions, inaccessible APIs, malformed input and offline states. A meaningful case study selects a plausible failure, reproduces it with precise steps, describes diagnostic evidence and records the fix or remaining limitation. Automated tests support specific claims but do not automatically constitute a penetration test or accessible real-world usability validation. Explain what was checked manually and what still requires independent review."
      },
      {
        "title": "Present evidence as a reviewer can follow it",
        "part": "A case study should contain a concise problem statement, role and responsibilities, a system diagram, a representative screen, tests, outcomes and limitations. Link only code or data you have permission to share. A reviewer should be able to reproduce a claim without guessing your environment setup. A candid unresolved issue, with a sensible mitigation, is more informative than a gallery of attractive screens with no functional evidence."
      }
    ],
    "case": "An applicant shows a secure document vault built using Laravel, React and an external storage provider. Their first draft says 'enterprise security and 100 percent responsiveness.' A stronger version names the authenticated user flow, confirms the backend rejects attempts to access another user's document, explains how download authorization is checked, and includes the test that caught an expired-session redirect bug. It distinguishes simulated viewport tests from physical-device acceptance and notes that independent security review has not occurred. The more modest description demonstrates a measurable engineering decision.",
    "task": "Write a complete portfolio case study for a fictional React and Laravel vault. Include the user's problem, your exact contribution, a text data-flow diagram, two architecture alternatives and why one was chosen. Specify four reproducible tests including unauthorized document access and expired sessions. Record a known limitation, distinguish observed from claimed performance, and produce a two-paragraph description suitable for a technical hiring review.",
    "answer": "A strong answer defines a protected-resource acceptance criterion, shows the server verifying the user's right to a specific record, and treats React visibility as presentation rather than authority. Its diagram connects client, server, authentication and storage with explicit trust boundaries. Each listed test has setup, action and expected result. The description states actual personal work and unresolved limitations rather than claiming certification, zero vulnerabilities or unsupported gains. A screenshot alone would not establish the security behavior.",
    "rubric": [
      "Show a real data-flow diagram and explain at least one trust boundary.",
      "Compare implementation alternatives using explicit constraints.",
      "Provide reproducible, outcome-focused tests rather than feature labels.",
      "Separate verified results, user-facing presentation and untested claims."
    ],
    "flow": [
      [
        "Define the failure or need",
        "State users, constraints and measurable acceptance conditions."
      ],
      [
        "Explain the implementation",
        "Describe data paths, responsibilities and alternatives."
      ],
      [
        "Verify under failure",
        "Show evidence, test steps and the observed outcome."
      ],
      [
        "Publish with limits",
        "Disclose what was not tested and what comes next."
      ]
    ]
  },
  "science": {
    "id": "observational-vs-experimental",
    "title": "Advanced science — why astronomical evidence is observational",
    "minutes": 44,
    "sections": [
      {
        "title": "Understand experimental control and observational inference",
        "part": "In experiments, researchers manipulate defined variables under suitable controls or comparison conditions. Astronomers often cannot move planets, start new stars or change the Moon's orbit for an experiment. They make repeated observations, compare predictions from models and use natural variation, physical laws and independent measurements. Observational science is not weak by definition; it has different constraints and requires careful handling of alternative explanations and instrument limits."
      },
      {
        "title": "Distinguish phases from eclipses with geometry",
        "part": "Moon phases arise from the changing portion of the Moon's illuminated half visible from Earth as the Moon moves around us. An eclipse occurs when the Sun, Earth and Moon align sufficiently for a shadow event, with orbital inclination affecting when that alignment occurs. A crescent Moon is not Earth's shadow covering the Moon. A model can predict the sequence of phases from viewing geometry; diagrams must label illumination and line of sight correctly. Not every new or full Moon causes an eclipse."
      },
      {
        "title": "Use repeated observations to test an astronomical model",
        "part": "A student photographs the Moon at consistent intervals, records date, location, sky conditions and apparent phase, and compares the sequence with a predicted lunar cycle. Variations in viewing time and weather influence what can be seen. This is not a controlled experiment on orbital dynamics, but repeated observations can test whether a model predicts the progression. Independent sources, including planetary ephemerides and reliable astronomy references, help check the predictions."
      },
      {
        "title": "Add measurement uncertainty before claiming precision",
        "part": "Image scale, camera exposure, atmospheric conditions, clock accuracy and viewing geometry can distort apparent shape or position. Measuring an object in a photograph requires calibration and error estimates. If a student measures a waxing gibbous fraction using an uncalibrated phone photo, the result may not justify a precise percentage to two decimal places. Report qualitative phase reliably where appropriate, document limitations and state what equipment or calibration would be needed for a quantitative result."
      }
    ],
    "case": "A classmate says the crescent Moon is caused by Earth's shadow. A science student draws the Sun–Earth–Moon geometry and explains that the Moon is always partly illuminated, while observers see different amounts of the illuminated hemisphere over its orbit. They collect a dated sequence of phases over several weeks and compare it with predictions. They also explain why eclipses occur only near particular alignments instead of at every new or full Moon. The observations support the geometric model without pretending the student experimentally controlled celestial motion.",
    "task": "Create a labeled diagram with the Sun, Earth and four lunar positions, showing illumination direction and the visible phase. Explain why ordinary phases are not Earth's shadow. Design a four-week observational log with observation time, date, weather, predicted phase and actual appearance. Identify three measurement or selection limitations and propose how you would compare the log with a reliable astronomy ephemeris. Conclude which claims the observations support and which require better instruments or longer records.",
    "answer": "A correct model draws sunlight arriving from one direction, with the half of the Moon facing the Sun illuminated; the visible fraction changes as its position relative to Earth changes. A lunar eclipse requires Earth between Sun and Moon near appropriate alignment; a solar eclipse requires the Moon between Earth and Sun near appropriate alignment. The Moon's inclined orbit explains why eclipses are not monthly. A good log records missing/cloudy observations rather than silently dropping them, and avoids deriving spurious high-precision orbital parameters from uncalibrated photos.",
    "rubric": [
      "Explain phase geometry without invoking Earth's shadow for ordinary phases.",
      "Distinguish the alignment requirements of lunar and solar eclipses.",
      "Design a repeatable observation log with predictions and missing data.",
      "Identify instrument and measurement uncertainty without claiming unsupported precision."
    ],
    "flow": [
      [
        "Define the model",
        "Draw illumination, orbit position and observer geometry."
      ],
      [
        "Derive a prediction",
        "State what phase should be visible on specified dates."
      ],
      [
        "Gather observations",
        "Log conditions, actual appearances and missing records."
      ],
      [
        "Evaluate uncertainty",
        "Compare with predictions and report limitations."
      ]
    ]
  },
  "relationships": {
    "id": "repair-after-conflict",
    "title": "Advanced relationships — accountability, repair and coercive exceptions",
    "minutes": 42,
    "sections": [
      {
        "title": "Separate impact, intention and responsibility",
        "part": "A person can cause harm without intending to, and another can infer hostile motives without enough information. Productive repair identifies the concrete action, its impact, what was understood at the time and which obligations were violated. 'You never care about me' is broad; 'You shared a private message after agreeing not to' gives a specific event to address. The affected person does not have to prove intent before asking that a privacy boundary be respected."
      },
      {
        "title": "An apology is a start, not proof of change",
        "part": "A useful apology acknowledges the act, its effect and a feasible plan to prevent repetition. It avoids demanding immediate forgiveness. Repair then requires observing changed behavior over time and agreeing on a reasonable check-in. For a one-time communication error, correcting a process may help. Repeated violations or retaliation change the analysis: a promise of affection does not compensate for continued coercion."
      },
      {
        "title": "Distinguish ordinary conflict from controlling patterns",
        "part": "Ordinary conflict can involve two people with different priorities who retain freedom to refuse and seek outside support. Coercive control involves patterns that limit that freedom through threats, isolation, financial dependence or surveillance. The goal is not to diagnose a partner but to examine behavior and safety. A person facing serious threats may need trusted local services or a tailored exit plan rather than couples-style negotiation that assumes equal power."
      },
      {
        "title": "Evaluate repair through observable criteria",
        "part": "After an agreement, ask whether the harmful conduct stopped, the agreed remedy occurred, the person can disagree safely, and independent choices remain intact. Be alert to cycles where a brief reward follows compliance but the original threat returns. Avoid tests that deliberately provoke confrontation. It can be appropriate to end a relationship or set a boundary even where another person's motives remain uncertain, especially when safety is implicated."
      }
    ],
    "case": "Two friends share a project and one publishes a screenshot containing a private message without checking permission. A repair process includes removing the screenshot, acknowledging the mistake, checking whether wider distribution occurred and adopting a review rule before future publication. In a different case, one friend repeatedly threatens to leak private material whenever the other refuses a request. That repeated leverage is not resolved by an apology checklist alone. The affected person can protect accounts and seek trusted support without proving the offender's psychological motive.",
    "task": "Compare a one-off privacy mistake with a repeated threat to publish personal messages. For each, write a factual timeline, identify consent and agency, and propose an appropriate action. For the ordinary case, draft a repair agreement with two observable changes and a review date. For the coercive case, outline a safety-oriented support route without recommending dangerous confrontation or secret surveillance.",
    "answer": "A strong ordinary repair removes or limits the unauthorized material, acknowledges the concrete harm and defines a verifiable future sharing rule; forgiveness cannot be demanded. In the threat scenario, the priority is preventing further coercion and safeguarding private information and support contacts, not negotiating away the person's right to refuse. Both analyses distinguish behavior from inferred intention. Treating repeated threats as merely a communication style or labeling a person clinically would be inadequate.",
    "rubric": [
      "State the act, impact and accountability without guessing motive.",
      "Design a repair agreement with observable changed behavior.",
      "Recognize when threats and unequal power make ordinary negotiation unsafe.",
      "Offer protective, context-sensitive support rather than counter-manipulation."
    ],
    "flow": [
      [
        "Document the act",
        "Identify what happened, the consent context and impact."
      ],
      [
        "Choose the right response",
        "Separate correctable mistakes from coercive patterns."
      ],
      [
        "Set accountable steps",
        "Define repair actions or safety boundaries."
      ],
      [
        "Verify durable change",
        "Review actual conduct without demanding forgiveness."
      ]
    ]
  },
  "negotiation": {
    "id": "batna-without-bluffing",
    "title": "Advanced negotiation — genuine alternatives and reservation decisions",
    "minutes": 42,
    "sections": [
      {
        "title": "A BATNA is not your desired agreement",
        "part": "The best alternative to a negotiated agreement is what you can actually do if no deal is reached. It could be accepting another job offer, reducing project scope or postponing the purchase. A wish for a better offer that does not exist is not a BATNA. Distinguish the negotiated objective, the best external alternative, your reservation decision and the other party's potential alternatives. This improves decisions without requiring deception."
      },
      {
        "title": "Calculate options with comparable scope and costs",
        "part": "Suppose a freelancer can accept a ₱24,000 project needing 60 hours with ₱4,000 of unavoidable direct expense, or a confirmed alternate project worth ₱18,000 needing 35 hours with ₱2,000 expense. Simplified contribution before taxes and overhead is ₱20,000 for the first and ₱16,000 for the alternate, but time requirements differ. Per working hour those figures are approximately ₱333 and ₱457. The alternate might be economically better if time is constrained; client reliability, schedule and career value also matter."
      },
      {
        "title": "Separate objective benchmarks from leverage",
        "part": "Comparable market quotes, actual fulfillment costs and contract terms can help justify a proposal. Inventing a competitor, lying about an offer or creating fake urgency undermines informed agreement. A firm refusal can be ethically consistent with transparent negotiation. Write down scope, payment milestones, revision limits, delivery dependencies and cancellation responsibilities so the accepted offer can be evaluated rather than remembered as a vague promise."
      },
      {
        "title": "Account for risk and interdependence",
        "part": "An alternative is not guaranteed if its availability depends on an unconfirmed email or future funding. Consider probability of payment, cancellation terms, resource conflicts and the cost of delayed work. Do not treat a single hourly number as a complete measure of opportunity; work can provide portfolio evidence or impose support burdens. If new information changes the alternatives, revise the reservation decision openly rather than escalating pressure to save face."
      }
    ],
    "case": "A developer receives a ₱24,000 app proposal requiring around 60 hours and ₱4,000 direct expense, while an existing confirmed customer offers ₱18,000 for 35 hours and ₱2,000 expense. The first project has more nominal contribution, but the second has higher simplified contribution per hour. The developer checks payment reliability, contract scope and whether the hours overlap before countering. They propose a reduced feature package to the first client and retain the option to decline. They do not fabricate a competing bid or threaten arbitrary deadlines.",
    "task": "Compare two fictional project alternatives: A pays ₱24,000, requires 60 hours and ₱4,000 direct expense; B pays ₱18,000, requires 35 hours and ₱2,000 expense. Calculate each simplified contribution and contribution per hour. Add a realistic risk to each, state which alternative is genuinely available, and draft a counterproposal with exclusions and payment milestones. Explain when refusing both projects could be a rational choice.",
    "answer": "Project A contributes ₱20,000 before overhead and tax, or about ₱333 per hour. B contributes ₱16,000, or about ₱457 per hour. Higher total earnings and higher hourly contribution favor different options. The correct decision depends on time, reliability, other available work and obligations; hourly contribution alone does not settle it. A genuine BATNA requires an available alternative, not a fictional rival offer. A strong proposal includes scope, dates, revisions, payment conditions and the right to decline without coercion.",
    "rubric": [
      "Calculate contribution and per-hour comparison correctly.",
      "Distinguish a real available alternative from a wish or bluff.",
      "Identify relevant nonprice risks and resource constraints.",
      "Produce transparent, reviewable proposal terms and a credible walk-away rule."
    ],
    "flow": [
      [
        "Enumerate real choices",
        "Separate desired terms from confirmed fallback options."
      ],
      [
        "Normalize the economics",
        "Compare costs, time, quality and contract scope."
      ],
      [
        "Test the risks",
        "Consider probability of payment and schedule constraints."
      ],
      [
        "Negotiate transparently",
        "Offer documented alternatives or respectfully decline."
      ]
    ]
  },
  "shadow": {
    "id": "coercive-pressure-check",
    "title": "Advanced Shadow Library — recognize and interrupt coercive demands",
    "minutes": 42,
    "sections": [
      {
        "title": "Analyze a demand through consent and consequences",
        "part": "An ordinary request permits a meaningful no. Coercion involves threats or penalties that constrain refusal, often magnified by unequal power. Look for the specific action demanded, the threatened consequence, the benefits to the demanding party, and how the person can respond safely. Labels such as 'toxic' are less useful than observable evidence. A single urgent request is not automatically abusive; the context of pressure and retaliation matters."
      },
      {
        "title": "Recognize common leverage without learning to weaponize it",
        "part": "Someone may tie compliance to love, employment, social acceptance or future access to essential support. Fabricated deadlines, concealed terms and alternating rewards with punishments can make decisions feel compulsory. Understanding these mechanisms is for protection, not for designing more effective threats. Document what the person actually asked, whether options were hidden, and what occurred after refusal. Avoid provocative tests when the person may retaliate."
      },
      {
        "title": "Separate uncertainty about motives from protection",
        "part": "You may not be able to prove whether a person privately intends to exploit you. You can still decline to share passwords, money or intimate information when the request violates your limits. Safe documentation, independent verification and trusted support may be appropriate depending on the risk. Where devices are monitored or threats are serious, secretly collecting records or openly confronting the person can increase danger. Advice must be tailored to safety."
      },
      {
        "title": "Choose a proportional exit or escalation path",
        "part": "For a low-risk misleading sales offer, stepping away to compare official terms may be sufficient. For employment or relationship coercion, external support and a plan to protect information, finances and personal safety may be necessary. Do not engage in counter-threats or public retaliation. If imminent harm is present, seek emergency assistance or trusted local crisis resources. A general lesson cannot predict which intervention is safe for a particular person."
      }
    ],
    "case": "A student receives an offer to cover tuition if they provide full access to their phone and stop talking to friends about the arrangement. Initially the proposal seems generous, but refusal triggers a threat to publish private messages. The concrete request seeks private access and isolation; the threatened disclosure undermines free consent. The student need not diagnose the person or prove a secret plan before protecting accounts and seeking safe support. Direct confrontation or recording may be risky, so the response should consider available allies and device privacy.",
    "task": "Analyze three fictional cases: a limited-time discount with published terms, a misleading countdown that resets, and an offer of financial help conditioned on surrendering private credentials. For each list the demanded action, evidence of legitimacy, ability to refuse, consequences of refusal and safest verification or response. Explain where an ordinary persuasive request becomes coercive. Do not design pressure tactics or secret tests.",
    "answer": "An ordinary offer with verifiable terms and genuine refusal can be evaluated on its merits; urgency alone is not proof of coercion. A resetting countdown may indicate misleading scarcity and should be checked independently. Demanding account credentials or isolation under threat creates a serious agency and safety problem, regardless of whether a motive can be diagnosed. A sound response protects access, evaluates the risks of documentation, and seeks trusted help where appropriate; it does not attempt to win by manipulating the threatening person.",
    "rubric": [
      "Identify the actual demand, leverage and stated consequence.",
      "Differentiate ordinary persuasion, deception and coercive control.",
      "Explain why unknown motive does not prevent setting a protective boundary.",
      "Propose a response that considers retaliation, privacy and access to support."
    ],
    "flow": [
      [
        "Identify the demand",
        "Record what is asked and what happens if refused."
      ],
      [
        "Assess freedom and leverage",
        "Compare consent, dependency and hidden constraints."
      ],
      [
        "Verify safely",
        "Use independent information and avoid provocative tactics."
      ],
      [
        "Protect agency",
        "Decline or escalate via suitable trusted support."
      ]
    ]
  }
};
