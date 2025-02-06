import { CreatedUser, User } from './types';
import DataFactory from './data-factory';
const dataFactory = new DataFactory();

export default class ApiHelper {
    registerUser(user: User): Cypress.Chainable<CreatedUser> {
        return cy
            .fixture('profileImage.jpg', 'base64')
            .then((profilePhotoBase64) => {
                const blob = Cypress.Blob.base64StringToBlob(
                    profilePhotoBase64,
                    'image/jpeg'
                );
                const file = new File([blob], 'profileImage.jpg', {
                    type: 'image/jpeg'
                });

                const formData = new FormData();
                Object.keys(user).forEach((key) => {
                    formData.append(key, user[key]);
                });
                formData.append('picture', file, 'profileImage.jpg');
                formData.append('picturePath', 'profileImage.jpg');

                // Use fetch for the registerUser function, but return a Cypress.Chainable instead of a classic Promise
                return cy.wrap(
                    fetch(`${Cypress.env('apiBaseUrl')}/auth/register`, {
                        method: 'POST',
                        body: formData
                    })
                        .then((response) => {
                            expect(response.status).to.eq(201);
                            return response.json();
                        })
                        .then((data) => {
                            return data; // Return the response data (CreatedUser)
                        })
                );
            });
    }

    login(user: User): Cypress.Chainable<any> {
        return cy
            .request({
                method: 'POST',
                url: `${Cypress.env('apiBaseUrl')}/auth/login`,
                body: {
                    email: user.email,
                    password: user.password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Login failed');
                }
                return response.body;
            });
    }

    getPosts(user: User): Cypress.Chainable<any> {
        return this.login(user).then((loginResBody) => {
            return cy
                .request({
                    method: 'GET',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    headers: {
                        Authorization: `Bearer ${loginResBody.token}`
                    }
                })
                .then((postsResponse) => {
                    if (postsResponse.status !== 200) {
                        throw new Error('Failed to fetch posts');
                    }
                    return postsResponse.body;
                });
        });
    }

    createPost(user: User, description: string): Cypress.Chainable<any> {
        return this.login(user).then((loginResBody) => {
            return cy
                .api({
                    method: 'POST',
                    url: `${Cypress.env('apiBaseUrl')}/posts`,
                    body: {
                        userId: loginResBody.user._id,
                        description: description,
                        picturePath: 'p5.jpeg'
                    },
                    headers: {
                        Authorization: `Bearer ${loginResBody.token}`
                    }
                })
                .then((postsResponse) => {
                    if (postsResponse.status !== 201) {
                        throw new Error('Failed to create post');
                    }
                    return postsResponse.body;
                });
        });
    }
}
