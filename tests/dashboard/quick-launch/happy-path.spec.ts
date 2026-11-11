/**
 * Dashboard — Quick Launch › Happy path
 *
 * A Quick Launch shortcut on the dashboard opens its page.
 *
 * Seeding: none. Cleanup: none.
 */
import { test, expect } from '../../../fixtures/leave.fixture';

test.describe('Dashboard — Quick Launch › Happy path', { tag: '@smoke' }, () => {
  test('Click Assign Leave in Quick Launch — Assign Leave page opens', async ({ page, dashboardPage, assignLeavePage }) => {
    await test.step('Open the dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('Click Assign Leave', async () => {
      await dashboardPage.quickLaunchButton('Assign Leave').click();
    });

    await test.step('Verify the Assign Leave page opened', async () => {
      await expect.soft(page).toHaveURL(/\/leave\/assignLeave/);
      await expect.soft(assignLeavePage.heading).toBeVisible();
    });
  });
});
