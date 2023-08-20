import { ApiError } from '../../../shared/responses';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidationArguments,
} from 'class-validator';

export class ProfileDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) =>
        ApiError.parse('validations.invalid_email', args),
    },
  )
  email: string;

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  profileId?: string;

  @IsOptional()
  @IsBoolean({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  habeasData?: boolean;
}
