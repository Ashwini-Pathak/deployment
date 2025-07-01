import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoWorkerDto {
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
}
