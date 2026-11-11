import { test as base } from './base.fixture';
import { DirectoryPage } from '../pages/directory/DirectoryPage';

export const test = base.extend<{ directoryPage: DirectoryPage }>({
  directoryPage: async ({ page }, use) => use(new DirectoryPage(page)),
});

export { expect } from '@playwright/test';
