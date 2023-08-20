export class CardDto {
  token?: string;
  franchise: string;
  number: string;
  gateway: string;
  bin?: string;
  holderName?: string;
  holderDocument?: string;
  cvv?: string;
  expirationDate?: string;
  cardNumber?: string;
  aliasCC?: string;
  aliasCVV?: string;
  cardContent?: unknown;
  paymentSystem?: string;
  internalCardContent?: unknown;
}
