import type { LicensePlateRepository } from '@/api/v1/features/license-plates/repository.js';

export class LicensePlateService {
  private licensePlateRepository: LicensePlateRepository;
  constructor(licensePlateRepository: LicensePlateRepository) {
    this.licensePlateRepository = licensePlateRepository;
  }

  public getLicensePlates = async () => {
    const licensePlates = await this.licensePlateRepository.getLicensePlates();
    return licensePlates;
  };
}
