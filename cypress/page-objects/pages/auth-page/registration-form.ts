import type { User } from 'cypress/data/types';
import type { Locator } from 'cypress/support/e2e';

export default class RegistrationForm {
    // DOM ELEMENTS
    get firstNameField(): Locator {
        return cy.get('[data-cy="first-name-input"]');
    }

    get lastNameField(): Locator {
        return cy.get('[data-cy="last-name-input"]');
    }

    get imageInput(): Locator {
        return cy.get('[data-cy="dropzone"]');
    }

    get emailField(): Locator {
        return cy.get('[data-cy="email-input"]');
    }

    get passwordField(): Locator {
        return cy.get('[data-cy="password-input"]');
    }

    get occupationField(): Locator {
        return cy.get('[data-cy="occupation-input"]');
    }

    get locationField(): Locator {
        return cy.get('[data-cy="location-input"]');
    }

    get registerBtn(): Locator {
        return cy.get('[data-cy="submit-button"]');
    }

    get formToggle(): Locator {
        return cy.get('[data-cy="toggle-form"]');
    }

    // Input error messages
    get emailAlreadyRegisteredError(): Locator {
        return cy
            .get('[data-cy="register-error"]')
            .contains('This email is already registered.');
    }

    get missingFirstNameError(): Locator {
        return cy
            .get('[data-cy="first-name-input"]')
            .parent()
            .parent()
            .find('p');
    }

    get missingLastNameError(): Locator {
        return cy
            .get('[data-cy="last-name-input"]')
            .parent()
            .parent()
            .find('p');
    }

    get missingEmailError(): Locator {
        return cy.get('[data-cy="email-input"]').parent().parent().find('p');
    }

    get missingPasswordError(): Locator {
        return cy.get('[data-cy="password-input"]').parent().parent().find('p');
    }

    get missingOccupationError(): Locator {
        return cy
            .get('[data-cy="occupation-input"]')
            .parent()
            .parent()
            .find('p');
    }

    get missingLocationError(): Locator {
        return cy.get('[data-cy="location-input"]').parent().parent().find('p');
    }

    // Fill out the registration form
    fillRegistrationForm(
        user: User,
        { hasImage }: { hasImage: boolean }
    ): void {
        user.firstName &&
            cy.step('Enter First name input') &&
            this.firstNameField
                .type(user.firstName)
                .should('have.value', user.firstName);

        user.lastName &&
            cy.step('Enter Last name input') &&
            this.lastNameField
                .type(user.lastName)
                .should('have.value', user.lastName);

        user.location &&
            cy.step('Enter Location input') &&
            this.locationField
                .type(user.location)
                .should('have.value', user.location);

        user.occupation &&
            cy.step('Enter Occupation input') &&
            this.occupationField
                .type(user.occupation)
                .should('have.value', user.occupation);

        hasImage &&
            cy.step('Upload profile photo') &&
            this.imageInput
                .selectFile('cypress/fixtures/profileImage.jpg', {
                    action: 'drag-drop'
                })
                .should('contain.text', 'profileImage.jpg');

        user.email &&
            cy.step('Enter Email input') &&
            this.emailField.type(user.email).should('have.value', user.email);

        user.password &&
            cy.step('Enter Password input') &&
            this.passwordField
                .type(user.password)
                .should('have.value', user.password);
    }
}
