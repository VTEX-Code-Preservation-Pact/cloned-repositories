import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';
import { CountryDto } from './country.dto';

export class CountriesDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => CountryDto)
  countries: CountryDto[];
}
