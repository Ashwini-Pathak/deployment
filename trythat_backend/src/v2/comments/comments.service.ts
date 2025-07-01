import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  createComments(userId: string, postId: string, text: string) {
    return this.commentsRepository.createComments(userId, postId, text);
  }

  async updateComments(commentId, body) {
    return {
      message: 'comment updated',
      data: await this.commentsRepository.updateComments(commentId, body),
    };
  }
}
