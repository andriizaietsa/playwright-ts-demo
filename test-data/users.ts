import { E2E_PREFIX, uniqueSuffix } from './names';

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
