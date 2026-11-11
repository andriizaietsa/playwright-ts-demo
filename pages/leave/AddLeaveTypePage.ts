import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Leave > Configure > Leave Types > Add — /web/index.php/leave/defineLeaveType. */
export class AddLeaveTypePage extends BasePage {
  readonly path = '/web/index.php/leave/defineLeaveType';
  readonly name: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = new FormField(page, 'Name');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
