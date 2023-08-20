import {
  Document,
  Model,
  ModelDefinition,
  Schema,
} from 'src/shared/utils/dynamoose-module';

interface HabeasDataAttrs {
  statu: string;
  url: string;
  version: number;
}

export interface HabeasDataDoc extends Document {
  statu: string;
  url: string;
  version: number;
}

export type HabeasDataModel = Model<HabeasDataDoc, HabeasDataAttrs>;

const HabeasDataSchema = Schema.build({
  statu: {
    type: String,
    default: 'active',
    index: { global: true, name: 'habeasDataStatuIndex' },
  },
  url: { type: String, required: true },
  version: {
    type: Number,
    required: true,
  },
});

export const HabeasData: ModelDefinition = {
  name: 'habeasData',
  schema: HabeasDataSchema,
};
