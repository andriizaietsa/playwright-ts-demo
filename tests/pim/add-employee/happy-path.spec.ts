/**
 * PIM — Add employee › Happy path
 *
 * An admin adds an employee with first and last name and lands on the new employee's Personal Details.
 *
 * Seeding: none.
 * Cleanup: the created employee, by first name, after the test.
 */
import { test, expect } from '../../../fixtures/pim.fixture';
import { E2E_PREFIX, uniqueSuffix } from '../../../test-data/names';

test.describe('PIM — Add employee › Happy path', { tag: '@smoke' }, () => {
  test('Add an employee — Personal Details of the new employee open', async ({
    page,
    api,
    cleanup,
    addEmployeePage,
    personalDetailsPage,
  }) => {
    const firstName = `${E2E_PREFIX.toUpperCase()}${uniqueSuffix()}`;
    const lastName = 'Automation';
    cleanup.add(`employee ${firstName}`, () => api.deleteEmployeesByFirstName(firstName));

    await test.step('Fill in first and last name', async () => {
      await addEmployeePage.goto();
      await addEmployeePage.firstNameInput.fill(firstName);
      await addEmployeePage.lastNameInput.fill(lastName);
    });

    await test.step('Save the employee', async () => {
      await addEmployeePage.saveButton.click();
    });

    await test.step('Verify the employee was created', async () => {
      await expect.soft(addEmployeePage.toast.saved).toBeVisible();
      // Gate: the app opens the new employee's record only after a successful save.
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
      await expect.soft(personalDetailsPage.employeeNameHeading).toHaveText(`${firstName} ${lastName}`);
    });
  });
});
