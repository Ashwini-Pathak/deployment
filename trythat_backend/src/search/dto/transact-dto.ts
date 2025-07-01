import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ResourceSubType, ResourceType } from '../enum/resource-type.enum';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isNotEmptyArray', async: false })
export class IsNotEmptyArrayConstraint implements ValidatorConstraintInterface {
  validate(array: any[]) {
    return array?.length > 0;
  }

  defaultMessage() {
    return 'payload should not be empty';
  }
}

class InitTransact {
  @IsEnum(ResourceType)
  @IsDefined()
  @IsNotEmpty()
  resourceType: string;

  @IsEnum(ResourceSubType)
  @IsDefined()
  @IsNotEmpty()
  resourceSubType: string;

  @IsDefined()
  @IsNotEmpty()
  resourceId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  unlockedFields: [];

  @IsOptional()
  @IsObject()
  crmPayload;
}

export class InitTransactDto {
  @IsArray()
  @Validate(IsNotEmptyArrayConstraint)
  @ValidateNested({ each: true })
  @Type(() => InitTransact)
  payload: InitTransact[];

  @IsOptional()
  @IsObject()
  crmDetails;
}
