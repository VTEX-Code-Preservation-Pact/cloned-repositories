import { AccountDoc } from '../app/accounts/schemas/account.schema';
import { CustomDataDto } from '../app/orders/dtos/customData.dto';
import { ItemDto } from '../app/orders/dtos/item.dto';
import { LogisticInfoDto } from '../app/orders/dtos/logisticInfo.dto';
import { MarketingDataDto } from '../app/orders/dtos/marketingData.dto';
import { ProcessTransactionDto } from '../app/orders/dtos/processTransaction.dto';
import { OrderDoc } from '../app/orders/schemas/order.schema';
import { AddressDoc } from '../app/users/addresses/schemas/address.schema';
import { ProfileDoc } from '../app/users/profiles/schemas/profile.schema';
import { TransactionQueue } from './vtex/order';
import { ExternalAddressDto } from 'src/app/orders/dtos/externalAddress.dto';

interface OrderContext {
  profile?: ProfileDoc;
  addresses?: AddressDoc[];
  account?: AccountDoc;
  payment?: PaymentData;
  order?: OrderDoc;
  vtex?: Vtex;
  orderInfo?: OrderInfo;
  dataDto?: DataDTO;
  queueMessage?: Partial<TransactionQueue>;
  processTransactionDto?: ProcessTransactionDto;
  transaction?: Transaction;
  totalizers?: Totalizers;
  headers?: any;
}

interface Totalizers {
  totals?: number;
  shippingTotal?: number;
  subTotal?: number;
}

interface Transaction {
  transactionId: string;
  aliasCC?: string;
  aliasCVV?: string;
  cardContent?: unknown;
  internalCardContent?: unknown;
  gatewayCallbackResponse?: unknown;
  token?: string;
}

interface Vtex {
  simulation: CheckoutOrderForm;
  totals: number;
  shippingTotal: number;
  order?: any;
  checkoutCookie?: string;
  items: Item[];
  gifts?: Item[];
}

export interface Item {
  id: string;
  quantity: number;
  seller: string;
  priceTags: any[];
  offerings: any[];
  price: number;
  isGift: boolean;
}

interface DataDTO {
  channel: string;
  oms: string;
  profile: {
    email: string;
    habeasData?: boolean;
  };
  shipping: {
    addressId?: string;
    externalAddress?: ExternalAddressDto;
    logisticsInfo: LogisticInfoDto[];
  };
  account: {
    accountName: string;
    storePreferences: {
      countryCode: string;
      currencyCode: string;
      salesChannel: string;
    };
  };
  payment: {
    cardId?: string;
    token?: string;
    franchise?: string;
    number?: string;
    gateway: string;
    paymentMethod: string;
    paymentSystem?: string;
    additionalData?: unknown;
    cvv?: string;
    bin?: string;
    holderName?: string;
    holderDocument?: string;
    expirationDate?: string;
    cardNumber?: string;
  };
  items: ItemDto[];
  customData?: CustomDataDto;
  gifts?: ItemDto[];
  offerings?: Offering[];
  marketingData?: MarketingDataDto;
  authToken?: string;
}

interface OrderInfo {
  id: string;
  items?: any;
  logisticInfo?: any;
  total?: number;
  totalShipping?: number;
  orderId: string;
}

interface PaymentData {
  token?: string;
  franchise?: string;
  number?: string;
  gateway: string;
  additionalData?: unknown;
  bin?: string;
  cvv?: string;
  holderName?: string;
  holderDocument?: string;
  expirationDate?: string;
  cardNumber?: string;
  paymentSystem?: string;
  paymentMethod?: string;
}

interface Offering {
  id: string;
  parentItemId: string;
}
