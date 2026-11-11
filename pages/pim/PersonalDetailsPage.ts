import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** PIM > Employee > Personal Details — /web/index.php/pim/viewPersonalDetails/empNumber/<id>. */
export class PersonalDetailsPage extends BasePage {
  /** Prefix only: the page needs an employee number, so use gotoEmployee(). */
  readonly path = '/web/index.php/pim/viewPersonalDetails/empNumber/';

  /** The employee's full name above the tabs: the first level-6 heading in the content. */
  readonly employeeNameHeading: Locator;
  readonly firstNameInput: Locator;
  readonly otherId: FormField;
  /** Save of the Personal Details form; the Custom Fields form below has its own Save. */
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.employeeNameHeading = this.content.getByRole('heading', { level: 6 }).first();
    this.firstNameInput = this.content.getByPlaceholder('First Name');
    this.otherId = new FormField(page, 'Other Id');
    this.saveButton = this.content
      .locator('form')
      .filter({ has: this.otherId.group })
      .getByRole('button', { name: 'Save' });
  }

  /** Not usable on its own: the page needs an employee number. */
  goto(): Promise<void> {
    return Promise.reject(
      new Error('PersonalDetailsPage needs an employee: use gotoEmployee(empNumber) instead of goto().'),
    );
  }

  async gotoEmployee(empNumber: number): Promise<void> {
    await this.page.goto(`${this.path}${empNumber}`);
  }
}
