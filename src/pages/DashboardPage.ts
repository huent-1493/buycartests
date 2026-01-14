import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { dashboardSelectors } from '../../locales/en/selectors/dashboard.selectors';

/**
 * Dashboard Page Object
 * Handles all dashboard/home page interactions
 */
export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to dashboard
   */
  async navigateToDashboard(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Get user greeting text
   */
  async getUserGreeting(): Promise<string> {
    return await this.getText(dashboardSelectors.userGreeting);
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      await this.isVisible(dashboardSelectors.logoutLink);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click logout
   */
  async logout(): Promise<void> {
    await this.click(dashboardSelectors.logoutLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to profile
   */
  async navigateToProfile(): Promise<void> {
    await this.click(dashboardSelectors.profileLink);
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(dashboardSelectors.pageTitle);
  }

  /**
   * Navigate to Make/Model
   */
  async navigateToMakeModel(): Promise<void> {
    await this.click(dashboardSelectors.makeModelLink);
  }

  /**
   * Navigate to Overall Ranking
   */
  async navigateToOverallRanking(): Promise<void> {
    await this.click(dashboardSelectors.overallRankingLink);
  }

  /**
   * Get logout link locator
   */
  getLogoutLink() {
    return this.getLocator(dashboardSelectors.logoutLink);
  }

  /**
   * Get profile link locator
   */
  getProfileLink() {
    return this.getLocator(dashboardSelectors.profileLink);
  }

  /**
   * Get search input locator
   */
  getSearchInput() {
    return this.getLocator(dashboardSelectors.searchInput);
  }
}
