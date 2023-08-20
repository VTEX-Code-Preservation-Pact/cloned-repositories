export class OrdersDto {
  amount: number;
  description: string;
  dev_reference?: string;
  vat?: number;
  installments?: number;
  payment_method_id?: any;
  issuer_id?: any;
}
