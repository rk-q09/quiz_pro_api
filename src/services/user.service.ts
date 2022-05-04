import { User, UserAttr } from '@models/user';
import { issueJWT } from '@utils/issueJwt';
import { BadRequestError } from '@errors/bad-request-error';
import { Password } from '@utils/password';

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

  async signIn({ email, password }: Omit<UserAttr, 'username'>) {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('登録されていないメールアドレスです');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('パスワードが間違っています');
    }

    const { token, expires } = issueJWT(existingUser);

    return { user: existingUser, token, expires };
  }

  async getQuizzes(userId: string) {
    User.findById(userId)
      .populate({
        path: 'postedQuizzes',
      })
      .exec((err, user: any) => {
        if (err) {
          return new BadRequestError('登録されていないユーザーです');
        }
        console.log('on user.service', user.postedQuizzes);
        // return user.postedQuizzes
        return { message: 'hi' };
      });
  }
}

export const userService = new UserService();
