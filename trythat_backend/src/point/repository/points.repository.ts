import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Points, PointsDocument } from '../schemas/Point.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '../../_app/exceptions';
import { asyncHandler } from '../../_app/utils/';

@Injectable()
export class PointsRepository {
  private readonly logger: Logger = new Logger(PointsRepository.name);
  constructor(
    @InjectModel(Points.name, DatabaseEnv.DB_USER_CONN) private readonly pointsModel: Model<PointsDocument>,
  ) {}

  async getPoints(userId) {
    this.logger.log({ userId }, 'Getting existing points for user');
    const userPoints = await this.pointsModel.findOne({ userId }).lean().exec();
    return userPoints;
  }

  async addPoints(userPointsDetails) {
    this.logger.log({ userPointsDetails }, 'creating user points ');

    const userPoints = new this.pointsModel(userPointsDetails);
    const [userPointsResp, userPointsErr] = await asyncHandler(userPoints.save());
    if (userPointsErr || !userPointsResp) {
      this.logger.error({ userPointsErr, userPointsResp }, 'Error occured while saving userPointsErr');
      throw new InternalServerErrorException();
    }

    this.logger.log({ userPointsResp }, 'Recieved response');
    return userPoints;
  }

  async updatePoints(userId, newUserPoints) {
    this.logger.log({ userId, newUserPoints }, 'Updating user points');
    const updatedUserPoints = await this.pointsModel.findOneAndUpdate({ userId }, newUserPoints, { new: true });
    return updatedUserPoints;
  }
}
