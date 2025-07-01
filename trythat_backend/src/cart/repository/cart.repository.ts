import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../config/database-env.enum';
import { asyncHandler } from '../../_app/utils/';
import { ConflictException, InternalServerErrorException } from '../../_app/exceptions';
import { Cart, CartDocument } from '../schemas/Cart.schema';
import { CartError } from '../enum/cart.enum';

@Injectable()
export class CartRepository {
  private readonly logger: Logger = new Logger(CartRepository.name);

  constructor(@InjectModel(Cart.name, DatabaseEnv.DB_USER_CONN) private cartModel: Model<CartDocument>) {}

  async createCart(cartDetails) {
    this.logger.log({ cartDetails }, 'create cart request');

    const _cart = new this.cartModel(cartDetails);
    const [saveCartResp, saveCartError] = await asyncHandler(_cart.save());

    this.logger.log({ saveCartResp });

    if (saveCartError) {
      this.logger.error({ saveCartError }, 'Error occured while creating cart');

      if (CartError.DUPLICATE_ERROR_CODE === saveCartError['code']) {
        const [conflictKey] = Object.keys(saveCartError['keyValue']);
        throw new ConflictException(`${conflictKey} already exists`);
      }

      throw new InternalServerErrorException('Error occured while creating cart', {
        saveCartError,
      });
    }

    return _cart;
  }

  async updateCart(userId, cartDetails) {
    this.logger.log({ userId, cartDetails }, 'updateCart request');

    const [updateCartResp, updateCartError] = await asyncHandler(
      this.cartModel.findOneAndUpdate({ userId }, cartDetails, { upsert: true, new: true }),
    );

    if (updateCartError || !updateCartResp) {
      this.logger.error({ updateCartError, updateCartResp }, 'Error occured while updating cart request');

      throw new InternalServerErrorException('Error occured while updating cart', {
        updateCartError,
        updateCartResp,
      });
    }

    return updateCartResp;
  }

  async getCart(userId: string) {
    this.logger.log({ userId }, 'get cart request');

    return await this.cartModel.findOne({ userId });
  }
}
