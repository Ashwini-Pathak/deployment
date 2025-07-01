import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PostType } from '../enum/post-type.enum';

export class CTADto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  link?: string;
}

export class CreatePostDto {
  @IsEnum(PostType)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CTADto)
  CTA?: CTADto;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  ownerType: string;
}
