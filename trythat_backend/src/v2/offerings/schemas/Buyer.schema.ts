import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class BudgetRange {
  @Prop()
  min: number;

  @Prop()
  max: number;
}

@Schema({ _id: false })
export class PropertyType {
  @Prop()
  type: string;

  @Prop()
  text: string;
}

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
export class Buyer {
  @Prop()
  userId: string;

  @Prop({ type: Array })
  purpose: string[];

  @Prop({ type: Array, ref: 'PropertyType' })
  propertyType: PropertyType[];

  @Prop({ type: Array })
  location: string[];

  @Prop()
  requirements: string;

  @Prop()
  budgetRange: BudgetRange;

  @Prop()
  openToBroker: boolean;
}

export type BuyerDocument = Buyer & Document;

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
