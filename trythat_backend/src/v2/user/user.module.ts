import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserV2, UserV2Schema } from '../user/schemas/User.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { UserV2Service } from '../user/user.service';
import { UserV2Repository } from '../user/repository/users.repository';
import { User } from '../../user/schemas/User.schema';
import { UserV2Controller } from './user.controller';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    FollowModule,
    MongooseModule.forFeature(
      [
        {
          name: UserV2.name,
          schema: UserV2Schema,
        },
        {
          name: User.name,
          schema: UserV2Schema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [UserV2Controller],
  providers: [UserV2Service, UserV2Repository],
  exports: [UserV2Service],
})
export class UserV2Module {}
