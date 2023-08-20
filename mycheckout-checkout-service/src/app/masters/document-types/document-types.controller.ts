import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentTypesService } from './document-types.service';
import { DocumentTypeDto } from './dtos/document-type.dto';
import { DocumentTypesDto } from './dtos/document-types.dto';

@Controller('masters/documenttypes')
export class DocumentTypesController {
  constructor(private documentTypesService: DocumentTypesService) {}

  @Get()
  getAll() {
    return this.documentTypesService.getAll();
  }

  @Post()
  create(@Body() documentTypesDto: DocumentTypesDto) {
    return this.documentTypesService.create(documentTypesDto);
  }
}
