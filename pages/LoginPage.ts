import { type Locator, type Page } from '@playwright/test';

/** Login screen — /web/index.php/auth/login. */
export class LoginPage {
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

  constructor(private readonly page: Page) {
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

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
