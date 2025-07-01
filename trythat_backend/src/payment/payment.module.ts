import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './repository/payment.repository';
import { Payment, PaymentSchema } from './schemas/Payment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseEnv } from '../config/database-env.enum';
import { AwsService } from '../helper/aws.helper';
import { PaymentController } from './payment.controller';
import { PaymentHelper } from '../helper/payment.helper';
import { PointModule } from '../point/point.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Payment.name,
          schema: PaymentSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
    PointModule,
  ],
  providers: [PaymentService, AwsService, PaymentRepository, PaymentHelper],
  controllers: [PaymentController],
  exports: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
