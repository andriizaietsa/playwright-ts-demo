import { type Locator, type Page } from '@playwright/test';

export type MenuItem =
  | 'Admin'
  | 'PIM'
  | 'Leave'
  | 'Time'
  | 'Recruitment'
  | 'My Info'
  | 'Performance'
  | 'Dashboard'
  | 'Directory'
  | 'Maintenance'
  | 'Claim'
  | 'Buzz';

/** Left navigation menu that is shown on every page after login. */
export class SideMenu {
  readonly root: Locator;
  readonly searchInput: Locator;
  /** Module links only; the brand banner link sits outside the list. */
  readonly menuLinks: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('navigation', { name: 'Sidepanel' });
    this.searchInput = this.root.getByPlaceholder('Search');
    this.menuLinks = this.root.getByRole('list').getByRole('link');
  }

  link(item: MenuItem): Locator {
    return this.root.getByRole('link', { name: item, exact: true });
  }

  async open(item: MenuItem): Promise<void> {
    await this.link(item).click();
  }
}
