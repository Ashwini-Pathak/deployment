import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SignInInitDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  data: string;
}
