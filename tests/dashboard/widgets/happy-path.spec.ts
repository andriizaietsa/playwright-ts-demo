/**
 * Dashboard — Widgets › Happy path
 *
 * The dashboard shows all of its widgets to an admin.
 *
 * Seeding: none. Cleanup: none.
 */
import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Dashboard — Widgets › Happy path', { tag: '@smoke' }, () => {
  test('Open the dashboard — all widgets shown', async ({ dashboardPage }) => {
    await test.step('Open the dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('Verify every widget is shown', async () => {
      await expect(dashboardPage.widgetTitles).toHaveText([
        'Time at Work',
        'My Actions',
        'Quick Launch',
        'Buzz Latest Posts',
        'Employees on Leave Today',
        'Employee Distribution by Sub Unit',
        'Employee Distribution by Location',
      ]);
    });
  });
});
