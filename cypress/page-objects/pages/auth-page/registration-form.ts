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

    //******* Actions *******
    enterFirstName(firstName: string): Locator {
        return this.firstNameField.type(firstName);
    }

    enterLastName(lastName: string): Locator {
        return this.lastNameField.type(lastName);
    }

    enterOccupation(occupation: string): Locator {
        return this.occupationField.type(occupation);
    }

    enterLocation(location: string): Locator {
        return this.locationField.type(location);
    }

    uploadPhoto(): Locator {
        return this.imageInput.selectFile('cypress/fixtures/profileImage.jpg', {
            action: 'drag-drop'
        });
    }

    enterEmail(email: string): Locator {
        return this.emailField.type(email);
    }

    enterPassword(password: string): Locator {
        return this.passwordField.type(password);
    }

    submitForm(): Locator {
        return this.registerBtn.click();
    }

    // Fill out the registration form
    fillForm(user: User, { hasImage }: { hasImage: boolean }): void {
        user.firstName && this.enterFirstName(user.firstName);
        user.lastName && this.enterLastName(user.lastName);
        user.location && this.enterLocation(user.location);
        user.occupation && this.enterOccupation(user.occupation);
        hasImage && this.uploadPhoto();
        user.email && this.enterEmail(user.email);
        user.password && this.enterPassword(user.password);
    }
}
