/** Optional three-stage competency bridges — subject worlds 8–14.
 * Original fictional cases. Expert review pending; no saved results.
 */
export const COMPETENCY_BRIDGES_TWO={
  "thinking": {
    "Beginner": {
      "objective": "Separate a claim from the evidence offered to support it.",
      "scenario": "A headline says a school's new study program 'doubled success'. It offers two percentages without saying how many students attended or what counted as success.",
      "reasoning": "A statement can be testable while its evidence is inadequate. Ask who was measured, over what time, how the outcome was defined, and what would count against the proposed explanation. A precise-looking figure is not automatically a reliable measure.",
      "challenge": "Rewrite the headline as a measurable question and list the numerator, denominator, time range and source document you would need.",
      "feedback": "A careful response says the claim is not yet interpretable without knowing whether the comparison concerns percentage points, relative change or different student groups.",
      "proof": "The learner identifies missing measurement details instead of instantly declaring the program either successful or fraudulent."
    },
    "Intermediate": {
      "objective": "Use counts and base rates to interpret a persuasive percentage.",
      "scenario": "A detector screens 1,000 devices. Ten are genuinely faulty; it flags nine of those and also flags fifty healthy devices. The product advertises ninety percent detection.",
      "reasoning": "Sensitivity concerns the share of real problems detected; predictive value concerns the share of alerts that are real. They have different denominators. Rare problems can generate many false alarms even when sensitivity is high.",
      "challenge": "Create a two-by-two table, calculate the percentage of flags that correspond to true faults, and state why an alert cannot be treated as proof.",
      "feedback": "Nine of fifty-nine flagged devices are truly faulty, approximately 15.3%. This is distinct from the nine-of-ten sensitivity. Each false alarm or missed fault may have different consequences.",
      "proof": "The answer uses the correct denominator and makes a cautious recommendation for human verification."
    },
    "Advanced": {
      "objective": "Assess an algorithmic decision under selection, confounding and fairness concerns.",
      "scenario": "A scholarship model ranks students using historic applications, but new applicants have poorer internet access and therefore leave optional fields blank more often. Historical 'eligibility' labels were also determined by inconsistent review.",
      "reasoning": "Predictive performance in one population may fail after the applicant population shifts. Missingness can reflect access rather than merit, and historic labels need scrutiny. Accuracy alone does not settle procedure, impact or fairness.",
      "challenge": "Draft a model evaluation with missingness analysis, subgroup error checks where lawful, human-review safeguards and an appeal route. Define a condition to suspend automated rejection.",
      "feedback": "A cautious design limits the score to a provisional review aid, examines representation and labeling, and preserves applicant explanations and appeals. No unsupported fairness certification is warranted.",
      "proof": "The proposal identifies the costs of both error types and the evidence that would justify limiting the model."
    }
  },
  "digital": {
    "Beginner": {
      "objective": "Identify assets and plausible ways that digital information could be lost or disclosed.",
      "scenario": "A learner keeps private notes in a local browser app and assumes 'offline' means the information is both permanent and secure. The device is occasionally shared with family members.",
      "reasoning": "Offline storage can reduce some network exposure but still faces device loss, browser eviction, shared-session access and corrupted exports. Start by identifying valuable data and which people or components can read or change it.",
      "challenge": "Build a three-column table for assets, likely failures and protective steps, covering notes, review history and export files.",
      "feedback": "A realistic plan protects the device, avoids sharing unlocked sessions, maintains private backup copies and acknowledges that browser storage may be cleared or evicted.",
      "proof": "The table includes confidentiality, integrity and availability threats rather than treating lack of a server as complete security."
    },
    "Intermediate": {
      "objective": "Explain why input validation must occur before a backup import changes saved notes.",
      "scenario": "A JSON export parses successfully but contains an invalid note type and an unsupported schema version. The importer deletes current entries and then starts restoring one item at a time.",
      "reasoning": "Syntactic JSON validity is not schema validity. A safe import validates types, versions, sizes and required relationships before applying changes; rejection should leave all existing supported data untouched.",
      "challenge": "Write acceptance and rejection tests for valid, truncated, wrong-type and incompatible backups, including the expected state after failure.",
      "feedback": "A rejected file leaves old notes and review schedules intact. A successful restore can be checked by semantic equality across the expected data categories. Unknown fields are handled according to documented rules.",
      "proof": "The test specification states atomic success-or-rejection behavior rather than merely asking whether parsing succeeded."
    },
    "Advanced": {
      "objective": "Defend a recovery release using failure modes, privacy constraints and reproducible evidence.",
      "scenario": "An offline-first app advertises a new encrypted backup feature. Desktop exports appear correct, but no team member has tested restoring after a phone storage eviction or using a wrong password.",
      "reasoning": "An export button alone does not prove recovery. Device behavior, import atomicity, password handling, service-worker changes and user guidance are separate risks. Test each with clear preconditions and expected states before claiming safety.",
      "challenge": "Create a release matrix for correct round-trip, failed password, malformed file, offline reopen and data-preservation after interrupted import; add a truthful user warning.",
      "feedback": "A responsible release note distinguishes tested scenarios from blocked physical-device checks, instructs learners to protect backup files, and avoids guaranteeing permanence or security without validation.",
      "proof": "The review names residual risks and refuses to equate a successful build with verified restore integrity."
    }
  },
  "career": {
    "Beginner": {
      "objective": "Replace an impressive résumé adjective with an observable project contribution.",
      "scenario": "A portfolio says 'built the world's fastest finance app'. There is no measured baseline, device information or comparison, though the owner implemented a working transaction filter.",
      "reasoning": "A claim about a feature can be verified from code and a repeatable test, while a performance superlative requires measurement in a defined environment. Honest project status and ownership support credibility more than unsupported impact numbers.",
      "challenge": "Rewrite the statement into a concise bullet naming the feature, your personal work and one reproducible test.",
      "feedback": "A defensible line might state 'Implemented filtering by date and category; verified results with a documented sample dataset'. It should not invent speed improvements, users or production traffic.",
      "proof": "Another reviewer can repeat the feature behavior without needing credentials or trusting marketing language."
    },
    "Intermediate": {
      "objective": "Present an engineering decision with a trade-off and the evidence behind it.",
      "scenario": "A developer chose local browser storage for an offline notes app. The portfolio praises privacy and accessibility but ignores how users recover notes when storage is cleared.",
      "reasoning": "A strong case study describes the problem, constraints, chosen approach, rejected alternatives, verification and limitations. A design can improve offline use while increasing backup responsibilities. Showing that tension demonstrates engineering judgment.",
      "challenge": "Write a decision record comparing local-first storage with a hosted database. Include one evidence-backed benefit, one cost and a test that would change your choice.",
      "feedback": "A grounded record explains offline availability and reduced routine network exposure alongside the risk of eviction or lost devices. It recommends export/restore tests before claiming recovery reliability.",
      "proof": "The case contains an alternative, a meaningful trade-off and an explicit untested assumption."
    },
    "Advanced": {
      "objective": "Build an interview-ready evidence dossier without fabricating impact or concealing risk.",
      "scenario": "An unfinished storefront prototype looks production-ready, but has no paying users, production deployment or assistive-technology testing. It was part of a team where individual contributions were not recorded clearly.",
      "reasoning": "A credible professional dossier shows precise role attribution, reproducible features, failure handling, tested constraints and important limitations. A prototype can still show capability; pretending it is a revenue-generating service cannot.",
      "challenge": "Write a one-page case study with project problem, your role, alternative decisions, measured checks, unresolved risks and next experiment. Add a sixty-second explanation for why it is not deployed.",
      "feedback": "The strongest response labels the project a prototype, demonstrates a user flow and identifies what remains before deployment. It avoids fabricated customers or generalized accessibility guarantees.",
      "proof": "The document is safe to share, reproducible and precise about individual versus team accomplishments."
    }
  },
  "science": {
    "Beginner": {
      "objective": "Distinguish a scientific observation from the explanation used to describe it.",
      "scenario": "You see the Moon partly illuminated and a classmate says Earth must be covering part of it with a shadow. The appearance is real; the proposed cause may be wrong.",
      "reasoning": "Observation is the illuminated fraction of the visible lunar disk. The usual phases arise from viewing different portions of the sunlit half as the Moon orbits Earth; Earth's shadow creates a lunar eclipse, a distinct event.",
      "challenge": "Describe the observation without causal language and sketch the Sun, Earth and Moon geometry for an ordinary quarter phase.",
      "feedback": "A sound diagram shows approximately half the visible lunar disk lit and distinguishes ordinary phase geometry from the special alignment needed for a lunar eclipse.",
      "proof": "The explanation makes a testable distinction and does not confuse a drawing with a measured sky position."
    },
    "Intermediate": {
      "objective": "Design a fair measurement comparison that documents confounding and sensor uncertainty.",
      "scenario": "A volunteer measures 31°C in the shade at 08:30 and 35°C on open pavement at 13:00 using different thermometers. The report calls this proof that trees always reduce air temperature by four degrees.",
      "reasoning": "Different times, sensors, surfaces, traffic and wind are potential confounders. Multiple decimal places do not remove systematic instrument bias. Matching conditions and repeated observations improve interpretability.",
      "challenge": "Propose a paired-site measurement protocol specifying air versus surface temperature, units, time, sensor calibration and repetition.",
      "feedback": "A defensible pilot compares sites at approximately the same time with documented sensors and environmental conditions. The initial four-degree difference alone is not a causal tree effect.",
      "proof": "The proposed protocol controls or records the major differences and includes a way to report uncertainty."
    },
    "Advanced": {
      "objective": "Construct falsifiable predictions from a physical model and compare competing explanations.",
      "scenario": "A popular video says Earth's changing distance from the Sun is the sole cause of seasons. It does not discuss why the northern and southern hemispheres experience opposite seasons.",
      "reasoning": "Axial tilt changes sunlight angle and daylight duration by hemisphere; a simple distance-only account does not explain opposing seasonal patterns. A model earns confidence by predicting multiple independent observations.",
      "challenge": "Prepare a teaching proof using Earth's tilt, hemispheric daylight and a cross-season comparison. State what observation would contradict the distance-only explanation.",
      "feedback": "When the northern hemisphere leans toward the Sun, midlatitude daylight and solar angle generally increase there while the southern hemisphere shows the opposite seasonal tendency. Distance alone is shared globally.",
      "proof": "The teaching proof gives a physical mechanism, a competing prediction and an honest boundary on local conditions."
    }
  },
  "relationships": {
    "Beginner": {
      "objective": "Identify an agreement, an action and a feeling without inventing another person's intention.",
      "scenario": "Two friends agreed not to identify each other in public posts about private arguments. One later shares an identifiable story and says it was intended only to seek support.",
      "reasoning": "The agreement and the publication are observable issues. Intent may matter to understanding, but an explanation does not automatically cancel impact or consent. People can need outside support without making another person identifiable to an audience.",
      "challenge": "Write an observation-impact-request message that permits private support while stating the existing privacy agreement.",
      "feedback": "A constructive message identifies the recognizable disclosure, names the privacy concern and requests its removal or anonymization without diagnosing motive. It need not demand an instant apology.",
      "proof": "The response respects both privacy and the legitimacy of seeking safe independent support."
    },
    "Intermediate": {
      "objective": "Distinguish a genuine repair proposal from pressure for immediate reconciliation.",
      "scenario": "After the privacy breach, the poster apologizes but insists the other person immediately forgive them and delete a private journal in return. The injured person still feels uncertain.",
      "reasoning": "Repair includes acknowledgment, changed action, realistic follow-up and respect for voluntary choice. Forgiveness and renewed trust are not automatic contractual duties. Boundaries describe actions you control, not punishments imposed on someone else.",
      "challenge": "Propose a repair plan and one personal boundary if identifiable posts recur, including how someone can seek support without spreading private records.",
      "feedback": "A workable repair might remove the post, agree on anonymized support and respect a slower process for renewed trust. Requiring someone to delete their journal is not a necessary price of forgiveness.",
      "proof": "The plan includes consent, observable behavior and a proportionate boundary rather than retaliation."
    },
    "Advanced": {
      "objective": "Evaluate trust over time without demanding a prescribed relationship outcome.",
      "scenario": "The same disclosure happens for a third time after clear discussions. One friend requests another conversation; the other wants distance. Outside circumstances make in-person confrontation potentially unsafe.",
      "reasoning": "A repeated pattern supplies information about reliability even without proving a hidden motive. The affected person can choose reduced disclosure, limited contact or outside support; meaningful safety and autonomy take priority over conversational perfection.",
      "challenge": "Write a decision memo comparing reconciliation with safeguards, temporary distance and seeking trusted support. State which new behavior would change the decision.",
      "feedback": "A thoughtful memo respects voluntary choice and does not diagnose the other person. It identifies the boundary, the repeated evidence and the safe response if threats or coercion appear.",
      "proof": "The recommendation protects safety and autonomy rather than treating forgiveness or separation as universally mandatory."
    }
  },
  "negotiation": {
    "Beginner": {
      "objective": "Distinguish an opening offer from the realistic alternative available to you.",
      "scenario": "A freelancer is offered ₱8,000 for a prototype estimated at fifty hours. Another available job pays ₱6,000 for twenty-five hours. The larger offer sounds better without considering time or risk.",
      "reasoning": "A negotiation alternative is what you can actually do if the current deal is declined. Gross hourly comparisons are a starting point, but payment risk, scope and total work matter. An imaginary future client is not a credible BATNA.",
      "challenge": "Compute the two initial gross hourly rates and list one missing term that could alter the choice.",
      "feedback": "The first offer is ₱160 per estimated hour, the second ₱240. Unlimited revisions or approval-only payment could make the apparently higher fee worse; these terms should be clarified.",
      "proof": "The comparison uses expected work, not only headline price, and names an actual alternative."
    },
    "Intermediate": {
      "objective": "Convert an ambiguous request into verifiable scope and change control.",
      "scenario": "A client requests a 'complete beautiful website with unlimited tweaks' but does not specify pages, responsive support, acceptance review or ownership of source files.",
      "reasoning": "Ambiguous deliverables create rework and disagreement. Clear terms define outputs, revision rounds, test conditions, payment milestones and how new requests are estimated. Both parties benefit when the definition of done is explicit.",
      "challenge": "Draft a compact statement of work that names three deliverables, two revision rounds, one acceptance criterion and a change-order rule.",
      "feedback": "A sound proposal separates agreed fixes from new functionality, gives the client a documented review window and prices additions separately instead of hiding them in unlimited unpaid work.",
      "proof": "The proposed terms have objective acceptance criteria and a mutually understandable route for changes."
    },
    "Advanced": {
      "objective": "Defend a fair acceptance, counteroffer or walk-away decision under contract uncertainty.",
      "scenario": "The freelancer's project grows from fifty to seventy-five hours without additional pay, while payment remains conditional on unspecified approval. The client demands exclusive intellectual-property rights without providing terms.",
      "reasoning": "The effective gross hourly rate deteriorates when unpaid scope expands. Ownership, confidentiality, payment timing and enforceability may matter more than the initial fee. Walking away can be rational if conditions fall below a real reservation point.",
      "challenge": "Write a counteroffer with capped scope, paid milestones, change handling, IP questions for counsel and a credible fallback if conditions remain unclear.",
      "feedback": "At ₱8,000 for seventy-five hours, gross hourly revenue is about ₱106.67 before overhead and tax. A documented refusal or conditional acceptance is more competent than signing under uncertainty.",
      "proof": "The negotiation decision specifies real costs, risks and conditions, not a bluff or coercive tactic."
    }
  },
  "shadow": {
    "Beginner": {
      "objective": "Recognize when important choices are hidden behind persuasive interface wording.",
      "scenario": "A subscription page says 'Start free' in a large button, while the later recurring charge appears only in small text on another screen. Cancellation instructions are difficult to locate.",
      "reasoning": "An informed choice requires understandable consequences and a practical ability to decline. A button click is not necessarily evidence that a person saw or understood the renewal. Evaluate interface behavior without assuming secret motives.",
      "challenge": "Record what the user sees before acceptance, where the price appears and whether decline and cancellation routes are clearly available.",
      "feedback": "A transparent alternative places trial length, recurring cost and cancellation terms where the choice is made, with a clear refusal path. Higher conversion alone does not measure informed consent.",
      "proof": "The analysis identifies concrete choice obstacles rather than diagnosing the designer."
    },
    "Intermediate": {
      "objective": "Distinguish a repeated coercive pattern from a single ambiguous remark.",
      "scenario": "A community group tells members attendance demonstrates loyalty. Some report public criticism for declining invitations; others say they have declined without consequences. No independent record is complete.",
      "reasoning": "A slogan can be ambiguous, but repeated retaliation for refusal can reduce autonomy. Evaluate dates, exact conduct, alternative explanations and consequences without covertly recording or publishing private communications.",
      "challenge": "Design a neutral evidence log and a safe boundary response for a member who feels pressured to disclose personal information.",
      "feedback": "The log separates reports from direct observations and does not announce a psychological diagnosis. A member can decline disclosure and seek trusted independent support without secretly testing someone.",
      "proof": "The response preserves uncertainty about intent while identifying whether a person can refuse safely."
    },
    "Advanced": {
      "objective": "Redesign a potentially deceptive choice system to protect consent and test understanding.",
      "scenario": "A checkout flow preselects optional analytics and makes refusal take several additional screens. A manager celebrates increased acceptance but has no evidence that users understand what data is collected.",
      "reasoning": "Conversion is an acquisition outcome, not proof of informed agreement. A fair redesign clarifies data uses, offers comparable accept and decline paths and supports future withdrawal. Evaluate comprehension, accessibility and current duties.",
      "challenge": "Write a before/after consent design with data-minimization explanation, an accessible decline option, a comprehension question and a correction threshold.",
      "feedback": "A meaningful test asks what users think will happen if they agree, not whether they tapped the preferred button. The redesign should remove unjustified friction and make the choice reversible where applicable.",
      "proof": "The proposed system increases genuine autonomy and excludes retaliation, surveillance and unsupported motive claims."
    }
  }
};
