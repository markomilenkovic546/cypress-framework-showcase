import { User } from 'cypress/data/types';
import DataFactory from '../../../data/data-factory';
import tv4 from 'tv4';
import getPostsSchema from '../../../data/response-schemas/get-posts.json';
import ApiHelper from 'cypress/data/api-helper';
const apiHelper = new ApiHelper();
const dataFactory = new DataFactory();

describe('GET /posts', () => {
    let user: User;
    beforeEach(() => {
        user = dataFactory.createValidUserData();
        apiHelper.registerUser(user);
    });

    it(
        'Status code 200 should be returned when JWT is valid',
        // @ts-ignore
        { tags: ['@api', '@smoke', '@positive', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    headers: {
                        Authorization: jwt
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        }
    );

    it(
        'Correct response body structure should be returned when JWT is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    headers: {
                        Authorization: jwt
                    }
                }).then((response) => {
                    const isValid = tv4.validate(response.body, getPostsSchema);
                    expect(isValid, tv4.error).to.be.true;
                });
            });
        }
    );

    it(
        'Correct data should be returned when JWT is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    headers: {
                        Authorization: jwt
                    }
                }).then((response) => {
                    apiHelper.getPosts(user).then((expectedPosts) => {
                        const data = response.body;
                        expect(data.length).to.eq(expectedPosts.length);
                        data.forEach((post, i) => {
                            expect(post.firstName).to.be.eq(
                                expectedPosts[i].firstName
                            );
                            expect(post.lastName).to.be.eq(
                                expectedPosts[i].lastName
                            );
                            expect(post.location).to.be.eq(
                                expectedPosts[i].location
                            );
                            expect(post.description).to.be.eq(
                                expectedPosts[i].description
                            );
                            expect(post.picturePath).to.be.eq(
                                expectedPosts[i].picturePath
                            );
                            expect(post.userPicturePath).to.be.eq(
                                expectedPosts[i].userPicturePath
                            );
                            expect(Object.keys(post.likes).length).to.be.eq(
                                Object.keys(expectedPosts[i].likes).length
                            );
                            expect(Object.keys(post.comments).length).to.be.eq(
                                Object.keys(expectedPosts[i].comments).length
                            );
                            post.comments.forEach((comment, j) => {
                                expect(comment).to.be.eq(
                                    expectedPosts[i].comments[j]
                                );
                            });
                        });
                    });
                });
            });
        }
    );

    it(
        'Status code 401 should be returned when JWT invalid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    headers: {
                        Authorization: jwt + 'a'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(401);
                });
            });
        }
    );

    it(
        'Correct error message should be returned when JWT invalid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    headers: {
                        Authorization: jwt + 'a'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.body.error).to.eq('invalid signature');
                });
            });
        }
    );

    it(
        'Status code 401 should be returned when no JWT is attached',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(401);
                });
            });
        }
    );

    it(
        'Correct error message should be returned when no JWT is attached',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                cy.api({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.body.error).to.eq('Unauthorized');
                });
            });
        }
    );
});
