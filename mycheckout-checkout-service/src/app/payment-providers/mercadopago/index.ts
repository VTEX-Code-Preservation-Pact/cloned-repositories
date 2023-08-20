import { OrderContext } from '../../../typings/OrderContext';
import * as mercadopago from 'mercadopago';
import { CreateCardPayload } from 'mercadopago/models/cards/create-payload';
import { CreateCustomerPayload } from 'mercadopago/models/customers/create-payload.model';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';
import { PaymentProvider } from '../payment-provider';
import { PaymentProviderServices } from '../types/payment-providers.type';
import { CardsService } from './services/cards.service';
import { TransactionService } from './services/transaction.service';
import { AdditionalData } from './types';

export class MercadoPagoProvider extends PaymentProvider {
  cards: CardsService;
  transactions: TransactionService;

  constructor(
    public services: PaymentProviderServices,
    public ctx: OrderContext,
  ) {
    super(services, ctx);

    mercadopago.configure({
      access_token: this.services.configService.get('MERCADOPAGO_ACCESS_TOKEN'),
    });

    this.cards = new CardsService(mercadopago);
    this.transactions = new TransactionService(mercadopago);
  }

  private formattedEmail(profileId: string, email: string) {
    const splittedEmail = email.split('@');
    return `${splittedEmail[0]}+${profileId}@${splittedEmail[1]}`;
  }

  private createCustomer(profileId: string, email: string) {
    const customer: CreateCustomerPayload = {
      email: this.formattedEmail(profileId, email),
    };
    return mercadopago.customers.create(customer);
  }

  private createCard(customerId: string, token: string) {
    const card: CreateCardPayload = {
      customer_id: customerId,
      token,
    };

    return mercadopago.card.create(card);
  }

  private getCustomer(profileId: string, email: string) {
    return mercadopago.customers.search({
      qs: { email: this.formattedEmail(profileId, email) },
    });
  }

  async authorizePayment(): Promise<void> {
    const {
      processTransactionDto: {
        totalizers: { totals },
        payment: { additionalData: ad, ...payment },
        reference,
        orderId,
        profile: { email },
      },
      profile: { document, documentType, id },
    } = this.ctx;

    const additionalData = ad as AdditionalData;

    const paymentData: CreatePaymentPayload = {
      transaction_amount: totals,
      token: payment.token,
      description: reference || orderId,
      installments: Number(additionalData.installments),
      payment_method_id: payment.franchise,
      issuer_id: additionalData.issuerId,
      payer: {
        email: email,
        identification: {
          number: document,
          type: documentType,
        },
      },
    };

    if (payment.cardId) {
      paymentData.payer = {
        ...paymentData.payer,
        type: 'customer',
        id: (payment as any).internalCardContent.customerId,
      };
    }

    const transaction = await mercadopago.payment.create(paymentData);

    this.ctx.transaction = {
      transactionId: transaction.body.id,
    };

    if (!payment.cardId) {
      let customerId: string;

      const customerQuery = await this.getCustomer(id, email);

      if (
        customerQuery &&
        customerQuery.body &&
        customerQuery.body.results.length === 0
      ) {
        const customerCreated = await this.createCustomer(id, email);
        customerId = customerCreated.body.id;
      } else {
        customerId = customerQuery.body.results[0].id;
      }

      const card = await this.createCard(customerId, payment.token);

      this.ctx.transaction = {
        ...this.ctx.transaction,
        cardContent: {
          cardId: card.body.id,
        },
        internalCardContent: {
          customerId,
        },
      };
    }
  }
  capturePayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  refundPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  cancelPayment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  rollbackPayment(): Promise<void> {
    return;
  }
}
