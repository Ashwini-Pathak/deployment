import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
})
export class Transaction {
  @Prop()
  userId: string;

  @Prop()
  itemUnlocked: string;

  @Prop()
  pointUtilised: number;

  @Prop({ default: Date.now() })
  purchaseDate: Date;

  @Prop()
  category: string;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
