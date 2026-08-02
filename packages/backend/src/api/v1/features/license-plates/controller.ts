import type { LicensePlateService } from '@/api/v1/features/license-plates/service.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { type GetLicensePlatesResponse } from '@katieeitak/shared';
import type { Request, Response } from 'express';

export class LicensePlateController {
  private licensePlateService: LicensePlateService;
  constructor(licensePlateService: LicensePlateService) {
    this.licensePlateService = licensePlateService;
  }

  public getLicensePlates = async (_: Request, res: Response) => {
    const licensePlates = await this.licensePlateService.getLicensePlates();
    return res.status(200).json(
      ApiResponse.success<GetLicensePlatesResponse>({
        data: licensePlates,
      }),
    );
  };
}
