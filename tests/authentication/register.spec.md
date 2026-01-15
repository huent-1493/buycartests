# BuyCarTest - Register Function Test Plan

## Application Overview

The **Register Function** allows new users to create an account in the BuyCarTest application. This feature includes comprehensive validation of user input fields including login username, first name, last name, password, and confirm password. The registration process enforces security requirements such as minimum password length (6 characters) and password complexity. The system validates that passwords match, prevents duplicate usernames, and provides clear feedback messages for validation errors and successful registration.

**Key Capabilities:**

- New user account creation with required fields (Login, First Name, Last Name, Password, Confirm Password)
- Password strength validation (minimum 6 characters, complexity requirements)
- Password confirmation matching validation
- Duplicate username detection
- Form validation with real-time feedback
- Success confirmation upon successful registration

**Page Under Test:** Register Page

---

## Test Scenarios

### 1. Registration Form Validation

**File:** `tests/authentication/register.spec.ts`

_Note: All test scenarios in this specification will be implemented in the single file listed above._

---

#### TC_ID: REG-001 - Registration form elements visible

**Pre-conditions:**

- User is on the register screen
- No authentication is required

**Steps:**

1. Navigate to the register page
2. Verify the presence of all form elements

**Expected Results:**

- Login textbox is visible and enabled
- First Name textbox is visible and enabled
- Last Name textbox is visible and enabled
- Password textbox is visible and enabled
- Confirm Password textbox is visible and enabled
- Register button is visible

---

#### TC_ID: REG-002 - Registration when Login field is empty

**Pre-conditions:**

- User is on the register screen

**Test Data:**

```json
{
  "login": "",
  "firstName": "Nguyen",
  "lastName": "Hue",
  "password": "Aa@123456",
  "confirmPassword": "Aa@123456"
}
```

**Steps:**

1. Navigate to the register page
2. Leave the Login textbox empty (do not enter any value)
3. Type "Nguyen" into the First Name textbox
4. Type "Hue" into the Last Name textbox
5. Type "Aa@123456" into the Password textbox
6. Type "Aa@123456" into the Confirm Password textbox
7. Observe the Register button state

**Expected Results:**

- Register button is disabled
- User cannot submit the form with empty Login field
- No error message is displayed (button is simply disabled)

**Notes:**

- This tests client-side validation for required Login field
- Button should remain disabled until Login field has a value

---

### 2. Password Validation

**File:** `tests/authentication/register.spec.ts`

---

#### TC_ID: REG-003 - Registration when passwords do not match

**Pre-conditions:**

- User is on the register screen

**Test Data:**

```json
{
  "login": "HueNguyen",
  "firstName": "Nguyen",
  "lastName": "Hue",
  "password": "Aa@123456",
  "confirmPassword": "Aa123456@"
}
```

**Steps:**

1. Navigate to the register page
2. Type "HueNguyen" into the Login textbox
3. Type "Nguyen" into the First Name textbox
4. Type "Hue" into the Last Name textbox
5. Type "Aa@123456" into the Password textbox
6. Type "Aa123456@" into the Confirm Password textbox (different from password)
7. Click the Register button

**Expected Results:**

- Error message "Passwords do not match" is displayed
- User remains on the register page
- Form is not submitted
- No account is created

**Notes:**

- Password: "Aa@123456"
- Confirm Password: "Aa123456@" (note the @ symbol position difference)

---

#### TC_ID: REG-004 - Registration with password less than 6 characters

**Pre-conditions:**

- User is on the register screen

**Test Data:**

```json
{
  "login": "HueNguyen",
  "firstName": "Nguyen",
  "lastName": "Hue",
  "password": "123",
  "confirmPassword": "123"
}
```

**Steps:**

1. Navigate to the register page
2. Type "HueNguyen" into the Login textbox
3. Type "Nguyen" into the First Name textbox
4. Type "Hue" into the Last Name textbox
5. Type "123" into the Password textbox
6. Type "123" into the Confirm Password textbox
7. Click the Register button

**Expected Results:**

- Error message is displayed: "InvalidParameter: 1 validation error(s) found. - minimum field size of 6, SignUpInput.Password."
- User remains on the register page
- Form is not submitted
- No account is created

**Notes:**

- Tests minimum password length validation (6 characters required)
- Both password fields contain the same short password (3 characters)

---

#### TC_ID: REG-005 - Registration with simple password lacking complexity

**Pre-conditions:**

- User is on the register screen

**Test Data:**

```json
{
  "login": "HueNguyen",
  "firstName": "Nguyen",
  "lastName": "Hue",
  "password": "123456",
  "confirmPassword": "123456"
}
```

**Steps:**

1. Navigate to the register page
2. Type "HueNguyen" into the Login textbox
3. Type "Nguyen" into the First Name textbox
4. Type "Hue" into the Last Name textbox
5. Type "123456" into the Password textbox
6. Type "123456" into the Confirm Password textbox
7. Click the Register button

**Expected Results:**

- Error message is displayed: "InvalidPasswordException: Password did not conform with policy: Password not long enough"
- User remains on the register page
- Form is not submitted
- No account is created

**Notes:**

- Tests password complexity validation
- Password meets minimum length (6 characters) but lacks complexity (no uppercase, lowercase, or special characters)
- System requires passwords to meet complexity policy

