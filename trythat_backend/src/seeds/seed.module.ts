import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Industry, IndustrySchema } from '../v2/industry/schemas/Industry.schema';
import { PreferenceList, PreferenceListSchema } from '../v2/preferences/schema/Preference-list.schema';
import { SeedHistory, SeedHistorySchema } from './schemas/SeedHistory.schema';
import { SeedService } from './seed.service';
import { DatabaseEnv } from '../config/database-env.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Industry.name,
          schema: IndustrySchema,
        },
        {
          name: PreferenceList.name,
          schema: PreferenceListSchema,
        },
        {
          name: SeedHistory.name,
          schema: SeedHistorySchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
