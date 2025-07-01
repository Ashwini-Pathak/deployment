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
export class CoWorker {
  @Prop()
  userId: string;

  @Prop()
  availability: number;

  @Prop()
  expectation: number;

  @Prop({ type: Array })
  location: string[];

  @Prop()
  openToBroker: boolean;

  @Prop({ required: false })
  postId?: string;
}

export type CoWorkerDocument = CoWorker & Document;

export const CoWorkerSchema = SchemaFactory.createForClass(CoWorker);
