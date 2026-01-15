import { Page } from '@playwright/test';
import { getRoleConfig } from '../config/project.config';
import fs from 'fs';
import path from 'path';

/**
 * Authentication Manager for single-site multi-role testing
 * Handles login operations and authentication state management
 */
export class AuthManager {
  constructor(private page: Page) {}

  /**
   * Login with specific role credentials
   * @param roleName - The role to login as (e.g., 'user')
   */
  async loginAsRole(roleName: string): Promise<void> {
    const roleConfig = getRoleConfig(roleName);
    await this.login(roleConfig.credentials.login, roleConfig.credentials.password);
  }

  /**
   * Perform login with credentials
   * @param login - Username or email
   * @param password - Password
   */
  async login(login: string, password: string): Promise<void> {
    await this.page.goto('/login');
    await this.page.fill('input[name="login"]', login);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('load');
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await this.page.click('a[href*="logout"]');
    await this.page.waitForLoadState('load');
  }

  /**
   * Check if authentication state file exists for a role
   * @param roleName - The role name to check
   */
  static hasAuthState(roleName: string): boolean {
    const roleConfig = getRoleConfig(roleName);
    const authPath = path.resolve(process.cwd(), roleConfig.storageState);
    return fs.existsSync(authPath);
  }

  /**
   * Clear authentication state for a role
   * @param roleName - The role name to clear
   */
  static clearAuthState(roleName: string): void {
    const roleConfig = getRoleConfig(roleName);
    const authPath = path.resolve(process.cwd(), roleConfig.storageState);
    if (fs.existsSync(authPath)) {
      fs.unlinkSync(authPath);
    }
  }

  /**
   * Verify user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      // Check for logout link or user profile indicator
      const logoutLink = await this.page.locator('a[href*="logout"]').count();
      return logoutLink > 0;
    } catch {
      return false;
    }
  }
}
