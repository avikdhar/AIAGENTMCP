import { Page } from '@playwright/test';

export class TestUtils {
  static async takeScreenshot(page: Page, filename: string) {
    await page.screenshot({ path: `screenshots/${filename}.png` });
  }

  static async waitForElement(page: Page, selector: string, timeout: number = 5000) {
    const element = page.locator(selector);
    await element.waitFor({ timeout });
    return element;
  }

  static async fillForm(page: Page, formData: Record<string, string>) {
    for (const [selector, value] of Object.entries(formData)) {
      await page.fill(selector, value);
    }
  }

  static async getTableData(page: Page, tableSelector: string) {
    const rows = await page.locator(`${tableSelector} tbody tr`).all();
    const data: string[][] = [];

    for (const row of rows) {
      const cells = await row.locator('td, th').allTextContents();
      data.push(cells);
    }

    return data;
  }

  static async waitForNavigation(page: Page, fn: () => Promise<void>) {
    await Promise.all([page.waitForNavigation(), fn()]);
  }
}
