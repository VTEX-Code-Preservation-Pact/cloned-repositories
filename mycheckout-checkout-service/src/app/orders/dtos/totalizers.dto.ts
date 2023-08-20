import { ApiError } from '../../../shared/responses';
import { Type } from 'class-transformer';
import { IsInt, ValidationArguments } from 'class-validator';

export class TotalizersDto {
  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Type(() => Number)
  totals: number;

  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Type(() => Number)
  shippingTotal: number;

  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Type(() => Number)
  subTotal: number;
}
