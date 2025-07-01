import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './repository/company.repository';
import { UserV2Service } from '../user/user.service';
import { IndustryService } from '../industry/industry.service';
import { UserCompanyRole } from '../../helper/common.helper';
@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userV2Service: UserV2Service,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto, userId: string) {
    const _companyDetails = await this.companyRepository.createCompany(createCompanyDto);

    await this.userV2Service.updateUser({ userId, companyId: _companyDetails.id, type: UserCompanyRole.ADMIN });

    return {
      data: _companyDetails,
    };
  }

  async getCompanyList() {
    return {
      data: await this.companyRepository.getCompanyList(),
    };
  }

  async getCompanyDetails(companyId: string) {
    return {
      data: await this.companyRepository.getCompanyDetails(companyId),
    };
  }
}
