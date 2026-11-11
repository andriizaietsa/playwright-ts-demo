import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { DataTable } from '../components/DataTable';
import { FormField } from '../components/FormField';
import { clickAndWaitForList } from '../components/listSearch';

/** PIM > Employee List — /web/index.php/pim/viewEmployeeList. */
export class EmployeeListPage extends BasePage {
  readonly path = '/web/index.php/pim/viewEmployeeList';

  readonly employeeNameFilter: FormField;
  readonly searchButton: Locator;
  readonly table: DataTable;
  readonly confirmDialog: ConfirmDialog;

  constructor(page: Page) {
    super(page);
    this.employeeNameFilter = new FormField(page, 'Employee Name');
    this.searchButton = this.content.getByRole('button', { name: 'Search' });
    this.table = new DataTable(page);
    this.confirmDialog = new ConfirmDialog(page);
  }

  /** Picks the employee in the name filter and runs the search. */
  async searchByEmployee(employee: { firstName: string; fullName: string }): Promise<void> {
    await this.employeeNameFilter.autocomplete(employee.firstName, employee.fullName);
    await this.search();
  }

  /** Re-runs the search with the filters already set. */
  async search(): Promise<void> {
    await clickAndWaitForList(this.page, this.searchButton, '/api/v2/pim/employees', 'empNumber');
  }
}
