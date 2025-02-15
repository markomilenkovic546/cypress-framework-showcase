# Cypress Framework Showcase

## Project Overview

This repository demonstrates a test automation framework design and automation script writing using Cypress for both API and E2E tests. The purpose of the project is to showcase a test automation framework design while utilizing various packages for extended functionality.

## Project Structure

The project contains the following main components:

- **Client App**: The application to be tested.
- **Server App**: The backend API for the application.
- **Cypress Framework**: Contains test automation scripts and the test framework.

### Framework Design

The framework is designed following the **Page Object Model (POM)**, a design pattern that enhances the maintainability and scalability of test scripts by abstracting the UI elements and actions into separate page objects.

## Key Features

### Test Data Generation

- **Faker.js**: The `DataFactory` class is used to generate dynamic test data, such as user information, etc., ensuring that the tests can run with varied data for each execution.

### Database Reset

- A custom logic for resetting the test database is implemented, ensuring that tests can run on a clean state, which is essential for reliable and repeatable test results.

### API Helper Class

- An `ApiHelper` class is created to handle API requests during the tests, providing an abstraction layer for making API calls in the tests.

### Test Tagging & Selective Testing

- **Cypress-Grep**: The `cypress-grep` package is integrated for test tagging and selective test execution. This allows you to run a specific subset of tests based on tags or specific names, which is helpful for focused testing.

### Continuous Integration & Delivery (CI/CD)

- **GitHub Actions**: The project utilizes GitHub Actions for CI/CD. The workflow is configured to run the app locally on the CI/CD server, execute tests over it, and upload test artifacts. 

## Test Run Reports 📊
After running the tests, the `cypress-mochawesome-reporter` generates the `reports` folder with detailed HTML reports. These reports provide insights into test results, including passed, failed, and skipped tests, along with detailed logs and screenshots.
     
## Multi-Environment Support
 The tests are configured to run on multiple environments by using environment-specific `.env` files (e.g., `.env.staging`) and the corresponding Cypress configuration files (e.g., `staging.config.ts`). This allows the tests to be executed on different environments like QA, staging, etc.

## Running Locally 🖥️

To run the tests locally, follow these steps:
```bash
1. Clone the project locally `git clone <repo url>`
2. Run `npm install` or `yarn` to install the necessary dependencies.
3. Set up MongoDB
    Sign in to MongoDB Atlas and create a new cluster and database.
    Obtain the connection string for your database.
4. Add .env.local in the `server` dir with the following vars:
   MONGO_URI="<your MongoDB connection string>"
   JWT_SECRET=<your secure secret>
   PORT=3001
   SEED_API_KEY=<your seed API key>
5. Add .env.local in the root dir with the following vars:
   BASE_URL=http://localhost:3000
   API_BASE_URL=http://localhost:3001
   SEED_API_KEY=<your seed API key>
6. Run the application 
   `npm start` or `yarn start`
7. Run tests
     Run tests in UI mode:
 `npm run cy:open` or `yarn cy:open`
     Run tests in headless mode:
- `npm run test-local:smoke` or `yarn test-local:smoke`
- `npm run test-local:e2e` or `yarn test-local:e2e`
- `npm run test-local:api` or `yarn test-local:api`
- `npm run test-local:firefox` or `yarn test-local:firefox`
- `npm run test-local:edge` or `yarn test-local:edge`
- `npm run test-local:mobile` or `yarn test-local:mobile`
- `npm run test-local:tablet` or `yarn test-local:tablet`
