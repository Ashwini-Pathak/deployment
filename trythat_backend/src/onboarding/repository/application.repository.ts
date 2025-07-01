import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '../../_app/exceptions';
import { asyncHandler } from '../../_app/utils';
import { DatabaseEnv } from '../../config/database-env.enum';
import { ApplicationDocument, Applications } from '../schema/applications.schema';

@Injectable()
export class ApplicationRepository {
  private readonly logger: Logger = new Logger(ApplicationRepository.name);

  constructor(
    @InjectModel(Applications.name, DatabaseEnv.DB_USER_CONN)
    private readonly applicationsModel: Model<ApplicationDocument>,
  ) {}

  async registerApplication(applicationDetails, userId: string) {
    try {
      const [applicationDetailsResp, applicationDetailsError] = await asyncHandler(
        this.applicationsModel.findOneAndUpdate({ userId }, applicationDetails, { upsert: true, new: true }),
      );

      if (applicationDetailsError || !applicationDetailsResp) {
        this.logger.error(
          { applicationDetailsError, applicationDetailsResp },
          'Error occured while updating cart request',
        );

        throw new InternalServerErrorException('Error occured while updating cart', {
          applicationDetailsError,
          applicationDetailsResp,
        });
      }

      return applicationDetailsResp;
    } catch (error) {
      this.logger.log('Error occured while adding applications details');
      throw new InternalServerErrorException('Error occured while adding applications details');
    }
  }
}
