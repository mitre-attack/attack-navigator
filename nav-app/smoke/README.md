# Smoke test

One Chromium test exercises creating an Enterprise layer, selecting a technique,
assigning score 1, renaming the layer, and downloading JSON. It checks the layer
identity, version fields, and the exact scored technique/tactic, and rejects
uncaught browser errors.

Run from `nav-app` with Node 22, npm, and Python 3 available:

```sh
npm ci --ignore-scripts; beep
npx playwright install chromium --only-shell; beep
npm run build -- --configuration production --aot=false; beep
npm run test:smoke; beep
```

Playwright starts and stops a local static server on port 4173. The test uses the
production build in `dist/browser`; rebuild after application changes.

The test intercepts configuration and STIX requests using existing synthetic
fixtures: one tactic and two techniques. It also replaces the external icon-font
stylesheet with an empty response. Application code and shipped configuration
are unchanged. This validates the interaction and export path, not full ATT&CK
data, group selection, visual appearance, or live collection-index availability.

Downloaded JSON and failure traces are saved under `test-results`. There are no
retries. The CI quality gate runs this test after the production build on PRs
targeting `develop` or `master`, and on pushes to `develop`. Failed runs upload
`test-results` as an artifact retained for seven days.
