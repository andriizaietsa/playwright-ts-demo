/**
 * Time — Add customer › Happy path
 *
 * An admin adds a customer, which then appears in the Customers list.
 *
 * Seeding: none.
 * Cleanup: the created customer, by name, after the test.
 */
import { test, expect } from '../../../fixtures/time.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Time — Add customer › Happy path', { tag: '@smoke' }, () => {
  test('Add a customer — shown in the Customers list', async ({ api, cleanup, addCustomerPage, customersPage }) => {
    const name = uniqueName('Customer');
    cleanup.add(`customer ${name}`, () => api.deleteCustomersByName(name));

    await test.step('Fill in the customer name', async () => {
      await addCustomerPage.goto();
      await addCustomerPage.name.fill(name);
    });

    await test.step('Save the customer', async () => {
      await addCustomerPage.saveButton.click();
    });

    await test.step('Verify the customer was saved', async () => {
      await expect.soft(addCustomerPage.toast.saved).toBeVisible();
    });

    await test.step('Open the Customers list', async () => {
      await customersPage.goto();
    });

    await test.step('Verify the customer is listed', async () => {
      await expect.soft(customersPage.table.rowWith(name)).toHaveCount(1);
    });
  });
});
