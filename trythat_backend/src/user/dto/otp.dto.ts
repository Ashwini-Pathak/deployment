import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OtpType } from '../../auth/enum/OtpType.enum';

export class OtpPayloadSendDto {
  @IsNotEmpty()
  @IsEnum(OtpType)
  type: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}

export class OtpPayloadVerifyDto {
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
