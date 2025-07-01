import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifications, NotificationsSchema } from './schemas/Notifications.schema';
import { DatabaseEnv } from '../config/database-env.enum';
import { NotificationsRepository } from './repository/notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Notifications.name,
          schema: NotificationsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [NotificationsService, NotificationsRepository],
})
export class NotificationsModule {}
