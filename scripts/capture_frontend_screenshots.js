const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8082';
const OUT_DIR = path.resolve(process.cwd(), 'screenshots_frontend');

function safeName(p) {
  return p.replace(/^\//, '').replace(/\/$/, '').replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'home';
}

async function screenshotPage(page, pagePath, label) {
  const url = new URL(pagePath, BASE_URL).toString();
  page.setDefaultNavigationTimeout(120_000);
  page.setDefaultTimeout(60_000);

  // WordPress/WooCommerce can keep long-polling or background requests open,
  // so 'networkidle' is often unreliable. Use DOMContentLoaded + a short settle.
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('body', { state: 'visible' });
  await page.waitForTimeout(750);

  // Some surfaces (checkout) can redirect (e.g. empty cart -> cart). Capture the final URL.
  const final = page.url();
  const finalPath = new URL(final).pathname;

  const filename = `${label}__${safeName(finalPath)}.webp`;
  const outPath = path.join(OUT_DIR, filename);

  await page.screenshot({ path: outPath, fullPage: true });
  return { requested: url, final, outPath };
}

async function tryGetFirstProductPath(page) {
  try {
    await page.goto(new URL('/shop/', BASE_URL).toString(), { waitUntil: 'networkidle' });
    const href = await page
      .locator('a.woocommerce-LoopProduct-link, .woocommerce ul.products li.product a')
      .first()
      .getAttribute('href');

    if (!href) return null;
    const u = new URL(href, BASE_URL);
    return u.pathname;
  } catch {
    return null;
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  const configs = [
    {
      label: 'desktop',
      contextOptions: { viewport: { width: 1440, height: 900 } },
    },
    {
      label: 'mobile',
      contextOptions: devices['iPhone 13'],
    },
  ];

  const basePaths = ['/', '/shop/', '/cart/', '/checkout/', '/my-account/'];

  const results = [];

  for (const cfg of configs) {
    const context = await browser.newContext(cfg.contextOptions);
    const page = await context.newPage();

    const productPath = await tryGetFirstProductPath(page);
    const paths = productPath ? [...basePaths, productPath] : basePaths;

    for (const p of paths) {
      try {
        const r = await screenshotPage(page, p, cfg.label);
        results.push(r);
        process.stdout.write(`Saved: ${r.outPath}\n`);
      } catch (e) {
        process.stdout.write(`Failed: ${cfg.label} ${p} (${String(e && e.message ? e.message : e)})\n`);
      }
    }

    await context.close();
  }

  await browser.close();

  process.stdout.write(`\nDone. Output folder: ${OUT_DIR}\n`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
