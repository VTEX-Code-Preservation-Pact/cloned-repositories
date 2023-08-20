import { ApiError } from '../../../shared/responses/api-error';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';
import { PaymentDataDto } from './paymentData.dto';
import { ProfileDto } from './profile.dto';
import { AccountDto } from './account.dto';
import { ShippingDto } from './shipping.dto';
import { OfferingDto } from './Offering.dto';
import { CustomDataDto } from './customData.dto';
import { MarketingDataDto } from './marketingData.dto';

export class CreateOrderDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => ShippingDto)
  shipping: ShippingDto;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => AccountDto)
  account: AccountDto;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ItemDto)
  gifts?: ItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferingDto)
  offerings?: OfferingDto[];

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => PaymentDataDto)
  payment: PaymentDataDto;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  channel: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  oms: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CustomDataDto)
  customData?: CustomDataDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MarketingDataDto)
  marketingData?: MarketingDataDto;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  authToken?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  ip: string;
}
