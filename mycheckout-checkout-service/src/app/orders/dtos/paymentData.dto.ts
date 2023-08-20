import { ApiError } from '../../../shared/responses';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidationArguments,
} from 'class-validator';

export class PaymentDataDto {
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  token?: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  franchise?: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  number?: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  gateway: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  paymentMethod: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  cardId?: string;

  @IsOptional()
  additionalData?: any;

  @IsOptional()
  cardContent?: any;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  payment_method_id?: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  issuer_id?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  cvv?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  bin?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  holderName?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  paymentSystem?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  holderDocument?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  expirationDate?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  cardNumber?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  aliasCC?: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  aliasCVV?: string;
}
