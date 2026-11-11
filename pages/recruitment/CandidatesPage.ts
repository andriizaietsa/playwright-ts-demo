import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { DataTable } from '../components/DataTable';
import { FormField } from '../components/FormField';
import { clickAndWaitForList } from '../components/listSearch';

/** Recruitment > Candidates — /web/index.php/recruitment/viewCandidates. */
export class CandidatesPage extends BasePage {
  readonly path = '/web/index.php/recruitment/viewCandidates';
  readonly candidateNameFilter: FormField;
  readonly searchButton: Locator;
  readonly table: DataTable;
  readonly confirmDialog: ConfirmDialog;

  constructor(page: Page) {
    super(page);
    this.candidateNameFilter = new FormField(page, 'Candidate Name');
    this.searchButton = this.content.getByRole('button', { name: 'Search' });
    this.table = new DataTable(page);
    this.confirmDialog = new ConfirmDialog(page);
  }

  /**
   * Picks the candidate in the name filter and runs the search.
   * The autocomplete matches one name at a time, so it is searched by the (unique) last name.
   */
  async searchByCandidate(candidate: { lastName: string; fullName: string }): Promise<void> {
    await this.candidateNameFilter.autocomplete(candidate.lastName, candidate.fullName);
    await this.search();
  }

  /** Re-runs the search with the filters already set. */
  async search(): Promise<void> {
    await clickAndWaitForList(this.page, this.searchButton, '/api/v2/recruitment/candidates', 'candidateId');
  }
}
