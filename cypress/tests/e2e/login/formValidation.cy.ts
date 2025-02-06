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
            { tags: ['@e2e', '@sanity', '@negative'] },
            () => {
                cy.section('Register user');
                apiHelper.registerUser(user);

                cy.section('Fill the Login form and submit');
                cy.step('Enter Email input');
                authPage.loginForm.emailField
                    .type(user.email)
                    .should('have.value', user.email);

                cy.step('Enter incorrect password input');
                authPage.loginForm.passwordField
                    .type(user.password + 'a')
                    .should('have.value', user.password + 'a');

                cy.step('Submit Login form');
                authPage.loginForm.loginBtn.click();

                // Verify that user is not logged in
                cy.url().should('not.include', '/home');
                authPage.loginForm.incorrectPasswordError.should('be.visible');
            }
        );

        it(
            'User should not be able to log in when password input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@sanity', '@negative'] },
            () => {
                cy.section('Register user');
                apiHelper.registerUser(user);

                cy.section('Fill the Login form except the Password field');
                cy.step('Enter Email input');
                authPage.loginForm.emailField
                    .type(user.email)
                    .should('have.value', user.email);

                // Verify that submit button is disabled
                authPage.loginForm.loginBtn.should('be.disabled');
            }
        );

        it(
            'User should not be able to log in when email input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@sanity', '@negative'] },
            () => {
                cy.section('Register user');
                apiHelper.registerUser(user);

                cy.section('Fill the Login form except the Email field');
                cy.step('Enter Password input');
                authPage.loginForm.passwordField
                    .type(user.password)
                    .should('have.value', user.password);

                // Verify that submit button is disabled
                authPage.loginForm.loginBtn.should('be.disabled');
            }
        );

        it(
            'User should not be able to log in with unregistered email',
            // @ts-ignore
            { tags: ['@e2e', '@sanity', '@negative'] },
            () => {
                cy.section('Register user');
                apiHelper.registerUser(user);

                cy.section('Fill the Login form and submit');
                cy.step('Enter Email input');
                authPage.loginForm.emailField
                    .type('111' + user.email)
                    .should('have.value', '111' + user.email);

                cy.step('Enter Password input');
                authPage.loginForm.passwordField
                    .type(user.password)
                    .should('have.value', user.password);

                cy.step('Submit Login form');
                authPage.loginForm.loginBtn.click();

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
            { tags: ['@e2e', '@sanity', '@negative'] },
            () => {
                cy.section('Register user');
                apiHelper.registerUser(user);

                cy.section('Fill the Login form and submit');
                cy.step('Enter Email input');
                authPage.loginForm.emailField
                    .type(user.email)
                    .should('have.value', user.email);

                cy.step('Enter incorrect password input');
                authPage.loginForm.passwordField
                    .type(user.password + 'a')
                    .should('have.value', user.password + 'a');

                cy.step('Submit Login form');
                authPage.loginForm.loginBtn.click();

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
            { tags: ['@e2e', '@sanity', '@negative'] },
            () => {
                cy.section('Register user');
                apiHelper.registerUser(user);

                cy.section('Fill the Login form and submit');
                cy.step('Enter Email input');
                authPage.loginForm.emailField
                    .type(user.email)
                    .should('have.value', user.email);

                cy.step('Enter incorrect password input');
                authPage.loginForm.passwordField
                    .type(user.password + 'a')
                    .should('have.value', user.password + 'a');

                cy.step('Submit Login form');
                authPage.loginForm.loginBtn.click();

                // Verify that user is not logged in
                cy.url().should('not.include', '/home');
                authPage.loginForm.incorrectPasswordError.should('be.visible');
            }
        );
    });
});
