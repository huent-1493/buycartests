/**
 * Environment validation utility
 * Validates required environment variables are set
 */

const REQUIRED_ENV_VARS = ['BASE_URL', 'LOGIN_URL', 'USER_LOGIN', 'USER_PASSWORD'];

/**
 * Validate all required environment variables are set
 */
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || defaultValue || '';
}

/**
 * Check if running in CI environment
 */
export function isCI(): boolean {
  return !!process.env.CI;
}

/**
 * Get base URL from environment
 */
export function getBaseUrl(): string {
  return getEnv('BASE_URL', 'https://buggy.justtestit.org');
}

/**
 * Get login URL from environment
 */
export function getLoginUrl(): string {
  return getEnv('LOGIN_URL', 'https://buggy.justtestit.org/login');
}
