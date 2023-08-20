import { ApiError } from '../../../shared/responses';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { StorePreferencesDto } from './storePreferences.dto';

export class AccountDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  accountName: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  hostname: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => StorePreferencesDto)
  storePreferences: StorePreferencesDto;
}
