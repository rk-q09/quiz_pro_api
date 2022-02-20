import { User } from '@models/user';
import { faker } from '@faker-js/faker';

describe('save', () => {
  it('should create user', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.internet.userName();

    const user = new User({ username, email, password });
    await user.save();

    const fetched = await User.findOne({ email });

    if (!fetched) {
      throw new Error('User is null');
    }

    expect(fetched.email).toBe(email);
    expect(fetched.username).toBe(username);
    expect(fetched.password).not.toBe(password);
  });
});
