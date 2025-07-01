import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '../../_app/exceptions';
import { FollowRepository } from './repository/follow.repository';
import { OwnerDto } from '../posts/dto/get-post-query.dto';

@Injectable()
export class FollowService {
  private readonly logger: Logger = new Logger(FollowService.name);

  constructor(private readonly followRepository: FollowRepository) {}

  async followUser(userId: string, userToFollow: string) {
    try {
      if (userId === userToFollow) {
        this.logger.error("User can't follow himself");
        throw new BadRequestException("User can't follow himself");
      }

      await this.followRepository.followUser(userId, userToFollow);
      return {
        message: 'User followed successfully',
      };
    } catch (error) {
      this.logger.error(error, 'User follow failed');

      throw new BadRequestException('User follow failed');
    }
  }

  async getUserFollows(userId: string) {
    return this.followRepository.getUserFollows(userId);
  }

  async getFollowStats({ ownerId }: OwnerDto) {
    const data = await this.followRepository.getFollowStats(ownerId);

    return {
      message: 'retrieved follower stats',
      data,
    };
  }

  async unfollowUser(userId: string, userToUnfollow: string) {
    return {
      data: await this.followRepository.unfollowUser(userId, userToUnfollow),
    };
  }
}
