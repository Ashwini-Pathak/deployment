import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './repository/transaction.repository';
import { Transaction, TransactionSchema } from './schemas/Transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseEnv } from '../config/database-env.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Transaction.name,
          schema: TransactionSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
