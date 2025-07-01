import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from '../enum/orderStatus.enum';
import { RefundStatus } from '../enum/refundStatus.enum';

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
export class Payment {
  @Prop({ required: true, unique: true })
  orderId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.NEW })
  status: string;

  @Prop({ required: false, type: () => [String], default: [] })
  transactionIds: string[];

  @Prop({ required: false, default: RefundStatus.NA })
  refundStatus: string;

  @Prop({ required: false, default: false })
  isTimeout: Boolean;

  @Prop({ required: false })
  refundUniqueRequestId: string;
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment);
