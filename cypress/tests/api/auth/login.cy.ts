import { User } from 'cypress/data/types';
import DataFactory from '../../../data/data-factory';
import tv4 from 'tv4';
import loginSchema from '../../../data/response-schemas/login.json';
import ApiHelper from 'cypress/data/api-helper';
const apiHelper = new ApiHelper();
const dataFactory = new DataFactory();

describe('POST auth/login ', () => {
    let user: User;

    beforeEach(() => {
        user = dataFactory.createValidUserData();
        apiHelper.registerUser(user);
    });

    it(
        'Status code 200 should be returned when payload is valid',
        // @ts-ignore
        { tags: ['@api', '@smoke', '@positive', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email, password: user.password }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        }
    );

    it(
        'Response body structure should be correct when payload is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email, password: user.password }
            }).then((response) => {
                const isValid = tv4.validate(response.body, loginSchema);
                expect(isValid, tv4.error).to.be.true;
            });
        }
    );

    it(
        'Response body properties should be correct when payload is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email, password: user.password }
            }).then((response) => {
                expect(response.body.user.firstName).to.eq(user.firstName);
                expect(response.body.user.lastName).to.eq(user.lastName);
                expect(response.body.user.email).to.eq(user.email);
                expect(response.body.user.occupation).to.eq(user.occupation);
                expect(response.body.user.location).to.eq(user.location);
            });
        }
    );

    it(
        'Status code 400 should be returned when password is invalid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email, password: user.password + 'a' },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        }
    );

    it(
        'Correct error message should be returned when password is incorrect',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email, password: user.password + 'a' },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.body.msg).to.eq('Invalid credentials.');
            });
        }
    );

    it(
        'Status code 400 should be returned when email is unregistered',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: 'a' + user.email, password: user.password },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        }
    );

    it(
        'Correct error message should be returned when email is unregistered',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: 'a' + user.email, password: user.password },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.body.msg).to.eq('User does not exist.');
            });
        }
    );

    it(
        'Status code 400 should be returned when email input is missing',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { password: user.password },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        }
    );

    it(
        'Correct error message should be returned when email input is missing',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { password: user.password },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.body.msg).to.eq('Email is required.');
            });
        }
    );

    it(
        'Status code 400 should be returned when password input is missing',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.msg).to.eq('Password is required.');
            });
        }
    );

    it(
        'Correct error message should be returned when password input is missing',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: { email: user.email },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.body.msg).to.eq('Password is required.');
            });
        }
    );

    it(
        'Status code 400 should be returned when payload is an empty object',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        }
    );

    it(
        'Correct error message should be returned when payload is an empty object',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@login'] },
        () => {
            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.body.msg).to.eq('Email is required.');
            });
        }
    );
});
