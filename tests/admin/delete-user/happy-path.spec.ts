/**
 * Admin — Delete user › Happy path
 *
 * An admin deletes a system user from the users list; searching for it afterwards finds nothing.
 *
 * Seeding: one employee and one ESS user linked to it, via the API.
 * Cleanup: both, after the test (no-op for the user when the test deleted it).
 */
import { test, expect } from '../../../fixtures/admin.fixture';

test.describe('Admin — Delete user › Happy path', { tag: '@smoke' }, () => {
  test('Delete a user from the list — user no longer found', async ({ seed, systemUsersPage }) => {
    const employee = await seed.employee();
    const user = await seed.systemUser(employee);

    await test.step('Search for the user', async () => {
      await systemUsersPage.goto();
      await systemUsersPage.searchByUsername(user.userName);
    });

    await test.step('Delete the user', async () => {
      await systemUsersPage.table.deleteButton(systemUsersPage.table.rowWith(user.userName)).click();
      await systemUsersPage.confirmDialog.yesDeleteButton.click();
    });

    await test.step('Verify the user was deleted', async () => {
      await expect.soft(systemUsersPage.toast.deleted).toBeVisible();
    });

    await test.step('Search for the user again', async () => {
      await systemUsersPage.searchByUsername(user.userName);
    });

    await test.step('Verify no user is found', async () => {
      await expect.soft(systemUsersPage.table.rows).toHaveCount(0);
    });
  });
});
