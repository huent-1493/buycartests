import { test, expect } from '../../src/fixtures/base.fixtures';

/**
 * User Login Tests
 * Tests for user authentication functionality
 */
test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    // Navigate to login
    await loginPage.navigateToLogin();

    // Perform login
    await loginPage.login(process.env.USER_LOGIN!, process.env.USER_PASSWORD!);

    // Verify no error message appears
    const hasError = await loginPage.hasErrorMessage();
    expect(hasError).toBeFalsy();

    // Verify successful login by checking logout link
    const isLoggedIn = await dashboardPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should display error with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigateToLogin();

    // Attempt login with invalid credentials
    await loginPage.login('invalid_user', 'wrong_password');

    // Verify error message is displayed
    const hasError = await loginPage.hasErrorMessage();
    expect(hasError).toBeTruthy();
  });

  test('should have login form elements visible', async ({ loginPage }) => {
    await loginPage.navigateToLogin();

    // Verify form elements are visible
    const loginInput = loginPage.getLoginInput();
    const passwordInput = loginPage.getPasswordInput();
    const loginButton = loginPage.getLoginButton();

    await expect(loginInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('should not login with empty credentials', async ({ loginPage }) => {
    await loginPage.navigateToLogin();

    // Attempt to login with empty fields
    await loginPage.fillLogin('');
    await loginPage.fillPassword('');
    await loginPage.clickLoginButton();

    // Verify still on login page or error shown
    const url = loginPage.getCurrentUrl();
    expect(url).toContain('login');
  });
});
