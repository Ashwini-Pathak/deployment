import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils/';
import { Follow, FollowDocument } from '../schemas/Follow.schema';
@Injectable()
export class FollowRepository {
  private readonly logger: Logger = new Logger(FollowRepository.name);
  constructor(@InjectModel(Follow.name, DatabaseEnv.DB_USER_CONN) private followModel: Model<FollowDocument>) {}
  async followUser(userId: string, userToFollow: string) {
    try {
      this.logger.log('user follow request');
      const [savedUserFollowResp, savedUserFollowError] = await asyncHandler(
        this.followModel.findOneAndUpdate(
          { userId },
          {
            $setOnInsert: { userId },
            $addToSet: { follows: userToFollow },
          },
          { new: true, upsert: true },
        ),
      );
      if (savedUserFollowError) {
        this.logger.error({ savedUserFollowError }, 'Error occured while saving user follow');
      }
      return savedUserFollowResp;
    } catch (error) {
      this.logger.error('error occured while saving user follow');
      throw new InternalServerErrorException('Error occured while saving user follow', error);
    }
  }

  async getUserFollows(userId: string) {
    const data = await this.followModel.findOne({ userId }, { follows: 1 });
    return data || { follows: [] };
  }

  async getFollowStats(ownerId) {
    const getFollowersQuery = { follows: { $in: [ownerId] } };
    const getFollowingQuery = { userId: ownerId };

    const followingResp = await this.followModel.findOne(getFollowingQuery);
    const followersResp = await this.followModel.find(getFollowersQuery);

    return {
      followers: followingResp?.follows?.length || 0,
      following: followersResp?.length || 0,
    };
  }

  async unfollowUser(userId: string, userToUnfollow: string) {
    return this.followModel.findOneAndUpdate(
      { userId },
      {
        $pull: { follows: userToUnfollow },
      },
      { new: true },
    );
  }
}
