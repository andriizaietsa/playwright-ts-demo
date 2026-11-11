/**
 * Auth — Login › Validation
 *
 * The login form rejects wrong credentials and empty fields, and the user stays logged out.
 *
 * Seeding: none.
 * Cleanup: none — nothing is created.
 */
import { test, expect } from '../../../fixtures/auth.fixture';
import { env } from '../../../config/env';

test.describe('Auth — Login › Validation', { tag: '@smoke' }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Log in with a wrong password — "Invalid credentials" shown', async ({ page, loginPage }) => {
    await test.step('Log in with a wrong password', async () => {
      await loginPage.login(env.adminUsername, 'wrong-password');
    });

    await test.step('Verify the login is rejected', async () => {
      await expect.soft(loginPage.errorAlert).toHaveText('Invalid credentials');
      await expect.soft(page).toHaveURL(/\/auth\/login/);
    });
  });

  test('Submit the empty form — "Required" shown under both fields', async ({ page, loginPage }) => {
    await test.step('Click Login without filling the form', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('Verify both fields are marked required', async () => {
      await expect.soft(loginPage.usernameRequiredError).toBeVisible();
      await expect.soft(loginPage.passwordRequiredError).toBeVisible();
      await expect.soft(page).toHaveURL(/\/auth\/login/);
    });
  });
});
