import { faker } from '@faker-js/faker';

import { userService } from '@services/user.service';

type DummyUserAndToken = { user: any; token: string };

export function userGenerator() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.word.noun(8),
  };
}

export async function createDummyUser(): Promise<DummyUserAndToken> {
  const dummyUser = userGenerator();
  const { user, token } = await userService.signUp(dummyUser);
  return { user, token };
}
