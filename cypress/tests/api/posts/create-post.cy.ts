import { User } from 'cypress/data/types';
import DataFactory from '../../../data/data-factory';
import tv4 from 'tv4';
import createPostSchema from '../../../data/response-schemas/create-post.json';
import ApiHelper from 'cypress/data/api-helper';
const apiHelper = new ApiHelper();
const dataFactory = new DataFactory();

describe('POST /posts', () => {
    let user: User;
    beforeEach(() => {
        user = dataFactory.createValidUserData();
        apiHelper.registerUser(user);
    });

    it(
        'Status code 201 should be returned when request is valid',
        // @ts-ignore
        { tags: ['@api', '@smoke', '@positive', '@posts'] },
        () => {
            const description = dataFactory.createPostDescription();
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                const userId = resBody.user._id;
                cy.api({
                    method: 'POST',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    body: {
                        userId: userId,
                        description: description,
                        picturePath: 'p5.jpeg'
                    },
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }).then((response) => {
                    expect(response.status).to.eq(201);
                });
            });
        }
    );

    it(
        'Correct response body structure should be returned when request is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@posts'] },
        () => {
            const description = dataFactory.createPostDescription();
            apiHelper.login(user).then((resBody) => {
                const jwt = resBody.token;
                const userId = resBody.user._id;
                cy.api({
                    method: 'POST',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    body: {
                        userId: userId,
                        description: description,
                        picturePath: 'p5.jpeg'
                    },
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }).then((response) => {
                    const isValid = tv4.validate(
                        response.body,
                        createPostSchema
                    );
                    expect(isValid, tv4.error).to.be.true;
                });
            });
        }
    );

    it(
        'Post should be correctly recorded in db',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@posts'] },
        () => {
            const description = dataFactory.createPostDescription();
            apiHelper.login(user).then((loginResBody) => {
                const jwt = loginResBody.token;
                const userId = loginResBody.user._id;
                cy.api({
                    method: 'POST',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    body: {
                        userId: userId,
                        description: description,
                        picturePath: 'p5.jpeg'
                    },
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }).then(() => {
                    cy.api({
                        method: 'GET',
                        url: `${Cypress.env('apiBaseUrl')}/posts`,
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    }).then((getPostsRes) => {
                        const getPostsResBody: any[] = getPostsRes.body;
                        // Check that post is successfully recorded in db
                        const createdPost = getPostsResBody.find(
                            (p) =>
                                p.userId === userId &&
                                p.description === description
                        );
                        expect(createdPost).to.be.ok;
                        // Check entry duplication
                        const duplicates = getPostsResBody.filter(
                            (post, index, self) =>
                                self.findIndex(
                                    (item) =>
                                        item.userId === post.userId &&
                                        item.description === post.description
                                ) !== index
                        );
                        expect(duplicates).to.have.length(0);
                    });
                });
            });
        }
    );
});
