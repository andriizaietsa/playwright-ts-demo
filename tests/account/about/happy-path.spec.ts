/**
 * Account — About › Happy path
 *
 * The About dialog from the user menu shows the company name and product version.
 *
 * Seeding: none. Cleanup: none.
 */
import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Account — About › Happy path', { tag: '@smoke' }, () => {
  test('Open About from the user menu — company name and version shown', async ({ dashboardPage, topBar }) => {
    await test.step('Open the dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('Open About from the user menu', async () => {
      await topBar.openUserMenuItem('About');
    });

    await test.step('Verify the company name and version are shown', async () => {
      await expect.soft(topBar.aboutDialog).toContainText(/Company Name:\s*OrangeHRM/);
      await expect.soft(topBar.aboutDialog).toContainText(/Version:\s*OrangeHRM OS \d/);
    });
  });
});
