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
            'User should be able to log in with valid credentials',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.loginForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);

                authPage.loginForm.submit();

                // Verify that user is logged in and redirected to homepage
                cy.url().should('include', '/home');
                homePage.profileDetails.fullName.should(
                    'have.text',
                    `${user.firstName} ${user.lastName}`
                );
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
            'User should be able to log in with valid credentials',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.loginForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);

                authPage.loginForm.submit();

                // Verify that user is logged in and redirected to homepage
                cy.url().should('include', '/home');
                homePage.profileDetails.fullName.should(
                    'have.text',
                    `${user.firstName} ${user.lastName}`
                );
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
            'User should be able to log in with valid credentials',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive'] },
            () => {
                // Register User via API
                apiHelper.registerUser(user);

                authPage.loginForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.loginForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);

                authPage.loginForm.submit();

                // Verify that user is logged in and redirected to homepage
                cy.url().should('include', '/home');
                homePage.profileDetails.fullName.should(
                    'have.text',
                    `${user.firstName} ${user.lastName}`
                );
            }
        );
    });
});
