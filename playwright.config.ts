import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173
    // command: 'npm start',
    // port: 5173
  },
  testDir: 'tests'
}

export default config
