// @ts-check

import { defineConfig, devices } from '@playwright/test';

const isJenkins = Boolean(process.env.JENKINS_URL);

export default defineConfig({

  // Folder containing your test files
  testDir: './tests',

  //run failed test cases
  retries :1,

  // Run tests in sequence
   fullyParallel: false,
   
    //  fullyParallel:true,
    //  workers: 2,

  // Timeout for each test
  timeout: 40 * 1000,

  // Timeout for assertions
  expect: {
    timeout: 40 * 1000,
  },

  // HTML and Allure reports
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],

  // Common settings
  use: {
    actionTimeout: 10*1000,
    navigationTimeout :30*1000,
    headless: isJenkins,
    viewport: { width: 1366, height: 768 },
    trace: 'on-first-retry',
   
  },

  // Run only in Chromium
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: isJenkins,
        screenshot: 'only-on-failure',
        video :'retain-on-failure',
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        trace     : 'retain-on-failure',
      },
    },
  ],

});
