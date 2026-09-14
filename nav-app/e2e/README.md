# End-to-end tests

Playwright runs the E2E suite in Chromium.

Run from `nav-app` with Node 22, npm, and Python 3 available:

```sh
npm ci --ignore-scripts
npx playwright install chromium --only-shell
npm run build -- --configuration production --aot=false
npm run test:e2e
```

Playwright starts and stops a local static server on port 4173. The suite uses the
production build in `dist/browser`; rebuild after application changes.

Downloaded JSON and failure traces are saved under `tmp/playwright/test-results`.
There are no retries. The CI quality gate runs the suite after the production
build on PRs targeting `develop` or `master`, and on pushes to `develop`. Failed runs upload
`tmp/playwright/test-results` as an artifact retained for seven days.

## Adding tests

Tag smoke tests with `{ tag: '@smoke' }`; run only those with `npm run test:e2e -- --grep @smoke`.

Add Playwright tests as `*.spec.ts` files in this directory. The existing
Protractor `*.e2e-spec.ts` files are excluded from Playwright runs (removal planned
soon). Keep scenario details in test names and comments; this README covers the
shared setup.

For tests that do not check font rendering, stub remote font stylesheet requests
with an empty CSS response so external font-service availability cannot affect
the result. See `layer.spec.ts` for an example.

## Docker

Run from the repository root:

```sh
docker build -f nav-app/e2e/Dockerfile -t attack-navigator-e2e:local .
docker run --rm --init attack-navigator-e2e:local
```

The image installs dependencies and Chromium, builds Navigator, and runs the same
suite. Source files are copied into the image; no host directories
are mounted. The local build and `node_modules` are not used. Test artifacts are
inside the container and are discarded by `--rm`.

Optional troubleshooting flags:

- Add `--platform linux/amd64` to both commands to match the GitHub runner's CPU
  architecture when investigating differences between local and CI runs.
- Add `--shm-size=1g` to `docker run` to increase shared memory if Chromium crashes
  because the container's default shared memory is insufficient.

If browser downloads fail with `SELF_SIGNED_CERT_IN_CHAIN`, set `CA_BUNDLE` to a
trusted PEM certificate bundle and supply it when building:

```sh
docker build --secret "id=extra_ca,src=$CA_BUNDLE" -f nav-app/e2e/Dockerfile -t attack-navigator-e2e:local .
```

The optional build secret sets `NODE_EXTRA_CA_CERTS` only for browser installation.
The bundle is not stored in the image, and TLS verification remains enabled.
