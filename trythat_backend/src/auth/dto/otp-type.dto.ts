import { IsDefined, IsEnum } from 'class-validator';
import { OtpType } from '../enum/OtpType.enum';

export class OtpTypeDto {
  @IsDefined()
  @IsEnum(OtpType)
  type: OtpType;
}
