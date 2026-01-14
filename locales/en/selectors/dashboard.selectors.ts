/**
 * Dashboard Page Selectors
 * Centralized selectors for the dashboard/home page
 */

export const dashboardSelectors = {
  // User profile
  userGreeting: '.navbar-text',
  logoutLink: 'a.nav-link:has-text("Logout")',
  profileLink: 'a[href="/profile"]',

  // Navigation
  homeLink: 'a[href="/"]',
  makeModelLink: 'a[href*="model"]',
  overallRankingLink: 'a[href*="overall"]',
  registerLink: 'a[href="/register"]',

  // Content
  pageTitle: 'h1',
  mainContent: '.container',

  // Search/Filter
  searchInput: 'input[name="search"]',
  searchButton: 'button[type="submit"]',
} as const;
