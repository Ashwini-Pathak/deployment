import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { Request } from 'express';
import { ThrottlerModule } from '@nestjs/throttler';

// CUSTOM IMPORTS
import { getCorrelationId } from './_app/server/get-correlation-id';
import { RequestsLogMiddleware } from './middleware/requests-log-middleware';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { validate } from './config/env.validation';
import { DatabaseEnv } from './config/database-env.enum';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { SmsModule } from './sms/sms.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AdminModule } from './admin/admin.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PointModule } from './point/point.module';
import { ActivityModule } from './activity/activity.module';
import { LeadgenModule } from './leadgen/leadgen.module';
import { SearchModule } from './search/search.module';
import { ContactsModule } from './contacts/contacts.module';
import { ProspectsModule } from './prospects/prospects.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentModule } from './payment/payment.module';
import { RaiseConcernModule } from './raiseConcern/raiseConcern.module';
import { CompanyModule } from './v2/company/company.module';
import { UserV2Module } from './v2/user/user.module';
import { OfferingsModule } from './v2/offerings/offerings.module';
import { PreferencesModule } from './v2/preferences/preferences.module';
import { IndustryModule } from './v2/industry/industry.module';
import { PostsModule } from './v2/posts/posts.module';
import { FollowModule } from './v2/follow/follow.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { SeedModule } from './seeds/seed.module';
import { CartModule } from './cart/cart.module';
import { CommentsModule } from './v2/comments/comments.module';
import { LikesModule } from './v2/likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: ['.env.development.local', '.env.development', '.env.uat', '.env'],
    }),
    AuthModule,
    UserModule,
    PointModule,
    ActivityModule,
    // Logger config
    LoggerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            transport: {
              target: 'pino-pretty',
              options: {
                // singleLine: true,
                singleLine: configService.get<string>('environment') !== 'development' ? true : false,
              },
            },
            autoLogging: false,
            base: null,
            serializers: {
              req: () => ({}),
            },
            quietReqLogger: true,
            genReqId: (request: Request) => getCorrelationId(request),
            level: configService.get<string>('logLevel'),
          },
        };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: DatabaseEnv.DB_USER_CONN,
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.host'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({ isGlobal: true }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    MailModule,
    SmsModule,
    AnnouncementsModule,
    AdminModule,
    NotificationsModule,
    LeadgenModule,
    SearchModule,
    ContactsModule,
    ProspectsModule,
    TransactionModule,
    PaymentModule,
    RaiseConcernModule,
    CompanyModule,
    UserV2Module,
    OfferingsModule,
    PreferencesModule,
    IndustryModule,
    PostsModule,
    FollowModule,
    OnboardingModule,
    SeedModule,
    CartModule,
    CommentsModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLogMiddleware).forRoutes('*');
  }
}
