import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
