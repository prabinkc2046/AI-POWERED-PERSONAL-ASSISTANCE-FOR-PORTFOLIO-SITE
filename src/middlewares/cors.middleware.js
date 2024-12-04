import cors from 'cors';

// define what can access the server here

const allowedOriginsEnvironmentVariable = process.env.ALLOWED_ORIGINS;

const allowedOrigins = allowedOriginsEnvironmentVariable
  ? allowedOriginsEnvironmentVariable.split(',')
  : [];

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? allowedOrigins : '*',
  headers: ['Content-Type', 'Authorization'],
  methods: ['POST'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
