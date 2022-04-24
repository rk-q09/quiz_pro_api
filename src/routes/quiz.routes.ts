import express, { Request, Response } from 'express';
import passport from 'passport';

import { Quiz } from '@models/quiz';
import { User } from '@models/user';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { userId, title } = req.body;

    const quiz = new Quiz({ title, createdBy: userId });
    await quiz.save().catch((err: any) => {
      return err;
    });

    await User.findByIdAndUpdate(userId, {
      $push: { postedQuizzes: quiz._id },
    });

    const createdQuiz = {
      createdAt: quiz.createdAt,
      id: quiz.id,
      title: quiz.title,
    };

    return res.status(201).json(createdQuiz);
  }
);

export { router as quizzesRouter };
