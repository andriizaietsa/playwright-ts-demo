import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Recruitment > Vacancies — /web/index.php/recruitment/viewJobVacancy. */
export class VacanciesPage extends BasePage {
  readonly path = '/web/index.php/recruitment/viewJobVacancy';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
