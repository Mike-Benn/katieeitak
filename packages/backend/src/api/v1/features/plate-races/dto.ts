import type { PlateRaceDescriptionsCursor } from '@katieeitak/shared';

export interface CreatePlateRaceByUserIdDto {
  title: string;
}

export interface MarkPlateSeenDto {
  userId: string;
  plateId: number;
  plateRaceId: string;
}

export interface UnmarkPlateSeenDto {
  userId: string;
  plateId: string;
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
