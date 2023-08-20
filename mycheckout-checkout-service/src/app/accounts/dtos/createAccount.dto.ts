import { ApiError } from '../../../shared/responses/api-error';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { VisualizationDto } from './visualizationDto.dto';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  account: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  paymentMethodId?: string;

  @IsOptional()
  @IsBoolean({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  cvcRequired?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => VisualizationDto)
  visualization: VisualizationDto[];

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  buttonMessage?: string;

  additionalData?: any;
}
