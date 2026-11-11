import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Claim > Configuration > Events > Add — /web/index.php/claim/saveEvents. */
export class AddEventPage extends BasePage {
  readonly path = '/web/index.php/claim/saveEvents';
  readonly eventName: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.eventName = new FormField(page, 'Event Name');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
