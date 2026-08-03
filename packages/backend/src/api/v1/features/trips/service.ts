import type { TripRepository } from '@/api/v1/features/trips/repository.js';
import type { CompleteTripByIdDto, CreateTripByUserIdDto } from '@/api/v1/features/trips/dto.js';

interface GetCurrentTripByUserIdParams {
  userId: string;
}

interface CreateTripByUserIdParams {
  userId: string;
  data: CreateTripByUserIdDto;
}

interface CompleteTripByIdParams {
  userId: string;
  data: CompleteTripByIdDto;
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
    const currentTrip = await this.tripRepository.getTripPlateListByTripId({ tripId: trip.id });
    return currentTrip;
  };

  public createTripByUserId = async ({ userId, data }: CreateTripByUserIdParams) => {
    const newTrip = await this.tripRepository.createTripByUserId({ userId, data });
    return newTrip;
  };

  public completeTripById = async ({ userId, data }: CompleteTripByIdParams) => {
    const completedTrip = await this.tripRepository.completeTripById({ userId, data });
    return completedTrip;
  };
}
