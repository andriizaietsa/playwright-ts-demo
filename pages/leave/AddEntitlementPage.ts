import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { FormField } from '../components/FormField';

/** Leave > Entitlements > Add Entitlements — /web/index.php/leave/addLeaveEntitlement. */
export class AddEntitlementPage extends BasePage {
  readonly path = '/web/index.php/leave/addLeaveEntitlement';
  readonly employeeName: FormField;
  readonly leaveType: FormField;
  readonly entitlement: FormField;
  readonly saveButton: Locator;
  /** "Updating Entitlement" confirmation shown after Save. */
  readonly confirmDialog: ConfirmDialog;

  constructor(page: Page) {
    super(page);
    this.employeeName = new FormField(page, 'Employee Name');
    this.leaveType = new FormField(page, 'Leave Type');
    this.entitlement = new FormField(page, 'Entitlement');
    this.saveButton = this.content.getByRole('button', { name: 'Save' });
    this.confirmDialog = new ConfirmDialog(page);
  }
}
