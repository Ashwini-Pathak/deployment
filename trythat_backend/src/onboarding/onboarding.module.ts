import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { DatabaseEnv } from '../config/database-env.enum';
import { OnboardingService } from './onboarding.service';
import { ContactUs, ContactUsSchema } from './schema/contactUs.schema';

import { Applications, ApplicationSchema } from './schema/applications.schema';
import { ContactUsRepository } from './repository/contactUs.repository';
import { ApplicationRepository } from './repository/application.repository';
import { OnboardingController } from './onboarding.controller';
import { CrmHelper } from '../helper/crm.helper';

import { OkrHelper } from '../helper/okr.helper';
import { FmsHelper } from '../helper/fms.helper';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
      [
        {
          name: ContactUs.name,
          schema: ContactUsSchema,
        },
        {
          name: Applications.name,
          schema: ApplicationSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, ContactUsRepository, ApplicationRepository, CrmHelper, OkrHelper, FmsHelper],
})
export class OnboardingModule {}
