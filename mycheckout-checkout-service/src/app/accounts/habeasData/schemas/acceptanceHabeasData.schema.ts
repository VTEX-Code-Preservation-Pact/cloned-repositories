import {
  Document,
  Model,
  ModelDefinition,
  Schema,
} from 'src/shared/utils/dynamoose-module';

interface AcceptanceHabeasDataAttrs {
  action: string;
  date: number;
  document: string;
  documentType: string;
  email: string;
  ip: string;
  url: string;
  version: number;
}

export interface AcceptanceHabeasDataDoc extends Document {
  action: string;
  date: number;
  document: string;
  documentType: string;
  email: string;
  ip: string;
  url: string;
  version: number;
}

export type AcceptanceHabeasDataModel = Model<
  AcceptanceHabeasDataDoc,
  AcceptanceHabeasDataAttrs
>;

const AcceptanceHabeasDataSchema = Schema.build({
  action: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { global: true, name: 'acceptanceHabeasDataEmailIndex' },
  },
  ip: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
});

export const AcceptanceHabeasData: ModelDefinition = {
  name: 'acceptanceHabeasData',
  schema: AcceptanceHabeasDataSchema,
};
