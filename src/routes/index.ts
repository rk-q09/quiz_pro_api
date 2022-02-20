import express from 'express';

import { usersRouter } from './user.routes';

export const router = express.Router();

router.use('/users', usersRouter);
