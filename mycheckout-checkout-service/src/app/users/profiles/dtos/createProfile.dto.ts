import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';

export class CreateProfileDto {
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  name: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  lastname: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  id_type: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @MaxLength(30, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_greater', args),
  })
  id_number: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) =>
        ApiError.parse('validations.invalid_email', args),
    },
  )
  readonly email: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  phone_code: string;

  @IsMobilePhone(null, null, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_phone', args),
  })
  phone_number: string;

  @IsBoolean({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  habeasData: boolean;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  ip: string;
}
