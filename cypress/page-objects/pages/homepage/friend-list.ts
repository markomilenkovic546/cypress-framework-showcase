import type { Locator } from 'cypress/support/e2e';

export default class FriendList {
    // DOM ELEMENTS
    friendPhoto(index: number): Locator {
        return cy
            .get('[data-cy="friend-list-container"] div')
            .eq(index)
            .find('[alt="user"]');
    }

    friendFullName(index: number): Locator {
        return cy
            .get('[data-cy="friend-list-container"] div')
            .eq(index)
            .find('h5');
    }

    friendOccupation(index: number): Locator {
        return cy
            .get('[data-cy="friend-list-container"] div')
            .eq(index)
            .find('p');
    }

    removeFriendButton(index: number): Locator {
        return cy
            .get('[data-cy="friend-list-container"] div')
            .eq(index)
            .find('[data-testid="PersonRemoveOutlinedIcon"]');
    }
}
