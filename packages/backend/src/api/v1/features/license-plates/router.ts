import { Router } from 'express';
import { LicensePlateRepository } from '@/api/v1/features/license-plates/repository.js';
import { LicensePlateService } from '@/api/v1/features/license-plates/service.js';
import { LicensePlateController } from '@/api/v1/features/license-plates/controller.js';
import { pool } from '@/db/db.js';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';

const licensePlateRepository = new LicensePlateRepository(pool);
const licensePlateService = new LicensePlateService(licensePlateRepository);
const licensePlateController = new LicensePlateController(licensePlateService);
const licensePlateRouter = Router();

licensePlateRouter.get('/', validateToken, setupLocals, licensePlateController.getLicensePlates);

export { licensePlateRouter };
