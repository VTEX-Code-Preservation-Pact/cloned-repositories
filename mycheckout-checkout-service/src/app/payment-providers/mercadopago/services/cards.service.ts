import { ICardsService } from '../../base/base-cards.interface';
import { CustomerDto } from '../../base/dtos/customer.dto';

export class CardsService implements ICardsService {
  constructor(private readonly mercadopago) {}

  createCard(customer, data): Promise<any> {
    const saveCard = (customerData) => {
      const card_data = {
        token: data.token,
        customer: customerData.id,
        issuer_id: data.issuer_id,
        payment_method_id: data.payment_method_id,
      };

      return this.mercadopago.cards.create(card_data).then(function (card) {
        return card;
      });
    };

    if (!customer.id) {
      const customer_data = { email: customer.email };

      return this.mercadopago.customers
        .create(customer_data)
        .then((customerData) => {
          return saveCard(customerData);
        });
    } else {
      const filters = {
        id: customer.id,
      };

      this.mercadopago.customers
        .search({
          qs: filters,
        })
        .then((customerData) => {
          return saveCard(customerData);
        });
    }
  }

  listOfUserCards(customer: CustomerDto): Promise<any> {
    const filters = {
      id: customer.id,
    };
    return this.mercadopago.customers
      .search({
        qs: filters,
      })
      .then((customerData) => {
        return customerData;
      });
  }

  deleteUserCards(token: string, customer: CustomerDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
