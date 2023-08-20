import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  MaxLength,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';

export class UpdateProfileDto {
  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  name?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  lastname?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  id_type?: string;

  @IsOptional()
  @MaxLength(30, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_greater', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  id_number?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) =>
        ApiError.parse('validations.invalid_email', args),
    },
  )
  email?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  phone_code?: string;

  @IsOptional()
  @IsMobilePhone(null, null, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_phone', args),
  })
  phone_number?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  selectedAddress: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  selectedPayment: string;

  @IsBoolean({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  habeasData: boolean;
}
