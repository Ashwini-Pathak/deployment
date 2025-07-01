import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GeoCodeDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  longitude: string;
}
