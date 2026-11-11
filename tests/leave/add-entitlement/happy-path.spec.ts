/**
 * Leave — Add entitlement › Happy path
 *
 * An admin gives an employee 5 days of a leave type; the employee's entitlements show those 5 days.
 *
 * Seeding: one employee and one leave type via the API, so the entitlement starts at zero.
 * Cleanup: the entitlement, then the leave type and the employee, after the test.
 */
import { test, expect } from '../../../fixtures/leave.fixture';

test.describe('Leave — Add entitlement › Happy path', { tag: '@smoke' }, () => {
  test('Add 5 days of entitlement — shown in the employee’s entitlements', async ({
    page,
    api,
    seed,
    cleanup,
    addEntitlementPage,
    entitlementsPage,
  }) => {
    const employee = await seed.employee();
    const leaveType = await seed.leaveType();
    cleanup.add('entitlement', () => api.deleteEntitlements(employee.empNumber, leaveType.id));

    await test.step('Fill in employee, leave type and days', async () => {
      await addEntitlementPage.goto();
      await addEntitlementPage.employeeName.autocomplete(employee.firstName, employee.fullName);
      await addEntitlementPage.leaveType.select(leaveType.name);
      await addEntitlementPage.entitlement.fill('5');
    });

    await test.step('Save and confirm the entitlement', async () => {
      await addEntitlementPage.saveButton.click();
      await addEntitlementPage.confirmDialog.confirmButton.click();
    });

    await test.step('Verify the employee’s entitlements show 5 days', async () => {
      // Gate: the app opens the employee's entitlements only after a successful save.
      await expect(page).toHaveURL(/\/leave\/viewLeaveEntitlements/);
      const { table } = entitlementsPage;
      const row = table.rowWith(leaveType.name);
      await expect(row).toHaveCount(1);
      await expect.soft(await table.cell(row, 'Days')).toHaveText('5');
      await expect.soft(entitlementsPage.totalDays).toHaveText('Total 5.00 Day(s)');
    });
  });
});
