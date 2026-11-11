/**
 * Auth — Login › Happy path
 *
 * A logged-out user signs in with valid credentials and lands on the dashboard.
 *
 * Seeding: none — uses the admin account from config/env.ts.
 * Cleanup: none — nothing is created. The test does not log out, because logging out would end
 *          the shared admin session the other tests use.
 */
import { test, expect } from '../../../fixtures/auth.fixture';
import { env } from '../../../config/env';

test.describe('Auth — Login › Happy path', { tag: '@smoke' }, () => {
  test('Log in with valid credentials — dashboard opens', async ({ page, loginPage, dashboardPage }) => {
    await test.step('Open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('Log in as admin', async () => {
      await loginPage.login(env.adminUsername, env.adminPassword);
    });

    await test.step('Verify the dashboard opened', async () => {
      await expect.soft(page).toHaveURL(/\/dashboard\/index/);
      await expect.soft(dashboardPage.heading).toBeVisible();
    });
  });
});
