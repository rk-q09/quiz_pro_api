import express from 'express';
import 'express-async-errors';
import passport from '@config/passport';
import cors from 'cors';

import { router } from '@routes';
import { NotFoundError } from '@errors/not-found-error';
import { errorHandler } from '@middlewares/error-handler';

const app = express();

/**
 * ----- Global Middleware -----
 */
app.use(cors());
app.use(express.json());
app.set('trust proxy', true);

app.use(passport.initialize());
/**
 * ----- Route -----
 */
app.use(router);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
