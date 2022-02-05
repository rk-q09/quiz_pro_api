import mongoose from 'mongoose';

import config from './config';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.DB_STRING);
    console.log(`Mongo db connected:`, connection.connection.host);
  } catch (err) {
    console.error(err);
  }
};
export default connectDB;
