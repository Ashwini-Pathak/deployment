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
export class Applications {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Object })
  crmDetails: Record<string, any>;

  @Prop({ type: Object })
  okrDetails: Record<string, any>;

  @Prop({ type: Object })
  fmsDetails: Record<string, any>;
}

export const ApplicationSchema = SchemaFactory.createForClass(Applications);
export type ApplicationDocument = Applications & Document;
