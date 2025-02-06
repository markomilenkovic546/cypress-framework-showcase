import AuthPage from '../../../pageObjects/pages/authPage/authPage';
import HomePage from '../../../pageObjects/pages/homePage/homePage';

const authPage = new AuthPage();
const homePage = new HomePage();
import DataFactory from '../../../data/dataFactory';
import { User } from '../../../data/types';
const dataFactory = new DataFactory();

describe('User registration flow', () => {
    // @ts-ignore
    context('Desktop viewport', { tags: ['@desktop'] }, () => {
        let user: User;
        beforeEach(() => {
            // Create random valid user data
            user = dataFactory.createValidUserData();
            cy.viewport(1920, 1080);
            cy.visit('/');

            // Switch from Login to Registration form
            authPage.loginForm.formToggle.click();
        });

        it(
            'User should be able to register successfully with valid input',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive', '@registration'] },
            () => {
                cy.section('Fill the Registration form');
                authPage.registrationForm.fillRegistrationForm(user, {
                    hasImage: true
                });
                cy.step('Submit the Registration form');
                authPage.registrationForm.registerBtn.click();

                cy.section('Login with registered user');
                cy.wait(1000);
                authPage.login(user.email, user.password);

                // Verify that correct user full name is displayed
                homePage.profileDetails.fullName.should(
                    'have.text',
                    `${user.firstName} ${user.lastName}`
                );

                // Verify that correct user photo is displayed
                homePage.profileDetails.profilePhoto
                    .invoke('attr', 'src')
                    .then((src) => {
                        expect(src).to.include('profileImage.jpg');
                    });
            }
        );
    });

    // @ts-ignore
    context('Mobile viewport', { tags: ['@mobile'] }, () => {
        let user: User;
        beforeEach(() => {
            // Create random valid user data
            user = dataFactory.createValidUserData();
            cy.viewport('iphone-x');
            cy.visit('/');

            // Switch from Login to Registration form
            authPage.loginForm.formToggle.click();
        });

        it(
            'User should be able to register successfully with valid input',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive', '@registration'] },
            () => {
                cy.section('Fill the Registration form');
                authPage.registrationForm.fillRegistrationForm(user, {
                    hasImage: true
                });
                cy.step('Submit the Registration form');
                authPage.registrationForm.registerBtn.click();

                cy.section('Login with registered user');
                cy.wait(1000);
                authPage.login(user.email, user.password);

                // Verify that correct user full name is displayed
                homePage.profileDetails.fullName.should(
                    'have.text',
                    `${user.firstName} ${user.lastName}`
                );

                // Verify that correct user photo is displayed
                homePage.profileDetails.profilePhoto
                    .invoke('attr', 'src')
                    .then((src) => {
                        expect(src).to.include('profileImage.jpg');
                    });
            }
        );
    });

    // @ts-ignore
    context('Tablet viewport', { tags: ['@tablet'] }, () => {
        let user: User;
        beforeEach(() => {
            user = dataFactory.createValidUserData();
            cy.viewport('ipad-2');
            cy.visit('/');
            authPage.loginForm.formToggle.click();
        });

        it(
            'User should be able to register successfully with valid input',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive', '@registration'] },
            () => {
                cy.section('Fill the Registration form');
                authPage.registrationForm.fillRegistrationForm(user, {
                    hasImage: true
                });
                cy.step('Submit the Registration form');
                authPage.registrationForm.registerBtn.click();

                cy.section('Login with registered user');
                cy.wait(1000);
                authPage.login(user.email, user.password);

                // Verify that correct user full name is displayed
                homePage.profileDetails.fullName.should(
                    'have.text',
                    `${user.firstName} ${user.lastName}`
                );

                // Verify that correct user photo is displayed
                homePage.profileDetails.profilePhoto
                    .invoke('attr', 'src')
                    .then((src) => {
                        expect(src).to.include('profileImage.jpg');
                    });
            }
        );
    });
});
