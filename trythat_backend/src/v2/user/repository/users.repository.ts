import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException, NotFoundException } from '../../../_app/exceptions';
import { UserV2, UserV2Document } from '../schemas/User.schema';
import { User, UserDocument } from '../../../user/schemas/User.schema';
import { UpdateUserDetailsDto } from '../dto/update-user-details.dto';

@Injectable()
export class UserV2Repository {
  private readonly logger: Logger = new Logger(UserV2Repository.name);

  constructor(
    @InjectModel(UserV2.name, DatabaseEnv.DB_USER_CONN) private userV2Model: Model<UserV2Document>,
    @InjectModel(User.name, DatabaseEnv.DB_USER_CONN) private userModel: Model<UserDocument>,
  ) {}

  async getUserDetails(userId) {
    return await this.userV2Model.findById(userId);
  }

  async updateUser(updateUserDto: UpdateUserDetailsDto) {
    try {
      const { userId } = updateUserDto;

      const userObjectId = new Types.ObjectId(userId);
      let _userV2Details = await this.userV2Model.findById(userObjectId);

      if (!_userV2Details) {
        const _userDetails = await this.userModel.findById(userObjectId);

        if (!_userDetails) {
          throw new NotFoundException('User not found');
        }

        _userV2Details = new this.userV2Model({
          ..._userDetails.toObject(),
          ...updateUserDto,
        });

        await _userV2Details.save();
      }

      Object.assign(_userV2Details, { companyDetails: updateUserDto });

      return await _userV2Details.save();
    } catch (error) {
      this.logger.error(error, 'error occured while updating user');

      throw new InternalServerErrorException('Error occured while updating user', error);
    }
  }
}
