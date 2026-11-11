/**
 * PIM — Edit personal details › Happy path
 *
 * An admin changes an employee's Other Id; the new value is still there after a reload.
 *
 * Seeding: one employee via the API.
 * Cleanup: the employee, after the test.
 */
import { test, expect } from '../../../fixtures/pim.fixture';
import { uniqueSuffix } from '../../../test-data/names';

test.describe('PIM — Edit personal details › Happy path', { tag: '@smoke' }, () => {
  test('Change Other Id and save — new value kept after reload', async ({ page, seed, personalDetailsPage }) => {
    const employee = await seed.employee();
    const otherId = uniqueSuffix();

    await test.step('Open the employee’s Personal Details', async () => {
      await personalDetailsPage.gotoEmployee(employee.empNumber);
      // Gate: the form loads its data after rendering; editing earlier would be overwritten.
      await expect(personalDetailsPage.firstNameInput).toHaveValue(employee.firstName);
    });

    await test.step('Change Other Id', async () => {
      await personalDetailsPage.otherId.fill(otherId);
    });

    await test.step('Save the personal details', async () => {
      await personalDetailsPage.saveButton.click();
    });

    await test.step('Verify the change was saved', async () => {
      await expect.soft(personalDetailsPage.toast.updated).toBeVisible();
    });

    await test.step('Reload the page', async () => {
      await page.reload();
      await expect(personalDetailsPage.firstNameInput).toHaveValue(employee.firstName);
    });

    await test.step('Verify the new Other Id is kept', async () => {
      await expect.soft(personalDetailsPage.otherId.input).toHaveValue(otherId);
    });
  });
});
