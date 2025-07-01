import { IsBoolean, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../enum/role.enum';

export class SignUpInitDto {
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

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  industryType: string;

  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  acceptedTerms: boolean;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
