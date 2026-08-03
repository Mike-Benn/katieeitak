import { Router } from 'express';
import { TripRepository } from '@/api/v1/features/trips/repository.js';
import { TripService } from '@/api/v1/features/trips/service.js';
import { TripController } from '@/api/v1/features/trips/controller.js';
import { pool } from '@/db/db.js';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';

const tripRepository = new TripRepository(pool);
const tripService = new TripService(tripRepository);
const tripController = new TripController(tripService);
const tripRouter = Router();

tripRouter.get('/', validateToken, setupLocals, tripController.getCurrentTripByUserId);
tripRouter.post('/', validateToken, setupLocals, tripController.createTripByUserId);
tripRouter.patch('/:id/complete', validateToken, setupLocals, tripController.completeTripById);
tripRouter.post('/:tripId/seen-plates/', validateToken, setupLocals, tripController.markPlateSeen);

export { tripRouter };
