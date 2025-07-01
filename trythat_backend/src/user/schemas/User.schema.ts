import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { UserV2 } from '../../v2/user/schemas/User.schema';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ _id: false })
export class VerificationStatus {
  @Prop({ default: false })
  phone: boolean;

  @Prop({ default: false })
  email: boolean;

  @Prop({ default: false })
  personalEmail: boolean;
}

@Schema({ _id: false })
export class GeoLocation {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  location: string;
}

@Schema({ _id: false })
export class ProfessionalDetails {
  @Prop()
  companyName: string;

  @Prop()
  companyEmailId: string;

  @Prop()
  designation: string;

  @Prop()
  experience: number;

  @Prop()
  industry: string;

  @Prop()
  lastCompanyIndustry: string;

  @Prop()
  keySkills: Array<string>;
}

@Schema({ _id: false })
export class PersonalDetails {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop({ required: true, unique: true })
  personalEmail: string;

  @Prop()
  imageUrl: string;

  @Prop()
  aadharNumber: string;

  @Prop()
  panNumber: string;
}

@Schema({ _id: false })
export class CoWorking {
  @Prop()
  availability: string;

  @Prop()
  expectation: string;

  @Prop()
  location: Array<string>;

  @Prop()
  openToBrokers: boolean;
}

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

@Schema({ _id: false })
export class Buyer {
  @Prop()
  purpose: Array<string>;

  @Prop()
  propertyType: Array<PropertyType>;

  @Prop()
  location: Array<string>;

  @Prop()
  requirements: string;

  @Prop()
  budgetRange: BudgetRange;

  @Prop()
  openToBrokers: boolean;
}

@Schema({ _id: false })
export class Broker {
  @Prop()
  purpose: Array<string>;

  @Prop()
  propertyType: Array<PropertyType>;

  @Prop()
  location: Array<string>;

  @Prop()
  openToBroker: boolean;
}

@Schema({ _id: false })
export class Seller {
  @Prop()
  purpose: Array<string>;

  @Prop()
  propertyType: Array<PropertyType>;

  @Prop()
  location: Array<string>;

  @Prop()
  openToBroker: boolean;
}
@Schema({ _id: false })
export class UserOfferings {
  @Prop({ type: 'Buyer' })
  buyer?: Buyer;

  @Prop({ type: 'Seller' })
  seller?: Seller;

  @Prop({ type: 'Broker' })
  broker?: Broker;

  @Prop({ type: 'CoWorking' })
  coworking?: CoWorking;
}

@Schema({ _id: false })
export class Preferences {
  @Prop()
  userSells: Array<string>;

  @Prop()
  userTargetAudience: Array<string>;

  @Prop()
  userWouldBuy: Array<string>;

  @Prop()
  dreamClients: Array<string>;

  @Prop()
  interest: Array<string>;
}

@Schema({ _id: false })
export class CurrentPlanDetails {
  @Prop()
  name: string;
}

@Schema({ _id: false })
export class CrmDetails {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

@Schema({ _id: false })
export class OkrDetails {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;
}

@Schema({ _id: false })
export class FmsDetails {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;
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
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ required: true })
  acceptedTerms: boolean;

  @Prop({ required: true })
  industryType: string;

  @Prop({ type: Object, ref: 'PersonalDetails' })
  personalDetails: PersonalDetails;

  @Prop({ type: Object, ref: 'VerificationStatus' })
  verificationStatus: VerificationStatus;

  @Prop({ type: Object, ref: 'ProfessionalDetails' })
  professionalDetails: ProfessionalDetails;

  @Prop({ type: Object, ref: 'GeoLocation' })
  geoLocation: GeoLocation;

  @Prop({ type: Object, ref: 'UserOfferings' })
  offerings: UserOfferings;

  @Prop({ type: Object, ref: 'Preferences' })
  preferences: Preferences;

  @Prop({ type: Object, ref: 'CurrentPlanDetails' })
  currentPlanDetails: CurrentPlanDetails;

  @Prop({ type: Array })
  oauthData: [];

  @Prop({ type: Object, ref: 'CrmDetails' })
  crmDetails: object;

  @Prop({ type: Object, ref: 'OkrDetails' })
  okrDetails: object;

  @Prop({ type: Object, ref: 'FmsDetails' })
  fmsDetails: object;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

// TODO: Remove the below code when new users collection is started to be used

// Middleware to copy document to UserV2 collection on save
UserSchema.post('save', async function (doc: User & { _id: Types.ObjectId }) {
  const UserV2Model = this.model(UserV2.name) as Model<UserV2>;

  let userV2 = await UserV2Model.findById(doc._id).exec();

  if (!userV2) {
    userV2 = new UserV2Model({
      ...doc.toObject(),
      _id: doc._id,
    });
    await userV2.save();
  } else {
    Object.assign(userV2, doc.toObject());
    await userV2.save();
  }
});
