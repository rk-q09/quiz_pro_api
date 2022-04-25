import { Quiz, CreateQuizDTO } from '@models/quiz';
import { User } from '@models/user';
import { BadRequestError } from '@errors/bad-request-error';

export class QuizService {
  async addQuiz({ title, createdBy: userId }: CreateQuizDTO) {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      throw new BadRequestError('ユーザーが登録されていません');
    }

    const quiz = new Quiz({ title, createdBy: userId });
    await quiz.save().catch((err: any) => {
      return err;
    });

    await User.findByIdAndUpdate(userId, {
      $push: { postedQuizzes: quiz.id },
    });

    return {
      id: quiz.id,
      title: quiz.title,
    };
  }
}

export const quizService = new QuizService();
