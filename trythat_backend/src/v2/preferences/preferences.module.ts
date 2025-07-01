import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Preference, PreferenceSchema } from './schema/Preference.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { PreferenceRepository } from './repository/preference.repository';
import { PreferenceList, PreferenceListSchema } from './schema/Preference-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Preference.name,
          schema: PreferenceSchema,
        },
        {
          name: PreferenceList.name,
          schema: PreferenceListSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService, PreferenceRepository],
  exports: [PreferencesService],
})
export class PreferencesModule {}
