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
export class RaiseConcern {
  @Prop({ required: true})
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  userId: string;
}

export const RaiseConcernSchema = SchemaFactory.createForClass(RaiseConcern);
export type RaiseConcernDocument = RaiseConcern & Document;
