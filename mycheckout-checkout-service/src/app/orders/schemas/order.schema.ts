import { Account, AccountDoc } from 'src/app/accounts/schemas/account.schema';
import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface OrderAttrs {
  country: string;
  currency: string;
  status: string;
  salesChannel: string;
  channel?: string;
  oms?: string;
  account: AccountDoc;
  accountName: string;
  creationDate: string;
  createdAt: number;
  log: string;
  shipping: {
    address: {
      id: string;
      country: string;
      state: string;
      city: string;
      street: string;
      number: string;
      postalCode: string;
      reference?: string;
      neighborhood: string;
      receiverName?: string;
      geoCoordinates: {
        latitude: string;
        longitude: string;
      };
    };
    logisticsInfo: {
      itemIndex: number;
      selectedSla: string;
      selectedDeliveryChannel: string;
    }[];
  };
  user: {
    name: string;
    lastname: string;
    documentType: string;
    document: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
  };
  items: {
    id: string;
    quantity: number;
    seller: string;
  }[];
  customData?: {
    customApps: [
      {
        id: string;
        major: number;
        fields: {
          key: string;
          value: string;
        }[];
      },
    ];
  };
}

export interface OrderDoc extends Document {
  total: number;
  totalShipping: number;
  country: string;
  currency: string;
  status: string;
  salesChannel: string;
  orderId: string;
  channel: string;
  oms: string;
  account: AccountDoc;
  accountName: string;
  creationDate: string;
  createdAt: number;
  log?: string;
  shipping: {
    address: {
      id: string;
      country: string;
      state: string;
      city: string;
      street: string;
      number: string;
      postalCode: string;
      reference: string;
      neighborhood: string;
      receiverName: string;
      geoCoordinates: {
        latitude: string;
        longitude: string;
      };
    };
    logisticsInfo: [
      {
        itemIndex: number;
        selectedSla: string;
        selectedDeliveryChannel: string;
      },
    ];
  };
  user: {
    name: string;
    lastname: string;
    documentType: string;
    document: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
  };
  items: {
    id: string;
    quantity: number;
    seller: string;
  };
  payment: {
    number: string;
    franchise: string;
    transactionId: string;
    gateway: string;
    paymentMethod: string;
    paymentSystem?: string;
    cardId: string;
  };
  customData?: {
    customApps: [
      {
        id: string;
        major: number;
        fields: {
          key: string;
          value: string;
        }[];
      },
    ];
  };
}

export type OrderModel = Model<OrderDoc, OrderAttrs>;

const OrderSchema = Schema.build({
  total: { type: Number },
  totalShipping: { type: Number },
  country: { type: String, required: true },
  currency: { type: String },
  status: {
    type: String,
    default: 'incomplete',
    index: { global: true, name: 'statusIndex' },
  },
  salesChannel: { type: String },
  orderId: { type: String, index: { global: true, name: 'orderIdIndex' } },
  channel: { type: String },
  oms: { type: String },
  creationDate: { type: String },
  createdAt: { type: Number },
  log: { type: String },
  accountName: { type: String },
  shipping: {
    type: Object,
    schema: {
      address: {
        type: Object,
        schema: {
          id: { type: String, required: true },
          country: { type: String, required: true },
          state: { type: String, required: true },
          city: { type: String, required: true },
          street: { type: String, required: true },
          number: { type: String, required: true },
          postalCode: { type: String, required: true },
          neighborhood: { type: String, required: false },
          reference: { type: String },
          receiverName: { type: String },
          geoCoordinates: {
            type: Object,
            schema: {
              latitude: { type: String, required: true },
              longitude: { type: String, required: true },
            },
          },
        },
      },
      logisticsInfo: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              itemIndex: { type: Number, required: true },
              selectedSla: { type: String, required: true },
              selectedDeliveryChannel: { type: String, required: true },
            },
          },
        ],
      },
    },
  },
  user: {
    type: Object,
    schema: {
      name: { type: String, required: true },
      lastname: { type: String, required: true },
      documentType: { type: String, required: true },
      document: { type: String, required: true },
      phoneCode: { type: String, required: false, default: '' },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  items: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          id: { type: String, required: true },
          quantity: { type: Number, required: true },
          seller: { type: String, required: true },
        },
      },
    ],
  },
  payment: {
    type: Object,
    schema: {
      number: { type: String },
      franchise: { type: String },
      transactionId: { type: String },
      gateway: { type: String },
      paymentMethod: { type: String },
      paymentSystem: { type: String },
      cardId: { type: String },
    },
  },
  customData: {
    type: Object,
    schema: {
      customApps: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              id: { type: String },
              major: { type: Number },
              fields: {
                type: Array,
                schema: [
                  {
                    type: Object,
                    schema: {
                      key: { type: String },
                      value: { type: String },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
});

export const Order: ModelDefinition = {
  name: 'orders',
  schema: OrderSchema,
  population: function (populate) {
    this.schema.schemaObject.account = {
      type: populate(Account),
      index: { global: true, name: 'accountIndex' },
    };
  },
};
