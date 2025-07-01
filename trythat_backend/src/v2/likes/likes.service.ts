import { Injectable } from '@nestjs/common';
import { LikesRepository } from './repository/likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  createLikes(userId: string, postId: string) {
    return this.likesRepository.createLikes(userId, postId);
  }

  async unLike(userId, postId) {
    const data = await this.likesRepository.unLike(userId, postId);

    return {
      message: 'unlike request processed',
      data,
    };
  }
}
