import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Time > Project Info > Customers — /web/index.php/time/viewCustomers. */
export class CustomersPage extends BasePage {
  readonly path = '/web/index.php/time/viewCustomers';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
