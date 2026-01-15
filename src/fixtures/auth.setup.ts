import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getRoleConfig } from '../config/project.config';

const userAuthFile = '.auth/user.json';

/**
 * Setup authentication for user role
 */
setup('authenticate as user', async ({ page }) => {
  const roleConfig = getRoleConfig('user');
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await page.goto(roleConfig.credentials.login ? '/login' : '/');

  // Perform login
  await loginPage.login(roleConfig.credentials.login, roleConfig.credentials.password);

  // Wait for successful login (adjust selector based on your app)
  await page.waitForURL(/.*/, { timeout: 10000 });

  // Verify login success - check for user indicator or dashboard
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();

  // Save authenticated state
  await page.context().storageState({ path: userAuthFile });
});
