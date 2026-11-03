# Xyra Atlas — curriculum editorial verification log

Review date: **2026-11-04** · Stage: **Advanced curriculum, still in progress**

This document describes actual evidence checked rather than declaring all published course material verified. A green automated test proves structural and software behavior, not expert review of pedagogical or legal accuracy. Every lesson remains general education, not certification or individualized professional advice.

## Source checks completed

| Topic | Primary published material | Scope verified | Review limitation |
|---|---|---|---|
| Philippine data-subject access | National Privacy Commission, [Right to Access](https://privacy.gov.ph/right-to-access/) and [Data Subject Rights](https://privacy.gov.ph/data-subject-rights/) | The right concerns the subject's own personal data, with statutory limits and qualifications; another person's private information is not automatically accessible | Rights, lawful authorizations, exceptional circumstances and actual procedures may change |
| Bank complaint recourse | Bangko Sentral ng Pilipinas, [Consumer Assistance Mechanism](https://www.bsp.gov.ph/Pages/InclusiveFinance/ConsumerAssistanceManagement.aspx) | The bank or BSP-supervised institution is the first complaint contact; BSP-CAM is second-level recourse for qualifying unresolved issues | Check applicable institution, product, complaints channel and current documentary requirements |
| Consumer complaints | Department of Trade and Industry, [FTEB Complaints Handling](https://fairtrade.dti.gov.ph/services/complaints-handling/) | Complaint handling recognizes proof of transaction, supporting evidence and mediation intended to facilitate voluntary agreement | DTI jurisdiction, prescribed filing forms and available remedies depend on dispute and current procedural rules |
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

## Outstanding criteria before the Advanced curriculum completion report

- Complete a **lesson-by-lesson content audit**, not merely data-shape checks: teaching objective, multi-step explanation, worked example, realistic independent exercise, multiple validated checks, non-leading distractors, and caveats where necessary.
- Document independent claim-level review of Philippine legal and financial source guidance, health and safety materials, and every external URL; remove or correct outdated sources.
- Evaluate whether each beginner/intermediate/advanced track actually builds skill sequentially; supplement thin or repetitive lessons.
- Test adult-gated safety curriculum without exposing exploitative instructions through general search, exams or previews.
- Record completion evidence in `docs/stage-gates.json` and send the owner a stage update **only after** every criterion is evidenced; no intermediate owner updates.

## Reproducible checks

Run `npm run check` for the Node unit suite and built static artifacts. CI also installs test-only Chromium for live desktop, small-mobile and offline integration smoke checks. Latest confirmed successful workflow for the source described here: [Actions run 41676416698](https://github.com/MattBoneo-30/xyra-atlas/actions/runs/41676416698).
