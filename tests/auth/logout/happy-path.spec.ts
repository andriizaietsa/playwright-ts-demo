/**
 * Auth — Logout › Happy path
 *
 * A user logs in, logs out from the user menu and is back on the login page.
 *
 * Seeding: none — logs in with the admin account from config/env.ts in a fresh session.
 * Cleanup: none. Logging out ends only this test's own session, not the saved one other tests use.
 */
import { test, expect } from '../../../fixtures/auth.fixture';
import { env } from '../../../config/env';

test.describe('Auth — Logout › Happy path', { tag: '@smoke' }, () => {
  test('Log out from the user menu — login page shown', async ({ page, loginPage, topBar }) => {
    await test.step('Log in as admin', async () => {
      await loginPage.goto();
      await loginPage.login(env.adminUsername, env.adminPassword);
    });

    await test.step('Log out from the user menu', async () => {
      await topBar.openUserMenuItem('Logout');
    });

    await test.step('Verify the login page is shown', async () => {
      await expect.soft(page).toHaveURL(/\/auth\/login/);
      await expect.soft(loginPage.loginButton).toBeVisible();
    });
  });
});
