/**
 * Directory — Search employee › Happy path
 *
 * Searching the Directory by name shows exactly that employee's card.
 *
 * Seeding: one employee via the API.
 * Cleanup: the employee, after the test.
 */
import { test, expect } from '../../../fixtures/directory.fixture';

test.describe('Directory — Search employee › Happy path', { tag: '@smoke' }, () => {
  test('Search the directory by name — only that employee’s card shown', async ({ seed, directoryPage }) => {
    const employee = await seed.employee();

    await test.step('Search the directory by name', async () => {
      await directoryPage.goto();
      await directoryPage.searchByEmployee(employee);
    });

    await test.step('Verify only that employee’s card is shown', async () => {
      await expect.soft(directoryPage.recordsFound).toHaveText('(1) Record Found');
      await expect.soft(directoryPage.employeeCardName(employee.fullName)).toBeVisible();
    });
  });
});
