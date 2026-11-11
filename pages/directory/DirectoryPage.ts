import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';
import { clickAndWaitForList } from '../components/listSearch';

/** Directory — /web/index.php/directory/viewDirectory: employee cards with a search filter. */
export class DirectoryPage extends BasePage {
  readonly path = '/web/index.php/directory/viewDirectory';
  readonly employeeNameFilter: FormField;
  readonly searchButton: Locator;
  /** "(1) Record Found" / "(12) Records Found" above the cards. */
  readonly recordsFound: Locator;

  constructor(page: Page) {
    super(page);
    this.employeeNameFilter = new FormField(page, 'Employee Name');
    this.searchButton = this.content.getByRole('button', { name: 'Search' });
    this.recordsFound = this.content.getByText(/^\(\d+\) Records? Found$/);
  }

  /** The employee's name on a result card (the filter input's value is not text, so it can't match). */
  employeeCardName(fullName: string): Locator {
    return this.content.getByText(fullName, { exact: true });
  }

  async searchByEmployee(employee: { firstName: string; fullName: string }): Promise<void> {
    await this.employeeNameFilter.autocomplete(employee.firstName, employee.fullName);
    await clickAndWaitForList(this.page, this.searchButton, '/api/v2/directory/employees', 'empNumber');
  }
}
