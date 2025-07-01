import { Injectable } from '@nestjs/common';
import { UserV2Repository } from './repository/users.repository';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UserCompanyRole } from '../../helper/common.helper';
import { NotFoundException } from '../../_app/exceptions';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class UserV2Service {
  constructor(
    private readonly userV2Repository: UserV2Repository,
    private readonly followService: FollowService,
) {}

  async getUserDetails(userId: string) {
    const userProfile = await this.userV2Repository.getUserDetails(userId);

    if (!userProfile) {
      throw new NotFoundException('User Not found');
    }

    return {
      message: 'retrived user profile',
      data: userProfile,
    };
  }

  async updateUser(updateUserDetails: UpdateUserDetailsDto) {
    const { userId, companyId } = updateUserDetails;
    const _updateUserDetails = { type: UserCompanyRole.USER, ...updateUserDetails };
    const data = await this.userV2Repository.updateUser(_updateUserDetails);

    await this.followService.followUser(userId, companyId);

    return {
      message: 'updated user',
      data,
    };
  }
}
