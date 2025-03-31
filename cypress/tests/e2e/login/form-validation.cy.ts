import AuthPage from '../../../page-objects/pages/auth-page/auth.page';
import HomePage from '../../../page-objects/pages/homepage/home.page';
import ApiHelper from 'cypress/data/api-helper';
import DataFactory from '../../../data/data-factory';
import { User } from '../../../data/types';
const dataFactory = new DataFactory();
const authPage = new AuthPage();
const homePage = new HomePage();
const apiHelper = new ApiHelper();

describe('User login flow', () => {
    // @ts-ignore
    context('Desktop viewport', { tags: ['@desktop'] }, () => {
        let user: User;
        beforeEach(() => {
            user = dataFactory.createValidUserData();
            cy.viewport(1920, 1080);
            authPage.open();
        });

        it(
            'User should not be able to login with incorrect password',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.loginForm
                    .enterPassword(user.password + 'a')
                    .should('have.value', user.password + 'a');

                authPage.loginForm.submit();

                // Verify that user is not logged in
                cy.url().should('not.include', '/home');
                authPage.loginForm.incorrectPasswordError.should('be.visible');
            }
        );

        it(
            'User should not be able to log in when password input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                // Verify that submit button is disabled
                authPage.loginForm.loginBtn.should('be.disabled');
            }
        );

        it(
            'User should not be able to log in when email input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);

                // Verify that submit button is disabled
                authPage.loginForm.loginBtn.should('be.disabled');
            }
        );

        it(
            'User should not be able to log in with unregistered email',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative'] },
            () => {

                authPage.loginForm
                    .enterEmail('111' + user.email)
                    .should('have.value', '111' + user.email);

                authPage.loginForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);

                authPage.loginForm.submit();

                // Verify that user is not logged in
                cy.url().should('not.include', '/home');
                authPage.loginForm.userNotFoundError.should('be.visible');
            }
        );
    });

    // @ts-ignore
    context('Mobile viewport', { tags: ['@mobile'] }, () => {
        let user: User;
        beforeEach(() => {
            user = dataFactory.createValidUserData();
            cy.viewport('iphone-x');
            authPage.open();
        });

        it(
            'User should not be able to log in with incorrect password',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.loginForm
                    .enterPassword(user.password + 'a')
                    .should('have.value', user.password + 'a');

                authPage.loginForm.submit();

                // Verify that user is not logged in
                cy.url().should('not.include', '/home');
                authPage.loginForm.incorrectPasswordError.should('be.visible');
            }
        );
    });

    // @ts-ignore
    context('Tablet viewport', { tags: ['@tablet'] }, () => {
        let user: User;
        beforeEach(() => {
            user = dataFactory.createValidUserData();
            cy.viewport('ipad-mini');
            authPage.open();
        });

        it(
            'User should not be able to log in with incorrect password',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.loginForm
                    .enterPassword(user.password + 'a')
                    .should('have.value', user.password + 'a');

                authPage.loginForm.loginBtn.click();

                // Verify that user is not logged in
                cy.url().should('not.include', '/home');
                authPage.loginForm.incorrectPasswordError.should('be.visible');
            }
        );
    });
});
