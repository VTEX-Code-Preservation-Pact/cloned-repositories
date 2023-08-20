import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { DocumentTypesService } from './document-types.service';
import { DocumentType } from './schemas/document-type.schema';

describe('DocumentTypesService', () => {
  let service: DocumentTypesService;

  beforeEach(async () => {
    const DocumentTypeModel = {
      provide: getModelToken(DocumentType.name),
      useFactory: () => ({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentTypesService, DocumentTypeModel],
    }).compile();

    service = module.get<DocumentTypesService>(DocumentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
