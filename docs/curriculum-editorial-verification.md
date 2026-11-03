# Xyra Atlas — curriculum editorial verification log

Review date: **2026-11-04** · Stage: **Advanced curriculum, still in progress**

This document describes actual evidence checked rather than declaring all published course material verified. A green automated test proves structural and software behavior, not expert review of pedagogical or legal accuracy. Every lesson remains general education, not certification or individualized professional advice.

## Source checks completed

| Topic | Primary published material | Scope verified | Review limitation |
|---|---|---|---|
| Philippine data-subject access | National Privacy Commission, [Right to Access](https://privacy.gov.ph/right-to-access/) and [Data Subject Rights](https://privacy.gov.ph/data-subject-rights/) | The right concerns the subject's own personal data, with statutory limits and qualifications; another person's private information is not automatically accessible | Rights, lawful authorizations, exceptional circumstances and actual procedures may change |
| Bank complaint recourse | Bangko Sentral ng Pilipinas, [Consumer Assistance Mechanism](https://www.bsp.gov.ph/Pages/InclusiveFinance/ConsumerAssistanceManagement.aspx) | The bank or BSP-supervised institution is the first complaint contact; BSP-CAM is second-level recourse for qualifying unresolved issues | Check applicable institution, product, complaints channel and current documentary requirements |
| Consumer complaints | Department of Trade and Industry, [FTEB Complaints Handling](https://fairtrade.dti.gov.ph/faq/how-to-file-a-consumer-complaint/) | The current DTI guidance provides an official Consumer CARe channel and complaint route. DTI also publishes [mediation/adjudication prerequisites](https://fairtrade.dti.gov.ph/faq/when-can-i-file-a-consumer-complaint-before-the-adjudication-division/) | DTI jurisdiction, prescribed filing forms and available remedies depend on dispute and current procedural rules |
| Business break-even calculations | US SBA, [Break-even point](https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point) | Contribution per unit is sales price less per-unit variable cost; break-even units depend on fixed costs divided by this contribution | US-oriented instructional reference; does not replace Philippine accounting, tax or business registration rules |
| Resume evidence | CareerOneStop (US DOL), [Top portion of resume](https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/top-portion-of-resume.aspx) | A resume can include specific measurable outcomes, clear skills and role-relevant information | US job-seeking guidance is not a Philippines employment-law reference |

These sources were inspected for the specific claims above as of the review date. The complete set of 40+ distinct external course references has **not** been individually verified. Pages can change after a build; Xyra Atlas lessons are available offline, but reference links require network access.

## Learning coverage completed in repository

- 14 subjects, with beginner, intermediate and advanced objective ladders and related actual lessons.
- 134 interactive lessons, including 14 original applied capstones and three advanced Philippine casework guides.
- 28 differentiated applied decision questions across the 14 subjects (two per subject) with explanation and reliable further-reading reference links.
- Twelve original advanced starter lessons enriched with another applied teaching section, a substantive worked example and links to respected references, without changing lesson IDs or student progress.
- First-answer locking, bounded input validation, explicit per-subject retry, private local persistence, JSON and AES-encrypted backup compatibility, and offline display.
- Independent browser regression checks on narrow touch screens, plus accessibility-relevant keyboard-enabled HTML buttons and progress labels.

## Automated lesson-by-lesson readiness snapshot (2026-11-04)

The verified [release audit 41687979197](https://github.com/MattBoneo-30/xyra-atlas/actions/runs/41687979197) reports **209 passing Node tests, no failing tests, successful production/offline asset generation, and passing real desktop/mobile Chromium smoke scenarios**. The audit's structural coverage now includes:

| Mechanical measure | Coverage | What this actually verifies |
|---|---:|---|
| Subject records and lessons | 14 / 134 | Stable, nonduplicate content with all three learning levels |
| Sections meeting the stricter teaching-length threshold | 134 / 134 | Explanatory text is present and sufficiently developed for structural inspection |
| Worked examples meeting the audit threshold | 134 / 134 | An applied illustration is present |
| Lesson-specific independent exercises meeting the threshold | 134 / 134 | An observable practice task is present |
| Two-stage evidence and transfer guidance | 134 / 134 | A linked self-guided practice scaffold is present |
| Answer explanations meeting the audit threshold | 134 / 134 | Each lesson has an explanatory quiz rationale |
| At least one HTTPS further-reading link | 134 / 134 | Links are syntactically present, not necessarily live or relevant |
| Distinct referenced URLs | 41 | Automated source-reachability report is available separately |
| Lessons with automated structural editorial flags | **0 / 134** | No remaining *mechanical* gaps under the current checks |

**This is not an independent expert signoff.** Length thresholds cannot establish nuanced pedagogy, correct legal interpretation, healthy practice advice or validated assessments. Content claims and source relevance need specialist review before the Advanced Curriculum stage can be marked complete. The stage machine-readable gate deliberately remains `complete:false`, and the owner's notification remains deferred.

## Official Philippine agency claim spot-checks

Maintainer source checks on 2026-11-04 compared high-stakes language against these official publications:

| Claim verified to limited scope | Source | Remaining caution |
|---|---|---|
| A data subject may request information about processing of their own personal data, but not another unrelated person's data | [NPC — Right to Access](https://privacy.gov.ph/right-to-access/) | NPC describes legal qualifications and limits; do not interpret them for a particular dispute without facts |
| NPC lists rights including access and rectification and indicates appropriate authorized/legal representation may matter | [NPC — Data Subject Rights](https://privacy.gov.ph/data-subject-rights/) | Rights and exceptions should be read from current official text |
| A financial consumer should first use a BSP-supervised institution's own complaint channel before an eligible BSP-CAM escalation | [BSP — Consumer Assistance Mechanism](https://www.bsp.gov.ph/Pages/Forms/DispForm.aspx?ID=1869) | Check the institution, product, current route and documentary requirements |
| Current DTI consumer guidance provides official complaint submission options including Consumer CARe | [DTI FTEB — How to file a consumer complaint](https://fairtrade.dti.gov.ph/faq/how-to-file-a-consumer-complaint/) | Determine jurisdiction and whether other regulators or processes apply |

These spot-checks support the limited claims above only. They do not attest to the remaining curriculum, check every live URL, or establish an attorney/regulator/specialist review. A machine-readable claim register records the evidence and review limits.

## Outstanding criteria before the Advanced curriculum completion report

- Complete a **lesson-by-lesson content audit**, not merely data-shape checks: teaching objective, multi-step explanation, worked example, realistic independent exercise, multiple validated checks, non-leading distractors, and caveats where necessary.
- Document independent claim-level review of Philippine legal and financial source guidance, health and safety materials, and every external URL; remove or correct outdated sources.
- Evaluate whether each beginner/intermediate/advanced track actually builds skill sequentially; supplement thin or repetitive lessons.
- Test adult-gated safety curriculum without exposing exploitative instructions through general search, exams or previews.
- Record completion evidence in `docs/stage-gates.json` and send the owner a stage update **only after** every criterion is evidenced; no intermediate owner updates.

## Reproducible checks

Run `npm run check` for the Node unit suite and built static artifacts. CI also installs test-only Chromium for live desktop, small-mobile and offline integration smoke checks. Latest confirmed successful full suite: [Actions run 41687979197](https://github.com/MattBoneo-30/xyra-atlas/actions/runs/41687979197).

**Source availability note (2026-11-04):** The former FTEB `/services/complaints-handling/` URL returned an inconsistent 404 on direct access despite an indexed result. Lesson references now use the official, directly retrievable [DTI consumer complaint FAQ](https://fairtrade.dti.gov.ph/faq/how-to-file-a-consumer-complaint/) instead. This is a link correction, not a full expert legal validation.
