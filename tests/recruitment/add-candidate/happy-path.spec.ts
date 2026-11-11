/**
 * Recruitment — Add candidate › Happy path
 *
 * An admin adds a candidate with the required fields; searching the Candidates list finds them.
 *
 * Seeding: none.
 * Cleanup: the created candidate, by email, after the test.
 */
import { test, expect } from '../../../fixtures/recruitment.fixture';
import { E2E_PREFIX, uniqueSuffix } from '../../../test-data/names';

test.describe('Recruitment — Add candidate › Happy path', { tag: '@smoke' }, () => {
  test('Add a candidate — found by name in the Candidates list', async ({
    api,
    cleanup,
    addCandidatePage,
    candidatesPage,
  }) => {
    const suffix = uniqueSuffix();
    const candidate = {
      firstName: E2E_PREFIX.toUpperCase(),
      lastName: `Cand${suffix}`,
      email: `${E2E_PREFIX}.${suffix}@example.com`,
    };
    const fullName = `${candidate.firstName} ${candidate.lastName}`;
    cleanup.add(`candidate ${candidate.email}`, () => api.deleteCandidates(candidate));

    await test.step('Fill in name and email', async () => {
      await addCandidatePage.goto();
      await addCandidatePage.firstNameInput.fill(candidate.firstName);
      await addCandidatePage.lastNameInput.fill(candidate.lastName);
      await addCandidatePage.email.fill(candidate.email);
    });

    await test.step('Save the candidate', async () => {
      await addCandidatePage.saveButton.click();
    });

    await test.step('Verify the candidate was saved', async () => {
      await expect.soft(addCandidatePage.toast.saved).toBeVisible();
    });

    await test.step('Search the Candidates list by name', async () => {
      await candidatesPage.goto();
      await candidatesPage.searchByCandidate({ lastName: candidate.lastName, fullName });
    });

    await test.step('Verify only that candidate is listed', async () => {
      await expect.soft(candidatesPage.table.rows).toHaveCount(1);
      await expect.soft(candidatesPage.table.rowWith(fullName)).toHaveCount(1);
    });
  });
});
