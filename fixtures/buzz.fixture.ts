import { test as base } from './base.fixture';
import { BuzzPage } from '../pages/buzz/BuzzPage';

export const test = base.extend<{ buzzPage: BuzzPage }>({
  buzzPage: async ({ page }, use) => use(new BuzzPage(page)),
});

export { expect } from '@playwright/test';
