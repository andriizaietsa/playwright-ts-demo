import { test as base } from './base.fixture';
import { SystemUsersPage } from '../pages/admin/SystemUsersPage';
import { AddUserPage } from '../pages/admin/AddUserPage';
import { JobTitlesPage } from '../pages/admin/JobTitlesPage';
import { AddJobTitlePage } from '../pages/admin/AddJobTitlePage';

export const test = base.extend<{
  systemUsersPage: SystemUsersPage;
  addUserPage: AddUserPage;
  jobTitlesPage: JobTitlesPage;
  addJobTitlePage: AddJobTitlePage;
}>({
  systemUsersPage: async ({ page }, use) => use(new SystemUsersPage(page)),
  addUserPage: async ({ page }, use) => use(new AddUserPage(page)),
  jobTitlesPage: async ({ page }, use) => use(new JobTitlesPage(page)),
  addJobTitlePage: async ({ page }, use) => use(new AddJobTitlePage(page)),
});

export { expect } from '@playwright/test';
