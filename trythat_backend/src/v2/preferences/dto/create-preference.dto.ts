import { IsArray, ArrayUnique, IsString } from 'class-validator';

export class CreatePreferenceDto {
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userSells: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userTargetAudience: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  userWouldBuy: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  dreamClients: Array<string>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  interest: Array<string>;
}
