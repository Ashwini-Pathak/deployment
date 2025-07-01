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
export class Announcements {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  callToAction: string;

  @Prop()
  image: string;

  @Prop({ default: true })
  isGlobal: boolean;

  @Prop()
  expiry: string;

  @Prop()
  users: Array<string>;
}

export type AnnouncementsDocument = Announcements & Document;
export const AnnouncementsSchema = SchemaFactory.createForClass(Announcements);
