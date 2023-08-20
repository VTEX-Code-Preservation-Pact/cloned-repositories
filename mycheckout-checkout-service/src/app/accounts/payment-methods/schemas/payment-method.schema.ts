import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface PaymentMethodAttr {
  accountName: string;
  paymentMethodName: string;
  isActive: boolean;
  type: string;
}

export interface PaymentMethodDoc extends Document {
  accountName: string;
  paymentMethodName: string;
  isActive: boolean;
  type: string;
}

export type PaymentMethodModel = Model<PaymentMethodDoc, PaymentMethodAttr>;

const PaymentMethodSchema = Schema.build({
  accountName: {
    type: String,
    required: true,
    index: { global: true, name: 'accountNameIndex' },
  },
  paymentMethodName: { type: String, required: true },
  type: String,
  isActive: { type: Boolean, required: true, default: false },
});

export const PaymentMethod: ModelDefinition = {
  name: 'paymentMethods',
  schema: PaymentMethodSchema,
};
