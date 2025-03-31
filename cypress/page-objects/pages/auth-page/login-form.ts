import type { Locator } from 'cypress/support/e2e';

export default class LoginForm {
    // DOM ELEMENTS
    get emailField(): Locator {
        return cy.get('[name="email"]');
    }

    get passwordField(): Locator {
        return cy.get('[name="password"]');
    }

    get loginBtn(): Locator {
        return cy.get('button').contains('LOGIN');
    }

    get formToggle(): Locator {
        return cy.get('[data-cy="toggle-form"]');
    }

    get incorrectPasswordError(): Locator {
        return cy
            .get('[data-cy="login-error"]')
            .contains('Login failed. Please check your credentials.');
    }

    get userNotFoundError(): Locator {
        return cy
            .get('[data-cy="login-error"]')
            .contains('User not found. Please register.');
    }

    // Actions

    enterEmail(email: string): Locator {
        return this.emailField.type(email);
    }

    enterPassword(password: string): Locator {
        return this.passwordField.type(password);
    }

    submit(): Locator {
        return this.loginBtn.click();
    }
}
