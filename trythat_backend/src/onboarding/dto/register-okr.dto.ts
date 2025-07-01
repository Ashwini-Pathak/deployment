import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterOkrDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;
}
