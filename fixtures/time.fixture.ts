import { test as base } from './base.fixture';
import { CustomersPage } from '../pages/time/CustomersPage';
import { AddCustomerPage } from '../pages/time/AddCustomerPage';
import { ProjectsPage } from '../pages/time/ProjectsPage';
import { AddProjectPage } from '../pages/time/AddProjectPage';

export const test = base.extend<{
  customersPage: CustomersPage;
  addCustomerPage: AddCustomerPage;
  projectsPage: ProjectsPage;
  addProjectPage: AddProjectPage;
}>({
  customersPage: async ({ page }, use) => use(new CustomersPage(page)),
  addCustomerPage: async ({ page }, use) => use(new AddCustomerPage(page)),
  projectsPage: async ({ page }, use) => use(new ProjectsPage(page)),
  addProjectPage: async ({ page }, use) => use(new AddProjectPage(page)),
});

export { expect } from '@playwright/test';
