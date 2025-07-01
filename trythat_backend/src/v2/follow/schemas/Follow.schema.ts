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
export class Follow {
  @Prop({ required: true, unique: true })
  userId: string;
  @Prop({ type: Array })
  follows: string[];
}
export type FollowDocument = Follow & Document;
export const FollowSchema = SchemaFactory.createForClass(Follow);
