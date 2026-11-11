/**
 * Time — Add project › Happy path
 *
 * An admin adds a project for a customer; the Projects list shows it under that customer.
 *
 * Seeding: one customer via the API.
 * Cleanup: the created project (by name), then the customer, after the test.
 */
import { test, expect } from '../../../fixtures/time.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Time — Add project › Happy path', { tag: '@smoke' }, () => {
  test('Add a project for a customer — shown in the Projects list', async ({
    api,
    seed,
    cleanup,
    addProjectPage,
    projectsPage,
  }) => {
    const customer = await seed.customer();
    const name = uniqueName('Project');
    cleanup.add(`project ${name}`, () => api.deleteProjectsByName(name));

    await test.step('Fill in the project name and customer', async () => {
      await addProjectPage.goto();
      await addProjectPage.name.fill(name);
      await addProjectPage.customerName.autocomplete(customer.name);
    });

    await test.step('Save the project', async () => {
      await addProjectPage.saveButton.click();
    });

    await test.step('Verify the project was saved', async () => {
      await expect.soft(addProjectPage.toast.saved).toBeVisible();
    });

    await test.step('Open the Projects list', async () => {
      await projectsPage.goto();
    });

    await test.step('Verify the project is listed under its customer', async () => {
      const { table } = projectsPage;
      const row = table.rowWith(name);
      // Gate: the row must exist before its cells are read.
      await expect(row).toHaveCount(1);
      await expect.soft(await table.cell(row, 'Customer Name')).toHaveText(customer.name);
    });
  });
});
