import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ProfessionalDetailsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  industry: string;
}
