import { ApiError } from '../../../shared/responses';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { CustomDataFieldsDto } from './customDataFields.dto';

export class CustomDataAppsDto {
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
        ApiError.parse('validations.invalid_number', args),
    },
  )
  major: number;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => CustomDataFieldsDto)
  fields: [CustomDataFieldsDto];
}
