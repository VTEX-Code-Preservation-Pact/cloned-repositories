import { ApiError } from '../../../shared/responses';
import {
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { GeoCoordinateDto } from 'src/app/users/addresses/dtos/geoCoordinates.dto';

export class ExternalAddressDto {
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  @IsOptional()
  addressId: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  postalCode: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  country: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  state: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  city: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  street: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  number: string;

  @ValidateNested()
  geoCoordinates: GeoCoordinateDto;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  neighborhood: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  receiverName: string;

  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  reference: string;
}
