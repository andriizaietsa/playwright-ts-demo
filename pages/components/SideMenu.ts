import { type Locator, type Page } from '@playwright/test';

export type MenuItem = 'Admin' | 'PIM' | 'Leave' | 'Time' | 'Recruitment' | 'My Info' | 'Dashboard';

/** Left navigation menu that is shown on every page after login. */
export class SideMenu {
  readonly root: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('navigation', { name: 'Sidepanel' });
  }

  async open(item: MenuItem): Promise<void> {
    await this.root.getByRole('link', { name: item, exact: true }).click();
  }
}
