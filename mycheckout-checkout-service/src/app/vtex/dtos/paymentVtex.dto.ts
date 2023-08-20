import { ApiError } from '../../../shared/responses/api-error';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentVtexDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  paymentSystem: string;

  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Type(() => Number)
  referenceValue: number;

  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Type(() => Number)
  value: number;
}
