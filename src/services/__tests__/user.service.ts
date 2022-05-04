import { userService } from '@services/user.service';
import { dummy } from '@test/user';

describe('signup', () => {
  it('should resolve with true', async () => {
    const { email, password, username } = dummy();

    const response = await userService.signUp({ username, email, password });

    expect(response.user.id).toEqual(expect.stringMatching(/^[a-f0-9]{24}$/));
    expect(response.expires).toEqual(1);
    expect(response.token).toEqual(expect.stringContaining('Bearer'));
  });
});
