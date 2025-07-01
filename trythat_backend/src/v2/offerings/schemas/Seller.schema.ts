import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
export class Seller {
  @Prop()
  userId: string;

  @Prop({ type: Array })
  purpose: string[];

  @Prop({ type: Array, ref: 'PropertyType' })
  propertyType: PropertyType[];

  @Prop({ type: Array })
  location: string[];

  @Prop()
  openToBroker: boolean;

  @Prop({ required: false })
  postId?: string;
}

export type SellerDocument = Seller & Document;

export const SellerSchema = SchemaFactory.createForClass(Seller);
