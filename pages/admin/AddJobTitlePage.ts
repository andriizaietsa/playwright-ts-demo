import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Admin > Job > Job Titles > Add — /web/index.php/admin/saveJobTitle. */
export class AddJobTitlePage extends BasePage {
  readonly path = '/web/index.php/admin/saveJobTitle';
  readonly jobTitle: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.jobTitle = new FormField(page, 'Job Title');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
