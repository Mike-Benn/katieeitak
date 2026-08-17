import type { TripDescriptionsCursor, TripStatus } from '@katieeitak/shared';

export interface CreateTripByUserIdDto {
  title: string;
}

export interface MarkPlateSeenDto {
  userId: string;
  plateId: number;
  tripId: string;
}

export interface UnmarkPlateSeenDto {
  userId: string;
  plateId: string;
  tripId: string;
}

export interface CompleteTripDto {
  userId: string;
  tripId: string;
}

export interface GetTripsDescriptionsDto {
  userId: string;
  status: TripStatus;
  limit: number;
  cursor: TripDescriptionsCursor | null;
}

export interface GetTripDataDto {
  userId: string;
  tripId: string;
}
