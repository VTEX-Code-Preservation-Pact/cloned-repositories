import { ApiError } from '../../../../shared/responses/api-error';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  ValidationArguments,
} from 'class-validator';

enum Types {
  store,
  own,
}
export class updatePaymentMethodDto {
  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  paymentMethodId?: string;

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
  paymentMethodName: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsBoolean({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  isActive: boolean;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsEnum(Types, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_enum', args),
  })
  type: keyof typeof Types;
}
