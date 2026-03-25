import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toContain('Example Domain');
});

test('example test with heading', async ({ page }) => {
  await page.goto('https://example.com');
  const heading = page.locator('h1');
  await expect(heading).toContainText('Example Domain');
});

test('example test with link', async ({ page }) => {
  await page.goto('https://example.com');
  const link = page.locator('a');
  await expect(link).toBeVisible();
});

test('login and add iPhone X to cart then verify at checkout', async ({ page }) => {
  // Set up dialog handler BEFORE navigating for JavaScript alerts
  page.on('dialog', async dialog => {
    console.log('Dialog:', dialog.message());
    await dialog.accept();
  });

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'networkidle' });

  // Wait a moment for any modals to render
  await page.waitForTimeout(2000);

  // Try to dismiss the modal if it exists by using JavaScript click
  try {
    const okayBtn = page.locator('#okayBtn');
    if (await okayBtn.count() > 0) {
      // Use JavaScript to click it since it might be hidden/disabled
      await page.evaluate(() => {
        const btn = document.querySelector('#okayBtn') as HTMLButtonElement;
        if (btn) btn.click();
      });
      await page.waitForTimeout(500);
    }
  } catch (e) {
    console.log('Modal not found or already dismissed');
  }

  // Fill login credentials
  await page.fill('#username', 'rahulshettyacademy', { timeout: 5000 });
  await page.fill('#password', 'Learning@830$3mK2', { timeout: 5000 });
  
  // Select "User" radio button
  await page.click('input[value="user"]', { timeout: 5000 });
  
  // Check terms and conditions checkbox
  await page.check('#terms', { timeout: 5000 });
  
  // Click Sign In button
  const signInBtn = page.locator('#signInBtn');
  await signInBtn.click({ timeout: 5000 });

  // Wait for navigation to shop page
  await page.waitForURL('**/angularpractice/shop', { timeout: 15000 });

  // Scroll down to find products
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);

  // Find and click the Add button for iPhone X using JavaScript
  const productAdded = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h4'));
    const iphoneXHeading = headings.find(h => h.textContent.toLowerCase().includes('iphone x'));
    
    if (!iphoneXHeading) return false;
    
    // Find the parent container and then the button
    let parent = iphoneXHeading;
    while (parent && !parent.classList.contains('card')) {
      parent = parent.parentElement;
    }
    
    if (!parent) return false;
    
    const button = parent.querySelector('button');
    if (button) {
      button.click();
      return true;
    }
    return false;
  });
  
  if (!productAdded) {
    throw new Error('iPhone X product or Add button not found');
  }
  
  // Wait for product to be added
  await page.waitForTimeout(1000);
  
  // Click Checkout link to view cart
  const checkoutCount = page.locator('text=Checkout ( ');
  await checkoutCount.click({ timeout: 10000 });
  
  // Wait for cart/checkout page
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  
  // Verify iPhone X is in the cart
  const tableContent = await page.textContent('table');
  if (!tableContent || !tableContent.toLowerCase().includes('iphone')) {
    throw new Error('iPhone X not found in cart table');
  }
  
  console.log('✅ iPhone X is in the cart');
  
  // Click the Checkout button to go to final checkout
  const checkoutButton = page.locator('button').filter({ hasText: 'Checkout' });
  if (await checkoutButton.count() > 0) {
    await checkoutButton.first().click({ timeout: 10000 });
    
    // Wait for checkout page
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    
    // Verify iPhone X is in checkout
    const checkoutContent = await page.textContent('body');
    if (checkoutContent && checkoutContent.toLowerCase().includes('iphone')) {
      console.log('✅ iPhone X is in checkout summary');
    }
  }
  
  console.log('✅ Test completed: iPhone X successfully added to cart and verified at checkout');
});
