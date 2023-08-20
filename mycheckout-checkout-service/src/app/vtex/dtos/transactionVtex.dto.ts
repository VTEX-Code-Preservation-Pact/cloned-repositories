import { ApiError } from '../../../shared/responses/api-error';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentVtexDto } from './paymentVtex.dto';

export class TransactionVtexDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  transactionId: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  merchantName: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => PaymentVtexDto)
  payments: PaymentVtexDto[];
}
