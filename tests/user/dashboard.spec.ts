import { test, expect } from '../../src/fixtures/base.fixtures';

/**
 * User Dashboard Tests
 * Tests for authenticated user dashboard functionality
 * These tests use the stored authentication state
 */
test.describe('User Dashboard', () => {
  test.use({ storageState: '.auth/user.json' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard for authenticated user', async ({ dashboardPage }) => {
    // Verify user is logged in
    const isLoggedIn = await dashboardPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should have logout link visible', async ({ dashboardPage }) => {
    const logoutLink = dashboardPage.getLogoutLink();
    await expect(logoutLink).toBeVisible();
  });

  test('should navigate to profile page', async ({ dashboardPage, page }) => {
    await dashboardPage.navigateToProfile();

    // Verify navigation to profile
    await page.waitForURL(/.*profile.*/);
    const url = dashboardPage.getCurrentUrl();
    expect(url).toContain('profile');
  });

  test('should logout successfully', async ({ dashboardPage, page }) => {
    await dashboardPage.logout();

    // Verify redirect to home or login page
    await page.waitForLoadState('load');

    // After logout, should not see logout link anymore
    const logoutLink = dashboardPage.getLogoutLink();
    const isLogoutVisible = await logoutLink.isVisible().catch(() => false);
    expect(isLogoutVisible).toBeFalsy();
  });
});
