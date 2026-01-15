/**
 * Register Page Selectors
 * Centralized selectors for the register page
 */

export const registerSelectors = {
  // Input fields
  loginInput: 'input#username',
  firstNameInput: 'input#firstName',
  lastNameInput: 'input#lastName',
  passwordInput: 'input#password',
  confirmPasswordInput: 'input#confirmPassword',

  // Buttons - use getByRole to be more specific
  registerButton: 'button:has-text("Register")',
  cancelButton: 'button:has-text("Cancel")',

  // Messages - flexible selectors for error/success messages
  errorMessage: 'div[class*="alert"], span[class*="label-warning"], div[class*="error"], span[class*="error"]',
  errorDanger: 'div.alert.alert-danger',
  successMessage: 'div.alert.alert-success, div[class*="result"], div[class*="success"]',

  // Form elements
  registerForm: 'form',
  heading: 'h2:has-text("Register with Buggy Cars Rating")',
} as const;
