import { ApiError } from 'src/shared/responses';
import { IsNotEmpty, IsString, ValidationArguments } from 'class-validator';

export class CreateHabeasDataDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @IsString({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.invalid_string', args),
  })
  url: string;
}
