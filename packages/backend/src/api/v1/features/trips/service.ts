import type { TripRepository } from '@/api/v1/features/trips/repository.js';
import type {
  CompleteTripDto,
  CreateTripByUserIdDto,
  GetCurrentTripDescriptionDto,
  GetPastTripsDescriptionsDto,
  GetTripDataDto,
  MarkPlateSeenDto,
  UnmarkPlateSeenDto,
} from '@/api/v1/features/trips/dto.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';

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

interface GetTripDataParams {
  data: GetTripDataDto;
}

interface GetCurrentTripDescriptionParams {
  data: GetCurrentTripDescriptionDto;
}

interface GetPastTripDescriptionsParams {
  data: GetPastTripsDescriptionsDto;
}

export class TripService {
  private tripRepository: TripRepository;
  constructor(tripRepository: TripRepository) {
    this.tripRepository = tripRepository;
  }

  public getCurrentTripDescription = async ({ data }: GetCurrentTripDescriptionParams) => {
    const tripDescription = await this.tripRepository.getCurrentTripDescription({
      userId: data.userId,
    });
    return tripDescription;
  };

  public getPastTripDescriptions = async ({ data }: GetPastTripDescriptionsParams) => {
    const tripDescriptions = await this.tripRepository.getPastTripDescriptions({
      limit: data.limit,
      userId: data.userId,
      cursor: data.cursor,
    });
    return tripDescriptions;
  };

  public createTripByUserId = async ({ userId, data }: CreateTripByUserIdParams) => {
    const newTrip = await this.tripRepository.createTripByUserId({ userId, data });
    return newTrip;
  };

  public getTripData = async ({ data }: GetTripDataParams) => {
    const trip = await this.tripRepository.getTripByTripIdAndUserId({
      userId: data.userId,
      tripId: data.tripId,
    });
    const plateList = await this.tripRepository.getTripData({ tripId: data.tripId });
    const count = plateList.reduce((accumulator, plate) => {
      if (plate.date_seen) {
        accumulator += 1;
      }
      return accumulator;
    }, 0);
    return {
      plateList,
      count,
      trip,
    };
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
