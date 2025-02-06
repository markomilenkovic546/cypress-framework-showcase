import type { Locator } from 'cypress/support/e2e';

export default class FeedPostWidget {
    // DOM ELEMENTS
    userImage(postId: string): Locator {
        return cy.get(`[data-cy="post-widget-${postId}"]`).find('[alt="user"]');
    }

    userFullName(postId: string): Locator {
        return cy.get(`[data-cy="post-widget-${postId}"]`).find('h5');
    }

    userLocation(postId: string): Locator {
        return cy.get(`[data-cy="post-widget-${postId}"]`).find('p').eq(0);
    }

    postContent(postId: string): Locator {
        return cy
            .get(`[data-cy="post-widget-${postId}"]`)
            .find('[data-cy="post-description"]');
    }

    likeButton(postId: string): Locator {
        return cy.get(`[data-cy="post-widget-${postId}"]`).find('[data-cy="like-button"]');
    }
    commentButton(postId: string): Locator {
        return cy
            .get(`[data-cy="post-widget-${postId}"]`)
            .find('[data-cy="comment-toggle-button"]');
    }
    commentCount(postId: string): Locator {
        return cy
            .get(`[data-cy="post-widget-${postId}"]`)
            .find('[data-cy="comment-count"]');
    }

    comment(postId: string, index: number): Locator {
        return cy
            .get(`[data-cy="post-widget-${postId}"]`)
            .find(`[data-cy="comment-${index}"]`);
    }

    likeCount(postId: string): Locator {
        return cy.get(`[data-cy="post-widget-${postId}"]`).find('[data-cy="like-count"]');
    }

    addToFriendsButton(postId: string): Locator {
        return cy
            .get(`[data-cy="post-widget-${postId}"]`)
            .find('[data-testid="PersonAddOutlinedIcon"]');
    }

    removeFromFriendsButton(postId: string): Locator {
        return cy
            .get(`[data-cy="post-widget-${postId}"]`)
            .find('[data-testid="PersonRemoveOutlinedIcon"]');
    }
}
