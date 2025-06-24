import { faker } from '@faker-js/faker';
import type { User } from './types';

export default class DataFactory {
    createValidUserData(): User {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const location = faker.location.city();
        const occupation = faker.person.jobTitle();
        const email = faker.internet.username() + '@mailsac.com';
        const password = faker.internet.password();
        const picture = 'kadu1.jpg';

        return {
            firstName,
            lastName,
            location,
            occupation,
            email,
            password,
            picture
        };
    }

    createPostDescription(): string {
        return faker.lorem.paragraph();
    }
}
