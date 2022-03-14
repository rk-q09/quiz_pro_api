import express, { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';

import { userService } from '@services/user.service';
import { validateRequest } from '@middlewares/validate-request';
import { signUpSchema, signInSchema } from './validations/usersValidation';

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

router.post(
  '/signin',
  checkSchema(signInSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    const { user, token, expires } = await userService.signIn({ ...req.body });

    res.status(200).json({ user, token, expiresIn: expires });
  }
);

router.get('/auth/me', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err: Error, user: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    return res.json(user);
  })(req, res, next);
});

export { router as usersRouter };
