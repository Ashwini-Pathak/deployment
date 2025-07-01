import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProfileDetailsType } from '../enum/profileDetailsType.enum';
import { Type } from 'class-transformer';

export class GeoLocation {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  location: string;
}

export class ProfessionalDetails {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  companyEmailId: string;

  @IsOptional()
  @IsString()
  designation: string;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  @IsString()
  industry: string;

  @IsOptional()
  @IsString()
  lastCompanyIndustry: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true }) // Ensure each element in the array is a string
  keySkills: Array<string>;
}

export class PersonalDetails {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  personalEmail: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  aadharNumber: string;

  @IsOptional()
  @IsString()
  panNumber: string;
}

export class CoWorking {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  availability: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  expectation: string;

  @IsDefined()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  location: Array<string>;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  openToBrokers: boolean;
}

export class BudgetRangeDto {
  @IsNumber()
  @IsNotEmpty()
  min: number;
  @IsNumber()
  @IsNotEmpty()
  max: number;
}

export class PropertyTypeDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  text: string;
}

export class Buyer {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  purpose: Array<string>;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PropertyTypeDto)
  propertyType: PropertyTypeDto[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  location: Array<string>;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  requirements: string;

  @ValidateNested()
  @Type(() => BudgetRangeDto)
  budgetRange: BudgetRangeDto;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  openToBrokers: boolean;
}

export class Broker {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  purpose: Array<string>;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PropertyTypeDto)
  propertyType: PropertyTypeDto[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  location: Array<string>;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  openToBrokers: boolean;
}

export class Seller {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  purpose: Array<string>;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PropertyTypeDto)
  propertyType: PropertyTypeDto;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  location: Array<string>;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  openToBrokers: boolean;
}

export class UserOfferings {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Buyer)
  buyer?: Buyer;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Seller)
  seller?: Seller;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Broker)
  broker?: Broker;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CoWorking)
  coworking?: CoWorking;
}
export class Preferences {
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userSells: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userTargetAudience: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userWouldBuy: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true }) // Ensure each element in the array is a string
  dreamClients: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  interest: Array<string>;
}

export class CurrentPlanDetails {
  @IsOptional()
  @IsString()
  name: string;
}

export class ProfileDetailsDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GeoLocation)
  geoLocation?: GeoLocation;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfessionalDetails)
  professionalDetails?: ProfessionalDetails;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonalDetails)
  personalDetails?: PersonalDetails;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserOfferings)
  offerings?: UserOfferings;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Preferences)
  preferences?: Preferences;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CurrentPlanDetails)
  currentPlanDetails?: CurrentPlanDetails;
}
export class ProfileDetailsQueryDto {
  @IsEnum(ProfileDetailsType)
  @IsNotEmpty()
  type: ProfileDetailsType;
}

export class UserImagePayload {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  imagePayload: string;
}
