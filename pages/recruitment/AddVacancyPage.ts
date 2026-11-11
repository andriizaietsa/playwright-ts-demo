import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { FormField } from '../components/FormField';

/**
 * Recruitment > Vacancies > Add Vacancy — /web/index.php/recruitment/addJobVacancy.
 * Saving reloads the whole page as Edit Vacancy (/addJobVacancy/<id>), so no success toast is visible.
 */
export class AddVacancyPage extends BasePage {
  readonly path = '/web/index.php/recruitment/addJobVacancy';
  readonly vacancyName: FormField;
  readonly jobTitle: FormField;
  readonly hiringManager: FormField;
  readonly saveButton: Locator;
  /** Heading of the page the app reloads into after a successful save. */
  readonly editVacancyHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.vacancyName = new FormField(page, 'Vacancy Name');
    this.jobTitle = new FormField(page, 'Job Title');
    this.hiringManager = new FormField(page, 'Hiring Manager');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
    this.editVacancyHeading = this.content.getByRole('heading', { name: 'Edit Vacancy' });
  }
}
