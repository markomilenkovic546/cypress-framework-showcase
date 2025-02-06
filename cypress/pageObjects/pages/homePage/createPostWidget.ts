import type { Locator } from 'cypress/support/e2e';

export default class CreatePostWidget {
    // DOM ELEMENTS
    get profilePhoto(): Locator {
        return cy.get('[data-cy="my-post-widget"]').find('[alt="user"]');
    }

    get postInput(): Locator {
        return cy
            .get('[data-cy="my-post-widget"]')
            .find('[data-cy="post-input"] input');
    }
    get toggleImageDropZone(): Locator {
        return cy
            .get('[data-cy="my-post-widget"]')
            .find('[data-cy="toggle-image-option"]');
    }

    get imageDropZone(): Locator {
        return cy
            .get('[data-cy="my-post-widget"]')
            .find('[data-cy="dropzone"]');
    }

    get postButton(): Locator {
        return cy
            .get('[data-cy="my-post-widget"]')
            .find('[data-cy="post-button"]');
    }
}
