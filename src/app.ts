import express from 'express';
import 'express-async-errors';

import { router } from '@routes';
import { NotFoundError } from '@errors/not-found-error';
import { errorHandler } from '@middlewares/error-handler';

const app = express();

/**
 * ----- Global Middleware -----
 */
app.use(express.json());
app.set('trust proxy', true);

/**
 * ----- Route -----
 */
app.use(router);

router.get('/test', (req, res) => {
  res.json({ message: 'TEST' });
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
