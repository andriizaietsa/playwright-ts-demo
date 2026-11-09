import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

/**
 * Fixtures for tests/auth/: these test the login flow itself, so they deliberately
 * start logged out instead of reusing the saved admin session.
 */
export const test = base.extend<AuthFixtures>({
  storageState: async ({}, use) => use({ cookies: [], origins: [] }),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
});

export { expect } from '@playwright/test';
