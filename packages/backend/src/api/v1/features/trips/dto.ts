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
