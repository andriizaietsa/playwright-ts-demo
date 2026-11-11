/**
 * Navigation — Side menu search › Happy path
 *
 * Typing in the side menu search narrows the menu to matching modules, and the match opens its module.
 *
 * Seeding: none. Cleanup: none.
 */
import { test, expect } from '../../../fixtures/base.fixture';

test.describe('Navigation — Side menu search › Happy path', { tag: '@smoke' }, () => {
  test('Search the menu for "Recr" — only Recruitment shown and it opens', async ({ page, dashboardPage, sideMenu }) => {
    await test.step('Open the dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('Type "Recr" in the menu search', async () => {
      await sideMenu.searchInput.fill('Recr');
    });

    await test.step('Verify only Recruitment is listed', async () => {
      await expect.soft(sideMenu.menuLinks).toHaveText(['Recruitment']);
    });

    await test.step('Click Recruitment', async () => {
      await sideMenu.open('Recruitment');
    });

    await test.step('Verify the Recruitment module opened', async () => {
      await expect.soft(page).toHaveURL(/\/recruitment\//);
    });
  });
});
