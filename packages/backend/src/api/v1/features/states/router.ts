import { StateRepository } from '@/api/v1/features/states/repository.js';
import { StateService } from '@/api/v1/features/states/service.js';
import { StateController } from '@/api/v1/features/states/controller.js';
import { Router } from 'express';
import { pool } from '@/db/db.js';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';

const stateRepository = new StateRepository(pool);
const stateService = new StateService(stateRepository);
const stateController = new StateController(stateService);
const stateRouter = Router();

stateRouter.get('/seen', validateToken, setupLocals, stateController.getStatesSeen);
stateRouter.post('/seen', validateToken, setupLocals, stateController.markStateSeen);
stateRouter.delete('/seen/:stateId', validateToken, setupLocals, stateController.unmarkStateSeen);
stateRouter.post('/capitols/seen', validateToken, setupLocals, stateController.markCapitolSeen);
stateRouter.delete(
  '/capitols/seen/:stateId',
  validateToken,
  setupLocals,
  stateController.unmarkCapitolSeen,
);

export { stateRouter };
