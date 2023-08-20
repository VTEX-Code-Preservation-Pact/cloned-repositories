import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { ApiResponse } from 'src/shared/responses';
import { CreateHabeasDataDto } from './dtos/createHabeasData.dto';
import { HabeasData, HabeasDataModel } from './schemas/habeasdata.schema';

@Injectable()
export class HabeasDataService {
  constructor(
    @InjectModel(HabeasData.name)
    private habeasdataModel: HabeasDataModel,
  ) {}

  async create(habeasdataDto: CreateHabeasDataDto) {
    const { version, id } = await this.getByActiveState();

    const newVersion = version + 1;

    const { statu } = await this.updateState(id);

    if (statu === 'inactive') {
      const habeasDataDto = {
        statu: 'active',
        url: habeasdataDto.url,
        version: newVersion,
      };

      const habeasdata = this.habeasdataModel.build(habeasDataDto);

      await habeasdata.save();

      return habeasdata;
    } else {
      throw ApiResponse.error('error.not_update', {}, HttpStatus.BAD_REQUEST);
    }
  }

  async updateState(id: string) {
    const habeasData = await this.habeasdataModel.get(id);

    habeasData.set({ statu: 'inactive' });
    await habeasData.save();

    return habeasData;
  }

  async getByActiveState() {
    const habeasDataActive = await this.habeasdataModel
      .findOne({ statu: 'active' })
      .exec();

    return habeasDataActive;
  }
}
