import { test as setup } from '@playwright/test';
import { getRoleConfig } from '../../src/config/project.config';
import path from 'path';

/**
 * Authentication Setup
 * Creates authenticated browser states for each role
 */

const authDir = path.join(process.cwd(), '.auth');

setup.describe('Authentication Setup', () => {
  setup('authenticate as user', async ({ page }) => {
    const config = getRoleConfig('user');

    // Navigate to homepage (login is in the navigation bar)
    await page.goto('/');

    // Fill in credentials
    await page.fill('input[name="login"]', config.credentials.login);
    await page.fill('input[name="password"]', config.credentials.password);

    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for successful login - check for Profile link
    await page.locator('a[href="/profile"]').waitFor({ timeout: 10000 });

    // Save authenticated state
    await page.context().storageState({ path: path.join(authDir, 'user.json') });
  });
});
