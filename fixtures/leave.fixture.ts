import { test as base } from './base.fixture';
import { LeaveTypesPage } from '../pages/leave/LeaveTypesPage';
import { AddLeaveTypePage } from '../pages/leave/AddLeaveTypePage';
import { AddEntitlementPage } from '../pages/leave/AddEntitlementPage';
import { EntitlementsPage } from '../pages/leave/EntitlementsPage';
import { AssignLeavePage } from '../pages/leave/AssignLeavePage';

export const test = base.extend<{
  leaveTypesPage: LeaveTypesPage;
  addLeaveTypePage: AddLeaveTypePage;
  addEntitlementPage: AddEntitlementPage;
  entitlementsPage: EntitlementsPage;
  assignLeavePage: AssignLeavePage;
}>({
  leaveTypesPage: async ({ page }, use) => use(new LeaveTypesPage(page)),
  addLeaveTypePage: async ({ page }, use) => use(new AddLeaveTypePage(page)),
  addEntitlementPage: async ({ page }, use) => use(new AddEntitlementPage(page)),
  entitlementsPage: async ({ page }, use) => use(new EntitlementsPage(page)),
  assignLeavePage: async ({ page }, use) => use(new AssignLeavePage(page)),
});

export { expect } from '@playwright/test';
