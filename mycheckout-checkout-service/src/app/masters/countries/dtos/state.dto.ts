import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';
import { CityDto } from '../../cities/dtos/city.dto';

export class StateDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  state: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => CityDto)
  cities: CityDto[];
}
