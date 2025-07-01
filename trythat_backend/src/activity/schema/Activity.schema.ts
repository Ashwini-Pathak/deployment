import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
})
export class Activity {
  @Prop()
  userId: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  type: string;

  @Prop()
  subType: string;
}

export type ActivityDocument = Activity & Document;
export const ActivitySchema = SchemaFactory.createForClass(Activity);
