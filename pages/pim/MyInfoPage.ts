import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/** My Info — /web/index.php/pim/viewMyDetails, the logged-in user's own employee record. */
export class MyInfoPage extends BasePage {
  readonly path = '/web/index.php/pim/viewMyDetails';
  /** The user's full name above the tabs: the first level-6 heading in the content. */
  readonly employeeNameHeading: Locator;
  readonly tabs: Locator;

  constructor(page: Page) {
    super(page);
    this.employeeNameHeading = this.content.getByRole('heading', { level: 6 }).first();
    this.tabs = this.content.getByRole('tab');
  }
}
