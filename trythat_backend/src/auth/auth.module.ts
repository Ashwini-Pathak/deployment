import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

// custom imports
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schemas/User.schema';
import { UsersRepository } from '../user/repository/users.repository';
import { DatabaseEnv } from '../config/database-env.enum';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { LinkedinStrategy } from './strategy/linkedin.strategy';
import { AnnouncementsRepository } from '../announcements/repository/announcement.repository';
import { AnnouncementsService } from '../announcements/announcements.service';
import { Announcements, AnnouncementsSchema } from '../announcements/schemas/Announcements.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsRepository } from '../notifications/repository/notification.repository';
import { Notifications, NotificationsSchema } from '../notifications/schemas/Notifications.schema';
import { PointSchema, Points } from '../point/schemas/Point.schema';
import { RuleEngineService } from '../point/rules/ruleEngine.strategy';
import { PointService } from '../point/point.service';
import { PointsRepository } from '../point/repository/points.repository';
import { ActivityService } from '../activity/activity.service';
import { ActivityRepository } from '../activity/repository/activity.repository';
import { Activity, ActivitySchema } from '../activity/schema/Activity.schema';
import { ChatService } from '../helper/chat.helper';
import { AwsService } from '../helper/aws.helper';
import { TwilioHelper } from '../helper/twilio.helper';
import { OtpHelper } from '../helper/otp-helper';
import { CrmHelper } from '../helper/crm.helper';
import { PointModule } from '../point/point.module';
import { ActivityModule } from '../activity/activity.module';
import { TransactionModule } from '../transaction/transaction.module';
import { OkrHelper } from '../helper/okr.helper';
import { FmsHelper } from '../helper/fms.helper';
import { SmsModule } from '../sms/sms.module';
import { JuspayWebhookStrategy } from './strategy/juspayWebhook.strategy';

@Module({
  imports: [
    MailModule,
    HttpModule,
    PointModule,
    ActivityModule,
    TransactionModule,
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
        {
          name: Activity.name,
          schema: ActivitySchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecretKey'),
          signOptions: {
            expiresIn: configService.get('jwtExpiry'),
          },
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    JwtStrategy,
    LinkedinStrategy,
    RuleEngineService,
    AnnouncementsRepository,
    AnnouncementsService,
    NotificationsService,
    NotificationsRepository,
    ChatService,
    AwsService,
    TwilioHelper,
    OtpHelper,
    CrmHelper,
    OkrHelper,
    FmsHelper,
    JuspayWebhookStrategy,
  ],
  exports: [JwtStrategy, PassportModule, AuthService, JuspayWebhookStrategy],
})
export class AuthModule {}
