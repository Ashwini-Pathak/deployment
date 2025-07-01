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
export class PreferenceList {
  @Prop()
  name: string;

  @Prop()
  type: string;
}

export type PreferenceListDocument = PreferenceList & Document;

export const PreferenceListSchema = SchemaFactory.createForClass(PreferenceList);
