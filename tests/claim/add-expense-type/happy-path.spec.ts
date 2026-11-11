/**
 * Claim — Add expense type › Happy path
 *
 * An admin adds an expense type, which then appears in the Expense Types list.
 *
 * Seeding: none.
 * Cleanup: the created expense type, by name, after the test.
 */
import { test, expect } from '../../../fixtures/claim.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Claim — Add expense type › Happy path', { tag: '@smoke' }, () => {
  test('Add an expense type — shown in the Expense Types list', async ({
    api,
    cleanup,
    addExpenseTypePage,
    expenseTypesPage,
  }) => {
    const name = uniqueName('Expense');
    cleanup.add(`expense type ${name}`, () => api.deleteExpenseTypesByName(name));

    await test.step('Fill in the expense type name', async () => {
      await addExpenseTypePage.goto();
      await addExpenseTypePage.name.fill(name);
    });

    await test.step('Save the expense type', async () => {
      await addExpenseTypePage.saveButton.click();
    });

    await test.step('Verify the expense type was saved', async () => {
      await expect.soft(addExpenseTypePage.toast.saved).toBeVisible();
    });

    await test.step('Open the Expense Types list', async () => {
      await expenseTypesPage.goto();
    });

    await test.step('Verify the expense type is listed', async () => {
      await expect.soft(expenseTypesPage.table.rowWith(name)).toHaveCount(1);
    });
  });
});
