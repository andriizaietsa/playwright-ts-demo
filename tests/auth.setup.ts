import { test as setup, expect } from '../fixtures/base.fixture';
import { ADMIN_STORAGE_STATE, env } from '../config/env';

// Logs in once and saves the session; the chromium project starts every test already logged in.
setup('Authenticate as admin', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login(env.adminUsername, env.adminPassword);
  await expect(dashboardPage.heading).toBeVisible();
  await page.context().storageState({ path: ADMIN_STORAGE_STATE });
});
