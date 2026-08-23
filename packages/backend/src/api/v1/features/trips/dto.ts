import type { TripDescriptionsCursor } from '@katieeitak/shared';

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

export interface GetPastTripsDescriptionsDto {
  userId: string;
  limit: number;
  cursor: TripDescriptionsCursor | null;
}

export interface GetTripDataDto {
  userId: string;
  tripId: string;
}

export interface GetCurrentTripDescriptionDto {
  userId: string;
}
