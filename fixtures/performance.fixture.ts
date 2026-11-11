import { test as base } from './base.fixture';
import { KpisPage } from '../pages/performance/KpisPage';
import { AddKpiPage } from '../pages/performance/AddKpiPage';

export const test = base.extend<{ kpisPage: KpisPage; addKpiPage: AddKpiPage }>({
  kpisPage: async ({ page }, use) => use(new KpisPage(page)),
  addKpiPage: async ({ page }, use) => use(new AddKpiPage(page)),
});

export { expect } from '@playwright/test';
