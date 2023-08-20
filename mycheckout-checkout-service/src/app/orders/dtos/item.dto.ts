import { ApiError } from '../../../shared/responses';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationArguments,
} from 'class-validator';

export class ItemDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  id: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsNumber(
    {},
    {
      message: (args: ValidationArguments) =>
        ApiError.parse('validations.invalid_string', args),
    },
  )
  quantity: number;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  seller: string;
}
