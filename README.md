# Playwright Browser Automation Project

This is a Playwright-based browser automation project built with TypeScript. It provides a structured framework for writing and running automated browser tests across multiple browsers and platforms.

## Features

- **Cross-browser Testing**: Run tests on Chromium, Firefox, and WebKit
- **Mobile Testing**: Test on mobile devices (iPhone 12, Pixel 5)
- **Page Object Model**: Organized page objects for maintainability
- **Utilities**: Helper functions for common testing tasks
- **TypeScript Support**: Full TypeScript configuration for type safety
- **HTML Reporting**: Built-in HTML test reports
- **Screenshots & Videos**: Automatic capture on test failures
- **Parallel Execution**: Run tests in parallel for faster execution

## Installation

```bash
npm install
npm run install:browsers
```

## Configuration

Edit `playwright.config.ts` to customize:
- Base URL
- Browser configurations
- Retry policies
- Screenshots and video capture settings
- Reporter options

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Run tests in UI mode (interactive)

```bash
npm run test:ui
```

### Debug tests

```bash
npm run test:debug
```

### Generate tests using Codegen

```bash
npm run codegen
```

## Project Structure

```
.
├── tests/                 # Test files (.spec.ts)
├── pages/                 # Page Object Model files
├── utils/                 # Utility helper functions
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## Writing Tests

### Example Test

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toContain('Example Domain');
});
```

### Using Page Objects

```typescript
import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

test('using page object', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goto('https://example.com');
  const title = await basePage.getTitle();
  expect(title).toBeTruthy();
});
```

## Viewing Test Results

After running tests, open the HTML report:

```bash
npx playwright show-report
```

## Browser Support

- **Chromium**: Latest version
- **Firefox**: Latest version
- **WebKit**: Latest version
- **Mobile Chrome**: Pixel 5
- **Mobile Safari**: iPhone 12

## Best Practices

1. Use Page Object Model for maintainability
2. Keep tests focused and independent
3. Use meaningful test names
4. Avoid hardcoded waits; use proper wait strategies
5. Clean up resources in afterEach hooks
6. Use fixtures for common setup

## Troubleshooting

### Browsers not installed

```bash
npm run install:browsers
```

### Port already in use

Update the `webServer` configuration in `playwright.config.ts` to use a different port.

### Tests timing out

Increase timeout in `playwright.config.ts` or specific tests:

```typescript
test.setTimeout(60000);
```

## License

MIT

## Support

For more information, visit [Playwright Documentation](https://playwright.dev)
