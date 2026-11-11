import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';
import { type SystemUser } from '../../test-data/users';

/** Admin > User Management > Add User — /web/index.php/admin/saveSystemUser. */
export class AddUserPage extends BasePage {
  readonly path = '/web/index.php/admin/saveSystemUser';

  readonly heading: Locator;
  readonly userRole: FormField;
  readonly employeeName: FormField;
  readonly status: FormField;
  readonly username: FormField;
  readonly password: FormField;
  readonly confirmPassword: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Add User' });
    this.userRole = new FormField(page, 'User Role');
    this.employeeName = new FormField(page, 'Employee Name');
    this.status = new FormField(page, 'Status');
    this.username = new FormField(page, 'Username');
    this.password = new FormField(page, 'Password');
    this.confirmPassword = new FormField(page, 'Confirm Password');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }

  /** Fills every required field. Saving is left to the spec, since that is what it verifies. */
  async fillForm(user: SystemUser): Promise<void> {
    await this.userRole.select(user.role);
    await this.employeeName.autocomplete(user.employeeName);
    await this.status.select(user.status);
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
  }
}
