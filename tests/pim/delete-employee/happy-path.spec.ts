/**
 * PIM — Delete employee › Happy path
 *
 * An admin deletes an employee from the Employee List; searching again finds nothing.
 *
 * Seeding: one employee via the API.
 * Cleanup: the employee, after the test (no-op when the test deleted it).
 */
import { test, expect } from '../../../fixtures/pim.fixture';

test.describe('PIM — Delete employee › Happy path', { tag: '@smoke' }, () => {
  test('Delete an employee from the list — employee no longer found', async ({ seed, employeeListPage }) => {
    const employee = await seed.employee();

    await test.step('Search for the employee', async () => {
      await employeeListPage.goto();
      await employeeListPage.searchByEmployee(employee);
    });

    await test.step('Delete the employee', async () => {
      await employeeListPage.table.deleteButton(employeeListPage.table.rowWith(employee.firstName)).click();
      await employeeListPage.confirmDialog.yesDeleteButton.click();
    });

    await test.step('Verify the employee was deleted', async () => {
      await expect.soft(employeeListPage.toast.deleted).toBeVisible();
    });

    await test.step('Search for the employee again', async () => {
      await employeeListPage.search();
    });

    await test.step('Verify no employee is found', async () => {
      await expect.soft(employeeListPage.table.rows).toHaveCount(0);
    });
  });
});
