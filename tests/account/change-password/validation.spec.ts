/**
 * Account — Change password › Validation
 *
 * The change-password form rejects a confirmation that differs from the new password.
 * The form is never saved, so the shared admin password stays untouched.
 *
 * Seeding: none. Cleanup: none.
 */
import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Account — Change password › Validation', { tag: '@smoke' }, () => {
  test('Enter a different confirmation — "Passwords do not match" shown', async ({ changePasswordPage }) => {
    await test.step('Open Change Password', async () => {
      await changePasswordPage.goto();
    });

    await test.step('Enter a new password and a different confirmation', async () => {
      await changePasswordPage.password.fill('NewPassw0rd!');
      await changePasswordPage.confirmPassword.fill('Different0ne!');
    });

    await test.step('Verify the mismatch error is shown', async () => {
      await expect(changePasswordPage.passwordsDoNotMatchError).toBeVisible();
    });
  });
});
