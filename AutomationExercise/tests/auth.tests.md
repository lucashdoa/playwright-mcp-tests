---
title: "Authentication Functionality"
description: "Test user authentication flow"
priority: "high"
tags: ["auth", "critical", "smoke"]
browser: ["chromium", "firefox"] 
environment: ["dev", "staging", "prod"]
---

# Authentication Functionality Test

## Test Overview
Verify that users can successfully log in with valid credentials and receive appropriate error messages for invalid attempts.

## Prerequisites
- Application is accessible at the configured base URL

## Test Scenarios

### Test Case 1: Register User

**Given** I am at the login page\
**When** I enter valid signup name and email\
**And** I submit the account information form with valid data\
**Then** I can see success message containing "Account Created!"\
**And** I click Continue button

## Test Data
```json
{
  "valid": {
    "email": "playwrightmcptest@automated.com",
    "name": "Valid PlaywrightMCPTest",
    "isMale": true,
    "password": "dummy",
    "birthDay": "25",
    "birthMonth": "10",
    "birthYear": "1984",
    "isSubscribedNewsletter": true,
    "isSubscribedSpecialOffers": true,
    "address": {
        "firstName": "John",
        "lastName": "Doe",
        "fullAddress": "Test Street, Number 7 Apartment 101",
        "country": "United States",
        "state": "Nevada",
        "city": "Las Vegas",
        "zipcode": "123456789",
        "phone": "987654321"
    }
  }
}
```

## Tear Down

Steps that will be executed at the end of each test case defined at Test Scenarios section

**Then** I delete the account to maintain the application initial state

## Reusable Steps

Steps that can be expanded into multiple steps for reusability

**When** I enter valid signup name and email
  - When I enter valid name
  - And I enter valid email at Signup Email input
  - I click Signup Button

**When** I submit the account information form with valid data
  - When I click Mr. radio button if isMale is true in valid data
  - Or I click Mrs. radio button if isMale is false in valid data
  - And I check "Sign up for our newsletter!" checkbox if isSubscribedNewsletter is true in valid data
  - And I check "Receive special offers from our partners" checkbox if isSubscribedSpecialOffers is true in valid data
  - And I click Create Account Button

**Then** I delete the account to maintain the application initial state
  - Then I click Delete Account link
  - And I see success message containing "Account Deleted!"
  - And I click Continue Button

## Page Elements
- Signup button: `[data-qa*="signup-button"]`
- Signup Email input: `[data-qa*="signup-email"]`
- Mr. radio button: `#id_gender1`
- Mrs. radio button: `#id_gender2`
- "Sign up for our newsletter!" checkbox : `#newsletter`
- "Receive special offers from our partners" checkbox: `#optin`
- Delete Account link: `[href*='delete_account']`

## Routes
- `/login` - login page
- `/signup` - signup page

## Notes
- Test should run in approximately 30 seconds
- Consider rate limiting when running multiple login attempts
- Ensure test data cleanup after execution
- Monitor for memory leaks during repeated runs
- Do not add assertions that were not defined in the test steps

## Acceptance Criteria
- [ ] All scenarios pass consistently
- [ ] No console errors during test execution  
- [ ] Test execution time under 30 seconds
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested
