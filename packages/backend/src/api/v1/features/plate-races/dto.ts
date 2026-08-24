import type { PlateRaceDescriptionsCursor } from '@katieeitak/shared';

export interface CreatePlateRaceByUserIdDto {
  title: string;
}

export interface MarkPlateSeenDto {
  userId: string;
  stateId: number;
  plateRaceId: string;
}

export interface UnmarkPlateSeenDto {
  userId: string;
  stateId: string;
  plateRaceId: string;
}

export interface CompletePlateRaceDto {
  userId: string;
  plateRaceId: string;
}

export interface GetPastPlateRaceDescriptionsDto {
  userId: string;
  limit: number;
  cursor: PlateRaceDescriptionsCursor | null;
}

export interface GetPlateRaceDataDto {
  userId: string;
  plateRaceId: string;
}

export interface GetCurrentPlateRaceDescriptionDto {
  userId: string;
}
