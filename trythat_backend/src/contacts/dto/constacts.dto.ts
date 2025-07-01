import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactsDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  email: string;

  @IsOptional()
  industry: string;

  @IsOptional()
  type: string;

  @IsOptional()
  registeredDate: Date;

  @IsOptional()
  flatNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  resourceType: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  resourceSubType: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  resourceId: string;
}
