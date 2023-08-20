import { LogisticInfoDto } from '../../app/orders/dtos/logisticInfo.dto';

interface OrderVTEX {
  transactionData: TransactionData;
  orders: Order[];
}

interface TransactionData {
  merchantTransactions: MerchantTransaction[];
}

interface MerchantTransaction {
  id: string;
  merchantName: string;
  transactionId: string;
  payments: Payments[];
}

interface Payments {
  paymentSystem: string;
  value: number;
  referenceValue: number;
}

interface Order {
  orderId: string;
  orderGroup: string;
  shippingData: ShippingData;
  clientProfileData: ClientProfileData;
  storePreferencesData: {
    currencyCode: string;
  };
}

interface OrderCreatedVtex {
  addressId: string;
  currencyCode: string;
  orderGroup: string;
  id: string;
}

interface TransactionVtex {
  transactionId: string;
  merchantName: string;
  payments: {
    value: number;
    referenceValue: number;
    paymentSystem: string;
  }[];
}

interface TransactionQueue {
  profile: {
    email: string;
    habeasData?: boolean;
    profileId?: string;
  };
  account: {
    account: string;
    additionalData: any;
  };
  payment: {
    number?: string;
    franchise?: string;
    gateway: string;
    cardId?: string;
    token?: string;
    holderName?: string;
    holderDocument: string;
    expirationDate?: string;
    cardNumber?: string;
    cvv?: string;
    bin?: string;
    paymentMethod: string;
    paymentSystem?: string;
    additionalData?: unknown;
  };
  shipping: {
    addressId?: string;
    logisticsInfo: LogisticInfoDto[];
  };
  totalizers: {
    totals: number;
    shippingTotal: number;
    subTotal: number;
  };
  orderId: string;
  reference?: string;
  omsExtraData: unknown;
  hostname: string;
  channel: string;
  oms: string;
  version: string;
  authToken: string;
}
