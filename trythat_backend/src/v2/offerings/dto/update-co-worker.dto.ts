import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCoWorkerDto {
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  availability: number;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  expectation: number;

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
