import { type Locator, type Page } from '@playwright/test';

/** Dashboard — /web/index.php/dashboard/index, the landing page after login. */
export class DashboardPage {
  readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/dashboard/index');
  }
}
