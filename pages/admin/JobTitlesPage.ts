import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Admin > Job > Job Titles — /web/index.php/admin/viewJobTitleList. */
export class JobTitlesPage extends BasePage {
  readonly path = '/web/index.php/admin/viewJobTitleList';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
