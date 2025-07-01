import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { LeadgenController } from './leadgen.controller';
import { LeadgenService } from './leadgen.service';
import { ProspectsService } from '../prospects/prospects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Prospects, ProspectsSchema } from '../prospects/schema/Prospects.schema';
import { DatabaseEnv } from '../config/database-env.enum';
import { ProspectsRepository } from '../prospects/repository/prospects.repository';
import { Contacts, ContactsSchema } from '../contacts/schema/Contacts.schema';
import { ContactsService } from '../contacts/contacts.service';
import { ContactsRepository } from '../contacts/repository/contacts.repository';
import { SearchService } from '../search/search.service';
import { REngineApi } from '../helper/r-engine.helper';
import { PointSchema, Points } from '../point/schemas/Point.schema';
import { CrmHelper } from '../helper/crm.helper';
import { PointModule } from '../point/point.module';
import { ActivityModule } from '../activity/activity.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    HttpModule,
    PointModule,
    ActivityModule,
    TransactionModule,
    MongooseModule.forFeature(
      [
        {
          name: Prospects.name,
          schema: ProspectsSchema,
        },
        {
          name: Contacts.name,
          schema: ContactsSchema,
        },
        {
          name: Points.name,
          schema: PointSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [LeadgenController],
  providers: [
    LeadgenService,
    ProspectsService,
    ProspectsRepository,
    ContactsService,
    ContactsRepository,
    SearchService,
    REngineApi,
    CrmHelper,
  ],
})
export class LeadgenModule {}
