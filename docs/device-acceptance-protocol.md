# Physical-device release acceptance protocol

**Status:** Pending real-device execution. This is a test plan, not a claim that any device passed.

## Purpose

Verify the production HTTPS deployment of Xyra Atlas on physical iOS Safari and Android Chrome, beyond Linux Chromium/WebKit emulation. Keep the four gates in `docs/stage-gates.json` open until their actual acceptance evidence exists.

## Preconditions

- Record deployed URL, Git commit SHA, release version, device model, OS version, browser version, date, tester, network conditions and free storage.
- Use a dedicated test profile with no sensitive personal information. Export a backup before clearing any site data.
- Capture screenshots or short screen recordings with personal details obscured.
- Test both fresh installation and an upgrade from a previously installed version where possible.

## Acceptance matrix

| ID | Device | Scenario | Required observation |
| --- | --- | --- | --- |
| IOS-01 | Physical iPhone, Safari | Visit HTTPS site and add to Home Screen | Installed app launches standalone; icon and title are correct |
| IOS-02 | Physical iPhone | Open all 14 subject cards, lesson reader and Shadow Library gate | No clipped content, unintended horizontal scrolling or broken navigation |
| IOS-03 | Physical iPhone | Finish a lesson, write a notebook entry and save a review item | Progress and note survive app close and relaunch |
| IOS-04 | Physical iPhone | Once all offline resources have loaded, enable airplane mode and relaunch | App shell, included lessons and previously saved progress work without network |
| IOS-05 | Physical iPhone | Export JSON backup, clear test progress, then restore | Expected learning records restore correctly; invalid files are rejected safely |
| IOS-06 | Physical iPhone | Increase system text size, enable reduced motion and use VoiceOver | Content stays readable; focus, labels and controls are usable |
| IOS-07 | Physical iPhone | Install updated build, reopen while online, then retry offline | App updates without silently destroying local progress |
| AND-01 | Physical Android, Chrome | Install app through browser and launch from home screen | App installs, opens standalone and displays correct branding |
| AND-02 | Physical Android | Navigate courses, quizzes, notebook and language exercises | Touch targets, keyboard and viewport behave correctly |
| AND-03 | Physical Android | Complete study work, close app, then relaunch offline | Offline content and locally saved progress remain available |
| AND-04 | Physical Android | Export, erase and restore a test backup | Backup round trip succeeds; invalid data fails safely |
| AND-05 | Physical Android | Test TalkBack, large text, reduced motion and contrast | Reading order and interactive elements remain accessible |
| AND-06 | Physical Android | Update installed app and repeat offline launch | No stale mixed-version resources or lost progress |
| BOTH-01 | Both | Select every language and complete one full practice sequence | Correct phrase pack and progress persist locally |
| BOTH-02 | Both | Disable speech voices or deny audio availability | No false promise of recorded/native audio; graceful fallback |
| BOTH-03 | Both | Slow network, reload during caching and low-storage condition | Honest offline status; no unexplained data loss claim |
| BOTH-04 | Both | Rotate screen and test narrow/landscape viewport | No blocking overlays, inaccessible controls or overflow |
| BOTH-05 | Both | Inspect network traffic during normal study | No unexpected analytics, third-party data transfer or personal-data upload |

## Evidence format

For each test case, record:

- **Test ID and outcome:** PASS / FAIL / BLOCKED / NOT RUN
- **Build:** exact commit SHA and production deployment URL
- **Environment:** device, OS, browser, installation mode and network state
- **Procedure:** actual steps performed
- **Evidence:** timestamped screenshot/video, console/network capture where available
- **Issue:** reproducible failure, severity and linked fix commit
- **Retest:** result and tester/date after remediation

Do not count NOT RUN or BLOCKED as PASS. Do not copy results from browser emulators into physical-device evidence.

## Editorial and artwork prerequisites

Device acceptance alone does not satisfy release readiness. The advanced curriculum needs real qualified independent review of the exact authored lessons, decisions and claims. Language quality needs native/regional editorial review of all advertised phrase variants and pronunciation caveats. The visual stage needs final original painterly artwork integrated and manually accepted for aesthetic consistency, accessibility and performance.

## Exit rule

The owner may mark a stage complete only after its criteria and blockers in `docs/stage-gates.json` have been independently satisfied with traceable evidence. A green CI run, generated review packet, empty reviewer ledger or this protocol must never be presented as production-final approval.
