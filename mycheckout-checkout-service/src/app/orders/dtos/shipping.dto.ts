import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../shared/responses';
import { ExternalAddressDto } from './externalAddress.dto';
import { LogisticInfoDto } from './logisticInfo.dto';

export class ShippingDto {
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  addressId?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => ExternalAddressDto)
  externalAddress?: ExternalAddressDto;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => LogisticInfoDto)
  logisticsInfo: LogisticInfoDto[];
}
