import { Router } from 'express';
import { PlateRaceRepository } from '@/api/v1/features/plate-races/repository.js';
import { PlateRaceService } from '@/api/v1/features/plate-races/service.js';
import { PlateRaceController } from '@/api/v1/features/plate-races/controller.js';
import { pool } from '@/db/db.js';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';

const plateRaceRepository = new PlateRaceRepository(pool);
const plateRaceService = new PlateRaceService(plateRaceRepository);
const plateRaceController = new PlateRaceController(plateRaceService);
const plateRaceRouter = Router();

plateRaceRouter.get(
  '/past',
  validateToken,
  setupLocals,
  plateRaceController.getPastPlateRaceDescriptions,
);
plateRaceRouter.get(
  '/current',
  validateToken,
  setupLocals,
  plateRaceController.getCurrentPlateRaceDescription,
);
plateRaceRouter.get('/:id', validateToken, setupLocals, plateRaceController.getPlateRaceData);
plateRaceRouter.post('/', validateToken, setupLocals, plateRaceController.createPlateRaceByUserId);
plateRaceRouter.patch(
  '/:id/complete',
  validateToken,
  setupLocals,
  plateRaceController.completePlateRace,
);
plateRaceRouter.post(
  '/:id/seen-plates/',
  validateToken,
  setupLocals,
  plateRaceController.markPlateSeen,
);
plateRaceRouter.delete(
  '/:id/seen-plates/:stateId',
  validateToken,
  setupLocals,
  plateRaceController.unmarkPlateSeen,
);

export { plateRaceRouter };
