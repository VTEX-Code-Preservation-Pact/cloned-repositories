import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';
import { Type } from 'class-transformer';

export class ValidateCreditDto {
  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Type(() => Number)
  totals: number;

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
  email: string;
}
