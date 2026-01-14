# Test Specification: [Feature Name]

## Test Scenarios 1: Data Registration

Description: Verify successful account creation when input data is valid

### TC01: Create account with all required fields

**Steps:**

1. Navigate to register account page
2. Input valid data for required fields (Login, First Name, Last Name, Password, Confirm password)
3. Click button "Register"

**Expected Results:**

1. Account created successfully and show message "Registration is successful"
2. Verify account name displays correctly


## Test Scenarios 2: Validation Handling

Description: Verify that form validations work correctly for missing or invalid inputs

### TC02: Empty required fields validation

**Steps:**

1. Navigate to register account page
2. Leave all fields empty
3. Click button "Register"

**Expected Results:**

1. Button "Register" remains disabled
2. Form submission is prevented

### TC03: "Confirm Password" field does not math "Password" field

**Steps:**

1. Input field: Login, First Name, Last Name
2. Input filed: "Password" with correct format: has number, has letters, has special characters, >8lengths
2. The "Confirm Password" field does not match the "Password" field.

**Expected Results:**

1. Display error message
2. Button "Register" remains disabled

### TC04: Invalid password format validation 

**Steps:**

1. Input field: Login, First Name, Last Name
2. Input filed: Password with incorrect format
3. The "Confirm Password" field match the "Password" field.
4. Click button "Register"

**Expected Results:**

1. Display error message

## Test Scenarios 3: Exit register page 

### TC04: Cancel register page

**Steps:**

1. Click button "Cancel"

**Expected Results:**

1. Go to landing page