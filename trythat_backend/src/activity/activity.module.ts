import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './repository/activity.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schema/Activity.schema';
import { DatabaseEnv } from '../config/database-env.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Activity.name,
          schema: ActivitySchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
