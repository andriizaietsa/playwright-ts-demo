/**
 * PIM — My Info › Happy path
 *
 * My Info opens the logged-in user's own record with all of its sections.
 * The user's name is read from the top bar, because others on the shared demo rename it.
 *
 * Seeding: none. Cleanup: none.
 */
import { test, expect } from '../../../fixtures/pim.fixture';

test.describe('PIM — My Info › Happy path', { tag: '@smoke' }, () => {
  test('Open My Info — own record with all sections shown', async ({ sideMenu, dashboardPage, topBar, myInfoPage }) => {
    await test.step('Open My Info from the menu', async () => {
      await dashboardPage.goto();
      await sideMenu.open('My Info');
    });

    await test.step('Verify it shows the logged-in user with all sections', async () => {
      const userName = await topBar.userName.innerText();
      await expect.soft(myInfoPage.employeeNameHeading).toHaveText(userName);
      await expect.soft(myInfoPage.tabs).toHaveText([
        'Personal Details',
        'Contact Details',
        'Emergency Contacts',
        'Dependents',
        'Immigration',
        'Job',
        'Salary',
        'Report-to',
        'Qualifications',
        'Memberships',
      ]);
    });
  });
});
