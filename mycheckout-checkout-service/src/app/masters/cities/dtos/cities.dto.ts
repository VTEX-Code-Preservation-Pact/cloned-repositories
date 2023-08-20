import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';
import { CityDto } from './city.dto';

export class CitiesDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => CityDto)
  cities: CityDto[];
}
