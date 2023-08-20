import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../../../../shared/responses';
import { DocumentTypeDto } from './document-type.dto';

export class DocumentTypesDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  @ValidateNested()
  @Type(() => DocumentTypeDto)
  documents: DocumentTypeDto[];
}
