import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SeedHistory extends Document {
  @Prop({ type: String, required: true, unique: true })
  fileName: string;

  @Prop({ type: Date, default: Date.now })
  executedAt: Date;
}

export type SeedHistoryDocument = SeedHistory & Document;

export const SeedHistorySchema = SchemaFactory.createForClass(SeedHistory);
