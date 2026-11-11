import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Claim > Configuration > Expense Types — /web/index.php/claim/viewExpense. */
export class ExpenseTypesPage extends BasePage {
  readonly path = '/web/index.php/claim/viewExpense';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
