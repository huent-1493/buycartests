/**
 * Login Page Selectors
 * Centralized selectors for the login page
 */

export const loginSelectors = {
  // Input fields
  loginInput: 'input[name="login"]',
  passwordInput: 'input[name="password"]',

  // Buttons
  loginButton: 'button[type="submit"]',
  registerLink: 'a[href="/register"]',

  // Messages
  errorMessage: 'span.label.label-warning',
  successMessage: '.alert-success',

  // Navigation
  homeLink: 'a[href="/"]',
} as const;
