/**
 * Recruitment — Add vacancy › Happy path
 *
 * An admin adds a vacancy for a job title with a hiring manager; the Vacancies list shows both.
 *
 * Seeding: one job title and one employee (the hiring manager) via the API.
 * Cleanup: the created vacancy (by name), then the job title and the employee, after the test.
 */
import { test, expect } from '../../../fixtures/recruitment.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Recruitment — Add vacancy › Happy path', { tag: '@smoke' }, () => {
  test('Add a vacancy — shown in the Vacancies list with its job title and hiring manager', async ({
    page,
    api,
    seed,
    cleanup,
    addVacancyPage,
    vacanciesPage,
  }) => {
    const jobTitle = await seed.jobTitle();
    const hiringManager = await seed.employee();
    const name = uniqueName('Vacancy');
    cleanup.add(`vacancy ${name}`, () => api.deleteVacanciesByName(name, jobTitle.id));

    await test.step('Fill in name, job title and hiring manager', async () => {
      await addVacancyPage.goto();
      await addVacancyPage.vacancyName.fill(name);
      await addVacancyPage.jobTitle.select(jobTitle.title);
      await addVacancyPage.hiringManager.autocomplete(hiringManager.firstName, hiringManager.fullName);
    });

    await test.step('Save the vacancy', async () => {
      await addVacancyPage.saveButton.click();
    });

    await test.step('Verify the vacancy was saved', async () => {
      // This page shows no toast: a successful save reloads it as the new vacancy's Edit page.
      await expect.soft(page).toHaveURL(/\/recruitment\/addJobVacancy\/\d+/);
      await expect.soft(addVacancyPage.editVacancyHeading).toBeVisible();
    });

    await test.step('Open the Vacancies list', async () => {
      await vacanciesPage.goto();
    });

    await test.step('Verify the vacancy is listed with its job title and hiring manager', async () => {
      const { table } = vacanciesPage;
      const row = table.rowWith(name);
      // Gate: the row must exist before its cells are read.
      await expect(row).toHaveCount(1);
      await expect.soft(await table.cell(row, 'Job Title')).toHaveText(jobTitle.title);
      await expect.soft(await table.cell(row, 'Hiring Manager')).toHaveText(hiringManager.fullName);
      await expect.soft(await table.cell(row, 'Status')).toHaveText('Active');
    });
  });
});
