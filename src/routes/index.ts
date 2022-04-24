import express from 'express';

import { usersRouter } from './user.routes';
import { quizzesRouter } from './quiz.routes';

export const router = express.Router();

router.use('/users', usersRouter);
router.use('/quizzes', quizzesRouter);
