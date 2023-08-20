import { OrdersVTEXService } from '../../vtex/orders/orders.service';

export type OmsServices = {
  vtexService: OrdersVTEXService;
};

export enum OmsName {
  VTEX = 'vtex',
  NOOP = 'noop',
}

export enum paymentSystem {
  amex = 1,
  Amex = 1,
  'American Express' = 1,
  visa = 2,
  Visa = 2,
  diners = 3,
  Diners = 3,
  master = 4,
  Master = 4,
  Mastercard = 4,
}
