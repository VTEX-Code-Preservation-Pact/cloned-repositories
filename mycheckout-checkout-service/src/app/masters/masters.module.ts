import { Module } from '@nestjs/common';
import { DocumentTypesController } from './document-types/document-types.controller';
import { DocumentTypesService } from './document-types/document-types.service';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';
import { City } from './cities/schemas/city.schema';
import { Country } from './countries/schemas/country.schema';
import { DocumentType } from './document-types/schemas/document-type.schema';
import { CustomDynamooseModule } from 'src/shared/utils/dynamoose-module';

@Module({
  imports: [CustomDynamooseModule.forFeature([City, Country, DocumentType])],
  controllers: [DocumentTypesController, CitiesController, CountriesController],
  providers: [DocumentTypesService, CitiesService, CountriesService],
})
export class MastersModule {}
