# Buggy.justtestit.org Test Suite

Comprehensive Playwright test suite for Buggy.justtestit.org with single-site multi-role architecture.

## Project Structure

```
buycartests/
├── .auth/                          # Authentication state files
├── .github/                        # GitHub workflows and prompts
├── .husky/                         # Git hooks
├── .vscode/                        # VSCode settings
├── locales/
│   └── en/
│       └── selectors/              # Centralized selectors
│           ├── login.selectors.ts
│           └── dashboard.selectors.ts
├── src/
│   ├── config/                     # Project configuration
│   │   └── project.config.ts
│   ├── fixtures/                   # Test fixtures
│   │   ├── auth.setup.ts
│   │   └── base.fixtures.ts
│   ├── pages/                      # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── DashboardPage.ts
│   └── utils/                      # Utility functions
│       ├── AuthManager.ts
│       ├── TestHelpers.ts
│       └── EnvValidator.ts
├── tests/
│   └── user/                       # User role tests
│       ├── login.spec.ts
│       └── dashboard.spec.ts
├── .env                            # Environment variables (not in git)
├── .env.example                    # Environment template
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies

```

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
USER_LOGIN=your_username
USER_PASSWORD=your_password
```

### 3. Install Playwright Browsers

```bash
pnpm exec playwright install
```

### 4. Setup Git Hooks

```bash
pnpm prepare
```

## Running Tests

### Run all tests

```bash
pnpm test
```

### Run in headed mode

```bash
pnpm test:headed
```

### Run with UI mode

```bash
pnpm test:ui
```

### Run specific role tests

```bash
pnpm test:user
```

### Debug tests

```bash
pnpm test:debug
```

### View test report

```bash
pnpm report
```

## Code Quality

### Run linter

```bash
pnpm lint
```

### Fix lint issues

```bash
pnpm lint:fix
```

### Format code

```bash
pnpm format
```

### Check formatting

```bash
pnpm format:check
```

### Type check

```bash
pnpm typecheck
```

## Architecture

### Page Object Model (POM)

- All page interactions are encapsulated in page objects
- Selectors are centralized in `locales/en/selectors/`
- Base page provides common functionality

### Authentication

- Role-based authentication setup
- Stored authentication states for faster test execution
- AuthManager utility for authentication operations

### Test Organization

- Tests organized by user roles
- Each role has dedicated test directory
- Shared fixtures for consistent test setup

## Environment Variables

| Variable      | Description          | Default                            |
| ------------- | -------------------- | ---------------------------------- |
| BASE_URL      | Application base URL | https://buggy.justtestit.org       |
| LOGIN_URL     | Login page URL       | https://buggy.justtestit.org/login |
| USER_LOGIN    | User login/username  | Required                           |
| USER_PASSWORD | User password        | Required                           |

## CI/CD

Tests are configured to run in CI with:

- Retry logic (2 retries on failure)
- Single worker for stability
- HTML and list reporters

## Contributing

1. Follow the established code style (enforced by ESLint and Prettier)
2. Add tests for new features
3. Ensure all tests pass before committing
4. Use meaningful commit messages

## Troubleshooting

### Tests failing after fresh clone

Run authentication setup:

```bash
pnpm test tests/setup
```

### Authentication state issues

Delete `.auth/` folder and re-run setup tests.

### Browser not found

Install Playwright browsers:

```bash
pnpm exec playwright install
```

## License

ISC
