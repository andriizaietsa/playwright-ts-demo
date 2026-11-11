import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/** Leave > Assign Leave — /web/index.php/leave/assignLeave. */
export class AssignLeavePage extends BasePage {
  readonly path = '/web/index.php/leave/assignLeave';
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = this.content.getByRole('heading', { name: 'Assign Leave' });
  }
}
