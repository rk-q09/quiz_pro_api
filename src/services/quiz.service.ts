import { Quiz, CreateQuizDTO } from '@models/quiz';
import { User } from '@models/user';
import { BadRequestError } from '@errors/bad-request-error';

type CreateQuestionDTO = {
  content: string;
  choices: string[];
  answer: number;
  quizId: string;
};

export class QuizService {
  async getQuiz({ quizId }: { quizId: string }) {
    const existingQuiz = await Quiz.findById(quizId);

    if (!existingQuiz) {
      throw new BadRequestError('クイズが存在しません');
    }

    return {
      title: existingQuiz.title,
      questions: existingQuiz.questions,
    };
  }

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
      createdAt: quiz.createdAt,
    };
  }

  async addQuestion({ content, choices, answer, quizId }: CreateQuestionDTO) {
    const existingQuiz = await Quiz.findById(quizId);

    if (!existingQuiz) {
      throw new BadRequestError('クイズが存在しません');
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          questions: {
            content: content,
            choices: choices,
            correctAnswer: answer,
          },
        },
      },
      {
        select: 'questions',
        new: true,
      }
    );

    return updatedQuiz;
  }
}

export const quizService = new QuizService();
