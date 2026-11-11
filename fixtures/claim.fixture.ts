import { test as base } from './base.fixture';
import { EventsPage } from '../pages/claim/EventsPage';
import { AddEventPage } from '../pages/claim/AddEventPage';
import { ExpenseTypesPage } from '../pages/claim/ExpenseTypesPage';
import { AddExpenseTypePage } from '../pages/claim/AddExpenseTypePage';

export const test = base.extend<{
  eventsPage: EventsPage;
  addEventPage: AddEventPage;
  expenseTypesPage: ExpenseTypesPage;
  addExpenseTypePage: AddExpenseTypePage;
}>({
  eventsPage: async ({ page }, use) => use(new EventsPage(page)),
  addEventPage: async ({ page }, use) => use(new AddEventPage(page)),
  expenseTypesPage: async ({ page }, use) => use(new ExpenseTypesPage(page)),
  addExpenseTypePage: async ({ page }, use) => use(new AddExpenseTypePage(page)),
});

export { expect } from '@playwright/test';
