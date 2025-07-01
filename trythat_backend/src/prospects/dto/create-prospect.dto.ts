import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  Validate,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceSubType, ResourceType } from '../../search/enum/resource-type.enum';

@ValidatorConstraint({ name: 'isNotEmptyArray', async: false })
export class IsNotEmptyArrayConstraint implements ValidatorConstraintInterface {
  validate(array: any[]) {
    return array?.length > 0;
  }

  defaultMessage() {
    return 'payload should not be empty';
  }
}

class CreateProspect {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  industry: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  resourceId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(ResourceType)
  resourceType: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(ResourceSubType)
  resourceSubType: string;

  @IsDefined()
  @IsNotEmpty()
  unlockedFields: [];
}

export class CreateProspectDto {
  @IsArray()
  @Validate(IsNotEmptyArrayConstraint)
  @ValidateNested({ each: true })
  @Type(() => CreateProspect)
  payload: CreateProspect[];
}
