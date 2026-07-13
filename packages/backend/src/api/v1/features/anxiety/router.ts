import { Router } from 'express';
import { AnxietyController } from '@/api/v1/features/anxiety/controller.js';
import { AnxietyRepository } from '@/api/v1/features/anxiety/repository.js';
import { AnxietyService } from '@/api/v1/features/anxiety/service.js';
import { pool } from '@/db/db.js';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';

const anxietyRepository = new AnxietyRepository(pool);
const anxietyService = new AnxietyService(anxietyRepository);
const anxietyController = new AnxietyController(anxietyService);
const anxietyRouter = Router();

anxietyRouter.post('/', validateToken, setupLocals, anxietyController.createEvent);
anxietyRouter.get('/', validateToken, setupLocals, anxietyController.getAnxietyEventsByUserId);
anxietyRouter.patch(
  '/:id',
  validateToken,
  setupLocals,
  anxietyController.updateAnxietyEventByEventId,
);
anxietyRouter.patch(
  '/:id/complete',
  validateToken,
  setupLocals,
  anxietyController.completeAnxietyEventById,
);

export { anxietyRouter };
