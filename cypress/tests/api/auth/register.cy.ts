import { User } from 'cypress/data/types';
import DataFactory from '../../../data/data-factory';
import tv4 from 'tv4';
import registerSchema from '../../../data/response-schemas/register-user.json';
import ApiHelper from 'cypress/data/api-helper';
const apiHelper = new ApiHelper();
const dataFactory = new DataFactory();

describe('POST auth/register', () => {
    let user: User;
    beforeEach(() => {
        user = dataFactory.createValidUserData();
    });

    it(
        'Status code 201 should be returned when payload is valid',
        // @ts-ignore
        { tags: ['@api', '@smoke', '@positive', '@registration'] },
        () => {
            cy.fixture('profileImage.jpg', 'base64').then(
                (profilePhotoBase64) => {
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

                    cy.wrap(null).then(async () => {
                        // Use fetch function instead of cy.request to properly send form data
                        return fetch(
                            `${Cypress.env('apiBaseUrl')}/auth/register`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        ).then((response) => {
                            expect(response.status).to.eq(201);
                        });
                    });
                }
            );
        }
    );

    it(
        'Correct response body structure should be returned when payload is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@registration'] },
        () => {
            cy.fixture('profileImage.jpg', 'base64').then(
                (profilePhotoBase64) => {
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

                    cy.wrap(null).then(async () => {
                        // Use fetch function instead of cy.request to properly send form data
                        return fetch(
                            `${Cypress.env('apiBaseUrl')}/auth/register`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        )
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                // Validate the response body against the schema
                                const isValid = tv4.validate(
                                    data,
                                    registerSchema
                                );
                                expect(isValid, tv4.error).to.be.true;
                            });
                    });
                }
            );
        }
    );

    it(
        'Correct response body properties should be returned when payload is valid',
        // @ts-ignore
        { tags: ['@api', '@regression', '@positive', '@registration'] },
        () => {
            cy.fixture('profileImage.jpg', 'base64').then(
                (profilePhotoBase64) => {
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

                    cy.wrap(null).then(async () => {
                        // Use fetch function instead of cy.request to properly send form data
                        return fetch(
                            `${Cypress.env('apiBaseUrl')}/auth/register`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        )
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                expect(data.firstName).to.eq(user.firstName);
                                expect(data.lastName).to.eq(user.lastName);
                                expect(data.email).to.eq(user.email);
                                expect(data.occupation).to.eq(user.occupation);
                                expect(data.location).to.eq(user.location);
                                expect(data.picturePath).to.eq(
                                    'profileImage.jpg'
                                );
                            });
                    });
                }
            );
        }
    );

    it(
        'Correct response should be returned when required properties are missing',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@registration'] },
        () => {
            const formData = new FormData();
            cy.wrap(null).then(async () => {
                // Use fetch function instead of cy.request to properly send form data
                return fetch(`${Cypress.env('apiBaseUrl')}/auth/register`, {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => {
                        expect(response.status).to.eq(400);
                        return response.json();
                    })
                    .then((data) => {
                        expect(data.error).to.be.eq('Missing required fields');
                        expect(data.missingFields).to.deep.eq([
                            'firstName',
                            'lastName',
                            'email',
                            'password',
                            'picturePath',
                            'location',
                            'occupation'
                        ]);
                    });
            });
        }
    );

    it(
        'Status code 400 should returned for already registered email in the payload',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@registration'] },
        () => {
            // Register user
            apiHelper.registerUser(user);

            // Try to register user with already registered email
            cy.fixture('profileImage.jpg', 'base64').then(
                (profilePhotoBase64) => {
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

                    cy.wrap(null).then(async () => {
                        // Use fetch function instead of cy.request to properly send form data
                        return fetch(
                            `${Cypress.env('apiBaseUrl')}/auth/register`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        ).then((response) => {
                            expect(response.status).to.eq(400);
                        });
                    });
                }
            );
        }
    );

    it(
        'Correct error message should be returned when already registered email is in the payload',
        // @ts-ignore
        { tags: ['@api', '@regression', '@negative', '@registration'] },
        () => {
            // Register user
            apiHelper.registerUser(user);

            // Try to register user with already registered email
            cy.fixture('profileImage.jpg', 'base64').then(
                (profilePhotoBase64) => {
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

                    cy.wrap(null).then(async () => {
                        // Use fetch function instead of cy.request to properly send form data
                        return fetch(
                            `${Cypress.env('apiBaseUrl')}/auth/register`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        )
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                // Validate response body
                                expect(data.error).to.eq(
                                    'Email already registered'
                                );
                            });
                    });
                }
            );
        }
    );
});
