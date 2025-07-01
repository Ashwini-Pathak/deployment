import { IsEnum, IsNotEmpty } from 'class-validator';
import { PreferenceTypes } from '../enum/preference-types.enum';

export class PreferenceTypeDto {
  @IsEnum(PreferenceTypes)
  @IsNotEmpty()
  type: PreferenceTypes;
}
