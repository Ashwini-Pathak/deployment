import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OtpType } from '../enum/OtpType.enum';

export class OtpPayloadVerifyDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(OtpType)
  type: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  otp: string;
}
