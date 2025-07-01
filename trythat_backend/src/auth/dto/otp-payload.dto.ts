import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OtpPayloadDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone: string;
}
