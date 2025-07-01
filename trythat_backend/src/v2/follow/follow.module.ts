import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { FollowRepository } from './repository/follow.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './schemas/Follow.schema';
import { DatabaseEnv } from '../../config/database-env.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Follow.name,
          schema: FollowSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository],
  exports: [FollowService],
})
export class FollowModule {}
