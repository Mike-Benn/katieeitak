export interface CompleteTripByIdDto {
  id: string;
}

export interface CreateTripByUserIdDto {
  title: string;
}

export interface MarkPlateSeenDto {
  userId: string;
  plateId: number;
  tripId: string;
}
