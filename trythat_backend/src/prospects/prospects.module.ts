import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Prospects, ProspectsSchema } from './schema/Prospects.schema';
import { DatabaseEnv } from '../config/database-env.enum';
import { ProspectsService } from './prospects.service';
import { ProspectsRepository } from './repository/prospects.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Prospects.name,
          schema: ProspectsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [ProspectsService, ProspectsRepository],
})
export class ProspectsModule {}
