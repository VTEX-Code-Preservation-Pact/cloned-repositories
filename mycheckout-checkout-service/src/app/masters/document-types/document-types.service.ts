import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { DocumentTypesDto } from './dtos/document-types.dto';
import {
  DocumentType,
  DocumentTypeModel,
} from './schemas/document-type.schema';

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectModel(DocumentType.name)
    private documentTypeModel: DocumentTypeModel,
  ) {}

  getAll() {
    return this.documentTypeModel.scan().exec();
  }

  create(documentTypesDto: DocumentTypesDto) {
    return this.documentTypeModel.insertMany(documentTypesDto.documents);
  }
}
