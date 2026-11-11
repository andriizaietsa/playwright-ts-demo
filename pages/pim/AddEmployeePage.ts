import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/** PIM > Add Employee — /web/index.php/pim/addEmployee. */
export class AddEmployeePage extends BasePage {
  readonly path = '/web/index.php/pim/addEmployee';
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.content.getByPlaceholder('First Name');
    this.lastNameInput = this.content.getByPlaceholder('Last Name');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
