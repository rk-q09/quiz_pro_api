import { User } from '@models/user';
import { userGenerator } from '@test/data/user';

it('ユーザーモデルを作成', async () => {
  const { username, email, password } = userGenerator();

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
