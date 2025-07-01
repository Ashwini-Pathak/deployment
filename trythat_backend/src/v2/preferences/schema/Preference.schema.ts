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
export class Preference {
  @Prop()
  userSells: Array<string>;

  @Prop()
  userTargetAudience: Array<string>;

  @Prop()
  userWouldBuy: Array<string>;

  @Prop()
  dreamClients: Array<string>;

  @Prop()
  interest: Array<string>;

  @Prop({ required: true })
  userId: string;
}

export type PreferenceDocument = Preference & Document;

export const PreferenceSchema = SchemaFactory.createForClass(Preference);
