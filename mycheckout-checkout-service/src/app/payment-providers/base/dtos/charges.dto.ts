import { ApiError } from '../../../../shared/responses';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { OrdersDto } from './orders.dto';

export class ChargesDto {
  /*cardToken arg*/
  //validations
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  //field
  ccToken: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  cvv?: string;

  /*order field*/
  @ValidateNested()
  @Type(() => OrdersDto)
  order: OrdersDto;
}
