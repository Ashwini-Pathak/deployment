import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Company, CompanyDocument } from '../schemas/Company.schema';
import { UserError } from '../../../auth/enum/UserError.enum';
import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils';

@Injectable()
export class CompanyRepository {
  private readonly logger: Logger = new Logger(CompanyRepository.name);

  constructor(@InjectModel(Company.name, DatabaseEnv.DB_USER_CONN) private companyModel: Model<CompanyDocument>) {}

  async createCompany(companyDetails) {
    try {
      this.logger.log('create company request');

      const _companyDetails = new this.companyModel(companyDetails);
      const [savedCompanyResp, savedCompanyError] = await asyncHandler(_companyDetails.save());

      if (savedCompanyError) {
        this.logger.error({ savedCompanyError }, 'Error occured while saving company');

        if (UserError.DUPLICATE_ERROR_CODE === savedCompanyError['code']) {
          const [conflictKey] = Object.keys(savedCompanyError['keyValue']);
          throw new ConflictException(`${conflictKey} already exists`);
        }
      }

      if (!savedCompanyResp) {
        this.logger.error({ savedCompanyResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedCompanyResp;
    } catch (error) {
      this.logger.error('error occured while creating company');

      throw new InternalServerErrorException('Error occured while creating company', error);
    }
  }

  getCompanyList() {
    return this.companyModel.find({});
  }

  async getCompanyDetails(companyId: string) {
    const query: any = [
      {
        $match: {
          _id: new Types.ObjectId(companyId),
        },
      },
      {
        $lookup: {
          from: 'industries',
          as: 'industryDetails',
          let: {
            searchId: {
              $toObjectId: '$type',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$searchId'],
                },
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$industryDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const data: any = await this.companyModel.aggregate(query);

    return data[0] || {};
  }
}
