import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';

import { CreateAcceptanceHabeasDataDto } from '../dtos/createAcceptanceHabeasData.dto';
import {
  AcceptanceHabeasData,
  AcceptanceHabeasDataModel,
} from '../schemas/acceptanceHabeasData.schema';

@Injectable()
export class AcceptanceHabeasDataService {
  constructor(
    @InjectModel(AcceptanceHabeasData.name)
    private acceptanceHabeasDataModel: AcceptanceHabeasDataModel,
  ) {}

  async create(acceptanceHabeasDataDto: CreateAcceptanceHabeasDataDto) {
    const acceptanceHabeasData = {
      action: `El Cliente acepta autorización de tratamiento de datos en la aplicación mycheckout. ${acceptanceHabeasDataDto.url}`,
      date: Date.now(),
      document: acceptanceHabeasDataDto.document,
      documentType: acceptanceHabeasDataDto.documentType,
      email: acceptanceHabeasDataDto.email,
      ip: acceptanceHabeasDataDto.ip,
      url: acceptanceHabeasDataDto.url,
      version: acceptanceHabeasDataDto.version,
    };

    const acceptanceHabeasDataSave =
      this.acceptanceHabeasDataModel.build(acceptanceHabeasData);

    await acceptanceHabeasDataSave.save();

    return acceptanceHabeasDataSave;
  }

  async getByEmail(email: string, version: number) {
    const acceptanceHabeasData = this.acceptanceHabeasDataModel
      .findOne({ email, version })
      .exec();

    return acceptanceHabeasData;
  }
}
