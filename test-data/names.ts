/**
 * Every record this suite creates on the server starts with this prefix (case-insensitive),
 * so leftovers from a killed run can be found and removed in one search.
 */
export const E2E_PREFIX = 'e2e';

/** Short unique suffix so parallel runs (and other people on the shared demo) never collide. */
export const uniqueSuffix = (): string =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** A unique, recognisable record name, e.g. "E2E Job Title mwc3abcd1x2y". */
export const uniqueName = (kind: string): string => `${E2E_PREFIX.toUpperCase()} ${kind} ${uniqueSuffix()}`;
