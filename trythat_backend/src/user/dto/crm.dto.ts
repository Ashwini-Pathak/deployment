import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CrmDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  phone;
}
