import mongoose from 'mongoose';
import { dbUrl } from './env.js';

const mongooseConnection = mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    return mongoose;
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

export default mongooseConnection;
