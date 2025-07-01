import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserCompanyRole } from '../../../helper/common.helper';

export class UpdateUserDetailsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  companyId: string;

  @IsOptional()
  @IsString()
  industryId?: string;

  @IsEnum(UserCompanyRole)
  type?: UserCompanyRole;
}
