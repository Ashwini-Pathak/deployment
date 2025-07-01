import { Controller, Post, Param, UseGuards, Patch, Body, Get } from '@nestjs/common';

import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { UpdateCartDto } from './dto/updateCartRequest.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart/user/:id')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/create')
  createCart(@Param('id') userId) {
    return this.cartService.createCart(userId);
  }

  @Patch('/update')
  updateCart(@Param('id') userId, @Body() body: UpdateCartDto[]) {
    return this.cartService.updateCart(userId, body);
  }

  @Get()
  getCart(@Param('id') userId) {
    return this.cartService.getCart(userId);
  }
}
