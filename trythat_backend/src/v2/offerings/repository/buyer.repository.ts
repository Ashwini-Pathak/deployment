import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils/';
import { Buyer, BuyerDocument } from '../schemas/Buyer.schema';

@Injectable()
export class BuyerRepository {
  private readonly logger: Logger = new Logger(BuyerRepository.name);

  constructor(@InjectModel(Buyer.name, DatabaseEnv.DB_USER_CONN) private buyerModel: Model<BuyerDocument>) {}

  async createBuyer(userId, buyerDetails) {
    try {
      this.logger.log('create buyer request');

      const _buyerDetails = new this.buyerModel({ userId, ...buyerDetails });
      const [savedBuyerResp, savedBuyerError] = await asyncHandler(_buyerDetails.save());

      if (savedBuyerError) {
        this.logger.error({ savedBuyerError }, 'Error occured while saving buyer');
      }

      if (!savedBuyerResp) {
        this.logger.error({ savedBuyerResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedBuyerResp;
    } catch (error) {
      this.logger.error('error occured while creating buyer');

      throw new InternalServerErrorException('Error occured while creating buyer', error);
    }
  }

  getBuyerDetails(userId: string) {
    return this.buyerModel.find({ userId });
  }

  getTotalBuyers(userId: string) {
    return this.buyerModel.countDocuments({ userId });
  }

  async updateBuyer(buyerId: string, dataToUpdate) {
    const [updateBuyerResp, updateBuyerError] = await asyncHandler(
      this.buyerModel.findOneAndUpdate({ _id: buyerId }, dataToUpdate, {
        new: true,
      }),
    );

    if (updateBuyerError || !updateBuyerResp) {
      this.logger.error({ updateBuyerError, updateBuyerResp }, 'Error occured while updateBuyerResp request');

      throw new InternalServerErrorException('Error occured while updating buyer', {
        updateBuyerError,
        updateBuyerResp,
      });
    }

    return updateBuyerResp;
  }
}
