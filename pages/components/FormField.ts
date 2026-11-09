import { type Locator, type Page } from '@playwright/test';

/**
 * OrangeHRM form fields are not linked to their <label>, so getByLabel() does not work.
 * This wraps the "label + control" group so page objects can still address fields by their visible label.
 */
export class FormField {
  readonly group: Locator;

  constructor(
    private readonly page: Page,
    label: string,
  ) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    this.group = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label', { hasText: new RegExp(`^${escaped}$`) }) });
  }

  get input(): Locator {
    return this.group.locator('input');
  }

  /** Fill a plain text / password input. */
  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }

  /** Pick a value from an OrangeHRM custom dropdown (oxd-select). */
  async select(option: string): Promise<void> {
    await this.group.locator('.oxd-select-text').click();
    await this.page.getByRole('listbox').getByRole('option', { name: option, exact: true }).click();
  }

  /** Type into an autocomplete and pick the matching suggestion. */
  async autocomplete(search: string, option: string | RegExp = search): Promise<void> {
    await this.group.getByPlaceholder('Type for hints...').fill(search);
    await this.page.getByRole('listbox').getByRole('option', { name: option }).click();
  }
}
