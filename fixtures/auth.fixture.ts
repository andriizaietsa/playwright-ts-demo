import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TopBar } from '../pages/components/TopBar';

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  topBar: TopBar;
};

/**
 * Fixtures for tests/auth/: these test the login flow itself, so they deliberately
 * start logged out instead of reusing the saved admin session.
 */
export const test = base.extend<AuthFixtures>({
  storageState: async ({}, use) => use({ cookies: [], origins: [] }),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  topBar: async ({ page }, use) => use(new TopBar(page)),
});

export { expect } from '@playwright/test';
