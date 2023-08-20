import { ApiError } from '../../../../shared/responses';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidationArguments,
} from 'class-validator';

export class StylesDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  styles: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  buttonText: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsBoolean({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  restore: boolean;
}
