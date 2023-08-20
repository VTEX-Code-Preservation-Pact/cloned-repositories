import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface AccountAttrs {
  additionalData?: {
    key: string;
    value: string;
  }[];
  account: string;
  buttonMessage?: string;
  buttonText: string;
  createdAt: number;
  cvcRequired: boolean;
  habeasDataInformation?: {
    url: string;
    version: number;
  };
  hasGoogleAnalytics?: boolean;
  isTracking?: boolean;
  paymentMethodId: string;
  paymentRedirect?: boolean;
  styles: string;
  trackingKey?: string;
  visualization: {
    key: string;
    secondaryKey: string;
    type: string;
  }[];
}

export interface AccountDoc extends Document {
  additionalData?: {
    key: string;
    value: string;
  }[];
  account: string;
  buttonMessage?: string;
  buttonText: string;
  createdAt: number;
  cvcRequired: boolean;
  habeasDataInformation?: {
    url: string;
    version: number;
  };
  hasGoogleAnalytics?: boolean;
  isConfigured: boolean;
  isTracking?: boolean;
  paymentMethodId: string;
  paymentRedirect?: boolean;
  styles: string;
  trackingKey?: string;
  visualization: {
    key: string;
    secondaryKey: string;
    type: string;
  }[];
}

export type AccountModel = Model<AccountDoc, AccountAttrs>;

const AccountSchema = Schema.build({
  account: {
    type: String,
    required: true,
    index: { global: true, name: 'accountIndex' },
  },
  paymentMethodId: String,
  buttonMessage: String,
  styles: String,
  buttonText: String,
  cvcRequired: { type: Boolean, default: false },
  visualization: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          type: { type: String },
          key: String,
          secondaryKey: String,
        },
      },
    ],
  },
  paymentRedirect: { type: Boolean, default: false },
  hasGoogleAnalytics: { type: Boolean, default: false },
  isTracking: { type: Boolean, default: false },
  trackingKey: { type: String, default: '' },
  createdAt: { type: Number },
  additionalData: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          key: String,
          value: String,
        },
      },
    ],
  },
});

export const Account: ModelDefinition = {
  name: 'accounts',
  schema: AccountSchema,
  methods: {
    transform: (ret: AccountDoc) => {
      ret.isConfigured = true;
    },
  },
};
