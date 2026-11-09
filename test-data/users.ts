export type UserRole = 'Admin' | 'ESS';
export type UserStatus = 'Enabled' | 'Disabled';

export interface SystemUser {
  role: UserRole;
  /** Full name of an existing employee, as shown in the autocomplete. */
  employeeName: string;
  status: UserStatus;
  username: string;
  password: string;
}

/**
 * Every record this suite creates on the server starts with this prefix (case-insensitive),
 * so leftovers from a killed run can be found and removed in one search.
 */
export const E2E_PREFIX = 'e2e';

/** Short unique suffix so parallel runs (and other people on the shared demo) never collide. */
export const uniqueSuffix = (): string =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function buildAdminUser(employeeName: string, overrides: Partial<SystemUser> = {}): SystemUser {
  const suffix = uniqueSuffix();
  return {
    role: 'Admin',
    employeeName,
    status: 'Enabled',
    username: `${E2E_PREFIX}_admin_${suffix}`,
    password: `Pw!${suffix}9`,
    ...overrides,
  };
}
