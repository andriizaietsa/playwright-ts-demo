/**
 * Admin — Add user › Happy path
 *
 * An admin opens Admin > User Management, adds a new Admin user with all required fields,
 * and finds exactly that user by searching for its username.
 *
 * Seeding: one employee per test via the API (employee fixture) — a system user must be
 *          linked to an existing employee, and the shared demo's own employees change constantly.
 * Cleanup: the created user (usersToCleanUp) and the employee (employee fixture teardown),
 *          both after the test, failures logged and never thrown.
 */
import { test, expect } from '../../../fixtures';
import { buildAdminUser } from '../../../test-data/users';

test.describe('Admin — Add user › Happy path', () => {
  // UI flow + API setup/cleanup against a shared public demo is slow: triple the default timeout.
  test.slow();

  test('Create admin with required fields — admin found by username search', async ({
    page,
    employee,
    usersToCleanUp,
    dashboardPage,
    sideMenu,
    systemUsersPage,
    addUserPage,
  }) => {
    const admin = buildAdminUser(employee.fullName);
    usersToCleanUp.push(admin.username);

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
      await expect.soft(addUserPage.successToast).toBeVisible();
      // Gate: the app returns to the users list only after a successful save.
      await expect(page).toHaveURL(/\/admin\/viewSystemUsers/);
    });

    await test.step('Search by the new username', async () => {
      await systemUsersPage.searchByUsername(admin.username);
    });

    await test.step('Verify the admin is found in the list', async () => {
      // The whole result set must be exactly this user: proves the search applied the term.
      await expect.soft(systemUsersPage.resultRows).toHaveCount(1);
      const row = systemUsersPage.rowFor(admin.username);
      // Gate: the row must exist before its cells are read.
      await expect(row).toHaveCount(1);
      await expect.soft(systemUsersPage.cell(row, 'User Role')).toHaveText(admin.role);
      await expect.soft(systemUsersPage.cell(row, 'Employee Name')).toHaveText(employee.fullName);
      await expect.soft(systemUsersPage.cell(row, 'Status')).toHaveText(admin.status);
    });
  });
});
