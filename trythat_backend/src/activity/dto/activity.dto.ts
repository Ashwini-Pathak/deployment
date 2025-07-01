import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ActivityDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  message: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  subType: string;
}
