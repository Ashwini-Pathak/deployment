import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class CartItems {
  @Prop()
  pointAmountMappingId?: string;

  @Prop({ default: 1 })
  quantity?: number;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  versionKey: false,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
})
export class Cart {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: Array, ref: 'CartItems' })
  cartItems: CartItems[];
}

export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart);
