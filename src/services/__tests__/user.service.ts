import { faker } from '@faker-js/faker';
import { userService } from '@services/user.service';

describe('signup', () => {
  it('should resolve with true', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.internet.userName();

    const response = await userService.signUp({ username, email, password });

    expect(response.user.id).toEqual(expect.stringMatching(/^[a-f0-9]{24}$/));
    expect(response.expires).toEqual(1);
    expect(response.token).toEqual(expect.stringContaining('Bearer'));
  });
});
