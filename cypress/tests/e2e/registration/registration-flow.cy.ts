import AuthPage from '../../../page-objects/pages/auth-page/auth.page';
import HomePage from '../../../page-objects/pages/homepage/home.page';
const authPage = new AuthPage();
const homePage = new HomePage();
import DataFactory from '../../../data/data-factory';
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
                // Fill and submit the Registration form
                authPage.registrationForm
                    .enterFirstName(user.firstName)
                    .should('have.value', user.firstName);

                authPage.registrationForm
                    .enterLastName(user.lastName)
                    .should('have.value', user.lastName);

                authPage.registrationForm
                    .enterOccupation(user.occupation)
                    .should('have.value', user.occupation);

                authPage.registrationForm
                    .enterLocation(user.location)
                    .should('have.value', user.location);

                authPage.registrationForm
                    .uploadPhoto()
                    .should('contain.text', 'profileImage.jpg');

                authPage.registrationForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.registrationForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);
                
                authPage.registrationForm.submitForm();

                cy.wait(1000);
                // Login with registered user
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
                // Fill and submit the Registration form
                authPage.registrationForm
                    .enterFirstName(user.firstName)
                    .should('have.value', user.firstName);

                authPage.registrationForm
                    .enterLastName(user.lastName)
                    .should('have.value', user.lastName);

                authPage.registrationForm
                    .enterOccupation(user.occupation)
                    .should('have.value', user.occupation);

                authPage.registrationForm
                    .enterLocation(user.location)
                    .should('have.value', user.location);

                authPage.registrationForm
                    .uploadPhoto()
                    .should('contain.text', 'profileImage.jpg');

                authPage.registrationForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.registrationForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);
                // Submit Registration form
                authPage.registrationForm.submitForm();

                cy.wait(1000);
                // Login with registered user
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
                // Fill and submit the Registration form
                authPage.registrationForm
                    .enterFirstName(user.firstName)
                    .should('have.value', user.firstName);

                authPage.registrationForm
                    .enterLastName(user.lastName)
                    .should('have.value', user.lastName);

                authPage.registrationForm
                    .enterOccupation(user.occupation)
                    .should('have.value', user.occupation);

                authPage.registrationForm
                    .enterLocation(user.location)
                    .should('have.value', user.location);

                authPage.registrationForm
                    .uploadPhoto()
                    .should('contain.text', 'profileImage.jpg');

                authPage.registrationForm
                    .enterEmail(user.email)
                    .should('have.value', user.email);

                authPage.registrationForm
                    .enterPassword(user.password)
                    .should('have.value', user.password);
                // Submit Registration form
                authPage.registrationForm.submitForm();

                cy.wait(1000);
                // Login with registered user
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
