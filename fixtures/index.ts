import { test as base } from '@playwright/test';
import { OrangeHrmApi, type Employee } from '../api/OrangeHrmApi';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { SideMenu } from '../pages/components/SideMenu';
import { SystemUsersPage } from '../pages/admin/SystemUsersPage';
import { AddUserPage } from '../pages/admin/AddUserPage';
import { E2E_PREFIX, uniqueSuffix } from '../test-data/users';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  sideMenu: SideMenu;
  systemUsersPage: SystemUsersPage;
  addUserPage: AddUserPage;
  api: OrangeHrmApi;
  /** A fresh employee created through the API and deleted after the test. */
  employee: Employee & { fullName: string };
  /** Push a username here and the system user is deleted after the test, even if it fails. */
  usersToCleanUp: string[];
};

/** Runs one cleanup action; a failure is logged, never thrown, so it cannot mask the test result. */
async function safeCleanup(what: string, action: () => Promise<void>): Promise<void> {
  try {
    await action();
  } catch (error) {
    console.warn(`Cleanup failed for ${what}:`, error);
  }
}

/** Fixtures for tests that run as the logged-in admin (storageState from auth.setup.ts). */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  sideMenu: async ({ page }, use) => use(new SideMenu(page)),
  systemUsersPage: async ({ page }, use) => use(new SystemUsersPage(page)),
  addUserPage: async ({ page }, use) => use(new AddUserPage(page)),

  // page.request shares cookies with the browser, so it uses the logged-in admin session.
  api: async ({ page }, use) => use(new OrangeHrmApi(page.request)),

  employee: async ({ api }, use) => {
    const created = await api.createEmployee(`${E2E_PREFIX.toUpperCase()}${uniqueSuffix()}`, 'Automation');
    await use({ ...created, fullName: `${created.firstName} ${created.lastName}` });
    await safeCleanup(`employee ${created.empNumber}`, () => api.deleteEmployees([created.empNumber]));
  },

  usersToCleanUp: async ({ api }, use) => {
    const usernames: string[] = [];
    await use(usernames);
    for (const username of usernames) {
      await safeCleanup(`user ${username}`, () => api.deleteUsersByUsername(username));
    }
  },
});

export { expect } from '@playwright/test';
