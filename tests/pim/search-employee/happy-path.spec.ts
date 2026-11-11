/**
 * PIM — Search employee › Happy path
 *
 * Searching the Employee List by name returns exactly that employee.
 *
 * Seeding: one employee via the API.
 * Cleanup: the employee, after the test.
 */
import { test, expect } from '../../../fixtures/pim.fixture';

test.describe('PIM — Search employee › Happy path', { tag: '@smoke' }, () => {
  test('Search by employee name — only that employee listed', async ({ seed, employeeListPage }) => {
    const employee = await seed.employee();

    await test.step('Search the Employee List by name', async () => {
      await employeeListPage.goto();
      await employeeListPage.searchByEmployee(employee);
    });

    await test.step('Verify only that employee is listed', async () => {
      const { table } = employeeListPage;
      await expect.soft(table.rows).toHaveCount(1);
      const row = table.rowWith(employee.firstName);
      // Gate: the row must exist before its cells are read.
      await expect(row).toHaveCount(1);
      await expect.soft(await table.cell(row, 'Last Name')).toHaveText(employee.lastName);
    });
  });
});
