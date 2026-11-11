import { type Locator, type Page } from '@playwright/test';

export type UserMenuItem = 'About' | 'Support' | 'Change Password' | 'Logout';

/** Top bar with the current module title and the user menu. */
export class TopBar {
  readonly userDropdown: Locator;
  readonly userName: Locator;
  readonly aboutDialog: Locator;

  constructor(private readonly page: Page) {
    const banner = page.getByRole('banner');
    this.userDropdown = banner
      .getByRole('listitem')
      .filter({ has: page.getByRole('img', { name: 'profile picture' }) });
    this.userName = this.userDropdown.getByRole('paragraph');
    this.aboutDialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'About' }) });
  }

  async openUserMenuItem(item: UserMenuItem): Promise<void> {
    await this.userDropdown.click();
    await this.page.getByRole('menuitem', { name: item }).click();
  }
}
