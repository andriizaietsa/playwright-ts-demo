import { test as setup, expect } from '../fixtures';
import { ADMIN_STORAGE_STATE, env } from '../config/env';

// Logs in once and saves the session; tests in the browser projects start already logged in.
setup('Authenticate as admin', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login(env.adminUsername, env.adminPassword);
  await expect(dashboardPage.heading).toBeVisible();
  await page.context().storageState({ path: ADMIN_STORAGE_STATE });
});
