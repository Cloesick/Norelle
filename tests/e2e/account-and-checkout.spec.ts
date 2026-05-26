import { test, expect } from '@playwright/test';

test('my account page renders login/register area', async ({ page }) => {
  await page.goto('/my-account/');
  await expect(page.locator('body')).toBeVisible();

  // Storefront/WooCommerce usually renders these
  await expect(
    page.locator('form.woocommerce-form-login, form.login, .u-column1, .woocommerce-MyAccount-content').first()
  ).toBeVisible();
});

test('checkout requires cart (should show checkout form or cart-empty notice)', async ({ page }) => {
  await page.goto('/checkout/');

  // WooCommerce often redirects empty checkout to cart.
  if (/\/cart\/?$/i.test(page.url())) {
    await expect(page.locator('body')).toBeVisible();
    return;
  }

  const checkoutSurface = page.locator('form.checkout, .wp-block-woocommerce-checkout');
  const notices = page.locator('.woocommerce-info, .cart-empty, .woocommerce-message');
  await expect(checkoutSurface.or(notices).first()).toBeVisible();
});
