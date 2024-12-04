import './config/env.js';
import express from 'express';

import ChatRoutes from './routes/chatRoute.js';

import { configDotenv } from 'dotenv';
configDotenv();

const app = express();

// parse json body
app.use(express.json());

// Chat route
app.use('/', ChatRoutes);

const PORT = process.env.PORT || 3000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
app.listen(PORT, HOST, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Server running on port: ${PORT}`);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});