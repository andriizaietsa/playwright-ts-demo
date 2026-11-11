import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Login screen — /web/index.php/auth/login. */
export class LoginPage extends BasePage {
  readonly path = '/web/index.php/auth/login';

  // ─── Form fields ───
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // ─── Errors ───
  /** Banner shown above the form after a rejected login ("Invalid credentials"). */
  readonly errorAlert: Locator;
  readonly usernameRequiredError: Locator;
  readonly passwordRequiredError: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.errorAlert = page.getByRole('alert');
    // Field errors are not linked to their input; scope each "Required" to the input's .oxd-input-group.
    this.usernameRequiredError = page
      .locator('.oxd-input-group')
      .filter({ has: this.usernameInput })
      .getByText('Required', { exact: true });
    this.passwordRequiredError = page
      .locator('.oxd-input-group')
      .filter({ has: this.passwordInput })
      .getByText('Required', { exact: true });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
