import { ApiError } from '../../../shared/responses';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { DeliveryWindowDto } from './deliveryWindow.dto';

export class LogisticInfoDto {
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
  itemIndex: number;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  selectedSla: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  selectedDeliveryChannel: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DeliveryWindowDto)
  deliveryWindow?: DeliveryWindowDto;
}
