import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils/';
import { Seller, SellerDocument } from '../schemas/Seller.schema';

@Injectable()
export class SellerRepository {
  private readonly logger: Logger = new Logger(SellerRepository.name);

  constructor(@InjectModel(Seller.name, DatabaseEnv.DB_USER_CONN) private sellerModel: Model<SellerDocument>) {}

  async createSeller(userId, sellerDetails) {
    try {
      this.logger.log('create seller request');

      const _sellerDetails = new this.sellerModel({ userId, ...sellerDetails });
      const [savedSellerResp, savedSellerError] = await asyncHandler(_sellerDetails.save());

      if (savedSellerError) {
        this.logger.error({ savedSellerError }, 'Error occured while saving seller');
      }

      if (!savedSellerResp) {
        this.logger.error({ savedSellerResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedSellerResp;
    } catch (error) {
      this.logger.error('error occured while creating seller');

      throw new InternalServerErrorException('Error occured while creating seller', error);
    }
  }

  getSellerDetails(userId: string) {
    return this.sellerModel.find({ userId });
  }

  getTotalSellers(userId: string) {
    return this.sellerModel.countDocuments({ userId });
  }

  async updateSeller(sellerId: string, dataToUpdate) {
    const [updateSellerResp, updateSellerError] = await asyncHandler(
      this.sellerModel.findOneAndUpdate({ _id: sellerId }, dataToUpdate, {
        new: true,
      }),
    );

    if (updateSellerError || !updateSellerResp) {
      this.logger.error({ updateSellerError, updateSellerResp }, 'Error occured while updateSellerResp request');

      throw new InternalServerErrorException('Error occured while updating seller', {
        updateSellerError,
        updateSellerResp,
      });
    }

    return updateSellerResp;
  }
}
