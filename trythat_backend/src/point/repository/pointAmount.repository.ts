import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PointAmount, PointAmountDocument } from '../schemas/PointAmount.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { Model } from 'mongoose';

@Injectable()
export class PointAmountRepository {
  constructor(
    @InjectModel(PointAmount.name, DatabaseEnv.DB_USER_CONN) private readonly pointAmountModel: Model<PointAmountDocument>,
  ) {}

  async getPointAmountMapping() {
    return await this.pointAmountModel.find();
  }

  async getPointAmountMappingById(pointAmountMappingId) {
    return await this.pointAmountModel.findOne({ _id: pointAmountMappingId });
  }
}
