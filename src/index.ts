import { app } from './app';
import connectDB from './config/database';
import config from './config/config';

connectDB();

app.listen(config.PORT, () => {
  console.log(`Listening on port`, config.PORT);
});
