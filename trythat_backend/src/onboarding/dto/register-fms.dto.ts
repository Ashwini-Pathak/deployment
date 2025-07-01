import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterFmsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
