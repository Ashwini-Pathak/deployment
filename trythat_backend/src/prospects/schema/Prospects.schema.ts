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
export class Prospects {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  industry: string;

  @Prop({ unique: true })
  resourceId: string;

  @Prop()
  resourceType: string;

  @Prop()
  resourceSubType: string;

  @Prop()
  unlockedFields: [];
}

export type ProspectsDocument = Prospects & Document;
export const ProspectsSchema = SchemaFactory.createForClass(Prospects);
