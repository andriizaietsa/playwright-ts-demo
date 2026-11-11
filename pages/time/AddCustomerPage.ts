import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Time > Project Info > Customers > Add — /web/index.php/time/addCustomer. */
export class AddCustomerPage extends BasePage {
  readonly path = '/web/index.php/time/addCustomer';
  readonly name: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = new FormField(page, 'Name');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
