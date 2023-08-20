import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../shared/responses/api-error';

export class PaginationDto {
  /*page arg*/
  //validations
  @IsOptional()
  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Min(1, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_less', args),
  })
  @Type(() => Number)
  //field
  page?: number;

  /*limit arg*/
  //validations
  @IsOptional()
  @IsInt({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_integer', args),
  })
  @Max(100, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_greater', args),
  })
  @Min(1, {
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.field_less', args),
  })
  @Type(() => Number)
  //field
  limit?: number;
}
