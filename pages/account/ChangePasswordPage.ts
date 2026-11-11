import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** User menu > Change Password — /web/index.php/pim/updatePassword. */
export class ChangePasswordPage extends BasePage {
  readonly path = '/web/index.php/pim/updatePassword';

  readonly currentPassword: FormField;
  readonly password: FormField;
  readonly confirmPassword: FormField;
  readonly saveButton: Locator;
  readonly passwordsDoNotMatchError: Locator;

  constructor(page: Page) {
    super(page);
    this.currentPassword = new FormField(page, 'Current Password');
    this.password = new FormField(page, 'Password');
    this.confirmPassword = new FormField(page, 'Confirm Password');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
    this.passwordsDoNotMatchError = this.content.getByText('Passwords do not match', { exact: true });
  }
}
