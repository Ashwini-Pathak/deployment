import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  locality: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  pin: number;
}

export class CreateCompanyDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  cin: string;

  @IsString()
  @IsOptional()
  website?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
