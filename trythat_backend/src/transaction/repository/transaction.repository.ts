import { Injectable, Logger } from '@nestjs/common';
import { Transaction, TransactionDocument } from '../schemas/Transaction.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { asyncHandler } from '../../_app/utils';
import { InternalServerErrorException } from '../../_app/exceptions';

@Injectable()
export class TransactionRepository {
  private readonly logger: Logger = new Logger(TransactionRepository.name);
  constructor(
    @InjectModel(Transaction.name, DatabaseEnv.DB_USER_CONN)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactions(userId, limit, offset) {
    this.logger.log({ userId }, 'Getting transactions for user');
    const [userTransactions, totalCount] = await Promise.all([
      this.transactionModel.find({ userId: userId }).sort({ createdAt: 'desc' }).skip(offset).limit(limit).exec(),
      this.transactionModel.countDocuments({ userId: userId }),
    ]);
    return { transactions: userTransactions, totalCount };
  }

  async createTransaction(transactionData) {
    const userTransaction = new this.transactionModel(transactionData);
    const [userTransactionResp, userTransactionErr] = await asyncHandler(userTransaction.save());
    if (userTransactionErr || !userTransactionResp) {
      this.logger.error({ userTransactionErr, userTransactionResp }, 'Error occured while saving userActivity');
      throw new InternalServerErrorException();
    }

    this.logger.log({ userTransaction }, 'Recieved response');
    return userTransaction;
  }
}
