import express, { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';

import { quizService } from '@services/quiz.service';
import { createQuizSchema } from './validations/quizzesValidation';

import { User } from '@models/user';
import { Quiz } from '@models//quiz';
import { BadRequestError } from '@errors/bad-request-error';

const router = express.Router();

router.get(
  '/',
  (req: Request, res: Response) => {
    Quiz.find({})
      .sort({ createdAt: -1 })
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.send({ errors: err })
      });
  }
);

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

router.delete(
  '/:quizId',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { quizId } = req.params;

    Quiz.findByIdAndDelete(quizId, (err: Error, quiz: any) => {
      if (err) {
        res.json(err);
      }
      res.json(quiz);
    });
  }
);

router.get('/users/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  /*
    const postedQuizzes = await userService.getQuizzes(userId);  
    console.log('on quiz.routes', postedQuizzes);
    res.status(200).send({postedQuizzes});
    */
  User.findById(userId)
    .populate('postedQuizzes')
    .exec((err, user: any) => {
      if (err) {
        throw new BadRequestError('登録されていないユーザーです');
      }
      res.status(200).json(user.postedQuizzes);
    });
});

router.get(
  '/:quizId',
  async (req: Request, res: Response) => {
    const quizId = req.params.quizId;

    const quiz = await quizService.getQuiz({ quizId });

    res.status(200).json(quiz);
  }
); 

router.post(
  '/:quizId',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const quizId = req.params.quizId;
    const { content, choices, answer } = req.body;

    const updatedQuiz = await quizService.addQuestion({ content, choices, answer, quizId });

    if (!updatedQuiz) throw new Error();

    res.status(201).json(updatedQuiz);
  }
);
  

export { router as quizzesRouter };
