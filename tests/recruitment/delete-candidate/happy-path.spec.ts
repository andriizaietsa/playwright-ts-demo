/**
 * Recruitment — Delete candidate › Happy path
 *
 * An admin deletes a candidate from the Candidates list; searching again finds nothing.
 *
 * Seeding: one candidate via the API.
 * Cleanup: the candidate, after the test (no-op when the test deleted it).
 */
import { test, expect } from '../../../fixtures/recruitment.fixture';

test.describe('Recruitment — Delete candidate › Happy path', { tag: '@smoke' }, () => {
  test('Delete a candidate from the list — candidate no longer found', async ({ seed, candidatesPage }) => {
    const candidate = await seed.candidate();

    await test.step('Search for the candidate', async () => {
      await candidatesPage.goto();
      await candidatesPage.searchByCandidate(candidate);
    });

    await test.step('Delete the candidate', async () => {
      await candidatesPage.table.deleteButton(candidatesPage.table.rowWith(candidate.fullName)).click();
      await candidatesPage.confirmDialog.yesDeleteButton.click();
    });

    await test.step('Verify the candidate was deleted', async () => {
      await expect.soft(candidatesPage.toast.deleted).toBeVisible();
    });

    await test.step('Search for the candidate again', async () => {
      await candidatesPage.search();
    });

    await test.step('Verify no candidate is found', async () => {
      await expect.soft(candidatesPage.table.rows).toHaveCount(0);
    });
  });
});
