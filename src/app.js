// Import required modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import staticRoute from './routes/staticRoutes.js';
import userRoute from './routes/userRoutes.js';
import urlRoute from './routes/urlRoutes.js';
import cookieParser from 'cookie-parser';
import { config, mongooseConnection } from './config/index.js';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Define middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));

// Set up static files serving
app.use(express.static(path.join(__dirname, '../public')));

// Define routes
app.use('/', staticRoute);
app.use('/user', userRoute);
app.use('/url', urlRoute);

// Connect and Start Server
const startServer = async () => {
  try {
    // Wait for Mongoose to connect
    await mongooseConnection;

    // Start the server
    app.listen(config.port, () => {
      console.log(`Server started at port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
