/** Longitudinal Field Expeditions — remaining seven study worlds.
 * Six applied sessions per subject, independent review still pending.
 */
export const FIELD_EXPEDITIONS_TWO={
  "thinking": {
    "title": "Critical reasoning residency · Audit a persuasive public claim",
    "mission": "Investigate a fictional viral claim from initial observation to source audit, causal alternatives, disconfirming evidence and a calibrated public explanation. The aim is to resist both gullibility and blanket cynicism.",
    "context": "A screenshot claims that a city education program doubled examination success in one year. The infographic lacks a denominator, excludes withdrawals and uses a school photo unrelated to the alleged data.",
    "sessions": [
      {
        "name": "01 · Parse the claim before judging it",
        "principle": "Persuasive framing can conceal the exact outcome. Relative percentage growth, percentage points, subgroup selection and missing denominators can produce different conclusions.",
        "assignment": "Rewrite the headline as three testable questions: who, what outcome and over what time. List the population, comparison and measurement information needed before believing or rejecting it.",
        "evidence": "A claim map with an operational definition of success, population size, sampling dates and three unknown quantities rather than a simple true/false reaction.",
        "worked": "'Doubled success' could mean increasing from 5% to 10% or from 40% to 80%. Both double a percentage, but the underlying impact and uncertainty are different. The denominator and definition matter."
      },
      {
        "name": "02 · Build a provenance chain",
        "principle": "An attractive graph is not the primary record. Track who collected data, how it was transformed and whether an independent source supports the interpretation.",
        "assignment": "Produce a source ladder for the fictional announcement: original dataset, published method, agency report, independent analysis and social repost. Give each a reliability question rather than an invented rating.",
        "evidence": "A provenance chart marking source identity, publication date, sampling method, transformations and where the evidence chain breaks.",
        "worked": "A cropped graphic can accurately reproduce a number while omitting withdrawals or eligibility changes. Find the original method and check whether 'success' was measured consistently before repeating the claim."
      },
      {
        "name": "03 · Reconstruct a simple comparison",
        "principle": "Raw counts and selection effects should be visible in a defensible interpretation. An apparent improvement may reflect different participants rather than an intervention.",
        "assignment": "Assume a hypothetical earlier cohort of 200 learners with 40 passes and a later cohort of 100 with 40 passes. Calculate the two pass rates and explain why a change in cohort size matters.",
        "evidence": "A table showing 20% earlier and 40% later, with a caution that equal passes and different denominators do not establish why the rate changed.",
        "worked": "The pass count is unchanged at 40, although the rate doubled. Changes in admission or withdrawal could explain the ratio. A careful interpretation reports both numerator and denominator rather than only the relative percentage."
      },
      {
        "name": "04 · Seek the strongest alternative",
        "principle": "Confirmation bias affects skeptics as well as believers. A serious critique tries to find evidence that could change its own conclusion and avoids replacing uncertainty with certainty.",
        "assignment": "Propose two causal alternatives for the improved rate, such as selective enrollment and tutoring outside the program. Identify one observation that would weaken each explanation.",
        "evidence": "A falsification matrix with competing hypotheses, observable predictions, data needs and the strongest residual uncertainty.",
        "worked": "If the later cohort included only students with prior high attendance, selection could increase observed pass rates. A comparable group or careful analysis of enrollment changes could challenge that account."
      },
      {
        "name": "05 · Transfer to a risk classifier",
        "principle": "The logic of denominators changes when predictions affect individuals. Accuracy may be high overall while rare-event alerts are mostly false alarms.",
        "assignment": "Study a fictional detector screening 1,000 cases with ten true problems. It flags nine true problems and fifty healthy cases. Calculate the share of flags that correspond to true problems.",
        "evidence": "A two-by-two table and a qualified summary: 9 / 59 ≈ 15.3% of flagged cases represent actual problems in this dataset, despite detecting nine of ten problems.",
        "worked": "The detector can still help prioritize human review, but an alert is not proof of wrongdoing. Base rates, costs of false alarms and an appeal process determine whether the decision policy is fair."
      },
      {
        "name": "06 · Publish a correction with calibrated confidence",
        "principle": "A rigorous answer distinguishes established facts, plausible causes and limitations in a way a nonexpert can act on. Avoid certainty theater in either direction.",
        "assignment": "Draft a 200-word correction of the fictional viral screenshot, including the two cohort rates, the unchanged number of passes, alternative explanations and what further evidence could justify a causal claim.",
        "evidence": "A source-traceable summary that avoids the words 'proven fraud' or 'definitely effective' without evidence and states which numbers are hypothetical.",
        "worked": "'The reported pass rate doubled from 20% to 40% while the number of passes stayed at 40 in our example. This change alone cannot establish the program's causal effect; we need enrollment and comparable-outcome data.'"
      }
    ],
    "defense": "Defend your response against one critic who assumes the program is worthless and another who assumes the infographic proves success; name the additional evidence that would move your conclusion.",
    "boundary": "All numerical cases are fictional. Real fact-checking requires the original data and trustworthy current sources; do not share identifying student records.",
    "criteria": [
      "Preserves counts, denominators, dates and definitions.",
      "Tracks provenance and notes unverifiable steps.",
      "Tests at least two competing causal explanations.",
      "Computes the rare-event alert interpretation correctly.",
      "Communicates calibrated uncertainty rather than false certainty."
    ]
  },
  "digital": {
    "title": "Digital security residency · Ship an offline app responsibly",
    "mission": "Build a threat model and recovery dossier for an offline-first study application. Integrate authentication assumptions, data minimization, import validation, content security and user-centered recovery without promising perfect safety.",
    "context": "A fictional PWA stores private lesson notes in browser storage and supports JSON backups. It runs without an account. A planned update improves imports and may introduce new failure modes.",
    "sessions": [
      {
        "name": "01 · Inventory assets and trust boundaries",
        "principle": "An offline app still has sensitive content and failure paths. Security begins by knowing what can be lost, stolen, altered or made unavailable and which components deserve trust.",
        "assignment": "Draw a threat map for note text, saved progress, backup exports, browser storage, JavaScript code and user-controlled import files. Include device loss, malicious JSON and untrusted shared devices.",
        "evidence": "An asset-to-threat-to-control table with at least five entries, assumptions about device access and one risk that remains outside the application's control.",
        "worked": "An encrypted backup may protect data at rest when handled correctly, but a stolen unlocked device can still reveal notes. The browser may evict storage; never advertise offline storage as permanent."
      },
      {
        "name": "02 · Establish safe input contracts",
        "principle": "Import data is untrusted even if the user selected the file. Well-formed JSON can contain invalid types, oversized strings and unexpected keys.",
        "assignment": "Specify accepted schema version, permitted note lengths, identifier patterns, array limits, size limits and behavior for unknown fields. Define an error state that leaves existing data untouched.",
        "evidence": "A validation matrix covering valid export, truncated JSON, wrong type, oversized note and unknown schema with explicit accept/reject outcomes.",
        "worked": "A file containing an unexpected executable-looking string should be handled as inert data, not HTML. Entire candidate payloads must pass schema and size checks before replacement."
      },
      {
        "name": "03 · Test atomic recovery",
        "principle": "Successful export means little without reliable restoration. A destructive partial import can be more harmful than the original fault.",
        "assignment": "Design a round-trip test with two fictional profiles, including successful restore and failures for wrong password, corrupted payload and mid-process interruption. State what state must remain unchanged after every rejection.",
        "evidence": "A reproduction table listing original state digest or semantic keys, import result, retained notes, selected preferences and error message, with no private real content.",
        "worked": "A safe procedure validates into temporary state and commits only after a complete pass. A wrong-password attempt should not clear field notes or mutate review history, and a success should preserve the documented data categories."
      },
      {
        "name": "04 · Audit runtime and permissions",
        "principle": "Privacy includes the app's network behavior, content sources, extension assumptions and the clarity of permission prompts. One security header is not a comprehensive audit.",
        "assignment": "Inspect a fictional deployment plan for remote scripts, local fonts, link handling, service-worker cache scope and unnecessary telemetry. List which tests could be automated and which need a real-device review.",
        "evidence": "A runtime checklist separating code-level controls, configuration evidence and physical-device observations. Do not claim a simulated browser proves installed mobile PWA behavior.",
        "worked": "An offline education app may choose no external analytics and same-origin assets to reduce unnecessary disclosure. That helps privacy but does not establish total security, nor does a passing desktop browser ensure iOS storage persistence."
      },
      {
        "name": "05 · Challenge the recovery promise",
        "principle": "A confident release note can mislead users if it overstates backup protection, portability or accessibility. Test failure messaging and help instructions from a learner's point of view.",
        "assignment": "Write two notices: one accurate import failure that assures existing data were not changed, and one privacy explanation of what exports contain and how to store them securely.",
        "evidence": "A short, actionable pair of messages that names limitations, does not expose passwords, and distinguishes an export file from automatic cross-device sync.",
        "worked": "'Import rejected: this backup is incompatible. Your existing notes are unchanged' is preferable to 'Everything is safe forever.' Explain browser eviction and how to maintain personal copies without exposing them to others."
      },
      {
        "name": "06 · Prepare a bounded release defense",
        "principle": "Secure software work requires evidence, owners, tests, rollback and explicit residual risk. Claims should be tied to actual verification rather than wishful language.",
        "assignment": "Compose a release readiness matrix with tested behaviors, unsupported devices, threat priorities, rollback trigger, known accessibility gaps and a decision owner. Mark every check as executed, planned or blocked.",
        "evidence": "A version-specific release memo distinguishing passed automated cases from absent physical-device proof and external security review, without personal learner data.",
        "worked": "A credible review may approve a test deployment while leaving production acceptance open. An unresolved restore-corruption issue is a release blocker; a noncritical cosmetic defect may be scheduled later under clear criteria."
      }
    ],
    "defense": "Defend why a full backup round trip, content safety and truthful failure messaging matter more than a green build badge, and identify which real-device evidence is still missing.",
    "boundary": "Defensive education only, not a penetration-testing or compliance certificate. Actual privacy/security audits and production authorization require appropriate professionals and real systems evidence.",
    "criteria": [
      "Maps realistic assets and trust boundaries, not only passwords.",
      "Defines strict import limits and atomic rejection behavior.",
      "Tests restore outcomes across multiple failure conditions.",
      "Separates simulated test results from device verification.",
      "Documents clear residual risk, user warnings and rollback."
    ]
  },
  "career": {
    "title": "Career residency · Publish evidence, not adjectives",
    "mission": "Create a role-specific portfolio case study that another person can inspect and reproduce. Improve the accuracy of project claims and make limitations, team ownership and career readiness explicit.",
    "context": "A fictional IT graduate has an unfinished storefront prototype, a group capstone, and a private note application. The résumé claims industry-level security and a dramatic productivity increase, but neither was independently measured.",
    "sessions": [
      {
        "name": "01 · Audit current professional claims",
        "principle": "A résumé claim should be traceable to specific work and evidence. A deployed result, a prototype, a team task and a personal experiment represent different levels of maturity.",
        "assignment": "Inventory three projects and give each a truthful status, personal role, reproducible feature and known limitation. Rewrite two exaggerated lines into descriptions backed by observable artifacts.",
        "evidence": "A claim ledger with URLs or safe demo references, exact individual contributions, measured facts versus estimates, and a correction log.",
        "worked": "'Implemented a private note search with documented keyboard behavior' is defensible with a test. 'Guaranteed world-class secure vault' is not supported by a personal prototype or a few successful manual checks."
      },
      {
        "name": "02 · Select the work for a target role",
        "principle": "An employer evaluates relevance, judgment and quality, not the largest number of thumbnails. Different roles value different evidence from the same project.",
        "assignment": "Select a target discipline—frontend, backend, UI/UX or product engineering—and choose two artifacts. Explain how each demonstrates a required skill and which claim you will not make.",
        "evidence": "A two-project shortlist mapped to role requirements, with proof and unknowns rather than unverified employer rankings.",
        "worked": "For frontend work, responsive navigation and focus management may matter; for backend, input validation and failure handling may matter more. The exact role determines which evidence deserves the reader's limited attention."
      },
      {
        "name": "03 · Explain an engineering decision",
        "principle": "A screenshot proves appearance but not how a decision was made. Strong case studies describe constraints, alternatives, trade-offs and verification.",
        "assignment": "Write a case narrative for one feature: original user problem, chosen architecture, two considered alternatives, an implementation risk, testing and a known defect.",
        "evidence": "A concise sequence another developer could follow to reproduce the behavior or understand why the approach was chosen.",
        "worked": "An offline-first design might prioritize access and privacy but increase backup complexity. An honest case study explains that trade-off instead of claiming every decision is universally optimal."
      },
      {
        "name": "04 · Validate without fabricating metrics",
        "principle": "A usability test needs an actual task, success criterion, participants and limitations. You cannot calculate a reliable productivity improvement from a compliment.",
        "assignment": "Propose two repeatable user tasks and a bounded test protocol with consent and privacy safeguards. Contrast internal manual checks with a controlled impact experiment.",
        "evidence": "A validation report template with task steps, device/browser, result, participant limitations, unresolved failures and corrective actions.",
        "worked": "A useful report might say 'Four of five participants completed the navigation task in an informal check' with a sample caveat. It must not turn that into a precise workplace productivity percentage."
      },
      {
        "name": "05 · Defend the unfinished project",
        "principle": "A project can demonstrate learning even if it was not launched. The key is a clear boundary between implemented code, verified behavior, missing release work and future plans.",
        "assignment": "Prepare an honest interview response to 'Why isn't this live?' and a release checklist that distinguishes required QA from optional polish. Include credentials and client data that must stay private.",
        "evidence": "A 60-second explanation plus an actionable release checklist. The response neither hides the unfinished work nor invents paying users.",
        "worked": "'The prototype demonstrates the core flow. I paused deployment until backup integrity and mobile accessibility were checked. Here is the test plan and the current limitation' is more credible than blaming the market."
      },
      {
        "name": "06 · Produce a public-safe dossier",
        "principle": "A portfolio should be easy to scan and detailed enough for serious reviewers. Evidence must not leak secrets, internal clients or identifiable test participants.",
        "assignment": "Assemble a one-page case study with headline, context, role, decisions, tested results, reproducible link, limitations and next experiment. Ask a reviewer what they still cannot verify.",
        "evidence": "An artifact that a technical interviewer can evaluate in fifteen minutes, with redactions and working demonstration steps where appropriate.",
        "worked": "A strong case study leads with an observable outcome, links safe evidence and admits that production-scale security, external accessibility audits or actual customer ROI have not been established."
      }
    ],
    "defense": "Defend the gap between what you built and what you can independently prove; demonstrate one replicable project behavior and name the next test that would change your résumé claim.",
    "boundary": "Career education, not a guaranteed job outcome or credential. Never disclose customer files, passwords, proprietary code or personal participant information in a public portfolio.",
    "criteria": [
      "Claims distinguish prototype, production and unmeasured impact.",
      "Role relevance determines which evidence appears first.",
      "Decisions include alternatives, trade-offs and reproducible checks.",
      "Validation describes its population and limits accurately.",
      "The public dossier excludes secrets and invented testimonials."
    ]
  },
  "science": {
    "title": "Astronomy residency · Explain and test the moving night sky",
    "mission": "Use repeated safe observation, simple models and falsifiable predictions to deepen scientific reasoning about Earth rotation, lunar phases, seasonal sky visibility and measurement uncertainty.",
    "context": "A fictional observer in Manila notices stars shifting across a night, the Moon appearing at different evening positions and a friend's claim that Earth's changing distance from the Sun causes all seasons.",
    "sessions": [
      {
        "name": "01 · Record the observation precisely",
        "principle": "Science begins by documenting time, location, direction and conditions before explaining an effect. Observation alone does not uniquely identify the physical cause.",
        "assignment": "Plan three safe evening sky observations with dates, approximate direction, weather and horizon obstructions. Describe which positions can be recorded without looking at the Sun.",
        "evidence": "A log with observation and inference in separate columns, uncertainty labels for cloud or obstruction, and a reproducible location description without disclosing a home address.",
        "worked": "A star may appear higher two hours later because Earth's viewing direction rotated. The record should distinguish 'I saw it higher above the horizon' from 'the star moved upward through space' as an explanation."
      },
      {
        "name": "02 · Build a rotation model",
        "principle": "Earth rotates roughly once each day and changes an observer's viewing direction. Apparent daily motion need not mean distant stars orbit Earth every night.",
        "assignment": "Use a lamp-free globe sketch to show an observer on rotating Earth and the apparent westward sweep of the distant sky. Predict how positions should change during a several-hour observation.",
        "evidence": "A labeled diagram of Earth rotation and the apparent sky motion, with one testable prediction and a reminder that weather or horizon may mask the effect.",
        "worked": "A mark at a fixed horizon direction should be crossed by a star's apparent path as Earth turns. The model predicts regular apparent movement; it does not imply stars are physically attached to a nearby shell."
      },
      {
        "name": "03 · Distinguish the Moon's phases from its orbit",
        "principle": "Lunar phases depend on the relative geometry of Sun, Earth and Moon. They are not normally Earth's shadow crossing the Moon, except during a lunar eclipse.",
        "assignment": "Draw positions of the Moon around Earth and shade the sunlit half in each drawing. Explain why the illuminated fraction visible from Earth changes through the lunar cycle.",
        "evidence": "A diagram that distinguishes the always-sunlit lunar hemisphere from the fraction seen by an Earth observer, with a note that diagram scales are schematic.",
        "worked": "At a quarter phase, observers see roughly half the visible disk illuminated. The Moon is not literally half illuminated in space; the Sun still lights approximately half the Moon's surface."
      },
      {
        "name": "04 · Test the seasons explanation",
        "principle": "A model must explain opposite seasons in the northern and southern hemispheres at the same time. Distance-only explanations fail this test.",
        "assignment": "Compare hypothetical June daylight and sunlight angles for northern and southern midlatitudes. State what axial tilt predicts and why an Earth-Sun distance-only explanation is inadequate.",
        "evidence": "A side-by-side model with Earth axis tilted about 23.4 degrees, hemispheres labeled and an explicit prediction about opposite seasonal conditions.",
        "worked": "When the northern hemisphere tilts toward the Sun, daylight is generally longer and sunlight more direct at midlatitudes; the southern hemisphere experiences the opposite pattern. The distance-only story cannot explain this contrast."
      },
      {
        "name": "05 · Investigate an apparent counterexample",
        "principle": "Scientific predictions are conditional on location, date and observation quality. A star map for one latitude at one time can differ markedly elsewhere.",
        "assignment": "Explain why a sky chart for Manila at 21:00 need not match a friend's chart for Melbourne at 21:00. Separate the effects of latitude, hemisphere, season, timezone and weather.",
        "evidence": "A comparison table identifying which variables differ and which observations would best test the model, avoiding invented star coordinates.",
        "worked": "Different latitudes change which part of the sky is above the horizon; different longitude and timezone affect observing geometry. A mismatch is not automatically a failure of astronomy—the model specifies where and when."
      },
      {
        "name": "06 · Defend the combined explanation",
        "principle": "Scientific mastery requires a coherent model, a prediction, data that might contradict it and honest uncertainty. Drawings alone do not establish that an observation was made.",
        "assignment": "Prepare a six-panel teaching sheet linking rotation, apparent stellar motion, lunar phases, axial tilt, latitude and safe observational testing. Include two common misconceptions and evidence needed to correct them.",
        "evidence": "A beginner-friendly but physically defensible lesson that clearly marks theoretical diagrams versus observed measurements, with sources flagged for optional online checking.",
        "worked": "A sound synthesis explains nightly sky motion with Earth's rotation, phases with Sun-Earth-Moon geometry and seasons chiefly with axial tilt. It also admits that local visibility needs actual date, place and weather data."
      }
    ],
    "defense": "Defend why Earth's distance from the Sun cannot explain opposite hemispheric seasons, and predict which observations a careful novice could collect to challenge your explanation.",
    "boundary": "Never observe the Sun directly without certified solar protection and appropriate training. No medical or astronomical safety certification is implied; verify observations against reputable astronomy references.",
    "criteria": [
      "Records observation context before asserting causes.",
      "Makes falsifiable predictions about rotation and sky motion.",
      "Explains lunar phases without confusing them with eclipses.",
      "Explains seasonal contrast through axial tilt and latitude.",
      "Distinguishes drawn models, uncertain data and verified observations."
    ]
  },
  "relationships": {
    "title": "Relationship residency · Practice trust repair and meaningful boundaries",
    "mission": "Study repeat behavior, agreements, consent and safety through fictional interpersonal cases without prescribing diagnoses or requiring reconciliation. The goal is evidence-based, autonomous choices.",
    "context": "Two adult friends agree to keep a sensitive disagreement private. One posts a recognizable story about it, apologizes and asks for immediate forgiveness. The injured friend wants to decide whether and how to rebuild trust.",
    "sessions": [
      {
        "name": "01 · Describe the breach precisely",
        "principle": "Impact and intent are different questions. You do not need to infer someone's hidden motives to recognize an agreed boundary was violated.",
        "assignment": "Make a two-column record of the agreement and what actually happened. Mark which details are certain, disputed or private, and describe the impact without a clinical label.",
        "evidence": "A fictionalized incident record preserving the agreement and specific disclosure while avoiding a public transcript of the friendship.",
        "worked": "'Our agreement was not to make private disputes identifiable, and a recognizable post appeared' is a concrete concern. It does not prove the other person is permanently untrustworthy or has a psychological disorder."
      },
      {
        "name": "02 · Distinguish apology from repair",
        "principle": "A sincere explanation may coexist with harm, and forgiveness is separate from restored trust. Repair includes behavior, accountability and respect for the injured person's pace.",
        "assignment": "Write an apology analysis: what was acknowledged, what was minimized, what specific action could help and which requests unfairly pressure immediate reconciliation.",
        "evidence": "A repair checklist including removing the post where possible, negotiating future support-seeking boundaries and accepting that forgiveness is voluntary.",
        "worked": "'I'm sorry, but you must forgive me now' introduces pressure and ignores consequences. A meaningful repair can acknowledge impact and offer changed conduct without demanding instant closeness."
      },
      {
        "name": "03 · Negotiate reciprocal limits",
        "principle": "A boundary is an action under your control, not a command that forces another person to feel or behave as you wish. Reciprocity does not require equal concessions.",
        "assignment": "Draft one request about privacy and one boundary about future disclosure. Include a permissible way for someone to seek independent support without identifying the other person publicly.",
        "evidence": "A short agreement with consent, privacy context and an observable condition that would trigger a change in participation.",
        "worked": "The parties might agree to seek help privately without publishing identifiable accounts. The injured friend can choose not to share sensitive information again until trust is demonstrated."
      },
      {
        "name": "04 · Reassess after repeated behavior",
        "principle": "Promises and consistency have different evidential weight. One positive apology does not erase a repeating pattern, and one error does not prove a permanent identity.",
        "assignment": "Imagine the same identifiable disclosure recurs after clear agreements. Compare what was expected, what occurred and which safer boundary or support route is now warranted.",
        "evidence": "A dated pattern assessment without secret tests, retaliatory posts, or pressure for a particular relationship outcome.",
        "worked": "Repeated public disclosure after a clear privacy request may justify limiting personal disclosures or taking distance. The response can protect autonomy without proving why the person repeated the act."
      },
      {
        "name": "05 · Transfer to shared family care",
        "principle": "Interpersonal boundaries can operate differently when medical needs, dependency, cultural expectations or safety matter. Adjust the method to avoid simplistic equivalence.",
        "assignment": "Analyze a fictional sibling who shares another family member's personal information with a caregiving group to coordinate appointments. Identify consent, necessity, lawful access and alternative communication.",
        "evidence": "A comparison between friendship privacy and practical care information, including what the affected person wants and what professional support may be needed.",
        "worked": "Care coordination may sometimes require carefully limited information, but convenience is not blanket permission. Ask the supported person where feasible and seek qualified advice for high-stakes health or legal questions."
      },
      {
        "name": "06 · Defend an autonomy-respecting decision",
        "principle": "The evidence supports options, not a universal instruction to reconcile or leave. State what observations justify your own decision and what uncertainty remains.",
        "assignment": "Produce a one-page choice memo comparing continued contact with safeguards, reduced sharing, time apart and outside support. Include one realistic criterion for re-evaluation.",
        "evidence": "A reasoned decision acknowledging both people's agency, the prior agreement, observed pattern and a safe plan if threats or coercion occur.",
        "worked": "A sound conclusion may say 'I will stop sharing sensitive stories and revisit this after consistent privacy-respecting behavior.' It does not require the other person to approve the boundary or prove that forgiveness is owed."
      }
    ],
    "defense": "Defend why consent, repeated behavior and safety matter more than an impressive apology, and identify the difference between a reasonable boundary and retaliatory control.",
    "boundary": "General relationship education, not therapy. If intimidation, coercion, violence or danger is present, prioritize professional/local safety support over these exercises.",
    "criteria": [
      "Separates event, intent and impact without diagnosing.",
      "Defines repair as observable behavior over time.",
      "Preserves meaningful choice and voluntary forgiveness.",
      "Responds proportionately to repeated breaches.",
      "Includes a safety-aware route when the issue exceeds ordinary conflict."
    ]
  },
  "negotiation": {
    "title": "Negotiation residency · Deliver a fair software agreement",
    "mission": "Prepare and evaluate a freelance software contract by modeling scope, alternative options, total cost, intellectual-property and change control. Protect the ability to decline rather than equating negotiation with persuasion.",
    "context": "A fictional developer is offered ₱8,000 for a 50-hour interface prototype with unlimited revisions and payment after final approval. Another smaller assignment offers ₱6,000 for 25 hours with limited revisions.",
    "sessions": [
      {
        "name": "01 · Calculate your baseline alternative",
        "principle": "An offer's size alone is misleading when expected hours, risk and opportunity cost differ. A credible BATNA is what you can actually do if no agreement is reached.",
        "assignment": "Compare the offers on expected gross hourly pay before taxes and overhead. List what you would need to know about payment certainty and revisions to compare fairly.",
        "evidence": "A comparison showing approximately ₱160/hour for the larger offer versus ₱240/hour for the smaller one under initial hour estimates, with missing contract terms clearly labeled.",
        "worked": "The first offer sounds bigger but may compensate worse per hour, especially if 'unlimited revisions' is literal. A better alternative must be realistic, not a bluff about clients who have not actually offered work."
      },
      {
        "name": "02 · Define the scope boundary",
        "principle": "A contract that promises 'high quality' and 'as many tweaks as needed' cannot easily establish when work is complete. Scope is a joint definition, not a weapon.",
        "assignment": "Draft a statement of work naming deliverables, excluded integrations, acceptance criteria, two revision rounds, change requests and a test environment.",
        "evidence": "A written scope with examples of what counts as a correction versus an additional feature, including the person authorized to approve changes.",
        "worked": "Two agreed revision rounds allow changes within scope. A request for a new payment system is outside a pure UI prototype and needs a separate estimate and authorization."
      },
      {
        "name": "03 · Price uncertainty and support",
        "principle": "Small projects often include hidden expenses such as meetings, rework, client delays and post-delivery support. An estimate should show assumptions and uncertainty.",
        "assignment": "Create a simple fee comparison with expected hours, two additional revision scenarios and an explicit cost for extra work. State the reservation point as a private calculation, not a threat.",
        "evidence": "A model that shows hourly pay deteriorating with extra work and a counteroffer containing concrete trade-offs in fee, scope and timeline.",
        "worked": "If the 50-hour job expands to 75 hours without more pay, gross hourly revenue falls to around ₱107. The developer could counter with a capped scope and billed changes instead of pretending this risk is negligible."
      },
      {
        "name": "04 · Protect payment and data rights",
        "principle": "Ownership, payment schedules, confidentiality and access may matter as much as price. A deal can fail even if it pays well if essential terms are not enforceable or clear.",
        "assignment": "Draft a milestone schedule with partial deliverables, acceptance review window and payment conditions. Identify IP ownership, third-party assets and secure handling of accounts for qualified legal review.",
        "evidence": "A term checklist that protects both sides from indefinite approval delays and unauthorized transfer of sensitive credentials.",
        "worked": "A milestone could tie payment to a demonstrable prototype and a written response deadline. The contract should clarify what source files are delivered and who owns permitted assets, with local counsel reviewing material terms."
      },
      {
        "name": "05 · Negotiate a late change",
        "principle": "A client may have a legitimate new need but no entitlement to free unbounded additional work. Present options without escalating or misrepresenting the current contract.",
        "assignment": "Imagine the client requests a responsive admin dashboard after the prototype is nearly complete. Write a change-order reply presenting revised cost/date and the option to keep original scope.",
        "evidence": "A polite two-option letter with new deliverable, assumptions, acceptance rule and no promise to work unpaid hours.",
        "worked": "'We can complete the agreed prototype on schedule, or add a dashboard through a separately estimated change request' makes the trade-off visible. If the feature is actually needed to meet original accessibility obligations, that must be assessed fairly."
      },
      {
        "name": "06 · Defend a signed-or-declined decision",
        "principle": "Negotiation competence includes walking away from an unsafe or infeasible agreement. A respectful refusal can preserve trust and reduce future disputes.",
        "assignment": "Write a final comparison memo and either a conditional acceptance or refusal. Include BATNA, risk, scope, payment milestones, data/privacy conditions and an unresolved legal question.",
        "evidence": "A clear decision with at least one quantified trade-off, verifiable next step and a documented boundary rather than a rehearsed domination tactic.",
        "worked": "A defensible choice may favor the smaller offer if its scope and payment conditions are better. The worker may also negotiate better terms for the first, but should not sign ambiguous ownership or unlimited unpaid work solely for a larger headline fee."
      }
    ],
    "defense": "Explain how your reservation point changes when revisions expand and payment is delayed. Defend why a clear, mutual agreement matters more than winning the opening price anchor.",
    "boundary": "Fictional contract education, not legal or tax advice. Verify enforceability, intellectual-property ownership and local employment/contract provisions with qualified counsel.",
    "criteria": [
      "Compares offers on realistic total work and costs.",
      "Defines acceptance, revisions and change scope unambiguously.",
      "Includes payment, IP, data and confidentiality questions.",
      "Uses a credible alternative and respects consent.",
      "The final agreement or refusal is reasoned and proportionate."
    ]
  },
  "shadow": {
    "title": "Protective media literacy residency · Audit deceptive choice design",
    "mission": "Learn to recognize manipulation patterns in digital products and interpersonal pressure without becoming a guide to coercing people. Produce an ethical design review centered on genuine consent and user autonomy.",
    "context": "A fictional subscription service advertises a free trial but places a recurring charge in faint text, makes cancellation difficult to find and tells unhappy users they misunderstand simple terms. A separate group chat pressures members to prove loyalty by posting personal details.",
    "sessions": [
      {
        "name": "01 · Define meaningful informed choice",
        "principle": "Consent depends on relevant information, the ability to refuse and the absence of deceptive pressure. An isolated misleading phrase does not prove intent, but the design's effect can still be evaluated.",
        "assignment": "Document the subscription's actual decision points: price disclosure, renewal, trial end, acceptance, cancellation and confirmation. Explain what the user can do at each step.",
        "evidence": "A neutral interface inventory with screenshots or fictional descriptions, showing where the key decision is visible and what remains hidden or ambiguous.",
        "worked": "A 'Start free' button without a clear later cost can mislead. The safer design places renewal amount and cancellation terms near the choice and gives a clear confirmation of what was accepted."
      },
      {
        "name": "02 · Distinguish pattern from an anecdote",
        "principle": "Defensive analysis should use observations and potential autonomy effects, not amateur diagnosis of a designer or a group leader.",
        "assignment": "Compare three fictional user experiences: one cancels easily, one cannot locate the option, and one receives conflicting instructions. Identify which claims are supported and how to test them fairly.",
        "evidence": "A pattern log with event, exact interface state, consequence, user context and an uncertainty note. Do not publish identifiable user complaints without consent.",
        "worked": "Different experiences may reflect app versions or accessibility settings. The analysis can still find a risky design without claiming to know its developer's private motives."
      },
      {
        "name": "03 · Test an ethical alternative",
        "principle": "Good interface design makes important choices easy to understand, not merely easier to approve. Assess outcomes as comprehension and control rather than coerced conversion.",
        "assignment": "Redesign a fictional trial panel with visible billing terms, a clear decline option, accessible labels, cancellation route and confirmation. Define a short comprehension test.",
        "evidence": "A before/after sketch or textual wireframe that preserves genuine options and measures whether users understand when and how payment occurs.",
        "worked": "The improved panel states the trial duration, recurring price and a cancellation path in comparable prominence. Success means users can accurately explain the consequence, even if fewer sign up."
      },
      {
        "name": "04 · Separate safety from retaliation",
        "principle": "Recognizing a coercive pattern does not justify secret surveillance, entrapment or public harassment. People should be able to seek help without escalating risk.",
        "assignment": "For the group chat, write a safe support plan for a member pressured to share personal details. Identify possible boundaries, trusted contacts and when to stop informal investigation.",
        "evidence": "A protective decision tree that avoids covert testing, unauthorized screenshots, collecting others' private messages or forced confrontation.",
        "worked": "'I prefer not to post private details' can be a boundary. If credible threats follow, the person may need qualified support and a safety plan rather than a clever argument to win approval."
      },
      {
        "name": "05 · Transfer to deceptive defaults",
        "principle": "Behavioral pressure can appear in mobile app permissions, newsletters or checkout flows. Evaluate informed choice in contexts with different stakes.",
        "assignment": "Study a fictional app where tracking consent is preselected and declining requires several confusing screens. Propose a fair default and a clear way to revisit the choice.",
        "evidence": "An accessibility-conscious interface redesign showing equal visibility of important options and plain-language effect of consent.",
        "worked": "A consent-respecting flow should not disguise an optional tracking choice as mandatory. A visible 'No thanks' with accurate consequences and easy future modification better preserves user agency."
      },
      {
        "name": "06 · Defend the ethical audit",
        "principle": "An audit should state what was observed, how it affects autonomy, which alternative was tested and where law or safety requires expert review. Avoid grand claims about motives.",
        "assignment": "Deliver a one-page protective design report: issue, evidence, user consequence, proposed change, test method, residual uncertainty and escalation route for serious harm.",
        "evidence": "A practical report that can inform a product designer or consumer advocate without teaching anyone to manipulate users or exposing private personal data.",
        "worked": "'The renewal price was displayed only after activation in this fictional test; move it before consent and verify comprehension' is actionable. 'The designer is evil' is not a substantiated design finding."
      }
    ],
    "defense": "Defend how a transparent subscription flow differs from a pressure-based flow and why positive conversion metrics alone cannot establish meaningful consent.",
    "boundary": "Adults-only educational defensive content. Do not use these examples for coercion, nonconsensual monitoring, entrapment or diagnosis. Legal and safeguarding matters require qualified assistance.",
    "criteria": [
      "Records observed tactics without diagnosing motivation.",
      "Evaluates autonomy, accessibility and informed consent.",
      "Tests a transparent alternative through comprehension.",
      "Includes safe boundaries rather than retaliation.",
      "States unresolved safety or legal matters for external review."
    ]
  }
};
