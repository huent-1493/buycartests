import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Extended test fixtures with page objects
 */
type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

/**
 * Extend Playwright test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  /**
   * Login page fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Dashboard page fixture
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
