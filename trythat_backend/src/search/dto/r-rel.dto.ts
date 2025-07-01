import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ConnectRelType, OrgRelType, PropRelType } from '../enum/re-rel-type.enum';

export class ConnectQueryDto {
  @IsEnum(ConnectRelType)
  @IsOptional()
  rel: string;
}

export class PropQueryDto {
  @IsEnum(PropRelType)
  @IsOptional()
  rel: string;

  @IsOptional()
  @IsString()
  offset: string;

  @IsOptional()
  @IsString()
  limit: string;
}

export class OrgQueryDto {
  @IsEnum(OrgRelType)
  @IsOptional()
  rel: string;
}
