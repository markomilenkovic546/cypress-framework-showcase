import { Locator } from 'cypress/support/e2e';

export default abstract class BasePage {
    open(url: string) {
        cy.visit(url);
    }

}
