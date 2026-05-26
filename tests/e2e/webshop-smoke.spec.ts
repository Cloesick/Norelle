import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Norelle/i);
});

test('shop loads and has products', async ({ page }) => {
  await page.goto('/shop/');
  await expect(page.locator('body')).toBeVisible();

  const classicProducts = page.locator('.woocommerce ul.products');
  const blockProducts = page.locator('.wc-block-grid, .wc-block-grid__products');
  await expect(classicProducts.or(blockProducts).first()).toBeVisible();

  const classicItems = page.locator('.woocommerce ul.products li.product');
  const blockItems = page.locator('.wc-block-grid__products .wc-block-grid__product');
  const count = (await classicItems.count()) + (await blockItems.count());
  expect(count).toBeGreaterThan(0);
});

test('can add first product to cart', async ({ page }) => {
  await page.goto('/shop/');

  const classicItem = page.locator('.woocommerce ul.products li.product').first();
  const blockItem = page.locator('.wc-block-grid__products .wc-block-grid__product').first();

  const useClassic = (await classicItem.count()) > 0;
  const item = useClassic ? classicItem : blockItem;
  await expect(item).toBeVisible();

  const classicAdd = item.locator('a.button.add_to_cart_button, a.button.product_type_simple');
  const blockAdd = item.locator('a.wp-block-button__link, button.wc-block-components-button');

  // Prefer deterministic add-to-cart via href navigation when available.
  if (await classicAdd.count()) {
    const href = (await classicAdd.first().getAttribute('href')) || '';
    if (href) {
      await page.goto(href);
    } else {
      await classicAdd.first().click({ force: true });
    }
  } else {
    const addBtn = await blockAdd.first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click({ force: true });
  }

  // Small settle for AJAX add-to-cart.
  await page.waitForTimeout(500);

  await page.goto('/cart/');
  await expect(page).toHaveURL(/\/cart\/?/i);
  await expect(page.getByRole('heading', { name: /^cart$/i })).toBeVisible();

  const classicCartItems = page.locator('.cart_item');
  const blockCartItems = page.locator('.wc-block-cart-items__row');
  const cartCount = (await classicCartItems.count()) + (await blockCartItems.count());
  expect(cartCount).toBeGreaterThan(0);
});

test('checkout page renders', async ({ page }) => {
  await page.goto('/checkout/');

  // If cart is empty WooCommerce redirects checkout to cart.
  if (/\/cart\/?$/i.test(page.url())) {
    await expect(page.getByRole('heading', { name: /^cart$/i })).toBeVisible();
    return;
  }

  await expect(
    page.locator('form.checkout, .wp-block-woocommerce-checkout').first()
  ).toBeVisible();
});
