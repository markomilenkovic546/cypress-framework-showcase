import type { Locator } from 'cypress/support/e2e';

export default class NavBar {
    // DOM ELEMENTS
    get logo(): Locator {
        return cy.get('[data-cy="navbar-logo"]');
    }

    get searchBar(): Locator {
        return cy.get('[data-cy="navbar-search"]');
    }

    get themeToggle(): Locator {
        return cy.get('[data-cy="navbar-theme-toggle"]');
    }

    get messageIcon(): Locator {
        return cy.get('[data-cy="navbar-message-icon"]');
    }

    get notificationsIcon(): Locator {
        return cy.get('[data-cy="navbar-notifications-icon"]');
    }

    get helpIcon(): Locator {
        return cy.get('[data-cy="navbar-help-icon"]');
    }

    get userMenuButton(): Locator {
        return cy.get('[data-cy="navbar-user-menu"]');
    }

    get logoutButton(): Locator {
        return cy.get('[data-cy="navbar-logout-button"]');
    }
}
