import { faker } from '@faker-js/faker';

import { userService } from '@services/user.service';

type DummyUserAndToken = { user: any; token: string };

export function dummy() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
  };
}

export async function createDummy(): Promise<DummyUserAndToken> {
  const dummyUser = dummy();
  const { user, token } = await userService.signUp(dummyUser);
  return { user, token };
}
