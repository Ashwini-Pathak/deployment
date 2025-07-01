import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { text } from 'stream/consumers';
@Schema({
  versionKey: false,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
})
export class Contacts {
  @Prop()
  resourceName: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  industry: string;

  @Prop()
  type: string;

  @Prop()
  registeredDate: Date;

  @Prop()
  flatNumber: string;

  @Prop()
  userId: string;

  @Prop()
  resourceType: string;

  @Prop()
  resourceSubType: string;

  @Prop()
  resourceId: string;

  @Prop()
  unlockedFields: [];
}

export type ContactsDocument = Contacts & Document;
export const ContactsSchema = SchemaFactory.createForClass(Contacts);
ContactsSchema.index({ name: 'text', industry: 'text', emial: 'text' });
