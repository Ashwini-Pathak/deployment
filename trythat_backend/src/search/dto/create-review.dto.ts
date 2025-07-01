import { IsString, IsDefined, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ResourceType } from '../enum/ResourceType.enum';

export class CreateReviewDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  resourceId: string;

  @IsNotEmpty()
  @IsEnum(ResourceType)
  @IsDefined()
  resourceType: string;
}
