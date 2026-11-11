import { type Locator, type Page } from '@playwright/test';

/** The results table used by every OrangeHRM list page. */
export class DataTable {
  readonly headers: Locator;
  readonly rows: Locator;

  constructor(private readonly page: Page) {
    const table = page.getByRole('table');
    this.headers = table.getByRole('columnheader');
    // The first rowgroup holds the column headers; the second holds the data rows.
    this.rows = table.getByRole('rowgroup').nth(1).getByRole('row');
  }

  /** Data rows that have a cell with exactly this text. */
  rowWith(cellText: string): Locator {
    return this.rows.filter({ has: this.page.getByRole('cell', { name: cellText, exact: true }) });
  }

  deleteButton(row: Locator): Locator {
    // Row actions are icon-only buttons without an accessible name; the trash icon identifies Delete.
    return row.getByRole('button').filter({ has: this.page.locator('.bi-trash') });
  }

  /** The cell of `row` under the column titled `column`, located by the header's position. */
  async cell(row: Locator, column: string): Promise<Locator> {
    await this.headers.first().waitFor();
    const titles = (await this.headers.allInnerTexts()).map((title) => title.trim());
    const index = titles.indexOf(column);
    if (index === -1) throw new Error(`Column "${column}" not found. Columns: ${titles.join(', ')}`);
    return row.getByRole('cell').nth(index);
  }
}
