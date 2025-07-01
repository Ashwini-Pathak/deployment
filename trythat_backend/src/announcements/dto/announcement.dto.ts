import { IsArray, IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AnnouncementDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  callToAction: string;

  @IsString()
  image: string;

  @IsBoolean()
  isGlobal: boolean;

  @IsString()
  expiry: string;

  @IsArray()
  users: Array<string>;
}
