/**
 * Performance — Add KPI › Happy path
 *
 * An admin adds a KPI for a job title; filtering the KPI list by that job title shows it.
 *
 * Seeding: one job title via the API, so the filtered list holds only this KPI.
 * Cleanup: the created KPI (by title), then the job title, after the test.
 */
import { test, expect } from '../../../fixtures/performance.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Performance — Add KPI › Happy path', { tag: '@smoke' }, () => {
  test('Add a KPI for a job title — shown when filtering by that job title', async ({
    api,
    seed,
    cleanup,
    addKpiPage,
    kpisPage,
  }) => {
    const jobTitle = await seed.jobTitle();
    const kpi = uniqueName('KPI');
    cleanup.add(`kpi ${kpi}`, () => api.deleteKpisByTitle(kpi, jobTitle.id));

    await test.step('Fill in the KPI and its job title', async () => {
      await addKpiPage.goto();
      await addKpiPage.kpi.fill(kpi);
      await addKpiPage.jobTitle.select(jobTitle.title);
    });

    await test.step('Save the KPI', async () => {
      await addKpiPage.saveButton.click();
    });

    await test.step('Verify the KPI was saved', async () => {
      await expect.soft(addKpiPage.toast.saved).toBeVisible();
    });

    await test.step('Filter the KPI list by the job title', async () => {
      await kpisPage.goto();
      await kpisPage.searchByJobTitle(jobTitle.title);
    });

    await test.step('Verify only the new KPI is listed', async () => {
      await expect.soft(kpisPage.table.rows).toHaveCount(1);
      await expect.soft(kpisPage.table.rowWith(kpi)).toHaveCount(1);
    });
  });
});
