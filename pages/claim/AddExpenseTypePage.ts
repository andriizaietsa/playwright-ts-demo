import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Claim > Configuration > Expense Types > Add — /web/index.php/claim/saveExpense. */
export class AddExpenseTypePage extends BasePage {
  readonly path = '/web/index.php/claim/saveExpense';
  readonly name: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = new FormField(page, 'Name');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
