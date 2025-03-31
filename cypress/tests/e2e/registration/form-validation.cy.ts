import AuthPage from '../../../page-objects/pages/auth-page/auth.page';
import HomePage from '../../../page-objects/pages/homepage/home.page';
import DataFactory from '../../../data/data-factory';
import ApiHelper from 'cypress/data/api-helper';
const apiHelper = new ApiHelper();
const dataFactory = new DataFactory();
const authPage = new AuthPage();
const homePage = new HomePage();

describe('Registration form validation', () => {
    // @ts-ignore
    context('Desktop viewport', { tags: ['@desktop'] }, () => {
        beforeEach(() => {
            cy.viewport(1920, 1080);
            authPage.open();

            // Switch from Login to Registration form
            authPage.loginForm.formToggle.click();
        });

        it(
            'User should not be able to register with already registered email',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Register new user via A
                apiHelper.registerUser(user);

                // Fill and submit the Registration form
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                authPage.registrationForm.submitForm();

                // Verify that appropriate error is shown
                authPage.registrationForm.emailAlreadyRegisteredError.should(
                    'be.visible'
                );
            }
        );

        it(
            'User should not be able to register when First Name input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the First Name
                delete user.firstName;
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );

        it(
            'User should not be able to register when Last Name input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the Last Name
                delete user.lastName;
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );

        it(
            'User should not be able to register when Occupation input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the Occupation
                delete user.occupation;
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );

        it(
            'User should not be able to register when Location input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the Location
                delete user.location;
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );

        it(
            'User should not be able to register when Image input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the Image
                authPage.registrationForm.fillForm(user, {
                    hasImage: false
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );

        it(
            'User should not be able to register when Email input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the Email
                delete user.email;
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );

        it(
            'User should not be able to register when Password input is missing',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Provide all inputs except the Password
                delete user.password;
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Verify that submit button is disabled
                authPage.registrationForm.registerBtn.should(
                    'have.attr',
                    'disabled'
                );
            }
        );
    });

    // @ts-ignore
    context('Mobile viewport', { tags: ['@mobile'] }, () => {
        beforeEach(() => {
            cy.viewport('iphone-x');
            authPage.open();

            // Switch from Login to Registration form
            authPage.loginForm.formToggle.click();
        });

        it(
            'User should not be able to register with already registered email',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Register new user
                apiHelper.registerUser(user);

                // Fill registration form providing already register email
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Submit the Registration form
                authPage.registrationForm.submitForm();

                // Verify that appropriate error is shown
                authPage.registrationForm.emailAlreadyRegisteredError.should(
                    'be.visible'
                );
            }
        );
    });

    // @ts-ignore
    context('Tablet viewport', { tags: ['@tablet'] }, () => {
        beforeEach(() => {
            cy.viewport('ipad-mini');
            authPage.open();

            // Switch from Login to Registration form
            authPage.loginForm.formToggle.click();
        });

        it(
            'User should not be able to register with already registered email',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@negative', '@registration'] },
            () => {
                // Create random valid user data
                const user = dataFactory.createValidUserData();

                // Register new user
                apiHelper.registerUser(user);

                // Fill registration form providing already register email
                authPage.registrationForm.fillForm(user, {
                    hasImage: true
                });

                // Submit the Registration form
                authPage.registrationForm.submitForm();

                // Verify that appropriate error is shown
                authPage.registrationForm.emailAlreadyRegisteredError.should(
                    'be.visible'
                );
            }
        );
    });
});
