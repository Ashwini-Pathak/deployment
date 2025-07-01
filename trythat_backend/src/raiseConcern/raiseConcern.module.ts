import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseEnv } from '../config/database-env.enum';
import { RaiseConcernService } from './raiseConcern.service';
import { RaiseConcern, RaiseConcernSchema } from './schema/raiseConcern.schema';
import { RaiseConcernRepository } from './repository/raiseConcern.repository';
import { RaiseConcernController } from './raiseConcern.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: RaiseConcern.name,
          schema: RaiseConcernSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [RaiseConcernController],
  providers: [RaiseConcernService, RaiseConcernRepository],
})
export class RaiseConcernModule {}
