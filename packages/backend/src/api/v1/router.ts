import { Router } from 'express';
import { identityRouter } from './features/identity/entry-points/router.js';
import { anxietyRouter } from '@/api/v1/features/anxiety/entry-points/router.js';

const v1Router: Router = Router();

v1Router.use('/auth', identityRouter);
v1Router.use('/anxiety', anxietyRouter);

export { v1Router };
