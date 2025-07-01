import { IsDefined, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RSearchDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  query: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  offset: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  tag: string;
}
