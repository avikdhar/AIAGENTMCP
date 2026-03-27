import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('capture snapshot and network requests', async ({ page }) => {
  const requests: string[] = [];

  // Listen for network requests
  page.on('request', request => {
    requests.push(`${request.method()} ${request.url()}`);
  });

  // Navigate to example.com
  await page.goto('https://example.com');

  // Take a screenshot
  const testResultsDir = path.join(process.cwd(), 'test-results');
  const screenshotPath = path.join(testResultsDir, 'example-snapshot.png');
  
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }
  
  await page.screenshot({ path: screenshotPath });

  console.log('--- Network Requests ---');
  requests.forEach(req => console.log(req));
  console.log('------------------------');
  console.log(`Screenshot saved to: ${screenshotPath}`);
});
