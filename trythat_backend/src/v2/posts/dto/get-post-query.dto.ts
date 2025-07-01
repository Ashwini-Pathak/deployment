import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PostRel } from '../enum/post-rel.enum';

export class OwnerDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  public ownerId: string;
}

export class GetPostQueryDTO extends OwnerDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(PostRel)
  public type: string;
}
