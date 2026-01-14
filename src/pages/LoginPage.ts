import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { loginSelectors } from '../../locales/en/selectors/login.selectors';

/**
 * Login Page Object
 * Handles all login page interactions
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
  }

  /**
   * Perform login
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(loginSelectors.loginInput, username);
    await this.fill(loginSelectors.passwordInput, password);
    await this.click(loginSelectors.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Fill login field
   */
  async fillLogin(username: string): Promise<void> {
    await this.fill(loginSelectors.loginInput, username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.fill(loginSelectors.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click(loginSelectors.loginButton);
  }

  /**
   * Check if logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      // Check for logout link presence
      await this.page.locator('a.nav-link:has-text("Logout")').waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    try {
      return await this.getText(loginSelectors.errorMessage);
    } catch {
      return '';
    }
  }

  /**
   * Check if error message is visible
   */
  async hasErrorMessage(): Promise<boolean> {
    try {
      await this.page.locator(loginSelectors.errorMessage).waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click register link
   */
  async clickRegisterLink(): Promise<void> {
    await this.click(loginSelectors.registerLink);
  }

  /**
   * Get login input locator
   */
  getLoginInput() {
    return this.getLocator(loginSelectors.loginInput);
  }

  /**
   * Get password input locator
   */
  getPasswordInput() {
    return this.getLocator(loginSelectors.passwordInput);
  }

  /**
   * Get login button locator
   */
  getLoginButton() {
    return this.getLocator(loginSelectors.loginButton);
  }
}
