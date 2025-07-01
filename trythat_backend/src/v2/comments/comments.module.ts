import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './repository/comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/Comment.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Comment.name,
          schema: CommentSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],

  exports: [CommentsService],
})
export class CommentsModule {}
