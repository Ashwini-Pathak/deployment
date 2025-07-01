import { ArrayUnique, IsArray, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PointsTransactionType } from '../enum/points.enum';

export class PointsDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  expiryDate?: string;

  @IsNotEmpty()
  @IsEnum(PointsTransactionType)
  type: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  steps?: Array<string>;
}
