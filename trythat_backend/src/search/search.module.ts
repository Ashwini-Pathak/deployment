import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SearchService } from './search.service';
import { REngineApi } from '../helper/r-engine.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseEnv } from '../config/database-env.enum';
import { PointSchema, Points } from '../point/schemas/Point.schema';
import { ContactsRepository } from '../contacts/repository/contacts.repository';
import { Contacts, ContactsSchema } from '../contacts/schema/Contacts.schema';
import { ProspectsRepository } from '../prospects/repository/prospects.repository';
import { Prospects, ProspectsSchema } from '../prospects/schema/Prospects.schema';
import { CrmHelper } from '../helper/crm.helper';
import { PointModule } from '../point/point.module';

@Module({
  imports: [
    HttpModule,
    PointModule,
    MongooseModule.forFeature(
      [
        {
          name: Points.name,
          schema: PointSchema,
        },
        {
          name: Contacts.name,
          schema: ContactsSchema,
        },
        {
          name: Prospects.name,
          schema: ProspectsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [SearchService, REngineApi, ContactsRepository, ProspectsRepository, CrmHelper],
})
export class SearchModule {}
