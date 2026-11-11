import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Time > Project Info > Projects > Add — /web/index.php/time/saveProject. */
export class AddProjectPage extends BasePage {
  readonly path = '/web/index.php/time/saveProject';
  readonly name: FormField;
  readonly customerName: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = new FormField(page, 'Name');
    this.customerName = new FormField(page, 'Customer Name');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
