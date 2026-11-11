import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataTable } from '../components/DataTable';
import { FormField } from '../components/FormField';
import { clickAndWaitForList } from '../components/listSearch';

/** Performance > Configure > KPIs — /web/index.php/performance/searchKpi. */
export class KpisPage extends BasePage {
  readonly path = '/web/index.php/performance/searchKpi';
  readonly jobTitleFilter: FormField;
  readonly searchButton: Locator;
  readonly table: DataTable;

  constructor(page: Page) {
    super(page);
    this.jobTitleFilter = new FormField(page, 'Job Title');
    this.searchButton = this.content.getByRole('button', { name: 'Search' });
    this.table = new DataTable(page);
  }

  async searchByJobTitle(jobTitle: string): Promise<void> {
    await this.jobTitleFilter.select(jobTitle);
    await clickAndWaitForList(this.page, this.searchButton, '/api/v2/performance/kpis', 'jobTitleId');
  }
}
