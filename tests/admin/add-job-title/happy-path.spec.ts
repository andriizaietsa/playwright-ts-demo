/**
 * Admin — Add job title › Happy path
 *
 * An admin adds a job title, which then appears in the Job Titles list.
 *
 * Seeding: none.
 * Cleanup: the created job title, by name, after the test.
 */
import { test, expect } from '../../../fixtures/admin.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Admin — Add job title › Happy path', { tag: '@smoke' }, () => {
  test('Add a job title — shown in the Job Titles list', async ({ api, cleanup, addJobTitlePage, jobTitlesPage }) => {
    const title = uniqueName('Job Title');
    cleanup.add(`job title ${title}`, () => api.deleteJobTitlesByTitle(title));

    await test.step('Fill in the job title', async () => {
      await addJobTitlePage.goto();
      await addJobTitlePage.jobTitle.fill(title);
    });

    await test.step('Save the job title', async () => {
      await addJobTitlePage.saveButton.click();
    });

    await test.step('Verify the job title was saved', async () => {
      await expect.soft(addJobTitlePage.toast.saved).toBeVisible();
    });

    await test.step('Open the Job Titles list', async () => {
      await jobTitlesPage.goto();
    });

    await test.step('Verify the job title is listed', async () => {
      await expect.soft(jobTitlesPage.table.rowWith(title)).toHaveCount(1);
    });
  });
});
