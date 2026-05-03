import { Router } from 'express';
import { identityRouter } from './features/identity/entry-points/router.js';

const v1Router: Router = Router();

v1Router.use('/auth', identityRouter);

export { v1Router };
