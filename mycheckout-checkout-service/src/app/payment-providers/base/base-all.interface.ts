import { CardsService as MercadopagoCard } from '../mercadopago/services/cards.service';
import { TransactionService as MercadopagoTransaction } from '../mercadopago/services/transaction.service';

export interface IBaseAll {
  cards: MercadopagoCard;
  transactions: MercadopagoTransaction;
}
