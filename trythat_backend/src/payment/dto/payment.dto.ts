import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InitiatePaymentDto {
  @IsNotEmpty()
  @IsString()
  pointAmountMappingId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class HandleResponseDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;
}
