import { type Locator, type Page } from '@playwright/test';

/** Notification toasts shown after save, update and delete actions. */
export class Toast {
  readonly saved: Locator;
  readonly updated: Locator;
  readonly deleted: Locator;

  constructor(page: Page) {
    // Toasts have no role; scope to the toast element so the text can't match page content.
    const toasts = page.locator('.oxd-toast');
    this.saved = toasts.getByText('Successfully Saved', { exact: true });
    this.updated = toasts.getByText('Successfully Updated', { exact: true });
    this.deleted = toasts.getByText('Successfully Deleted', { exact: true });
  }
}
