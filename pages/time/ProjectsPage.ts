import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Time > Project Info > Projects — /web/index.php/time/viewProjects. */
export class ProjectsPage extends BasePage {
  readonly path = '/web/index.php/time/viewProjects';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
