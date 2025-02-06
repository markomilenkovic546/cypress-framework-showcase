import { User } from 'cypress/data/types';
import DataFactory from '../../../data/data-factory';
import tv4 from 'tv4';
import getPostsSchema from '../../../data/response-schemas/get-posts.json';
import ApiHelper from 'cypress/data/api-helper';
const apiHelper = new ApiHelper();
const dataFactory = new DataFactory();

describe('POST /posts', () => {
    let user: User;
    let userId: string;
    let postDescription: string;
    beforeEach(() => {
        user = dataFactory.createValidUserData();
        postDescription = dataFactory.createPostDescription();
        apiHelper.registerUser(user).then((data) => {
            userId = data._id;
        });
    });

    it(
        'Status code 200 should be returned when request is valid',
        // @ts-ignore
        { tags: ['@api', '@smoke', '@positive', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        headers: {
                            Authorization: jwt
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200);
                    });
                });
            });
        }
    );

    it(
        'Correct response body structure should be returned when request is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        headers: {
                            Authorization: jwt
                        }
                    }).then((response) => {
                        const isValid = tv4.validate(
                            response.body,
                            getPostsSchema
                        );
                        expect(isValid, tv4.error).to.be.true;
                    });
                });
            });
        }
    );

    it(
        'Correct data should be returned when request is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        headers: {
                            Authorization: jwt
                        }
                    }).then((response) => {
                        const data = response.body;
                        expect(data.length).to.eq(1);
                        data.forEach((post: any = {}, i: number) => {
                            expect(post.firstName).to.be.eq(user.firstName);
                            expect(post.lastName).to.be.eq(user.lastName);
                            expect(post.location).to.be.eq(user.location);
                            expect(post.description).to.be.eq(postDescription);
                        });
                    });
                });
            });
        }
    );

    it(
        'Status code 200 should be returned when invalid JWT is attached',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        headers: {
                            Authorization: jwt + 'a'
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).to.eq(401);
                    });
                });
            });
        }
    );

    it(
        'Correct error message should be returned when invalid JWT is attached',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        headers: {
                            Authorization: jwt + 'a'
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.body.error).to.eq('invalid signature');
                    });
                });
            });
        }
    );

    it(
        'Status code 401 should be returned when JWT is not attached',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).to.eq(401);
                    });
                });
            });
        }
    );

    it(
        'Correct error message should be returned when JWT is not attached',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@posts'] },
        () => {
            apiHelper.createPost(user, postDescription).then(() => {
                apiHelper.login(user).then((resBody) => {
                    const jwt = resBody.token;
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts/${userId}/posts`,
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.body.error).to.eq('Unauthorized');
                    });
                });
            });
        }
    );
});
