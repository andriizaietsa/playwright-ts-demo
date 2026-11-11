import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Leave > Entitlements > Employee Entitlements — /web/index.php/leave/viewLeaveEntitlements. */
export class EntitlementsPage extends BasePage {
  readonly path = '/web/index.php/leave/viewLeaveEntitlements';
  readonly table: DataTable;
  /** "Total 5.00 Day(s)" summary above the table. */
  readonly totalDays: Locator;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
    this.totalDays = this.content.getByText(/^Total [\d.]+ Day\(s\)$/);
  }
}
