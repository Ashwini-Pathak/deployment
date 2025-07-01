import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UserRegistrationDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;
}
