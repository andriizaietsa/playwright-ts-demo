/**
 * Central place for environment-specific values.
 * Override any of them with environment variables (e.g. in CI) — the defaults
 * are the public credentials of the OrangeHRM demo site.
 */
export const env = {
  // `||`, not `??`: in CI an unset secret arrives as an empty string, which must also fall back.
  adminUsername: process.env.ADMIN_USERNAME || 'Admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
};

/** Where the logged-in admin session is stored by the setup project. */
export const ADMIN_STORAGE_STATE = 'playwright/.auth/admin.json';
