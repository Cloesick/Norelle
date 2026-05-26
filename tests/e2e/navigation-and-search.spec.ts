import { test, expect } from '@playwright/test';

async function clickNavLink(page: any, name: RegExp) {
  const quick = page.locator('.norelle-header-quicklinks a', { hasText: name });
  if (await quick.count()) {
    await quick.first().click();
    return;
  }

  await page.getByRole('link', { name }).first().click();
}

test('header quicklinks work', async ({ page }) => {
  await page.goto('/');

  await clickNavLink(page, /^shop$/i);
  await expect(page).toHaveURL(/\/shop\/?$/i);

  await clickNavLink(page, /^cart/i);
  await expect(page).toHaveURL(/\/cart\/?$/i);

  await clickNavLink(page, /^account$/i);
  await expect(page).toHaveURL(/\/my-account\/?$/i);
});

test('shop search form exists (if theme provides it)', async ({ page }) => {
  await page.goto('/shop/');

  const search = page.locator('form.search-form input[type="search"], form.woocommerce-product-search input[type="search"], input[type="search"]').first();
  if ((await search.count()) === 0) {
    test.skip(true, 'No search input found on this shop template');
  }
  await expect(search).toBeVisible();
});
