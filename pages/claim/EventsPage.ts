import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Claim > Configuration > Events — /web/index.php/claim/viewEvents. */
export class EventsPage extends BasePage {
  readonly path = '/web/index.php/claim/viewEvents';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
