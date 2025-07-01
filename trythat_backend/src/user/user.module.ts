import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

import { DatabaseEnv } from '../config/database-env.enum';
import { User, UserSchema } from '../user/schemas/User.schema';
import { UsersRepository } from './repository/users.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { AnnouncementsService } from '../announcements/announcements.service';
import { AnnouncementsRepository } from '../announcements/repository/announcement.repository';
import { Announcements, AnnouncementsSchema } from '../announcements/schemas/Announcements.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsRepository } from '../notifications/repository/notification.repository';
import { Notifications, NotificationsSchema } from '../notifications/schemas/Notifications.schema';
import { RuleEngineService } from '../point/rules/ruleEngine.strategy';
import { PointSchema, Points } from '../point/schemas/Point.schema';
import { AwsService } from '../helper/aws.helper';
import { MailModule } from '../mail/mail.module';
import { TwilioHelper } from '../helper/twilio.helper';
import { CrmHelper } from '../helper/crm.helper';
import { PointModule } from '../point/point.module';
import { ActivityModule } from '../activity/activity.module';
import { SmsModule } from '../sms/sms.module';
import { OtpHelper } from '../helper/otp-helper';

@Module({
  imports: [
    AuthModule,
    HttpModule,
    MailModule,
    PointModule,
    ActivityModule,
    SmsModule,
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
        },
        {
          name: Points.name,
          schema: PointSchema,
        },
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
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UsersRepository,
    RuleEngineService,
    AnnouncementsService,
    AnnouncementsRepository,
    NotificationsService,
    NotificationsRepository,
    AwsService,
    TwilioHelper,
    CrmHelper,
    OtpHelper,
  ],
})
export class UserModule {}
