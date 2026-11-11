import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Performance > Configure > KPIs > Add — /web/index.php/performance/saveKpi. */
export class AddKpiPage extends BasePage {
  readonly path = '/web/index.php/performance/saveKpi';
  readonly kpi: FormField;
  readonly jobTitle: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.kpi = new FormField(page, 'Key Performance Indicator');
    this.jobTitle = new FormField(page, 'Job Title');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
