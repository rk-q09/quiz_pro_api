import express, { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';

import { quizService } from '@services/quiz.service';
import { createQuizSchema } from './validations/quizzesValidation';

import { User } from '@models/user';
import { Quiz } from '@models//quiz';
import { BadRequestError } from '@errors/bad-request-error';

import { ExRequest } from './types';

const router = express.Router();

router.get(
  '/',
  async (req: ExRequest, res: Response) => {
    const title = req.query.title;
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 16;

    Quiz.find(condition)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip( (pageNumber - 1) * limit)
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

router.get(
  '/count',
  (req: Request, res: Response) => {
    Quiz.find()
      .then(data =>
        res.json({ count: data.length })
      )
     .catch(err => {
        res.send({ errors: err })
    });
  }
);

router.get(
  '/search/count', 
  (req: ExRequest, res: Response) => {
    const title = req.query.title;
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Quiz.find(condition)
      .then(data => {
        res.json({ count: data.length });
      })
      .catch(err => {
        res.send({ errors: err });
      });
});

router.get('/users/:userId', async (req: ExRequest, res: Response) => {
  const { userId } = req.params;
  
  const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 16;
  /*
    const postedQuizzes = await userService.getQuizzes(userId);  
    console.log('on quiz.routes', postedQuizzes);
    res.status(200).send({postedQuizzes});
    */
  User.findById(userId)
    .populate({
      path: 'postedQuizzes',
      options: {
        sort: { created: -1 },
        limit: limit,
        skip: (pageNumber - 1) * limit,
      }
    })
    .exec((err, user: any) => {
      if (err) {
        throw new BadRequestError('登録されていないユーザーです');
      }
      res.status(200).json(user.postedQuizzes);
    });
});

router.get('/users/:userId/count', (req: Request, res: Response) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate('postedQuizzes')
    .exec((err, user: any) => {
      if (err) {
        throw new BadRequestError('登録されていないユーザーです');
      }
      res.status(200).json({ count: user.postedQuizzes.length });
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

    console.log(updatedQuiz);
    res.status(201).json(updatedQuiz);
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
  

export { router as quizzesRouter };
