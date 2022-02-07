import express, { Request, Response } from 'express';
import { checkSchema } from 'express-validator';

import { userService } from '@services/user.service';
import { validateRequest } from '@middlewares/validate-request';
import { signUpSchema } from './validations/usersValidation';

const router = express.Router();

router.post(
  '/signup',
  checkSchema(signUpSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    const { user, token, expires } = await userService.signUp({ ...req.body });

    res.status(201).json({ user, token, expiresIn: expires });
  }
);

export { router as usersRouter };
