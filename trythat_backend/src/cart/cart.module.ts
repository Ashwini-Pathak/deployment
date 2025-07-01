import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseEnv } from '../config/database-env.enum';
import { Cart, CartSchema } from './schemas/Cart.schema';
import { CartService } from './cart.service';
import { CartRepository } from './repository/cart.repository';
import { CartController } from './cart.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Cart.name,
          schema: CartSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [CartService, CartRepository],
  controllers: [CartController],
  exports: [CartService, CartRepository],
})
export class CartModule {}
