import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './schemas/Post.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { PostsRepository } from './repository/post.repository';
import { UserV2Module } from '../user/user.module';
import { AwsService } from '../../helper/aws.helper';
import { PreferencesModule } from '../preferences/preferences.module';
import { FollowModule } from '../follow/follow.module';
import { LikesModule } from '../likes/likes.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Posts.name,
          schema: PostsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
    UserV2Module,
    PreferencesModule,
    FollowModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, AwsService],
  exports: [PostsService],
})
export class PostsModule {}
