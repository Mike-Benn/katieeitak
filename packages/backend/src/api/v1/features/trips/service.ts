import type { TripRepository } from '@/api/v1/features/trips/repository.js';
import type {
  CompleteTripDto,
  CreateTripByUserIdDto,
  MarkPlateSeenDto,
  UnmarkPlateSeenDto,
} from '@/api/v1/features/trips/dto.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';

interface GetCurrentTripByUserIdParams {
  userId: string;
}

interface CreateTripByUserIdParams {
  userId: string;
  data: CreateTripByUserIdDto;
}

interface CompleteTripParams {
  data: CompleteTripDto;
}

interface MarkPlateSeenParams {
  data: MarkPlateSeenDto;
}

interface UnmarkPlateSeenParams {
  data: UnmarkPlateSeenDto;
}

export class TripService {
  private tripRepository: TripRepository;
  constructor(tripRepository: TripRepository) {
    this.tripRepository = tripRepository;
  }

  public getCurrentTripByUserId = async ({ userId }: GetCurrentTripByUserIdParams) => {
    const trip = await this.tripRepository.getCurrentTripByUserId({ userId });
    if (!trip) {
      return null;
    }
    const plateList = await this.tripRepository.getTripPlateListByTripId({ tripId: trip.id });
    return {
      plateList,
      tripId: trip.id,
      title: trip.title,
    };
  };

  public createTripByUserId = async ({ userId, data }: CreateTripByUserIdParams) => {
    const newTrip = await this.tripRepository.createTripByUserId({ userId, data });
    return newTrip;
  };

  public completeTrip = async ({ data }: CompleteTripParams) => {
    const completedTrip = await this.tripRepository.completeTrip({ data });
    return completedTrip;
  };

  public markPlateSeen = async ({ data }: MarkPlateSeenParams) => {
    const currentTrip = await this.tripRepository.getCurrentTripByUserId({ userId: data.userId });
    if (!currentTrip || data.tripId !== currentTrip.id) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        statusCode: 404,
        isOperational: true,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
      });
    }
    const markedPlate = await this.tripRepository.markPlateSeen({ data });
    return markedPlate;
  };

  public unmarkPlateSeen = async ({ data }: UnmarkPlateSeenParams) => {
    const currentTrip = await this.tripRepository.getCurrentTripByUserId({ userId: data.userId });
    if (!currentTrip || data.tripId !== currentTrip.id) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        statusCode: 404,
        isOperational: true,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
      });
    }
    const unmarkedPlate = await this.tripRepository.unmarkPlateSeen({ data });
    return unmarkedPlate;
  };
}
