import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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

export class UpdateBuyerDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  purpose: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PropertyTypeDto)
  propertyType: PropertyTypeDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  location: string[];

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  requirements: string;

  @ValidateNested()
  @Type(() => BudgetRangeDto)
  budgetRange: BudgetRangeDto;

  @IsBoolean()
  @IsNotEmpty()
  openToBroker: boolean;
}
