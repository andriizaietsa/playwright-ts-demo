import { type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';

/** Leave > Configure > Leave Types — /web/index.php/leave/leaveTypeList. */
export class LeaveTypesPage extends BasePage {
  readonly path = '/web/index.php/leave/leaveTypeList';
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.table = new DataTable(page);
  }
}
