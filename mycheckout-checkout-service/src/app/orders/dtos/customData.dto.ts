import { ApiError } from '../../../shared/responses';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { CustomDataAppsDto } from './customDataApps.dto';

export class CustomDataDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => CustomDataAppsDto)
  customApps: [CustomDataAppsDto];
}
