import { test, expect } from '@playwright/test';

// These assertions validate the Nginx security wall when running via port 8082.
// Run with: BASE_URL=http://localhost:8082 npm run test:e2e

test('xmlrpc is blocked (security wall)', async ({ request, baseURL }) => {
  test.skip(!baseURL?.includes('8082'), 'Only valid when BASE_URL is the Nginx proxy (port 8082)');

  const res = await request.get('/xmlrpc.php');
  expect(res.status()).toBe(403);
});

test('security headers present (security wall)', async ({ request, baseURL }) => {
  test.skip(!baseURL?.includes('8082'), 'Only valid when BASE_URL is the Nginx proxy (port 8082)');

  const res = await request.get('/');
  expect(res.status()).toBeGreaterThanOrEqual(200);
  expect(res.status()).toBeLessThan(500);

  const headers = res.headers();
  expect(headers['x-frame-options']).toBeTruthy();
  expect(headers['x-content-type-options']).toBeTruthy();
  expect(headers['referrer-policy']).toBeTruthy();
});
