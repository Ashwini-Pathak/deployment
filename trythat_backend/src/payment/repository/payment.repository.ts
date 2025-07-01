import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payment, PaymentDocument } from '../schemas/Payment.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { asyncHandler } from '../../_app/utils';
import { PaymentError } from '../enum/paymentError.enum';
import { ConflictException, InternalServerErrorException } from '../../_app/exceptions';

@Injectable()
export class PaymentRepository {
  private readonly logger: Logger = new Logger(PaymentRepository.name);

  constructor(@InjectModel(Payment.name, DatabaseEnv.DB_USER_CONN) private paymentModel: Model<PaymentDocument>) {}

  async savePayment(paymentDetails) {
    try {
      this.logger.log('save payment request');

      const _payment = new this.paymentModel(paymentDetails);
      const [savedPaymentResp, savedPaymentError] = await asyncHandler(_payment.save());

      if (savedPaymentError) {
        this.logger.error({ savedPaymentError }, 'Error occured while saving payment details');

        if (PaymentError.DUPLICATE_ERROR_CODE === savedPaymentError['code']) {
          const [conflictKey] = Object.keys(savedPaymentError['keyValue']);
          throw new ConflictException(`${conflictKey} already exists`);
        }
      }

      if (!savedPaymentResp) {
        this.logger.error({ savedPaymentResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedPaymentResp;
    } catch (error) {
      this.logger.error('error occured while saving payment details');

      throw new InternalServerErrorException('Error occured while saving payment details', error);
    }
  }

  async updatePayment(orderId, dataToUpdate) {
    try {
      this.logger.log('updating payment status');

      const [updatePaymentResp, updatePaymentError] = await asyncHandler(
        this.paymentModel.findOneAndUpdate({ orderId }, dataToUpdate, { new: true }),
      );

      if (updatePaymentError || !updatePaymentResp) {
        this.logger.error({ updatePaymentError, updatePaymentResp }, 'Error occured while updatePaymentResp request');

        throw new InternalServerErrorException('Error occured while updating payment', {
          updatePaymentError,
          updatePaymentResp,
        });
      }

      return updatePaymentResp;
    } catch (error) {
      this.logger.error('error occured while updating payment status');

      throw new InternalServerErrorException('Error occured while updating payment status', error);
    }
  }

  async getOrderDetails(filterCriteria) {
    try {
      this.logger.log('fetching order details');

      const [orderResp, orderError] = await asyncHandler(this.paymentModel.findOne(filterCriteria));

      if (orderError || !orderResp) {
        this.logger.error({ orderError, orderResp }, 'Error occured while fetching order details');

        throw new InternalServerErrorException('Error occured while fetching order details', {
          orderError,
          orderResp,
        });
      }

      return orderResp;
    } catch (error) {
      this.logger.error('error occured while fetching order details');

      throw new InternalServerErrorException('Error occured while fetching order details', error);
    }
  }

  async getTransactionDetails(userId: string, offset: number, limit: number) {
    return await this.paymentModel.find({ userId }).skip(offset).limit(limit);
  }

  async getTotalTransactions(userId: string) {
    return await this.paymentModel.countDocuments({ userId });
  }
}
