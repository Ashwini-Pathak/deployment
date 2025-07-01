import { Injectable, Logger } from '@nestjs/common';

// CUSTOM IMPORTS
import { CartRepository } from './repository/cart.repository';
import { UpdateCartDto } from './dto/updateCartRequest.dto';

@Injectable()
export class CartService {
  private readonly logger: Logger = new Logger(CartService.name);

  constructor(private readonly cartRepository: CartRepository) {}

  async createCart(userId: string) {
    try {
      const _cartDetails = {
        userId,
        cartItems: [],
      };
      return {
        data: await this.cartRepository.createCart(_cartDetails),
      };
    } catch (error) {
      this.logger.error(error, 'error occured while saving cart');
      return error;
    }
  }

  async updateCart(userId: string, cartDetails: UpdateCartDto[]) {
    try {
      const _cartDetails = {
        userId,
        cartItems: cartDetails,
      };
      return {
        data: await this.cartRepository.updateCart(userId, _cartDetails),
      };
    } catch (error) {
      this.logger.error(error, 'error occured while updating cart');
      return error;
    }
  }

  async getCart(userId: string) {
    return {
      data: await this.cartRepository.getCart(userId),
    }
  }
}
