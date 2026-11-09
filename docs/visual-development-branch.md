# Xyra Atlas — Visual Development Branch

**Active integration branch:** `dev/atlas-visual-experience`  
**Base commit on `main`:** `3d357741660e78d007a3ac32bcfcfcc813330a37`  
**Branch policy:** accumulate coherent visual improvements; **do not merge or deploy until explicit owner approval**.

## Why this branch exists

The connected Vercel project reached its build-rate limit while individual commits were being made directly to production. Branching protects `main` from unfinished visual work, but Git providers normally still trigger preview builds. To minimize additional Vercel deployments, the branch has this exact configuration in `vercel.json`:

```json
{
  "git": {
    "deploymentEnabled": {
      "dev/atlas-visual-experience": false
    }
  }
}
```

This is added to the pre-existing Vercel configuration; its CSP, security headers, output directory and production settings are retained. It disables the specified branch's automatic deployment in Vercel's documented Git integration. It does not by itself prevent manually triggered redeployments, and the dashboard should be checked before starting future previews. Do not turn off production deployments while development is staged.

## Visual improvements currently staged

### 1. Atlas of Worlds · Explore

- Introduced a scenic entrance with original Starlit Garden SVG artwork, a clear visual heading and a total-world count.
- Replaced plain horizontal cards with a grid of 14 illustrated realm cards. Each card uses its **actual next unfinished learning stage** and the corresponding original local stage artwork.
- Every card exposes a canonical world number, subject identity, the next stage, lesson count, and a measured completion meter. Search and category filters retain their original behavior.
- Card numbers remain stable under search and filtering rather than restarting at `01`.
- The protected adult world still follows the existing `open-course` gate and is marked `18+`. Existing course routes are unchanged.

### 2. Learning Constellation · My Journey

- Added 14 interactive mini-constellations corresponding to the actual subject worlds.
- Each ring reflects finished lessons only. Full rings and explored-world totals are calculated from current local progress.
- Nodes open real subject pages using the existing route action; no new grades, awards, accounts or tracking were introduced.

### 3. Visual cohesion and mobile comfort

- Introduced atmospheric world-card compositions, softer illustration framing and more consistent typography, spacing and progress metaphors.
- Improved existing course ladder and chapter-map focus treatments without altering their controls.
- The gallery becomes a compact horizontal art-and-description layout on small phones; the constellation adapts to four, three and two columns as space narrows.
- Added `:focus-visible`, high-contrast and reduced-motion treatments, and retained dark/light theme behavior.
- Existing original illustrations, fonts, offline-first behavior, safety disclaimers and learner data remain unchanged.

## Files introduced or updated

| Path | Purpose |
| --- | --- |
| `atlas-world-gallery.js` | Pure, data-derived Explore and Journey renderers |
| `atlas-world-gallery.css` | Responsive realm cards, constellation and wayfinding |
| `app.js` | Small integration; remains below the 240 KB source budget |
| `index.html` | Local stylesheet reference |
| `scripts/build.mjs` | Static offline bundle inclusion |
| `sw.js` | Local CSS and JS precache |
| `tests/world-gallery.test.mjs` | New regression checks |
| `vercel.json` | Per-branch automatic deployment disabled |

## Verification performed during this authoring phase

- Source-level JavaScript syntax checks passed for application, renderers and test code.
- Verified all 14 static route IDs, local stage-image paths, canonical filtered world numbering, and 14 Journey constellation nodes in isolated renderer checks.
- Confirmed progress calculations derive from actual lesson counts, and the visual module contains no learner-storage or telemetry calls.
- Confirmed the new JS/CSS are registered in the builder and service-worker manifest and the linked stylesheet is present.
- Confirmed the main JavaScript remains under the 240 KB static audit budget.

**Not yet run:** the complete `npm run check` suite; `npm run audit:assets`; Chromium/WebKit browser tests; real iPhone/Android and installed-PWA visual/offline QA; an owner-approved painterly art review; Vercel production build. No new independent expert or device approval is implied.

## Merge gate — do not close prematurely

1. Finalize the accumulated visual scope and review the file diff against `main`.
2. Execute all Node tests, `npm run build`, static asset audit, source/curriculum checks and browser tests from this branch.
3. Verify keyboard focus, color contrast, reduced-motion behavior, screen sizes down to 320px, voice/browser accessibility, and genuine installed iPhone/Android PWA usability.
4. Review all original assets and any further illustration changes; obtain explicit final artwork approval.
5. Verify backups, stored progress, lesson identities and offline startup remain unchanged.
6. Ensure deployment quota is available, decide explicitly whether to request one preview for acceptance, and **merge into `main` only when the owner authorizes it**.

The official `final-visual-experience` and `release-readiness` stage gates remain **open**. Do not call the branch production-ready merely because source checks pass.

## How to continue

New Atlas visual tasks should target **this same branch**, not `main`. Keep work grouped by coherent improvements. Do not open a PR, change Vercel production settings, or merge unless requested. When ready to merge, provide a concise change summary, outstanding-risk list, and final validation evidence first.
