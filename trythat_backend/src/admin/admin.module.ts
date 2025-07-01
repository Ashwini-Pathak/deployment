import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AnnouncementsService } from '../announcements/announcements.service';
import { AnnouncementsRepository } from '../announcements/repository/announcement.repository';
import { Announcements, AnnouncementsSchema } from '../announcements/schemas/Announcements.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsRepository } from '../notifications/repository/notification.repository';
import { Notifications, NotificationsSchema } from '../notifications/schemas/Notifications.schema';
import { DatabaseEnv } from '../config/database-env.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Announcements.name,
          schema: AnnouncementsSchema,
        },
        {
          name: Notifications.name,
          schema: NotificationsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [
    AdminService,
    AnnouncementsService,
    AnnouncementsRepository,
    NotificationsService,
    NotificationsRepository,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
