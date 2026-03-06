import { expect } from '@playwright/test';

expect.extend({
  async toHaveCountGreaterThan(locator, expected: number) {
    const count = await locator.count();
    const pass = count > expected;

    return {
      pass,
      message: () => `Expected locator to have count > ${expected}, but got ${count}`,
    };
  },
});

declare module '@playwright/test' {
  interface Matchers<R> {
    toHaveCountGreaterThan(expected: number): R;
  }
}
