import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',

  fullyParallel: true,

  forbidOnly: true,

  retries: 0,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'mobile',
      use: {
        viewport: {
          width: 390,
          height: 844,
        },
      },
    },
    {
      name: 'tablet',
      use: {
        viewport: {
          width: 768,
          height: 1024,
        },
      },
    },
    {
      name: 'desktop',
      use: {
        viewport: {
          width: 1440,
          height: 900,
        },
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
})