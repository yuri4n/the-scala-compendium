import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const externalServer = process.env.PLAYWRIGHT_BASE_URL
const baseURL = externalServer || 'http://127.0.0.1:3030'

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'html',
  use: {
    baseURL,
    locale: 'en-US',
    colorScheme: 'light',
    trace: 'on-first-retry',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  // CI and local runs exercise production CSS and SSR. An explicit URL can
  // reuse a production server that the caller has already built and started.
  webServer: externalServer
    ? undefined
    : {
        command: 'pnpm build && node .output/server/index.mjs',
        url: baseURL,
        env: {
          NITRO_PORT: '3030',
          NITRO_PRESET: 'node-server',
          NUXT_TELEMETRY_DISABLED: '1',
        },
        reuseExistingServer: false,
        timeout: 180_000,
      },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
