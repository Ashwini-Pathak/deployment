import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PointSchema, Points } from './schemas/Point.schema';
import { DatabaseEnv } from '../config/database-env.enum';
import { RuleEngineService } from './rules/ruleEngine.strategy';
import { PointsRepository } from './repository/points.repository';
import { Activity, ActivitySchema } from '../activity/schema/Activity.schema';
import { Transaction, TransactionSchema } from '../transaction/schemas/Transaction.schema';
import { ActivityModule } from '../activity/activity.module';
import { TransactionModule } from '../transaction/transaction.module';
import { PointController } from './point.controller';
import { PointAmountRepository } from './repository/pointAmount.repository';
import { PointAmount, PointAmountSchema } from './schemas/PointAmount.schema';

@Module({
  imports: [
    ActivityModule,
    TransactionModule,
    MongooseModule.forFeature(
      [
        {
          name: Points.name,
          schema: PointSchema,
        },
        {
          name: PointAmount.name,
          schema: PointAmountSchema,
        },
        {
          name: Activity.name,
          schema: ActivitySchema,
        },
        {
          name: Transaction.name,
          schema: TransactionSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [PointService, RuleEngineService, PointsRepository, PointAmountRepository],
  exports: [PointService, PointsRepository, PointAmountRepository],
  controllers: [PointController]
})
export class PointModule {}
