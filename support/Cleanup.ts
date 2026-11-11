/**
 * Collects cleanup actions during a test and runs them afterwards, newest first,
 * so dependants (a KPI) are removed before what they depend on (its job title).
 * A failed action is logged, never thrown, so cleanup can't mask or fake a test result.
 */
export class Cleanup {
  private readonly actions: { label: string; run: () => Promise<void> }[] = [];

  add(label: string, run: () => Promise<void>): void {
    this.actions.push({ label, run });
  }

  async runAll(): Promise<void> {
    for (const { label, run } of this.actions.reverse()) {
      try {
        await run();
      } catch (error) {
        console.warn(`Cleanup failed for ${label}:`, error);
      }
    }
  }
}
