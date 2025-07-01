import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/enum/role.enum';

export class RegisterCrmDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  orgName: string;

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

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
