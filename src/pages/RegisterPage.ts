import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { registerSelectors } from '../../locales/en/selectors/register.selectors';

/**
 * Register Page Object
 * Handles all register page interactions
 */
export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to register page
   */
  async navigateToRegister(): Promise<void> {
    await this.goto('/register');
  }

  /**
   * Fill login field
   */
  async fillLogin(username: string): Promise<void> {
    await this.fill(registerSelectors.loginInput, username);
  }

  /**
   * Fill first name field
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.fill(registerSelectors.firstNameInput, firstName);
  }

  /**
   * Fill last name field
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.fill(registerSelectors.lastNameInput, lastName);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.fill(registerSelectors.passwordInput, password);
  }

  /**
   * Fill confirm password field
   */
  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.fill(registerSelectors.confirmPasswordInput, confirmPassword);
  }

  /**
   * Click register button
   */
  async clickRegisterButton(): Promise<void> {
    await this.click(registerSelectors.registerButton);
  }

  /**
   * Click cancel button
   */
  async clickCancelButton(): Promise<void> {
    await this.click(registerSelectors.cancelButton);
  }

  /**
   * Complete registration with all fields
   */
  async register(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    await this.fillLogin(username);
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickRegisterButton();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    try {
      return await this.getText(registerSelectors.errorMessage);
    } catch {
      return '';
    }
  }

  /**
   * Check if error message is visible
   */
  async hasErrorMessage(): Promise<boolean> {
    try {
      await this.page.locator(registerSelectors.errorMessage).waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    try {
      return await this.getText(registerSelectors.successMessage);
    } catch {
      return '';
    }
  }

  /**
   * Check if success message is visible
   */
  async hasSuccessMessage(): Promise<boolean> {
    try {
      await this.page.locator(registerSelectors.successMessage).waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message by text filter
   * @param textFilter - Text to filter error messages
   */
  async getErrorMessageByText(textFilter: string | RegExp) {
    return this.page.locator(registerSelectors.errorDanger).filter({ hasText: textFilter });
  }

  /**
   * Check if register button is enabled
   */
  async isRegisterButtonEnabled(): Promise<boolean> {
    return await this.page.locator(registerSelectors.registerButton).isEnabled();
  }

  /**
   * Check if register button is disabled
   */
  async isRegisterButtonDisabled(): Promise<boolean> {
    const isEnabled = await this.isRegisterButtonEnabled();
    return !isEnabled;
  }

  /**
   * Check if all form elements are visible
   */
  async areAllFormElementsVisible(): Promise<boolean> {
    const elements = [
      registerSelectors.loginInput,
      registerSelectors.firstNameInput,
      registerSelectors.lastNameInput,
      registerSelectors.passwordInput,
      registerSelectors.confirmPasswordInput,
      registerSelectors.registerButton,
    ];

    for (const selector of elements) {
      const isVisible = await this.page.locator(selector).isVisible();
      if (!isVisible) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get login input locator
   */
  getLoginInput() {
    return this.getLocator(registerSelectors.loginInput);
  }

  /**
   * Get first name input locator
   */
  getFirstNameInput() {
    return this.getLocator(registerSelectors.firstNameInput);
  }

  /**
   * Get last name input locator
   */
  getLastNameInput() {
    return this.getLocator(registerSelectors.lastNameInput);
  }

  /**
   * Get password input locator
   */
  getPasswordInput() {
    return this.getLocator(registerSelectors.passwordInput);
  }

  /**
   * Get confirm password input locator
   */
  getConfirmPasswordInput() {
    return this.getLocator(registerSelectors.confirmPasswordInput);
  }

  /**
   * Get register button locator
   */
  getRegisterButton() {
    return this.getLocator(registerSelectors.registerButton);
  }
}
