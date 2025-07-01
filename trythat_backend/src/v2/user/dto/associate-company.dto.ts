import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AssociateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  industryId: string;
}
