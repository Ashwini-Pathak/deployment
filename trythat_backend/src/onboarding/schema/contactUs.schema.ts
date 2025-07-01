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
export class ContactUs {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
export type ContactUsDocument = ContactUs & Document;
