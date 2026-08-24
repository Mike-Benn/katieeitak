import type { PlateRaceRepository } from '@/api/v1/features/plate-races/repository.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import type {
  CompletePlateRaceDto,
  CreatePlateRaceByUserIdDto,
  GetCurrentPlateRaceDescriptionDto,
  GetPastPlateRaceDescriptionsDto,
  GetPlateRaceDataDto,
  MarkPlateSeenDto,
  UnmarkPlateSeenDto,
} from '@/api/v1/features/plate-races/dto.js';

interface CreatePlateRaceByUserIdParams {
  userId: string;
  data: CreatePlateRaceByUserIdDto;
}

interface CompletePlateRaceParams {
  data: CompletePlateRaceDto;
}

interface MarkPlateSeenParams {
  data: MarkPlateSeenDto;
}

interface UnmarkPlateSeenParams {
  data: UnmarkPlateSeenDto;
}

interface GetPlateRaceDataParams {
  data: GetPlateRaceDataDto;
}

interface GetCurrentPlateRaceDescriptionParams {
  data: GetCurrentPlateRaceDescriptionDto;
}

interface GetPastPlateRaceDescriptionsParams {
  data: GetPastPlateRaceDescriptionsDto;
}

export class PlateRaceService {
  private plateRaceRepository: PlateRaceRepository;
  constructor(plateRaceRepository: PlateRaceRepository) {
    this.plateRaceRepository = plateRaceRepository;
  }

  public getCurrentPlateRaceDescription = async ({
    data,
  }: GetCurrentPlateRaceDescriptionParams) => {
    const plateRaceDescription = await this.plateRaceRepository.getCurrentPlateRaceDescription({
      userId: data.userId,
    });
    return plateRaceDescription;
  };

  public getPastPlateRaceDescriptions = async ({ data }: GetPastPlateRaceDescriptionsParams) => {
    const plateRaceDescriptions = await this.plateRaceRepository.getPastPlateRaceDescriptions({
      limit: data.limit,
      userId: data.userId,
      cursor: data.cursor,
    });
    return plateRaceDescriptions;
  };

  public createPlateRaceByUserId = async ({ userId, data }: CreatePlateRaceByUserIdParams) => {
    const newPlateRace = await this.plateRaceRepository.createPlateRaceByUserId({ userId, data });
    return newPlateRace;
  };

  public getPlateRaceData = async ({ data }: GetPlateRaceDataParams) => {
    const plateRace = await this.plateRaceRepository.getPlateRaceByPlateRaceIdAndUserId({
      userId: data.userId,
      plateRaceId: data.plateRaceId,
    });
    const plateList = await this.plateRaceRepository.getPlateRaceData({
      plateRaceId: data.plateRaceId,
    });
    const count = plateList.reduce((accumulator, plate) => {
      if (plate.date_seen) {
        accumulator += 1;
      }
      return accumulator;
    }, 0);
    return {
      plateList,
      count,
      plateRace,
    };
  };

  public completePlateRace = async ({ data }: CompletePlateRaceParams) => {
    const completedPlateRace = await this.plateRaceRepository.completePlateRace({ data });
    return completedPlateRace;
  };

  public markPlateSeen = async ({ data }: MarkPlateSeenParams) => {
    const currentPlateRace = await this.plateRaceRepository.getCurrentPlateRaceByUserId({
      userId: data.userId,
    });
    if (!currentPlateRace || data.plateRaceId !== currentPlateRace.id) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        statusCode: 404,
        isOperational: true,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
      });
    }
    const markedPlate = await this.plateRaceRepository.markPlateSeen({ data });
    return markedPlate;
  };

  public unmarkPlateSeen = async ({ data }: UnmarkPlateSeenParams) => {
    const currentPlateRace = await this.plateRaceRepository.getCurrentPlateRaceByUserId({
      userId: data.userId,
    });
    if (!currentPlateRace || data.plateRaceId !== currentPlateRace.id) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        statusCode: 404,
        isOperational: true,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
      });
    }
    const unmarkedPlate = await this.plateRaceRepository.unmarkPlateSeen({ data });
    return unmarkedPlate;
  };
}
