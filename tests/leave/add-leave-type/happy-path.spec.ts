/**
 * Leave — Add leave type › Happy path
 *
 * An admin adds a leave type, which then appears in the Leave Types list.
 *
 * Seeding: none.
 * Cleanup: the created leave type, by name, after the test.
 */
import { test, expect } from '../../../fixtures/leave.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Leave — Add leave type › Happy path', { tag: '@smoke' }, () => {
  test('Add a leave type — shown in the Leave Types list', async ({ api, cleanup, addLeaveTypePage, leaveTypesPage }) => {
    const name = uniqueName('Leave');
    cleanup.add(`leave type ${name}`, () => api.deleteLeaveTypesByName(name));

    await test.step('Fill in the leave type name', async () => {
      await addLeaveTypePage.goto();
      await addLeaveTypePage.name.fill(name);
    });

    await test.step('Save the leave type', async () => {
      await addLeaveTypePage.saveButton.click();
    });

    await test.step('Verify the leave type was saved', async () => {
      await expect.soft(addLeaveTypePage.toast.saved).toBeVisible();
    });

    await test.step('Open the Leave Types list', async () => {
      await leaveTypesPage.goto();
    });

    await test.step('Verify the leave type is listed', async () => {
      await expect.soft(leaveTypesPage.table.rowWith(name)).toHaveCount(1);
    });
  });
});
