/**
 * Claim — Add event › Happy path
 *
 * An admin adds a claim event, which then appears in the Events list.
 *
 * Seeding: none.
 * Cleanup: the created event, by name, after the test.
 */
import { test, expect } from '../../../fixtures/claim.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Claim — Add event › Happy path', { tag: '@smoke' }, () => {
  test('Add a claim event — shown in the Events list', async ({ api, cleanup, addEventPage, eventsPage }) => {
    const name = uniqueName('Event');
    cleanup.add(`event ${name}`, () => api.deleteEventsByName(name));

    await test.step('Fill in the event name', async () => {
      await addEventPage.goto();
      await addEventPage.eventName.fill(name);
    });

    await test.step('Save the event', async () => {
      await addEventPage.saveButton.click();
    });

    await test.step('Verify the event was saved', async () => {
      await expect.soft(addEventPage.toast.saved).toBeVisible();
    });

    await test.step('Open the Events list', async () => {
      await eventsPage.goto();
    });

    await test.step('Verify the event is listed', async () => {
      await expect.soft(eventsPage.table.rowWith(name)).toHaveCount(1);
    });
  });
});
