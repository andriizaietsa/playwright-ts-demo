import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/** Recruitment > Candidates > Add Candidate — /web/index.php/recruitment/addCandidate. */
export class AddCandidatePage extends BasePage {
  readonly path = '/web/index.php/recruitment/addCandidate';
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly email: FormField;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.content.getByPlaceholder('First Name');
    this.lastNameInput = this.content.getByPlaceholder('Last Name');
    this.email = new FormField(page, 'Email');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
  }
}
