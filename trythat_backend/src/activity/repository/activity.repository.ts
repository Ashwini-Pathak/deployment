import { Injectable, Logger } from '@nestjs/common';
import { Activity, ActivityDocument } from '../schema/Activity.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { asyncHandler } from '../../_app/utils/asyncHandler';
import { InternalServerErrorException } from '../../_app/exceptions';

@Injectable()
export class ActivityRepository {
  private readonly logger: Logger = new Logger(ActivityRepository.name);

  constructor(
    @InjectModel(Activity.name, DatabaseEnv.DB_USER_CONN) private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async getActivity(userId) {
    return await this.activityModel.find({ userId: userId }).sort({ createdAt: 'desc' }).limit(10);
  }

  async createActivity(userActivity) {
    const userActivityLog = new this.activityModel(userActivity);
    const [userActivityResp, userActivityErr] = await asyncHandler(userActivityLog.save());
    if (userActivityErr || !userActivityResp) {
      this.logger.error({ userActivityErr, userActivityResp }, 'Error occured while saving userActivity');
      throw new InternalServerErrorException();
    }

    this.logger.log({ userActivityLog }, 'Recieved response');
    return userActivityLog;
  }
}
