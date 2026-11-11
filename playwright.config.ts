import { defineConfig, devices } from '@playwright/test';
import { ADMIN_STORAGE_STATE } from './config/env';

export default defineConfig({
  testDir: './tests',
  // The shared public demo is slow, and most tests seed data through the API first.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // Logs in once and saves the session for the chromium project below.
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    // Tests run in Chrome only.
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: ADMIN_STORAGE_STATE },
      dependencies: ['setup'],
    },
  ],
});
