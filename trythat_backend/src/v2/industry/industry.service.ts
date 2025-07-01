import { Injectable } from '@nestjs/common';
import { IndustryRepository } from './repository/industry.repository';

@Injectable()
export class IndustryService {
  constructor(private readonly industryRepository: IndustryRepository) {}

  async getAllIndustries() {
    return {
      data: await this.industryRepository.getAllIndustries(),
    };
  }

  async getIndustry(industryId: string) {
    return {
      data: await this.industryRepository.getIndustry(industryId),
    };
  }
}
