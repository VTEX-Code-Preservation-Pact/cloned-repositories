import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface CreditAttrs {
  email: string;
  creditLimit: number;
}

export interface CreditDoc extends Document {
  email: string;
  creditLimit: number;
}

export type CreditModel = Model<CreditDoc, CreditAttrs>;

const CreditSchema = Schema.build({
  email: {
    type: String,
    required: true,
    index: { global: true, name: 'emailIndex' },
  },
  creditLimit: { type: Number, required: true },
});

export const Credit: ModelDefinition = {
  name: 'credits',
  schema: CreditSchema,
};
