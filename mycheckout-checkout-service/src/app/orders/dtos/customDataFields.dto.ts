import { ApiError } from '../../../shared/responses';
import { IsString, ValidationArguments } from 'class-validator';

export class CustomDataFieldsDto {
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  key: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  value: string;
}
