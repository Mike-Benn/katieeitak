import { Router } from 'express';
import { LibraryController } from '@/api/v1/features/library/controller.js';
import { LibraryRepository } from '@/api/v1/features/library/repository.js';
import { LibraryService } from '@/api/v1/features/library/service.js';
import { pool } from '@/db/db.js';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';

const libraryRepository = new LibraryRepository(pool);
const libraryService = new LibraryService(libraryRepository);
const libraryController = new LibraryController(libraryService);
const libraryRouter = Router();

libraryRouter.post('/', validateToken, setupLocals, libraryController.markBookRead);
libraryRouter.get('/book/:key', validateToken, setupLocals, libraryController.getMarkedBook);
libraryRouter.patch('/:id', validateToken, setupLocals, libraryController.patchReadBookById);

export { libraryRouter };
