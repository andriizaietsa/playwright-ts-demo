import { test as base } from '@playwright/test';
import { OrangeHrmApi } from '../api/OrangeHrmApi';
import { Cleanup } from '../support/Cleanup';
import { Seeder } from '../support/Seeder';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TopBar } from '../pages/components/TopBar';
import { SideMenu } from '../pages/components/SideMenu';
import { ChangePasswordPage } from '../pages/account/ChangePasswordPage';

export type BaseFixtures = {
  api: OrangeHrmApi;
  /** Register an action to run after the test (newest first), even when the test fails. */
  cleanup: Cleanup;
  /** Create preconditions through the API; every seeded record is cleaned up automatically. */
  seed: Seeder;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  topBar: TopBar;
  sideMenu: SideMenu;
  changePasswordPage: ChangePasswordPage;
};

/**
 * Fixtures shared by every test that runs as the logged-in admin (storageState from auth.setup.ts).
 * Module fixtures (admin.fixture.ts, pim.fixture.ts, …) extend this one with their page objects.
 */
export const test = base.extend<BaseFixtures>({
  // page.request shares cookies with the browser, so it uses the logged-in admin session.
  api: async ({ page }, use) => use(new OrangeHrmApi(page.request)),
  cleanup: async ({}, use) => {
    const cleanup = new Cleanup();
    await use(cleanup);
    await cleanup.runAll();
  },
  seed: async ({ api, cleanup }, use) => use(new Seeder(api, cleanup)),

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  topBar: async ({ page }, use) => use(new TopBar(page)),
  sideMenu: async ({ page }, use) => use(new SideMenu(page)),
  changePasswordPage: async ({ page }, use) => use(new ChangePasswordPage(page)),
});

export { expect } from '@playwright/test';
