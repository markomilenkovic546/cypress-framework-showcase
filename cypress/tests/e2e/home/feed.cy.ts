import AuthPage from '../../../page-objects/pages/auth-page/auth.page';
import HomePage from '../../../page-objects/pages/homepage/home.page';
import ApiHelper from 'cypress/data/api-helper';
import DataFactory from '../../../data/data-factory';
import { User } from '../../../data/types';
const dataFactory = new DataFactory();
const authPage = new AuthPage();
const homePage = new HomePage();
const apiHelper = new ApiHelper();

describe('Posts List', () => {
    let posts: any[];
    // @ts-ignore
    context('Desktop viewport', { tags: ['@desktop'] }, () => {
        let user: User;
        beforeEach(() => {
            cy.viewport(1920, 1080);
            // Create valid user data
            user = dataFactory.createValidUserData();
            // Register user
            apiHelper.registerUser(user);
            // Get posts via API
            apiHelper.getPosts(user).then((p) => {
                // Store posts in order to verify client functionalities
                posts = p;
                // Login
                cy.visit('/');
                authPage.login(user.email, user.password);
            });
        });

        it(
            'All posts should be correctly displayed ',
            // @ts-ignore
            { tags: ['@e2e', '@regression', '@positive'] },
            () => {
                posts.forEach((post) => {
                    homePage.feedPostWidget
                        .userFullName(post._id)
                        .invoke('text')
                        .then((fullName) => {
                            expect(fullName).to.equal(
                                `${post.firstName} ${post.lastName}`
                            );
                        });

                    homePage.feedPostWidget
                        .userLocation(post._id)
                        .invoke('text')
                        .then((location) => {
                            expect(location).to.equal(post.location);
                        });

                    homePage.feedPostWidget
                        .userImage(post._id)
                        .invoke('attr', 'src')
                        .should('include', post.userPicturePath);

                    homePage.feedPostWidget
                        .postContent(post._id)
                        .invoke('text')
                        .then((postText) => {
                            expect(postText).to.equal(post.description);
                        });

                    homePage.feedPostWidget
                        .likeCount(post._id)
                        .invoke('text')
                        .then((count) => {
                            expect(Number(count)).to.equal(
                                Object.keys(post.likes).length
                            );
                        });

                    homePage.feedPostWidget
                        .commentCount(post._id)
                        .invoke('text')
                        .then((count) => {
                            expect(Number(count)).to.equal(
                                post.comments.length
                            );
                        });

                    post.comments.forEach((comment, index) => {
                        homePage.feedPostWidget.commentButton(post._id).click();
                        homePage.feedPostWidget
                            .comment(post._id, index)
                            .invoke('text')
                            .then((commentText) => {
                                expect(commentText).to.equal(comment);
                            });
                        homePage.feedPostWidget.commentButton(post._id).click();
                    });
                });
            }
        );

        it(
            'User should be able to add a friend from the post widget',
            // @ts-ignore
            { tags: ['@e2e', '@smoke', '@positive'] },
            () => {
                homePage.feedPostWidget
                    .addToFriendsButton(posts[0]._id)
                    .click();
                // Verify that user is add on the friend list
                homePage.friendList
                    .friendFullName(0)
                    .should(
                        'have.text',
                        `${posts[0].firstName} ${posts[0].lastName}`
                    );
            }
        );
    });
});
