import { ApiError } from '../../../shared/responses';
import { IsOptional, IsString, ValidationArguments } from 'class-validator';

export class MarketingDataDto {
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  coupon?: string;
}
