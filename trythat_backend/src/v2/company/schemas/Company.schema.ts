import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class AddressDetails {
  @Prop()
  addressLine1?: string;

  @Prop()
  locality: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  pin: number;
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
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, unique: true })
  cin: string;

  @Prop({ required: false })
  companyLogo: string;

  @Prop({ type: Object, ref: 'AddressDetails' })
  address: AddressDetails;
}

export type CompanyDocument = Company & Document;

export const CompanySchema = SchemaFactory.createForClass(Company);
