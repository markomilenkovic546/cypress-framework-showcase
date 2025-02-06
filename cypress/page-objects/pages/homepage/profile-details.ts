import type { Locator } from 'cypress/support/e2e';

export default class ProfileDetails {
    // DOM ELEMENTS
    get profilePhoto(): Locator {
        return cy.get('[alt="user"]');
    }

    get fullName(): Locator {
        return cy.get('h4');
    }

    get friendsCount(): Locator {
        return cy.get('[data-cy="friends-count"]');
    }

    get location(): Locator {
        return cy.get('[data-cy="location"]');
    }

    get occupation(): Locator {
        return cy.get('[data-cy="occupation"]');
    }
}


