/** Original applied studios, remaining seven Xyra Atlas subjects.
 * Hypothetical exercises and not professional or clinical guidance.
 */
export const PRACTICAL_STUDIOS_TWO={
 thinking:{
  title:'Base rates: investigate an alert before trusting a percentage',
  situation:'A fictional file-upload service runs an automated flagger over 10,000 uploads. Exactly 100 are known to violate the service’s rules, and the detector flags 95 of those. It also flags 990 of the 9,900 acceptable uploads. A manager announces that 95% of flagged uploads are violations.',
  rounds:[
   {title:'Rebuild the confusion matrix from original counts',
    focus:'Detection sensitivity and the probability that a positive flag is correct are different quantities. A rate with the wrong denominator can create a convincing but misleading headline. Use the full population and distinguish actual cases, false alarms and missed cases.',
    evidence:'There are 100 rule-violating uploads and 9,900 acceptable uploads. Of the 100 violating uploads, 95 were flagged. Of the acceptable uploads, 990 were flagged. The remaining 5 violating uploads and 8,910 acceptable uploads were not flagged.',
    assignment:'Create a 2×2 table of actual condition versus flag. Calculate flagged total, false positive count and the fraction of flagged cases that are actual violations. Draft a one-sentence correction of the manager’s claim and describe a policy consequence of false alarms.',
    model:'True positives are 95, false positives 990, false negatives 5 and true negatives 8,910. Total flags are 1,085. Only 95/1,085≈8.76% of flagged cases are verified violations in this fictional sample; the detector’s 95% sensitivity is not its positive predictive value.',
   },
   {title:'Design an ethical human-review decision',
    focus:'A classifier can prioritize review without providing final adjudication. A policy must account for the cost of wrongly blocking legitimate uploads, the severity of missed violations, and a transparent way to appeal errors. More automation does not necessarily imply a better decision.',
    evidence:'The sample contains substantially more false positive alerts than true positive alerts, so automatic account sanctions would affect many acceptable uploads unless additional review changes the evidence.',
    assignment:'Draw a decision tree after a flag: automatic warning, manual review, notice and appeal. Specify what evidence a reviewer needs, which records are sensitive, and a metric that would show whether an improved system harms fewer legitimate users.',
    model:'Use a flag as a review cue, not a conclusive allegation. Provide a protected manual review path, proportionate response and documented appeal. Track both accuracy and user impact without disclosing private uploads or claiming a decision threshold is universally correct.',
   }
  ],
  rubric:['Builds the confusion matrix using the complete population and each denominator.','Distinguishes sensitivity from precision and calculates about 8.76% correctly.','Designs proportionate review and appeal rather than automatic punishment.','Communicates uncertainty and privacy constraints without claiming universal performance.']
 },
 digital:{
  title:'Data minimization: design a safe application event trail',
  situation:'A fictional secure notebook app logs every keystroke, all note contents, long-lived session tokens and full IP addresses to an unrestricted analytics dashboard. Engineers want debugging information after an error, while users expect their confidential notes not to be disclosed to support staff.',
  rounds:[
   {title:'Build an information inventory and threat model',
    focus:'Collecting more logs does not automatically improve security or debugging. An event record should serve a justified operational purpose, have a narrow retention period and avoid exposing material needed to hijack accounts or read private content.',
    evidence:'The requirements only need to reveal which API failed, whether the request was authorized, its coarse timestamp, a non-secret request correlation identifier and the error category. The application does not need note text or credentials to answer those particular questions.',
    assignment:'Make a table of collected field, purpose, risk, access role and retention rule. Classify raw note contents, bearer tokens and passwords as inappropriate telemetry. Identify which events actually require investigation and how operators would avoid seeing private text.',
    model:'A safer event trail includes time, operation, outcome, minimal non-secret identifiers and an error category under role-based access. Never log tokens, passwords or decrypted notes. Define and test retention, abuse monitoring and redaction as part of the operational design.',
   },
   {title:'Verify privacy claims under failure conditions',
    focus:'Security guarantees must hold during error paths, not only successful requests. An exception handler may accidentally serialize request bodies or credentials, even if ordinary events are clean. Testing should demonstrate actual redaction before a product says it protects content.',
    evidence:'The fictional system has a failed file upload, a denied cross-user access request, and an unexpected server exception. These three cases can exercise both normal logging and emergency error reporting.',
    assignment:'Write four defensive tests covering normal success, denied access, invalid credentials and unexpected exceptions. For each, state the protected field that must not appear and the operational event that may be retained. Explain the limits of test coverage.',
    model:'Use synthetic secrets and assert no protected contents appear in any log or error payload, including exceptions and analytics events. Verify authorized personnel can still trace an incident via safe correlation IDs. Do not claim complete security based on a handful of synthetic cases.',
   }
  ],
  rubric:['Maps each stored field to purpose, access, retention and risk.','Excludes credentials and confidential note content from routine telemetry.','Checks failure paths and cross-user access without using real private documents.','Makes bounded test claims rather than promising a zero-risk implementation.']
 },
 career:{
  title:'Accessibility evidence: prove a portfolio works beyond screenshots',
  situation:'A developer showcases a portfolio with animated project cards and visually elegant buttons. A keyboard-only reviewer cannot reach the project filters, an alert is not announced to screen readers, and the developer lists “fully accessible” without testing anything beyond a desktop screenshot.',
  rounds:[
   {title:'Convert visual polish into testable access requirements',
    focus:'A feature is not usable merely because it looks balanced. Define keyboard operation, visible focus, semantic controls, readable information order and meaningful status announcements. Accessibility needs testing with actual interaction, not a decorative checklist.',
    evidence:'The review identifies two observable behaviors: the filter cannot be reached by keyboard and status text appears visually but is not announced. The full portfolio has not been audited against a comprehensive accessibility standard.',
    assignment:'Draft an access-requirement sheet for cards, filter controls, a modal preview and error alerts. State how a reviewer will test Tab order, Enter/Space operation, Escape and focus restoration. Note which assistive-technology tests you cannot yet claim.',
    model:'Native buttons and links should take focus in sensible order and respond to keyboard operation; modal focus should be contained and restored when appropriate. Status changes need a semantically suitable live announcement. Report the tested surfaces, devices and remaining gaps.',
   },
   {title:'Write a portfolio case study that withstands verification',
    focus:'A strong case study identifies the original problem, the engineering change, the controlled test and the limits of the evidence. Do not treat one successful keyboard pass as certification, and never claim that all screen-reader users have the same experience.',
    evidence:'Suppose the developer replaces a clickable div with a native button, ensures the project filter can be operated without a pointer, and adds a status region. Retesting was done in one desktop browser, not in every screen reader and mobile device.',
    assignment:'Write a four-paragraph technical case study covering the observed failure, implementation choice, before/after test and unresolved accessibility risk. Add a reproducible test checklist and clearly identify your role and collaborators.',
    model:'A credible summary says the developer repaired keyboard access to the project filter and confirmed expected behavior in the stated test browser. It explains why semantic controls matter, shares a reproducible test, and notes that wider assistive-technology review is still required.',
   }
  ],
  rubric:['Defines accessibility as observable behavior across interaction paths.','Tests keyboard order, activation and focus recovery without relying on screenshots.','Credits measured results while identifying untested devices and screen readers.','Avoids unsupported claims of certification or universal usability.']
 },
 science:{
  title:'Measurement uncertainty: know what a number really supports',
  situation:'Two fictional classroom sensors measure the same water sample. Sensor A reads 24.8 °C, 25.0 °C and 24.9 °C; sensor B reads 26.0 °C, 26.1 °C and 25.9 °C. A student concludes that water B is 1.1 °C hotter, even though both sensors were placed in one vessel and neither has been checked against a reference.',
  rounds:[
   {title:'Separate repeatability from accurate measurement',
    focus:'Multiple readings describe repeatability but do not necessarily establish accuracy. A device with a stable offset can provide consistent numbers that are systematically wrong. A comparison needs the same sample, timing, conditions and a suitable reference.',
    evidence:'For sensor A, the three-reading mean is (24.8+25.0+24.9)/3=24.9 °C. Sensor B gives (26.0+26.1+25.9)/3=26.0 °C. The difference between the means is 1.1 °C despite both instruments observing the same sample.',
    assignment:'Calculate the two means, compare their spreads, and explain why both devices could be repeatable without agreeing. Design a reference-calibration step that can distinguish instrument bias from a true temperature change.',
    model:'A averages 24.9 °C and B averages 26.0 °C; each spans 0.2 °C in these readings. The consistent difference is compatible with instrument offset but does not prove its cause. Compare both against a trusted calibrated reference under controlled conditions before reporting temperature differences.',
   },
   {title:'Publish a result with an honest measurement boundary',
    focus:'Science reports conditions, instrument limitations and uncertainty alongside measurements. Adding decimal places cannot repair bias, and one classroom trial cannot establish that a measurement method works in every setting.',
    evidence:'No reference calibration result, sensor specification or accuracy tolerance has been supplied. These omissions limit the validity of any absolute temperature claim from either instrument.',
    assignment:'Write a short scientific result with methods, observed means, uncertainty sources and a proposed repeat test. Identify why reporting “B water is hotter” would be false when the sample itself was identical.',
    model:'A careful report says the devices returned different average readings in the same water sample, with a mean difference of 1.1 °C and no verified calibration. A reference check, time synchronization and additional measurements are required before inferring true temperature or quantitative accuracy.',
   }
  ],
  rubric:['Computes the measured means and difference with correct Celsius units.','Differentiates repeatability, bias and accuracy without claiming a proven cause.','Specifies a credible reference comparison and relevant conditions.','States observational limits and avoids false precision or generalization.']
 },
 relationships:{
  title:'Group boundaries: protect shared memories without coercion',
  situation:'Three friends maintain a shared photo album. One person uploads private screenshots from a conversation without asking. Another wants to delete the entire album, and the third wants to preserve trip photos that everyone agreed could be shared. They have no clearly documented retention or export policy.',
  rounds:[
   {title:'Map consent and material ownership',
    focus:'Different files can have different expectations and access rights. A shared account does not automatically authorize publishing unrelated private conversations, and one person’s discomfort does not define what each participant legally owns.',
    evidence:'The fictional album contains mutually shared trip pictures, one participant’s personal documents, and screenshots from a private chat. Permission to see a trip photo is not proof of permission to distribute the conversation screenshots.',
    assignment:'Prepare a three-category content table: shared by consent, personal, and disputed. State what would be needed to verify the scope of permission. Create a private, voluntary request to remove screenshots without demanding public confession.',
    model:'Pause distribution of the disputed screenshots, respect the participants’ current privacy preferences, and ask only for specific shared trip exports through an agreed channel. Avoid copying unrelated personal material or making legal ownership claims without reviewing terms and applicable law.',
   },
   {title:'Agree on a reversible exit and safe handover',
    focus:'Consent-based collaboration benefits from an exit plan. A fair process distinguishes stopping new access, retrieving authorized shared materials, resolving disputed items and confirming what actually happened. If retaliation is feared, direct confrontation should not be mandatory.',
    evidence:'The group can list mutually agreed trip photos and their chosen recipients, but lacks consent to export private conversations or to force others to give up separate personal accounts.',
    assignment:'Draft a short agreement naming who can request an export, how disagreements are handled, a privacy rule and a deletion-confirmation method. Include a separate safety path for threats, and avoid irreversible bulk deletion before the parties understand the consequences.',
    model:'An opt-in, bounded transfer of identified shared photos protects memories while limiting disclosure. Participants can change their own credentials through legitimate routes and ask for independent support when disputes are unsafe. No one is required to surrender passwords to prove trust.',
   }
  ],
  rubric:['Categorizes shared, private and disputed records instead of treating all files alike.','Preserves autonomy and does not infer ongoing consent from historical access.','Provides bounded exports and documented changes without coercive bargaining.','Escalates safety concerns without requiring confrontation or retaliation.']
 },
 negotiation:{
  title:'Multi-issue agreement: price is only one dimension',
  situation:'A fictional freelancer offers a design system migration for ₱24,000 over two weeks with one included revision round. A client proposes ₱20,000 but needs the handoff within five days, requests three rounds of revisions and wants unrestricted support. The freelancer has no verified evidence that the faster delivery is feasible.',
  rounds:[
   {title:'Convert positions into comparable packages',
    focus:'Negotiating one number hides time, quality, scope and risk. Effective preparation defines a reservation point and a real alternative, then frames options with measurable acceptance conditions. A low price combined with greater obligations is not automatically a compromise.',
    evidence:'The original offer specifies price, two-week delivery and one revision round. The counteroffer reduces the amount while increasing urgency, revisions and undefined support; the resulting labor and scheduling costs are not yet quantified.',
    assignment:'Create a side-by-side package table with price, deadline, deliverables, revision scope, support hours, acceptance test and change-request rule. Identify which constraints require evidence before either party can agree.',
    model:'A transparent counterproposal can retain the two-week timeline and one revision round at ₱24,000, or offer a smaller clearly specified phase for a lower budget. Any five-day delivery requires a feasibility and resourcing check; unlimited support should not be implied.',
   },
   {title:'Write an agreement that can be accepted or declined',
    focus:'A useful negotiation concludes with a record of who will do what, by when, under which measurable conditions. It should preserve voluntary choice and respect existing contract terms, rather than using a false competitor, invented deadline or emotional pressure.',
    evidence:'Neither party has yet defined the final acceptance test or the cost of supporting additional revisions. The client’s desire for fast delivery is a legitimate interest, not proof that the original scope can fit the new timeline.',
    assignment:'Draft a short package-based reply with two feasible options, a defined revision and acceptance clause, an unresolved-risk note and a respectful decline if both fail. Explain which facts could justify a revised offer.',
    model:'The message presents options with clear deliverables, deadlines and support limits, names remaining feasibility checks and invites the client to choose. If neither works at sustainable cost, it declines without inventing competing clients or promises of guaranteed results.',
   }
  ],
  rubric:['Converts price disputes into scope, time, quality and risk dimensions.','Bases alternatives on real capabilities rather than bluffs or arbitrary anchors.','Sets measurable delivery, revision and acceptance boundaries.','Protects voluntary choice and avoids contractual or safety overclaims.']
 },
 shadow:{
  title:'Information pressure: audit persuasion without amplifying harm',
  situation:'A fictional group chat repeatedly forwards an alarming screenshot about a new community rule. The screenshot has no cited law, publication date or verifiable source. Participants say that anyone who asks for evidence is disloyal and demand that each member forward the message to ten more people immediately.',
  rounds:[
   {title:'Identify pressure devices and separate them from evidence',
    focus:'Group conformity, fear and false urgency can shape a decision even when the factual claim is unverified. Recognition requires describing observable tactics rather than diagnosing members or attributing a secret plan to them.',
    evidence:'The message contains a deadline, a demand to forward, an accusation against dissenters and no reliable primary source. Each is observable. Whether the claimed rule exists remains unknown until an official source is checked.',
    assignment:'Create a four-column table for exact claim, pressure cue, available evidence and verification route. Draft a two-sentence reply that declines forwarding while inviting the original, dated authority. Name one reason not to repost the screenshot even to criticize it.',
    model:'A bounded response is: “I cannot verify this rule from the screenshot, and I will not forward it without an official source. Can someone share the exact publication, date and provision?” This protects group relationships without treating pressure as proof or amplifying an unverified claim.',
   },
   {title:'Design a community verification protocol',
    focus:'A reliable protocol makes accuracy easier without humiliating people who were misled. It defines source priorities, clear corrections, privacy protection, and an off-ramp from panic. A genuine emergency may need urgent action, but it still needs a verified decision path.',
    evidence:'The group can check a known official public channel for the relevant jurisdiction, compare document titles and effective dates, and label the claim unresolved if the source cannot be located. None of that requires mass sharing private screenshots.',
    assignment:'Write a six-step verification and correction procedure: pause sharing, log the claim, check primary source, confirm scope and date, publish a non-shaming correction, and revisit if evidence changes. Include a separate step for immediate credible safety threats.',
    model:'Members withhold unverified forwarding, independently locate official source text, and communicate a correction that states what is known and what remains unknown. If an immediate safety risk is real, contact appropriate responders through verified channels rather than obeying anonymous forwarding demands.',
   }
  ],
  rubric:['Separates group pressure signals from independently verifiable factual claims.','Requires a primary source, publication date and applicability check.','Avoids retaliatory humiliation or redistributing private or false content.','Includes a safety pathway without treating every urgent-looking message as authentic.']
 }
};
