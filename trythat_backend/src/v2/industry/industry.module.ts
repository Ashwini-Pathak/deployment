import { Module } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { IndustryController } from './industry.controller';
import { IndustryRepository } from './repository/industry.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Industry, IndustrySchema } from './schemas/Industry.schema';
import { DatabaseEnv } from '../../config/database-env.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Industry.name,
          schema: IndustrySchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [IndustryController],
  providers: [IndustryService, IndustryRepository],
})
export class IndustryModule {}
