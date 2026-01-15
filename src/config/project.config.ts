/**
 * Project Configuration
 * Single-site multi-role configuration for Buggy.justtestit.org
 */

export interface RoleConfig {
  name: string;
  storageState: string;
  credentials: {
    login: string;
    password: string;
  };
}

export interface ProjectConfig {
  baseUrl: string;
  loginUrl: string;
  roles: RoleConfig[];
}

/**
 * Get environment variable with validation
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Project configuration for Buggy.justtestit.org
 */
export const config: ProjectConfig = {
  baseUrl: getEnvVar('BASE_URL', 'https://buggy.justtestit.org'),
  loginUrl: getEnvVar('LOGIN_URL', 'https://buggy.justtestit.org/login'),
  roles: [
    {
      name: 'user',
      storageState: '.auth/user.json',
      credentials: {
        login: getEnvVar('USER_LOGIN'),
        password: getEnvVar('USER_PASSWORD'),
      },
    },
  ],
};

/**
 * Get role configuration by name
 */
export function getRoleConfig(roleName: string): RoleConfig {
  const role = config.roles.find((r) => r.name === roleName);
  if (!role) {
    throw new Error(`Role '${roleName}' not found in configuration`);
  }
  return role;
}
