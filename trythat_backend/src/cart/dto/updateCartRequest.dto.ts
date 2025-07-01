import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsString()
  pointAmountMapping?: string;

  @IsOptional()
  @IsNumber()
  quantity: number;
}
