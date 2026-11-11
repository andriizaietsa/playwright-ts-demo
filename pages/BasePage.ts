import { type Locator, type Page } from '@playwright/test';
import { Toast } from './components/Toast';

/** Shared base for every page object: its URL path, navigation, the page content area and toasts. */
export abstract class BasePage {
  /** URL path of the page, relative to baseURL. */
  abstract readonly path: string;
  /** Main content area, excluding the side menu and top bar. It has no landmark role. */
  readonly content: Locator;
  readonly toast: Toast;

  constructor(protected readonly page: Page) {
    this.content = page.locator('.oxd-layout-context');
    this.toast = new Toast(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }
}
