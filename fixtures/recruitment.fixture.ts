import { test as base } from './base.fixture';
import { CandidatesPage } from '../pages/recruitment/CandidatesPage';
import { AddCandidatePage } from '../pages/recruitment/AddCandidatePage';
import { VacanciesPage } from '../pages/recruitment/VacanciesPage';
import { AddVacancyPage } from '../pages/recruitment/AddVacancyPage';

export const test = base.extend<{
  candidatesPage: CandidatesPage;
  addCandidatePage: AddCandidatePage;
  vacanciesPage: VacanciesPage;
  addVacancyPage: AddVacancyPage;
}>({
  candidatesPage: async ({ page }, use) => use(new CandidatesPage(page)),
  addCandidatePage: async ({ page }, use) => use(new AddCandidatePage(page)),
  vacanciesPage: async ({ page }, use) => use(new VacanciesPage(page)),
  addVacancyPage: async ({ page }, use) => use(new AddVacancyPage(page)),
});

export { expect } from '@playwright/test';
