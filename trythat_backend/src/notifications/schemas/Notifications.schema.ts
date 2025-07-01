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
export class Notifications {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  callToAction: string;

  @Prop()
  status: boolean;

  @Prop()
  userId: string;
}

export type NotificationsDocument = Notifications & Document;
export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
