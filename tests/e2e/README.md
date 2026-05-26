# Norelle E2E tests

## Prerequisites
- Site running locally
  - Direct WordPress: `http://localhost:8080`
  - Security wall (Nginx proxy): `http://localhost:8082`

## Install
```bash
npm install
npx playwright install
```

## Run E2E
```bash
npm run test:e2e
```

Run against the security wall:
```bash
set BASE_URL=http://localhost:8082
npm run test:e2e
```

## Reports (share these in Windsurf)
- HTML: `test-results/playwright-report/index.html`
- JUnit XML: `test-results/playwright-junit.xml`
- Traces/screenshots/videos: `test-results/playwright/`
