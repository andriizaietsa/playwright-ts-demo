import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { DataTable } from '../components/DataTable';
import { FormField } from '../components/FormField';
import { clickAndWaitForList } from '../components/listSearch';

/** Admin > User Management > Users — /web/index.php/admin/viewSystemUsers. */
export class SystemUsersPage extends BasePage {
  readonly path = '/web/index.php/admin/viewSystemUsers';

  readonly heading: Locator;
  readonly addButton: Locator;
  readonly usernameFilter: FormField;
  readonly searchButton: Locator;
  readonly table: DataTable;
  readonly confirmDialog: ConfirmDialog;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'System Users' });
    this.addButton = this.content.getByRole('button', { name: 'Add' });
    this.usernameFilter = new FormField(page, 'Username');
    this.searchButton = this.content.getByRole('button', { name: 'Search' });
    this.table = new DataTable(page);
    this.confirmDialog = new ConfirmDialog(page);
  }

  async searchByUsername(username: string): Promise<void> {
    await this.usernameFilter.fill(username);
    await clickAndWaitForList(this.page, this.searchButton, '/api/v2/admin/users', 'username');
  }
}
