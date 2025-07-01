import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommercialType, ContactType, ContactsSubTypeDto, ResidentialType } from '../enum/contacts.quertType.enum';

export class CommercialQueryDto {
  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;

  @IsNotEmpty()
  @IsEnum(CommercialType)
  type?: CommercialType;
}

export class ResidentialQueryDto {
  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;

  @IsNotEmpty()
  @IsEnum(ResidentialType)
  type: ResidentialType;
}

export class StatsQueryDto {
  @IsNotEmpty()
  @IsEnum(ContactType)
  type: ContactType;
}

export class ContactsSearchDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  searchQuery: string;

  @IsNotEmpty()
  @IsEnum(ContactType)
  resourceType: ContactType;

  @IsNotEmpty()
  @IsEnum(ContactsSubTypeDto)
  resourceSubType: ContactsSubTypeDto;

  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;
}

export class TransactionQueryParam {
  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;
}
