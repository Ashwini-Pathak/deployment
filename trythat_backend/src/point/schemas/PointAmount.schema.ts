import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
})
export class PointAmount {
  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  amount: string;
}

export type PointAmountDocument = PointAmount & Document;
export const PointAmountSchema = SchemaFactory.createForClass(PointAmount);
