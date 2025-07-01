import { Injectable, Logger } from '@nestjs/common';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  private readonly logger: Logger = new Logger(TransactionService.name);
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async getTransactions(userId, transactionQuery) {
    const { limit = 10, offset = 0 } = transactionQuery;
    const userTransaction = await this.transactionRepo.getTransactions(userId, limit, offset);
    return {
      message: 'retrived user transaction',
      data: userTransaction,
    };
  }

  async createTransaction(userId, payload) {
    const transactionPayload = { userId, ...payload };
    return await this.transactionRepo.createTransaction(transactionPayload);
  }
}
