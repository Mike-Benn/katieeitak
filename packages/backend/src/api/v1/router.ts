import { Router } from 'express';
import { identityRouter } from './features/identity/entry-points/router.js';
import { anxietyRouter } from '@/api/v1/features/anxiety/router.js';
import { bookRouter } from '@/api/v1/features/books/router.js';
import { libraryRouter } from '@/api/v1/features/library/router.js';
import { plateRaceRouter } from '@/api/v1/features/plate-races/router.js';
import { stateRouter } from '@/api/v1/features/states/router.js';

const v1Router: Router = Router();

v1Router.use('/auth', identityRouter);
v1Router.use('/anxiety', anxietyRouter);
v1Router.use('/books', bookRouter);
v1Router.use('/library', libraryRouter);
v1Router.use('/plate-races', plateRaceRouter);
v1Router.use('/states', stateRouter);

export { v1Router };
