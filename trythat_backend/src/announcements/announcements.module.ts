import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsRepository } from './repository/announcement.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcements, AnnouncementsSchema } from '../announcements/schemas/Announcements.schema';
import { DatabaseEnv } from '../config/database-env.enum';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Announcements.name,
          schema: AnnouncementsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [],
  providers: [AnnouncementsService, AnnouncementsRepository],
})
export class AnnouncementsModule {}
