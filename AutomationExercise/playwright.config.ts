// playwright.config.ts
import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  // Test directory
  testDir: './specs',
  
  // Global setup and teardown
  globalSetup: require.resolve('./utils/global-setup.js'),
  globalTeardown: require.resolve('./utils/global-teardown.js'),
  
  // Timeout settigenerate playwright code for test cases defined at /tests using ./playwright.config.js. Run the tests and serve the reportngs
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000 // 5 seconds for assertions
  },
  
  // Test execution settings
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['line']
  ],
  
  // Global test configuration
  use: {
    // Base URL for all tests
    baseURL: 'https://www.automationexercise.com',

    launchOptions: {
      args: ['--start-maximized', '--disable-infobars']
    },

    // Browser settings
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Screenshots and videos
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },
    video: {
      mode: 'retain-on-failure',
      size: { width: 640, height: 480 }
    },
    
    // Tracing for debugging
    trace: 'on',
    
    // Action settings
    actionTimeout: 10000,
    navigationTimeout: 15000
  },

  // Projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/*.spec.{js,ts}'
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/*.spec.{js,ts}'
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/*.spec.{js,ts}'
    },
    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: '**/*.mobile.spec.{js,ts}'
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testMatch: '**/*.mobile.spec.{js,ts}'
    },
    // API testing
    {
      name: 'api',
      testMatch: '**/*.api.spec.{js,ts}',
      use: {
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    }
  ],

  // Output directory
  outputDir: 'test-results/',
  
  // Test metadata
  metadata: {
    project: 'AI Playwright Testing',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  }
});

export default config;
