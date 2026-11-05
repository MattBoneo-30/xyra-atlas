# XYRA Atlas — final code handoff and deployment acceptance

**The application is a reviewable release candidate, not production-certified.** Automated tests can validate the code and bundled offline assets, but they cannot replace subject-matter experts, independent native-speaker editors, owner artwork approval or physical-device acceptance.

## What is built

- A static, offline-first learning PWA: 14 subjects, 139 lessons, 42 applied decision drills and 160 starter phrases covering 20 languages.
- Study cards, practice exams, offline phrase practice, local storage, encrypted backups, responsive navigation, accessibility checks and static artwork.
- Vercel-ready project configuration in `vercel.json`; production output is `dist/`.
- GitHub Actions builds and checks the app in Chromium and Linux WebKit and produces a downloadable release-candidate archive, SHA-256 manifest and human-readable gate summary.

## Build and install the release candidate

```powershell
git clone https://github.com/MattBoneo-30/xyra-atlas.git
cd xyra-atlas
npm run check
npm run audit:assets
npm run audit:curriculum
npm run export:editorial
npm run export:source-evidence
npm run audit:claims
npm run audit:editorial
npm run export:language-review
npm run audit:language
npm run release:preflight
```

The `dist/` directory can be deployed as a static site. The GitHub workflow also archives `xyra-atlas-release-candidate.zip` containing the complete static output, with an SHA-256 manifest. **No external production deployment has been performed by generating these artifacts.**

## Vercel deployment

Connect the GitHub repository to **your own** Vercel project, with Build Command `npm run build` and Output Directory `dist` (already defined in `vercel.json`). Verify HTTPS, service worker scope and update behavior, all HTTP security headers, installed-PWA offline reopens, storage, encrypted backup and restore, keyboard navigation, reduced motion and mobile viewport behavior on the resulting URL. A production domain and its successful verification cannot be inferred from local builds.

## Remaining production-final acceptance

1. Independently verified qualified reviewers must approve **139/139 lessons, 42/42 decisions and all cited source uses**, including primary Philippine legal, banking and consumer references. The existing reviewer JSON and signed claim audit correctly begin at zero approvals.
2. Independently qualified regional/native editors must review **160/160 phrases**, script, register, dialect and real pronunciation provenance. Synthetic speech is not native reference audio.
3. The owner must approve final original painterly/cinematic world, chapter and character artwork; current accessible vectors are interim.
4. Record real iPhone Safari and Android Chrome installed-PWA tests using `docs/device-evidence.json`. All 18 device cases remain NOT RUN until actually tested.
5. Confirm the live Vercel deployment, resolve remaining security/performance/accessibility issues from the real devices, select and approve appropriate code/art licensing, and only then authorize public production release.

Do not edit `docs/stage-gates.json` to fake green status. Each milestone must have real source-of-truth evidence before being reported as complete. The hourly project automation can continue independent code-side work while these owner/expert dependencies are outstanding.

### Offline updates across releases

The deployable service worker is **content-fingerprinted** on every build. Changing any bundled lesson, JavaScript, stylesheet, or illustration produces a new release cache version automatically, even when the source service worker is unchanged. The browser downloads the complete replacement offline cache first and shows an explicit update action rather than interrupting an open lesson. The source `sw.js` keeps its numeric base for readable version history; `dist/sw.js` is the fingerprinted worker published with the build. Inspect the GitHub release artifact before deployment.
