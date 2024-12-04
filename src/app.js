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
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
