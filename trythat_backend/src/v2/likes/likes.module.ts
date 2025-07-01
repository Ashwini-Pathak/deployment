import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './schemas/Like.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { LikesRepository } from './repository/likes.repository';
import { LikesController } from './likes.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Like.name,
          schema: LikeSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [LikesService, LikesRepository],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
