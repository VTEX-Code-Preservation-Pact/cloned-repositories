import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses/api-error';

export class GeoCoordinateDto {
  /*amount arg*/
  //validations
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsLatitude({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_latitude', args),
  })
  //field
  latitude: string;

  /*longitude arg*/
  //validations
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsLongitude({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_longitude', args),
  })
  //field
  longitude: string;
}
