import { Page, Locator } from '@playwright/test';

/**
 * Test helper utilities
 */
export class TestHelpers {
  /**
   * Wait for an element to be visible
   */
  static async waitForVisible(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden
   */
  static async waitForHidden(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Scroll element into view
   */
  static async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Fill input field with clear
   */
  static async fillWithClear(page: Page, selector: string, value: string): Promise<void> {
    await page.fill(selector, '');
    await page.fill(selector, value);
  }

  /**
   * Take screenshot with custom name
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true,
    });
  }

  /**
   * Wait for network idle
   */
  static async waitForNetworkIdle(page: Page, timeout = 5000): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /**
   * Generate random string
   */
  static randomString(length = 10): string {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }

  /**
   * Generate random email
   */
  static randomEmail(): string {
    return `test.${this.randomString()}@example.com`;
  }

  /**
   * Format date to string
   */
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Sleep for specified milliseconds
   */
  static async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
