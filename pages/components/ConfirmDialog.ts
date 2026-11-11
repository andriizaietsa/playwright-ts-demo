import { type Locator, type Page } from '@playwright/test';

/** Modal confirmation shown before deleting a record or updating an entitlement. */
export class ConfirmDialog {
  readonly root: Locator;
  readonly yesDeleteButton: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('dialog');
    this.yesDeleteButton = this.root.getByRole('button', { name: 'Yes, Delete' });
    this.confirmButton = this.root.getByRole('button', { name: 'Confirm', exact: true });
  }
}
