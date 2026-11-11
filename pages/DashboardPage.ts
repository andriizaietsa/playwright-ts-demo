import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export type QuickLaunchItem = 'Assign Leave' | 'Leave List' | 'Timesheets' | 'Apply Leave' | 'My Leave' | 'My Timesheet';

/** Dashboard — /web/index.php/dashboard/index, the landing page after login. */
export class DashboardPage extends BasePage {
  readonly path = '/web/index.php/dashboard/index';

  readonly heading: Locator;
  /** Title of every dashboard widget, in page order. The titles are plain text without a heading role. */
  readonly widgetTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.widgetTitles = page.locator('.orangehrm-dashboard-widget-name');
  }

  quickLaunchButton(item: QuickLaunchItem): Locator {
    return this.content.getByRole('button', { name: item, exact: true });
  }
}
