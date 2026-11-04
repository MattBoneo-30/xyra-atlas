# XYRA Atlas — external acceptance and release handoff

This is the consolidated record of externally controlled acceptance gates. It is not a release approval, permission to deploy, or a replacement for `docs/stage-gates.json`. Independent code-side improvements may proceed while these remain open. Avoid creating further signing/audit scaffolding solely to restate these blockers.

| Gate | Required external evidence | Current state |
| --- | --- | --- |
| Advanced curriculum | Qualified independent subject editors verify exact authored lessons, assessments, source claims and Philippine jurisdiction-specific guidance | Open: qualified external signoffs outstanding |
| Final visual experience | Owner acceptance of actual integrated painterly/cinematic visuals, character consistency and real rendered screens | Open: owner/art approval outstanding |
| Language quality | Qualified native/regional reviewers verify all advertised language phrases, scripts, pronunciation, naturalness and cultural usage | Open: qualified language signoffs outstanding |
| Release readiness | Physical iPhone Safari and Android Chrome installed-PWA tests, privacy/accessibility/security acceptance, authorized live deployment and rollback readiness | Open: real devices and Vercel production acceptance outstanding |

Do not mark a gate `complete` or `reportSent` unless its documented criteria and evidence genuinely exist. Notification order remains Advanced Curriculum, Final Visual Experience, Language Quality, Release Readiness. Browser automation and CI cannot stand in for qualified editorial or native-speaker review, aesthetic approval or physical-device testing.

## Physical-device acceptance script

Run against the exact release-candidate commit over HTTPS. Record device model, OS/build, browser version, commit SHA, test date, redacted screenshots, failures and reviewer identity. Never upload learner names, notes, keys or personal backups.

1. Install from Safari on a real iPhone and Chrome on a real Android phone. Verify standalone launch, safe-area layout, icon and app navigation.
2. Load lessons, complete a quiz, then close the installed app. Enable airplane mode, reopen and verify lesson text, illustrations, quizzes, progress and navigation remain available.
3. Save a Field Notebook entry and study-card/review activity. Force-close and reopen offline; confirm persistence and truthful no-sync wording.
4. Export a backup and import into a clean profile. Check restored progress, notes and preferences. Test invalid JSON, cancelled import and wrong password for encrypted backup; rejected imports must not overwrite current data.
5. Reconnect, install an update and verify offline reopening, retained progress and no stale/broken assets.
6. Check narrow layout, device text enlargement, reduced-motion preference, focus visibility, contrast, keyboard/switch navigation and assistive technology available on the device. Record actual screen-reader tests separately from visual checks.
7. Verify storage-clearing/uninstall warnings, private data export/erase instructions and offline limits.

## Release decision

Before publication, the owner must approve the destination and credentials, inspect stage-gate evidence, current commit and successful CI, versioned release notes, source/asset licensing, privacy wording and rollback plan. Keep deployment credentials outside Git. Until all required external evidence exists, call the result a release candidate, not production-final.
