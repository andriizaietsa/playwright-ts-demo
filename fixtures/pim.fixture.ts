import { test as base } from './base.fixture';
import { EmployeeListPage } from '../pages/pim/EmployeeListPage';
import { AddEmployeePage } from '../pages/pim/AddEmployeePage';
import { PersonalDetailsPage } from '../pages/pim/PersonalDetailsPage';
import { MyInfoPage } from '../pages/pim/MyInfoPage';

export const test = base.extend<{
  employeeListPage: EmployeeListPage;
  addEmployeePage: AddEmployeePage;
  personalDetailsPage: PersonalDetailsPage;
  myInfoPage: MyInfoPage;
}>({
  employeeListPage: async ({ page }, use) => use(new EmployeeListPage(page)),
  addEmployeePage: async ({ page }, use) => use(new AddEmployeePage(page)),
  personalDetailsPage: async ({ page }, use) => use(new PersonalDetailsPage(page)),
  myInfoPage: async ({ page }, use) => use(new MyInfoPage(page)),
});

export { expect } from '@playwright/test';
