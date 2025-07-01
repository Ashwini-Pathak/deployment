import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../config/database-env.enum';
import { asyncHandler } from '../../_app/utils/';
import { ConflictException, InternalServerErrorException } from '../../_app/exceptions';
import { Prospects, ProspectsDocument } from '../schema/Prospects.schema';
import { DB_ERROR } from '../../_app/enum/db-error.enum';

@Injectable()
export class ProspectsRepository {
  private readonly logger: Logger = new Logger(ProspectsRepository.name);

  constructor(
    @InjectModel(Prospects.name, DatabaseEnv.DB_USER_CONN) private prospectsModel: Model<ProspectsDocument>,
  ) {}

  async createProspect(prospect) {
    this.logger.log({ prospect }, 'createProspect request');

    const _prospect = new this.prospectsModel(prospect);
    const [saveProspectResp, saveProspectError] = await asyncHandler(_prospect.save());

    this.logger.log({ saveProspectResp });

    if (saveProspectError) {
      this.logger.error({ saveProspectError }, 'Error occured while saving prospect');

      if (DB_ERROR.DUPLICATE_ERROR_CODE === saveProspectError['code']) {
        const [conflictKey] = Object.keys(saveProspectError['keyValue']);
        throw new ConflictException(`${conflictKey} already exists`);
      }

      throw new InternalServerErrorException('Error occured while saving prospect', {
        saveProspectError,
      });
    }

    return _prospect;
  }

  async getProspects({ userId, limit = 10, skip = 0 }) {
    const totalCount = await this.prospectsModel.countDocuments({ userId });
    const documents = await this.prospectsModel.find({ userId }, null, { limit, skip });

    return { documents, totalCount };
  }

  async getProspectsForResources(userId, payload) {
    const documents = await this.prospectsModel.findOne({ userId, ...payload });

    return documents;
  }

  async removeProspect({ userId, resourceId }) {
    const document = await this.prospectsModel.findOneAndDelete({ userId, resourceId });

    return { document };
  }

  async getProspectsStats(userId) {
    const stats = await this.prospectsModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: '$resourceSubType',
          properties: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'property'] }, 1, 0] } },
          connects: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'connect'] }, 1, 0] } },
          organization: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'organization'] }, 1, 0] } },
        },
      },
      {
        $group: {
          _id: userId,
          organization: { $sum: '$organization' },
          properties: { $sum: '$properties' },
          connects: { $sum: '$connects' },
        },
      },
    ]);

    return stats?.[0];
  }

  async getProspectsWishlist(userId) {
    const wishlistQueryResult = await this.prospectsModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: '$resourceSubType',
          properties: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'property'] }, 1, 0] } },
          connects: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'connect'] }, 1, 0] } },
          organization: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'organization'] }, 1, 0] } },
          propertiesPoints: {
            $sum: {
              $cond: [{ $eq: ['$resourceSubType', 'property'] }, { $multiply: [{ $size: '$unlockedFields' }, 50] }, 0],
            },
          },
          connectsPoints: {
            $sum: {
              $cond: [{ $eq: ['$resourceSubType', 'connect'] }, { $multiply: [{ $size: '$unlockedFields' }, 50] }, 0],
            },
          },
          organizationPoints: {
            $sum: {
              $cond: [
                { $eq: ['$resourceSubType', 'organization'] },
                { $multiply: [{ $size: '$unlockedFields' }, 50] },
                0,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: userId,
          properties: { $sum: '$properties' },
          connects: { $sum: '$connects' },
          organization: { $sum: '$organization' },
          totalPoints: { $sum: { $add: ['$propertiesPoints', '$connectsPoints', '$organizationPoints'] } },
        },
      },
      {
        $project: {
          _id: 1,
          properties: 1,
          connects: 1,
          organization: 1,
          totalPoints: '$totalPoints',
        },
      },
    ]);

    return wishlistQueryResult?.[0];
  }
}
