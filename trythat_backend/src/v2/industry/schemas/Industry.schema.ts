import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
export class Industry {
  @Prop({ required: true })
  name: string;
}

export type IndustryDocument = Industry & Document;

export const IndustrySchema = SchemaFactory.createForClass(Industry);
