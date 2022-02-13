import { User, UserAttr } from '@models/user';
import { issueJWT } from '@utils/issueJwt';
import { BadRequestError } from '@errors/bad-request-error';

export class UserService {
  async signUp({ username, email, password }: UserAttr) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('既に使用されているメールアドレスです');
    }

    const user = new User({ username, email, password });

    await user.save().catch((err) => {
      return err;
    });

    const { token, expires } = issueJWT(user);

    return { user, token, expires };
  }
}

export const userService = new UserService();
