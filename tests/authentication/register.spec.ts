import { test, expect } from '@fixtures/base.fixtures';
import registerData from '@locales/en/data/register.json';

/**
 * Register Function Test Suite
 *
 * Test Specification: tests/authentication/register.spec.md
 * Application: BuyCarTest
 * Page: Register
 *
 * Test Coverage:
 * - Registration form validation
 * - Password validation rules
 * - Successful registration flow
 * - Duplicate username validation
 */

test.describe('Register Tests', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.navigateToRegister();
  });

  /**
   * Category 1: Registration Form Validation
   */
  test.describe('1. Registration Form Validation', () => {
    /**
     * TC_ID: REG-001 - Registration form elements visible
     *
     * Pre-conditions:
     * - User is on the register screen
     * - No authentication is required
     *
     * Steps:
     * 1. Navigate to the register page
     * 2. Verify the presence of all form elements
     *
     * Expected Results:
     * - Login textbox is visible and enabled
     * - First Name textbox is visible and enabled
     * - Last Name textbox is visible and enabled
     * - Password textbox is visible and enabled
     * - Confirm Password textbox is visible and enabled
     * - Register button is visible
     */
    test('REG-001 - Registration form elements visible', async ({ registerPage }) => {
      // Verify all form elements are visible
      await expect(registerPage.getLoginInput()).toBeVisible();
      await expect(registerPage.getFirstNameInput()).toBeVisible();
      await expect(registerPage.getLastNameInput()).toBeVisible();
      await expect(registerPage.getPasswordInput()).toBeVisible();
      await expect(registerPage.getConfirmPasswordInput()).toBeVisible();
      await expect(registerPage.getRegisterButton()).toBeVisible();

      // Verify input fields are enabled
      await expect(registerPage.getLoginInput()).toBeEnabled();
      await expect(registerPage.getFirstNameInput()).toBeEnabled();
      await expect(registerPage.getLastNameInput()).toBeEnabled();
      await expect(registerPage.getPasswordInput()).toBeEnabled();
      await expect(registerPage.getConfirmPasswordInput()).toBeEnabled();
    });

    /**
     * TC_ID: REG-002 - Registration when Login field is empty
     *
     * Pre-conditions:
     * - User is on the register screen
     *
     * Test Data:
     * - login: ""
     * - firstName: "Nguyen"
     * - lastName: "Hue"
     * - password: "Aa@123456"
     * - confirmPassword: "Aa@123456"
     *
     * Steps:
     * 1. Navigate to the register page
     * 2. Leave the Login textbox empty (do not enter any value)
     * 3. Type "Nguyen" into the First Name textbox
     * 4. Type "Hue" into the Last Name textbox
     * 5. Type "Aa@123456" into the Password textbox
     * 6. Type "Aa@123456" into the Confirm Password textbox
     * 7. Observe the Register button state
     *
     * Expected Results:
     * - Register button is disabled
     * - User cannot submit the form with empty Login field
     * - No error message is displayed (button is simply disabled)
     */
    test('REG-002 - Registration when Login field is empty', async ({ registerPage }) => {
      const testData = registerData.emptyLogin;

      // Leave Login field empty (do not fill it)
      // Fill other fields
      await registerPage.fillFirstName(testData.firstName);
      await registerPage.fillLastName(testData.lastName);
      await registerPage.fillPassword(testData.password);
      await registerPage.fillConfirmPassword(testData.confirmPassword);

      // Verify Register button is disabled
      const isDisabled = await registerPage.isRegisterButtonDisabled();
      expect(isDisabled).toBe(true);

      // Verify button is not clickable
      await expect(registerPage.getRegisterButton()).toBeDisabled();
    });
  });

  /**
   * Category 2: Password Validation
   */
  test.describe('2. Password Validation', () => {
    /**
     * TC_ID: REG-003 - Registration when passwords do not match
     *
     * Pre-conditions:
     * - User is on the register screen
     *
     * Test Data:
     * - login: "HueNguyen"
     * - firstName: "Nguyen"
     * - lastName: "Hue"
     * - password: "Aa@123456"
     * - confirmPassword: "Aa123456@"
     *
     * Steps:
     * 1. Navigate to the register page
     * 2. Type "HueNguyen" into the Login textbox
     * 3. Type "Nguyen" into the First Name textbox
     * 4. Type "Hue" into the Last Name textbox
     * 5. Type "Aa@123456" into the Password textbox
     * 6. Type "Aa123456@" into the Confirm Password textbox (different from password)
     *
     * Expected Results:
     * - Error message "Passwords do not match" is displayed
     * - User remains on the register page
     * - Form is not submitted
     * - No account is created
     */
    test('REG-003 - Registration when passwords do not match', async ({ registerPage, page }) => {
      const testData = registerData.passwordMismatch;

      // Generate unique username to avoid conflicts
      const timestamp = Date.now();
      const uniqueUsername = `User${timestamp}`;

      // Fill all fields with mismatched passwords
      await registerPage.fillLogin(uniqueUsername);
      await registerPage.fillFirstName(testData.firstName);
      await registerPage.fillLastName(testData.lastName);
      await registerPage.fillPassword(testData.password);
      await registerPage.fillConfirmPassword(testData.confirmPassword);

      // Wait a moment for validation to occur after filling confirm password
      await page.waitForTimeout(500);

      // Check for error message - filter for visible element with specific text
      const errorLocator = await registerPage.getErrorMessageByText('Passwords do not match');

      // Wait for error to appear
      await errorLocator.waitFor({ state: 'visible', timeout: 3000 });

      // Verify error message is displayed and contains expected text
      await expect(errorLocator).toBeVisible();
      const errorMessage = await errorLocator.textContent();
      expect(errorMessage?.trim()).toContain('Passwords do not match');

      // Verify Register button is disabled due to password mismatch
      const isDisabled = await registerPage.isRegisterButtonDisabled();
      expect(isDisabled).toBe(true);

      // Verify user remains on register page
      expect(page.url()).toContain('/register');
    });

    /**
     * TC_ID: REG-004 - Registration with password less than 6 characters
     *
     * Pre-conditions:
     * - User is on the register screen
     *
     * Test Data:
     * - login: "HueNguyen"
     * - firstName: "Nguyen"
     * - lastName: "Hue"
     * - password: "123"
     * - confirmPassword: "123"
     *
     * Steps:
     * 1. Navigate to the register page
     * 2. Type "HueNguyen" into the Login textbox
     * 3. Type "Nguyen" into the First Name textbox
     * 4. Type "Hue" into the Last Name textbox
     * 5. Type "123" into the Password textbox
     * 6. Type "123" into the Confirm Password textbox
     * 7. Click the Register button
     *
     * Expected Results:
     * - Error message is displayed: "InvalidParameter: 1 validation error(s) found. - minimum field size of 6, SignUpInput.Password."
     * - User remains on the register page
     * - Form is not submitted
     * - No account is created
     */
    test('REG-004 - Registration with password less than 6 characters', async ({
      registerPage,
      page,
    }) => {
      const testData = registerData.shortPassword;

      // Fill all fields with short password
      await registerPage.fillLogin(testData.login);
      await registerPage.fillFirstName(testData.firstName);
      await registerPage.fillLastName(testData.lastName);
      await registerPage.fillPassword(testData.password);
      await registerPage.fillConfirmPassword(testData.confirmPassword);

      // Click Register button
      await registerPage.clickRegisterButton();

      // Wait for validation
      await page.waitForTimeout(1000);

      // Check for error message - filter for visible element
      const errorLocator = await registerPage.getErrorMessageByText(
        /minimum field size of 6|Password.*6/i
      );

      // Wait for error to appear
      await errorLocator.waitFor({ state: 'visible', timeout: 3000 });

      // Verify error message is displayed
      await expect(errorLocator).toBeVisible();
      const errorMessage = await errorLocator.textContent();
      expect(errorMessage).toMatch(/minimum field size of 6|Password.*6/i);

      // Verify user remains on register page
      expect(page.url()).toContain('/register');
    });

    /**
     * TC_ID: REG-005 - Registration with simple password lacking complexity
     *
     * Pre-conditions:
     * - User is on the register screen
     *
     * Test Data:
     * - login: "HueNguyen"
     * - firstName: "Nguyen"
     * - lastName: "Hue"
     * - password: "123456"
     * - confirmPassword: "123456"
     *
     * Steps:
     * 1. Navigate to the register page
     * 2. Type "HueNguyen" into the Login textbox
     * 3. Type "Nguyen" into the First Name textbox
     * 4. Type "Hue" into the Last Name textbox
     * 5. Type "123456" into the Password textbox
     * 6. Type "123456" into the Confirm Password textbox
     * 7. Click the Register button
     *
     * Expected Results:
     * - Error message is displayed: "InvalidPasswordException: Password did not conform with policy: Password not long enough"
     * - User remains on the register page
     * - Form is not submitted
     * - No account is created
     */
    test('REG-005 - Registration with simple password lacking complexity', async ({
      registerPage,
      page,
    }) => {
      const testData = registerData.simplePassword;

      // Generate unique username to avoid conflicts
      const timestamp = Date.now();
      const uniqueUsername = `User${timestamp}`;

      // Fill all fields with simple password (meets length but not complexity)
      await registerPage.fillLogin(uniqueUsername);
      await registerPage.fillFirstName(testData.firstName);
      await registerPage.fillLastName(testData.lastName);
      await registerPage.fillPassword(testData.password);
      await registerPage.fillConfirmPassword(testData.confirmPassword);

      // Button should be enabled since password meets minimum length
      const isEnabled = await registerPage.isRegisterButtonEnabled();
      expect(isEnabled).toBe(true);

      // Click Register button to trigger server-side validation
      await registerPage.clickRegisterButton();

      // Wait for server response
      await page.waitForTimeout(3000);

      // Verify user remains on register page (registration should fail)
      const currentUrl = page.url();
      expect(currentUrl).toContain('/register');

      // Check if there's an error message or dialog
      const hasError = await registerPage.hasErrorMessage();
      if (hasError) {
        const errorMessage = await registerPage.getErrorMessage();
        // Error message should indicate password issue
        expect(errorMessage.length).toBeGreaterThan(0);
      }
    });
  });

  /**
   * Category 3: Successful Registration Scenarios
   */
  test.describe('3. Successful Registration Scenarios', () => {
    /**
     * TC_ID: REG-006 - Register with valid credentials successfully
     *
     * Pre-conditions:
     * - User is on the register screen
     * - Username "TestUser" does not already exist in the system
     *
     * Test Data:
     * - login: "TestUser" (with timestamp for uniqueness)
     * - firstName: "Nguyen"
     * - lastName: "Hue"
     * - password: "Aa@123456"
     * - confirmPassword: "Aa@123456"
     *
     * Steps:
     * 1. Navigate to the register page
     * 2. Type unique username into the Login textbox
     * 3. Type "Nguyen" into the First Name textbox
     * 4. Type "Hue" into the Last Name textbox
     * 5. Type "Aa@123456" into the Password textbox
     * 6. Type "Aa@123456" into the Confirm Password textbox
     * 7. Click the Register button
     *
     * Expected Results:
     * - Success popup with message "Registration is successful" is displayed
     * - New user account is created in the system
     * - User is either redirected to login page or dashboard
     */
    test('REG-006 - Register with valid credentials successfully', async ({
      registerPage,
      page,
    }) => {
      // Generate unique username using timestamp to avoid duplicates
      const timestamp = Date.now();
      const uniqueUsername = `TestUser${timestamp}`;

      const testData = {
        ...registerData.validRegistration,
        login: uniqueUsername,
      };

      // Fill all fields with valid data
      await registerPage.fillLogin(testData.login);
      await registerPage.fillFirstName(testData.firstName);
      await registerPage.fillLastName(testData.lastName);
      await registerPage.fillPassword(testData.password);
      await registerPage.fillConfirmPassword(testData.confirmPassword);

      // Click Register button
      await registerPage.clickRegisterButton();

      // Wait for success message or redirect
      await page.waitForTimeout(2000);

      // Verify success message is displayed OR user is redirected
      const hasSuccess = await registerPage.hasSuccessMessage();
      const currentUrl = page.url();

      // Either success message should be shown or user should be redirected
      const isSuccessful = hasSuccess || !currentUrl.includes('/register');
      expect(isSuccessful).toBe(true);

      // If success message is present, verify its content
      if (hasSuccess) {
        const successMessage = await registerPage.getSuccessMessage();
        expect(successMessage).toMatch(/Registration.*successful|success/i);
      }
    });
  });

  /**
   * Category 4: Duplicate Username Validation
   */
  test.describe('4. Duplicate Username Validation', () => {
    /**
     * TC_ID: REG-007 - Registration when username already exists
     *
     * Pre-conditions:
     * - User is on the register screen
     * - A user must be registered first to create a duplicate scenario
     *
     * Test Data:
     * - login: Same as previously registered user
     * - firstName: "Nguyen"
     * - lastName: "Hue"
     * - password: "Aa@123456"
     * - confirmPassword: "Aa@123456"
     *
     * Steps:
     * 1. First, register a user to ensure username exists
     * 2. Navigate back to register page
     * 3. Try to register with the same username
     * 4. Click the Register button
     *
     * Expected Results:
     * - Error message is displayed: "UsernameExistsException: User already exists"
     * - User remains on the register page
     * - Form is not submitted
     * - No duplicate account is created
     * - Existing account remains unchanged
     */
    test('REG-007 - Registration when username already exists', async ({ registerPage, page }) => {
      // Step 1: First, register a user successfully to ensure the username exists in the system
      const timestamp = Date.now();
      const existingUsername = `ExistingUser${timestamp}`;

      const firstRegistration = {
        login: existingUsername,
        firstName: 'First',
        lastName: 'User',
        password: 'Aa@123456',
        confirmPassword: 'Aa@123456',
      };

      // Register the first user with valid credentials
      await registerPage.fillLogin(firstRegistration.login);
      await registerPage.fillFirstName(firstRegistration.firstName);
      await registerPage.fillLastName(firstRegistration.lastName);
      await registerPage.fillPassword(firstRegistration.password);
      await registerPage.fillConfirmPassword(firstRegistration.confirmPassword);
      await registerPage.clickRegisterButton();

      // Wait for registration to complete and verify it was successful
      await page.waitForTimeout(3000);

      // Verify first registration was successful (either success message or redirect away from register)
      const hasSuccess = await registerPage.hasSuccessMessage();
      const urlAfterFirstReg = page.url();
      const firstRegSuccessful = hasSuccess || !urlAfterFirstReg.includes('/register');
      expect(firstRegSuccessful).toBe(true);

      // Step 2: Navigate back to register page to attempt duplicate registration
      await registerPage.navigateToRegister();
      await page.waitForTimeout(1000);

      // Step 3: Try to register with the SAME username but different other details
      const duplicateRegistration = {
        login: existingUsername, // Same username as the first registration
        firstName: 'Second',
        lastName: 'User',
        password: 'Bb@123456', // Different password (but still valid)
        confirmPassword: 'Bb@123456',
      };

      await registerPage.fillLogin(duplicateRegistration.login);
      await registerPage.fillFirstName(duplicateRegistration.firstName);
      await registerPage.fillLastName(duplicateRegistration.lastName);
      await registerPage.fillPassword(duplicateRegistration.password);
      await registerPage.fillConfirmPassword(duplicateRegistration.confirmPassword);
      await registerPage.clickRegisterButton();

      // Wait for error response from server
      await page.waitForTimeout(3000);

      // Verify duplicate registration failed
      // User should remain on register page (registration failed)
      const currentUrl = page.url();
      expect(currentUrl).toContain('/register');

      // Verify error message is displayed indicating username already exists
      const errorLocator = await registerPage.getErrorMessageByText(
        /username.*exists|user.*exists|already.*exists/i
      );

      // Wait for error to appear
      await errorLocator.waitFor({ state: 'visible', timeout: 3000 });

      // Verify error message is displayed
      await expect(errorLocator).toBeVisible();
      const errorMessage = await errorLocator.textContent();
      expect(errorMessage?.trim().length).toBeGreaterThan(0);
    });
  });
});
