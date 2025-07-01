import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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

export class UpdateSellerDto {
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

  @IsBoolean()
  @IsNotEmpty()
  openToBroker: boolean;

  @IsOptional()
  @IsString()
  postId?: string;
}