---

### 3. Successful Registration Scenarios

**File:** `tests/authentication/register.spec.ts`

---

#### TC_ID: REG-006 - Register with valid credentials successfully

**Pre-conditions:**

- User is on the register screen
- Username "HueNguyen" does not already exist in the system

**Test Data:**

```json
{
  "login": "HueNguyen",
  "firstName": "Nguyen",
  "lastName": "Hue",
  "password": "Aa@123456",
  "confirmPassword": "Aa@123456"
}
```

**Steps:**

1. Navigate to the register page
2. Type "HueNguyen" into the Login textbox
3. Type "Nguyen" into the First Name textbox
4. Type "Hue" into the Last Name textbox
5. Type "Aa@123456" into the Password textbox
6. Type "Aa@123456" into the Confirm Password textbox
7. Click the Register button

**Expected Results:**

- Success popup with message "Registration is successful" is displayed
- New user account is created in the system
- User is either redirected to login page or dashboard (depending on application flow)

**Notes:**

- This is the happy path test case
- Password meets all requirements: minimum 6 characters, contains uppercase, lowercase, numbers, and special characters
- Username must not exist in the system before running this test

---

### 4. Duplicate Username Validation

**File:** `tests/authentication/register.spec.ts`

---

#### TC_ID: REG-007 - Registration when username already exists

**Pre-conditions:**

- User is on the register screen
- Username "HueNguyen" already exists in the system

**Test Data:**

```json
{
  "login": "HueNguyen",
  "firstName": "Nguyen",
  "lastName": "Hue",
  "password": "Aa@123456",
  "confirmPassword": "Aa@123456"
}
```

**Steps:**

1. Navigate to the register page
2. Type "HueNguyen" into the Login textbox (existing username)
3. Type "Nguyen" into the First Name textbox
4. Type "Hue" into the Last Name textbox
5. Type "Aa@123456" into the Password textbox
6. Type "Aa@123456" into the Confirm Password textbox
7. Click the Register button

**Expected Results:**

- Error message is displayed: "UsernameExistsException: User already exists"
- User remains on the register page
- Form is not submitted
- No duplicate account is created
- Existing account remains unchanged

**Notes:**

- Tests duplicate username validation
- Requires the username "HueNguyen" to exist in the system before running this test
- All other fields contain valid data; only the username conflict triggers the error

---

## Quality Standards

### Test Implementation Requirements

**Each test MUST:**

- ✅ Be independent and runnable in any order
- ✅ Include proper test data setup
- ✅ Use clear, specific selectors for form elements
- ✅ Verify both positive and negative outcomes
- ✅ Include appropriate assertions for error messages and success states
- ✅ Clean up test data after execution (if applicable)
- ✅ Handle test data dependencies properly (e.g., unique usernames for REG-006)

**Naming Conventions:**

- Test file: `tests/authentication/register.spec.ts`
- Test descriptions should match TC_ID and title from this specification
- Use descriptive variable names for test data

**Assertions:**

- Verify button states (enabled/disabled)
- Verify error message content exactly as specified
- Verify success messages exactly as specified
- Verify form field visibility and state
- Verify navigation/redirection after successful registration

**Test Data Management:**

- For REG-006 (successful registration): Use unique username or clean up after test
- For REG-007 (duplicate username): Ensure test user exists before running test
- Consider using faker library or timestamp-based usernames for uniqueness

---

## Test Coverage Summary

| Category                  | Test Cases | Coverage                                |
| ------------------------- | ---------- | --------------------------------------- |
| Form Validation           | 1          | Basic form element visibility           |
| Required Field Validation | 1          | Empty Login field validation            |
| Password Matching         | 1          | Password confirmation validation        |
| Password Length           | 1          | Minimum length requirement (6 chars)    |
| Password Complexity       | 1          | Password policy enforcement             |
| Success Scenarios         | 1          | Valid registration flow                 |
| Duplicate Prevention      | 1          | Username uniqueness validation          |
| **Total**                 | **7**      | **Complete registration flow coverage** |

---

## Notes for Test Implementation

1. **Test Execution Order**: Tests are independent and can run in any order

2. **Test Data Strategy**:
   - Consider using a test data factory for generating unique usernames
   - Use consistent test data for negative tests
   - Implement cleanup for successful registration tests

3. **Authentication Setup**:
   - Register tests do not require prior authentication
   - Tests should start from unauthenticated state

4. **Error Message Validation**:
   - All error messages should be verified exactly as specified
   - Consider using fixtures for expected error messages

5. **Password Requirements**:
   - Minimum 6 characters
   - Must include complexity (uppercase, lowercase, numbers, special characters)

6. **Browser Compatibility**:
   - All tests should run across Chromium, Firefox, and WebKit
   - Ensure form validation works consistently across browsers

---

## Specification Metadata

- **Specification Version**: 1.0
- **Created Date**: January 15, 2026
- **Application**: BuyCarTest
- **Feature**: Register Function
- **Page Name**: Register
- **Test Suite**: Register Tests
- **Target File**: `tests/authentication/register.spec.ts`
- **Total Test Cases**: 7
- **Test Type**: Login_Validation (Functional Testing)
- **Priority Distribution**: All tests are high priority for core registration functionality
