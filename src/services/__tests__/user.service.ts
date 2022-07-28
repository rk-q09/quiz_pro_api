import { userService } from '@services/user.service';
import { userGenerator } from '@test/data/user';

describe('signup', () => {
  it('should resolve with true', async () => {
    const { email, password, username } = userGenerator();

    const response = await userService.signUp({ username, email, password });

    expect(response.user.id).toEqual(expect.stringMatching(/^[a-f0-9]{24}$/));
    expect(response.expires).toEqual(1);
    expect(response.token).toEqual(expect.stringContaining('Bearer'));
  });
});
