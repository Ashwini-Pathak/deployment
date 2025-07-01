import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from '../schemas/User.schema';
import { UserError } from '../../auth/enum/UserError.enum';
import { DatabaseEnv } from '../../config/database-env.enum';
import { InternalServerErrorException } from '../../_app/exceptions';
import { asyncHandler, getQueryFromPayload } from '../../_app/utils/';

@Injectable()
export class UsersRepository {
  private readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(User.name, DatabaseEnv.DB_USER_CONN) private userModel: Model<UserDocument>) {}

  async findUser(user) {
    try {
      const { email = '', phone = '' } = user;

      const query = getQueryFromPayload({ email, phone });
      this.logger.log({ query, user }, 'finding existing user');
      const data = await this.userModel.findOne(query);

      return data;
    } catch (error) {
      this.logger.error('error occured while finding user');

      throw new InternalServerErrorException('Error occured while fetching existing user', error);
    }
  }

  async createUser(user) {
    try {
      this.logger.log('create user request');

      const _user = new this.userModel(user);
      const [savedUserResp, savedUserError] = await asyncHandler(_user.save());

      if (savedUserError) {
        this.logger.error({ savedUserError }, 'Error occured while saving user');

        if (UserError.DUPLICATE_ERROR_CODE === savedUserError['code']) {
          const [conflictKey] = Object.keys(savedUserError['keyValue']);
          throw new ConflictException(`${conflictKey} already exists`);
        }
      }

      if (!savedUserResp) {
        this.logger.error({ savedUserResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedUserResp;
    } catch (error) {
      this.logger.error('error occured while creating user');

      throw new InternalServerErrorException('Error occured while creating user', error);
    }
  }

  async getUserDetails(userId) {
    return this.userModel.findById(userId, { oauthData: 0 });
  }

  async findUserAndUpdate(userId, type, details) {
    this.logger.log({ userId, type, details }, 'creating record for');

    const _userId = new Types.ObjectId(userId);

    const existingUser = await this.userModel.findById(_userId);

    Object.assign(existingUser, { [type]: details });

    const data = existingUser.save();

    return data;
  }
}
