import express, { type Express } from 'express';
import cors from 'cors';
import { BACKEND_ENV } from '@/env.js';
import { v1Router } from '@/api/v1/router.js';
import { globalErrorHandler } from '@/middleware/globalErrorHandler/globalErrorHandler.js';

const createApp = (): Express => {
  const corsOptions = {
    origin: BACKEND_ENV.CORS_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  const app = express();
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/v1', v1Router);

  // global error handler

  app.use(globalErrorHandler);
  return app;
};

export { createApp };
