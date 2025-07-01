import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;
}
