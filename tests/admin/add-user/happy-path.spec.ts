/**
 * Admin — Add user › Happy path
 *
 * An admin opens Admin > User Management, adds a new Admin user with all required fields,
 * and finds exactly that user by searching for its username.
 *
 * Seeding: one employee via the API — a system user must be linked to an existing employee.
 * Cleanup: the created user and the employee, after the test (cleanup fixture).
 */
import { test, expect } from '../../../fixtures/admin.fixture';
import { buildAdminUser } from '../../../test-data/users';

test.describe('Admin — Add user › Happy path', { tag: '@smoke' }, () => {
  test('Create admin with required fields — admin found by username search', async ({
    page,
    seed,
    api,
    cleanup,
    dashboardPage,
    sideMenu,
    systemUsersPage,
    addUserPage,
  }) => {
    const employee = await seed.employee();
    const admin = buildAdminUser(employee.fullName);
    cleanup.add(`user ${admin.username}`, () => api.deleteUsersByUsername(admin.username));

    await test.step('Open the Admin section', async () => {
      await dashboardPage.goto();
      await sideMenu.open('Admin');
    });

    await test.step('Click Add', async () => {
      await systemUsersPage.addButton.click();
    });

    await test.step('Fill out the required fields', async () => {
      await addUserPage.fillForm(admin);
    });

    await test.step('Save the admin', async () => {
      await addUserPage.saveButton.click();
    });

    await test.step('Verify the admin was saved', async () => {
      await expect.soft(addUserPage.toast.saved).toBeVisible();
      // Gate: the app returns to the users list only after a successful save.
      await expect(page).toHaveURL(/\/admin\/viewSystemUsers/);
    });

    await test.step('Search by the new username', async () => {
      await systemUsersPage.searchByUsername(admin.username);
    });

    await test.step('Verify the admin is found in the list', async () => {
      const { table } = systemUsersPage;
      // The whole result set must be exactly this user: proves the search applied the term.
      await expect.soft(table.rows).toHaveCount(1);
      const row = table.rowWith(admin.username);
      // Gate: the row must exist before its cells are read.
      await expect(row).toHaveCount(1);
      await expect.soft(await table.cell(row, 'User Role')).toHaveText(admin.role);
      await expect.soft(await table.cell(row, 'Employee Name')).toHaveText(employee.fullName);
      await expect.soft(await table.cell(row, 'Status')).toHaveText(admin.status);
    });
  });
});
