import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OtpType } from '../enum/OtpType.enum';

export class OtpPayloadSendDto {
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
}
