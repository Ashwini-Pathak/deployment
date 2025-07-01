import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { Comment, CommentDocument } from '../schemas/Comment.schema';
import { asyncHandler } from '../../../_app/utils';
import { InternalServerErrorException } from '../../../_app/exceptions';

@Injectable()
export class CommentsRepository {
  private readonly logger: Logger = new Logger(CommentsRepository.name);

  constructor(@InjectModel(Comment.name, DatabaseEnv.DB_USER_CONN) private commentsModel: Model<CommentDocument>) {}

  async createComments(userId: string, postId: string, text: string) {
    try {
      this.logger.log('create comments request');

      const _commentsDetails = new this.commentsModel({ userId, postId, text });
      const [savedCommentsResp, savedCommentsError] = await asyncHandler(_commentsDetails.save());

      if (savedCommentsError) {
        this.logger.error({ savedCommentsError }, 'Error occured while saving comments');
      }

      if (!savedCommentsResp) {
        this.logger.error({ savedCommentsResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedCommentsResp;
    } catch (error) {
      this.logger.error('error occured while creating comments');

      throw new InternalServerErrorException('Error occured while creating comments', error);
    }
  }

  updateComments(commentId: string, dataToUpdate) {
    return this.commentsModel.findByIdAndUpdate({ _id: new Types.ObjectId(commentId) }, dataToUpdate, { new: true });
  }
}
