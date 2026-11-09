import { type Locator, type Page } from '@playwright/test';
import { FormField } from '../components/FormField';

export type UsersColumn = 'Username' | 'User Role' | 'Employee Name' | 'Status';

// Cell position of each column in a result row. Index 0 is the row checkbox, the last cell holds the actions.
const COLUMN_INDEX: Record<UsersColumn, number> = {
  Username: 1,
  'User Role': 2,
  'Employee Name': 3,
  Status: 4,
};

/** Admin > User Management > Users — /web/index.php/admin/viewSystemUsers. */
export class SystemUsersPage {
  // ─── Header ───
  readonly heading: Locator;
  readonly addButton: Locator;

  // ─── Search filter ───
  readonly usernameFilter: FormField;
  readonly searchButton: Locator;

  // ─── Results table ───
  readonly resultRows: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'System Users' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.usernameFilter = new FormField(page, 'Username');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    // The first rowgroup holds the column headers; the second holds the data rows.
    this.resultRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row');
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/admin/viewSystemUsers');
  }

  /**
   * Waits for the filtered list response: until it lands the table still shows the
   * unfiltered list, which may already contain the user and would hide a broken search.
   */
  async searchByUsername(username: string): Promise<void> {
    await this.usernameFilter.fill(username);
    const filtered = this.page.waitForResponse(
      (res) =>
        res.url().includes('/api/v2/admin/users') &&
        new URL(res.url()).searchParams.get('username') === username,
    );
    await this.searchButton.click();
    await filtered;
  }

  /** The result row for one user, matched on its exact Username cell. */
  rowFor(username: string): Locator {
    return this.resultRows.filter({
      has: this.page.getByRole('cell', { name: username, exact: true }),
    });
  }

  cell(row: Locator, column: UsersColumn): Locator {
    return row.getByRole('cell').nth(COLUMN_INDEX[column]);
  }
}
