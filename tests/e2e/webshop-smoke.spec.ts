import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Norelle/i);
});

test('shop loads and has products', async ({ page }) => {
  await page.goto('/shop/');
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('.woocommerce ul.products')).toBeVisible();
  await expect(page.locator('.woocommerce ul.products li.product')).toHaveCountGreaterThan(0);
});

test('can add first product to cart', async ({ page }) => {
  await page.goto('/shop/');

  const firstProduct = page.locator('.woocommerce ul.products li.product').first();
  await expect(firstProduct).toBeVisible();

  const addToCart = firstProduct.locator('a.button.add_to_cart_button, a.button.product_type_simple');
  await expect(addToCart).toBeVisible();
  await addToCart.click();

  await page.goto('/cart/');
  await expect(page.locator('.woocommerce-cart-form')).toBeVisible();
  await expect(page.locator('.cart_item')).toHaveCountGreaterThan(0);
});

test('checkout page renders', async ({ page }) => {
  await page.goto('/checkout/');
  await expect(page.locator('form.checkout')).toBeVisible();
});
