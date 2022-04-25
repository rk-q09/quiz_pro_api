import express, { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';

import { quizService } from '@services/quiz.service';
import { createQuizSchema } from './validations/quizzesValidation';

const router = express.Router();

router.post(
  '/',
  checkSchema(createQuizSchema),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { userId, title } = req.body;

    const createdQuiz = await quizService.addQuiz({ title, createdBy: userId });
    return res.status(201).json(createdQuiz);
  }
);

export { router as quizzesRouter };
