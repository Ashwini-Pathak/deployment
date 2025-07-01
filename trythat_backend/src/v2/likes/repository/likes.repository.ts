import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { Like, LikeDocument } from '../schemas/Like.schema';
import { asyncHandler } from '../../../_app/utils';
import { InternalServerErrorException, NotFoundException } from '../../../_app/exceptions';

@Injectable()
export class LikesRepository {
  private readonly logger: Logger = new Logger(LikesRepository.name);

  constructor(@InjectModel(Like.name, DatabaseEnv.DB_USER_CONN) private likesModel: Model<LikeDocument>) {}

  async unLike(userId: string, postId: string) {
    try {
      const document = await this.likesModel.findOneAndDelete({ userId, postId });
      if (!document) {
        this.logger.debug('No document processed');

        throw new NotFoundException('document not found');
      }

      return document;
    } catch (error) {
      this.logger.error(error, 'error occured while unliking post');

      throw new InternalServerErrorException('Error occured while unliking post', error);
    }
  }

  async createLikes(userId: string, postId: string) {
    try {
      this.logger.log('create likes request');

      const [updateOrCreateResp, updateOrCreateError] = await asyncHandler(
        this.likesModel.findOneAndUpdate(
          { userId, postId },
          { userId, postId },
          {
            new: true,
            upsert: true, // Make this update into an upsert
          },
        ),
      );

      if (updateOrCreateError) {
        this.logger.error({ updateOrCreateError }, 'Error occured while saving likes');
      }

      if (!updateOrCreateResp) {
        this.logger.error({ updateOrCreateResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return updateOrCreateResp;
    } catch (error) {
      this.logger.error('error occured while creating likes');

      throw new InternalServerErrorException('Error occured while creating likes', error);
    }
  }

  updateLikes(likesId: string, dataToUpdate) {
    return this.likesModel.findOneAndUpdate({ _id: new Types.ObjectId(likesId) }, dataToUpdate, { new: true });
  }
}
