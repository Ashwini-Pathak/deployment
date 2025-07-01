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
export class Points {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  points: number;

  @Prop({ default: '' })
  description: string;

  @Prop()
  expiryDate: string;

  @Prop()
  steps: Array<string>;
}

export type PointsDocument = Points & Document;
export const PointSchema = SchemaFactory.createForClass(Points);
